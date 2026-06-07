import React from 'react';

const MainBackground: React.FC = () => {
  // Danh sách tốc độ khác nhau cho từng hàng để tạo độ mượt lệch pha
  const speeds = ['animate-marquee-20', 'animate-marquee-25', 'animate-marquee-18', 'animate-marquee-22'];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-18 { animation: marquee 18s linear infinite; }
        .animate-marquee-20 { animation: marquee 20s linear infinite; }
        .animate-marquee-22 { animation: marquee 22s linear infinite; }
        .animate-marquee-25 { animation: marquee 25s linear infinite; }
      `}</style>

      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-transparent
      portrait:w-[100dvh] portrait:h-[100dvw]">
        
        {/* Lớp Texture Chữ Chạy Nền */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen select-none [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.3),rgba(0,0,0,1),rgba(0,0,0,0.3))]">
          
          {/* - Màn hình nhỏ: Tăng kích thước vùng chứa lên w-[300%] h-[300%] inset-[-100%] để chữ tràn hẳn ra ngoài, không bị hụt góc.
            - Màn hình lớn (md): Thu về w-[200%] h-[200%] inset-[-50%] để tối ưu hiệu năng.
          */}
          <div className="absolute inset-[-100%] w-[300%] h-[300%] md:inset-[-50%] md:w-[200%] md:h-[200%] rotate-[-20deg] flex flex-col justify-center gap-y-4 md:gap-y-8 overflow-hidden">
            
            {/* Tạo ra khoảng 8-12 hàng chữ để lấp đầy màn hình từ trên xuống dưới trên mọi thiết bị */}
            {Array.from({ length: 10 }).map((_, index) => {
              // Lấy ngẫu nhiên hoặc tuần hoàn tốc độ chạy từ mảng speeds
              const speedClass = speeds[index % speeds.length];
              
              return (
                <div 
                  key={index} 
                  className={`flex whitespace-nowrap text-[8rem] font-black tracking-widest text-white uppercase gap-4 md:gap-6 ${speedClass}`}
                >
                  {/* Nhân bản chuỗi chữ nhiều lần hơn trên một hàng để không bị trống khi màn hình kéo giãn */}
                  <span>ESTENAL ✦ PORTFOLIO ✦</span>
                  <span>ESTENAL ✦ PORTFOLIO ✦</span>
                  <span>ESTENAL ✦ PORTFOLIO ✦</span>
                  <span>ESTENAL ✦ PORTFOLIO ✦</span>
                  <span>ESTENAL ✦ PORTFOLIO ✦</span>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </>
  );
};

export default MainBackground;