import Card, {CardContainer} from "../components/Card.tsx";
import Badge from "../components/Badge.tsx";
import { skillCategories } from "../constants";

const Skills = () => {
    const getVariantFromColor = (color: string) => {
        switch (color) {
            case "primary": return "indigo";
            case "secondary": return "purple";
            case "success": return "pink";
            default: return "default";
        }
    };

    return (
        <section id="skills" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-success bg-clip-text text-transparent">
                            Skills & Expertise
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        A comprehensive toolkit spanning computer science fundamentals, data analysis and AI technologies,
                        and financial analysis capabilities.
                    </p>
                </div>

                <CardContainer>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skillCategories.map((category, index) => (
                            <Card
                                key={index}
                                title={category.title}
                                variant="elevated"
                                interactive
                                className="group"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <Badge
                                            key={skillIndex}
                                            variant={getVariantFromColor(category.color)}
                                            className="text-xs hover:scale-105 transition-transform cursor-default"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContainer>

                <div className="mt-16 text-center">
                    <div className="bg-gradient-dark rounded-xl p-8 border border-border">
                        <h3 className="text-2xl font-bold mb-6">
                            <span className="bg-gradient-primary bg-clip-text text-transparent">
                                Always Learning
                            </span>
                        </h3>
                        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                            The tech and finance landscapes evolve rapidly. I'm committed to continuous learning
                            and staying at the forefront of emerging technologies and market trends.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-accent mb-1">5+</div>
                                <div className="text-sm text-slate-400">Years Coding</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-success mb-1">15+</div>
                                <div className="text-sm text-slate-400">Technologies</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-red mb-1">10+</div>
                                <div className="text-sm text-slate-400">Projects</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-primary mb-1">∞</div>
                                <div className="text-sm text-slate-400">Curiosity</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;