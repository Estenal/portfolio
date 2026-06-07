import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faStar, faRocket, faTools, faPlay, faSignOutAlt, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { BandSection } from './Card';
import SkillsPopup from './SectionPages/Skills';
import { SocialLink } from '../common/SocialLink';
import RedirectPopup from './Layout/Forms/RedirectPopup';
import { IconButton } from '../common/IconButton';
import MainBackground from './Layout/MainBackground';
import { LinkResources } from '../../models/Portfolio';

const subtitles = ["Fullstack Developer", "2D Designer", "Server Admin"];

type MainSectionProps = {
  onNextPage?: () => void;
  onPopupStateChange?: (isOpen: boolean) => void;
};

export const MainSection = ({ onNextPage, onPopupStateChange }: MainSectionProps) => {
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  function playSoundEffect() {
    const soundeffect = new Audio('/sounds/popbtn.mp3');
    soundeffect.play();
  }

  useEffect(() => {
    if (onPopupStateChange) {
      onPopupStateChange(isSkillsOpen || redirectUrl !== null);
    }
  }, [isSkillsOpen, redirectUrl, onPopupStateChange]);

  const handleScrollToGameHome = () => {
    if (onNextPage) onNextPage();
    else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="w-full h-full bg-transparent overflow-hidden font-sans select-none">

      <div className="portrait:hidden relative w-full h-full flex items-center">
        <SkillsPopup open={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />

        {/* OVERLAY CANVAS 3JS */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[25%] aspect-square border-[20px] border-white/20 rounded-full animate-[spin_40s_linear_infinite] shadow-[0_0_60px_rgba(255,255,255,0.2)]" />
          <div className="absolute w-[70%] aspect-square border-[8px] border-white/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
        </div>

        <div className="absolute inset-0 z-0 pointer-events-auto w-full h-full">
          <BandSection />
        </div>

        {/* MAIN CONTENT (z-20) */}
        <div className="relative z-20 w-2/3 flex flex-col justify-center px-24 space-y-8">

          {/* Brand Name */}
          <div className='fade-in-left-2'>
            <h1 className="text-[10rem] font-black text-slate-900 tracking-tighter italic uppercase leading-none drop-shadow-[6px_6px_0_rgba(255,255,255,1)]">
              ESTENAL
            </h1>
            <p className="text-3xl text-white font-black mt-2 tracking-[0.4em] uppercase italic drop-shadow-[3px_3px_0_rgba(15,23,42,0.1)]">
              — Đỗ Cao Trí —
            </p>
          </div>

          {/* Text Slide & Skills Button */}
          <div className="fade-in-left-05 flex flex-row items-center gap-4">
            <div className="bg-slate-900 px-8 py-4 rounded-[2.5rem] border-[4px] border-white shadow-xl flex items-center h-20 min-w-[500px] overflow-hidden relative">
              <div className="absolute top-[-10px] left-0 px-5 py-2 rounded-lg font-black text-blue-100 italic text-xl rotate-[-5deg] flex-shrink-0">
                THE:
              </div>

              <div className="relative h-full flex items-center flex-1 ml-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentSubtitle}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -25, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute left-0 text-yellow-400 text-3xl font-black uppercase italic whitespace-nowrap"
                  >
                    {subtitles[currentSubtitle]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <FontAwesomeIcon icon={faStar} className="text-white/10 absolute right-6 text-3xl animate-spin-slow block" />
            </div>

            {/* Skills Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="h-20 w-20 bg-orange-400 border-[4px] border-slate-900 rounded-[2rem] shadow-[6px_6px_0_0_rgba(15,23,42,1)] flex flex-col items-center justify-center text-white z-30 pointer-events-auto shrink-0"
              onClick={() => {
                setIsSkillsOpen(true);
                playSoundEffect();
              }}
            >
              <FontAwesomeIcon icon={faTools} className="text-2xl" />
              <span className="text-[9px] font-black mt-1 uppercase">Skills</span>
            </motion.button>
          </div>

          {/* Action & Socials */}
          <div className="fade-in-left-05 flex flex-wrap items-center gap-6 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleScrollToGameHome();
                playSoundEffect();
              }}
              className="relative group h-16 z-30 pointer-events-auto"
            >
              <div className="absolute inset-0 bg-slate-900 rounded-2xl translate-y-1.5 translate-x-1" />
              <div className="relative h-full px-10 bg-green-400 text-slate-900 font-black text-xl rounded-2xl border-[3px] border-slate-900 flex items-center gap-3 transition-transform group-hover:-translate-y-1">
                <FontAwesomeIcon icon={faRocket} />
                EXPLORE MY WORLD
              </div>
            </motion.button>

            <div className="flex gap-3 z-30 pointer-events-auto">
              <SocialLink
                href={LinkResources.github}
                icon={faGithub}
                color="bg-slate-800"
                tooltip="GitHub"
                onClick={(e) => { e.preventDefault(); setRedirectUrl(LinkResources.github); }}
              />
              <SocialLink
                href={LinkResources.linkedin}
                icon={faLinkedin}
                color="bg-sky-600"
                tooltip="LinkedIn"
                onClick={(e) => { e.preventDefault(); setRedirectUrl(LinkResources.linkedin); }}
              />
              <SocialLink
                href={LinkResources.email}
                icon={faEnvelope}
                color="bg-teal-500"
                tooltip="Email"
                onClick={(e) => { e.preventDefault(); setRedirectUrl(LinkResources.email); }}
              />
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 cursor-pointer pointer-events-auto portrait:hidden"
          onClick={handleScrollToGameHome}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-10 h-14 bg-white border-[4px] border-slate-900 rounded-2xl flex items-center justify-center shadow-[4px_4px_0_0_rgba(15,23,42,1)]">
            <div className="w-3 h-6 bg-slate-900 rounded-full animate-bounce" />
          </div>
          <span className="text-slate-900 font-black text-[10px] mt-2 tracking-widest uppercase"> - Slide Down</span>
        </motion.div>

        {redirectUrl && (
          <div className="fixed inset-0 z-[200]">
            <RedirectPopup targetUrl={redirectUrl} onClose={() => setRedirectUrl(null)} />
          </div>
        )}
      </div>


      {/* PORTRAIT MODE - SIMPLIFIED LAYOUT -90 deg */}
      <div className="hidden portrait:block absolute inset-0">
        <MainBackground />
      </div>
      <div className="portrait:absolute portrait:inset-0 portrait:block fade-in-down px-12 hidden pb-12 pt-2 relative w-full h-full select-none flex-col">

        {/* TOP OVERLAY BAR (Tối giản, trong suốt) */}
        <div className="absolute bottom-0 left-0 p-3 w-full h-full flex justify-between items-start z-10">
          {/*Button GitHub, Contact */}
          <div className="flex flex-col justify-between items-start h-full w-auto">

            <div className="items-start justify-start flex-row flex space-x-2 scale-80">
              <IconButton
                icon={faGithub}
                tooltip="GitHub"
                color="bg-slate-800"
                size="sm"
                motionLift
                onClick={() => setRedirectUrl(LinkResources.github)}
              />
              <IconButton
                icon={faLinkedin}
                tooltip="LinkedIn"
                color="bg-sky-600"
                size="sm"
                motionLift
                onClick={() => setRedirectUrl(LinkResources.linkedin)}
              />
              <IconButton
                icon={faEnvelope}
                tooltip="Email"
                color="bg-teal-500"
                size="sm"
                motionLift
                onClick={() => setRedirectUrl(LinkResources.email)}
              />

            </div>

            {/* Cảnh báo PC (Dạng chữ đơn giản + icon nhấp nháy, không xài khung nền) */}
            <div className="flex items-center gap-2 text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
              <span className="flex items-center justify-center w-4 h-4 bg-red-500 text-white font-black text-[10px] rounded-full animate-pulse">!</span>
              <p className="text-xs font-bold tracking-wide">
                Trải nghiệm hiện tại <span className="text-red-500">bị Hạn Chế</span> trên thiết bị di động.
              </p>
            </div>
          </div>

          {/* Chuông & Logout (Trong suốt, viền mảnh) */}
          <div className="flex flex-col justify-between items-center gap-4 h-full w-auto">
            {/* Chuông thông báo */}
            <button className="relative p-1.5 text-slate-900 hover:text-white transition-colors active:scale-95">
              <FontAwesomeIcon icon={faBell} className="text-lg" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
            </button>

            {/* Nút Logout, account */}
            <div className="flex flex-col items-center space-y-2 text-slate-900 hover:text-rose-600 transition-colors">
              <button className="text-xl font-black tracking-widest text-slate-900 hover:text-rose-600 uppercase transition-colors active:scale-95">
                <FontAwesomeIcon icon={faUser} className="mr-1" />
              </button>
              <button className="text-xl font-black tracking-widest text-slate-900 hover:text-rose-600 uppercase transition-colors active:scale-95">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
              </button>
            </div>
          </div>

        </div>


        {/* CENTER: MAIN TITLE & SUBTITLE (Giữ nguyên form của bạn) */}
        <div className='w-full h-2/3 flex flex-col justify-center items-center text-center px-4 relative z-10 select-none'>
          {/* Khối Title lớn */}
          <div className="flex flex-col items-center md:items-start relative font-black tracking-tighter italic uppercase leading-none text-slate-900">
            {/* Chữ ESTENAL với viền và đổ bóng layer */}
            <h1 className="text-7xl sm:text-6xl md:text-[6.5rem] drop-shadow-[6px_6px_0_rgba(255,255,255,1)] transition-transform hover:scale-105 duration-300">
              ESTENAL
            </h1>

            {/* Chữ PORTFOLIO tự động căn phải tinh tế, không lo vỡ layout */}
            <span className="text-4xl sm:text-4xl md:text-5xl text-white bg-slate-900 px-4 py-1 mt-2 md:-mt-3 md:self-end shadow-[4px_4px_0_#fff] border-2 border-white tracking-normal not-italic">
              PORTFOLIO
            </span>
          </div>
        </div>

        {/* BOTTOM: GAME ACTIONS (Gọn gàng ở đáy màn hình) */}
        <div className="w-full h-1/3 flex flex-col space-y-2 items-center justify-center pt-8 relative z-10">

          {/* CHỌN SERVER & PHIÊN BẢN (Dạng text phẳng, cực thoáng) */}
          <div className="flex items-center gap-4 cursor-pointer group text-slate-950">
            <div className="flex flex-col">
              <span className="text-xs tracking-widest group-hover:text-white transition-colors">
                Trí Đỗ
              </span>
            </div>
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </div>

          {/* ENTER THE GAME BUTTON (Nút duy nhất có nền để tạo điểm nhấn) */}
          <button className="px-3 py-2 rounded-full bg-white/20 backdrop-blur-2xl border-[3px] border-sky-300/50 inner-shadow-lg shadow-blue-400 shadow-2xl"
            onClick={() => { handleScrollToGameHome(); playSoundEffect(); }}>
            Click to start
            <FontAwesomeIcon icon={faPlay} className="ml-2" />
          </button>
        </div>
      </div>

    </section >
  );
};

export default MainSection;