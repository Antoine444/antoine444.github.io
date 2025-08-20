import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { navItems } from "../constants"

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        const foundItem = navItems.find(item => item.href === `#${id}`);
                        if (foundItem) {
                            setActiveItem(foundItem.name);
                        }
                    }
                });
            },
            {
                root: null,
                threshold: 0.5,
            }
        );

        navItems.forEach((item) => {
            const element = document.querySelector(item.href);
            if (element) {
                observerRef.current?.observe(element);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [navItems]);

    const scrollToSection = (item: {href: string, name: string}) => {
    const element = document.querySelector(item.href);

    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveItem(item.name);
    }
    setIsMobileMenuOpen(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setActiveItem(null);
        setIsMobileMenuOpen(false); // Close mobile menu if open
    };

    return (
    <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
        <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
                {/* Home Text */}
                <div
                    className="text-xl font-bold cursor-pointer"
                    onClick={scrollToTop}
                    role="button"
                    tabIndex={0}
                >
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                        Antoine Garin
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item)}
                            className={`hover-underline text-foreground hover:text-accent transition-colors font-medium
                            cursor-pointer relative ${
                                activeItem === item.name
                                    ? "after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0" +
                                    "after:left-0 after:bg-accent bg-gradient-to-r from-gray-700 to-stone-800 rounded-md border  border-accent" +
                                    "rounded px-2 py-1"
                                    : ""
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </Button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
                    <div className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item)}
                                className={`text-left text-foreground hover:text-accent transition-colors font-medium
                                py-2 cursor-pointer ${
                                    activeItem === item.name ? "underline" : ""
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </nav>
  );
};

export default Navigation;