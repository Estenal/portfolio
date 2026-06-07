import React, { useMemo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faFilter,
  faCircleCheck,
  faArrowRight,
  faExternalLinkAlt,
  faImages,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { playPopBtnSound } from "../../common/playUiSound";
import { projects } from "../../../models/Project";
import { motion } from "framer-motion";

interface SimpleProjectsProps {
  onClose: () => void;
  onBack: () => void;
}

const SimpleProjects: React.FC<SimpleProjectsProps> = ({ onClose, onBack }) => {
  const types = useMemo(
    () => Array.from(new Set(projects.map((project) => project.type))),
    []
  );

  const [enabledTypes, setEnabledTypes] = useState<Set<string>>(new Set(types));
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  
  // State quản lý ảnh hiện tại trong Gallery của Detail
  const [currentImgIdx, setCurrentImgIdx] = useState(1);

  const filteredProjects = useMemo(
    () => projects.filter((project) => enabledTypes.has(project.type)),
    [enabledTypes]
  );

  const selectedProject = selectedProjectId
    ? projects.find((project) => project.id === selectedProjectId)
    : null;

  // Reset index ảnh về 0 mỗi khi người dùng đổi dự án chi tiết
  useEffect(() => {
    setCurrentImgIdx(1);
  }, [selectedProjectId]);

  useEffect(() => {
    if (!showDetail) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDetail(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showDetail]);

  const toggleType = (type: string) => {
    const next = new Set(enabledTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    setEnabledTypes(next);
  };

  const selectAll = () => setEnabledTypes(new Set(types));
  const clearAll = () => setEnabledTypes(new Set());

  // Hàm chuyển ảnh trong Gallery
  const nextImage = (max: number) => {
    playPopBtnSound();
    setCurrentImgIdx((prev) => (prev >= max ? 1 : prev + 1));
  };

  const prevImage = (max: number) => {
    playPopBtnSound();
    setCurrentImgIdx((prev) => (prev <= 1 ? max : prev - 1));
  };

  return (
    <section className="fixed inset-0 z-[1000] flex flex-col bg-[#c2d6e3] text-slate-900 w-full h-full">
      
      {/* 1. APP HEADER */}
      <header className="flex items-center justify-between gap-3 bg-[#c2d6e3] p-3 border-b-2 border-slate-900 shrink-0 z-20 shadow-sm">
        <button
          type="button"
          onClick={() => {
            playPopBtnSound();
            onBack();
          }}
          className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-slate-900 bg-white shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:translate-y-px active:shadow-none transition-all shrink-0"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-slate-800 text-sm" />
        </button>

        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-sm font-black uppercase tracking-tighter leading-none">
            Danh Sách Dự Án
          </h3>
          <p className="text-[9px] text-slate-600 uppercase tracking-widest mt-1">
            Giao diện tối ưu Portrait xoay ngang
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            playPopBtnSound();
            onClose();
          }}
          className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-slate-900 bg-rose-500/10 shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:translate-y-px active:shadow-none transition-all shrink-0"
        >
          <FontAwesomeIcon icon={faTimes} className="text-rose-600 text-sm" />
        </button>
      </header>

      {/* VÙNG NỘI DUNG CHÍNH (2 CỘT) */}
      <div className="flex-1 flex flex-row overflow-hidden p-3 gap-3">
        
        {/* CỘT TRÁI: BỘ LỌC CỐ ĐỊNH */}
        <div className="w-[35%] flex flex-col justify-between rounded-xl border-2 border-slate-900 bg-white p-3 shadow-[2px_2px_0_0_rgba(15,23,42,1)] shrink-0 h-full overflow-y-auto custom-scrollbar">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-tight flex items-center gap-1.5">
                <FontAwesomeIcon icon={faFilter} className="text-slate-500" />
                Bộ lọc
              </h4>
              <span className="rounded-full bg-slate-900 px-1.5 py-0.5 text-[8px] font-black text-white">
                {filteredProjects.length}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {types.map((type) => {
                const active = enabledTypes.has(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={`w-full rounded-lg border-2 border-slate-900 px-2 py-1.5 text-[9px] font-black uppercase tracking-wider text-left transition-all ${
                      active
                        ? "bg-slate-900 text-white"
                        : "bg-slate-50 text-slate-600 active:bg-slate-200"
                    }`}
                  >
                    {active ? "◼ " : "◻ "} {type}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-4 shrink-0">
            <button
              type="button"
              onClick={() => {
                playPopBtnSound();
                selectAll();
              }}
              className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-emerald-400 py-1.5 text-[9px] font-black uppercase tracking-wider text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:translate-y-px active:shadow-none"
            >
              <FontAwesomeIcon icon={faCircleCheck} /> Chọn hết
            </button>
            <button
              type="button"
              onClick={() => {
                playPopBtnSound();
                clearAll();
              }}
              className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-slate-100 py-1.5 text-[9px] font-black uppercase tracking-wider text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:translate-y-px active:shadow-none"
            >
              <FontAwesomeIcon icon={faTimes} /> Xóa lọc
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: DANH SÁCH DỰ ÁN */}
        <div className="w-[65%] h-full overflow-y-auto custom-scrollbar flex flex-col gap-2.5 pb-4">
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-500 bg-white/50 p-6 text-center h-full">
              <p className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1">Trống rỗng!</p>
              <p className="text-sm text-slate-500">Hãy chọn bộ lọc ở cột bên trái.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  playPopBtnSound();
                  setSelectedProjectId(project.id);
                  setShowDetail(true);
                }}
                className="group rounded-xl border-2 border-slate-900 bg-white p-3 shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-between gap-4 cursor-pointer hover:bg-sky-50/40"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-white">
                      {project.type}
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-slate-600 border border-slate-200">
                      {project.role}
                    </span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-[10px] leading-snug text-slate-500 line-clamp-1">
                    {project.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded bg-slate-100 px-1.5 py-0.5 text-[8px] font-bold text-slate-600 border border-slate-200">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded bg-slate-200 px-1 py-0.5 text-[8px] font-bold text-slate-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-sky-500 border-2 border-slate-900 text-white flex items-center justify-center shadow-[2px_2px_0_0_rgba(15,23,42,1)] group-hover:bg-sky-600 group-hover:-translate-y-0.5 group-active:translate-y-0 group-active:shadow-none transition-all duration-150">
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </div>
                  <span className="text-[7px] font-black text-sky-600 uppercase tracking-wider mt-1 opacity-60 group-hover:opacity-100">XEM</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. MÀN HÌNH CHI TIẾT DỰ ÁN (Project Detail Fullscreen CHUẨN ĐÉT) */}
      {showDetail && selectedProject && (
        <div className="fixed inset-0 z-[1010] flex flex-col bg-[#eef4f8] w-full h-full animate-in slide-in-from-bottom-4 duration-200 text-slate-900">
          
          {/* Header của màn chi tiết */}
          <header className="flex items-center justify-between gap-3 bg-white p-3 border-b-2 border-slate-900 shrink-0 z-20 shadow-sm">
             <div className="flex flex-col">
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">PROJECT CONSOLE</span>
               <h3 className="text-sm font-black uppercase tracking-tight truncate max-w-[280px] mt-1">{selectedProject.title}</h3>
             </div>
             <button
              type="button"
              onClick={() => {
                playPopBtnSound();
                setShowDetail(false);
              }}
              className="flex items-center justify-center w-8 h-8 rounded-lg border-2 border-slate-900 bg-rose-500/10 shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:translate-y-px active:shadow-none shrink-0"
            >
              <FontAwesomeIcon icon={faTimes} className="text-rose-600 text-xs" />
            </button>
          </header>

          {/* Nội dung chi tiết 2 cột (Trái: Hình ảnh & CTA | Phải: Text tài liệu) */}
          <div className="flex-1 flex flex-row overflow-hidden p-3 gap-3 h-full">
            
            {/* CỘT CHI TIẾT TRÁI: MEDIA & LINK ACCESS (Chiếm 45%) */}
            <div className="w-[45%] flex flex-col gap-3 h-full justify-between shrink-0">
              
              {/* IMAGE GALLERY CAROUSEL (Dựa trên imageCount) */}
              <div className="flex-1 bg-slate-900 border-2 border-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center group/gal shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
                {selectedProject.imageCount > 0 ? (
                  <>
                    <img 
                      src={`/UI/${selectedProject.id}/${currentImgIdx}.png`} 
                      alt={`${selectedProject.title} screenshot ${currentImgIdx}`}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    
                    {/* Badge số thứ tự ảnh */}
                    <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-sm text-white border border-slate-700 text-[8px] font-black px-2 py-0.5 rounded-md tracking-wider">
                      <FontAwesomeIcon icon={faImages} className="mr-1 text-sky-400" /> 
                      {currentImgIdx} / {selectedProject.imageCount}
                    </div>

                    {/* Nút lật ảnh điều hướng (Chỉ hiện khi có nhiều hơn 1 ảnh) */}
                    {selectedProject.imageCount > 1 && (
                      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-100 group-hover/gal:opacity-100 transition-opacity duration-200">
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); prevImage(selectedProject.imageCount); }}
                          className="pointer-events-auto w-6 h-6 rounded-md bg-white border border-slate-900 flex items-center justify-center shadow shadow-black/30 active:scale-95"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} className="text-[10px]" />
                        </button>
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); nextImage(selectedProject.imageCount); }}
                          className="pointer-events-auto w-6 h-6 rounded-md bg-white border border-slate-900 flex items-center justify-center shadow shadow-black/30 active:scale-95"
                        >
                          <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-slate-500 font-mono text-[10px] italic">// No screenshots available</div>
                )}
              </div>

              {/* NÚT TRUY CẬP LINK THỰC TẾ (Nếu model trả về có `link`) */}
              {selectedProject.link && (
                <motion.a
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playPopBtnSound}
                  className="w-full py-2.5 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-black uppercase text-xs tracking-[0.15em] italic border-2 border-slate-900 rounded-xl shadow-[3px_3px_0_0_rgba(15,23,42,1)] active:translate-y-px active:shadow-none flex items-center justify-center gap-2 shrink-0"
                >
                  Ghé Thăm Dự Án Thực Tế 
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px]" />
                </motion.a>
              )}
            </div>

            {/* CỘT CHI TIẾT PHẢI: TÀI LIỆU VĂN BẢN (Chiếm 55%, Cuộn độc lập) */}
            <div className="w-[55%] h-full overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-1">
              
              {/* Box 1: Tổng quan dự án */}
              <div className="space-y-1.5 shrink-0 bg-white/40 p-2.5 rounded-xl border border-slate-300">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-white border border-slate-900">
                    {selectedProject.type}
                  </span>
                  <span className="rounded bg-white border border-slate-300 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-slate-500">
                    ROLE: {selectedProject.role}
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-[11px] font-bold text-slate-600 leading-relaxed italic">
                  "{selectedProject.description}"
                </p>
              </div>

              {/* Box 2: Thông tin chi tiết */}
              <div className="rounded-xl bg-white p-3 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] shrink-0">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b pb-1">
                  Thông tin kỹ thuật & Tính năng
                </h4>
                <ul className="space-y-1.5 text-[11px] font-medium text-slate-700 leading-normal">
                  {selectedProject.detailedDesc.map((item, index) => (
                    <li key={index} className="flex gap-1.5 items-start">
                      <span className="text-sky-500 shrink-0 mt-0.5">➢</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 3: Công nghệ sử dụng */}
              <div className="rounded-xl bg-white p-3 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] shrink-0">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b pb-1">
                  Hệ sinh thái Công nghệ
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-sky-50 px-2 py-0.5 text-[9px] font-black text-sky-700 border border-sky-200 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box 4: Kinh nghiệm thu được */}
              <div className="rounded-xl bg-slate-900 p-3.5 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] text-slate-100 shrink-0">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-sky-400 mb-2 border-b border-slate-700 pb-1">
                  Kinh nghiệm & Giá trị thu được
                </h4>
                <ul className="space-y-1.5 text-[11px] leading-snug text-slate-300">
                  {selectedProject.gained.map((item, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(15, 23, 42, 0.2); border-radius: 4px; }
      `}</style>
    </section>
  );
};

export default SimpleProjects;