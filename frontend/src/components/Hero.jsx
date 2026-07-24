import RadialWheel from "./RadialWheel";
import fernanda from "../assets/fernanda.jpg";

export default function Hero() {
  return (
    <section id="top" style={{ paddingTop: 56, paddingBottom: 40, position: "relative", overflow: "hidden" }}>
      <div className="container hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center" }}>
        <div>
          <span className="eyebrow">Posadas, Misiones · consultorio en Belgrano 2337</span>
          <h1 style={{ fontSize: "clamp(40px, 5.4vw, 68px)", marginTop: 22, letterSpacing: "-0.01em" }}>
            Comer bien no es una dieta. <em style={{ color: "var(--clay)", fontStyle: "italic" }}>Es un rumbo.</em>
          </h1>
          <p style={{ marginTop: 26, fontSize: 18, color: "var(--ink-soft)", maxWidth: 480 }}>
            Más de 20 años acompañando a familias de Posadas con planes alimentarios
            personalizados, educación alimentaria real y auriculoterapia — para
            niños, adolescentes y adultos.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap" }}>
            <a href="#contacto" className="btn btn-primary">Reservar consulta</a>
            <a href="#servicios" className="btn btn-ghost">Ver servicios</a>
          </div>

          <div style={{ display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--display)", fontSize: 36, color: "var(--clay)" }}>+20</div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>años de trayectoria</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--display)", fontSize: 36, color: "var(--clay)" }}>3</div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>etapas de la vida acompañadas</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--display)", fontSize: 36, color: "var(--clay)" }}>2</div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>enfoques: alimentario y auricular</div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="wheel-wrap" style={{ position: "relative", width: "min(100%, 440px)" }}>
            <RadialWheel size={440} labels={[1, 2, 3, 4, 5, 6]} className="hero-wheel" />
            <div
              className="hero-photo"
              style={{
                position: "absolute",
                bottom: -18,
                right: -6,
                width: "42%",
                aspectRatio: "1 / 1.15",
                borderRadius: "6px",
                overflow: "hidden",
                border: "5px solid var(--bg)",
                boxShadow: "0 18px 40px rgba(31,61,43,0.22)",
              }}
            >
              <img src={fernanda} alt="Lic. Fernanda Dei Castelli en su consultorio" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .wheel-wrap { margin-top: 20px; }
        }
      `}</style>
    </section>
  );
}
