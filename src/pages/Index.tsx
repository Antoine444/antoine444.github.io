import Navigation from "./../components/Navigation";
import Hero from "./../components/Hero";
import About from "./../components/About";
import Skills from "./../components/Skills";
import Projects from "./../components/Projects";
import Contact from "./../components/Contact";

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
