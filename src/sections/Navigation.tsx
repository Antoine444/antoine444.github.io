import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button.tsx";
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
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-background/80 backdrop-blur-md border-b border-border'
                : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
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
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item)}
                                className={`transition-colors font-medium cursor-pointer group ${
                                    activeItem === item.name
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-accent-foreground"
                                }`}
                            >
                                <span className={`relative inline-block ${
                                    activeItem === item.name
                                        ? "bg-gradient-to-r from-gray-700 to-stone-800 border border-accent rounded-md px-2 py-1"
                                        : ""
                                }`}>
                                    <span className="relative inline-block hover-underline-custom">
                                        {item.name}
                                        {activeItem === item.name && (
                                            <div className="absolute bottom-[1px] left-0 w-full h-[2px] bg-accent"></div>
                                        )}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
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
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item)}
                                    className="w-full py-2 cursor-pointer text-left px-4"
                                >
                                    <span className={`inline-block ${
                                        activeItem === item.name
                                            ? "bg-gradient-to-r from-gray-700 to-stone-800 border border-accent rounded-md px-2 py-1 text-foreground"
                                            : "text-muted-foreground"
                                    }`}>
                                        <span className="relative inline-block hover-underline-custom">
                                            {item.name}
                                            {activeItem === item.name && (
                                                <div className="absolute bottom-[1px] left-0 w-full h-[2px] bg-accent"></div>
                                            )}
                                        </span>
                                    </span>
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
