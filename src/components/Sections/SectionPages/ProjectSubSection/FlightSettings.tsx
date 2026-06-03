import { useEffect, useCallback } from "react";
import { faCog, faWind, faTags, faCheckDouble, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { playPopSound } from "../../../common/playUiSound";

type ProjectTypeFilter = {
  types: string[];
  enabledTypes: Set<string>;
  onToggleType: (type: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
};

interface FlightSettingsProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  isOpen: boolean;
  onToggle: () => void;
  filter: ProjectTypeFilter;
}

const FlightSettings: React.FC<FlightSettingsProps> = ({
  speed,
  onSpeedChange,
  isOpen,
  onToggle,
  filter,
}) => {
  
  // Wrapper xử lý âm thanh và hành động
  const handleAction = useCallback((callback: () => void) => {
    playPopSound();
    callback();
  }, []);

  // Lắng nghe phím TAB để đóng mở
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault(); // Ngăn focus mặc định của trình duyệt
        handleAction(onToggle);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggle, handleAction]);

  return (
    <div className="select-none"> {/* Ngăn chặn bôi đen toàn bộ khu vực settings */}
      
      {/* Settings Button: Giờ đóng vai trò Toggle duy nhất */}
      <div className="absolute top-8 left-8 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAction(onToggle)}
          className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl border-[4px] border-slate-900 shadow-[6px_6px_0_0_rgba(15,23,42,1)] font-black italic uppercase tracking-tighter transition-all 
            ${isOpen ? 'bg-rose-400 text-white' : 'bg-indigo-500 text-white hover:bg-indigo-400'}`}
        >
          <FontAwesomeIcon 
            icon={faCog} 
            className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : 'group-hover:rotate-90'}`} 
          />
          <span>{isOpen ? "Đóng" : "Menu"}</span>
          
          {/* Badge phím tắt TAB */}
          <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded-md border border-white font-black shadow-sm">
            TAB
          </div>
        </motion.button>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.9 }}
            className="absolute left-8 bottom-8 z-[60] w-80 bg-white border-[6px] border-slate-900 rounded-[3rem] shadow-[16px_16px_0_0_rgba(15,23,42,1)] p-8 overflow-hidden"
          >
            {/* Header: Chỉ còn tiêu đề */}
            <div className="flex flex-col mb-8 text-center">
              <h3 className="text-2xl font-black text-slate-900 italic uppercase leading-none tracking-tighter">
                Flight Control
              </h3>
              <div className="h-1 w-12 bg-slate-100 mx-auto mt-2 rounded-full" />
            </div>

            {/* Speed Slider */}
            <div className="mb-8 p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-600 font-black text-[10px] uppercase italic">
                  <FontAwesomeIcon icon={faWind} className="text-sky-500" />
                  <span>Tốc Độ</span>
                </div>
                <span className="bg-yellow-400 px-2 py-0.5 rounded-lg border-2 border-slate-900 text-slate-900 font-black text-[10px] italic">
                  {speed.toFixed(2)}x
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.1"
                value={speed}
                onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer border-2 border-slate-900
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                          [&::-webkit-slider-thumb]:bg-sky-500 [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-slate-900
                          [&::-webkit-slider-thumb]:rounded-lg"
              />
            </div>

            {/* Filter Section */}
            <div className="w-full">
              <div className="flex items-center gap-2 text-slate-600 font-black text-[10px] uppercase italic mb-4">
                <FontAwesomeIcon icon={faTags} className="text-indigo-500" />
                <span>Phân loại</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {filter.types.map((t) => {
                  const enabled = filter.enabledTypes.has(t);
                  return (
                    <motion.button
                      key={t}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(() => filter.onToggleType(t))}
                      className={`px-3 py-3 rounded-xl border-[3px] border-slate-900 text-[10px] font-black uppercase italic shadow-[4px_4px_0_0_rgba(15,23,42,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${
                        enabled ? "bg-indigo-500 text-white" : "bg-white text-slate-400 grayscale opacity-60"
                      }`}
                    >
                      {t}
                    </motion.button>
                  );
                })}
              </div>

              {/* Bulk Actions (No Active state) */}
              <div className="mt-6 flex gap-3">
                <BulkActionButton 
                  onClick={() => handleAction(filter.onSelectAll)} 
                  icon={faCheckDouble} 
                  label="Tất cả" 
                  color="bg-emerald-400" 
                />
                <BulkActionButton 
                  onClick={() => handleAction(filter.onClearAll)} 
                  icon={faTrashAlt} 
                  label="Xóa hết" 
                  color="bg-slate-200" 
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[repeating-linear-gradient(45deg,#fbbf24,#fbbf24_10px,#1e293b_10px,#1e293b_20px)] opacity-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BulkActionButton = ({ onClick, icon, label, color }: any) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 ${color} border-[3px] border-slate-900 rounded-xl text-[9px] font-black uppercase italic shadow-[4px_4px_0_0_rgba(15,23,42,1)]`}
  >
    <FontAwesomeIcon icon={icon} />
    {label}
  </motion.button>
);

export default FlightSettings;