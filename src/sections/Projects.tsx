import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import Badge from "../components/Badge.tsx";
import GithubIcon from "../assets/icons/github.svg?react";
import { projects } from "../constants";

const Projects = () => {
    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Completed": return "green";
            case "In Progress": return "yellow";
            case "Research": return "indigo";
            case "Prototype": return "purple";
            default: return "default";
        }
    };

    return (
        <section id="projects" className="py-20 bg-gradient-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Featured Projects
            </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        A showcase of my work spanning fintech applications, educational tools,
                        and innovative solutions at the intersection of technology and finance.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <Card
                            key={index}
                            className="bg-card border-border hover:border-accent transition-all duration-300 hover:shadow-glow group overflow-hidden"
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between mb-4">
                                    <project.icon className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
                                    <Badge variant={getStatusVariant(project.status)}>
                                        {project.status}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-bold group-hover:text-accent transition-colors">
                                    {project.title}
                                </CardTitle>
                                <div className="text-sm text-muted-foreground font-medium">
                                    {project.category}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                        <Badge
                                            key={techIndex}
                                            variant="pink"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="text-start">
                                <div className="flex">
                                    <Button variant="ghost" size="sm" className="hover:text-accent">
                                        <GithubIcon className="h-4 w-4 mr-2" />
                                        View Project
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <div className="bg-card border border-border rounded-xl p-8">
                        <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                More Projects Coming Soon
              </span>
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            I'm constantly working on new projects and exploring innovative ideas.
                            Check back regularly or follow me on GitHub for the latest updates.
                        </p>
                        <Button variant="hero" size="lg">
                            <GithubIcon className="h-5 w-5 mr-2" />
                            View All on GitHub
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
