export const resumeData = {
  name: "Clifford Reeve Menezes",
  title: "Master’s Student in Computer Engineering @ Virginia Tech",
  about: `I’m a Master’s student specializing in networking, security, and systems. 
  I enjoy backend engineering, cloud development, and building scalable systems.`,

  contact: {
    email: "reevemenezes@vt.edu",
    phone: "+1 (540)-824-9173",
    linkedin: "https://www.linkedin.com/in/reevemenezes",
    github: "https://github.com/thereevemenezes",
    resume: "/resume.pdf"
  },

  skills: {
    languages: ["Python", "Go", "TypeScript", "SQL", "C++", "JavaScript", "HTML", "CSS"],
    backendCloud: [
      "AWS (Lambda, S3, EC2, Rekognition, CloudWatch, IAM)",
      "Flask", "Node.js", "GraphQL", "Docker", "Kubernetes", "Terraform", "boto3", "NoSQL"
    ],
    frontend: ["React", "Redux", "TypeScript", "HTML/CSS"],
    devops: ["Linux", "Git", "CI/CD", "Postgres", "JIRA", "Spring Boot", "Matlab"],
    dataML: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "Matplotlib", "Transformers"]
  },

  education: [
    {
      degree: "M.S. Computer Engineering",
      school: "Virginia Tech",
      dates: "Aug 2024 – May 2026",
      details: ["Networking", "Network Security", "Advanced Machine Learning", "Computer Vision"]
    },
    {
      degree: "B.Tech Computer Science and Engineering",
      school: "NITK Surathkal",
      dates: "Dec 2020 – May 2024"
    }
  ],

  experience: [
    {
      role: "Graduate Assistant - IT Support",
      org: "Virginia Tech",
      dates: "Aug 2025 – Present",
      points: [
        "Configured and deployed Netgear switches (VLAN setup, port configs, firmware updates).",
        "Supported IT infrastructure setup for faculty and staff, ensuring reliable performance."
      ]
    },
    {
      role: "Software Engineer Intern",
      org: "Reliable Allies",
      dates: "May – Jul 2024",
      points: [
        "Developed scalable React/TypeScript interfaces, achieving 90% usability satisfaction.",
        "Optimized frontend-backend communication via REST APIs, reducing latency by 30%.",
        "Boosted performance 30% with GraphQL, React Query, API pagination, and caching.",
        "Built SQL + Pandas pipelines to analyze trends, boosting sales 15% and repeat purchases 10%."
      ]
    },
    {
      role: "Researcher - Reinforcement Learning",
      org: "Indian Institute of Science",
      dates: "May – Jul 2023",
      points: [
        "Designed multi-agent traffic control with Deep Q-Networks, improving flow 15%.",
        "Built SUMO traffic simulator with GPS data from 500+ vehicles.",
        "Integrated Graph Neural Networks for dynamic routing, reducing travel time 12%."
      ]
    }
  ],

  projects: [
    {
      title: "Image Label Detection API with AWS",
      dates: "Jul 2025",
      desc: "Flask REST API with AWS S3/Rekognition, CI/CD ready, 95% detection accuracy."
    },
    {
      title: "Emotion-Based Song Recommender",
      dates: "Apr – Jun 2025",
      desc: "React/Node.js app with emotion modeling and ML microservices."
    },
    {
      title: "Assistive Navigation System",
      dates: "Sep – Dec 2024",
      desc: "YOLO + BLIP + LLM + TTS pipeline for real-time guidance, 72% accuracy."
    },
    {
      title: "Two-Stage Credit Scoring",
      dates: "Jan – May 2024",
      desc: "Spark pipelines on AWS, interpretable ML model, 89.58% accuracy, IEEE MysuruCon 2024."
    }
  ]
};
