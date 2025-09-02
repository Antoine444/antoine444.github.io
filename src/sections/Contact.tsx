import Card from "../components/Card.tsx";
import { Mail } from "lucide-react";
import { socialLinks } from "../constants";
import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";

export const Contact = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSubmitStatus(null);

        // Check if formRef.current is not null before using it
        if (!formRef.current) {
            setSubmitStatus('error');
            setLoading(false);
            return;
        }

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            );

            // Success - reset form
            setForm({
                firstName: "",
                lastName: "",
                email: "",
                subject: "",
                message: "",
            });
            setSubmitStatus('success');
        } catch (error) {
            console.error("EmailJS Error:", error);
            setSubmitStatus('error');
        } finally {
            setLoading(false);
        }
    };

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
                        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                                    Sorry, there was an error sending your message. Please try again.
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-2 block">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="John"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground mb-2 block">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Doe"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        required
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
                                    name="email"
                                    placeholder="john.doe@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Let's discuss an opportunity"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    placeholder="Tell me about your project or opportunity..."
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm min-h-[8rem] focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-card-modern group/btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="btn-content">
                                    <span className="btn-icon">
                                        <Mail className="h-5 w-5" />
                                    </span>
                                    <span className="btn-text">
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </span>
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