import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { educations } from "../constants";

const Education = () => {
    return (
        <section id="education" className="py-20 bg-gradient-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Education
            </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Academic journey through one of Europe's leading technical universities,
                        building expertise in computer science and financial technology.
                    </p>
                </div>

                <div className="space-y-8 max-w-4xl mx-auto">
                    {educations.map((edu, index) => (
                        <Card
                            key={index}
                            className="bg-card border-border hover:border-accent transition-all duration-500 hover:shadow-glow group animate-fade-in"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                            <GraduationCap className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-bold group-hover:text-accent transition-colors">
                                                {edu.degree}
                                            </CardTitle>
                                            <p className="text-primary font-semibold">{edu.field}</p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={edu.status === "Completed" ? "default" : "secondary"}
                                        className="hover:scale-105 transition-transform"
                                    >
                                        {edu.status}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span className="font-medium">{edu.school}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>{edu.period}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Award className="h-4 w-4" />
                                            <span>GPA: <span className="font-semibold text-success">{edu.gpa}</span></span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-accent">Key Areas</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {edu.highlights.map((highlight, highlightIndex) => (
                                                <Badge
                                                    key={highlightIndex}
                                                    variant="outline"
                                                    className="text-xs hover:scale-105 transition-transform cursor-default hover:border-accent"
                                                >
                                                    {highlight}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <p className="text-muted-foreground leading-relaxed">
                                        {edu.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;