export interface DesignToolProficiency {
  toolName: string;
  icon: string;
  proficiency: number; // 0-100
  description: string[];
}

export interface DesignProject {
  id: string; // dp01, dp02...
  isHero?: boolean; // Dự án nổi bật, sẽ được ưu tiên hiển thị
  title: string;
  description: string[]; // Mô tả về dự án
  toolsUsed: string[]; // List of tool names
  //projectImage auto link to public/DesignProjects/{id}.png
}

export interface DesignSkillCategories {
  name: string;
  overview: string[];
  overviewProgress: number;
  highlight: string; // châm ngôn hoặc điểm nhấn về kỹ năng thiết kế
  tools: DesignToolProficiency[];
  projects?: DesignProject[];
  endDescription: string[];
}
/*
Based Design Skill Categories: 75%
  1. Graphic Design (Photoshop - 70%, Illustrator - 80%, Figma - 50%)
  2. UI/UX Design (Figma - 50%, Adobe XD - 30%)
  3. 3D Modeling (Blender - 35%)
*/

export const DesignSkillsData: DesignSkillCategories[] = [

  {
    name: "UI/UX Design",
    overview: [
      "Tôi yêu thích việc kết hợp tư duy sản phẩm với trải nghiệm tương tác mang tính game hóa.",
      "Các giao diện tôi thiết kế thường ưu tiên cảm giác khám phá, phản hồi trực quan và chuyển động có mục đích.",
      "Mục tiêu không chỉ là hoàn thành tác vụ mà còn tạo cảm giác thú vị trong quá trình sử dụng."
    ],

    overviewProgress: 70,
    highlight: "Người dùng không nên học cách sử dụng sản phẩm — sản phẩm phải tự giải thích chính nó.",
    tools: [
      {
        toolName: "Figma",
        icon: "/UI/icons/Figma.svg",
        proficiency: 50,
        description: [
          "Thiết kế Wireframe và UI cho Website/Mobile App.",
          "Tạo Interactive Prototype cơ bản.",
          "Xây dựng UI Kit và Design System ở mức cơ bản.",
        ],
      },
      {
        toolName: "Adobe XD",
        icon: "/UI/icons/Adobe XD.svg",
        proficiency: 30,
        description: [
          "Lên ý tưởng bố cục (Layouting).",
          "Chuyển đổi các wireframe phác thảo thành bản mockup hoàn chỉnh.",
        ],
      },
    ],
    projects: [
      {
        id: "dp02",
        isHero: false,
        title: "null",
        description: [
          "",
          "",
        ],
        toolsUsed: ["Figma"],
      },
    ],
    endDescription: [
      "Tôi đang dành nhiều thời gian hơn để nghiên cứu sâu về UX Research (nghiên cứu người dùng) nhằm củng cố các quyết định thiết kế của mình.",
    ],
  },
  {
    name: "Graphic Design",
    overview: [
      "Thiết kế đồ họa là lĩnh vực tôi tự tin nhất và dành nhiều thời gian để trau dồi.",
      "Tôi có khả năng sáng tạo các ấn phẩm truyền thông, bộ nhận diện thương hiệu và các sản phẩm in ấn với tư duy thẩm mỹ hiện đại.",
    ],
    overviewProgress: 75,
    highlight: "Thiết kế không chỉ là cái nhìn bề ngoài, mà là cách nó truyền tải thông điệp và giải quyết vấn đề.",
    tools: [
      {
        toolName: "Illustrator",
        icon: "/UI/icons/Adobe Illustrator.svg",
        proficiency: 80,
        description: [
          "Thiết kế logo, bộ nhận diện thương hiệu.",
          "Vẽ minh họa vector (Vector Illustration).",
          "Thiết kế bao bì và các ấn phẩm in ấn.",
        ],
      },
      {
        toolName: "Photoshop",
        icon: "/UI/icons/Adobe Photoshop.svg",
        proficiency: 70,
        description: [
          "Chỉnh sửa, cắt ghép và retouch hình ảnh chuyên nghiệp.",
          "Thiết kế poster, banner quảng cáo kỹ thuật số.",
          "Tạo mockup trình bày sản phẩm.",
        ],
      },
      {
        toolName: "Figma",
        icon: "/UI/icons/Figma.svg",
        proficiency: 50,
        description: [
          "Thiết kế các ấn phẩm mạng xã hội (Social Media).",
          "Làm việc nhóm và chia sẻ tài nguyên thiết kế nhanh chóng.",
        ],
      },
    ],
    projects: [
      {
        id: "dp01",
        isHero: true,
        title: "Rebranding Project - Local Coffee Shop",
        description: [
          "Tái thiết kế toàn bộ hệ thống nhận diện thương hiệu cho một quán cà phê địa phương.",
          "Bao gồm: Logo, Menu, Namecard và đồng phục nhân viên.",
        ],
        toolsUsed: ["Illustrator", "Photoshop"],
      },
    ],
    endDescription: [
      "Tôi luôn liên tục cập nhật những xu hướng thiết kế đồ họa mới nhất để mang lại làn gió mới cho các dự án của mình.",
    ],
  },
  {
    name: "3D Modeling",
    overview: [
      "Bắt đầu khám phá thế giới thiết kế 3D để bổ trợ cho tư duy hình khối và không gian.",
      "Hiện tại, tôi có thể dựng các mô hình cơ bản và xử lý vật liệu (material) ở mức độ làm quen.",
    ],
    overviewProgress: 35,
    highlight: "Thêm một chiều không gian, mở ra hàng ngàn khả năng sáng tạo mới.",
    tools: [
      {
        toolName: "Blender",
        icon: "/UI/icons/Blender.svg",
        proficiency: 35,
        description: [
          "Dựng hình (Modeling) các vật thể cơ bản.",
          "Thiết lập ánh sáng (Lighting) và Render tĩnh.",
          "Khám phá low-poly art.",
        ],
      },
    ],
    projects: [
      {
        id: "dp03",
        isHero: false,
        title: "",
        description: [
          "",
          "",
        ],
        toolsUsed: ["Blender"],
      },
    ],
    endDescription: [
      "Trong tương lai, tôi dự định học thêm về Animation trong không gian 3D để tạo ra các chuyển động hấp dẫn cho các dự án Web.",
    ],
  },
];