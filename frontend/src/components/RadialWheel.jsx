// El motivo circular que atraviesa la página: mitad "plato" nutricional,
// mitad mapa de puntos (como un mapa auricular). Es el elemento de firma
// que conecta visualmente los dos pilares del consultorio: nutrición y auriculoterapia.
export default function RadialWheel({ size = 420, labels = [], className = "" }) {
  const segments = labels.length || 6;
  const angleStep = 360 / segments;
  const cx = 210, cy = 210, rOuter = 200, rInner = 118;

  const polarToCartesian = (r, angleDeg) => {
    const a = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  const arcs = Array.from({ length: segments }).map((_, i) => {
    const start = i * angleStep;
    const end = start + angleStep - 2.2;
    const [x1, y1] = polarToCartesian(rOuter, start);
    const [x2, y2] = polarToCartesian(rOuter, end);
    const [x3, y3] = polarToCartesian(rInner, end);
    const [x4, y4] = polarToCartesian(rInner, start);
    const path = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;
    const isClay = i % 2 === 0;
    return <path key={i} d={path} fill={isClay ? "var(--clay)" : "var(--sage)"} opacity={isClay ? 0.92 : 1} />;
  });

  const points = Array.from({ length: segments }).map((_, i) => {
    const mid = i * angleStep + angleStep / 2 - 1.1;
    const [x, y] = polarToCartesian((rOuter + rInner) / 2, mid);
    return [x, y, mid];
  });

  return (
    <svg
      viewBox="0 0 420 420"
      className={className}
      role="img"
      aria-label="Diagrama circular de servicios"
      style={{ width: "100%", maxWidth: size, height: "auto", display: "block" }}
    >
      <circle cx={cx} cy={cy} r={rOuter + 8} fill="none" stroke="var(--line)" strokeWidth="1" />
      {arcs}
      <circle cx={cx} cy={cy} r={rInner - 2} fill="var(--bg-card)" stroke="var(--line)" strokeWidth="1" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill={i % 2 === 0 ? "var(--bg-card)" : "var(--ink)"} />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="var(--display)" fontSize="22" fill="var(--ink)">Equilibrio</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" letterSpacing="1.5" fill="var(--gold)">NUTRICIÓN · CUERPO</text>
    </svg>
  );
}
