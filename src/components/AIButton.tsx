import React from 'react';

interface AIButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export const AIButton: React.FC<AIButtonProps> = ({
  onClick,
  className = '',
  label = 'AI',
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white hover:bg-[#F4F9E8] px-3 py-1.5 rounded-full border border-[#C6E67D]/40 hover:border-[#528C46] shadow-sm flex items-center gap-1.5 transition-all duration-200 active:scale-95 shrink-0 cursor-pointer ${className}`}
      title="Bantuan AI"
      aria-label="Bantuan AI"
    >
      <span className="material-symbols-outlined text-[17px] text-[#528C46] leading-none">
        smart_toy
      </span>
      <span className="text-xs font-bold text-[#0A110B] leading-none">
        {label}
      </span>
    </button>
  );
};

export default AIButton;
