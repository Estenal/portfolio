import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export type SocialLinkProps = {
  href: string;
  icon: IconProp;
  color: string;
  tooltip: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function SocialLink({ href, icon, color, tooltip, onClick }: SocialLinkProps) {
  return (
    <div className="relative group/social">
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-xl opacity-0 group-hover/social:opacity-100 transition-all pointer-events-none whitespace-nowrap border-2 border-white shadow-lg z-[110]">
        {tooltip}
      </span>
      <motion.a
        whileHover={{ y: -4 }}
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={`${color} w-12 h-12 rounded-xl border-[3px] border-slate-900 flex items-center justify-center text-white text-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)]`}
        aria-label={tooltip}
      >
        <FontAwesomeIcon icon={icon} />
      </motion.a>
    </div>
  );
}
