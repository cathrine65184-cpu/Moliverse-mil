/**
 * MoliVerse logo — recreated as a scalable SVG from the brand artwork:
 * a globe (ocean + green continents) wrapped by an orange orbit that
 * curls into a speech-bubble tail. Crisp at any size, themeable.
 */

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      role="img"
      aria-label="MoliVerse"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mv-ocean" x1="30" y1="24" x2="98" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7CA7E6" />
          <stop offset="0.55" stopColor="#3E74E0" />
          <stop offset="1" stopColor="#1E54E6" />
        </linearGradient>
        <linearGradient id="mv-land" x1="44" y1="34" x2="86" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#57D8B0" />
          <stop offset="1" stopColor="#149C82" />
        </linearGradient>
        <linearGradient id="mv-orbit" x1="18" y1="40" x2="112" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBC42B" />
          <stop offset="0.5" stopColor="#F79A22" />
          <stop offset="1" stopColor="#F2731C" />
        </linearGradient>
        <clipPath id="mv-globe">
          <circle cx="62" cy="56" r="38" />
        </clipPath>
      </defs>

      {/* Orbit — back half (behind the globe) */}
      <g transform="rotate(-22 64 60)">
        <path
          d="M8 60 A56 20 0 0 1 120 60"
          fill="none"
          stroke="url(#mv-orbit)"
          strokeWidth="8.5"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>

      {/* Speech-bubble tail */}
      <path d="M45 86 L64 86 L47 106 Z" fill="#1E54E6" />

      {/* Globe */}
      <circle cx="62" cy="56" r="38" fill="url(#mv-ocean)" />

      <g clipPath="url(#mv-globe)">
        {/* Continents */}
        <path
          d="M50 30 C44 37 45 47 49 54 C46 61 49 71 55 78 C58 73 56 66 54 61 C60 55 57 44 55 38 C54 34 53 31 50 30 Z"
          fill="url(#mv-land)"
        />
        <path
          d="M66 33 C75 31 86 36 83 46 C88 51 83 61 76 62 C74 71 69 79 64 76 C67 68 62 62 65 55 C60 48 61 39 66 33 Z"
          fill="url(#mv-land)"
        />
        <path d="M40 66 C44 64 48 67 47 71 C44 74 39 72 40 66 Z" fill="url(#mv-land)" />
        {/* Meridian / latitude grid */}
        <g fill="none" stroke="#ffffff" strokeWidth="1.1">
          <ellipse cx="62" cy="56" rx="14" ry="38" opacity="0.22" />
          <ellipse cx="62" cy="56" rx="28" ry="38" opacity="0.15" />
          <ellipse cx="62" cy="56" rx="38" ry="14" opacity="0.18" />
          <line x1="24" y1="56" x2="100" y2="56" opacity="0.2" />
        </g>
      </g>

      {/* Orbit — front half (in front of the globe) */}
      <g transform="rotate(-22 64 60)">
        <path
          d="M120 60 A56 20 0 0 1 8 60"
          fill="none"
          stroke="url(#mv-orbit)"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default function Logo({
  withTagline = false,
  className = "",
}: {
  withTagline?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col justify-center leading-none">
        <span className="text-lg font-extrabold tracking-tight text-brand-800">
          MOLI<span className="text-brand">VERSE</span>
        </span>
        {withTagline && (
          <span className="mt-0.5 text-[9px] font-bold tracking-[0.32em] text-aqua-700">
            SINCE 2026
          </span>
        )}
      </span>
    </span>
  );
}
