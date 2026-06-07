import React, { useMemo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faFilter,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { playPopBtnSound } from "../../common/playUiSound";
import { projects } from "../../../models/Project";

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

  const filteredProjects = useMemo(
    () => projects.filter((project) => enabledTypes.has(project.type)),
    [enabledTypes]
  );

  const selectedProject = selectedProjectId
    ? projects.find((project) => project.id === selectedProjectId)
    : null;

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

  return (
    // Ép Fullscreen phủ kín màn hình điện thoại
    <section className="fixed inset-0 z-[1000] flex flex-col bg-[#c2d6e3] text-slate-900 w-full h-full">
      
      {/* 1. APP HEADER (Cố định ở trên cùng) */}
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
            Dự Án
          </h3>
          <p className="text-[9px] text-slate-600 uppercase tracking-widest mt-1">
            Giao diện thu gọn
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

      {/* VÙNG CUỘN CHÍNH CỦA ỨNG DỤNG */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 p-3">
        
        {/* 2. BỘ LỌC (Filter Section) */}
        <div className="rounded-2xl border-2 border-slate-900 bg-white p-3 shadow-[2px_2px_0_0_rgba(15,23,42,1)] shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
              <FontAwesomeIcon icon={faFilter} className="text-slate-500" />
              Bộ lọc
            </h4>
            <span className="rounded-full bg-slate-900 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-white">
              {filteredProjects.length} items
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {types.map((type) => {
              const active = enabledTypes.has(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`rounded-xl border-2 border-slate-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all flex-1 min-w-[30%] ${
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 active:bg-slate-200"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                playPopBtnSound();
                selectAll();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-400 py-2 text-[10px] font-black uppercase tracking-wider text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:translate-y-px active:shadow-none"
            >
              <FontAwesomeIcon icon={faCircleCheck} /> Chọn hết
            </button>
            <button
              type="button"
              onClick={() => {
                playPopBtnSound();
                clearAll();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-200 py-2 text-[10px] font-black uppercase tracking-wider text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:translate-y-px active:shadow-none"
            >
              <FontAwesomeIcon icon={faTimes} /> Xóa lọc
            </button>
          </div>
        </div>

        {/* 3. DANH SÁCH DỰ ÁN */}
        <div className="flex flex-col gap-3 pb-8">
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-500 bg-white/50 p-6 text-center">
              <p className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                Trống rỗng!
              </p>
              <p className="text-[10px] text-slate-500">
                Hãy chọn lại bộ lọc ở phía trên.
              </p>
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
                className="rounded-2xl border-2 border-slate-900 bg-white p-3 shadow-[2px_2px_0_0_rgba(15,23,42,1)] active:translate-y-px active:shadow-none transition-all flex flex-col gap-2 cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded border border-slate-900 bg-slate-900 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-white">
                    {project.type}
                  </span>
                  <span className="rounded border border-slate-300 bg-slate-100 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-slate-600">
                    {project.role}
                  </span>
                </div>

                <h3 className="text-base font-black uppercase tracking-tight leading-tight text-slate-900 mt-0.5">
                  {project.title}
                </h3>
                <p className="text-[11px] leading-snug text-slate-600 line-clamp-2">
                  {project.shortDesc}
                </p>

                <div className="mt-1 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-sky-50 px-1.5 py-0.5 text-[9px] font-bold text-sky-700 border border-sky-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="rounded bg-slate-50 px-1.5 py-0.5 text-[9px] font-bold text-slate-500 border border-slate-200">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. MÀN HÌNH CHI TIẾT DỰ ÁN (Project Detail Fullscreen) */}
      {showDetail && selectedProject && (
        <div className="fixed inset-0 z-[1010] flex flex-col bg-slate-50 w-full h-full animate-in slide-in-from-bottom-4 duration-200">
          
          {/* Header của màn chi tiết */}
          <header className="flex items-center justify-between gap-3 bg-white p-3 border-b-2 border-slate-900 shrink-0 z-20 shadow-sm">
             <div className="flex flex-col">
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Chi tiết dự án</span>
               <h3 className="text-sm font-black uppercase tracking-tight truncate max-w-[200px]">{selectedProject.title}</h3>
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

          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar flex flex-col gap-4 pb-8">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded bg-slate-900 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white">
                  {selectedProject.type}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                  {selectedProject.role}
                </span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 leading-none">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {selectedProject.description}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-3 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Thông tin kỹ thuật
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedProject.detailedDesc.map((item, index) => (
                  <li key={index} className="flex gap-2 leading-snug">
                    <span className="text-rose-500 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-3 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Công nghệ sử dụng
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700 border border-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 p-4 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] text-slate-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2.5">
                Kinh nghiệm thu được
              </h4>
              <ul className="space-y-2 text-xs leading-relaxed">
                {selectedProject.gained.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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