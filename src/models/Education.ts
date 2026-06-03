export interface Education {
  id: string;
  title: string;
  time: string;
  desc: string;
}

export const education: Education[] = [
    {
        id: "ed01",
        title: "Trường Đại Học Bà Rịa - Vũng Tàu",
        time: "2022 - 2026",
        desc: "Baria Vungtau University - Chuyên ngành Công nghệ thông tin"
    },
    {
        id: "ed02",
        title: "THPT Lê Quý Đôn (Bình Phước)",
        time: "2018 - 2022",
        desc: "THPT Lê Quý Đôn (Bình Phước)"
    },
];