import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faStar, faCircleNotch, faCloud } from '@fortawesome/free-solid-svg-icons';
import { PortfolioInfo } from '../../../models/Portfolio';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#7DD3FC] z-[999] select-none overflow-hidden">
      
      {/* ================= TEXTURE NỀN (GIÚP NỀN BỚT PHẲNG VÀ KHÔ KHAN) ================= */}
      {/* Lớp phủ sọc chéo chìm kiểu truyện tranh retro (Comic book Halftone/Lines) */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:16px_16px] bg-[position:0_0,8px_8px] pointer-events-none" />
      
      {/* Lớp mờ Vignette tối ở 4 góc màn hình để tập trung thị giác vào giữa */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(15,23,42,0.15)_100%)] pointer-events-none" />

      {/* ================= CÁC ĐÁM MÂY HOẠT HÌNH TRÔI DƯỚI NỀN ================= */}
      <motion.div 
        animate={{ x: [-40, 40] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "reverse" }}
        className="absolute top-1/3 left-[15%] text-white/20 text-5xl pointer-events-none"
      >
        <FontAwesomeIcon icon={faCloud} />
      </motion.div>
      <motion.div 
        animate={{ x: [30, -30] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", repeatType: "reverse" }}
        className="absolute bottom-1/3 right-[15%] text-white/20 text-7xl pointer-events-none"
      >
        <FontAwesomeIcon icon={faCloud} />
      </motion.div>

      {/* ================= CỤM ICON TRUNG TÂM (ĐÃ THU NHỎ & THÊM TEXTURE) ================= */}
      <div className="relative scale-90 md:scale-100"> {/* Thu nhỏ biểu tượng tổng thể */}
        
        {/* Bóng đổ vật lý tách biệt nằm dưới hẳn để tạo chiều sâu không gian */}
        <motion.div 
          animate={{ scale: [0.85, 1, 0.85], opacity: [0.2, 0.3, 0.2] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
          className="absolute -bottom-6 left-4 right-4 h-4 bg-slate-900/30 rounded-full blur-sm"
        />

        {/* Khung tên lửa chính */}
        <motion.div
          animate={{ 
            y: [0, -16, 2, -16, 0], // Nảy bốc đầu mạnh mẽ
            rotate: [-45, -40, -48, -42, -45] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 0.7, 
            ease: "easeInOut" 
          }}
          className="relative z-10 bg-[#F8FAFC] p-6 rounded-[2rem] border-[5px] border-slate-900 shadow-[8px_8px_0_0_rgba(15,23,42,1)] overflow-hidden"
        >
          {/* Texture sọc chéo chìm ngay bên trong khung trắng */}
          <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,#000_6px,#000_8px)] pointer-events-none" />

          {/* Icon Tên lửa đã thu nhỏ từ text-6xl xuống text-4xl */}
          <FontAwesomeIcon icon={faRocket} className="text-sky-500 text-4xl rotate-[-45deg] drop-shadow-[2px_2px_0_rgba(15,23,42,0.1)]" />
          
          {/* Điểm bóng kính (Glossy highlight) trên đầu khung giấy */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 pointer-events-none rounded-t-[2rem]" />
        </motion.div>

        {/* Ngôi sao hoạt hình bắn ra xung quanh */}
        <motion.div
          animate={{ scale: [0.4, 1.2, 0.4], opacity: [0, 1, 0], rotate: 45 }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.1 }}
          className="absolute -top-6 -right-6 text-yellow-400 text-2xl drop-shadow-[2px_2px_0_rgba(15,23,42,1)]"
        >
          <FontAwesomeIcon icon={faStar} />
        </motion.div>
        
        <motion.div
          animate={{ scale: [0.3, 1, 0.3], opacity: [0, 0.8, 0], rotate: -30 }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
          className="absolute -bottom-2 -left-8 text-white text-lg drop-shadow-[2px_2px_0_rgba(15,23,42,1)]"
        >
          <FontAwesomeIcon icon={faStar} />
        </motion.div>
      </div>

      {/* ================= PHẦN CHỮ LOADING & CHỈ BÁO ================= */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 bg-white/80 border-[3px] border-slate-900 px-5 py-2 rounded-2xl shadow-[4px_4px_0_0_rgba(15,23,42,1)]">
          <FontAwesomeIcon 
            icon={faCircleNotch} 
            className="text-slate-900 text-sm animate-spin" 
          />
          <span className="text-slate-900 font-black text-xl uppercase italic tracking-tighter">
            Đang Tải Tài Nguyên...
          </span>
        </div>

        <div className="bg-slate-900 px-3 py-1 rounded-lg border-2 border-slate-700 shadow-sm">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] italic">
            Estenal's Portfolio v{PortfolioInfo.version}
          </p>
        </div>
      </div>

    </div>
  );  
}
