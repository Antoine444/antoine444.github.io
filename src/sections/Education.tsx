import Badge from "../components/Badge"; // updated path to new Badge
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { educations } from "../constants";
import Card from "../components/Card";
import EpflLogo from "../assets/icons/epfl.svg";

const Education = () => {
    return (
        <section id="education" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-success bg-clip-text text-transparent">
                            Education
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Academic journey through one of Europe's leading technical universities,
                        building expertise in computer science and financial technology.
                    </p>
                </div>

                <div className="space-y-8 max-w-4xl mx-auto">
                    {educations.map((edu, index) => (
                        <Card
                            key={index}
                            image={EpflLogo}
                            className="animate-fade-in relative"
                            variant="elevated"
                            interactive
                        >
                            {/* Status badge at top-left corner */}
                            <div className="absolute top-4 right-4">
                                <Badge
                                    variant={edu.status === "Completed" ? "green" : "yellow"}
                                >
                                    {edu.status}
                                </Badge>
                            </div>

                            {/* Title */}
                            <div className="flex items-center gap-2 mb-2">
                                <GraduationCap className="h-5 w-5 text-accent" />
                                <span className="font-semibold">{edu.degree}</span>
                            </div>

                            {/* Subtitle */}
                            <h3 className="text-md text-muted-foreground mb-4">{edu.field}</h3>

                            {/* Description */}
                            <p className="mb-4 text-slate-400">{edu.description}</p>

                            {/* School, period, GPA */}
                            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span className="font-medium">{edu.school}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{edu.period}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4" />
                                    <span>
                                        GPA: <span className="font-semibold text-success">{edu.gpa}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Highlights */}
                            <div>
                                <h4 className="font-semibold text-accent mb-2">Key Areas</h4>
                                <div className="flex flex-wrap gap-2">
                                    {edu.highlights.map((highlight, idx) => (
                                        <Badge
                                            key={idx}
                                            variant="default"
                                            className="cursor-default"
                                        >
                                            {highlight}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
