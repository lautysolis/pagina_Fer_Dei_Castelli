import RadialWheel from "./RadialWheel";

export default function Auriculoterapia() {
  return (
    <section id="auriculoterapia" style={{ background: "var(--ink)", color: "var(--bg)" }}>
      <div className="container auric-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RadialWheel size={340} labels={[1, 2, 3, 4, 5, 6, 7, 8]} />
        </div>
        <div>
          <span className="eyebrow" style={{ color: "var(--clay-soft)" }}>Auriculoterapia</span>
          <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)", marginTop: 18, color: "var(--bg)" }}>
            El cuerpo también se escucha desde la oreja.
          </h2>
          <p style={{ marginTop: 22, fontSize: 16.5, color: "#D7DED8", maxWidth: 480 }}>
            La auriculoterapia trabaja sobre puntos reflejos ubicados en el
            pabellón auricular, que se corresponden con distintas zonas y
            funciones del organismo. La utilizo como complemento del proceso
            nutricional, especialmente cuando hay ansiedad, compulsión con la
            comida o dificultad para sostener un cambio de hábitos.
          </p>
          <p style={{ marginTop: 16, fontSize: 16.5, color: "#D7DED8", maxWidth: 480 }}>
            No reemplaza al plan alimentario: lo acompaña, sumando una vía
            más para que el tratamiento avance de forma integral.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .auric-grid { grid-template-columns: 1fr !important; text-align: center; }
          .auric-grid p { margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </section>
  );
}
