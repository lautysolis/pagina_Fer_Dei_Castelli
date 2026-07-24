import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const DEST_EMAIL = process.env.CONTACT_EMAIL || "fersii@hotmail.com";

// --- Middleware ---
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  })
);
app.use(express.json({ limit: "20kb" }));

// Limita abuso del formulario: 5 envíos cada 15 minutos por IP.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Demasiados intentos. Probá de nuevo más tarde." },
});

// --- Mail transport ---
// Configurar por variables de entorno (ver .env.example).
// Funciona con cualquier proveedor SMTP: Gmail (con contraseña de aplicación),
// Zoho, SendGrid, Outlook/Office365, etc.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true", // true para puerto 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { nombre, email, telefono, mensaje } = req.body || {};

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: "Faltan campos obligatorios: nombre, email y mensaje." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "El email no es válido." });
    }
    if (String(mensaje).length > 4000) {
      return res.status(400).json({ error: "El mensaje es demasiado largo." });
    }

    const safe = (v) => String(v ?? "").replace(/[<>]/g, "");

    await transporter.sendMail({
      from: `"Web Fernanda De Icastelli" <${process.env.SMTP_USER}>`,
      to: DEST_EMAIL,
      replyTo: email,
      subject: `Nueva consulta desde la web — ${safe(nombre)}`,
      text: `Nombre: ${safe(nombre)}\nEmail: ${safe(email)}\nTeléfono: ${safe(telefono) || "-"}\n\nMensaje:\n${safe(mensaje)}`,
      html: `
        <div style="font-family: sans-serif; font-size: 15px; color: #1F3D2B;">
          <h2 style="margin-bottom: 4px;">Nueva consulta desde la web</h2>
          <p><strong>Nombre:</strong> ${safe(nombre)}</p>
          <p><strong>Email:</strong> ${safe(email)}</p>
          <p><strong>Teléfono:</strong> ${safe(telefono) || "-"}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${safe(mensaje)}</p>
        </div>
      `,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Error enviando el mail de contacto:", err);
    return res.status(500).json({ error: "No se pudo enviar el mensaje. Intentá de nuevo en unos minutos." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
