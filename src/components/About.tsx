import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { Code, TrendingUp, Brain, Zap } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Computer Science",
      description: "Studying at EPFL, mastering algorithms, data structures, and software engineering principles."
    },
    {
      icon: TrendingUp,
      title: "Finance Enthusiast",
      description: "Passionate about fintech, algorithmic trading, and the digital transformation of financial services."
    },
    {
      icon: Brain,
      title: "Problem Solver",
      description: "Love tackling complex challenges at the intersection of technology and business."
    },
    {
      icon: Zap,
      title: "Innovation Driven",
      description: "Always exploring cutting-edge technologies and their applications in real-world scenarios."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a Computer Science student at EPFL with a passion for finance and technology. 
            I believe in the power of innovation to solve complex problems and create meaningful impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-accent mb-4">My Journey</h3>
            <p className="text-muted-foreground leading-relaxed">
              Currently pursuing my degree at EPFL, one of Europe's most prestigious technical universities. 
              My academic focus spans from fundamental computer science principles to advanced topics in 
              machine learning and software architecture.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond academics, I'm deeply interested in the financial sector's digital transformation. 
              I explore how emerging technologies like blockchain, AI, and data analytics are reshaping 
              traditional finance and creating new opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <Card key={index} className="bg-card border-border hover:border-accent transition-all duration-300 hover:shadow-glow">
                <CardHeader className="pb-3">
                  <highlight.icon className="h-8 w-8 text-accent mb-2" />
                  <CardTitle className="text-sm font-semibold">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-card">
          <h3 className="text-xl font-bold text-center mb-6">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              What Drives Me
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Innovation</div>
              <p className="text-sm text-muted-foreground">
                Constantly exploring new technologies and methodologies
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">Impact</div>
              <p className="text-sm text-muted-foreground">
                Building solutions that make a real difference
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Excellence</div>
              <p className="text-sm text-muted-foreground">
                Striving for the highest standards in everything I do
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;