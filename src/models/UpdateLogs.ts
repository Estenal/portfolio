export interface UpdateLog {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  features?: string[];
  fixes?: string[];
}

export interface ExternalService {
  id: string;
  name: string;
  description: string;
  url: string;
  iconType: 'github' | 'globe' | 'document' | 'default';
}

export const updateLogsData: UpdateLog[] = [
  {
    id: "log-7",
    version: "v1.1.3",
    date: "07/06/2026",
    title: "Tối ưu hóa Model 3D và UI",
    description: "Giảm kích thước model máy bay, giảm thời gian load",
    features: [
      "Giảm 90% kích thước file model máy bay, giảm thời gian load và cải thiện hiệu suất",
      "Sửa lỗi và nâng cấp giao diện"
    ],
  },
  {
    id: "log-6",
    version: "v1.1.2",
    date: "07/06/2026",
    title: "Cập nhật và tối ưu giao diện trên Portrait",
    description: "Cải thiện trải nghiệm người dùng trên thiết bị di động",
    features: [
      "Hạn chế một vài tính năng tại Portrait UI",
      "Thêm giao diện đặc thù cho portrait, tối ưu trải nghiệm người dùng trên thiết bị di động",
      "Thêm Simple Mode cho người dùng có thiết bị không phù hợp"
    ],
  },
  {
    id: "log-5",
    version: "v1.1.1",
    date: "01/06/2026",
    title: "Deploy Phiên bản Portfolio đầu tiên trên Vercel",
    description: "Khởi tạo hệ thống Portfolio, mang đến trải nghiệm khám phá tương tác 3D độc đáo.",
    features: [
      "Content cho DevelopmentSkill và các kỹ năng Liên quan",
      "Âm thanh UI & hiệu ứng chuyến bay",
      "Cập nhật hình ảnh và slide cho Projects và Skills Section"
    ],
  },
  {
    id: "log-5",
    version: "beta - v0.3.1",
    date: "3/05/2026",
    title: "Thay đổi thiết kế sang GameChunky Style",
    description: "",
    features: [
      "Tập trung vào tăng cường vào UX thay vì thuần UI Công nghiệp",
      "Thêm hiệu ứng, sức nặng và động năng của giao diện",
      "Thêm sound effect cho tương tác của người dùng",
      "Thiết kế OOP cho nội dung thay vì nhét toàn bộ vào logic components",
      "Thêm máy bay và logic bay"
    ],
    fixes: [
      "Sửa lỗi giao diện phụ thuộc AI nhìn quá CÔNG NGHIỆP",
      "Sửa lỗi model lệch tâm và mất cân bằng thị giác"
    ]
  },
  {
    id: "log-4",
    version: "beta - v0.2.1",
    date: "1/05/2026",
    title: "Phát triển theo ý tưởng Rạp Xiếc",
    description: "",
    features: [
      "Tạo một web intro Dạng Idle Game Dẫn dắt nội dung theo Progress khi Scroll",
      "Dập bỏ toàn bộ logic scroll step cũ",
      "Thêm Curtain Theatre Model và animation open/close cho intro WEB"
    ],
    fixes: [
      "Sửa lỗi giao diện phụ thuộc AI nhìn quá CÔNG NGHIỆP"
    ]
  },
  {
    id: "log-3",
    version: "",
    date: "01/06/2025",
    title: "Giai đoạn ngừng phát triển",
    description: "Vấn đề cá nhân và mất phương hướng",
    features: [
      "Không có gì mới được phát triển trong giai đoạn này",
    ]
  },
  {
    id: "log-2",
    version: "beta - v0.1.2",
    date: "25/05/2025",
    title: "Thiết kế Theo Phong Cách DarkFantasy",
    description: "",
    features: [
      "Hoàn thiện model Kiếm, Vương Miện và ngai vàng",
      "Thiết lập scroll mượt mà",
      "Bắt đầu tạo các khối nội dung cho từng page"
    ]
  },
  {
    id: "log-1",
    version: "beta - v0.1.1",
    date: "23/05/2025",
    title: "Lên ý tưởng Portfolio Cá Nhân",
    description: "",
    features: [
      "Ý tưởng ban đầu, ThreeJs -> GSAP chuyển động theo Scroll (Scroll Driven)",
      "Cài đặt các thư viện cần thiết",
      "Bắt đầu tìm kiếm model phù hợp"
    ]
  }

];

export const externalServicesData: ExternalService[] = [
  {
    id: "srv-1",
    name: "Github Repository",
    description: "Truy cập mã nguồn mở và theo dõi các đóng góp dự án.",
    url: "https://github.com/Estenal/portfolio",
    iconType: "github"
  },
  {
    id: "srv-2",
    name: "Tài liệu hệ thống (Docs)",
    description: "Đọc tài liệu thiết kế kiến trúc và hướng dẫn API chi tiết.",
    url: "https://github.com/Estenal/portfolio/wiki",
    iconType: "document"
  },
  {
    id: "srv-3",
    name: "Estenal's Management Center",
    description: "Tham quan các trang web và ứng dụng đã triển khai.",
    url: "Đang phát triển...",
    iconType: "globe"
  }
];
