
export const siteConfig = {
  // Basic Site Information
  site: {
    title: "Marvell - Portfolio",
    description: "Full Stack Developer & UI/UX Designer - Creating amazing digital experiences",
    author: "Marvell",
    url: "https://lovable.dev",
    ogImage: "https://lovable.dev/opengraph-image-p98pqg.png"
  },

  // Social Media
  social: {
    twitter: "@johndoe_dev",
    github: "#",
    linkedin: "#",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY"
  },

  // Hero Section
  hero: {
    name: "John Doe",
    titles: [
      "Full Stack Developer",
      "UI/UX Designer", 
      "Creative Thinker",
      "Problem Solver"
    ],
    description: "Passionate about creating amazing digital experiences through clean code and innovative design. Let's build something incredible together.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    buttons: {
      downloadCV: "Download CV",
      viewWork: "View My Work"
    }
  },

  // About Section
  about: {
    title: "About Me",
    description: "I'm a passionate developer with 5+ years of experience creating digital solutions that make a difference. I love turning complex problems into simple, beautiful designs.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    skillsTitle: "My Skills",
    skills: [
      {
        name: "Frontend Development",
        percentage: 95,
        color: "from-blue-500 to-cyan-500"
      },
      {
        name: "Backend Development", 
        percentage: 88,
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "UI/UX Design",
        percentage: 92,
        color: "from-purple-500 to-pink-500"
      },
      {
        name: "Mobile Development",
        percentage: 85,
        color: "from-orange-500 to-red-500"
      }
    ],
    features: [
      {
        title: "Clean Code",
        description: "Writing maintainable, scalable, and efficient code following best practices."
      },
      {
        title: "Creative Design", 
        description: "Crafting beautiful and intuitive user interfaces with attention to detail."
      },
      {
        title: "Performance",
        description: "Optimizing applications for speed, SEO, and exceptional user experience."
      },
      {
        title: "Collaboration",
        description: "Working effectively in teams and communicating ideas clearly."
      }
    ]
  },

  // Background/Experience Section
  background: {
    title: "Riwayat & Latar Belakang",
    subtitle: "Perjalanan Profesional Saya",
    experiences: [
      {
        year: "2023 - Present",
        title: "Senior Full Stack Developer",
        company: "Tech Innovation Co.",
        description: "Leading development of enterprise-scale web applications using modern technologies. Mentoring junior developers and architecting scalable solutions.",
        technologies: ["React", "Node.js", "AWS", "Docker"]
      },
      {
        year: "2021 - 2023", 
        title: "Frontend Developer",
        company: "Digital Agency Pro",
        description: "Developed responsive web applications and collaborated with design teams to create exceptional user experiences.",
        technologies: ["Vue.js", "TypeScript", "Tailwind CSS"]
      },
      {
        year: "2019 - 2021",
        title: "UI/UX Designer",
        company: "Creative Studio",
        description: "Designed user interfaces for mobile and web applications, conducted user research and created design systems.",
        technologies: ["Figma", "Adobe XD", "Sketch"]
      },
      {
        year: "2018 - 2019",
        title: "Junior Developer", 
        company: "StartUp Tech",
        description: "Started my journey in web development, learning fundamentals and contributing to various projects.",
        technologies: ["HTML", "CSS", "JavaScript"]
      }
    ]
  },

  // Portfolio Section
  portfolio: {
    title: "My Portfolio",
    description: "A collection of projects that showcase my skills and passion for creating exceptional digital experiences.",
    categories: [
      { id: "all", name: "All Projects" },
      { id: "web", name: "Web Development" },
      { id: "mobile", name: "Mobile Apps" },
      { id: "design", name: "Design" }
    ],
    projects: [
      {
        id: 1,
        title: "E-Commerce Platform",
        category: "web",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        description: "Modern e-commerce platform built with React and Node.js",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "#",
        demo: "#"
      },
      {
        id: 2,
        title: "Mobile Banking App",
        category: "mobile", 
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
        description: "Secure mobile banking application with biometric authentication",
        tech: ["React Native", "Firebase", "Redux"],
        github: "#",
        demo: "#"
      },
      {
        id: 3,
        title: "Design System",
        category: "design",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop", 
        description: "Comprehensive design system for enterprise applications",
        tech: ["Figma", "Storybook", "CSS"],
        github: "#",
        demo: "#"
      },
      {
        id: 4,
        title: "AI Dashboard",
        category: "web",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        description: "Analytics dashboard with AI-powered insights", 
        tech: ["Vue.js", "Python", "TensorFlow"],
        github: "#",
        demo: "#"
      },
      {
        id: 5,
        title: "Food Delivery App",
        category: "mobile",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
        description: "Real-time food delivery tracking application",
        tech: ["Flutter", "Firebase", "Google Maps"],
        github: "#", 
        demo: "#"
      },
      {
        id: 6,
        title: "Brand Identity",
        category: "design",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
        description: "Complete brand identity design for tech startup",
        tech: ["Illustrator", "Photoshop", "InDesign"],
        github: "#",
        demo: "#"
      }
    ]
  },

  // Contact Section
  contact: {
    title: "Get In Touch",
    description: "Have a project in mind? Let's collaborate and create something amazing together. I'm always excited to work on new challenges.",
    subtitle: "Let's Connect",
    availabilityText: "Available for new projects",
    ctaTitle: "Ready to Start a Project?",
    ctaDescription: "Let's discuss your ideas and bring them to life with cutting-edge technology and creative design.",
    form: {
      placeholders: {
        name: "Your Name",
        email: "Your Email", 
        message: "Your Message"
      },
      buttons: {
        sending: "Sending...",
        sent: "Message Sent!",
        send: "Send Message"
      }
    }
  },

  // Navigation
  navigation: {
    brand: "Marvell",
    menuItems: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Background", href: "#background" },
      { name: "Portfolio", href: "#portfolio" },
      { name: "Contact", href: "#contact" }
    ]
  },

  // Footer
  footer: {
    copyright: "© 2024 Marvell. All rights reserved.",
    description: "Building amazing digital experiences with passion and precision."
  },

  // Colors & Theme
  theme: {
    colors: {
      primary: {
        blue: "rgb(59, 130, 246)",
        purple: "rgb(139, 92, 246)", 
        pink: "rgb(236, 72, 153)",
        cyan: "rgb(6, 182, 212)"
      },
      gradients: {
        primary: "from-blue-500 to-purple-600",
        secondary: "from-purple-500 to-pink-500",
        accent: "from-blue-400 to-cyan-500",
        background: "from-slate-900 via-purple-900 to-slate-900"
      }
    }
  },

  // Digital Clock
  digitalClock: {
    days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    showDayInterval: 20000, // 20 seconds
    showDayDuration: 5000   // 5 seconds
  },

  // Animation Settings
  animations: {
    typewriter: {
      speed: 100, // milliseconds
      pauseDuration: 2000 // milliseconds
    },
    parallax: {
      speed: 0.1
    },
    shine: {
      duration: 3000 // milliseconds
    }
  }
};

export default siteConfig;
