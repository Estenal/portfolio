export interface Certificate {
  id: string;
  title: string;
  time: string;
  desc?: string;
  subDesc?: string;
}

const certificateData: Certificate[] = [
    {
        id: "cert01",
        title: "MOS POWER POINT",
        time: "2025",
        subDesc: "Issued by Microsoft",
    },
    {
        id: "cert02",
        title: "MOS EXCEL",
        time: "2024",
        subDesc: "Issued by Microsoft",
    },
    {
        id: "cert03",
        title: "MOS WORD",
        time: "2024",
        subDesc: "Issued by Microsoft",
    },
];

const sortCertificatesByTime = (certs: Certificate[]) => {
    return certs.sort((a, b) => {
        const yearA = parseInt(a.time);
        const yearB = parseInt(b.time);
        return yearB - yearA;
    });
};

export const certificate: Certificate[]= sortCertificatesByTime(certificateData);