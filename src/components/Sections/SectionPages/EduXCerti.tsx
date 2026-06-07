import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCertificate, faTimes, faAward } from '@fortawesome/free-solid-svg-icons';
import { education } from '../../../models/Education';
import { certificate } from '../../../models/Certificate';

type EduCertPopupProps = {
  open: boolean;
  onClose: () => void;
};

const EduCertPopup: React.FC<EduCertPopupProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] h-full flex items-center justify-center p-8 bg-slate-900/40 backdrop-blur-sm portrait:p-2"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-5xl h-[95%] mb-4 portrait:mb-0 portrait:h-[96%] portrait:w-[98%] flex flex-col bg-[#c2d6e3] border-4 portrait:border-2 border-slate-900 rounded-3xl p-6 portrait:p-3 shadow-[8px_8px_0_0_rgba(15,23,42,1)] portrait:shadow-[4px_4px_0_0_rgba(15,23,42,1)]"
      >
        {/* Header & Close Button */}
        <div className="flex justify-between items-center mb-6 portrait:mb-2 border-b-4 portrait:border-b-2 border-slate-900/10 pb-4 portrait:pb-2 shrink-0">
          <div>
            <h2 className="text-3xl portrait:text-xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3 portrait:gap-2">
              <div className="w-12 h-12 portrait:w-8 portrait:h-8 bg-blue-500 rounded-xl portrait:rounded-lg border-[3px] portrait:border-2 border-slate-900 flex items-center justify-center text-white shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
                <FontAwesomeIcon icon={faGraduationCap} className="portrait:text-sm" />
              </div>
              <span className="portrait:tracking-tight">HỌC VẤN & CHỨNG CHỈ</span>
            </h2>
            <div className="h-1 w-20 bg-slate-900 rounded-full mt-2 portrait:hidden" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="group relative pl-4 pr-6 py-2 portrait:p-0 portrait:w-8 portrait:h-8 bg-rose-500/10 hover:bg-rose-400/90 border-[3px] portrait:border-2 border-slate-900 rounded-xl portrait:rounded-lg shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-3 portrait:gap-0"
          >
            <div className="absolute -top-2 -left-2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded-md border border-white font-black shadow-sm z-10 portrait:hidden">
              ESC
            </div>

            <div className="w-6 h-6 portrait:w-4 portrait:h-4 flex items-center justify-center text-rose-600 group-hover:text-white group-hover:rotate-90 transition-transform duration-300">
              <FontAwesomeIcon icon={faTimes} className="text-lg portrait:text-sm" />
            </div>

            <div className="flex flex-col items-start leading-none portrait:hidden">
              <span className="text-slate-900 group-hover:text-white font-black text-sm tracking-tighter uppercase italic drop-shadow-sm">
                Close
              </span>
            </div>

            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-lg portrait:rounded-t-md pointer-events-none" />
          </motion.button>
        </div>

        {/* Content Area */}
        {/* QUAN TRỌNG: Dùng flex-row kể cả ở chế độ xoay dọc để giữ 2 cột */}
        <div className="flex flex-row flex-1 gap-8 portrait:gap-3 overflow-hidden h-full">
          
          {/* CỘT TRÁI: Education Column */}
          <div className="flex-1 portrait:flex-[0.5] flex flex-col h-full">
            <h3 className="text-xl portrait:text-sm font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-2 mb-4 portrait:mb-2 shrink-0">
               <FontAwesomeIcon icon={faGraduationCap} className="text-blue-500" /> Hành trình học tập
            </h3>
            <div className="flex-1 overflow-y-auto pr-4 portrait:pr-1 custom-scrollbar space-y-6 portrait:space-y-3 pt-1">
              {education.map((edu, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={edu.id} 
                  // Ẩn trục timeline bên trái trên mobile để tiết kiệm diện tích ngang
                  className="relative pl-6 portrait:pl-0 before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] last:before:hidden before:w-0.5 before:bg-white/60 portrait:before:hidden"
                >
                  {/* Ẩn dấu chấm tròn trên mobile */}
                  <div className="absolute left-0 top-1 w-6 h-6 bg-white/40 backdrop-blur-sm border-2 border-white rounded-full shadow-[0_4px_10px_rgba(255,255,255,0.3)] z-10 portrait:hidden" />
                  
                  {/* Chuyển thiết kế sang khối kính (Liquid Glass Timeline) nhẹ nhàng hơn */}
                  <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl p-4 portrait:p-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:bg-white/40 transition-all ml-4 portrait:ml-0">
                    <span className="inline-block px-2 portrait:px-1.5 py-1 portrait:py-0.5 bg-white/50 backdrop-blur-sm text-blue-800 text-[10px] portrait:text-[8px] font-black uppercase italic rounded-md border border-white/60 mb-2 portrait:mb-1">
                      {edu.time}
                    </span>
                    <h4 className="font-black text-slate-800 text-lg portrait:text-[11px] uppercase italic leading-tight">
                      {edu.title}
                    </h4>
                    <p className="text-slate-600 font-medium text-xs portrait:text-[9px] mt-2 portrait:mt-1">{edu.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-1 portrait:w-[2px] bg-slate-900/10 rounded-full h-full hidden md:block portrait:block shrink-0" />

          {/* CỘT PHẢI: Certificate Column */}
          <div className="flex-1 portrait:flex-[0.5] flex flex-col h-full">
            <h3 className="text-xl portrait:text-sm font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-2 mb-4 portrait:mb-2 shrink-0">
               <FontAwesomeIcon icon={faCertificate} className="text-orange-500" /> Chứng chỉ nổi bật
            </h3>
            <div className="flex-1 overflow-y-auto pr-4 portrait:pr-1 custom-scrollbar space-y-4 portrait:space-y-2 pt-1">
              {certificate.map((cert, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={cert.id}
                  // Cấu trúc Glassmorphism đồng nhất với cột Education
                  className="bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl p-4 portrait:p-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.05)] flex items-start gap-4 portrait:gap-2.5 hover:bg-white/40 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 portrait:w-8 portrait:h-8 bg-white/50 backdrop-blur-sm rounded-xl portrait:rounded-lg border border-white/60 flex items-center justify-center text-orange-500 text-2xl portrait:text-sm shadow-inner group-hover:scale-110 transition-transform shrink-0">
                    <FontAwesomeIcon icon={faAward} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 uppercase italic leading-tight portrait:text-[11px]">{cert.title}</h4>
                    <div className="flex items-center gap-2 portrait:gap-1.5 mt-1 portrait:mt-0.5">
                      <span className="text-[10px] portrait:text-[8px] font-black text-slate-500 uppercase tracking-widest">{cert.time}</span>
                      {cert.subDesc && (
                        <>
                          <span className="w-1 h-1 bg-slate-400/50 rounded-full" />
                          <span className="text-[10px] portrait:text-[8px] font-bold text-orange-600">{cert.subDesc}</span>
                        </>
                      )}
                    </div>
                    {cert.desc && <p className="text-slate-600 font-medium text-xs portrait:text-[9px] mt-2 portrait:mt-1 leading-relaxed">{cert.desc}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        @media (orientation: portrait) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
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

export default EduCertPopup;