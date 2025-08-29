import {Brain, Smartphone, TrendingUp, Zap, Bitcoin } from "lucide-react";
import PingPong from "../assets/icons/pingpong.svg?react";
import YoutubeIcon from "../assets/icons/youtube.svg?react";
import ReactIcon from "../assets/icons/react.svg?react"
import ResearchIcon from "../assets/icons/research.svg?react"
import HuggingFaceIcon from "../assets/icons/huggingface.svg?react"

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
];

const projects = [
    {
        title: "Bitcoin Midprice Prediction",
        description: "Developed a CNN-based model for predicting Bitcoin midprice trends using a depth-10 limit order book dataset spanning one month. The model classifies price movements into up, down, or stationary categories.",
        technologies: ["Python", "Bitcoin", "CNNs", "Deep Learning", "PyTorch", "Data Preprocessing"],
        category: "ML/Finance",
        icon: Bitcoin,
        status: "Research",
        githubUrl: "https://github.com/Antoine444/Bitcoin-prediction",
    },
    {
        title: "YouTube Data Analysis",
        description: "Analyzed YouTube's evolution from entertainment to professional platform through data processing, statistical analysis, and visualization with pandas, matplotlib, seaborn, and scikit-learn.",
        technologies: ["Python", "Data Visualization", "SciPy", "Matplotlib", "Pandas", "Scikit-learn"],
        category: "Data Analysis",
        icon: YoutubeIcon,
        status: "Completed",
        githubUrl: "https://github.com/Antoine444/Youtube-analysis",
    },
    {
        title: "Bachelor's Research Project",
        description: "Researched the impact of anonymization techniques on human face detection by training Faster-RCNN and YoloX models using OpenMMDetection. Evaluated performance on datasets like Crowdhuman and MOT17 with anonymized faces to assess the effects of anonymization.",
        technologies: ["Python", "Computer Vision", "OpenMMDetection", "PyTorch", "Research Report"],
        category: "Computer Vision",
        icon: ResearchIcon,
        status: "Research",
        githubUrl: "#",
    },
    {
        title: "GoMeet",
        description: "GoMeet is an Android app developed with a team of six students. It allows users to create and join events using Google Maps API for location services. Built with Kotlin, Firebase, and Android Jetpack, following Scrum methodology.",
        technologies: ["Kotlin", "Android Jetpack", "Firebase", "GoogleMaps API", "Scrum", "UI", "Git"],
        category: "Mobile",
        icon: Smartphone,
        status: "Prototype",
        githubUrl: "https://github.com/SwEnt-Project-G18/GoMeet",
    },
    {
        title: "QWEN-STEM-Tutor",
        description: "QWEN STEM Tutor is an innovative project offering educational support in STEM subjects. We fine-tuned Qwen3-0.6B-Base with DPO and QLoRA, enhanced by RAG on Wikipedia documents.",
        technologies: ["Python", "HuggingFace", "SFT", "RAG", "DPO", "Quantization", "NLP", "LLMs"],
        category: "NLP",
        icon: HuggingFaceIcon,
        status: "Prototype",
        githubUrl: "https://github.com/Antoine444/QWEN-STEM-Tutor",
    },
    {
        title: "Portfolio",
        description: "Developing a responsive portfolio website using React, TypeScript, and Tailwind CSS to showcase projects and skills.",
        technologies: ["React", "Tailwind CSS", "TypeScript"],
        category: "Web Development",
        icon: ReactIcon,
        status: "In Progress",
        githubUrl: "#",
    }
];

const educations = [
    {
        degree: "Master of Science",
        field: "Computer Science & Finance",
        school: "École Polytechnique Fédérale de Lausanne (EPFL)",
        location: "Lausanne, Switzerland",
        period: "2023 - 2025",
        status: "In Progress",
        highlights: [
            "Advanced Machine Learning",
            "Quantitative Finance",
            "Software Engineering",
            "Data Science & Analytics"
        ],
        gpa: "5.8/6.0",
        description: "Specialized focus on the intersection of computer science and financial technology, with emphasis on algorithmic trading and fintech innovation."
    },
    {
        degree: "Bachelor of Science",
        field: "Computer Science",
        school: "École Polytechnique Fédérale de Lausanne (EPFL)",
        location: "Lausanne, Switzerland",
        period: "2020 - 2023",
        status: "Completed",
        highlights: [
            "Algorithms & Data Structures",
            "Software Development",
            "Mathematics & Statistics",
            "Computer Systems"
        ],
        gpa: "5.4/6.0",
        description: "Strong foundation in computer science fundamentals with additional coursework in mathematics and systems design."
    }
];

export {
    navItems,
    highlights,
    skillCategories,
    projects,
    educations,
};