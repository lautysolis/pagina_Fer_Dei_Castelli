import { useState } from "react";
import { MapPin, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./BrandIcons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Contact() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo enviar el mensaje.");
      setStatus("ok");
      setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Ocurrió un error. Probá de nuevo en unos minutos.");
    }
  };

  return (
    <section id="contacto">
      <div className="container">
        <span className="eyebrow">Contacto</span>
        <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", marginTop: 18, maxWidth: 640 }}>
          Escribime y coordinamos tu primera consulta.
        </h2>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 56, marginTop: 52 }}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <InfoRow icon={MapPin} label="Consultorio">Belgrano 2337, Posadas, Misiones</InfoRow>
              <InfoRow icon={Mail} label="Email">fersii@hotmail.com</InfoRow>
              <InfoRow icon={InstagramIcon} label="Instagram">
                <a href="https://www.instagram.com/nutri.fernandadeicastelli/" target="_blank" rel="noopener noreferrer">@nutri.fernandadeicastelli</a>
              </InfoRow>
              <InfoRow icon={FacebookIcon} label="Facebook">
                <a href="https://www.facebook.com/licfernandadeicastelli/" target="_blank" rel="noopener noreferrer">Lic. Fernanda De Icastelli</a>
              </InfoRow>
            </div>

            <div style={{ marginTop: 32, borderRadius: 6, overflow: "hidden", border: "1px solid var(--line)" }}>
              <iframe
                title="Ubicación del consultorio"
                width="100%"
                height="260"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Belgrano%202337%2C%20Posadas%2C%20Misiones%2C%20Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: 6, padding: 36 }}>
            <Field label="Nombre y apellido" name="nombre" value={form.nombre} onChange={handleChange} required />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <Field label="Teléfono (opcional)" name="telefono" value={form.telefono} onChange={handleChange} />
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>Contanos tu consulta</label>
              <textarea
                name="mensaje"
                rows={5}
                value={form.mensaje}
                onChange={handleChange}
                required
                style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--body)" }}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === "sending"} style={{ width: "100%" }}>
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="spin" /> Enviando…
                </>
              ) : (
                "Enviar consulta"
              )}
            </button>

            {status === "ok" && (
              <p style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center", color: "var(--ink)", fontSize: 14.5 }}>
                <CheckCircle2 size={18} color="var(--ink)" /> ¡Listo! Recibimos tu mensaje, te vamos a responder a la brevedad.
              </p>
            )}
            {status === "error" && (
              <p style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center", color: "var(--clay)", fontSize: 14.5 }}>
                <AlertCircle size={18} /> {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ width: 38, height: 38, borderRadius: 6, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={17} strokeWidth={1.6} color="var(--ink)" />
      </div>
      <div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-soft)" }}>{label}</div>
        <div style={{ fontSize: 15.5, marginTop: 2 }}>{children}</div>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--ink-soft)" };
const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 4,
  border: "1px solid var(--line)",
  background: "var(--bg)",
  fontSize: 15,
  color: "var(--ink)",
};

function Field({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required={required} style={inputStyle} />
    </div>
  );
}
