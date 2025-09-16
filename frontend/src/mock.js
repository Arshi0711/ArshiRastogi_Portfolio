// Mock data for Arshi Rastogi's Portfolio Website

export const mockData = {
  // Hero Section Data
  hero: {
    name: "Arshi Rastogi",
    titles: ["Astronomer", "Data Scientist", "Career Consultant"],
    tagline: "Transforming complex data into actionable insights while guiding the next generation of astronomers and data scientists.",
    heroImage: "https://customer-assets.emergentagent.com/job_arshi-portfolio/artifacts/9hv9fvkr_IMG-20250914-WA0008.jpg"
  },

  // About Section Data
  about: {
    image: "https://customer-assets.emergentagent.com/job_arshi-portfolio/artifacts/9hv9fvkr_IMG-20250914-WA0008.jpg",
    bio: "I am a data scientist and postgraduate researcher in radio astronomy with a passion for extracting meaningful insights from complex datasets. With experience spanning from galaxy merger identification to hospitality analytics, I combine rigorous scientific methodology with practical business applications. As an astronomy career consultant, I help aspiring professionals navigate their path in STEM fields.",
    highlights: [
      "MRes in Astronomy & Astrophysics from University of Manchester",
      "3+ years experience in Python and Machine Learning",
      "Radio astronomy researcher specializing in galactic astrophysics",
      "International certified career coach",
      "Teaching experience across K-12 and university levels"
    ]
  },

  // Services Data
  services: [
    {
      id: 1,
      title: "Data Science Consulting",
      description: "End-to-end data science solutions including data preprocessing, ML model development, and visualization using Python, scikit-learn, and Power BI.",
      icon: "BarChart3",
      features: ["Machine Learning Models", "Data Visualization", "Statistical Analysis", "Python Development"]
    },
    {
      id: 2,
      title: "Astronomy Career Guidance",
      description: "Personalized career counseling for aspiring astronomers and astrophysicists, from undergraduate planning to research career development.",
      icon: "Telescope",
      features: ["Career Planning", "Research Guidance", "Academic Path Planning", "Industry Transition Support"]
    },
    {
      id: 3,
      title: "Technical Writing & Content",
      description: "SEO-optimized technical articles, educational content, and blog posts in astronomy, data science, and STEM fields.",
      icon: "PenTool",
      features: ["Technical Documentation", "SEO Content", "Blog Writing", "Educational Materials"]
    },
    {
      id: 4,
      title: "Curriculum Development",
      description: "Custom curriculum design for educational institutions and online platforms, specializing in mathematics, science, and data science programs.",
      icon: "BookOpen",
      features: ["Course Design", "Assessment Creation", "Learning Pathways", "Educational Standards"]
    },
    {
      id: 5,
      title: "Online Tutoring",
      description: "Mathematics and Science tutoring for K-12 students with application-based learning methodologies and personalized assessments.",
      icon: "GraduationCap",
      features: ["K-12 Mathematics", "Science Tutoring", "Interactive Learning", "Progress Assessment"]
    }
  ],

  // Projects Data
  projects: [
    {
      id: 1,
      title: "Galaxy Merger Identification",
      description: "Developed ML algorithms to identify merging galaxies from SDSS dataset, analyzing colour-magnitude diagrams and redshift distributions using Python.",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
      technologies: ["Python", "Pandas", "Matplotlib", "Astronomy", "SDSS"],
      category: "Astronomy Research",
      link: "#"
    },
    {
      id: 2,
      title: "Crop Production Analysis India",
      description: "End-to-end data science project analyzing crop production patterns across India using polynomial regression and predictive modeling.",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
      technologies: ["Python", "Polynomial Regression", "Data Analysis", "Agriculture"],
      category: "Data Science",
      link: "#"
    },
    {
      id: 3,
      title: "AtliQ Hospitality Analytics",
      description: "Comprehensive hospitality industry analysis using SARIMA models for predictive analytics, visualized through Power BI dashboards.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      technologies: ["SARIMA", "Power BI", "Time Series", "Hospitality"],
      category: "Data Science",
      link: "#"
    },
    {
      id: 4,
      title: "L-Band All Sky Survey (L-BASS)",
      description: "Research project developing calibration systems for radio telescope data, comparing HI signals with HI4PI survey data.",
      image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop",
      technologies: ["Radio Astronomy", "Python", "Signal Processing", "Calibration"],
      category: "Astronomy Research",
      link: "#"
    },
    {
      id: 5,
      title: "Customer Churn Prediction",
      description: "Machine learning competition project achieving high accuracy in customer churn prediction using logistic regression and feature engineering.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      technologies: ["Logistic Regression", "Feature Engineering", "Python", "Scikit-learn"],
      category: "Data Science",
      link: "#"
    },
    {
      id: 6,
      title: "Radio Polarization Analysis",
      description: "Analysis of cosmic magnetism through radio polarization data, contributing to understanding of galactic magnetic fields.",
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop",
      technologies: ["Radio Astronomy", "Polarization", "Data Analysis", "Astrophysics"],
      category: "Astronomy Research",
      link: "#"
    }
  ],

  // Testimonials Data
  testimonials: [
    {
      id: 1,
      name: "Dr. Patrick Leahy",
      role: "Supervisor, University of Manchester",
      image: "",
      content: "Arshi demonstrated exceptional analytical skills and dedication in her radio astronomy research. Her approach to calibration systems was both innovative and methodical.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      role: "Data Science Manager, Tech Corp",
      image: "",
      content: "Working with Arshi on our hospitality analytics project was outstanding. Her predictive models significantly improved our forecasting accuracy.",
      rating: 5
    },
    {
      id: 3,
      name: "Rahul Sharma",
      role: "Student, Career Consulting Client",
      image: "",
      content: "Arshi's career guidance was instrumental in my transition from physics to data science. Her insights into the industry were invaluable.",
      rating: 5
    },
    {
      id: 4,
      name: "Prof. Mousumi Das",
      role: "Associate Professor, Indian Institute of Astrophysics",
      image: "",
      content: "Arshi's work on galaxy merger identification showed remarkable scientific rigor. Her data visualization skills brought complex astronomical data to life.",
      rating: 5
    }
  ],

  // Blog Posts Data
  blogPosts: [
    {
      id: 1,
      title: "Breaking Into Data Science: A Guide for Physics Graduates",
      excerpt: "Essential steps and skills needed for physics graduates transitioning into data science careers, based on my personal journey.",
      author: "Arshi Rastogi",
      date: "2024-12-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      category: "Career Advice",
      slug: "breaking-into-data-science-physics-graduates"
    },
    {
      id: 2,
      title: "Understanding Radio Astronomy: From Galaxies to Career Opportunities",
      excerpt: "An introduction to radio astronomy research and the career paths available for aspiring radio astronomers.",
      author: "Arshi Rastogi", 
      date: "2024-12-10",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=400&fit=crop",
      category: "Astronomy",
      slug: "understanding-radio-astronomy-career-opportunities"
    },
    {
      id: 3,
      title: "Machine Learning in Astronomy: Applications and Future Prospects",
      excerpt: "Exploring how machine learning is revolutionizing astronomical research and opening new frontiers in space science.",
      author: "Arshi Rastogi",
      date: "2024-12-05",
      readTime: "10 min read", 
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=400&fit=crop",
      category: "Research",
      slug: "machine-learning-astronomy-applications-future"
    },
    {
      id: 4,
      title: "The Art of Data Visualization: Making Complex Data Accessible",
      excerpt: "Best practices for creating compelling data visualizations that tell meaningful stories with your datasets.",
      author: "Arshi Rastogi",
      date: "2024-11-28",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      category: "Data Science",
      slug: "art-of-data-visualization-accessible-insights"
    }
  ],

  // Skills & Expertise Data
  skills: {
    technical: [
      { name: "Python", level: 90 },
      { name: "Machine Learning", level: 85 },
      { name: "Data Visualization", level: 88 },
      { name: "Power BI", level: 80 },
      { name: "Statistical Analysis", level: 85 },
      { name: "LaTeX", level: 75 },
      { name: "SQL", level: 70 },
      { name: "Scikit-learn", level: 82 }
    ],
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Hindi", level: "Expert" }
    ],
    specializations: [
      "Radio Astronomy",
      "Galaxy Evolution",
      "Data Preprocessing", 
      "Predictive Analytics",
      "Academic Writing",
      "Career Counseling"
    ]
  },

  // Education Data
  education: [
    {
      degree: "MRes Astronomy and Astrophysics",
      institution: "University of Manchester",
      location: "Manchester, UK",
      period: "2022 - 2024",
      description: "Research focused on L-Band All Sky Survey calibration systems. Thesis on radio telescope calibration methods.",
      grade: "Distinction"
    },
    {
      degree: "Bachelor of Science - Physics Honours",
      institution: "Chandigarh University", 
      location: "Chandigarh, India",
      period: "2019 - 2022",
      description: "Comprehensive physics education with focus on theoretical and applied physics principles.",
      grade: "81.9% (First Division with Distinction)"
    }
  ],

  // Contact Information
  contact: {
    email: "shranviras007@gmail.com",
    phone: "+91 6393635690",
    location: "Lucknow, Uttar Pradesh, India",
    linkedIn: "https://linkedin.com/in/arshi-rastogi",
    github: "https://github.com/arshi-rastogi",
    twitter: "https://twitter.com/arshi_astro"
  }
};