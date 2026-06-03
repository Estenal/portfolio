import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { playPopBtnSound } from "./playUiSound";

export type GameMenuButtonProps = {
  icon: IconProp;
  label: string;
  sub: string;
  color: string;
  borderColor: string;
  onClick: () => void;
  className?: string;
};
export function GameMenuButton({ icon, label, sub, color, borderColor, onClick, className }: GameMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick();
        playPopBtnSound();
      }}
      className={`group relative w-full h-16 ${color} border-[4px] ${borderColor} rounded-tl-2xl rounded-tr-lg rounded-bl-lg rounded-br-2xl shadow-[0_6px_0_0_rgba(15,23,42,0.12)] hover:shadow-[0_3px_0_0_rgba(15,23,42,0.12)] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all overflow-hidden ${className || '-rotate-1 hover:rotate-0'}`}
    >
      {/* Hiệu ứng bóng kính mềm (Soft Glossy) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/15 pointer-events-none" />

      <div className="flex items-center px-6 gap-4 relative z-10">
        {/* Khung Icon bo góc tiệp màu */}
        <div className="w-9 h-9 rounded-lg bg-black/10 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
          <FontAwesomeIcon
            icon={icon}
            className="text-white text-base drop-shadow-sm group-hover:rotate-12 group-hover:scale-110 transition-transform"
          />
        </div>

        <div className="text-left flex flex-col leading-none">
          <span className="text-white font-black text-lg italic tracking-tighter drop-shadow-[1px_2px_0_rgba(0,0,0,0.1)] uppercase">
            {label}
          </span>
          <span className="text-white/50 font-bold text-[9px] tracking-widest mt-1 uppercase group-hover:text-white/70 transition-colors">
            {sub}
          </span>
        </div>
      </div>
    </button>
  );
}