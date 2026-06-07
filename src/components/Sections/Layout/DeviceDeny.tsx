import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { playPopBtnSound } from "../../common/playUiSound";
import SimpleProjects from "../SectionPages/SimpleProjects";

type DeviceDenyProps = {
  open: boolean;
  onClose: () => void;
};

const DeviceDeny: React.FC<DeviceDenyProps> = ({ open, onClose }) => {
  const [showSimple, setShowSimple] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      setIsPortrait(
        typeof window !== "undefined" && window.matchMedia("(orientation: portrait)").matches
      );
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  useEffect(() => {
    if (!open) setShowSimple(false);
  }, [open]);

  if (!open || !isPortrait) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-12 bg-slate-900/40 backdrop-blur-sm select-none"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-sm bg-[#c2d6e3] border-2 border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(15,23,42,1)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Area */}
        <div className="flex items-center justify-between gap-3 border-b-2 border-slate-900/10 pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-amber-500 rounded-lg border-2 border-slate-900 flex items-center justify-center text-white shadow-[2px_2px_0_0_rgba(15,23,42,1)] shrink-0">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-sm" />
            </div>
            <h2 className="text-base font-black uppercase tracking-tight leading-none text-slate-900">
              Góc nhìn hạn chế!
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              playPopBtnSound();
              onClose();
            }}
            className="flex items-center justify-center w-7 h-7 rounded-md bg-rose-500/10 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] transition hover:bg-rose-400/90 active:translate-x-px active:translate-y-px shrink-0"
          >
            <FontAwesomeIcon icon={faTimes} className="text-rose-600 text-xs" />
          </button>
        </div>

        {!showSimple ? (
          <div className="flex flex-col gap-4">
            {/* Vùng Nội Dung Trọng Điểm - Đã bỏ hết div bọc rườm rà */}
            <div className="space-y-2.5 text-slate-800 font-bold text-[11px] leading-relaxed">
              <p className="bg-white/60 border border-slate-900/20 px-3 py-2 rounded-xl">
                ➢ Trải nghiệm không gian <span className="text-orange-600 font-black">Máy Bay 3D</span> chỉ hoạt động tốt nhất trên <span className="text-slate-900 font-black">Màn hình máy tính</span>.
              </p>
              <p className="bg-white/60 border border-slate-900/20 px-3 py-2 rounded-xl">
                ➢ Ở chế độ dọc của điện thoại, hệ thống sẽ tự động tắt tương tác bay để <span className="text-emerald-600 font-black">tránh hiện tượng giật lag</span> hoặc lệch khung hình.
              </p>
              <p className="bg-white/60 border border-slate-900/20 px-3 py-2 rounded-xl">
                ➢ Bạn vẫn có thể dùng <span className="text-sky-600 font-black">Chế độ xem đơn giản</span> để thực hiện lọc dự án, đọc thông tin và xem chi tiết đầy đủ.
              </p>
            </div>

            {/* Vùng nút bấm */}
            <div className="flex flex-col gap-2 shrink-0 pt-1">
              <button
                type="button"
                onClick={() => {
                  playPopBtnSound();
                  setShowSimple(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-[11px] font-black uppercase tracking-[0.1em] text-white shadow-[2px_2px_0_0_rgba(15,23,42,1)] transition hover:bg-slate-800 active:translate-y-px active:shadow-none"
              >
                Giao diện đơn giản
              </button>
              <button
                type="button"
                onClick={() => {
                  playPopBtnSound();
                  onClose();
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/80 py-2.5 text-[11px] font-black uppercase tracking-[0.1em] text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] transition hover:bg-slate-50 active:translate-y-px active:shadow-none"
              >
                Quay lại Menu chính
              </button>
            </div>
          </div>
        ) : (
          <SimpleProjects onClose={onClose} onBack={() => setShowSimple(false)} />
        )}
      </motion.div>
    </div>
  );
};

export default DeviceDeny;