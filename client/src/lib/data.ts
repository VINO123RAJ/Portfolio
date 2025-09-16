export const projects = [
  {
    id: "ai-voice-assistant",
    title: "AI Voice Assistant (JARVIS-Style)",
    description: "A Python-based voice assistant with features like face authentication, speech recognition, and task automation.",
    fullDescription: "Developed a Python-based, JARVIS-style voice assistant using a combination of web technologies (HTML, CSS, JavaScript) and Python with the Eel library. The assistant features integrated speech recognition and voice output, secure face authentication, wake-word detection, and automation capabilities for WhatsApp and system control tasks.",
    image: "/public/voice.jpeg",
    category: "AI",
    technologies: ["Python", "HTML", "CSS", "JavaScript", "Eel", "Speech Recognition"],
    features: [
      "Integrated speech recognition and voice output",
      "Secure face authentication for access",
      "Custom wake-word detection",
      "WhatsApp automation (messages, voice/video calls)",
      "Automated web search and system control"
    ],
    challenges: "Ensuring accurate speech recognition, real-time response, and smooth integration with apps & system functions.",
    outcome: "Built a scalable AI Voice Assistant that performs hands-free tasks with natural interaction and productivity boosts.",
    github: "https://github.com/VINO123RAJ/AI_Jarvis"
  },
  {
    id: "weather-app",
    title: "WeatherSphere - Real-Time Weather App",
    description: "A responsive weather application that fetches and displays live weather data from an API.",
    fullDescription: "Developed a responsive, real-time weather application using fundamental web technologies. It integrates the OpenWeatherMap API to fetch and display current weather data, featuring a user-friendly, interactive UI with a responsive layout and dynamic weather icons. The application includes robust error handling for API requests.",
    image: "/public/Weather.png",
    category: "Weather Web Application",
    technologies: ["HTML", "CSS", "JavaScript", "API Integration"],
    features: [
      "Real-time weather data display",
      "Interactive and responsive UI",
      "Live API integration (OpenWeatherMap)",
      "Dynamic weather icons based on conditions",
      "Error handling for data requests"
    ],
    challenges: "Building a scalable architecture and getting api data.",
    outcome: "Achieved 90% in getting the wether report on the places correctly",
    github: "https://github.com/VINO123RAJ/"
  },
  {
  "id": "frontend-ecommerce-platform",
  "title": "Frontend E-commerce Platform",
  "description": "Modern e-commerce frontend with responsive UI, dynamic product filtering, and AI-driven recommendations.",
  "fullDescription": "A sleek, high-performance frontend e-commerce platform designed with modern UI/UX principles. Built using Next.js and TypeScript, featuring responsive layouts, dynamic product filtering, and AI-driven product recommendations. Integrated with backend APIs for payments, inventory, and order management.",
  "image": "/public/ecommerce.jpg",
  "category": "Frontend Development",
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
  "features": [
    "Responsive and mobile-first design",
    "Dynamic product filtering & sorting",
    "AI-powered product recommendations (API integration)",
    "Smooth animations and micro-interactions",
    "Optimized client-side performance"
  ],
  "challenges": "Ensuring fast rendering and smooth state management for large product catalogs, while maintaining a responsive, visually appealing UI across devices.",
  "outcome": "Delivered a fast, scalable, and engaging e-commerce frontend with sub-second navigation, 30% higher user engagement, and seamless integration with backend APIs.",
  github: "https://github.com/VINO123RAJ/"
}

];

