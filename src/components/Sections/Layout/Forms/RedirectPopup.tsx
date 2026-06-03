import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faExternalLinkAlt, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { playPopBtnSound } from "../../../common/playUiSound";

interface RedirectPopupProps {
  targetUrl: string;
  onClose: () => void;
}

const RedirectPopup: React.FC<RedirectPopupProps> = ({ targetUrl, onClose }) => {
  const handleAction = (callback: () => void) => {
    playPopBtnSound();
    callback();
  };

  const handleConfirm = () => {
    handleAction(() => {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      onClose();
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleAction(onClose);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm select-none"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleAction(onClose);
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-11/12 md:w-full max-w-lg bg-sky-100/80 backdrop-blur-xl border-4 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0_0_rgba(15,23,42,1)] flex flex-col"
      >
        {/* Header & Close Button - Đồng bộ với Skills.tsx */}
        <div className="flex justify-between items-center mb-6 border-b-4 border-slate-900/10 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-xl border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)]">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
              LIÊN KẾT BÊN NGOÀI
            </h2>
            <div className="flex flex-row gap-2 justify-start items-center mt-2">
              <div className="h-1 w-12 md:w-20 bg-slate-900 rounded-full" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction(onClose)}
            className="group relative pl-4 pr-6 py-2 bg-rose-500/10 hover:bg-rose-400/90 border-[3px] border-slate-900 rounded-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-3 self-start"
          >
            <div className="absolute -top-2 -left-2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded-md border border-white font-black shadow-sm z-10">
              ESC
            </div>

            <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-rose-600 group-hover:text-white group-hover:rotate-90 transition-transform duration-300">
              <FontAwesomeIcon icon={faTimes} className="text-base md:text-lg" />
            </div>

            <div className="flex flex-col items-start leading-none sm:flex">
              <span className="text-slate-900 group-hover:text-white font-black text-sm tracking-tighter uppercase italic drop-shadow-sm">
                Close
              </span>
            </div>

            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-lg pointer-events-none" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center mb-6 px-2">
          <p className="text-center text-slate-700 font-bold text-sm mb-4 leading-relaxed">
            Bạn đang chuẩn bị chuyển hướng đến một trang web khác. Hãy xác nhận rằng bạn muốn tiếp tục.
          </p>

          {/* Khu vực hiển thị Link (Dạng Card nhỏ) */}
          <div className="w-full bg-white border-[3px] border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(15,23,42,1)] flex items-center gap-4 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border-2 border-slate-900 flex items-center justify-center text-slate-500 text-lg flex-shrink-0">
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                Target URL
              </p>
              <p className="text-slate-800 font-bold text-xs sm:text-sm truncate italic underline">
                {targetUrl}
              </p>
            </div>
          </div>
        </div>

        {/* Nhóm nút bấm điều khiển */}
        <div className="w-full flex flex-col-reverse sm:flex-row gap-4 mt-2">
          {/* Nút Hủy */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction(onClose)}
            className="flex-1 py-3 px-4 bg-white hover:bg-slate-100 border-[3px] border-slate-900 rounded-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] flex items-center justify-center gap-2 text-slate-900 font-black italic uppercase active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <FontAwesomeIcon icon={faTimes} className="text-rose-500" />
            Hủy Bỏ
          </motion.button>

          {/* Nút Tiếp tục */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 bg-emerald-400 hover:bg-emerald-300 border-[3px] border-slate-900 rounded-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] flex items-center justify-center gap-2 text-slate-900 font-black italic uppercase active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <FontAwesomeIcon icon={faCheck} />
            Tiếp Tục
          </motion.button>
        </div>

      </motion.div>
    </div>
  );
};

export default RedirectPopup;