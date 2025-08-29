import {useState, useEffect} from "react";
import {ChevronDown} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import {TypeAnimation} from 'react-type-animation';
import GithubIcon from "../assets/icons/github.svg?react";
import LinkedinIcon from "../assets/icons/linkedin.svg?react";


const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Add a visibility check to ensure animations start only when component is visible
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const scrollToEducation = () => {
        document.getElementById('education')?.scrollIntoView({behavior: 'smooth'});
    };

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'});
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <section
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.8), rgba(34, 40, 49, 0.8)), url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Animated particles */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-32 w-1 h-1 bg-primary rounded-full animate-ping"></div>
                <div className="absolute bottom-32 left-32 w-3 h-3 bg-success rounded-full animate-bounce"></div>
                <div
                    className="absolute bottom-20 right-20 w-2 h-2 bg-accent rounded-full animate-pulse delay-300"></div>
            </div>

            <div className="container mx-auto px-6 text-center z-10">
                <div className="max-w-4xl mx-auto slide-up">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="bg-gradient-primary bg-clip-text text-transparent">
                            Antoine Garin
                        </span>
                    </h1>

                    <div className="h-6 mb-8">
                        {isVisible && (
                            <TypeAnimation
                                sequence={[
                                    'EPFL CS Master Student',
                                    1500,
                                    'Minor in Financial Engineering',
                                    1500,
                                    'Software Engineer',
                                    1500,
                                    'Machine Learning Engineer',
                                    1500,
                                    'Table Tennis Amateur',
                                    1500,
                                ]}
                                wrapper="span"
                                speed={45}
                                className="text-xl md:text-2xl text-foreground"
                                repeat={Infinity}
                            />
                        )}
                    </div>

                    <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Final-year CS master student with a minor in financial engineering at EPFL, passionate about
                        building innovative solutions by leveraging machine learning, AI tools and software engineering.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        {/* Hero button */}
                        <button
                            type="button"
                            onClick={scrollToProjects}
                            className="min-w-44 px-6 py-3 text-lg font-medium font-sans text-center text-white
                            transition duration-300 rounded-2xl hover:from-violet-600 hover:to-sky-600 ease
                            bg-gradient-to-br from-sky-500 to-violet-500 hover:opacity-90 cursor-pointer shadow-md
                            hover:shadow-[0_8px_20px_rgba(59,130,246,0.6)] hover:scale-105"
                        >
                            View My Work
                        </button>

                        {/* Outline button */}
                        <button
                            type="button"
                            onClick={scrollToContact}
                            className="min-w-44 px-6 py-3 rounded-2xl border border-gray-500 text-white font-medium
                            text-lg hover:text-background hover:bg-zinc-400 transition text-shadow-sm cursor-pointer
                            hover:border-zinc-50 font-sans text-center hover:opacity-90 hover:scale-105 backdrop-blur-xl"
                        >
                            Reach Out
                        </button>
                    </div>

                    <div className="flex justify-center space-x-6">
                        <button
                            type="button"
                            className="flex items-center justify-center p-2 rounded-2xl hover:bg-white/10
                            transition cursor-pointer transform duration-300
                            hover:scale-110 hover:rotate-24 hover:-translate-y-1"
                        >
                            <GithubIcon className="size-6"/>
                        </button>

                        <button
                            type="button"
                            className="p-2 rounded-2xl hover:bg-white/10 transition cursor-pointer transform duration-300
                            hover:scale-110 hover:-rotate-24 hover:-translate-y-1"
                        >
                            <LinkedinIcon className="size-6"/>
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={scrollToEducation}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:bg-white/10
                            transition-colors animate-bounce cursor-pointer"
            >
                <ChevronDown className="size-10"/>
            </button>
        </section>
    );
};

export default Hero;