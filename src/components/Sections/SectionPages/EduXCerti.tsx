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
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-5xl h-[85vh] md:h-[80vh] flex flex-col bg-[#c2d6e3] border-4 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0_0_rgba(15,23,42,1)]"
      >
        {/* Header & Close Button */}
        <div className="flex justify-between items-center mb-6 border-b-4 border-slate-900/10 pb-4 shrink-0">
          <div>
            <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl border-[3px] border-slate-900 flex items-center justify-center text-white shadow-[4px_4px_0_0_rgba(15,23,42,1)]">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              HỌC VẤN & CHỨNG CHỈ
            </h2>
            <div className="h-1 w-20 bg-slate-900 rounded-full mt-2" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="group relative pl-4 pr-6 py-2 bg-rose-500/10 hover:bg-rose-400/90 border-[3px] border-slate-900 rounded-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-3"
          >
            <div className="absolute -top-2 -left-2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded-md border border-white font-black shadow-sm z-10">
              ESC
            </div>

            <div className="w-6 h-6 flex items-center justify-center text-rose-600 group-hover:text-white group-hover:rotate-90 transition-transform duration-300">
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </div>

            <div className="flex flex-col items-start leading-none">
              <span className="text-slate-900 group-hover:text-white font-black text-sm tracking-tighter uppercase italic drop-shadow-sm">
                Close
              </span>
            </div>

            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-lg pointer-events-none" />
          </motion.button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 gap-8 overflow-hidden h-full">
          {/* Education Column */}
          <div className="flex-1 flex flex-col h-full">
            <h3 className="text-xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-2 mb-4 shrink-0">
               <FontAwesomeIcon icon={faGraduationCap} className="text-blue-500" /> Hành trình học tập
            </h3>
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-6">
              {education.map((edu, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={edu.id} 
                  className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] last:before:hidden before:w-1 before:bg-slate-900"
                >
                  <div className="absolute left-0 top-1 w-6 h-6 bg-yellow-400 border-[3px] border-slate-900 rounded-full shadow-[2px_2px_0_0_rgba(15,23,42,1)] z-10" />
                  <div className="bg-white border-[3px] border-slate-900 rounded-xl p-4 shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(15,23,42,1)] transition-all ml-4">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-[10px] font-black uppercase italic rounded-md border-2 border-slate-900 mb-2">
                      {edu.time}
                    </span>
                    <h4 className="font-black text-slate-900 text-lg uppercase italic leading-tight">
                      {edu.title}
                    </h4>
                    <p className="text-slate-600 font-bold text-xs mt-2">{edu.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-1 bg-slate-900/10 rounded-full h-full hidden md:block shrink-0" />

          {/* Certificate Column */}
          <div className="flex-1 flex flex-col h-full">
            <h3 className="text-xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-2 mb-4 shrink-0">
               <FontAwesomeIcon icon={faCertificate} className="text-orange-500" /> Chứng chỉ nổi bật
            </h3>
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-4">
              {certificate.map((cert, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={cert.id}
                  className="bg-white border-[3px] border-slate-900 rounded-xl p-4 shadow-[4px_4px_0_0_rgba(15,23,42,1)] flex items-start gap-4 hover:bg-orange-50 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg border-2 border-slate-900 flex items-center justify-center text-orange-500 text-2xl shadow-inner group-hover:scale-110 transition-transform shrink-0">
                    <FontAwesomeIcon icon={faAward} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase italic leading-tight">{cert.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{cert.time}</span>
                      {cert.subDesc && (
                        <>
                          <span className="w-1 h-1 bg-slate-400 rounded-full" />
                          <span className="text-[10px] font-bold text-orange-600">{cert.subDesc}</span>
                        </>
                      )}
                    </div>
                    {cert.desc && <p className="text-slate-600 font-medium text-xs mt-2">{cert.desc}</p>}
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
