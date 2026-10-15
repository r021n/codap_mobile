type StopwatchSVGProps = {
  className?: string;
};

export default function StopwatchSVG({
  className = "w-8 h-8",
}: StopwatchSVGProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top Ring */}
      <circle cx="24" cy="6" r="3.5" fill="none" stroke="#64748B" strokeWidth="1.5" />
      {/* Top Pusher */}
      <rect x="22" y="8" width="4" height="4" rx="0.5" fill="#475569" stroke="#334155" strokeWidth="1" />
      {/* Right Side Split Button */}
      <rect x="33.5" y="11.5" width="3" height="3" rx="0.5" transform="rotate(45 33.5 11.5)" fill="#64748B" />
      {/* Watch Body Outer Casing */}
      <circle cx="24" cy="27" r="16" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      {/* Inner Bezel Ring */}
      <circle cx="24" cy="27" r="13" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      {/* Dial Marks (12, 3, 6, 9) */}
      <line x1="24" y1="16" x2="24" y2="18.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="35.5" x2="24" y2="38" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="27" x2="15.5" y2="27" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32.5" y1="27" x2="35" y2="27" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      {/* Center Pin */}
      <circle cx="24" cy="27" r="1.5" fill="#EF4444" />
      {/* Hand pointing to ~2 o'clock */}
      <line
        x1="24"
        y1="27"
        x2="31"
        y2="20"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
