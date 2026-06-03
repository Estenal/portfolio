import React, { useState, useEffect } from "react";
import { playPopBtnSound } from "../../../common/playUiSound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faGamepad, faAward, faThumbtack, faLink, faCompass } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export interface Project {
  id: string;
  type: string; 
  title: string;
  shortDesc: string; 
  description: string; 
  detailedDesc: string[]; 
  role: string; 
  technologies: string[]; 
  gained: string[]; 
  imageCount: number; 
  link?: string; 
}

import { projects } from "../../../../models/Project";

interface ProjectDetailProps {
  projectId: string | null;
  isVisible: boolean;
  onClose: () => void;
  onSelectProject?: (id: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  projectId,
  isVisible,
  onClose,
  onSelectProject,
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(1);
  const project = projectId ? (projects as Project[]).find((p) => p.id === projectId) : null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        playPopBtnSound();
        onClose();
      }
    };

    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
      setCurrentImgIndex(1);
    }
    
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, onClose, projectId]);

  if (!isVisible || !project) return null;

  const nextImage = () => setCurrentImgIndex((prev) => (prev >= project.imageCount ? 1 : prev + 1));
  const prevImage = () => setCurrentImgIndex((prev) => (prev <= 1 ? project.imageCount : prev - 1));

  // Đảm bảo luôn lấy đủ 3 đề xuất liên quan
  let relatedProjects = (projects as Project[]).filter((p) => p.id !== project.id && p.type === project.type);
  if (relatedProjects.length === 0) {
    relatedProjects = (projects as Project[]).filter((p) => p.id !== project.id).slice(0, 3);
  } else {
    relatedProjects = relatedProjects.slice(0, 3);
  }

  const handleLinkClick = () => {
    playPopBtnSound();
    if (!project.link || project.link === "-") {
      alert("⚠️ Không tìm thấy liên kết cho dự án này!");
    } else {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full mb-4 lg:w-5/6 h-[95%] select-none p-8 bg-sky-100/90 backdrop-blur-xl border-4 border-slate-900 rounded-[2.5rem] shadow-[12px_12px_0_0_rgba(15,23,42,1)] flex flex-col overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* --- PANNED OVERLAY NOTE BOARD --- */}
        <div className="absolute -bottom-3 -left-12 md:-left-16 z-30 w-76 bg-sky-50 border-[4px] border-slate-900 rounded-2xl p-5 shadow-[8px_8px_0_0_rgba(15,23,42,1)] -rotate-12 hover:scale-105 transition-all duration-300 max-h-[220px] flex flex-col pointer-events-auto">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-rose-600 drop-shadow-[2px_2px_0_rgba(0,0,0,0.15)] animate-pulse">
            <FontAwesomeIcon icon={faThumbtack} className="text-xl" />
          </div>

          <div className="flex items-center gap-2 border-b-2 border-dashed border-slate-900/20 pb-1.5 mb-2.5 shrink-0">
            <FontAwesomeIcon icon={faAward} className="text-amber-500 text-xl" />
            <h4 className="font-black text-[14px] text-slate-700 tracking-wider uppercase italic">Gained Loot //</h4>
          </div>

          <div className="flex-1 overflow-y-auto project-detail-scroll space-y-1.5 pr-1 text-[12px]">
            {project.gained && project.gained.length > 0 ? (
              project.gained.map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5 font-bold text-slate-600 leading-tight">
                  <span className="text-green-500 shrink-0">✔</span>
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <p className="italic text-slate-400 font-medium text-center pt-2">No experience loot recorded.</p>
            )}
          </div>
        </div>

        {/* --- HEADER BLOCK --- */}
        <div className="flex justify-between items-center mb-6 border-b-4 border-slate-900/10 pb-4 shrink-0 z-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3">
              <div className="w-12 h-12 bg-green-400 rounded-xl border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)]">
                <FontAwesomeIcon icon={faGamepad} />
              </div>
              CHI TIẾT DỰ ÁN
            </h2>
            <div className="h-1 w-20 bg-slate-900 rounded-full mt-2" />
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLinkClick}
              className="group relative px-5 py-2 bg-yellow-400 hover:bg-yellow-300 border-[3px] border-slate-900 rounded-xl shadow-[4px_4px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faLink} className="text-slate-900 text-sm group-hover:rotate-12 transition-transform" />
              <span className="text-slate-900 font-black text-sm tracking-tighter uppercase italic">
                Liên Kết
              </span>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-lg pointer-events-none" />
            </motion.button>

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
              <span className="text-slate-900 group-hover:text-white font-black text-sm tracking-tighter uppercase italic drop-shadow-sm">
                Close
              </span>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-lg pointer-events-none" />
            </motion.button>
          </div>
        </div>

        {/* --- MAIN BODY SPLIT GRID (Chuẩn tỷ lệ 3/8 và 5/8) --- */}
        <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0 overflow-hidden z-10">
          
          {/* CỘT TRÁI: SLIDE VIEWER (3/8) */}
          <div className="w-full md:w-[37.5%] flex flex-col gap-4 shrink-0 min-h-0">
            <div className="space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border-[4px] border-slate-900 shadow-[6px_6px_0_0_rgba(15,23,42,1)] group">
                <img
                  src={`/UI/${projectId}/${currentImgIndex}.png`}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/projects/ProjectBox.png';
                  }}
                />
                
                {project.imageCount > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] text-slate-900 font-black p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition active:scale-90">←</button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] text-slate-900 font-black p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition active:scale-90">→</button>
                  </>
                )}
              </div>

              <div className="flex justify-center gap-1.5">
                {[...Array(project.imageCount)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 rounded-full border-2 border-slate-900 transition-all ${currentImgIndex === i + 1 ? "w-5 bg-yellow-400" : "w-2 bg-slate-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: NỘI DUNG CHI TIẾT (5/8) */}
          <div className="w-full md:w-[62.5%] flex flex-col bg-white border-[4px] border-slate-900 rounded-2xl p-6 shadow-[inset_4px_4px_0_0_rgba(15,23,42,0.05)] overflow-y-auto project-detail-scroll min-h-0">
            
            {/* KHỐI HEADER CONTENT: TẬP TRUNG TOÀN BỘ TIÊU ĐỀ, VAI TRÒ, CÔNG NGHỆ */}
            <div className="mb-6 border-b-4 border-slate-900 pb-5">
              <span className="px-2 py-0.5 bg-purple-500 text-white text-[10px] font-black tracking-widest uppercase rounded border-2 border-slate-900 inline-block shadow-[2px_2px_0_0_rgba(15,23,42,1)] mb-2.5">
                {project.type}
              </span>
              
              <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase leading-none mb-3">
                {project.title}
              </h2>

              {/* ĐƯA ROLE LÊN LÀM TIÊU ĐỀ PHỤ - CỰC KỲ NỔI BẬT */}
              <p className="text-xl text-indigo-600 font-black italic uppercase tracking-tight mb-3">
                // {project.role}
              </p>

              {/* ĐƯA TECH TAGS LÊN NGAY PHÍA DƯỚI HEADER CHÍNH */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-slate-900 text-yellow-400 rounded-lg text-[10px] border border-slate-800 font-black uppercase italic shadow-[2px_2px_0_0_rgba(0,0,0,0.15)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* KHỐI NỘI DUNG CHỮ THUẦN TÚY - THOÁNG ĐÃNG, DỄ ĐỌC */}
            <div className="space-y-6 flex-1">
              
              {/* TÓM TẮT NHIỆM VỤ */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faCompass} className="text-slate-300 text-sm" />
                  TÓM TẮT NHIỆM VỤ //
                </h3>
                <p className="text-slate-800 font-bold leading-relaxed text-base pl-1">
                  {project.shortDesc}
                </p>
              </div>

              {/* NHẬT KÝ TRIỂN KHAI CHI TIẾT */}
              <div className="pt-2">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full" />
                  NHẬT KÝ TRIỂN KHAI CHI TIẾT //
                </h4>
                <div className="space-y-3 pl-1">
                  {project.detailedDesc && project.detailedDesc.length > 0 ? (
                    project.detailedDesc.map((paragraph, index) => (
                      <p key={index} className="text-base text-slate-700 font-medium leading-relaxed flex items-start gap-2.5">
                        <span className="text-slate-900 mt-1.5 shrink-0 text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-black">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 pt-0.5">{paragraph}</span>
                      </p>
                    ))
                  ) : (
                    <p className="text-base text-slate-700 font-medium leading-relaxed flex items-start gap-2.5">
                      <span className="text-slate-900 mt-1.5 shrink-0 text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-black">01</span>
                      <span className="flex-1 pt-0.5">{project.description}</span>
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* KHỐI ĐỀ XUẤT DỰ ÁN LIÊN QUAN (Đã cố định ở chân trang) */}
            {relatedProjects.length > 0 && (
              <div className="mt-10 pt-6 border-t-4 border-slate-900 shrink-0">
                <h3 className="text-sm font-black mb-4 text-slate-900 tracking-wider uppercase flex items-center gap-2.5">
                  <div className="w-3 h-4 bg-yellow-400 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)]" />
                  NHIỆM VỤ TƯƠNG ĐỒNG KHÁC //
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProjects.map((rp) => (
                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={rp.id} 
                      className="bg-slate-50 border-[3px] border-slate-900 rounded-xl p-3 hover:bg-yellow-400/20 transition cursor-pointer flex items-center space-x-3 shadow-[5px_5px_0_0_rgba(15,23,42,1)]"
                      onClick={() => onSelectProject && onSelectProject(rp.id)}
                    >
                      <div className="w-11 h-11 bg-slate-200 border-2 border-slate-900 rounded-lg overflow-hidden shrink-0 shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
                        <img src={`/projects/ProjectBox.png`} alt={rp.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden leading-tight flex-1">
                        <h4 className="font-black text-slate-900 text-xs truncate italic uppercase tracking-tight">{rp.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5 truncate font-extrabold uppercase tracking-wider">{rp.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Thanh cuộn */}
        <style>{`
          .project-detail-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .project-detail-scroll::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.03);
            border-radius: 4px;
          }
          .project-detail-scroll::-webkit-scrollbar-thumb {
            background: rgba(15, 23, 42, 0.8);
            border-radius: 4px;
            border: 1px solid #fff;
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;