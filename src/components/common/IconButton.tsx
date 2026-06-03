import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { playPopBtnSound } from "./playUiSound";

export type IconButtonSize = "sm" | "md";

export type IconButtonProps = {
  icon: IconProp;
  tooltip?: string;
  onClick?: () => void;
  color: string;
  size?: IconButtonSize;
  /** Hover nảy như nút trong OverlayMenu */
  motionLift?: boolean;
  playSoundOnClick?: boolean;
  className?: string;
  "aria-label"?: string;
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "w-12 h-12 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] text-lg",
  md: "w-14 h-14 rounded-2xl border-[4px] border-slate-900 shadow-[0_4px_0_0_rgba(15,23,42,1)] text-2xl hover:translate-y-0.5 active:translate-y-1",
};

export function IconButton({
  icon,
  tooltip,
  onClick,
  color,
  size = "md",
  motionLift = false,
  playSoundOnClick = true,
  className = "",
  "aria-label": ariaLabel,
}: IconButtonProps) {
  const label = ariaLabel ?? tooltip;
  const handleClick = () => {
    if (playSoundOnClick) playPopBtnSound();
    onClick?.();
  };

  const baseBtn = `${color} ${sizeClasses[size]} flex items-center justify-center text-white transition-all ${className}`;

  const button = motionLift ? (
    <motion.button
      type="button"
      whileHover={{ y: -5, scale: 1 }}
      whileTap={{ scale: 0.8, y: 10 }}
      onClick={handleClick}
      className={baseBtn}
      aria-label={label}
    >
      <FontAwesomeIcon icon={icon} />
    </motion.button>
  ) : (
    <button type="button" onClick={handleClick} className={baseBtn} aria-label={label}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );

  if (!tooltip) {
    return button;
  }

  return (
    <div className="relative group/iconbtn">
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-xl opacity-0 group-hover/iconbtn:opacity-100 transition-all pointer-events-none whitespace-nowrap border-2 border-white shadow-lg z-[110]">
        {tooltip}
      </span>
      {button}
    </div>
  );
}