// Enhanced timeline data for 3D About section
export const timelineData = [
  {
    id: "senior-frontend",
    type: "work",
    title: "Frontend Developer Intern",
    company: "Finari Services Pvt Ltd",
    location: "Thiruvanmayur",
    period: "Jun 2025 - Jul 2025",
    duration: "1 Month",
    description: "Built and maintained responsive web applications using React, HTML, CSS, JavaScript, React and Node",
    detailedDescription: "Built and maintained responsive web applications using React, HTML, CSS, and JavaScript, focusing on UI design, API integration, and performance optimization.",
    achievements: [
      "Architected frontend serving 5M+ users with 99.9% uptime",
      "Implemented AI features increasing user engagement by 150%",
      "Led team of 8 engineers and reduced deployment time by 70%",
      "Established testing framework improving code coverage to 95%"
    ],
    skills: ["React", "JavaScript", "Code Integration", "Team Leadership", "Architecture", "Performance", "Testing"],
    technologies: ["React", "Next.js", "JavaScript", "css", "Bootstrap", "Topologies", "GraphQL"],
    color: {
      primary: "#3b82f6",
      secondary: "#1e40af", 
      gradient: "from-blue-500 to-blue-700"
    },
    icon: "briefcase",
    position3D: { x: 0, y: 0, z: 0 },
    floatingElements: ["React", "AI", "Leadership"],
    particleColor: "#3b82f6",
    magneticStrength: 1.2
  },
  {
    id: "frontend-developer",
    type: "work", 
    title: "Python Developer",
    company: "Techenclave",
    location: "Online",
    period: "May 2025 - Jun 2025",
    duration: "1 Month",
    description: "Learn the Fundamentals: Master the core concepts like variables, data structures (lists, dictionaries), control flow (loops, if-statements), and functions.",
    detailedDescription: "Developed the infrastructure for a backend connection, implementing component libraries. Optimized performance and established.",
    achievements: [
      "Built scalable frontend growing from 1K to 100K+ users",
      "Developed reusable component library used across 5 products",
      "Implemented performance optimizations reducing load time by 60%",
      "Established CI/CD pipeline with 99% deployment success rate"
    ],
    skills: ["Python", "DSA", "Node.js", "Javascript", "Component Design", "Testing"],
    technologies: ["Python", "Database", "Node.js", "Mysql", "", "MongoDB", "AWS"],
    color: {
      primary: "#10b981",
      secondary: "#047857",
      gradient: "from-green-500 to-green-700"
    },
    icon: "code",
    position3D: { x: -300, y: 200, z: -50 },
    floatingElements: ["React", "Performance", "DevOps"],
    particleColor: "#10b981",
    magneticStrength: 1.0
  }
  // {
  //   id: "masters-degree",
  //   type: "education",
  //   title: "Master of Science, Computer Science",
  //   company: "Stanford University", 
  //   location: "Stanford, CA",
  //   period: "2017 - 2019",
  //   duration: "2 years",
  //   description: "Focus on AI and Human-Computer Interaction",
  //   detailedDescription: "Advanced coursework in artificial intelligence, machine learning, and human-computer interaction. Conducted research on AI-powered user interfaces and published papers on adaptive design systems.",
  //   achievements: [
  //     "Published 3 papers on AI-powered user interfaces",
  //     "Led research project on adaptive design systems",
  //     "Graduated Summa Cum Laude with 3.9 GPA",
  //     "Received Outstanding Student Researcher Award"
  //   ],
  //   skills: ["AI/ML", "Research", "HCI", "Python", "Academic Writing", "Data Science"],
  //   technologies: ["Python", "TensorFlow", "PyTorch", "R", "MATLAB", "Unity", "React"],
  //   color: {
  //     primary: "#8b5cf6",
  //     secondary: "#7c3aed",
  //     gradient: "from-purple-500 to-purple-700"
  //   },
  //   icon: "graduation-cap",
  //   position3D: { x: 300, y: -150, z: -25 },
  //   floatingElements: ["AI/ML", "Research", "HCI"],
  //   particleColor: "#8b5cf6",
  //   magneticStrength: 0.8
  // },
  // {
  //   id: "junior-developer",
  //   type: "work",
  //   title: "Junior Frontend Developer",
  //   company: "WebSolutions Co.",
  //   location: "Seattle, WA", 
  //   period: "2016 - 2017",
  //   duration: "1 year",
  //   description: "First professional role building responsive web applications",
  //   detailedDescription: "Started my professional journey building responsive web applications with modern JavaScript frameworks. Focused on learning best practices, clean code principles, and collaborative development workflows.",
  //   achievements: [
  //     "Delivered 15+ client projects with 100% satisfaction rate",
  //     "Improved site performance by 40% through optimization techniques",
  //     "Contributed to open-source projects gaining 500+ stars",
  //     "Completed advanced training in React and modern JS"
  //   ],
  //   skills: ["JavaScript", "HTML/CSS", "Responsive Design", "jQuery", "Bootstrap"],
  //   technologies: ["JavaScript", "jQuery", "Bootstrap", "Sass", "Gulp", "Git"],
  //   color: {
  //     primary: "#f59e0b",
  //     secondary: "#d97706",
  //     gradient: "from-amber-500 to-amber-700"
  //   },
  //   icon: "code",
  //   position3D: { x: -150, y: -300, z: -75 },
  //   floatingElements: ["JavaScript", "Responsive", "Web"],
  //   particleColor: "#f59e0b",
  //   magneticStrength: 0.6
  // },
  // {
  //   id: "bachelors-degree",
  //   type: "education",
  //   title: "Bachelor of Science, Computer Science",
  //   company: "University of Washington",
  //   location: "Seattle, WA",
  //   period: "2012 - 2016", 
  //   duration: "4 years",
  //   description: "Foundation in computer science with focus on software engineering",
  //   detailedDescription: "Comprehensive computer science education covering algorithms, data structures, software engineering, and web development. Participated in hackathons and coding competitions while maintaining academic excellence.",
  //   achievements: [
  //     "Graduated Magna Cum Laude with 3.8 GPA",
  //     "Won 3 hackathon competitions for innovative web applications",
  //     "Teaching Assistant for Web Development courses",
  //     "President of Computer Science Student Association"
  //   ],
  //   skills: ["Algorithms", "Data Structures", "Software Engineering", "Web Development", "Teaching"],
  //   technologies: ["Java", "C++", "Python", "JavaScript", "HTML/CSS", "MySQL"],
  //   color: {
  //     primary: "#ef4444",
  //     secondary: "#dc2626",
  //     gradient: "from-red-500 to-red-700"
  //   },
  //   icon: "graduation-cap",
  //   position3D: { x: 150, y: 250, z: -100 },
  //   floatingElements: ["Algorithms", "Software", "Teaching"],
  //   particleColor: "#ef4444", 
  //   magneticStrength: 0.7
  // }
];

