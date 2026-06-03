import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTimes, faCopy, faCheck, faAddressBook, 
  faEnvelope, faPhone, faPaperPlane, faLink, faQrcode
} from "@fortawesome/free-solid-svg-icons";
import { playPopBtnSound } from "../../../common/playUiSound";

interface ContactPopupProps {
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = "0344003196";

  const handleAction = (callback: () => void) => {
    playPopBtnSound();
    callback();
  };

  const handleCopyPhone = () => {
    playPopBtnSound();
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        className="relative w-11/12 md:w-5/6 max-w-4xl bg-sky-100/80 backdrop-blur-xl border-4 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0_0_rgba(15,23,42,1)] flex flex-col"
      >
        {/* Header & Close Button - Đồng bộ với Skills.tsx */}
        <div className="flex justify-between items-center mb-6 border-b-4 border-slate-900/10 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-400 rounded-xl border-[3px] border-slate-900 flex items-center justify-center text-white shadow-[4px_4px_0_0_rgba(15,23,42,1)]">
                <FontAwesomeIcon icon={faAddressBook} />
              </div>
              Thông Tin Liên Hệ
            </h2>
            <div className="flex flex-row gap-2 justify-start items-center mt-2">
              <div className="h-1 w-12 md:w-20 bg-slate-900 rounded-full" />

            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction(onClose)}
            className="group relative pl-4 pr-6 py-2 bg-rose-500/10 hover:bg-rose-400/90 border-[3px] border-slate-900 rounded-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-3"
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

            <div className="absolute top-0 left-0 w-full h-1/2 bg-sky-50/10 rounded-t-lg pointer-events-none" />
          </motion.button>
        </div>

        {/* BỐ CỤC 2 CỘT TÁCH BIỆT RÕ RÀNG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 relative z-10">
          
          {/* CỘT TRÁI: EMAIL & PHONE */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 pl-2">
              <div className="h-2 w-2 bg-slate-900 rounded-full" />
              <span className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] italic">
                Direct Channels
              </span>
            </div>

            {/* Email Block */}
            <div className="group flex flex-col xl:flex-row items-start xl:items-center justify-between p-5 bg-sky-50 border-[3px] border-slate-900 rounded-2xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:shadow-[6px_6px_0_0_rgba(15,23,42,1)] hover:-translate-y-1 transition-all duration-300 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 group-hover:bg-rose-500 group-hover:text-white border-2 border-slate-900 flex items-center justify-center text-rose-500 text-xl transition-colors duration-300">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Official Email</p>
                  <p className="font-black text-slate-800 text-sm md:text-base selection:bg-rose-200">dev.estenal@gmail.com</p>
                </div>
              </div>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:dev.estenal@gmail.com"
                onClick={playPopBtnSound}
                className="w-full xl:w-auto px-5 py-2.5 bg-rose-500 text-white text-xs font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] flex justify-center items-center gap-2 hover:bg-rose-400 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                SEND <FontAwesomeIcon icon={faPaperPlane} className="text-[10px]" />
              </motion.a>
            </div>

            {/* Phone Block */}
            <div className="group flex flex-col xl:flex-row items-start xl:items-center justify-between p-5 bg-sky-50 border-[3px] border-slate-900 rounded-2xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:shadow-[6px_6px_0_0_rgba(15,23,42,1)] hover:-translate-y-1 transition-all duration-300 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-500 group-hover:text-white border-2 border-slate-900 flex items-center justify-center text-emerald-500 text-xl transition-colors duration-300">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Direct Line</p>
                  <p className="font-black text-slate-800 text-base italic selection:bg-emerald-200">{phoneNumber}</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyPhone}
                className={`w-full xl:w-auto px-5 py-2.5 text-xs font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] flex justify-center items-center gap-2 text-white active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all
                  ${copied ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-slate-900 hover:bg-slate-700'}`}
              >
                {copied ? 'COPIED' : 'COPY'} <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-[10px]" />
              </motion.button>
            </div>
          </div>

          {/* CỘT PHẢI: ZALO MESSENGER + QR CODE NỔI BẬT */}
          <div className="flex flex-col gap-5 h-full">
            <div className="flex items-center gap-2 pl-2">
              <div className="h-2 w-2 bg-slate-900 rounded-full" />
              <span className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] italic">
                Instant Network
              </span>
            </div>

            <div className="group flex flex-col p-6 bg-sky-50 border-[3px] border-slate-900 rounded-[2rem] shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:shadow-[8px_8px_0_0_rgba(15,23,42,1)] hover:-translate-y-2 transition-all duration-300 h-full justify-between items-center text-center relative overflow-hidden">
              
              <div className="w-full flex justify-between items-start mb-2 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl border-2 border-slate-900 flex items-center justify-center bg-sky-50 overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
                    <img src="/public/UI/icons/Zalo.svg" alt="Zalo Icon" className="w-8 h-8 object-contain" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Zalo Protocol</p>
                    <p className="font-black text-slate-800 text-sm">Quét mã để kết nối</p>
                  </div>
                </div>
                <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
                  <FontAwesomeIcon icon={faQrcode} className="text-2xl" />
                </div>
              </div>

              {/* KHU VỰC CHỨA MÃ QR ZALO NỔI BẬT */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-slate-50 p-3 rounded-3xl border-[4px] border-slate-900 shadow-[6px_6px_0_0_rgba(15,23,42,1)] group-hover:shadow-[8px_8px_0_0_rgba(15,23,42,1)] group-hover:scale-105 transition-all duration-300 flex-shrink-0 my-4 z-10">
                <img 
                  src="/public/QR/Zalo.png" 
                  alt="Zalo QR Code" 
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-sky-50/20 pointer-events-none rounded-t-3xl" />
                
                {/* Góc trang trí */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-[4px] border-l-[4px] border-blue-500 rounded-tl-xl transition-all duration-300 group-hover:-top-3 group-hover:-left-3" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-[4px] border-r-[4px] border-blue-500 rounded-tr-xl transition-all duration-300 group-hover:-top-3 group-hover:-right-3" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-[4px] border-l-[4px] border-blue-500 rounded-bl-xl transition-all duration-300 group-hover:-bottom-3 group-hover:-left-3" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-[4px] border-r-[4px] border-blue-500 rounded-br-xl transition-all duration-300 group-hover:-bottom-3 group-hover:-right-3" />
              </div>

              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://zaloapp.com/qr/p/prswiv5og11m" 
                target="_blank" 
                rel="noreferrer"
                onClick={playPopBtnSound}
                className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-400 text-white text-sm font-black rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex justify-center items-center gap-2 mt-2 relative z-10"
              >
                MỞ ZALO HOẶC NHẤN VÀO ĐÂY <FontAwesomeIcon icon={faLink} className="text-xs" />
              </motion.a>

              {/* Background pattern trang trí */}
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none z-0"></div>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default ContactPopup;