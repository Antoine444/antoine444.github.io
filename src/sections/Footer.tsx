import GithubIcon from "../assets/icons/github.svg?react";
import LinkedinIcon from "../assets/icons/linkedin.svg?react";

const Footer = () => {
    return (
        <footer className="bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} - Antoine Garin - All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition transform duration-300
                            hover:scale-110 hover:-rotate-24 hover:-translate-y-1"
                            aria-label="GitHub Profile"
                        >
                            <GithubIcon className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition transform duration-300
                            hover:scale-110 hover:rotate-24 hover:-translate-y-1"
                            aria-label="LinkedIn Profile"
                        >
                            <LinkedinIcon className="w-5 h-5" />
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
