import { ArrowUpRight } from 'lucide-react';

interface RollRevealButtonProps {
  defaultText?: string;
  hoverText?: string;
  onClick?: () => void;
  className?: string;
}

const RollRevealButton = ({
  defaultText = "Booking a call",
  hoverText = "Let's Talk",
  onClick,
  className = ""
}: RollRevealButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex h-12 w-48 items-center rounded-full bg-white shadow-lg btn-roll-transition hover:shadow-xl overflow-hidden ${className}`}
    >
      <div className="absolute left-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white btn-roll-transition group-hover:left-[calc(100%-2.625rem)] group-hover:rotate-[360deg] z-10">
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </div>

      <div className="relative w-full flex items-center justify-center h-full">
        {/* Default text — slides up and fades out on hover */}
        <span className="absolute left-14 right-4 flex items-center text-[10px] font-black uppercase tracking-[0.15em] text-red-500 btn-roll-transition group-hover:-translate-y-12 group-hover:opacity-0 group-hover:scale-95">
          {defaultText}
        </span>

        {/* Hover text — slides up and fades in on hover */}
        <span className="absolute left-4 right-14 flex justify-end items-center translate-y-12 text-[10px] font-black uppercase tracking-[0.15em] text-red-500 opacity-0 scale-95 btn-roll-transition group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100">
          {hoverText}
        </span>
      </div>
    </button>
  );
};

export default RollRevealButton;
