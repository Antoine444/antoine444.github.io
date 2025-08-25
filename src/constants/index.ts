import {Brain, Code, Smartphone, TrendingUp, Zap} from "lucide-react";
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
        skills: ["Problem Solving", "Critical Thinking", "Leadership", "Communication", "Project Management", "Team Collaboration"],
        color: "success"
    }
    */
];

const projects = [
    {
        title: "FinTrack Analytics",
        description: "A comprehensive financial analytics platform built with React and Python. Features real-time market data visualization, portfolio tracking, and risk assessment tools.",
        technologies: ["React", "Python", "FastAPI", "PostgreSQL", "Chart.js"],
        category: "Finance",
        icon: TrendingUp,
        status: "In Progress",
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        title: "Algorithm Visualizer",
        description: "Interactive web application for visualizing sorting and graph algorithms. Helps students understand complex computer science concepts through dynamic animations.",
        technologies: ["TypeScript", "D3.js", "React", "Tailwind CSS"],
        category: "Education",
        icon: Code,
        status: "Completed",
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        title: "ML Trading Bot",
        description: "Machine learning-powered trading algorithm that analyzes market patterns and executes trades. Implements various ML models for price prediction and sentiment analysis.",
        technologies: ["Python", "TensorFlow", "Pandas", "Alpha Vantage API"],
        category: "AI/Finance",
        icon: Brain,
        status: "Research",
        githubUrl: "#",
        liveUrl: null
    },
    {
        title: "Campus Connect",
        description: "Mobile app connecting EPFL students for study groups, events, and academic collaboration. Features real-time messaging and smart matching algorithms.",
        technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
        category: "Mobile",
        icon: Smartphone,
        status: "Prototype",
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