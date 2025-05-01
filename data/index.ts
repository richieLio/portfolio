export const navItems = [
  { name: "Home", link: "#" },
  { name: "Work", link: "#work" },
  { name: "Experience", link: "#experience" },
  { name: "Skills", link: "#skills" },
  { name: "Publications", link: "#publications" },
  { name: "Certifications", link: "#certifications" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I am a passionate backend developer with expertise in .NET Core, C#, SQL Server, and Entity Framework.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Education: FPT University (2021-2025)",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "Backend, Frontend, Database, DevOps, AI & Machine Learning",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Software Engineer with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title: "Publication experience with two papers in international conferences on AI and Computer Science.",
    description: "Research Contributions",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center text-center md:max-w-full max-w-60",
    img: "",
    spareImg: "",
  },
];


export const projects = [
  {
    id: 1,
    title: "Room Management System (WPF)",
    des: "Built a desktop application for managing room reservations using WPF and .NET. Designed with MVVM architecture for better maintainability. Integrated SQL Server for room data storage and efficient querying. Implemented real-time notifications for booking status updates.",
    img: "/rms.jpg",
    iconLists: ["/csharp.svg", "/firebase.svg", "/xaml.svg", "/sql.svg"],
  },
  {
    id: 2,
    title: "Sports Schedule Booking Web Application",
    des: "Developed a web platform for booking sports fields using Next.js (TypeScript) and .NET backend. Implemented real-time updates with SignalR for instant booking confirmations. Optimized database queries with MySQL, ensuring fast performance. Deployed via Docker, Nginx with CI/CD. Added websocket for real-time chat functionality.",
    img: "/ssb.png",
    iconLists: ["/next.svg", "/tail.svg", "/typescript.svg", "/csharp.svg", "/netlify.svg"],
  },
  {
    id: 3,
    title: "Mai Assistant – AI Chatbot with RAG",
    des: "An AI chatbot for customer support leveraging Retrieval-Augmented Generation (RAG) for accurate responses. Built with Python, FastAPI, MongoDB, SentenceTransformer, PhoBERT, and spaCy. Features include contextual search, real-time answers, and content moderation, resulting in faster support and improved user experience.",
    img: "/mai.png",
    iconLists: ["/python.svg", "/fastapi.svg", "/mongodb.svg", "/sentence.svg", "/phobert.svg", "/spacy.svg"],
  },
  {
    id: 4,
    title: "Modern Web Development Portfolio",
    des: "A modern personal portfolio showcasing skills and projects using Next.js, React, and Tailwind CSS. Features include responsive design, interactive 3D elements, and smooth animations for enhanced user experience.",
    img: "/pflo.png",
    iconLists: ["/react.svg", "/typescript.svg", "/javascript.svg", "/html5.svg", "/css3.svg"],
  },
];

// Publications section
export const publications = [
  {
    id: 1,
    title: "Robust Student Attendance Checking System Using Efficient LBP-based Ensemble Learning Approaches",
    authors: "Le Huy Hoang, et al.",
    venue: "International Conference on Intelligent Information Technology (ICIIT)",
    year: 2025,
    available: "ACM Publications",
    link: "#",
  },
  {
    id: 2,
    title: "Robust Adaptive Masked Face Recognition Using Mediapipe and Advanced ResNet50 with Multi-Layer Feature Fusion",
    authors: "Le Huy Hoang, et al.",
    venue: "International Conference on Computational Science and Its Applications",
    year: 2025,
    available: "Springer",
    link: "#",
  },
];

