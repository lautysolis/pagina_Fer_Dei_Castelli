const GROUPS = [
  {
    label: "Niños",
    range: "desde primera infancia",
    text: "Hábitos alimentarios que se construyen jugando, con la familia como parte activa del proceso.",
  },
  {
    label: "Adolescentes",
    range: "pubertad y crecimiento",
    text: "Acompañamiento en una etapa de muchos cambios, sin dietas restrictivas ni mensajes que generen presión.",
  },
  {
    label: "Adultos",
    range: "toda etapa de la vida adulta",
    text: "Planes ajustados a rutina, patologías asociadas, objetivos personales y estilo de vida.",
  },
];

export default function Publico() {
  return (
    <section id="publico" style={{ background: "var(--sage)", borderTop: "1px solid var(--sage-line)", borderBottom: "1px solid var(--sage-line)" }}>
      <div className="container">
        <span className="eyebrow">A quién atiendo</span>
        <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)", marginTop: 18, maxWidth: 600 }}>
          Un plan distinto para cada etapa de la vida.
        </h2>

        <div className="publico-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, marginTop: 48 }}>
          {GROUPS.map((g, i) => (
            <div key={g.label} style={{ background: "var(--bg-card)", border: "1px solid var(--sage-line)", borderRadius: 6, padding: 32 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--gold)" }}>0{i + 1}</span>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 30, marginTop: 10 }}>{g.label}</h3>
              <p style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--clay)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {g.range}
              </p>
              <p style={{ marginTop: 16, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6 }}>{g.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .publico-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
