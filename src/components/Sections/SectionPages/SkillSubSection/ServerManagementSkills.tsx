import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPenNib, faImage, faTerminal as faConsole } from '@fortawesome/free-solid-svg-icons';
import { ServerManagementData } from '../../../../models/ServerManagementSkills';
import { playPopBtnSound, playPopSound } from '../../../common/playUiSound';
import { getProficiencyLabel } from '../../../../utils/common';

const ServerManagementSkills: React.FC = () => {
  const [catIdx, setCatIdx] = useState(0);
  const [activeToolIdx, setActiveToolIdx] = useState(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const category = ServerManagementData[catIdx];

  useEffect(() => {
    setActiveToolIdx(0);
    setActiveProjectIdx(0);
  }, [catIdx]);

  if (!category) return null;

  const activeTool = category.tools?.[activeToolIdx];
  const activeProject = category.projects?.[activeProjectIdx];

  const handleCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playPopBtnSound();
    setCatIdx(Number(e.target.value));
  };

  const handleToolClick = (idx: number) => {
    playPopSound();
    setActiveToolIdx(idx);
  };

  const handleProjectClick = (idx: number) => {
    playPopSound();
    setActiveProjectIdx(idx);
  };

  const renderVerticalProgressBar = (
    item: { name: string; percentage: number; icon: string }, isActive: boolean, onClick: () => void,
  ) => (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0 w-20 relative group/bar pt-6"
      onClick={onClick}
    >
      <div className="absolute top-8 left-2/3 rotate-85 -translate-x-1/2 bg-teal-600 text-white text-xs font-black px-2 py-1 rounded border-2 border-slate-950 pointer-events-none opacity-0 scale-75 group-hover/bar:opacity-100 group-hover/bar:scale-100 transition-all duration-150 z-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] whitespace-nowrap">
        {getProficiencyLabel(item.percentage)}
      </div>

      <div className={`h-32 w-7 bg-slate-100 border-2 border-slate-950 rounded-full relative overflow-hidden transition-all duration-200 ease-out
        ${isActive ? 'scale-105 bg-teal-50 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] -rotate-2 -translate-y-1' : 'hover:-translate-y-1 hover:rotate-3 hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'}`}
      >
        <div
          className="absolute bottom-0 left-0 w-full transition-all duration-500 ease-out bg-teal-500 rounded-full"
          style={{ height: `${item.percentage}%` }}
        >
          {isActive && <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />}
        </div>
        <div className="absolute inset-0 flex flex-col justify-between py-1 px-0.5 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-px bg-slate-950/70 border-b border-slate-950" />
          ))}
        </div>
      </div>

      <div className={`w-12 h-12 bg-white border-2 border-slate-950 rounded-lg flex items-center justify-center p-1.5 transition-all duration-200
        ${isActive ? 'bg-teal-100 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]' : 'group-hover/bar:-translate-y-0.5 group-hover/bar:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'}`}>
        <img
          src={item.icon || '/UI/icons/default.svg'}
          alt={item.name}
          className="w-full h-full object-contain"
          onError={(e) => { 
            const target = e.target as HTMLImageElement;
            if (!target.src.endsWith('/UI/icons/default.svg')) {
              target.src = '/UI/icons/default.svg';
            } else {
              target.style.display = 'none';
            }
          }}
        />
      </div>

      <span className={`text-[11px] font-black uppercase text-center tracking-tight truncate w-full px-1 ${isActive ? 'text-teal-600' : 'text-slate-600 group-hover/bar:text-slate-900'}`}>
        {item.name}
      </span>
    </div>
  );

  return (
    <section className="p-6 flex flex-col w-full bg-sky-50 text-slate-900 font-sans gap-8 pb-4">
      {/* KHỐI 1 & 2: DROPDOWN & OVERVIEW */}
      <div className="space-y-4 pb-6 border-b-4 border-dashed border-slate-300">
        <div className="relative w-fit min-w-[260px]">
          <select
            className="
              w-full
              appearance-none
              bg-gradient-to-b from-teal-400 to-teal-500
              text-white
              font-black
              italic
              uppercase
              tracking-wider
              text-xl
              border-[3px]
              border-slate-950
              rounded-xl
              px-4
              py-3
              pr-12
              cursor-pointer
              outline-none
              shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]
              hover:translate-y-[1px]
              hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]
              transition-all
              duration-150
            "
            onChange={handleCatChange}
            value={catIdx}
          >
            {ServerManagementData.map((c, i) => (
              <option
                key={i}
                value={i}
                className="
                  bg-slate-900
                  text-teal-200
                  font-black
                  text-base
                "
              >
                {c.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <FontAwesomeIcon
              icon={faCaretDown}
              className="text-2xl text-white drop-shadow-[2px_2px_0px_rgba(15,23,42,1)]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <span className="text-xl absolute mb-5 -rotate-3 font-black italic text-teal-600 bg-teal-100/50 border-2 border-slate-950 px-2 py-0.5 rounded-md hover:scale-105 z-10">
            {getProficiencyLabel(category.overviewProgress)}
          </span>
        </div>

        <div className="w-full bg-slate-100 border-2 border-slate-950 rounded-md h-5 relative overflow-hidden shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <div
            className="h-full bg-teal-500 transition-all duration-700"
            style={{ width: `${category.overviewProgress}%` }}
          />
        </div>
        
        {category.focusArea && (
          <div className="bg-teal-100 border-2 border-slate-950 p-3 rounded-lg shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] relative -rotate-1 my-4">
             <h4 className="text-sm font-black text-teal-800 italic flex items-center gap-2">
               <FontAwesomeIcon icon={faPenNib} />
               "{category.focusArea}"
             </h4>
          </div>
        )}

        <div className="space-y-3 pl-1">
          <p className="text-sm font-bold text-slate-700 leading-relaxed relative pl-4 before:content-['➢'] before:absolute before:left-0 before:text-teal-500">
            {category.overview}
          </p>
          {category.philosophy && category.philosophy.map((desc, i) => (
            <p key={i} className="text-sm font-bold text-slate-700 leading-relaxed relative pl-4 before:content-['➢'] before:absolute before:left-0 before:text-teal-500">
              {desc}
            </p>
          ))}
        </div>
      </div>

      {/* KHỐI 3: TOOLS */}
      {category.tools && category.tools.length > 0 && (
        <div className="space-y-4 pb-6 border-b-4 border-dashed border-slate-300">
          <h4 className="text-xs font-black italic uppercase tracking-wider text-white bg-teal-500 border-2 border-slate-950 w-fit px-3 py-1 rounded-md shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-sm" />
            Tools Inventory
          </h4>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
            {category.tools.map((tool, i) =>
              renderVerticalProgressBar(
                { name: tool.toolName, percentage: tool.proficiency, icon: tool.icon },
                activeToolIdx === i,
                () => handleToolClick(i)
              )
            )}
          </div>

          {activeTool && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeToolIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="grid grid-cols-1 gap-4 pt-2"
              >
                <div className="flex flex-col justify-start pl-1">
                  <h5 className="text-base font-black text-teal-600 mb-1.5 uppercase italic tracking-tight">
                    {activeTool.toolName}
                  </h5>
                  {activeTool.highlight && (
                    <p className="text-xs font-bold text-teal-700 mb-2 italic">"{activeTool.highlight}"</p>
                  )}
                  <div className="space-y-2">
                    {activeTool.description.map((desc, i) => (
                      <p key={i} className="text-sm font-bold text-slate-600 leading-relaxed relative pl-4 before:content-['▹'] before:absolute before:left-0 before:text-teal-500">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}

      {/* KHỐI 4: PROJECTS */}
      {category.projects && category.projects.length > 0 && (
        <div className="space-y-4 pb-6 border-b-4 border-dashed border-slate-300">
          <h4 className="text-xs font-black italic uppercase tracking-wider text-white bg-teal-500 border-2 border-slate-950 w-fit px-3 py-1 rounded-md shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-sm" />
            Featured Projects
          </h4>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
            {category.projects.map((proj, i) => (
              <div
                key={i}
                onClick={() => handleProjectClick(i)}
                className={`flex-shrink-0 cursor-pointer px-4 py-2 border-2 border-slate-950 rounded-lg transition-all duration-200 ease-out font-black text-sm uppercase italic tracking-tight
                  ${activeProjectIdx === i 
                    ? 'bg-teal-500 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] scale-105 -translate-y-1' 
                    : 'bg-white text-slate-700 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'}`}
              >
                {proj.id}
              </div>
            ))}
          </div>

          {activeProject && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProjectIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-4 pt-2 min-h-[200px]"
              >
                <div className="lg:col-span-2 flex flex-col justify-start pl-1">
                  <h5 className="text-base font-black text-teal-600 mb-1.5 uppercase italic tracking-tight flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faImage} className="text-xs" />
                    {activeProject.title}
                  </h5>
                  <div className="space-y-2 mb-4">
                    {activeProject.description.map((desc, i) => (
                      <p key={i} className="text-sm font-bold text-slate-600 leading-relaxed relative pl-4 before:content-['▹'] before:absolute before:left-0 before:text-teal-500">
                        {desc}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {activeProject.toolsUsed && activeProject.toolsUsed.map((t, i) => (
                       <span key={i} className="text-xs font-black bg-teal-100 text-teal-700 px-2 py-1 rounded border-2 border-teal-200">
                         {t}
                       </span>
                    ))}
                    {activeProject.infrastructureFocus && activeProject.infrastructureFocus.map((f, i) => (
                       <span key={`inf-${i}`} className="text-xs font-black bg-slate-200 text-slate-700 px-2 py-1 rounded border-2 border-slate-300">
                         {f}
                       </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-3 h-full flex items-center justify-center relative p-4 sm:p-8">
                   {/* Background stacked photo layer */}
                   <div className="absolute w-[85%] h-[85%] bg-white shadow-lg rotate-3 translate-x-3 translate-y-3" />
                   
                   {/* Main Photo with white border and realistic drop shadow */}
                   <div className="relative w-full aspect-video bg-white shadow-xl -rotate-2 p-2 sm:p-3 transition-all duration-300 hover:scale-[1.03] hover:rotate-1 hover:shadow-2xl hover:z-20 group cursor-pointer">
                       <div className="relative w-full h-full overflow-hidden border border-slate-200">
                           <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 backdrop-blur-[2px]">
                              <span className="text-white font-black bg-slate-900 border-2 border-white px-3 py-1 shadow-lg -rotate-3 scale-90 group-hover:scale-100 transition-transform duration-300 ease-out">
                                  View Infrastructure
                              </span>
                           </div>
                           <img 
                              src={`/ServerProjects/${activeProject.id}.png`} 
                              alt={activeProject.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.style.display = 'none';
                                target.parentElement?.classList.add('bg-slate-200', 'flex', 'items-center', 'justify-center');
                                const fallbackText = document.createElement('div');
                                fallbackText.className = 'text-slate-400 font-black italic text-center p-4';
                                target.parentElement?.appendChild(fallbackText);
                              }}
                           />
                       </div>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}

      {/* KHỐI 5: SUMMARY */}
      {category.endDescription && category.endDescription.length > 0 && (
        <div className="pt-2 min-h-[100px]">
          <div className="space-y-3 flex flex-col justify-start items-start pl-1">
            <h4 className="text-xs font-black italic uppercase tracking-wider text-white bg-purple-600 border-2 border-slate-950 w-fit px-3 py-1 rounded-md shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1.5">
              <FontAwesomeIcon icon={faConsole} />
              Final Summary
            </h4>
            <div className="space-y-2">
              {category.endDescription.map((desc, i) => (
                <p key={i} className="text-sm font-bold text-slate-700 leading-relaxed relative pl-4 before:content-['❖'] before:absolute before:left-0 before:text-purple-500">
                  {desc}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ServerManagementSkills;
