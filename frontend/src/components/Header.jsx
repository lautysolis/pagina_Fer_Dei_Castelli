import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./BrandIcons";

const LINKS = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#servicios", label: "Servicios" },
  { href: "#auriculoterapia", label: "Auriculoterapia" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(247,242,234,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "all 0.25s ease",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 84 }}>
        <a href="#top" style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontFamily: "var(--display)", fontSize: 24, fontStyle: "italic" }}>Fernanda Dei Castelli</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-soft)", textTransform: "uppercase", marginTop: 4 }}>
            Lic. en Nutrición · MP 20 años
          </span>
        </a>

        <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="desktop-nav">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} style={{ fontSize: 15, fontWeight: 500 }}>
              {l.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 14, marginLeft: 8 }}>
            <a href="https://www.instagram.com/nutri.fernandadeicastelli/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={19} strokeWidth={1.6} />
            </a>
            <a href="https://www.facebook.com/licfernandadeicastelli/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon size={19} strokeWidth={1.6} />
            </a>
          </div>
          <a href="#contacto" className="btn btn-primary" style={{ padding: "11px 22px", fontSize: 14 }}>
            Pedir turno
          </a>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          style={{ display: "none", background: "none", border: "none" }}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="mobile-panel" style={{ background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, padding: "24px 20px" }}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontSize: 18 }}>
                {l.label}
              </a>
            ))}
            <div style={{ display: "flex", gap: 18 }}>
              <a href="https://www.instagram.com/nutri.fernandadeicastelli/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon size={22} strokeWidth={1.6} />
              </a>
              <a href="https://www.facebook.com/licfernandadeicastelli/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon size={22} strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
