import { useState, useEffect, useRef } from "react";
import GameHome from "../components/Sections/GameHome";
import ProjectPage from "./ProjectPage";
import MainSection from "../components/Sections/MainSection";
import OverlayMenu from "../components/Sections/Layout/OverlayMenu";
import ContactPopup from "../components/Sections/Layout/Forms/PopupContactForm";
import LanguagePopup from "../components/Sections/Layout/Forms/PopupLanguage";
import Loader from "../components/Sections/Layout/Loader";
//import { playPopBtnSound } from "../components/common/playUiSound";

export default function HomePage() {
  const [step, setStep] = useState<number>(0);
  const [activePage, setActivePage] = useState<"home" | "projects">("home");
  const [projectMountKey, setProjectMountKey] = useState(0);
  const [innerPopupOpen, setInnerPopupOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("vi");

  const isAnyPopupOpen = innerPopupOpen || contactOpen || langOpen;

  const isTransitioningRef = useRef(false);

  //2s loader on initial load
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activePage === "projects" || isAnyPopupOpen) return;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;
      if (Math.abs(e.deltaY) < 50) return;

      if (e.deltaY > 0) {
        if (step < 1) {
          changeStep(step + 1);
        }
      } else {
        if (step > 0) {
          changeStep(step - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [step, activePage, isAnyPopupOpen]);

  const changeStep = (newStep: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    setStep(newStep);
    setTimeout(() => (isTransitioningRef.current = false), 800);
  };

  if (activePage === "projects") {
    return (
      <ProjectPage
        key={projectMountKey}
        onBack={() => {
          setActivePage("home");
          setStep(1);
        }}
      />
    );
  }

  const openProjects = () => {
    setProjectMountKey((k) => k + 1);
    setActivePage("projects");
  };

  return (<div className="relative h-screen w-full overflow-hidden bg-[#7DD3FC]/60 portrait:w-[100dvh] portrait:h-[100dvw] portrait:absolute portrait:top-1/2 portrait:left-1/2 portrait:-translate-x-1/2 portrait:-translate-y-1/2 portrait:-rotate-90">

    {/* ================= BASE ================= */}
    <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400" />

    {/* ================= PAPER GRAIN ================= */}
    <div
      className="
      absolute inset-0 opacity-[0.06]
      mix-blend-multiply
      pointer-events-none
    "
      style={{
        backgroundImage: `
        url("https://www.transparenttextures.com/patterns/felt.png")
      `,
      }}
    />

    {/* ================= HALFTONE DOT ================= */}
    <div
      className="
      absolute inset-0 opacity-[0.08]
      pointer-events-none
    "
      style={{
        backgroundImage: `
        radial-gradient(circle at center,
        rgba(255,255,255,.25) 1px,
        transparent 1px)
      `,
        backgroundSize: "18px 18px",
      }}
    />

    {/* ================= HUGE RADAR CIRCLE ================= */}
    <div
      className="
      absolute -right-[20%] top-[10%]
      w-[900px] h-[900px]
      rounded-full
      border-[80px]
      border-white/10
      pointer-events-none
    "
    />

    <div
      className="
      absolute -right-[10%] top-[20%]
      w-[600px] h-[600px]
      rounded-full
      border-[40px]
      border-white/10
      pointer-events-none
    "
    />

    {/* ================= DIAGONAL SHAPES ================= */}
    <div
      className="
      absolute -left-32 top-20
      w-[500px] h-[120px]
      bg-white/10
      rotate-[-18deg]
      blur-2xl
    "
    />

    <div
      className="
      absolute right-[-10%] bottom-[15%]
      w-[450px] h-[140px]
      bg-sky-100/20
      rotate-[22deg]
      blur-2xl
    "
    />

    {/* ================= GRID LINES ================= */}
    <div
      className="
      absolute inset-0 opacity-[0.05]
      pointer-events-none
    "
      style={{
        backgroundImage: `
        linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)
      `,
        backgroundSize: "80px 80px",
      }}
    />

    {/* ================= FLOATING ICONS ================= */}
    <div className="absolute top-[12%] left-[8%] text-white/10 text-7xl rotate-[-12deg]">
      ✦
    </div>

    <div className="absolute bottom-[10%] right-[15%] text-white/10 text-6xl rotate-[18deg]">
      ✈
    </div>

    <div className="absolute top-[45%] right-[8%] text-white/10 text-5xl">
      ◎
    </div>

    {/* ================= LIGHT BLOBS ================= */}
    <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-sky-100/30 rounded-full blur-[150px] animate-pulse" />

    <div className="absolute bottom-[-30%] left-[-10%] w-[50%] h-[50%] bg-cyan-200/20 rounded-full blur-[180px]" />

    {/* ================= VIGNETTE ================= */}
    <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.18)]" />

    {/* ================= TOP LIGHT ================= */}
    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/20 to-transparent" />



    {step === 0 && (
      <div className="absolute inset-0 fade-in-down">
        <MainSection onNextPage={() => changeStep(1)} onPopupStateChange={setInnerPopupOpen} />
      </div>
    )}

    {step === 1 && (
      <div className="absolute inset-0 fade-in-up">
        <GameHome
          onOpenProjects={openProjects}
          onPopupStateChange={setInnerPopupOpen}
          onExitToMain={() => changeStep(0)}
          onOpenContact={() => setContactOpen(true)}
        />
      </div>
    )}

    <OverlayMenu
      onGoHome={() => { changeStep(0); }}
      onOpenContact={() => { setContactOpen(true); }}
      onOpenLanguage={() => { setLangOpen(true); }}
    />

    {contactOpen && <ContactPopup onClose={() => setContactOpen(false)} />}

    {langOpen && (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
        onClick={() => setLangOpen(false)}
        role="presentation"
      >
        <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
          <LanguagePopup
            currentLang={currentLang}
            onSelect={(lang) => setCurrentLang(lang)}
            onClose={() => setLangOpen(false)}
          />
        </div>
      </div>
    )}
    {showLoader && <Loader />}
  </div>
  );
}
