import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTimes, faCopy, faCheck, faAddressBook, 
  faEnvelope, faPhone, faPaperPlane, faLink, faQrcode
} from "@fortawesome/free-solid-svg-icons";
import { playPopBtnSound } from "../../../common/playUiSound";
import { LinkResources } from "../../../../models/Portfolio";

interface ContactPopupProps {
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const emailAddress = LinkResources.email.replace(/^mailto:/, "");
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
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 portrait:p-2 bg-slate-900/40 backdrop-blur-sm select-none"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleAction(onClose);
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        // Bóp nhỏ padding và chiều cao trên portrait
        className="relative w-11/12 md:w-5/6 portrait:w-[98%] max-w-4xl portrait:h-[96%] bg-sky-100/80 backdrop-blur-xl border-4 portrait:border-2 border-slate-900 rounded-3xl portrait:rounded-2xl p-6 portrait:p-3 shadow-[8px_8px_0_0_rgba(15,23,42,1)] portrait:shadow-[4px_4px_0_0_rgba(15,23,42,1)] flex flex-col"
      >
        {/* Header & Close Button */}
        <div className="flex justify-between items-center mb-6 portrait:mb-2 border-b-4 portrait:border-b-2 border-slate-900/10 pb-4 portrait:pb-2 shrink-0">
          <div>
            <h2 className="text-2xl md:text-3xl portrait:text-lg font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3 portrait:gap-2 leading-none">
              <div className="w-10 h-10 md:w-12 md:h-12 portrait:w-8 portrait:h-8 bg-orange-400 rounded-xl portrait:rounded-lg border-[3px] portrait:border-2 border-slate-900 flex items-center justify-center text-white shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] shrink-0">
                <FontAwesomeIcon icon={faAddressBook} className="portrait:text-sm" />
              </div>
              <span className="portrait:mt-0.5">Thông Tin Liên Hệ</span>
            </h2>
            <div className="flex flex-row gap-2 justify-start items-center mt-2 portrait:hidden">
              <div className="h-1 w-12 md:w-20 bg-slate-900 rounded-full" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction(onClose)}
            // Nút tắt nhỏ gọn trên portrait
            className="group relative pl-4 pr-6 py-2 portrait:p-0 portrait:w-8 portrait:h-8 bg-rose-500/10 hover:bg-rose-400/90 border-[3px] portrait:border-2 border-slate-900 rounded-xl portrait:rounded-lg shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-3 shrink-0"
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

            <div className="absolute top-0 left-0 w-full h-1/2 bg-sky-50/10 rounded-t-lg portrait:rounded-t-md pointer-events-none" />
          </motion.button>
        </div>

        {/* BỐ CỤC 2 CỘT: ÉP grid-cols-2 CHO PORTRAIT ĐỂ TẬN DỤNG CHIỀU NGANG */}
        <div className="grid grid-cols-1 md:grid-cols-2 portrait:grid-cols-2 gap-6 portrait:gap-3 flex-1 relative z-10 overflow-y-auto portrait:overflow-y-hidden custom-scrollbar">
          
          {/* CỘT TRÁI: EMAIL & PHONE */}
          <div className="flex flex-col gap-5 portrait:gap-2">
            <div className="flex items-center gap-2 pl-2 portrait:pl-1">
              <div className="h-2 w-2 portrait:h-1.5 portrait:w-1.5 bg-slate-900 rounded-full" />
              <span className="text-xs portrait:text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] italic">
                Direct Channels
              </span>
            </div>

            {/* Email Block */}
            <div className="group flex flex-col xl:flex-row items-start xl:items-center justify-between p-5 portrait:p-2 bg-sky-50 border-[3px] portrait:border-2 border-slate-900 rounded-2xl portrait:rounded-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] hover:-translate-y-1 portrait:hover:translate-y-0 transition-all duration-300 gap-4 portrait:gap-2">
              <div className="flex items-center gap-4 portrait:gap-2">
                <div className="w-12 h-12 portrait:w-8 portrait:h-8 rounded-xl portrait:rounded-lg bg-rose-100 group-hover:bg-rose-500 group-hover:text-white border-2 border-slate-900 flex items-center justify-center text-rose-500 text-xl portrait:text-sm transition-colors duration-300 shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] portrait:text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 portrait:mb-0.5">Official Email</p>
                  <p className="font-black text-slate-800 text-sm md:text-base portrait:text-[10px] truncate selection:bg-rose-200">{emailAddress}</p>
                </div>
              </div>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={LinkResources.email}
                onClick={playPopBtnSound}
                className="w-full xl:w-auto px-5 py-2.5 portrait:px-3 portrait:py-1.5 bg-rose-500 text-white text-xs portrait:text-[9px] font-black rounded-xl portrait:rounded-lg border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] portrait:shadow-[1px_1px_0_0_rgba(15,23,42,1)] flex justify-center items-center gap-2 hover:bg-rose-400 active:shadow-none active:translate-x-px active:translate-y-px transition-all shrink-0"
              >
                SEND <FontAwesomeIcon icon={faPaperPlane} className="text-[10px] portrait:text-[8px]" />
              </motion.a>
            </div>

            {/* Phone Block */}
            <div className="group flex flex-col xl:flex-row items-start xl:items-center justify-between p-5 portrait:p-2 bg-sky-50 border-[3px] portrait:border-2 border-slate-900 rounded-2xl portrait:rounded-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] hover:-translate-y-1 portrait:hover:translate-y-0 transition-all duration-300 gap-4 portrait:gap-2">
              <div className="flex items-center gap-4 portrait:gap-2">
                <div className="w-12 h-12 portrait:w-8 portrait:h-8 rounded-xl portrait:rounded-lg bg-emerald-100 group-hover:bg-emerald-500 group-hover:text-white border-2 border-slate-900 flex items-center justify-center text-emerald-500 text-xl portrait:text-sm transition-colors duration-300 shrink-0">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <p className="text-[10px] portrait:text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 portrait:mb-0.5">Direct Line</p>
                  <p className="font-black text-slate-800 text-base portrait:text-[11px] italic selection:bg-emerald-200">{phoneNumber}</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyPhone}
                className={`w-full xl:w-auto px-5 py-2.5 portrait:px-3 portrait:py-1.5 text-xs portrait:text-[9px] font-black rounded-xl portrait:rounded-lg border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] portrait:shadow-[1px_1px_0_0_rgba(15,23,42,1)] flex justify-center items-center gap-2 text-white active:shadow-none active:translate-x-px active:translate-y-px transition-all shrink-0
                  ${copied ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-slate-900 hover:bg-slate-700'}`}
              >
                {copied ? 'COPIED' : 'COPY'} <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-[10px] portrait:text-[8px]" />
              </motion.button>
            </div>
          </div>

          {/* CỘT PHẢI: ZALO MESSENGER + QR CODE */}
          <div className="flex flex-col gap-5 portrait:gap-2 h-full overflow-hidden">
            <div className="flex items-center gap-2 pl-2 portrait:pl-1 shrink-0">
              <div className="h-2 w-2 portrait:h-1.5 portrait:w-1.5 bg-slate-900 rounded-full" />
              <span className="text-xs portrait:text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] italic">
                Instant Network
              </span>
            </div>

            <div className="group flex flex-col p-6 portrait:p-2 bg-sky-50 border-[3px] portrait:border-2 border-slate-900 rounded-[2rem] portrait:rounded-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] hover:-translate-y-2 portrait:hover:translate-y-0 transition-all duration-300 h-full justify-between items-center text-center relative overflow-hidden">
              
              <div className="w-full flex justify-between items-start mb-2 portrait:mb-1 relative z-10 shrink-0">
                <div className="flex items-center gap-3 portrait:gap-1.5">
                  <div className="w-12 h-12 portrait:w-7 portrait:h-7 rounded-xl portrait:rounded-md border-2 border-slate-900 flex items-center justify-center bg-sky-50 overflow-hidden group-hover:scale-110 portrait:group-hover:scale-100 transition-transform duration-300 shadow-[2px_2px_0_0_rgba(15,23,42,1)] portrait:shadow-sm shrink-0">
                    <img src="/UI/icons/Zalo.svg" alt="Zalo Icon" className="w-8 h-8 portrait:w-5 portrait:h-5 object-contain" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] portrait:text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 portrait:mb-0.5 truncate">Zalo Protocol</p>
                    <p className="font-black text-slate-800 text-sm portrait:text-[9px] truncate">Quét mã để kết nối</p>
                  </div>
                </div>
                <div className="text-slate-300 group-hover:text-blue-500 transition-colors shrink-0">
                  <FontAwesomeIcon icon={faQrcode} className="text-2xl portrait:text-sm portrait:mt-1 mr-1" />
                </div>
              </div>

              {/* KHU VỰC CHỨA MÃ QR ZALO NỔI BẬT: Ép nhỏ lại trên portrait để không bị tràn màn hình dọc */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 portrait:w-[90px] portrait:h-[90px] bg-slate-50 p-3 portrait:p-1.5 rounded-3xl portrait:rounded-xl border-[4px] portrait:border-2 border-slate-900 shadow-[6px_6px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] group-hover:scale-105 portrait:group-hover:scale-100 transition-all duration-300 flex-shrink-0 my-4 portrait:my-1 z-10">
                <img 
                  src="/QR/Zalo.png" 
                  alt="Zalo QR Code" 
                  className="w-full h-full object-cover rounded-xl portrait:rounded-lg"
                />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-sky-50/20 pointer-events-none rounded-t-3xl portrait:rounded-t-xl" />
                
                {/* Ẩn các góc trang trí trên mobile để cho gọn */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-[4px] border-l-[4px] border-blue-500 rounded-tl-xl transition-all duration-300 group-hover:-top-3 group-hover:-left-3 portrait:hidden" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-[4px] border-r-[4px] border-blue-500 rounded-tr-xl transition-all duration-300 group-hover:-top-3 group-hover:-right-3 portrait:hidden" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-[4px] border-l-[4px] border-blue-500 rounded-bl-xl transition-all duration-300 group-hover:-bottom-3 group-hover:-left-3 portrait:hidden" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-[4px] border-r-[4px] border-blue-500 rounded-br-xl transition-all duration-300 group-hover:-bottom-3 group-hover:-right-3 portrait:hidden" />
              </div>

              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={LinkResources.zalo} 
                target="_blank" 
                rel="noreferrer"
                onClick={playPopBtnSound}
                className="w-full px-4 py-3 portrait:px-2 portrait:py-1.5 bg-blue-500 hover:bg-blue-400 text-white text-sm portrait:text-[8px] font-black rounded-xl portrait:rounded-lg border-[3px] portrait:border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[1px_1px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-px active:translate-y-px transition-all flex justify-center items-center gap-2 mt-2 portrait:mt-1 relative z-10 shrink-0"
              >
                MỞ ZALO HOẶC NHẤN VÀO ĐÂY <FontAwesomeIcon icon={faLink} className="text-xs portrait:text-[8px]" />
              </motion.a>

              {/* Background pattern trang trí */}
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] portrait:[background-size:8px_8px] opacity-50 pointer-events-none z-0"></div>
            </div>
          </div>

        </div>

      </motion.div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(15, 23, 42, 0.8);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default ContactPopup;