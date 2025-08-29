import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../constants";

// Debounce helper
function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport with threshold
function isElementInViewport(el: HTMLElement, offset: number = 0.4) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Section becomes active when its top has passed the threshold,
    // but it's not completely scrolled out yet
    return rect.top <= windowHeight * offset && rect.bottom > windowHeight * offset;
}


const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const desktopNavRef = useRef<HTMLDivElement>(null);
    const desktopUnderlineRef = useRef<HTMLDivElement>(null);

    // Navbar background on scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Update desktop underline position
    const updateDesktopUnderline = useCallback(() => {
        if (!desktopNavRef.current || !desktopUnderlineRef.current || !activeItem) {
            if (desktopUnderlineRef.current) {
                desktopUnderlineRef.current.style.opacity = '0';
            }
            return;
        }

        const activeButton = Array.from(desktopNavRef.current.children).find(
            (child) => child instanceof HTMLButtonElement && child.textContent === activeItem
        ) as HTMLButtonElement | undefined;

        if (activeButton) {
            const buttonRect = activeButton.getBoundingClientRect();
            const navRect = desktopNavRef.current.getBoundingClientRect();

            desktopUnderlineRef.current.style.width = `${buttonRect.width}px`;
            desktopUnderlineRef.current.style.transform = `translateX(${buttonRect.left - navRect.left}px)`;
            desktopUnderlineRef.current.style.opacity = '1';
        }
    }, [activeItem]);

    // Update underline when active item changes
    useEffect(() => {
        updateDesktopUnderline();
    }, [activeItem, updateDesktopUnderline]);

    // Scroll-based active section detection
    useEffect(() => {
        const handleScroll = debounce(() => {
            let foundActive = false;

            for (let i = navItems.length - 1; i >= 0; i--) {
                const item = navItems[i];
                const section = document.querySelector(item.href) as HTMLElement;
                if (section && isElementInViewport(section, 0.4) && !foundActive) {
                    setActiveItem(item.name);
                    foundActive = true;
                }
            }

            if (!foundActive) {
                setActiveItem(null);
            }
        }, 100);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // Handle window resize
    useEffect(() => {
        const handleResize = debounce(() => {
            updateDesktopUnderline();
        }, 100);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [updateDesktopUnderline]);

    const scrollToSection = useCallback((item: { href: string; name: string }) => {
        const element = document.querySelector(item.href) as HTMLElement;
        if (element) {
            const navHeight = 64;
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementTop - navHeight, behavior: "smooth" });
            setActiveItem(item.name);
        }
        setIsMobileMenuOpen(false);
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveItem(null);
        setIsMobileMenuOpen(false);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border"
                    : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex items-center justify-between h-16 px-6">
                {/* Logo */}
                <div
                    className="text-xl font-bold cursor-pointer"
                    onClick={scrollToTop}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
                >
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                        Antoine Garin
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8 relative" ref={desktopNavRef}>
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item)}
                            className={`transition-colors font-medium 
                             hover:text-foreground relative py-2 cursor-pointer ${
                                activeItem === item.name ? 'text-foreground' : 'text-muted-foreground'
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}

                    {/* Desktop sliding underline */}
                    <div
                        ref={desktopUnderlineRef}
                        className="absolute bottom-2 h-[2px] bg-accent shadow-glow-accent transition-all duration-300
                                    ease-out opacity-0"
                    />
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                    className="md:hidden p-2 rounded-2xl hover:bg-muted transition-colors cursor-pointer"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>

            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
                    <div className="container mx-auto px-6">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item)}
                                className={`block w-full py-3 text-left font-medium transition-colors relative cursor-pointer ${
                                    activeItem === item.name
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <span className="relative inline-block">
                                    {item.name}
                                    {/* Individual underline for each mobile nav item */}
                                    {activeItem === item.name && (
                                        <div className="absolute -bottom-0.15 left-0 h-[2px] w-full bg-accent
                                                        shadow-glow-accent transition-all duration-300" />
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;