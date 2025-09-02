import {socialLinks} from "../constants";

const Footer = () => {
    return (
        <footer className="bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                    <p className="text-foreground text-sm">
                        © {new Date().getFullYear()} - Antoine Garin - All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                aria-label={link.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:bg-white/10 cursor-pointer transition
                                                    transform duration-300 hover:scale-110 hover:-translate-y-1 
                                                    ${link.label === "GitHub" ? "hover:-rotate-24" : "hover:rotate-24"}`}
                            >
                                <link.icon className="size-5" />
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
