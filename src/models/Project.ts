export type ProjectType = "Web Application"| "Interactive Web" | "Mobile Application" | "Static Website" | "Desktop Application" | "Game" | "3D" | "Other";

interface Project {
    id: string;
    type: ProjectType; 
    title: string;
    link?: string; // Link đến dự án (nếu có)
    shortDesc: string; // Mô tả ngắn
    description: string; // Mô tả dự án (hiển thị trong overlay)
    detailedDesc: string[]; // Mô tả chi tiết (hiển thị trong modal)
    role: string; // Vai trò trong dự án
    technologies: string[]; // Công nghệ sử dụng
    gained: string[]; // Kỹ năng và kinh nghiệm thu được từ dự án
    imageCount: number; // Số lượng ảnh trong folder /UI/{projectId}/ // ảnh số 0 là ảnh bìa
}

export const projects: Project[] = [
    {
        id: "Project01",
        title: "Website Thông Tin Villa & Homestay Vũng Tàu",
        type: "Static Website",
        shortDesc: "Dự án nền tảng web tĩnh đầu tiên, bước đệm khởi đầu hành trình lập trình.",
        description: "Dự án giúp xây dựng nền tảng vững chắc về cấu trúc web, thao tác DOM và giao diện người dùng cơ bản.",
        detailedDesc: [
            "Phát triển giao diện hiển thị thông tin Villa, Homestay tại Vũng Tàu.",
            "Triển khai tính năng Đăng nhập/Đăng ký mô phỏng, lưu trữ dữ liệu người dùng cục bộ qua LocalStorage.",
            "Tối ưu hóa trải nghiệm UI và làm quen với nguyên lý thiết kế web tĩnh."
        ],
        role: "Team Leader",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        gained: [
            "Kỹ năng làm việc nhóm và phân bổ công việc hiệu quả.",
            "Sử dụng thành thạo các công cụ IDE và quản lý mã nguồn cơ bản.",
            "Nắm vững nguyên lý quản lý đường dẫn và cấu trúc thư mục dự án."
        ],
        imageCount: 2,
        link: ""
    },
    {
        id: "Project02",
        title: "VSpace - Nền Tảng E-Commerce & Bách Khoa Vũ Trụ",
        type: "Web Application",
        shortDesc: "Ứng dụng web kết hợp thương mại điện tử và trang bách khoa toàn thư.",
        description: "Xây dựng hệ thống thương mại điện tử và trang thông tin hoàn chỉnh sử dụng hệ sinh thái .NET Core MVC.",
        detailedDesc: [
            "Phát triển toàn diện các tính năng E-Commerce: Quản lý sản phẩm, Phân quyền người dùng, và Dashboard quản trị.",
            "Tích hợp API thanh toán trực tuyến an toàn qua cổng VNPay (Thẻ ATM, QR Code).",
            "Áp dụng mô hình MVC để tách biệt luồng nghiệp vụ xử lý dữ liệu và giao diện hiển thị."
        ],
        role: "Team Leader",
        technologies: ["C#", "ASP.NET MVC", "SQL Server", "VNPay API", "Bootstrap"],
        gained: [
            "Áp dụng thực tiễn kiến trúc phần mềm MVC vào dự án có quy mô.",
            "Kỹ năng xử lý ngoại lệ (Exception Handling) và fix bug trong quá trình vận hành.",
            "Làm chủ hệ sinh thái .NET của Microsoft để ứng dụng cho các dự án doanh nghiệp."
        ],
        imageCount: 4,
        link: ""
    },
    {
        id: "Project03",
        title: "Gundam Shop - Nền Tảng Bán Lẻ Mô Hình",
        type: "Web Application",
        shortDesc: "Website thương mại điện tử phát triển và vận hành trên nền tảng WordPress.",
        description: "Triển khai hệ thống bán lẻ trực tuyến với giao diện hiện đại và khả năng xử lý đơn hàng theo thời gian thực.",
        detailedDesc: [
            "Tùy biến Theme có sẵn (Customize Theme) để tối ưu hóa UI/UX phù hợp với ngành hàng.",
            "Cấu hình hệ thống SMTP gửi email tự động xác nhận đơn hàng qua Gmail API.",
            "Tích hợp module thanh toán trực tuyến qua VNPay (Checkout Theme)."
        ],
        role: "Team Leader",
        technologies: ["PHP", "MySQL", "WordPress", "VNPay Module"],
        gained: [
            "Kỹ năng vận hành, triển khai dự án trên môi trường cục bộ (XAMPP).",
            "Quản trị hệ quản trị cơ sở dữ liệu MySQL và WordPress Dashboard."
        ],
        imageCount: 0,
        link: ""
    },
    {
        id: "Project04",
        title: "SdHub - Hệ Thống Quản Trị Cơ Sở Dữ Liệu",
        type: "Web Application",
        shortDesc: "Dashboard quản trị dữ liệu quy mô lớn phục vụ hơn 2000 người dùng.",
        description: "Trực tiếp tham gia dự án thực tế, áp dụng kiến trúc hệ thống hiện đại và quy trình làm việc chuyên nghiệp.",
        detailedDesc: [
            "Thiết kế và triển khai luồng nghiệp vụ an toàn, chặt chẽ thông qua API Gateway.",
            "Phát triển các API lõi: Lọc, xử lý và truyền tải dữ liệu (Cảng, Vị trí, Người dùng) với bộ lọc tìm kiếm chính xác (word-by-word).",
            "Xử lý JSON trả về từ Backend, đồng bộ hóa và hiển thị dữ liệu trực quan trên giao diện Dashboard.",
            "Tối ưu hóa mã nguồn (Clean Code) và phân vùng thư mục rõ ràng để đảm bảo khả năng mở rộng/bảo trì."
        ],
        role: "Intern Fullstack Developer",
        technologies: ["React", ".NET", "API Gateway", "SQL Stored Procedure", "TailwindCSS"],
        gained: [
            "Nắm vững luồng giao tiếp dữ liệu hai chiều giữa Frontend và Backend.",
            "Thành thạo kiểm thử API qua Postman và RESTful Client.",
            "Tối ưu hóa truy vấn dữ liệu giúp giảm tải đường truyền và tăng tốc độ phản hồi.",
            "Nhận thức sâu sắc về tầm quan trọng của hệ thống Logging trong môi trường Production."
        ],
        imageCount: 5,
        link: ""
    },
    {
        id: "Project05",
        title: "Estenal's Interactive Portfolio",
        type: "Interactive Web", // Sửa từ Static Website thành Web tương tác cho ngầu và đúng bản chất hơn
        shortDesc: "Trang thông tin cá nhân tương tác 3D mang đậm phong cách Gamification.",
        description: "Áp dụng các công nghệ Frontend hiện đại để xây dựng không gian giới thiệu bản thân độc đáo, bứt phá khỏi các khuôn mẫu đại trà.",
        detailedDesc: [
            "Tích hợp ThreeJS để render mô hình 3D, tạo trải nghiệm thị giác mới lạ cho nhà tuyển dụng.",
            "Thiết kế UI/UX theo phong cách trò chơi (Gamification), kết hợp hiệu ứng âm thanh (Sound Effects) và chuyển động mượt mà (Framer Motion).",
            "Ứng dụng AI/LLMs trong việc hỗ trợ tối ưu hóa logic phức tạp và xử lý lỗi (Debugging).",
            "Đảm bảo hiệu suất mượt mà cho một trang web đa phương tiện (Rich Media) bằng cách quản lý state và render hợp lý."
        ],
        role: "Creator & Frontend Developer",
        technologies: ["React", "TypeScript", "ThreeJS", "Framer Motion", "TailwindCSS"],
        gained: [
            "Tích hợp, cấu hình ánh sáng/camera và tối ưu hóa hiệu suất mô hình 3D trên nền tảng Web.",
            "Nâng cao tư duy thiết kế UI/UX tập trung vào tính tương tác và cảm xúc người dùng.",
            "Kỹ năng quản lý tài nguyên (Assets) và cấu trúc thư mục quy mô vừa-lớn hiệu quả."
        ],
        imageCount: 3,
        link: ""
    },
    {
        id: "Project06",
        title: "SyncHub - Phần Mềm Quản Lý Nhà Hàng F&B",
        type: "Desktop Application",
        shortDesc: "Hệ thống quản lý F&B toàn diện phục vụ đa dạng nhu cầu nghiệp vụ.",
        description: "Xây dựng hệ thống quản lý nhà hàng từ khâu phân tích yêu cầu đến thiết kế logic, phục vụ linh hoạt từ nhân viên vận hành đến cấp quản lý.",
        detailedDesc: [
            "Triển khai cơ chế đồng bộ hóa dữ liệu liên tục giúp cập nhật giao diện realtime giữa các thiết bị trạm.",
            "Thiết kế bộ nhận diện thương hiệu (Branding) và xây dựng hệ thống UI/UX thống nhất cho ứng dụng.",
            "Xây dựng hệ thống phân quyền bảo mật, chi tiết (Permission Tree) cho từng cấp độ người dùng.",
            "Phát triển các module nghiệp vụ cốt lõi: Tính toán hóa đơn tự động, áp dụng khuyến mãi, tách/gộp bill, in bill theo Form, sơ đồ bàn trực quan và thống kê doanh thu."
        ],
        role: "Team Leader",
        technologies: [".NET Winforms", "C#", "SQL Server"],
        gained: [
            "Kỹ năng lập trình GDI+ (Tạo, vẽ Object động trên mặt phẳng tọa độ XY).",
            "Xử lý các ràng buộc toàn vẹn dữ liệu phức tạp ở tầng ứng dụng (Application Level).",
            "Cấu hình hệ thống xác thực và phân quyền mạnh mẽ bằng Identity Framework (Microsoft)."
        ],
        imageCount: 3,
        link: ""
    }
];