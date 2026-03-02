import emailjs from '@emailjs/browser';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import Admin from './pages/Admin';
import AllProjects from './pages/AllProjects';
import AllSkills from './pages/AllSkills';
import FullSkills from './pages/FullSkills';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Project from './pages/Project';
import ProjectDetail from './pages/ProjectDetail';
import Skills from './pages/Skills';
import FontStyles from './styles/fonts';

emailjs.init('YOUR_PUBLIC_KEY');

function App() {
  return (
    <Router>
      <FontStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/skills" element={<FullSkills />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/all-skills" element={<AllSkills />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
