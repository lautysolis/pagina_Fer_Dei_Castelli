import { InstagramIcon, FacebookIcon } from "./BrandIcons";

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--bg)", padding: "40px 0" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontFamily: "var(--display)", fontSize: 20, fontStyle: "italic" }}>Fernanda De Icastelli</div>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="https://www.instagram.com/nutri.fernandadeicastelli/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon size={18} strokeWidth={1.6} />
          </a>
          <a href="https://www.facebook.com/licfernandadeicastelli/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FacebookIcon size={18} strokeWidth={1.6} />
          </a>
        </div>
        <div style={{ fontSize: 13, color: "#B7C2B9", fontFamily: "var(--mono)" }}>Belgrano 2337, Posadas, Misiones</div>
      </div>
    </footer>
  );
}
