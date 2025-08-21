import {Brain, TrendingUp, Zap} from "lucide-react";
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

export {
    navItems,
    highlights,
};