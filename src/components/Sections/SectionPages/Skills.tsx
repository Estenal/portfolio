import React, { useEffect, useRef, useState } from 'react';
import DevelopmentSkills from './SkillSubSection/DevelopmentSkills';
import { faTimes, faWrench } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DesignSkills from './SkillSubSection/DesignSkills';
import SoftSkills from './SkillSubSection/SoftSkills';
import { playPopBtnSound } from '../../common/playUiSound';
//import ServerManagementSkills from './SkillSubSection/ServerManagementSkills';

interface CardItem {
  id: number;
  title: string;
  subtitle: string;
}

const data: CardItem[] = [
  { id: 1, title: "Development Skills", subtitle: "Coding & Database Architecture" },
  { id: 2, title: "Graphic Design Skills", subtitle: "2D/3D & UI/UX" },
  { id: 3, title: "Server Management", subtitle: "DevOps & Deployment" },
  { id: 4, title: "Soft Skills", subtitle: "Communication & Teamwork" },
];

type SkillsPopupProps = {
  open: boolean;
  onClose: () => void;
};

const SkillsPopup: React.FC<SkillsPopupProps> = ({ open, onClose }) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    detailRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.maxHeight = activeIndex === index + 1 ? `${ref.scrollHeight}px` : '0px';
      }
    });
  }, [activeIndex, open]);

  const handleToggle = (id: number) => {
    if (activeIndex !== id) {
      playPopBtnSound();
      setActiveIndex(id);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 portrait:p-2 bg-slate-900/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        // Mở rộng size popup trên mobile, giảm padding
        className="relative w-5/6 portrait:w-[96%] h-[95%] mb-4 portrait:mb-0 flex flex-col bg-[#c2d6e3] border-4 border-slate-900 rounded-3xl p-6 portrait:p-3 shadow-[8px_8px_0_0_rgba(15,23,42,1)] portrait:shadow-[4px_4px_0_0_rgba(15,23,42,1)]"
      >
        {/* Header & Close Button */}
        <div className="flex justify-between items-center mb-6 portrait:mb-3 border-b-4 portrait:border-b-2 border-slate-900/10 pb-4 portrait:pb-2">
          <div>
            <h2 className="text-3xl portrait:text-xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3 portrait:gap-2">
              <div className="w-12 h-12 portrait:w-8 portrait:h-8 bg-orange-400 rounded-xl portrait:rounded-lg border-[3px] portrait:border-2 border-slate-900 flex items-center justify-center text-white shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
                <FontAwesomeIcon icon={faWrench} className="portrait:text-sm" />
              </div>
              <span className="portrait:tracking-tight">KỸ NĂNG & CHUYÊN MÔN</span>
            </h2>
            {/* Ẩn dòng sub-text tốn diện tích dọc trên màn hình điện thoại */}
            <div className="flex flex-row gap-2 justify-start items-center portrait:hidden mt-1">
              <div className="h-1 w-20 bg-slate-900 rounded-full" />
              <p className="text-sm italic text-slate-600">
                Chính xác lên đến 67% còn 36% là var - Làm việc với 103% hiệu năng
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            // Thu nhỏ nút close thành hình vuông nhỏ trên mobile
            className="group relative pl-4 pr-6 py-2 portrait:p-2 portrait:w-10 portrait:h-10 bg-rose-500/10 hover:bg-rose-400/90 border-[3px] portrait:border-2 border-slate-900 rounded-xl portrait:rounded-lg shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-3 portrait:gap-0"
          >
            {/* Ẩn nhãn ESC */}
            <div className="absolute -top-2 -left-2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded-md border border-white font-black shadow-sm z-10 portrait:hidden">
              ESC
            </div>

            <div className="w-6 h-6 portrait:w-5 portrait:h-5 flex items-center justify-center text-rose-600 group-hover:text-white group-hover:rotate-90 transition-transform duration-300">
              <FontAwesomeIcon icon={faTimes} className="text-lg portrait:text-base" />
            </div>

            {/* Ẩn chữ Close */}
            <div className="flex flex-col items-start leading-none portrait:hidden">
              <span className="text-slate-900 group-hover:text-white font-black text-sm tracking-tighter uppercase italic drop-shadow-sm">
                Close
              </span>
            </div>

            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-lg portrait:rounded-t-md pointer-events-none" />
          </motion.button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 gap-6 portrait:gap-3 overflow-hidden">
          {/* Sidebar Cards */}
          {/* Tăng tỷ lệ chiều rộng sidebar xíu trên mobile để chữ không bị rớt dòng quá lắt nhắt */}
          <div className="w-[30%] portrait:w-[35%] space-y-4 portrait:space-y-2 overflow-y-auto pr-2 portrait:pr-1 custom-scrollbar">
            {data.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className={`block relative select-none cursor-pointer p-4 portrait:p-2.5 rounded-xl portrait:rounded-lg border-[3px] portrait:border-2 border-slate-900
                shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] transition-all duration-200 
                  ${activeIndex === item.id 
                    ? 'bg-blue-500 text-white translate-x-[2px] translate-y-[2px] shadow-none portrait:translate-x-[1px] portrait:translate-y-[1px]' 
                    : 'bg-white hover:bg-sky-50 text-slate-900 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(15,23,42,1)] portrait:hover:translate-y-0 portrait:hover:shadow-[2px_2px_0_0_rgba(15,23,42,1)]'}`}
              >
                <div className="flex items-center gap-3 portrait:gap-2">
                  {/* Dấu chấm indicator */}
                  <span
                    className={`inline-block shadow rounded-full transition-all duration-700 w-3 portrait:w-2 
                      ${activeIndex === item.id ? 'h-6 portrait:h-4 bg-white border-2 border-slate-900' : 'h-3 portrait:h-2 bg-slate-300 border-2 portrait:border-[1.5px] border-slate-400'}`}
                  />
                  <span className="font-black italic uppercase tracking-tighter portrait:text-[11px] portrait:leading-tight">
                    {item.title}
                  </span>
                </div>

                {/* Ẩn Subtitle accordion trên mobile để danh sách trông gọn gàng */}
                <div
                  ref={(el) => { detailRefs.current[index] = el; }}
                  className="overflow-hidden transition-all duration-300 ease-in-out portrait:hidden"
                  style={{ maxHeight: activeIndex === item.id ? '100px' : '0px' }}
                >
                  <p className={`text-[10px] uppercase font-bold mt-2 pt-2 border-t-2 ${activeIndex === item.id ? 'border-white/30 text-blue-100' : 'border-slate-200 text-slate-500'}`}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div className="w-[70%] portrait:w-[65%] h-full rounded-2xl portrait:rounded-xl bg-white border-[4px] portrait:border-2 border-slate-900 shadow-[inset_4px_4px_0_0_rgba(15,23,42,0.05)] overflow-y-auto custom-scrollbar relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                {activeIndex === 1 && <DevelopmentSkills />}
                {activeIndex === 2 && <DesignSkills />}
                {activeIndex === 3 && 
                <div className="flex flex-col items-center justify-center h-full gap-6 portrait:gap-3">
                  <FontAwesomeIcon icon={faWrench} className="text-6xl portrait:text-4xl text-slate-400" />
                  <p className="text-xl portrait:text-sm font-bold text-slate-600 italic text-center px-4">
                    Server Management Skills Is Pending...
                  </p>
                </div>
                }
                {/*{activeIndex === 3 && <ServerManagementSkills />}*/}
                {activeIndex === 4 && <SoftSkills />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        @media (orientation: portrait) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px; /* Trục cuộn mỏng hơn trên mobile */
          }
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
 
export default SkillsPopup;