type SunIconSVGProps = {
  className?: string;
};

export default function SunIconSVG({ className = "w-8 h-8" }: SunIconSVGProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Solar Rays */}
      <line x1="24" y1="4" x2="24" y2="10" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="38" x2="24" y2="44" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="4" y1="24" x2="10" y2="24" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="24" x2="44" y2="24" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="10" x2="14.5" y2="14.5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="33.5" y1="33.5" x2="38" y2="38" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="10" x2="33.5" y2="14.5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14.5" y1="33.5" x2="10" y2="38" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Outer Halo */}
      <circle cx="24" cy="24" r="11" fill="#FEF3C7" opacity="0.6" />
      {/* Sun Disc */}
      <circle cx="24" cy="24" r="9" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
      {/* Highlight Flare */}
      <circle cx="21" cy="21" r="3.5" fill="#FEF08A" opacity="0.8" />
    </svg>
  );
}
