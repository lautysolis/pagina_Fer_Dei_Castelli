import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Envío de mail vía API HTTP de Brevo (antes Sendinblue) ---
// Usamos una API por HTTPS en vez de una conexión SMTP directa porque
// Render (plan gratuito) bloquea/restringe las conexiones SMTP salientes.
// La API de Brevo funciona por HTTPS normal, así que no tiene ese problema.
async function sendContactEmail({ nombre, email, telefono, mensaje }) {
  const safe = (v) => String(v ?? "").replace(/[<>]/g, "");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "Web Fernanda Dei Castelli",
        email: process.env.BREVO_SENDER_EMAIL, // dirección verificada en Brevo
      },
      to: [{ email: DEST_EMAIL }],
      replyTo: { email },
      subject: `Nueva consulta desde la web — ${safe(nombre)}`,
      textContent: `Nombre: ${safe(nombre)}\nEmail: ${safe(email)}\nTeléfono: ${safe(telefono) || "-"}\n\nMensaje:\n${safe(mensaje)}`,
      htmlContent: `
        <div style="font-family: sans-serif; font-size: 15px; color: #1F3D2B;">
          <h2 style="margin-bottom: 4px;">Nueva consulta desde la web</h2>
          <p><strong>Nombre:</strong> ${safe(nombre)}</p>
          <p><strong>Email:</strong> ${safe(email)}</p>
          <p><strong>Teléfono:</strong> ${safe(telefono) || "-"}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${safe(mensaje)}</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Brevo respondió ${res.status}: ${detail}`);
  }
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

    await sendContactEmail({ nombre, email, telefono, mensaje });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Error enviando el mail de contacto:", err);
    return res.status(500).json({ error: "No se pudo enviar el mensaje. Intentá de nuevo en unos minutos." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});