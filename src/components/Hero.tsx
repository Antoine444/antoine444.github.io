import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { TypeAnimation } from 'react-type-animation';
import GithubIcon from "./../assets/github.svg?react";
import LinkedinIcon from "./../assets/linkedin.svg?react";


const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Add a visibility check to ensure animations start only when component is visible
    useEffect(() => {
        setIsVisible(true);
    }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="absolute top-20 left-20 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-primary rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-success rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent rounded-full animate-pulse delay-300"></div>
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
                        className="text-xl md:text-2xl text-muted-foreground-lighter"
                        repeat={Infinity}
                    />
                )}
            </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Final-year CS master student with a minor in financial engineering at EPFL, passionate about
              building innovative solutions by leveraging machine learning, AI tools and software engineering.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="min-w-48">
              View My Work
            </Button>
            <Button variant="outline" size="lg" className="text-shadow-sm min-w-48 border-gray-500 hover:text-background">
              Let's Connect !
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10">
                <GithubIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10">
              <LinkedinIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-accent
        transition-colors animate-bounce cursor-pointer"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default Hero;