// Floating skill badges data
export const skillBadges = [
  { id: "react", name: "React", category: "frontend", level: "expert", color: "#61dafb", size: "large" },
  { id: "typescript", name: "JavaScript", category: "language", level: "expert", color: "#3178c6", size: "large" },
  { id: "nextjs", name: "Next.js", category: "framework", level: "expert", color: "#000000", size: "medium" },
  { id: "ai", name: "AI", category: "specialty", level: "advanced", color: "#ff6b6b", size: "large" },
  { id: "node", name: "Node.js", category: "backend", level: "advanced", color: "#339933", size: "medium" },
  { id: "aws", name: "AWS", category: "cloud", level: "advanced", color: "#ff9900", size: "medium" },
  { id: "leadership", name: "Leadership", category: "soft", level: "expert", color: "#8b5cf6", size: "large" },
  { id: "architecture", name: "Architecture", category: "specialty", level: "expert", color: "#3b82f6", size: "large" },
  { id: "performance", name: "Performance", category: "specialty", level: "expert", color: "#10b981", size: "medium" },
  { id: "testing", name: "Testing", category: "process", level: "advanced", color: "#f59e0b", size: "small" },
  { id: "devops", name: "Database", category: "process", level: "intermediate", color: "#06b6d4", size: "small" },
  { id: "graphql", name: "Analysis", category: "api", level: "advanced", color: "#e10098", size: "small" }
  // { name: "Prisma", color: "bg-purple-600/10 text-purple-700 dark:text-purple-300" },
  // { name: "Supabase", color: "bg-cyan-600/10 text-cyan-700 dark:text-cyan-300" },
  // { name: "Vue.js", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
];

// Parallax background layers configuration
export const parallaxLayers = [
  {
    id: "background",
    depth: 0.1,
    elements: [
      { type: "gradient", colors: ["#1e1b4b", "#312e81", "#1e40af"], opacity: 0.3 }
    ]
  },
  {
    id: "far", 
    depth: 0.3,
    elements: [
      { type: "particles", count: 50, size: 1, color: "#3b82f6", opacity: 0.2 },
      { type: "mesh", pattern: "dots", spacing: 100, color: "#1e40af", opacity: 0.1 }
    ]
  },
  {
    id: "middle",
    depth: 0.6, 
    elements: [
      { type: "geometric", shapes: ["triangle", "circle", "square"], count: 8, color: "#8b5cf6", opacity: 0.15 },
      { type: "lines", count: 12, color: "#10b981", opacity: 0.1 }
    ]
  },
  {
    id: "near",
    depth: 0.9,
    elements: [
      { type: "floating", objects: ["code", "brain", "gear"], count: 6, color: "#f59e0b", opacity: 0.2 }
    ]
  }
];

// Morphing pattern configurations
export const morphingPatterns = [
  {
    id: "neural-network",
    scrollRange: [0, 0.25],
    shapes: [
      { type: "circle", count: 20, connections: true, animation: "pulse" },
      { type: "line", count: 40, animation: "flow" }
    ]
  },
  {
    id: "code-matrix", 
    scrollRange: [0.25, 0.5],
    shapes: [
      { type: "rectangle", count: 15, pattern: "grid", animation: "typewriter" },
      { type: "text", content: "01010", animation: "matrix" }
    ]
  },
  {
    id: "geometric-web",
    scrollRange: [0.5, 0.75], 
    shapes: [
      { type: "polygon", sides: [3,4,6,8], count: 12, animation: "rotate" },
      { type: "bezier", count: 8, animation: "morph" }
    ]
  },
  {
    id: "particle-flow",
    scrollRange: [0.75, 1],
    shapes: [
      { type: "particle", count: 100, animation: "flow" },
      { type: "wave", count: 5, animation: "sine" }
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "VP of Engineering, TechCorp",
    initials: "SM",
    gradient: "#3b82f6, #8b5cf6",
    content: "Alex is an exceptional frontend engineer who combines technical excellence with creative problem-solving. His work on our AI-powered dashboard exceeded all expectations and delivered significant business value. His ability to translate complex requirements into elegant user experiences is remarkable."
  },
  {
    id: 2,
    name: "David Johnson",
    role: "CTO, StartupXYZ",
    initials: "DJ",
    gradient: "#10b981, #06b6d4",
    content: "Working with Alex was a game-changer for our startup. He architected our entire frontend from scratch and built a scalable foundation that grew with us from 1,000 to 100,000+ users. His expertise in performance optimization and modern React patterns is top-notch."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Senior Developer, InnovateTech",
    initials: "ER",
    gradient: "#8b5cf6, #ec4899",
    content: "Alex's mentorship and technical leadership transformed our frontend team. His code reviews were educational, his architecture decisions were sound, and his ability to solve complex problems with elegant solutions inspired everyone around him. A true senior engineer."
  }
];
