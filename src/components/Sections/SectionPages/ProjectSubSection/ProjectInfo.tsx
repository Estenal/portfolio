import React, { useState, useEffect } from "react";
import { projects } from "../../../../models/Project";
import { playPopSound } from "../../../common/playUiSound";

interface ProjectInfoProps {
  projectId: string | null;
  onOpenDetail?: () => void;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ projectId, onOpenDetail }) => {
  const project = projectId ? projects.find((p) => p.id === projectId) : null;
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (project) {
      setDisplayText("");
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(project.shortDesc.slice(0, i));
        i++;
        if (i > project.shortDesc.length) clearInterval(interval);
      }, 25);
      playPopSound();
      return () => clearInterval(interval);
    }
    setDisplayText("");
  }, [project]);

  return (
    <div
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out select-none
                  ${project ? "opacity-100 scale-110" : "scale-100 pointer-events-none"}
                  w-[85%] max-w-3xl`}
    >
      {project && ( 
        <div className="relative group">
                    
          {/* 1. Nút Icon lơ lửng phía trên bên phải */}
          <div className="absolute -top-8 -right-20 flex flex-col items-center group/btn">
            {/* Tooltip - hiện lên khi hover vào icon */}
            <span className="mb-2 px-3 py-1 bg-slate-800 text-white text-[10px] font-bold rounded-md 
                             opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300
                             whitespace-nowrap shadow-xl">
              CHI TIẾT DỰ ÁN
            </span>
            
            {/* Nút Tròn lơ lửng */}
            <button
              onClick={onOpenDetail}
              className="group/btn-open flex items-center gap-2 p-3
                         bg-white/90 backdrop-blur-sm border-2 border-sky-200
                         rounded-full shadow-lg text-sky-600 
                         hover:bg-sky-500 hover:text-white hover:scale-110 
                         active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </button>
          </div>

          {/* Tag Tên dự án - Bo tròn mềm mại, tone xanh đậm hơn nền web */}
          <div className="absolute -top-4 left-8 bg-sky-500 text-white px-5 py-1 
                          rounded-full shadow-lg border-2 border-white font-bold text-sm
                          z-10 transition-transform">
            {project.type}
          </div>

          {/* Textbox chính - Thấp, bo góc lớn, màu sáng trong suốt */}
          <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-100 
                          rounded-[2rem] p-5 pt-7 shadow-[0_10px_40px_-10px_rgba(14,165,233,0.3)]
                          flex flex-col gap-2 relative overflow-hidden">
            
            {/* Nội dung */}
            <div className="px-4">
              <h2 className="text-lg font-extrabold text-sky-600 mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                {project.title}
              </h2>
              
              <p className="text-slate-600 text-base font-medium leading-snug min-h-[40px]">
                {displayText}
                <span className="inline-block w-1.5 h-4 ml-1 bg-sky-300 animate-pulse" />
              </p>
            </div>

            {/* Chân trang - Gọn gàng */}
            <div className="flex justify-between items-center px-4 mt-1">
              <div className="flex gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-[10px] font-bold text-sky-500/70 uppercase tracking-tighter">
                    #{tech}
                  </span>
                ))}
              </div>

              {/* Icon Enter - Nhỏ gọn, màu vàng nắng tạo điểm nhấn trên nền xanh */}
              <div className="flex items-center gap-2 text-sky-400/60">
                <span className="text-[10px] font-bold italic">Press Enter</span>
                <div className="w-5 h-5 flex items-center justify-center bg-yellow-400 rounded-full shadow-sm animate-bounce">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white" />
                </div>
              </div>
            </div>

            {/* Hiệu ứng tia sáng phản chiếu nhẹ trên textbox */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectInfo;