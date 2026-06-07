import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUserShield, faBrain, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { getProficiencyLabel } from '../../../../utils/common';

// Mock data giả định tương thích với hàm quy đổi text của bạn
const softSkillData = [
  { 
    name: "Teamwork", 
    percentage: 60, 
    icon: faComments, 
    description: "Biết lắng nghe, chủ động phân chia công việc hợp lý và thúc đẩy tinh thần đồng đội vượt qua deadline." 
  },
  { 
    name: "Communication", 
    percentage: 65, 
    icon: faBrain, 
    description: "Truyền đạt ý tưởng kỹ thuật phức tạp một cách đơn giản, dễ hiểu cho cả designer lẫn khách hàng." 
  },
  { 
    name: "Problem Solving", 
    percentage: 95, 
    icon: faUserShield, 
    description: "Giữ cái đầu lạnh trước các sự cố production, nhanh chóng phân tích nguyên nhân gốc rễ và đưa ra giải pháp." 
  },
  { 
    name: "Adaptability", 
    percentage: 80, 
    icon: faSyncAlt, 
    description: "Sẵn sàng học hỏi công nghệ mới, thích nghi nhanh với sự thay đổi liên tục của yêu cầu hệ thống và dự án." 
  }
];

const SoftSkills: React.FC = () => {
  return (
    <section className="flex flex-col w-full bg-sky-50 text-slate-900 font-sans gap-8 pb-4 p-6 ">
      
      {/* Tiêu đề chính của Section - Không dùng dropdown, hiển thị phẳng */}
      <div className="relative max-w-xs">
        <h2 className="text-slate-900 font-black italic uppercase tracking-wider text-2xl cursor-default">
          Kỹ năng mềm
        </h2>
      </div>

      {/* Danh sách kỹ năng phẳng - Không phân chia block chồng chéo, không cần click */}
      <div className="flex flex-col gap-6">
        {softSkillData.map((skill, i) => {
          // Quy đổi phần trăm sang nhãn chữ (ví dụ: "Thành thạo", "Nâng cao"...)
          const proficiencyText = getProficiencyLabel(skill.percentage);

          return (
            <div 
              key={i} 
              className="flex flex-col gap-2 group transition-transform duration-200 hover:translate-x-1"
            >
              {/* Hàng tiêu đề: Tên + Icon + Nhãn chữ quy đổi */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* Icon vuông phong cách Game UI trắng - viền đen */}
                  <div className="w-8 h-8 bg-white border-2 border-slate-950 rounded-lg flex items-center justify-center text-slate-800 transition-colors group-hover:bg-sky-100 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <FontAwesomeIcon icon={skill.icon} className="text-sm" />
                  </div>
                  <span className="text-base font-black uppercase tracking-tight text-slate-900">
                    {skill.name}
                  </span>
                </div>

                {/* Nhãn chữ hiển thị độ hiệu quả (Không hiển thị %) */}
                <span className="text-xs font-black uppercase italic text-sky-700 bg-sky-50 border-2 border-slate-950 px-2 py-0.5 rounded-md shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  {proficiencyText}
                </span>
              </div>

              {/* Progress Bar Ngang - Tone Trắng & Xanh Dương Nhạt */}
              <div className="w-full bg-white border-2 border-slate-950 rounded-md h-4 relative overflow-hidden shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <div 
                  className="h-full bg-sky-400 border-r-2 border-slate-950 transition-all duration-1000 ease-out"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>

              {/* Phần giải thích bằng text ngay bên dưới, thoáng mắt */}
              <p className="text-sm font-bold text-slate-600 leading-relaxed pl-1">
                {skill.description}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default SoftSkills;