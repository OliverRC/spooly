export function Logo() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      {/* Spool base */}
      <path
        d="M6 8h20v16H6z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      
      {/* Spool edges */}
      <path
        d="M6 6h20v4H6z M6 22h20v4H6z"
        fill="currentColor"
      />
      
      {/* Filament lines */}
      <path
        d="M7 10h18M7 12h18M7 14h18M7 16h18M7 18h18M7 20h18"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      
      {/* Clippy eyes - white backgrounds */}
      <ellipse
        cx="12"
        cy="14"
        rx="2.5"
        ry="3"
        fill="white"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="2.5"
        ry="3"
        fill="white"
      />
      
      {/* Clippy eyes - black pupils */}
      <ellipse
        cx="12"
        cy="14"
        rx="1.5"
        ry="2"
        fill="currentColor"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="1.5"
        ry="2"
        fill="currentColor"
      />
      
      {/* Clippy eyebrows */}
      <path
        d="M10 11l4 1M18 11l4 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
