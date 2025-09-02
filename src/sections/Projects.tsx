import Card from "../components/Card.tsx";
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
        <section id="projects" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-red bg-clip-text text-transparent">
                            Featured Projects
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        A showcase of my work spanning fintech applications, educational tools,
                        and innovative solutions at the intersection of technology and finance.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <Card
                            key={index}
                            title={project.title}
                            titleIcon={<project.icon className="h-8 w-8" />}
                            subtitle={project.category}
                            description={project.description}
                            buttonText="View Project"
                            buttonIcon={<GithubIcon className="size-4" />}
                            buttonHref={project.githubUrl}
                            variant="default"
                            interactive
                            className="relative h-full flex flex-col justify-between"
                        >
                            {/* Status Badge (top-right) */}
                            <div className="absolute top-4 right-4">
                                <Badge variant={getStatusVariant(project.status)}>
                                    {project.status}
                                </Badge>
                            </div>

                            {/* Tech stack badges */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.technologies.map((tech, techIndex) => (
                                    <Badge key={techIndex} variant="pink">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* More Projects Coming Soon */}
                <div className="mt-16 text-center">
                    <Card
                        title="More Projects Coming Soon"
                        description="I'm constantly working on new projects and exploring innovative ideas. Check back regularly or follow me on GitHub for the latest updates."
                        buttonText="View All on GitHub"
                        buttonIcon={<GithubIcon className="size-5" />}
                        buttonHref="https://github.com/Antoine444"
                        variant="glass"
                        interactive
                        className="relative flex flex-col justify-between"
                    />
                </div>
            </div>
        </section>
    );
};

export default Projects;