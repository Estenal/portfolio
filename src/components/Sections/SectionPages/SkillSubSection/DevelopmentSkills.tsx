import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faTerminal, faTerminal as faConsole } from '@fortawesome/free-solid-svg-icons';
import { skillCategories, type SkillProgressBar } from '../../../../models/DevelopmentSkills';
import { playPopBtnSound, playPopSound } from '../../../common/playUiSound';
import { ChunkyCodeBlock } from '../../../common/ChunkyCodeBlock';
import { getProficiencyLabel } from '../../../../utils/common';

const DevSkills: React.FC = () => {
  const [catIdx, setCatIdx] = useState(0);
  const [activeToolIdx, setActiveToolIdx] = useState(0);
  const [activePlatformIdx, setActivePlatformIdx] = useState(0);

  const category = skillCategories[catIdx];

  useEffect(() => {
    setActiveToolIdx(0);
    setActivePlatformIdx(0);
  }, [catIdx]);

  if (!category) return null;

  const activeTool = category.toolProficiency?.[activeToolIdx];
  const activePlatform = category.platformProficiency?.[activePlatformIdx];

  const handleCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playPopBtnSound();
    setCatIdx(Number(e.target.value));
  };

  const handleToolClick = (idx: number) => {
    playPopSound();
    setActiveToolIdx(idx);
  };

  const handlePlatformClick = (idx: number) => {
    playPopSound();
    setActivePlatformIdx(idx);
  };

  const renderVerticalProgressBar = (
    item: SkillProgressBar, isActive: boolean, onClick: () => void,
    // colorClass tham số này không cần dùng nữa vì đã dùng màu cam cố định
  ) => (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0 w-20 relative group/bar pt-6" // Thêm pt-6 để chừa chỗ cho tooltip
      onClick={onClick}
    >
      {/* Custom Tooltip màu Cam */}
      <div className="absolute top-8 left-2/3 rotate-85 -translate-x-1/2 bg-orange-600 text-white text-xs font-black px-2 py-1 rounded border-2 border-slate-950 pointer-events-none opacity-0 scale-75 group-hover/bar:opacity-100 group-hover/bar:scale-100 transition-all duration-150 z-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] whitespace-nowrap">
        {getProficiencyLabel(item.percentage)}
      </div>

      {/* Cột thước đo màu Cam: Hover nghiêng nhẹ trôi nổi & Bo tròn & Vạch chia */}
      <div className={`h-32 w-7 bg-slate-100 border-2 border-slate-950 rounded-full relative overflow-hidden transition-all duration-200 ease-out
        ${isActive ? 'scale-105 bg-amber-50 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] -rotate-2 -translate-y-1' : 'hover:-translate-y-1 hover:rotate-3 hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'}`}
      >
        <div
          className="absolute bottom-0 left-0 w-full transition-all duration-500 ease-out bg-orange-500 rounded-full"
          style={{ height: `${item.percentage}%` }}
        >
          {isActive && <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />}
        </div>
        {/* Vạch chia thước đo màu đen đậm */}
        <div className="absolute inset-0 flex flex-col justify-between py-1 px-0.5 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-px bg-slate-950/70 border-b border-slate-950" />
          ))}
        </div>
      </div>

      {/* Hộp chứa Icon Mini */}
      <div className={`w-12 h-12 bg-white border-2 border-slate-950 rounded-lg flex items-center justify-center p-1.5 transition-all duration-200
        ${isActive ? 'bg-amber-100 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]' : 'group-hover/bar:-translate-y-0.5 group-hover/bar:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'}`}>
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

      <span className={`text-[11px] font-black uppercase text-center tracking-tight truncate w-full px-1 ${isActive ? 'text-orange-600' : 'text-slate-600 group-hover/bar:text-slate-900'}`}>
        {item.name}
      </span>
    </div>
  );

  return (
    <section className="p-6 flex flex-col w-full bg-sky-50 text-slate-900 font-sans gap-8 pb-4">

      {/* KHỐI 1 & 2: DROPDOWN & OVERVIEW */}
      <div className="space-y-4 pb-6 border-b-4 border-dashed border-slate-300">
{/* Dropdown Menu */}
<div className="relative w-fit min-w-[260px]">
  <select
    className="
      w-full
      appearance-none
      bg-gradient-to-b from-orange-400 to-orange-500
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
    {skillCategories.map((c, i) => (
      <option
        key={i}
        value={i}
        className="
          bg-slate-900
          text-orange-200
          font-black
          text-base
        "
      >
        {c.name}
      </option>
    ))}
  </select>

  {/* Arrow */}
  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
    <FontAwesomeIcon
      icon={faCaretDown}
      className="text-2xl text-white drop-shadow-[2px_2px_0px_rgba(15,23,42,1)]"
    />
  </div>
</div>

        {/* Tiêu đề Overview Cam */}
        <div className="flex items-center justify-end gap-3">
          {/* <h3 className="text-sm font-black italic uppercase tracking-wider text-white bg-orange-500 border-2 border-slate-950 px-3 py-1 rounded-md shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-2">
            <FontAwesomeIcon icon={faWrench} />
            {category.overview.name}
          </h3> */}
          
          <span className="text-xl absolute mb-5 -rotate-3 font-black italic text-orange-600 bg-amber-100/50 border-2 border-slate-950 px-2 py-0.5 rounded-md hover:scale-105">
            {getProficiencyLabel(category.overview.percentage)}
          </span>
        </div>

        {/* Progress Bar Ngang Cam */}
        <div className="w-full bg-slate-100 border-2 border-slate-950 rounded-md h-5 relative overflow-hidden shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <div
            className="h-full bg-orange-500 transition-all duration-700"
            style={{ width: `${category.overview.percentage}%` }}
          />
        </div>

        <div className="space-y-3 pl-1">
          {category.overviewDescription.map((desc, i) => (
            <p key={i} className="text-sm font-bold text-slate-700 leading-relaxed relative pl-4 before:content-['➢'] before:absolute before:left-0 before:text-orange-500">
              {desc}
            </p>
          ))}
        </div>
      </div>

      {/* KHỐI 3: TOOLS (Đã chuyển sang màu Cam & Thước đo) */}
      {category.toolProficiency && category.toolProficiency.length > 0 && (
        <div className="space-y-4 pb-6 border-b-4 border-dashed border-slate-300">
          {/* Tag tiêu đề Cam */}
          <h4 className="text-xs font-black italic uppercase tracking-wider text-white bg-orange-500 border-2 border-slate-950 w-fit px-3 py-1 rounded-md shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-sm" />
            Tools Inventory
          </h4>

          {/* List thước đo - Đã giảm chiều cao */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
            {category.toolProficiency.map((tool, i) =>
              // Dùng màu cam cố định bên trong hàm render
              renderVerticalProgressBar(tool, activeToolIdx === i, () => handleToolClick(i),)
            )}
          </div>

          {activeTool && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeToolIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2"
              >
                <div className="lg:col-span-1 flex flex-col justify-start pl-1">
                  <h5 className="text-base font-black text-orange-600 mb-1.5 uppercase italic tracking-tight">
                    {activeTool.name}
                  </h5>
                  <p className="text-sm font-bold text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {activeTool.description}
                  </p>
                </div>
                <div className="lg:col-span-2 h-full max-h-[250px]">
                  <ChunkyCodeBlock snippet={activeTool.codeSnippet} emptyText="// Không có gì để hiển thị :>" />
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}

      {/* KHỐI 4: PLATFORMS */}
      {category.platformProficiency && category.platformProficiency.length > 0 && (
        <div className="space-y-4 pb-6 border-b-4 border-dashed border-slate-300">
          {/* Tag tiêu đề Cam */}
          <h4 className="text-xs font-black italic uppercase tracking-wider text-white bg-orange-500 border-2 border-slate-950 w-fit px-3 py-1 rounded-md shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-sm" />
            Environment & Platforms
          </h4>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
            {category.platformProficiency.map((plat, i) =>
              renderVerticalProgressBar(plat, activePlatformIdx === i, () => handlePlatformClick(i),)
            )}
          </div>

          {activePlatform && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlatformIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2 min-h-[200px]"
              >
                <div className="lg:col-span-1 flex flex-col justify-start pl-1">
                  {/* Tiêu đề platform Cam */}
                  <h5 className="text-base font-black text-orange-600 mb-1.5 uppercase italic tracking-tight flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faTerminal} className="text-xs" />
                    {activePlatform.name}
                  </h5>
                  <p className="text-sm font-bold text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {activePlatform.description}
                  </p>
                </div>
                <div className="lg:col-span-2 h-full max-h-[250px]">
                  <ChunkyCodeBlock snippet={activePlatform.codeSnippet} emptyText="// Select a platform" />
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}

      {/* KHỐI 5: SUMMARY */}
      {(category.endDescription?.length > 0 || category.endCodeSnippet) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2 min-h-[200px]">
          <div className="lg:col-span-1 space-y-3 flex flex-col justify-start items-start pl-1">
            <h4 className="text-xs font-black italic uppercase tracking-wider text-white bg-purple-600 border-2 border-slate-950 w-fit px-3 py-1 rounded-md shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1.5">
              <FontAwesomeIcon icon={faConsole} />
              Final Summary
            </h4>
            <div className="space-y-2">
              {category.endDescription?.map((desc, i) => (
                <p key={i} className="text-sm font-bold text-slate-700 leading-relaxed relative pl-4 before:content-['❖'] before:absolute before:left-0 before:text-purple-500">
                  {desc}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 h-full max-h-[400px]">
            <ChunkyCodeBlock snippet={category.endCodeSnippet} emptyText="// Code not available" />
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

export default DevSkills;