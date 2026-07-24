import { NotebookPen, GraduationCap, Sparkles, Users } from "lucide-react";

const SERVICES = [
  {
    icon: NotebookPen,
    title: "Planes alimentarios personalizados",
    text: "Cada plan se arma a partir de tu historia clínica, tus gustos, tu rutina y tus objetivos reales — no de una plantilla genérica.",
  },
  {
    icon: GraduationCap,
    title: "Educación alimentaria",
    text: "Entender el porqué de cada indicación para poder sostener los cambios en el tiempo, con o sin consultorio de por medio.",
  },
  {
    icon: Sparkles,
    title: "Auriculoterapia",
    text: "Estimulación de puntos auriculares como complemento del tratamiento nutricional, útil en ansiedad, compulsión y bienestar general.",
  },
  {
    icon: Users,
    title: "Todas las edades",
    text: "Atención a niños, adolescentes y adultos, con un enfoque adaptado a cada etapa de crecimiento y de vida.",
  },
];

export default function Services() {
  return (
    <section id="servicios">
      <div className="container">
        <span className="eyebrow">Servicios</span>
        <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", marginTop: 18, maxWidth: 640 }}>
          Un acompañamiento con dos pilares: alimentación y cuerpo.
        </h2>

        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            marginTop: 56,
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
        >
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div key={title} style={{ background: "var(--bg-card)", padding: "36px 28px" }}>
              <Icon size={26} strokeWidth={1.5} color="var(--clay)" />
              <h3 style={{ fontFamily: "var(--body)", fontWeight: 600, fontSize: 17, marginTop: 20, color: "var(--ink)" }}>
                {title}
              </h3>
              <p style={{ marginTop: 12, fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.65 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
