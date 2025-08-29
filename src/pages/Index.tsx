import Navigation from "../sections/Navigation.tsx";
import Hero from "../sections/Hero.tsx";
import About from "../sections/About.tsx";
import Skills from "../sections/Skills.tsx";
import Projects from "../sections/Projects.tsx";
import Contact from "../sections/Contact.tsx";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div id="home">
          <Hero />
        </div>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
