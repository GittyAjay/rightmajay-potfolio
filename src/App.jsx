import { useTheme } from "./useTheme.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Extras from "./components/Extras.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Nav theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Extras />
      </main>
      <Contact />
    </>
  );
}
