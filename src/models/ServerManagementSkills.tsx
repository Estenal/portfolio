/*
  Server Management Skill Categories
  Focus:
  - DevOps
  - Deployment
  - Cloud Development
*/

export interface ServerToolProficiency {
  toolName: string;
  icon: string;
  proficiency: number; // 0 - 100

  description: string[];

  highlight?: string;
}

export interface ServerProject {
  id: string; // sm01, sm02...

  title: string;

  description: string[];

  toolsUsed: string[];

  infrastructureFocus?: string[];

  highlight?: string;

  // auto image:
  // public/ServerProjects/{id}.png
}

export interface ServerSkillCategories {
  name: string;

  overview: string;

  focusArea?: string;

  overviewProgress: number;

  philosophy?: string[];

  tools: ServerToolProficiency[];

  projects: ServerProject[];

  endDescription: string[];
}

/*
dagta
*/

export const ServerManagementData: ServerSkillCategories[] = [
  {
    name: "DevOps & Infrastructure",

    focusArea: "Deployment Automation & Server Architecture",

    overview:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

    overviewProgress: 0,

    philosophy: [
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ],

    tools: [
      {
        toolName: "Docker",
        icon: "/UI/icons/Docker.svg",
        proficiency: 0,

        description: [
          "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ],

        highlight:
          "lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },

      {
        toolName: "NGINX",
        icon: "/UI/icons/NGINX.svg",
        proficiency: 0,

        description: [
          "Configured reverse proxy, static hosting and routing systems.",
          "Optimized web delivery and server request handling."
        ],

        highlight:
          "Used as the primary gateway for deployment architecture."
      },

      {
        toolName: "GitHubActions",
        icon: "/UI/icons/GIT.svg",
        proficiency: 0,

        description: [
          "Automated deployment pipelines and build workflows.",
          "Integrated CI/CD for project delivery."
        ],

        highlight:
          "Reduced manual deployment process through automation."
      },

      {
        toolName: "Azure",
        icon: "/UI/icons/Azure.svg",
        proficiency: 0,

        description: [
          "Worked with cloud deployment and hosting services.",
          "Managed scalable hosting environments for web applications."
        ],

        highlight:
          "Focused on cloud-based deployment workflows."
      },

      {
        toolName: "Linux",
        icon: "/UI/icons/Linux.svg",
        proficiency: 0,

        description: [
          "Experienced with Linux server environments and CLI workflows.",
          "Handled deployment, monitoring and server-side configuration."
        ],

        highlight:
          "Comfortable working directly with production server environments."
      }
    ],

    projects: [
      {
        id: "sm01",

        title: "Portfolio Infrastructure Deployment",

        description: [
          "Built and deployed a personal interactive portfolio using containerized services and reverse proxy architecture.",
          "Optimized delivery pipeline for stable deployment and easier scalability."
        ],

        toolsUsed: [
          "Docker",
          "NGINX",
          "Linux"
        ],

        infrastructureFocus: [
          "Containerization",
          "Reverse Proxy",
          "Deployment Optimization"
        ],

        highlight:
          "Focused on maintaining immersive frontend experience while keeping infrastructure lightweight."
      },

      {
        id: "sm02",

        title: "Automated CI/CD Workflow",

        description: [
          "Implemented automated build and deployment workflows using GitHub Actions.",
          "Reduced repetitive deployment tasks and improved project delivery consistency."
        ],

        toolsUsed: [
          "GitHubActions",
          "Docker"
        ],

        infrastructureFocus: [
          "CI/CD",
          "Automation",
          "Build Pipeline"
        ],

        highlight:
          "Created smoother deployment cycles for rapid iteration."
      },

      {
        id: "sm03",

        title: "Cloud Hosted Web Services",

        description: [
          "Configured cloud-hosted environments for web applications and API services.",
          "Managed scalable hosting structure and deployment configurations."
        ],

        toolsUsed: [
          "Azure",
          "Linux",
          "NGINX"
        ],

        infrastructureFocus: [
          "Cloud Hosting",
          "Server Management",
          "Web Infrastructure"
        ],

        highlight:
          "Balanced scalability, maintainability and deployment simplicity."
      }
    ],

    endDescription: [
      "I view server management as the foundation that supports immersive digital experiences.",
      "Beyond deployment, I focus on creating stable and maintainable infrastructures that allow interactive applications to run smoothly.",
      "My goal is to bridge development, automation and infrastructure into a seamless workflow."
    ]
  }
];