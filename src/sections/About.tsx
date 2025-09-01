import Card from "../components/Card.tsx";
import { highlights } from "../constants";
import { LightbulbIcon, TargetIcon, AwardIcon } from "lucide-react";

const About = () => {
    return (
        <section id="about" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-primary bg-clip-text text-transparent">
                            About Me
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Left side: Journey text */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-foreground mb-4">My Journey</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Currently pursuing my degree at EPFL, one of Europe's most prestigious technical universities.
                            My academic focus spans from fundamental computer science principles to advanced topics in
                            machine learning and software architecture.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Beyond academics, I'm deeply interested in the financial sector's digital transformation.
                            I explore how emerging technologies like blockchain, AI, and data analytics are reshaping
                            traditional finance and creating new opportunities.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            On a personal note, I am also a table tennis player, I played for more than 12 years,
                            and I competed in numerous table tennis tournaments at the French national level.
                        </p>
                    </div>

                    {/* Right side: Highlights grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {highlights.map((highlight, index) => (
                            <Card
                                key={index}
                                title={highlight.title}
                                titleIcon={
                                    <highlight.icon className="h-8 w-8" />
                                }
                                description={highlight.description}
                                variant="outline"
                                interactive
                                className="group"
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom section: What Drives Me */}
                <div className="mt-16">
                    <h3 className="text-xl font-bold text-center mb-8">
                        <span className="bg-gradient-success bg-clip-text text-transparent">
                            What Drives Me
                        </span>
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card
                            title="Innovation"
                            titleIcon={<LightbulbIcon className="h-6 w-6 text-accent" />}
                            description="Constantly exploring new technologies and methodologies."
                            variant="glass"
                            interactive
                            className="relative text-left"
                        />
                        <Card
                            title="Impact"
                            titleIcon={<TargetIcon className="h-6 w-6 text-success" />}
                            description="Building solutions that make a real difference."
                            variant="glass"
                            interactive
                            className="relative text-left"
                        />
                        <Card
                            title="Excellence"
                            titleIcon={<AwardIcon className="h-6 w-6 text-red" />}
                            description="Striving for the highest standards in everything I do."
                            variant="glass"
                            interactive
                            className="relative text-left"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
