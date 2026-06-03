import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faCheckCircle,
  faGlobeAsia,
  faGlobeAmericas,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface LanguagePopupProps {
  currentLang: string;
  onSelect: (lang: string) => void;
  onClose: () => void;
}

const LanguagePopup: React.FC<LanguagePopupProps> = ({ currentLang, onSelect, onClose }) => {
  return (
    <div className="relative w-full flex justify-center">
      <div className="w-full max-w-sm bg-white border-[8px] border-slate-900 rounded-[3.5rem] p-8 shadow-[16px_16px_0_0_rgba(15,23,42,1)] relative flex flex-col items-center">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-xl border-[3px] border-slate-900 bg-rose-100 text-slate-900 flex items-center justify-center shadow-[3px_3px_0_0_rgba(15,23,42,1)] z-10"
          aria-label="Đóng"
        >
          <FontAwesomeIcon icon={faTimes} />
        </motion.button>
        
        {/* Header với Icon xoay */}
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-amber-400 w-16 h-16 rounded-2xl border-4 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faLanguage} className="text-slate-900 text-3xl animate-pulse" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">
            Chọn Ngôn Ngữ
          </h2>
          <p className="text-[10px] font-bold text-slate-400 mt-2 tracking-widest uppercase">Select Your Region</p>
        </div>

        {/* Danh sách các tùy chọn */}
        <div className="w-full space-y-4">
          <LanguageOption 
            id="vi"
            label="Tiếng Việt" 
            sub="Vietnamese"
            icon={faGlobeAsia}
            isSelected={currentLang === "vi"}
            onClick={() => onSelect("vi")}
            color="bg-sky-400"
          />

          <LanguageOption 
            id="en"
            label="English" 
            sub="United Kingdom"
            icon={faGlobeAmericas}
            isSelected={currentLang === "en"}
            onClick={() => onSelect("en")}
            color="bg-rose-400"
          />
        </div>

        {/* Footer ghi chú vô tri */}
        <div className="mt-8 pt-4 border-t-4 border-dashed border-slate-100 w-full text-center">
          <p className="text-[9px] font-black text-violet-600 uppercase tracking-widest italic">
            Chức năng này chưa xài dược đâu nha, chỉ làm cho đẹp thôi :v
          </p>
        </div>
      </div>
    </div>
  );
};

// Component con cho từng dòng chọn ngôn ngữ
const LanguageOption = ({ label, sub, icon, isSelected, onClick, color }: any) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative w-full p-4 rounded-2xl border-[4px] border-slate-900 transition-all flex items-center gap-4
        ${isSelected 
          ? `${color} shadow-[0_0_0_4px_rgba(255,255,255,1),6px_6px_0_0_rgba(15,23,42,1)]` 
          : 'bg-slate-50 shadow-[4px_4px_0_0_rgba(15,23,42,0.1)] grayscale opacity-70 hover:opacity-100 hover:grayscale-0'
        }`}
    >
      {/* Icon địa cầu */}
      <div className={`w-10 h-10 rounded-xl border-2 border-slate-900 flex items-center justify-center text-slate-900 bg-white`}>
        <FontAwesomeIcon icon={icon} className="text-xl" />
      </div>

      <div className="flex flex-col items-start leading-none">
        <span className="text-lg font-black text-slate-900 tracking-tighter uppercase italic">{label}</span>
        <span className="text-[9px] font-bold text-slate-900/40 uppercase mt-1 tracking-widest">{sub}</span>
      </div>

      {/* Dấu tích khi được chọn */}
      {isSelected && (
        <div className="ml-auto text-white drop-shadow-[2px_2px_0_rgba(15,23,42,1)]">
          <FontAwesomeIcon icon={faCheckCircle} className="text-xl animate-bounce" />
        </div>
      )}
    </motion.button>
  );
};

export default LanguagePopup;