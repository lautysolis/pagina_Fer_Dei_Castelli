import fernanda from "../assets/fernanda.jpg";

export default function About() {
  return (
    <section id="sobre-mi" style={{ background: "var(--sage)", borderTop: "1px solid var(--sage-line)", borderBottom: "1px solid var(--sage-line)" }}>
      <div className="container about-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 64, alignItems: "center" }}>
        <div style={{ borderRadius: 6, overflow: "hidden", boxShadow: "0 20px 50px rgba(31,61,43,0.16)" }}>
          <img src={fernanda} alt="Lic. Fernanda De Icastelli sonriendo en su consultorio" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <span className="eyebrow">Sobre mí</span>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", marginTop: 18 }}>
            Licenciada en Nutrición, con la ciudad como consultorio de toda la vida.
          </h2>
          <p style={{ marginTop: 22, fontSize: 17, color: "var(--ink-soft)", maxWidth: 560 }}>
            Hace más de dos décadas que acompaño procesos alimentarios en Posadas.
            Mi trabajo combina el plan nutricional con la educación: no se trata solo
            de qué comer, sino de entender por qué, cuándo y cómo — para que el
            cambio se sostenga en el tiempo, no en una dieta de corto plazo.
          </p>
          <p style={{ marginTop: 16, fontSize: 17, color: "var(--ink-soft)", maxWidth: 560 }}>
            Sumo también la auriculoterapia como herramienta complementaria,
            trabajando el cuerpo desde otro lugar cuando el proceso alimentario
            lo necesita. Atiendo niños, adolescentes y adultos, cada uno con un
            abordaje pensado para su etapa.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            {["Planes personalizados", "Educación alimentaria", "Auriculoterapia", "Todas las edades"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "var(--bg-card)",
                  border: "1px solid var(--sage-line)",
                  color: "var(--ink)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
