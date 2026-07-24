export function InstagramIcon({ size = 18, color = "currentColor", strokeWidth = 1.6, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill={color} stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, color = "currentColor", strokeWidth = 1.6, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15.5 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2h3.4l-.4 3H12v7" />
      <path d="M9 13.5h3" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </svg>
  );
}
