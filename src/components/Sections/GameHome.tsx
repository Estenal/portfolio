import { Suspense, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faCog,
  faSyncAlt,
  faHeart,
  faCoins,
  faGem,
  faGasPump,
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
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Effect to notify parent about popup state
  useEffect(() => {
    if (onPopupStateChange) {
      onPopupStateChange(isEduCertOpen || isSkillsOpen || isCreditOpen || redirectUrl !== null);
    }
  }, [isEduCertOpen, isSkillsOpen, isCreditOpen, redirectUrl, onPopupStateChange]);

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden font-sans select-none">

      <EduCertPopup open={isEduCertOpen} onClose={() => setIsEduCertOpen(false)} />
      <SkillsPopup open={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />
      <LogXServicesPopup open={isCreditOpen} onClose={() => setIsLogOpen(false)} />

      {/* --- BACKGROUND DECOR (LUNG LINH) --- */}
      <div className="fade-in-up absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-white/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none select-none z-50">

        {/* ================= PILOT GAME BADGE (MÀU SKY BLUE ĐỒNG BỘ) ================= */}
        <div className="absolute top-0 left-0 pointer-events-auto select-none">
          <motion.div
            whileHover={{
              y: 4,
              rotate: -1,
              scale: 1.02,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className="
      relative flex items-center gap-4
      px-5 py-4 pr-10 pb-5
      bg-white
      border-[5px] border-sky-200 
      rounded-bl-[2rem] rounded-br-[0.5rem]
      shadow-[0_8px_0_0_rgba(14,165,233,0.1),0_14px_24px_rgba(14,165,233,0.06)]
      overflow-visible
    "
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 82%, 90% 100%, 0 100%)",
              backgroundImage: `
        linear-gradient(
          135deg,
          rgba(255,255,255,.9) 0%,
          rgba(255,255,255,0) 50%
        ),
        repeating-linear-gradient(
          -45deg,
          rgba(14,165,233,.04) 0px,
          rgba(14,165,233,.04) 6px,
          transparent 6px,
          transparent 12px
        )
      `,
            }}
          >
            {/* ================= FLOATING DECOR ================= */}

            {/* Warning Stripe: Đổi nền sọc đen sang sọc xanh biển sẫm dịu mắt */}
            <div
              className="absolute top-0 right-0 w-16 h-4 border-l-[4px] border-sky-200"
              style={{
                background: "repeating-linear-gradient(45deg,#FACC15 0px,#FACC15 6px,#0EA5E9 6px,#0EA5E9 12px)",
              }}
            />

            {/* ================= AVATAR ================= */}
            <div
              className="
        relative w-16 h-16
        bg-sky-400
        border-[4px] border-sky-500
        rounded-2xl
        flex items-center justify-center
        shadow-[0_4px_0_0_#0EA5E9]
        overflow-hidden
      "
            >
              {/* Highlight */}
              <div className="absolute top-0 left-0 w-full h-2 bg-white/30" />

              {/* Fake Scanline */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "repeating-linear-gradient(to bottom, #0284C7 0px, #0284C7 1px, transparent 1px, transparent 3px)",
                }}
              />

              <span className="text-4xl relative z-10">👨‍✈️</span>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="flex flex-col justify-center relative z-10">

              {/* TOP INFO */}
              <div className="flex items-center gap-2">
                <span
                  className="
            font-black italic uppercase
            text-xl tracking-tight
            text-sky-600
            leading-none
            drop-shadow-[1px_2px_0_rgba(255,255,255,.85)]
          "
                >
                  ESTENAL
                </span>

                {/* ONLINE DOT */}
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-sky-500" />
              </div>

              {/* SUB LABEL */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black tracking-widest text-sky-400/80">
                  12/2004
                </span>

                <span className="text-[10px] font-black text-amber-500/90">
                  ID: PILOT
                </span>
              </div>

              {/* ================= EXP BAR ================= */}
              <div className="flex items-center gap-2 mt-3">
                <span className="font-black italic text-xs text-amber-500">
                  LV.5
                </span>

                <div
                  className="
            relative w-24 h-4
            bg-sky-50
            border-[3px] border-sky-300
            overflow-hidden
            shadow-inner
          "
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)",
                  }}
                >
                  {/* EXP Fill */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="h-full relative bg-[#4ADE80]"
                    style={{
                      backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  rgba(255,255,255,.25) 0px,
                  rgba(255,255,255,.25) 6px,
                  transparent 6px,
                  transparent 12px
                )
              `,
                    }}
                  >
                    {/* Shine */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ================= METAL PIN (ĐINH GHIM THẠCH TRONG SUỐT) ================= */}
            <div
              className="
        absolute top-2 right-3
        w-3 h-3
        rounded-full
        bg-sky-200/80
        border-[2px] border-sky-400
        shadow-sm
      "
            >
              <div className="absolute inset-[1px] rounded-full bg-white/50" />
            </div>
          </motion.div>
        </div>


        {/* ================= KHỐI GIỮA: TÀI NGUYÊN THẢ TRÔI THOÁNG ĐÃNG ================= */}
        <div className="absolute top-6 left-[340px] flex items-center gap-16 pointer-events-auto">
          {/* Vàng: Đổi bóng đổ sẫm màu tiệp tông Sky đậm, tạo cảm giác như khối nhựa trong suốt */}
          <div className="drop-shadow-[0_5px_0_rgba(14,165,233,0.15)] transform hover:scale-105 transition-transform duration-200">
            <ResourceBar
              icon={faCoins}
              value="3 141 592"
              color="text-amber-500" // Hạ độ chói của màu vàng gốc xuống màu cam hổ phách dịu hơn
              bgColor="bg-amber-50/90" // Nền trắng sữa pha chút sắc cam cực nhẹ, có tí opacity nịnh mắt
            />
          </div>

          {/* Kim Cương: Đồng bộ bóng đổ xanh da trời trong suốt */}
          <div className="drop-shadow-[0_5px_0_rgba(14,165,233,0.15)] transform hover:scale-105 transition-transform duration-200">
            <ResourceBar
              icon={faGem}
              value="-36"
              color="text-sky-500" // Chuyển sang màu Sky Blue đậm để đồng bộ với tổng thể UI
              bgColor="bg-sky-50/90" // Nền trắng xanh dịu nhẹ giống như tấm kính mờ
            />
          </div>
        </div>

        {/* ================= KHỐI PHẢI: ỐNG NGHIỆM NHIÊN LIỆU TREO NGƯỢC (CHẤT LỎNG DÂNG TỪ DƯỚI LÊN) ================= */}
        <div className="absolute h-full top-0 right-16 pointer-events-auto flex flex-col items-center gap-0 select-none z-50">

          {/* 1. ĐẾ TREO HÌNH THANG: Cố định chặt vào cạnh trên màn hình */}
          <div
            className="w-18 h-4 bg-sky-100 border-x-4 border-b-4 border-sky-300 shadow-[0_3px_0_rgba(14,165,233,0.1)] relative"
            style={{
              clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0 100%)"
            }}
          >
            {/* Chi tiết đinh vít giữ đế */}
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-sky-300 rounded-full" />
          </div>

          {/* 2. NHÃN NHIÊN LIỆU: Kẹp ngay dưới đế treo */}
          <div className="bg-sky-100 border-2 border-sky-300 px-2 py-0.5 rounded-md shadow-[0_2px_0_rgba(14,165,233,0.1)] z-20 -mt-1">
            <span className="text-sky-600 font-black text-[8px] tracking-widest uppercase italic">
              <FontAwesomeIcon icon={faGasPump} className="mr-1 font-black text-xl" />
            </span>
          </div>

          {/* 3. THÂN ỐNG NGHIỆM TREO NGƯỢC */}
          {/* Dùng justify-end để chất lỏng luôn lắng xuống phần bo tròn dưới đáy */}
          <div className="w-8 h-[40%] bg-sky-50/40 border-x-[4px] border-b-[4px] border-sky-300 rounded-b-full p-1 shadow-[0_6px_0_rgba(14,165,233,0.1)] relative flex flex-col justify-end overflow-hidden -mt-1">

            {/* Lượng nhiên liệu: Dâng từ dưới lên, bo theo đáy ống nghiệm nhờ rounded-b-xl */}
            <motion.div
              animate={{ height: ["82%", "79%", "82%"] }} // Giữ nguyên hiệu ứng dập dềnh sóng sánh
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-full bg-gradient-to-t from-amber-500 via-yellow-400 to-orange-300 rounded-b-2xl relative border-t-2 border-white/40"
              style={{ height: "82%" }}
            >
              {/* Vân sọc bóng kính dọc của ống nghiệm */}
              <div className="absolute inset-y-0 left-1 w-1 bg-white/40 rounded-full" />
            </motion.div>

            {/* Các vạch định mức đo xăng */}
            <div className="absolute inset-y-0 left-0 w-full flex flex-col justify-between py-5 px-1.5 opacity-25 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-[2px] bg-sky-300" />
              ))}
            </div>
          </div>

          {/* 4. TEXT HIỂN THỊ PHẦN TRĂM DƯỚI ĐÁY ỐNG NGHIỆM */}
          <span className="mt-2 font-black text-sky-600 text-[14px] italic tracking-tighter bg-white px-4 py-0.5 rounded-md border-2 border-sky-300 shadow-[0_2px_0_rgba(14,165,233,0.1)]">
            82%
          </span>
        </div>

      </div>

      {/* --- BỐ CỤC CHÍNH --- */}
      <div className="relative w-full h-full flex flex-row items-center pt-10 px-10 gap-10 z-20">

        {/* KHỐI TRÁI: Three.js Placeholder () */}
        <div className="w-5/9 h-full relative select-all cursor-grab">

          <div className="absolute inset-0 flex items-center justify-center">
            {/* Decor vòng tròn phía sau máy bay */}
            <div className="w-[85%] aspect-square border-[20px] border-white/20 rounded-full animate-[spin_40s_linear_infinite] shadow-[0_0_60px_rgba(255,255,255,0.2)]" />
            <div className="absolute w-[70%] aspect-square border-[8px] border-white/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
            <p className="absolute text-white text-lg font-bold my-4">LOADING...</p>
          </div>
          <Canvas
            key="gamehome-canvas"
            camera={{ position: [0, 0, 5], fov: 60 }}
            performance={{ min: 0.01, max: 0.05 }}>
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.5}
              scale={10}
              blur={2}
              far={1.5}
            />
            <ambientLight intensity={2.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -10, -10]} color="#BAE6FD" intensity={1.5} />
            <Suspense fallback={null}>
              <SimplePlane />
              <Environment preset="forest" />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              target={[0, 0, -1]}
              makeDefault
            />
          </Canvas>
        </div>

        {/* KHỐI PHẢI: Menu chính (2/5) */}
        <div className="fade-in-up w-4/9 scale-110 h-full flex flex-col justify-center items-center pr-20 px-0 pb-0 select-none">

          {/* MAIN CONTAINER: Khung neo giữ phụ kiện trang trí */}
          <div className="relative w-full max-w-sm">

            {/* --- DECORATION 1: BĂNG KEO DÁN GÓC HẠ TÔNG MÀU (Soft Washi Tape) --- */}
            <div className="absolute -top-1 -left-6 w-32 h-8 bg-amber-100/60 border-2 border-dashed border-amber-300/80 rounded-sm rotate-[-30deg] z-30 shadow-sm pointer-events-none flex items-center justify-center">
              <div className="w-full h-[1px] bg-amber-200/40" />
            </div>

            {/* --- DECORATION 2: ĐINH GHIM NHỰA TRONG SUỐT GÓC TRÊN PHẢI --- */}
            <div className="absolute top-4 right-4 z-30 pointer-events-none flex flex-col items-center">
              <div className="w-6 h-6 bg-sky-400/80 rounded-full border-[3px] border-sky-600 shadow-[2px_3px_0_rgba(14,165,233,0.15)] relative">
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-70" />
              </div>
            </div>

            {/* --- DECORATION 3: ĐINH GHIM NHỰA TRONG SUỐT GÓC DƯỚI TRÁI --- */}
            <div className="absolute bottom-4 left-4 z-30 pointer-events-none flex flex-col items-center">
              <div className="w-6 h-6 bg-sky-400/80 rounded-full border-[3px] border-sky-600 shadow-[2px_3px_0_rgba(14,165,233,0.15)] relative">
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-70" />
              </div>
            </div>


            {/* MAIN MENU BOX (Phối màu Sky Blue & Pastel mềm mại) */}
            <div className="relative z-10 w-full bg-white border-[5px] border-sky-200 rounded-[3rem] pt-12 p-8 pb-10 shadow-[12px_12px_0_0_rgba(14,16,23,0.5)] overflow-hidden">

              {/* HEADER LABEL: Dải ruy băng đồng bộ màu xanh da trời đậm */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-sky-100 px-6 py-1 rounded-b-xl border-x-2 border-b-2 border-sky-200 text-[8px] font-black text-sky-600 tracking-[0.25em] uppercase italic">
                SYSTEMMM ENU
              </div>

              {/* Lớp vân sọc chéo chìm góc hộp siêu mờ */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,#f0f9ff_10px,#f0f9ff_12px)] opacity-40 pointer-events-none" />

              <div className="flex flex-col gap-5 relative z-10">



                  {/* NÚT PLAY CHÍNH */}
                <div className="relative w-full group/play z-[1000]">
                  <button
                    onClick={() => {
                      if (onOpenProjects) onOpenProjects();
                      playSoundEffect();
                    }}
                    className="group relative -rotate-1 mt-2 w-full h-24 px-10 bg-[#4ADE80] border-[5px] border-[#22c55e] shadow-[0_6px_0_0_#16a34a] hover:shadow-[0_3px_0_0_#16a34a] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all
    rounded-tl-4xl rounded-tr-3xl rounded-bl-2xl rounded-br-4xl overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 pointer-events-none" />

                    <div className="flex items-center justify-between gap-6 relative z-10">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-[#16a34a] text-3xl shadow-inner group-hover:scale-105 transition-transform">
                        <FontAwesomeIcon icon={faPlay} className="ml-1" />
                      </div>
                      <div className="text-left">
                        <h2 className="text-4xl font-black text-white italic tracking-tighter drop-shadow-[1px_2px_0_rgba(22,163,74,0.3)]">DỰ ÁN</h2>
                        <p className="text-emerald-800/60 font-black text-[10px] tracking-wider">START MISSION</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* CÁC NÚT PHỤ (SECONDARY ACTIONS): Hạ độ bão hòa, chuyển sang hệ màu Pastel dịu mềm */}
                <div className="grid grid-cols-1 gap-4 mt-2 pb-2">

                  {/* SKILLS - Màu Cam sữa nhạt phối viền Cam đất */}
                  <GameMenuButton
                    icon={faCog}
                    label="KỸ NĂNG"
                    sub="SETTINGS"
                    color="bg-[#FDBA74]"
                    borderColor="border-[#F97316]"
                    onClick={() => setIsSkillsOpen(true)}
                    className="-rotate-1"
                  />

                  {/* EDUCATION - Màu Sky Blue đồng bộ viền Xanh dương đậm */}
                  <GameMenuButton
                    icon={faSyncAlt}
                    label="HỌC VẤN & CERT"
                    sub="SWITCH INFO"
                    color="bg-[#7DD3FC]"
                    borderColor="border-[#0EA5E9]"
                    onClick={() => setIsEduCertOpen(true)}
                    className=""
                  />

                  {/* UPDATE LOG - Màu Hồng Pastel dịu dàng phối viền Hồng đậm */}
                  <GameMenuButton
                    icon={faHeart}
                    label="UPDATE LOG"
                    sub="MY PORTFOLIO"
                    color="bg-[#F472B6]"
                    borderColor="border-[#DB2777]"
                    onClick={() => setIsLogOpen(true)}
                    className="-rotate-1"
                  />

                </div>
              </div>

              {/* Hoa văn sọc trang trí dưới đáy hộp siêu nhạt */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[repeating-linear-gradient(45deg,#e0f2fe,#e0f2fe_6px,#7dd3fc_6px,#7dd3fc_12px)] opacity-20 pointer-events-none" />
            </div>

          </div>

          {/* Version text */}
          <div className="mt-8 text-slate-400 cursor-pointer text-xs tracking-[0.3em] bg-white/40 px-4 py-1 rounded-full border border-sky-100 select-none transition-transform hover:scale-105"
            onClick={() => setRedirectUrl('https://sketchfab.com/johnchristian26')}>
            Plane by: johnchristian26 (sketchfab.com)
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