import {Brain, Code, Smartphone, TrendingUp, Zap } from "lucide-react";
import PingPong from "./../assets/pingpong.svg?react";

const navItems = [
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
];

const highlights = [
    {
        icon: Brain,
        title: "Problem Solver",
        description: "Love tackling complex challenges at the intersection of technology and business."
    },
    {
        icon: TrendingUp,
        title: "Finance Enthusiast",
        description: "Passionate about fintech, algorithmic trading, and the digital transformation of financial services."
    },
    {
        icon: PingPong,
        title: "Table Tennis Player",
        description: "Passionate amateur table tennis player with extensive experience competing in regional and national tournaments."

    },
    {
        icon: Zap,
        title: "Innovation Driven",
        description: "Always exploring cutting-edge technologies and their applications in real-world scenarios."
    }
];

const skillCategories = [
    {
        title: "Programming Languages",
        skills: ["Python", "Java", "Scala", "C++", "C", "Kotlin", "SQL", "VHDL"],
        color: "primary"
    },
    /*
    {
        title: "Web Technologies",
        skills: ["React", "Tailwind.css", ],
        color: "primary"
    },
    */
    {
        title: "Data Science & AI",
        skills: ["Machine Learning", "Data Science", "Pandas", "NumPy", "PyTorch", "Matplotlib", "NLP"],
        color: "secondary"
    },
    {
        title: "Finance & Fintech",
        skills: ["Financial Modeling", "Algorithmic Trading", "Risk Management", "Blockchain", "Portfolio Theory"],
        color: "success"
    },
    /*
    {
        title: "Tools & Platforms",
        skills: ["Git", "Docker", "Firebase"],
        color: "primary"
    },
    */
    /*
    {
        title: "Soft Skills",
        skills: ["Problem-Solving", "Critical Thinking", "Leadership", "Communication", "Project Management", "Team Collaboration"],
        color: "success"
    }
    */
];

const projects = [
    {
        title: "Bitcoin Midprice Prediction",
        description: "Developed a CNN-based model for predicting Bitcoin midprice trends using a depth-10 limit order book dataset spanning one month. The model classifies price movements into up, down, or stationary categories.",
        technologies: ["Python", "Bitcoin", "CNNs", "Deep Learning", "PyTorch", "Data Preprocessing"],
        category: "ML/Finance",
        icon: TrendingUp,
        status: "Research",
        githubUrl: "https://github.com/Antoine444/Bitcoin-prediction",
        liveUrl: "#"
    },
    {
        title: "YouTube Data Analysis",
        description: "Analyzed YouTube's evolution from entertainment to professional platform through data processing, statistical analysis, and visualization with pandas, matplotlib, seaborn, and scikit-learn.",
        technologies: ["Python", "Data Visualization", "SciPy", "Matplotlib", "Pandas", "Scikit-learn"],
        category: "Data Analysis",
        icon: Code,
        status: "Completed",
        githubUrl: "https://github.com/Antoine444/Youtube-analysis",
        liveUrl: "#"
    },
    {
        title: "Bachelor's Research Project",
        description: "Researched the impact of anonymization techniques on human face detection by training Faster-RCNN and YoloX models using OpenMMDetection. Evaluated performance on datasets like Crowdhuman and MOT17 with anonymized faces to assess the effects of anonymization.",
        technologies: ["Python", "Computer Vision", "OpenMMDetection", "PyTorch", "Research Report"],
        category: "Computer Vision",
        icon: Brain,
        status: "Research",
        githubUrl: "#",
        liveUrl: null
    },
    {
        title: "GoMeet",
        description: "GoMeet is an Android app developed with a team of six students. It allows users to create and join events using Google Maps API for location services. Built with Kotlin, Firebase, and Android Jetpack, following Scrum methodology.",
        technologies: ["Kotlin", "Android Jetpack", "Firebase", "GoogleMaps API", "Scrum", "UI", "Git"],
        category: "Mobile",
        icon: Smartphone,
        status: "Prototype",
        githubUrl: "https://github.com/SwEnt-Project-G18/GoMeet",
        liveUrl: null
    },
    {
        title: "QWEN-STEM-Tutor",
        description: "QWEN STEM Tutor is an innovative project offering educational support in STEM subjects. We fine-tuned Qwen3-0.6B-Base with DPO and QLoRA, enhanced by RAG on Wikipedia documents.",
        technologies: ["Python", "HuggingFace", "SFT", "RAG", "DPO", "Quantization", "NLP", "LLMs"],
        category: "NLP",
        icon: Smartphone,
        status: "Prototype",
        githubUrl: "https://github.com/Antoine444/QWEN-STEM-Tutor",
        liveUrl: null
    },
    {
        title: "Portfolio",
        description: "Developing a responsive portfolio website using React, TypeScript, and Tailwind CSS to showcase projects and skills.",
        technologies: ["React", "Tailwind CSS", "TypeScript"],
        category: "Web Development",
        icon: Smartphone,
        status: "In Progress",
        githubUrl: "#",
        liveUrl: null
    }
];

export {
    navItems,
    highlights,
    skillCategories,
    projects,
};