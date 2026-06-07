import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, faHistory, faRocket, faBug, faWrench,
  faExternalLinkAlt, faGlobe, faFileAlt, faLink
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { updateLogsData, externalServicesData } from '../../../models/UpdateLogs';
import RedirectPopup from '../Layout/Forms/RedirectPopup';
import { playPopBtnSound } from '../../common/playUiSound';

type LogXServicesPopupProps = {
  open: boolean;
  onClose: () => void;
};

const LogXServicesPopup: React.FC<LogXServicesPopupProps> = ({ open, onClose }) => {
  const [targetUrl, setTargetUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !targetUrl) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, targetUrl]);

  const handleAction = (callback: () => void) => {
    playPopBtnSound();
    callback();
  };

  const handleServiceClick = (url: string) => {
    handleAction(() => {
      setTargetUrl(url);
    });
  };

  const getServiceIcon = (iconType: string) => {
    switch (iconType) {
      case 'github': return faGithub;
      case 'globe': return faGlobe;
      case 'document': return faFileAlt;
      default: return faLink;
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-8 bg-slate-900/40 backdrop-blur-sm select-none portrait:p-2"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !targetUrl) handleAction(onClose);
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-11/12 max-w-5xl h-[95%] mb-4 portrait:mb-0 portrait:w-[98%] portrait:h-[96%] flex flex-col bg-[#c2d6e3] border-4 portrait:border-2 border-slate-900 rounded-3xl p-6 portrait:p-3 shadow-[8px_8px_0_0_rgba(15,23,42,1)] portrait:shadow-[4px_4px_0_0_rgba(15,23,42,1)] overflow-hidden"
      >
        {/* Header & Close Button */}
        <div className="flex justify-between items-center mb-6 portrait:mb-2 border-b-4 portrait:border-b-2 border-slate-900/10 pb-4 portrait:pb-2 shrink-0">
          <div>
            <h2 className="text-2xl md:text-3xl portrait:text-xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3 portrait:gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 portrait:w-8 portrait:h-8 bg-blue-500 rounded-xl portrait:rounded-lg border-[3px] portrait:border-2 border-slate-900 flex items-center justify-center text-white shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
                <FontAwesomeIcon icon={faHistory} className="portrait:text-sm" />
              </div>
              <span className="portrait:tracking-tight">NHẬT KÝ CẬP NHẬT</span>
            </h2>
            {/* Ẩn gạch ngang trang trí trên mobile */}
            <div className="flex flex-row gap-2 justify-start items-center mt-2 portrait:hidden">
              <div className="h-1 w-12 md:w-20 bg-slate-900 rounded-full" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction(onClose)}
            // Tối ưu nút close thành hình vuông trên portrait
            className="group relative pl-4 pr-6 py-2 portrait:p-0 portrait:w-8 portrait:h-8 bg-rose-500/10 hover:bg-rose-400/90 border-[3px] portrait:border-2 border-slate-900 rounded-xl portrait:rounded-lg shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-3 portrait:gap-0 self-start"
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

        {/* Content Area */}
        {/* QUAN TRỌNG: Ép portrait:flex-row để không bị xếp chồng khi màn hình ngang hẹp */}
        <div className="flex flex-col lg:flex-row portrait:flex-row flex-1 gap-8 portrait:gap-3 overflow-hidden h-full">
          
          {/* CỘT TRÁI: Liên kết ngoài (Chiếm 40% trên mobile) */}
          <div className="flex-1 portrait:flex-[0.4] flex flex-col h-1/2 lg:h-full portrait:h-full">
            <h3 className="text-lg md:text-xl portrait:text-sm font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-2 mb-4 portrait:mb-2 shrink-0">
               <FontAwesomeIcon icon={faExternalLinkAlt} className="text-emerald-500" /> Liên Kết Ngoài
            </h3>
            <div className="flex-1 overflow-y-auto pr-2 portrait:pr-1 custom-scrollbar space-y-4 portrait:space-y-2 pt-2">
              {externalServicesData.map((service, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={service.id} 
                  onClick={() => handleServiceClick(service.url)}
                  className="group bg-white border-[3px] portrait:border-2 border-slate-900 rounded-2xl portrait:rounded-xl p-4 portrait:p-2.5 shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] hover:shadow-[6px_6px_0_0_rgba(15,23,42,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_2px_0_0_rgba(15,23,42,1)] portrait:hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-4 portrait:gap-2.5"
                >
                  <div className="w-12 h-12 portrait:w-8 portrait:h-8 bg-emerald-100 group-hover:bg-emerald-500 group-hover:text-white border-2 portrait:border-[1.5px] border-slate-900 rounded-xl portrait:rounded-lg flex items-center justify-center text-emerald-600 text-xl portrait:text-sm transition-colors duration-300 shrink-0">
                    <FontAwesomeIcon icon={getServiceIcon(service.iconType)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-900 text-base portrait:text-[11px] uppercase italic truncate">{service.name}</h4>
                    <p className="text-slate-500 font-bold text-[11px] portrait:text-[9px] mt-1 portrait:mt-0 leading-tight line-clamp-2">{service.description}</p>
                  </div>
                  {/* Ẩn icon mũi tên trên mobile để tiết kiệm diện tích */}
                  <div className="text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0 portrait:hidden">
                     <FontAwesomeIcon icon={faExternalLinkAlt} className="text-lg" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-1 lg:w-1 lg:h-full portrait:w-[2px] portrait:h-full bg-slate-900/10 rounded-full shrink-0" />

          {/* CỘT PHẢI: Nhật ký cập nhật (Chiếm 60% trên mobile) */}
          <div className="flex-1 portrait:flex-[0.6] flex flex-col h-1/2 lg:h-full portrait:h-full">
            <h3 className="text-lg md:text-xl portrait:text-sm font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-2 mb-4 portrait:mb-2 shrink-0">
               <FontAwesomeIcon icon={faWrench} className="text-orange-500" /> Nhật Ký Cập Nhật
            </h3>
            <div className="flex-1 overflow-y-auto pr-2 portrait:pr-1 custom-scrollbar space-y-6 portrait:space-y-3 pt-2">
              {updateLogsData.map((log, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={log.id}
                  // Ẩn thanh sọc dọc timeline trên mobile
                  className="relative pl-6 portrait:pl-0 before:absolute before:left-[11px] before:top-4 before:bottom-[-32px] last:before:hidden before:w-1 before:bg-slate-900/20 portrait:before:hidden"
                >
                  {/* Ẩn dấu chấm tròn timeline trên mobile */}
                  <div className="absolute left-0 top-3 w-6 h-6 portrait:hidden bg-orange-400 border-[3px] border-slate-900 rounded-full shadow-[2px_2px_0_0_rgba(15,23,42,1)] z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>

                  {/* Log Card */}
                  <div className="bg-white border-[3px] portrait:border-2 border-slate-900 rounded-2xl portrait:rounded-xl p-5 portrait:p-3 ml-4 portrait:ml-0 shadow-[4px_4px_0_0_rgba(15,23,42,1)] portrait:shadow-[2px_2px_0_0_rgba(15,23,42,1)] hover:shadow-[6px_6px_0_0_rgba(15,23,42,1)] hover:-translate-y-1 portrait:hover:translate-y-0 transition-all">
                    <div className="flex items-center gap-3 portrait:gap-2 mb-2 portrait:mb-1">
                      <span className="inline-block px-2.5 portrait:px-1.5 py-1 portrait:py-0.5 bg-slate-900 text-white text-[10px] portrait:text-[8px] font-black uppercase italic rounded-lg portrait:rounded border-2 portrait:border border-slate-900 shadow-[2px_2px_0_0_rgba(251,146,60,1)] portrait:shadow-[1px_1px_0_0_rgba(251,146,60,1)]">
                        {log.version}
                      </span>
                      <span className="text-[10px] portrait:text-[8px] font-black text-slate-400 uppercase tracking-widest">{log.date}</span>
                    </div>
                    
                    <h4 className="font-black text-slate-900 text-base portrait:text-xs uppercase italic leading-tight mb-2 portrait:mb-1">
                      {log.title}
                    </h4>
                    
                    <p className="text-slate-600 font-bold text-xs portrait:text-[9px] mb-3 portrait:mb-1.5 leading-relaxed">
                      {log.description}
                    </p>

                    {/* Features list */}
                    {log.features && log.features.length > 0 && (
                      <div className="mb-2 portrait:mb-1">
                        <div className="text-[10px] portrait:text-[8px] font-black text-emerald-500 uppercase flex items-center gap-1 mb-1 portrait:mb-0.5">
                          <FontAwesomeIcon icon={faRocket} /> MỚI
                        </div>
                        <ul className="space-y-1 portrait:space-y-0">
                          {log.features.map((feature, i) => (
                            <li key={i} className="text-[11px] portrait:text-[8px] text-slate-700 font-medium flex items-start gap-2 portrait:gap-1.5">
                              <span className="w-1.5 h-1.5 portrait:w-1 portrait:h-1 bg-emerald-400 rounded-full mt-1.5 portrait:mt-1 shrink-0" />
                              <span className="leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Fixes list */}
                    {log.fixes && log.fixes.length > 0 && (
                      <div className="mt-3 portrait:mt-1.5">
                        <div className="text-[10px] portrait:text-[8px] font-black text-rose-500 uppercase flex items-center gap-1 mb-1 portrait:mb-0.5">
                          <FontAwesomeIcon icon={faBug} /> SỬA LỖI
                        </div>
                        <ul className="space-y-1 portrait:space-y-0">
                          {log.fixes.map((fix, i) => (
                            <li key={i} className="text-[11px] portrait:text-[8px] text-slate-700 font-medium flex items-start gap-2 portrait:gap-1.5">
                              <span className="w-1.5 h-1.5 portrait:w-1 portrait:h-1 bg-rose-400 rounded-full mt-1.5 portrait:mt-1 shrink-0" />
                              <span className="leading-tight">{fix}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Redirect Popup Layer */}
      <AnimatePresence>
        {targetUrl && (
          <RedirectPopup 
            targetUrl={targetUrl} 
            onClose={() => setTargetUrl(null)} 
          />
        )}
      </AnimatePresence>

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

export default LogXServicesPopup;