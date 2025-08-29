import Navigation from "../sections/Navigation.tsx";
import Hero from "../sections/Hero.tsx";
import About from "../sections/About.tsx";
import Skills from "../sections/Skills.tsx";
import Projects from "../sections/Projects.tsx";
import Contact from "../sections/Contact.tsx";
import Education from "../sections/Education.tsx";
import Footer from "../sections/Footer.tsx";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Navigation />
            <main>
                <div id="home">
                    <Hero />
                </div>
                <Education />
                <Projects />
                <Skills />
                <About />
                <Contact />
                <Footer />
            </main>
        </div>
    );
};

export default Index;
