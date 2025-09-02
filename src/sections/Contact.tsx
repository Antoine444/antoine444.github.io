import Card from "../components/Card.tsx";
import { Mail } from "lucide-react";
import { socialLinks } from "../constants";

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-red bg-clip-text text-transparent">
              Let's Connect
            </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        I'm always open to discussing new opportunities, collaborations,
                        or simply connecting with fellow tech and finance enthusiasts.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form Card */}
                    <Card
                        title="Send a Message"
                        description="Fill out the form below and I'll get back to you as soon as possible."
                        titleIcon={<Mail className="h-6 w-6 text-red" />}
                        variant="outline"
                        interactive
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-2 block">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-2 block">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="Let's discuss an opportunity"
                                    className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Message
                                </label>
                                <textarea
                                    placeholder="Tell me about your project or opportunity..."
                                    className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm min-h-[8rem] focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-card-modern group/btn w-full"
                            >
                                <span className="btn-content">
                                    <span className="btn-icon">
                                        <Mail className="h-5 w-5" />
                                    </span>
                                    <span className="btn-text">Send Message</span>
                                </span>
                                <div className="btn-glow"></div>
                            </button>
                        </form>
                    </Card>

                    {/* Right column with cards */}
                    <div className="space-y-8">
                        {/* Social Links */}
                        <Card
                            title="Follow Me"
                            description="Stay updated with my latest projects and insights into the world of technology and finance."
                            variant="glass"
                            interactive
                        >
                            <div className="flex space-x-6 justify-center">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        aria-label={link.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2 rounded-2xl hover:bg-white/10 cursor-pointer transition
                                                    transform duration-300 hover:scale-110 hover:-translate-y-1 
                                                    ${link.label === "GitHub" ? "hover:-rotate-24" : "hover:rotate-24"}`}
                                    >
                                        <link.icon className="size-6" />
                                    </a>
                                ))}
                            </div>
                        </Card>

                        {/* Open to Opportunities */}
                        <Card
                            title="Open to Opportunities"
                            description="Currently seeking internships and entry-level positions in fintech, software development, or data science."
                            buttonText="Download CV"
                            buttonHref="/files/CV.pdf"
                            buttonDownload="CV.pdf"
                            variant="glass"
                            interactive
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
