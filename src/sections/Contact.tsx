import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "your.email@epfl.ch",
      href: "mailto:your.email@epfl.ch"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Lausanne, Switzerland",
      href: null
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+41 XX XXX XX XX",
      href: "tel:+41XXXXXXXXX"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, 
            or simply connecting with fellow tech and finance enthusiasts.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Send a Message
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    First Name
                  </label>
                  <Input placeholder="John" className="bg-muted border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Last Name
                  </label>
                  <Input placeholder="Doe" className="bg-muted border-border" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email
                </label>
                <Input 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  className="bg-muted border-border" 
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Subject
                </label>
                <Input 
                  placeholder="Let's discuss an opportunity" 
                  className="bg-muted border-border" 
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Message
                </label>
                <Textarea 
                  placeholder="Tell me about your project or opportunity..."
                  className="bg-muted border-border min-h-32"
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full">
                <Mail className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gradient-dark border-border">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-accent">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <info.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{info.title}</div>
                      {info.href ? (
                        <a 
                          href={info.href} 
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-muted-foreground">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  <span className="bg-gradient-accent bg-clip-text text-transparent">
                    Follow Me
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <Button 
                      key={index}
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"
                    >
                      <link.icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Stay updated with my latest projects and insights into the world of technology and finance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary border-none text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Open to Opportunities</h3>
                <p className="text-white/90 text-sm mb-4">
                  Currently seeking internships and entry-level positions in fintech, 
                  software development, or data science.
                </p>
                <Button variant="secondary" size="sm">
                  Download CV
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;