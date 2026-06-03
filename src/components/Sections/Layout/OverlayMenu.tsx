import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faMoon,
  faSun,
  faCodeBranch,
  faEnvelope,
  faHome,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../../common/IconButton";
import { playPopSound } from "../../common/playUiSound";
import RedirectPopup from "./Forms/RedirectPopup";

const DEFAULT_SOURCE_URL = "https://github.com/Estenal";

export type OverlayMenuProps = {
  onGoHome?: () => void;
  onOpenContact?: () => void;
  onOpenLanguage?: () => void;
  sourceCodeUrl?: string;
};

export const OverlayMenu = ({
  onGoHome,
  onOpenContact,
  onOpenLanguage,
  sourceCodeUrl = DEFAULT_SOURCE_URL,
}: OverlayMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        playPopSound();
        e.preventDefault();
        toggleMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleMenu]);

  return (
    <>
    <div className="fixed bottom-8 left-8 z-[100] flex items-end select-none flex-row-reverse">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.8 }}
            className="flex items-end gap-3 ml-4"
          >
            <IconButton
              icon={faLanguage}
              tooltip="Ngôn ngữ"
              color="bg-amber-400"
              size="sm"
              motionLift
              onClick={() => onOpenLanguage?.()}
            />
            <IconButton
              icon={isDarkMode ? faSun : faMoon}
              tooltip={isDarkMode ? "Chế độ sáng" : "Chế độ tối"}
              color="bg-indigo-600"
              size="sm"
              motionLift
              playSoundOnClick
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
            <IconButton
              icon={faCodeBranch}
              tooltip="Mã nguồn"
              color="bg-slate-700"
              size="sm"
              motionLift
              onClick={() => setRedirectUrl(sourceCodeUrl)}
            />
            <IconButton
              icon={faEnvelope}
              tooltip="Liên hệ"
              color="bg-rose-500"
              size="sm"
              motionLift
              onClick={() => onOpenContact?.()}
            />
            <IconButton
              icon={faHome}
              tooltip="Trang chủ"
              color="bg-emerald-500"
              size="sm"
              motionLift
              onClick={() => onGoHome?.()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          toggleMenu();
          playPopSound();
        }}
        className={`relative w-16 h-16 rounded-2xl border-[4px] border-slate-900 shadow-[6px_6px_0_0_rgba(15,23,42,1)] flex items-center justify-center text-2xl transition-colors ${
          isOpen ? "bg-rose-400 text-white" : "bg-white text-slate-900"
        }`}
        aria-label={isOpen ? "Đóng menu" : "Mở menu"}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          whileHover={{ rotate: 180 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex items-center justify-center"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </motion.div>

        <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded-md border border-white font-black shadow-sm">
          TAB
        </div>
      </motion.button>
    </div>
    
    {/* Render Redirect Popup if there is a URL */}
    {redirectUrl && (
      <div className="fixed inset-0 z-[200]">
        <RedirectPopup targetUrl={redirectUrl} onClose={() => setRedirectUrl(null)} />
      </div>
    )}
    </>
  );
};

export default OverlayMenu;
