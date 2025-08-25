import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { skillCategories } from "../constants";

const Skills = () => {
    const getVariantFromColor = (color: string) => {
        switch (color) {
            case "accent": return "default";
            case "primary": return "secondary";
            case "success": return "outline";
            default: return "default";
        }
    };

    return (
        <section id="skills" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-secondary bg-clip-text text-transparent">
                            Skills & Expertise
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        A comprehensive toolkit spanning computer science fundamentals, modern web technologies,
                        and financial analysis capabilities.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <Card
                            key={index}
                            className="bg-card border-border hover:border-accent transition-all duration-300 hover:shadow-card group"
                        >
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {category.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
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
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="bg-gradient-dark rounded-xl p-8 border border-border">
                        <h3 className="text-2xl font-bold mb-6">
                            <span className="bg-gradient-primary bg-clip-text text-transparent">
                                Always Learning
                            </span>
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            The tech and finance landscapes evolve rapidly. I'm committed to continuous learning
                            and staying at the forefront of emerging technologies and market trends.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-accent mb-1">3+</div>
                                <div className="text-sm text-muted-foreground">Years Coding</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-success mb-1">15+</div>
                                <div className="text-sm text-muted-foreground">Technologies</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-primary mb-1">10+</div>
                                <div className="text-sm text-muted-foreground">Projects</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-accent mb-1">∞</div>
                                <div className="text-sm text-muted-foreground">Curiosity</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;