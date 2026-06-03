import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { playPopBtnSound } from "./playUiSound";

export type ResourceBarProps = {
  icon: IconProp;
  value: string;
  color: string;
  bgColor: string;
};

export function ResourceBar({ icon, value, color, bgColor }: ResourceBarProps) {
  return (
    <div
      className={`flex items-center gap-3 ${bgColor} border-4 border-slate-700 rounded-2xl px-4 py-1 shadow-[4px_4px_0_0_rgba(51,65,85,1)]`}
    >
      <FontAwesomeIcon icon={icon} className={`${color} text-xl`} />
      <span className="font-black text-slate-700 text-lg">{value}</span>
      <button
        type="button"
        className="ml-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center border-2 border-slate-700 hover:scale-110 transition-transform"
        onClick={playPopBtnSound}
        aria-label="Thêm"
      >
        +
      </button>
    </div>
  );
}
