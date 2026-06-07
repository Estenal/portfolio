import { Suspense, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faCog,
  faSyncAlt,
  faHeart,
  faCoins,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import SimplePlane from "../Models/SimplePlane";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import EduCertPopup from "./SectionPages/EduXCerti";
import SkillsPopup from "./SectionPages/Skills";
import { ResourceBar } from "../common/ResourceBar";
import { GameMenuButton } from "../common/GameMenuButton";
import { playPopBtnSound } from "../common/playUiSound";
import RedirectPopup from "./Layout/Forms/RedirectPopup";
import { motion } from "framer-motion";
import LogXServicesPopup from "./SectionPages/LogXServices";
import DeviceDeny from "./Layout/DeviceDeny";

type GameHomeProps = {
  onOpenProjects?: () => void;
  onPopupStateChange?: (isOpen: boolean) => void;
  onExitToMain?: () => void;
  onOpenContact?: () => void;
};

function playSoundEffect() {
  playPopBtnSound();
}

export default function GameHome({
  onOpenProjects,
  onPopupStateChange,
}: GameHomeProps) {
  const [isEduCertOpen, setIsEduCertOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isCreditOpen, setIsLogOpen] = useState(false);
  const [isDeviceDenyOpen, setIsDeviceDenyOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const handleOpenProjects = () => {
    const isPortrait =
      typeof window !== "undefined" && window.matchMedia("(orientation: portrait)").matches;

    if (isPortrait) {
      setIsDeviceDenyOpen(true);
      return;
    }

    if (onOpenProjects) onOpenProjects();
  };

  useEffect(() => {
    if (onPopupStateChange) {
      onPopupStateChange(
        isEduCertOpen || isSkillsOpen || isCreditOpen || isDeviceDenyOpen || redirectUrl !== null
      );
    }
  }, [isEduCertOpen, isSkillsOpen, isCreditOpen, isDeviceDenyOpen, redirectUrl, onPopupStateChange]);

  return (
    <div className="relative w-full h-full bg-transparent overflow-hidden font-sans select-none">
      <EduCertPopup open={isEduCertOpen} onClose={() => setIsEduCertOpen(false)} />
      <SkillsPopup open={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />
      <LogXServicesPopup open={isCreditOpen} onClose={() => setIsLogOpen(false)} />
      <DeviceDeny open={isDeviceDenyOpen} onClose={() => setIsDeviceDenyOpen(false)} />

      {/* --- BACKGROUND DECOR --- */}
      <div className="fade-in-up absolute inset-0 pointer-events-none w-full h-full z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-white/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none select-none z-50">
        
        {/* ================= PILOT GAME BADGE ================= */}
        {/* TỐI ƯU: Thu nhỏ nguyên khối 25% (scale-75) từ góc trái trên thay vì đập đi xây lại từng pixel */}
        <div className="absolute top-0 left-0 pointer-events-auto select-none portrait:scale-75 portrait:origin-top-left transition-transform">
          <motion.div
            whileHover={{ y: 4, rotate: -1, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative flex items-center gap-4 px-5 py-4 pr-10 pb-5 bg-white border-[5px] border-sky-200 rounded-bl-[2rem] rounded-br-[0.5rem] shadow-[0_8px_0_0_rgba(14,165,233,0.1),0_14px_24px_rgba(14,165,233,0.06)] overflow-visible"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 82%, 90% 100%, 0 100%)",
              backgroundImage: `linear-gradient(135deg, rgba(255,255,255,.9) 0%, rgba(255,255,255,0) 50%), repeating-linear-gradient(-45deg, rgba(14,165,233,.04) 0px, rgba(14,165,233,.04) 6px, transparent 6px, transparent 12px)`,
            }}
          >
            {/* Giữ lại ẩn chi tiết rườm rà trên mobile để UI đỡ rối */}
            <div className="absolute top-0 right-0 w-16 h-4 border-l-[4px] border-sky-200 portrait:hidden" style={{ background: "repeating-linear-gradient(45deg,#FACC15 0px,#FACC15 6px,#0EA5E9 6px,#0EA5E9 12px)" }} />

            <div className="relative w-16 h-16 bg-sky-400 border-[4px] border-sky-500 rounded-2xl flex items-center justify-center shadow-[0_4px_0_0_#0EA5E9] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-white/30 portrait:hidden" />
              <div className="absolute inset-0 opacity-10 portrait:hidden" style={{ backgroundImage: "repeating-linear-gradient(to bottom, #0284C7 0px, #0284C7 1px, transparent 1px, transparent 3px)" }} />
              <span className="text-4xl relative z-10">👨‍✈️</span>
            </div>

            <div className="flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-2">
                <span className="font-black italic uppercase text-xl tracking-tight text-sky-600 leading-none drop-shadow-[1px_2px_0_rgba(255,255,255,.85)]">ESTENAL</span>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-sky-500 portrait:hidden" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black tracking-widest text-sky-400/80">12/2004</span>
                <span className="text-[10px] font-black text-amber-500/90">ID: PILOT</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-black italic text-xs text-amber-500">LV.5</span>
                <div className="relative w-24 h-4 bg-sky-50 border-[3px] border-sky-300 overflow-hidden shadow-inner" style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: "68%" }} transition={{ duration: 1, ease: "easeOut" }} className="h-full relative bg-[#4ADE80]" style={{ backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,.25) 0px, rgba(255,255,255,.25) 6px, transparent 6px, transparent 12px)` }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-3 w-3 h-3 rounded-full bg-sky-200/80 border-[2px] border-sky-400 shadow-sm">
              <div className="absolute inset-[1px] rounded-full bg-white/50" />
            </div>
          </motion.div>
        </div>

        {/* ================= KHỐI GIỮA: TÀI NGUYÊN ================= */}
        {/* TỐI ƯU: Đổi vị trí fix cứng (px) thành tỷ lệ linh hoạt (vw/%) kết hợp scale tổng thể */}
        <div className="absolute top-6 left-[30%] flex items-center gap-16 pointer-events-auto portrait:left-[25%] portrait:top-2 portrait:gap-6 portrait:scale-[0.65] portrait:origin-top transition-all">
          <div className="drop-shadow-[0_5px_0_rgba(14,165,233,0.15)] transform hover:scale-105 transition-transform duration-200">
            <ResourceBar icon={faCoins} value="03141592" color="text-amber-500" bgColor="bg-amber-50/90" />
          </div>
          <div className="drop-shadow-[0_5px_0_rgba(14,165,233,0.15)] transform hover:scale-105 transition-transform duration-200">
            <ResourceBar icon={faGem} value="-36" color="text-sky-500" bgColor="bg-sky-50/90" />
          </div>
        </div>

        {/* Cột Nhiên Liệu: Ẩn đi trên Portrait để tiết kiệm không gian là hợp lý */}
        <div className="absolute h-full top-0 right-16 pointer-events-auto flex flex-col items-center gap-0 select-none z-50 portrait:hidden">
            {/* ... Nội dung Ống nhiên liệu giữ nguyên ... */}
            {/* Đã rút gọn để bạn dễ nhìn tập trung vào logic, ở code thật bạn giữ nguyên phần này */}
        </div>

      </div>

      {/* --- BỐ CỤC CHÍNH (ThreeJS & MENU) --- */}
      {/* TỐI ƯU: Vẫn giữ cấu trúc flex ngang (row), không đè w-full gây vỡ layout */}
      <div className="relative w-full h-full flex flex-row items-center pt-10 px-10 gap-10 z-20 portrait:px-4 portrait:pt-6 portrait:gap-2">

        {/* KHỐI TRÁI: Three.js */}
        <div className="w-[55%] h-full relative select-all cursor-grab portrait:w-[50%]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[85%] aspect-square border-[20px] border-white/20 rounded-full animate-[spin_40s_linear_infinite] shadow-[0_0_60px_rgba(255,255,255,0.2)]" />
            <div className="absolute w-[70%] aspect-square border-[8px] border-white/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
            <p className="absolute text-white text-lg font-bold my-4">LOADING...</p>
          </div>
          <Canvas key="gamehome-canvas" camera={{ position: [0, 0, 5], fov: 60 }} performance={{ min: 0.01, max: 0.05 }}>
            <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={1.5} />
            <ambientLight intensity={2.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -10, -10]} color="#BAE6FD" intensity={1.5} />
            <Suspense fallback={null}>
              <SimplePlane />
              <Environment preset="forest" />
            </Suspense>
            <OrbitControls enableZoom={false} target={[0, 0, -1]} makeDefault />
          </Canvas>
        </div>

        {/* KHỐI PHẢI: Menu chính */}
        {/* TỐI ƯU: Đảm bảo Menu giữ nguyên form vuông vức tuyệt đẹp, chỉ scale nhỏ lại 75% cho vừa khung xoay ngang của điện thoại */}
        <div className="fade-in-up w-[45%] scale-110 h-full flex flex-col justify-center items-center pr-10 pb-0 select-none portrait:scale-[0.75] 
        portrait:origin-right portrait:pr-0">

          <div className="relative w-full max-w-sm portrait:w-[90dvw]">
            {/* Decor ẩn trên mobile để giảm tải DOM */}
            <div className="absolute -top-1 -left-6 w-32 h-8 bg-amber-100/60 border-2 border-dashed border-amber-300/80 rounded-sm rotate-[-30deg] z-30 shadow-sm pointer-events-none flex items-center justify-center portrait:hidden">
              <div className="w-full h-[1px] bg-amber-200/40" />
            </div>
            
            {/* Các Decor ghim giữ nguyên */}
            <div className="absolute top-4 right-4 z-30 pointer-events-none flex flex-col items-center">
              <div className="w-6 h-6 bg-sky-400/80 rounded-full border-[3px] border-sky-600 shadow-[2px_3px_0_rgba(14,165,233,0.15)] relative">
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-70" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 z-30 pointer-events-none flex flex-col items-center">
              <div className="w-6 h-6 bg-sky-400/80 rounded-full border-[3px] border-sky-600 shadow-[2px_3px_0_rgba(14,165,233,0.15)] relative">
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-70" />
              </div>
            </div>

            <div className="relative z-10 w-full bg-white border-[5px] border-sky-200 rounded-[3rem] pt-12 p-8 pb-10 shadow-[12px_12px_0_0_rgba(14,16,23,0.5)] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-sky-100 px-6 py-1 rounded-b-xl border-x-2 border-b-2 border-sky-200 text-[8px] font-black text-sky-600 tracking-[0.25em] uppercase italic">
                SYSTEMMM ENU
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,#f0f9ff_10px,#f0f9ff_12px)] opacity-40 pointer-events-none" />

              <div className="flex flex-col gap-5 relative z-10">
                <div className="relative w-full group/play z-[1000]">
                  <button
                    onClick={() => {
                      handleOpenProjects();
                      playSoundEffect();
                    }}
                    className="group relative -rotate-1 mt-2 w-full h-24 px-10 bg-[#4ADE80] border-[5px] border-[#22c55e] shadow-[0_6px_0_0_#16a34a] hover:shadow-[0_3px_0_0_#16a34a] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all rounded-tl-4xl rounded-tr-3xl rounded-bl-2xl rounded-br-4xl overflow-hidden
                    portrait:px-8"
                  >
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 pointer-events-none" />
                    <div className="flex items-center justify-between gap-6 relative z-10
                    portrait:gap-3">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-[#16a34a] text-3xl shadow-inner group-hover:scale-105 transition-transform">
                        <FontAwesomeIcon icon={faPlay} className="ml-1" />
                      </div>
                      <div className="text-left">
                        <h2 className="text-4xl font-black text-white italic tracking-tighter drop-shadow-[1px_2px_0_rgba(22,163,74,0.3)]
                        portrait:text-3xl portrait:tracking-wide">DỰ ÁN</h2>
                        <p className="text-emerald-800/60 font-black text-[10px] tracking-wider portrait:hidden">START MISSION</p>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-2 pb-2">
                  <GameMenuButton icon={faCog} label="KỸ NĂNG" sub="SETTINGS" color="bg-[#FDBA74]" borderColor="border-[#F97316]" onClick={() => setIsSkillsOpen(true)} className="-rotate-1" />
                  <GameMenuButton icon={faSyncAlt} label="HỌC VẤN & CERT" sub="SWITCH INFO" color="bg-[#7DD3FC]" borderColor="border-[#0EA5E9]" onClick={() => setIsEduCertOpen(true)} />
                  <GameMenuButton icon={faHeart} label="UPDATE LOG" sub="MY PORTFOLIO" color="bg-[#F472B6]" borderColor="border-[#DB2777]" onClick={() => setIsLogOpen(true)} className="-rotate-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[repeating-linear-gradient(45deg,#e0f2fe,#e0f2fe_6px,#7dd3fc_6px,#7dd3fc_12px)] opacity-20 pointer-events-none" />
            </div>
          </div>

          <div className="mt-8 text-slate-400 cursor-pointer text-xs tracking-[0.3em] bg-white/40 px-4 py-1 rounded-full border border-sky-100 select-none transition-transform hover:scale-105 portrait:hidden" onClick={() => setRedirectUrl('https://sketchfab.com/johnchristian26')}>
            Plane by: johnchristian26
          </div>
        </div>
      </div>

      {redirectUrl && (
        <div className="fixed inset-0 z-[200]">
          <RedirectPopup targetUrl={redirectUrl} onClose={() => setRedirectUrl(null)} />
        </div>
      )}
    </div>
  );
}