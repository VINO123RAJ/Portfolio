export const projects = [
  {
    id: "ai-dashboard",
    title: "AI Analytics Dashboard",
    description: "Real-time analytics platform with AI-powered insights and predictive modeling capabilities.",
    fullDescription: "A comprehensive analytics platform that leverages machine learning to provide real-time insights and predictive modeling capabilities for business intelligence. Built with modern React architecture and integrated with TensorFlow.js for client-side ML processing.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "AI/ML",
    technologies: ["React", "Next.js", "TypeScript", "TensorFlow.js", "D3.js", "Node.js", "PostgreSQL"],
    features: [
      "Real-time data visualization with interactive charts",
      "Machine learning-powered predictive analytics",
      "Custom AI model integration for business insights",
      "Responsive design with mobile-first approach",
      "Advanced filtering and data export capabilities"
    ],
    challenges: "The main challenge was integrating complex ML models with real-time data visualization while maintaining excellent performance and user experience. We solved this by implementing efficient data streaming and client-side model optimization.",
    outcome: "Increased user engagement by 150% and reduced data analysis time by 70% for business analysts. The platform now serves over 50,000 daily active users with 99.9% uptime."
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with advanced product filtering and AI-powered recommendations.",
    fullDescription: "A modern, full-stack e-commerce solution featuring advanced product filtering, AI-powered recommendations, and seamless payment integration. Built with Next.js and integrated with Stripe for secure payments.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "E-commerce",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "Redis", "AWS"],
    features: [
      "AI-powered product recommendations",
      "Advanced search and filtering system",
      "Secure payment processing with Stripe",
      "Inventory management dashboard",
      "Multi-vendor marketplace support"
    ],
    challenges: "Building a scalable architecture that could handle high traffic loads while maintaining fast page load times and ensuring secure payment processing. We implemented efficient caching strategies and optimized database queries.",
    outcome: "Achieved 99.9% uptime with average page load times under 2 seconds, resulting in 40% increase in conversion rates and processing over $2M in transactions monthly."
  },
  {
    id: "collaboration-platform",
    title: "Team Collaboration Platform",
    description: "Real-time collaboration platform with video calling, file sharing, and project management features.",
    fullDescription: "A comprehensive real-time collaboration platform featuring HD video calling, file sharing, project management, and team communication tools. Built with React and WebRTC for seamless real-time interactions.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "SaaS",
    technologies: ["React", "WebRTC", "Socket.io", "Node.js", "MongoDB", "AWS S3", "Docker"],
    features: [
      "HD video calling with screen sharing",
      "Real-time collaborative document editing",
      "Project management with Kanban boards",
      "File sharing with version control",
      "Team chat with emoji reactions"
    ],
    challenges: "Implementing real-time synchronization across multiple users while ensuring data consistency and handling network interruptions gracefully. We built a robust conflict resolution system and implemented automatic reconnection.",
    outcome: "Successfully deployed to 10,000+ users across 500+ organizations with 99.5% uptime and average latency under 100ms for real-time features. Increased team productivity by 35% based on user surveys."
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
