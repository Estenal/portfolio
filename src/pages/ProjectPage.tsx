import { Suspense, useState } from "react";
import Projects from "../components/Sections/SectionPages/Projects";
import Loader from "../components/Sections/Layout/Loader";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { playPopBtnSound } from "../components/common/playUiSound";
//import WASDOverlay from "../components/Sections/Layout/WASDOverlay";

type ProjectPageProps = {
  onBack: () => void;
};

export default function ProjectPage({ onBack }: ProjectPageProps) {
  const [isProjectLoading, setIsProjectLoading] = useState(true);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {isProjectLoading && (
        <div className="absolute inset-0 z-[150]">
          <Loader />
        </div>
      )}

      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <Projects onReady={() => setIsProjectLoading(false)} />
      </Suspense>

      <div className="absolute top-6 right-8 z-[10] select-none">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }} // Nhích nhẹ sang trái khi hover
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playPopBtnSound();
            onBack();
          }}
          className="group relative flex items-center gap-3 px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-2xl border-[4px] border-slate-900 shadow-[6px_6px_0_0_rgba(15,23,42,1)] font-black italic uppercase tracking-tighter transition-all"
        >
          {/* Icon Home: Nhún nhảy khi hover vào nút */}
          <motion.div
            variants={{
              hover: { y: [0, -4, 0] }
            }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faHome} className="text-lg" />
          </motion.div>

          <span>Trở Về</span>

        </motion.button>
      </div>


    </div>
  );
}

