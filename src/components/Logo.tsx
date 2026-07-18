export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* soft circular backdrop */}
      <circle cx="24" cy="24" r="22" fill="#E6F0FF" />
      {/* droplet */}
      <path
        d="M24 10c-6 7-10 12-10 17a10 10 0 0 0 20 0c0-5-4-10-10-17Z"
        fill="#1E4FA6"
      />
      {/* highlight */}
      <path
        d="M20 22c-1 2-1.5 3.5-1.5 5a4 4 0 0 0 3 3.9"
        stroke="#5FD0FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* sparkles */}
      <circle cx="34" cy="14" r="1.4" fill="#5FD0FF" />
      <circle cx="37" cy="18" r="0.9" fill="#5FD0FF" />
    </svg>
  );
}

export function LogoWordmark({
  size = 36,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} style={style}>
      <LogoMark size={size} />
      <span
        className="font-semibold tracking-tight"
        style={{ fontSize: size * 0.55, letterSpacing: "-0.01em" }}
      >
        <span style={{ color: "#1E4FA6" }}>Hidro</span>
        <span style={{ color: "#5FD0FF" }}>Monitor</span>
      </span>
    </span>
  );
}
