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

  //gán trực tiếp vào button đê tránh bị chặn bởi trình duyệt
  // //Debug window.open có thể bị chặn bởi trình duyệt nếu không được kích hoạt bởi một sự kiện người dùng (như click). Đảm bảo rằng handleConfirm được gọi trong ngữ cảnh của một sự kiện người dùng để tránh bị chặn.
  // const handleConfirm = () => {
  //   handleAction(() => {
  //     const newWindow = window.open(targetUrl, "_blank");
  //     if (newWindow) {
  //       newWindow.opener = null; // đảm bảo không có tham chiếu ngược
  //     }
  //     onClose();
  //   });
  // };


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
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 portrait:p-2 bg-slate-900/40 backdrop-blur-sm select-none"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleAction(onClose);
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-11/12 md:w-full max-w-lg bg-sky-100/80 backdrop-blur-xl border-4 portrait:border-2 border-slate-900 rounded-3xl portrait:rounded-2xl p-6 portrait:p-3 shadow-[8px_8px_0_0_rgba(15,23,42,1)] portrait:shadow-[4px_4px_0_0_rgba(15,23,42,1)] flex flex-col"
      >
        {/* Header & Close Button */}
        <div className="flex justify-between items-center mb-6 portrait:mb-3 border-b-4 portrait:border-b-2 border-slate-900/10 pb-4 portrait:pb-2 shrink-0">
          <div>
            <h2 className="text-xl md:text-2xl portrait:text-base font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3 portrait:gap-2 leading-none">
              <div className="w-10 h-10 md:w-12 md:h-12 portrait:w-8 portrait:h-8 bg-yellow-400 rounded-xl portrait:rounded-lg border-[3px] portrait:border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] shrink-0">
                <FontAwesomeIcon icon={faExclamationTriangle} className="portrait:text-sm" />
              </div>
              <span className="portrait:mt-1">LIÊN KẾT NGOÀI</span>
            </h2>
            {/* Ẩn gạch ngang trang trí để tiết kiệm chiều cao */}
            <div className="flex flex-row gap-2 justify-start items-center mt-2 portrait:hidden">
              <div className="h-1 w-12 md:w-20 bg-slate-900 rounded-full" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction(onClose)}
            // Tối ưu thành nút vuông nhỏ trên portrait
            className="group relative pl-4 pr-6 py-2 portrait:p-0 portrait:w-8 portrait:h-8 bg-rose-500/10 hover:bg-rose-400/90 border-[3px] portrait:border-2 border-slate-900 rounded-xl portrait:rounded-lg shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-3 self-start shrink-0"
          >
            <div className="absolute -top-2 -left-2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded-md border border-white font-black shadow-sm z-10 portrait:hidden">
              ESC
            </div>

            <div className="w-5 h-5 md:w-6 md:h-6 portrait:w-4 portrait:h-4 flex items-center justify-center text-rose-600 group-hover:text-white group-hover:rotate-90 transition-transform duration-300">
              <FontAwesomeIcon icon={faTimes} className="text-base md:text-lg portrait:text-sm" />
            </div>

            <div className="flex flex-col items-start leading-none sm:flex portrait:hidden">
              <span className="text-slate-900 group-hover:text-white font-black text-sm tracking-tighter uppercase italic drop-shadow-sm">
                Close
              </span>
            </div>

            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-lg portrait:rounded-t-md pointer-events-none" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center mb-6 portrait:mb-3 px-2 portrait:px-0">
          <p className="text-center text-slate-700 font-bold text-sm portrait:text-[11px] mb-4 portrait:mb-2.5 leading-relaxed portrait:leading-snug">
            Bạn đang chuẩn bị chuyển hướng đến một trang web khác. Hãy xác nhận rằng bạn muốn tiếp tục.
          </p>

          {/* Khu vực hiển thị Link (Dạng Card nhỏ) */}
          <div className="w-full bg-white border-[3px] portrait:border-2 border-slate-900 rounded-2xl portrait:rounded-xl p-4 portrait:p-2.5 shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] flex items-center gap-4 portrait:gap-3 overflow-hidden">
            <div className="w-10 h-10 portrait:w-8 portrait:h-8 rounded-xl portrait:rounded-lg bg-slate-100 border-2 portrait:border-[1.5px] border-slate-900 flex items-center justify-center text-slate-500 text-lg portrait:text-sm flex-shrink-0">
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] portrait:text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 portrait:mb-0.5">
                Target URL
              </p>
              <p className="text-slate-800 font-bold text-xs sm:text-sm portrait:text-[10px] truncate italic underline">
                {targetUrl}
              </p>
            </div>
          </div>
        </div>

        {/* Nhóm nút bấm điều khiển */}
        {/* ÉP CỨNG flex-row TRÊN PORTRAIT ĐỂ NÚT KHÔNG XẾP CHỒNG LÊN NHAU */}
        <div className="w-full flex flex-col-reverse sm:flex-row portrait:flex-row gap-4 portrait:gap-2 mt-2 portrait:mt-1">
          {/* Nút Hủy */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction(onClose)}
            className="flex-1 py-3 px-4 portrait:py-2 portrait:px-3 bg-white hover:bg-slate-100 border-[3px] portrait:border-2 border-slate-900 rounded-xl portrait:rounded-lg shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] flex items-center justify-center gap-2 portrait:gap-1.5 text-slate-900 font-black portrait:text-[11px] italic uppercase active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <FontAwesomeIcon icon={faTimes} className="text-rose-500" />
            Hủy Bỏ
          </motion.button>

          {/* Nút Tiếp tục */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction(() => window.open(targetUrl, "_blank"))}
            className="flex-1 py-3 px-4 portrait:py-2 portrait:px-3 bg-emerald-400 hover:bg-emerald-300 border-[3px] portrait:border-2 border-slate-900 rounded-xl portrait:rounded-lg shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] flex items-center justify-center gap-2 portrait:gap-1.5 text-slate-900 font-black portrait:text-[11px] italic uppercase active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
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