// Certifications section
export const certifications = [
  {
    id: 1,
    title: "Software Development Lifecycle",
    issuer: "Coursera",
    year: "2023",
    link: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~GLW32B4SM4EW/CERTIFICATE_LANDING_PAGE~GLW32B4SM4EW.jpeg",
    image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~GLW32B4SM4EW/CERTIFICATE_LANDING_PAGE~GLW32B4SM4EW.jpeg"
  },
  {
    id: 2,
    title: "Project Management Principles and Practices",
    issuer: "Coursera",
    year: "2023",
    link: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~CDMVDYSSUKKV/CERTIFICATE_LANDING_PAGE~CDMVDYSSUKKV.jpeg",
    image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~CDMVDYSSUKKV/CERTIFICATE_LANDING_PAGE~CDMVDYSSUKKV.jpeg"
  },
  {
    id: 3,
    title: "User Experience Research and Design",
    issuer: "Coursera",
    year: "2023",
    link: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~UWKC7BN68Q31/CERTIFICATE_LANDING_PAGE~UWKC7BN68Q31.jpeg",
    image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~UWKC7BN68Q31/CERTIFICATE_LANDING_PAGE~UWKC7BN68Q31.jpeg"
  },
];

export const testimonials = [
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "FPT Software",
    duration: "2024",
    desc: "Interned at FPT Software, Ho Chi Minh City (2024), where I developed and maintained .NET-based applications, focusing on backend API development. Assisted in frontend development using React.js and worked with MySQL for database management.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
    skills: [".NET Core", "React.js", "MySQL", "RESTful APIs"],
    link: "#projects"
  },
  {
    id: 2,
    title: "Freelance Web Development",
    company: "Self-employed",
    duration: "2023 - 2024",
    desc: "Led the development of web applications for clients, from initial concept to deployment on live servers using modern web technologies. Implemented responsive designs and optimized performance for enhanced user experience.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
    skills: ["Next.js", "Tailwind CSS", "TypeScript", "Docker"],
    link: "#"
  },
  // {
  //   id: 4,
  //   title: "Lead Frontend Developer",
  //   desc: "Developed and maintained user-facing features using modern frontend technologies.",
  //   className: "md:col-span-2",
  //   thumbnail: "/exp4.svg",
  // },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/richieLio"
  },
  {
    id: 2,
    img: "/fb.svg",
    link: "https://www.facebook.com/abcde12233444/"
  },
  {
    id: 3,
    img: "/tele.svg",
    link: "https://t.me/hoanglh203"
  },
];

// Skills section
export const technicalSkills = [
  {
    id: 1,
    category: "Backend",
    skills: ".NET (ASP.NET Core, Entity Framework, LINQ), RESTful APIs, SignalR, WPF",
    icon: "/csharp.svg"
  },
  {
    id: 2,
    category: "Frontend",
    skills: "React.js, Next.js (TypeScript), Tailwind CSS, Ant Design",
    icon: "/next.svg"
  },
  {
    id: 3,
    category: "Database",
    skills: "MySQL, SQL Server, Firebase(Firestore), MongoDB",
    icon: "/sql.svg"
  },
  {
    id: 4,
    category: "DevOps",
    skills: "Docker, Nginx, CI/CD (GitHub Actions), Basic knowledge of Microsoft Azure (App Services, VMs)",
    icon: "/dock.svg"
  },
  {
    id: 5,
    category: "Version Control",
    skills: "Git, GitHub (Git Flow)",
    icon: "/git.svg"
  },
  {
    id: 6,
    category: "System Administration",
    skills: "Window Server, Linux(Ubuntu)",
    icon: "/cloud.svg"
  },
  {
    id: 7,
    category: "AI & Machine Learning",
    skills: "Python, OpenCV, TensorFlow, Scikit-learn, Flask/FastAPI",
    icon: "/ai.png" 
  },
  {
    id: 8,
    category: "System Architecture & Design",
    skills: "Microservices, MVC, Monoservices",
    icon: "/app.svg"
  }
];

export const softSkills = [
  {
    id: 1,
    category: "Development Methodologies",
    skills: "Agile, Scrum",
    icon: "/three.svg"
  },
  {
    id: 2,
    category: "Project Management Tools",
    skills: "Jira, Trello",
    icon: "/stream.svg"
  },
  {
    id: 3,
    category: "Collaboration & Communication",
    skills: "Code review, Cross-functional teamwork",
    icon: "/host.svg"
  },
  {
    id: 4,
    category: "Problem-Solving & Optimization",
    skills: "Performance tuning, Debugging, Refactoring",
    icon: "/arrow.svg"
  }
];
