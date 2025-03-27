import emailjs from '@emailjs/browser';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import BackgroundAnimation from './components/BackgroundAnimation';
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

const AppWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(19, 17, 28, 0.95) 0%,
    rgba(30, 27, 46, 0.95) 100%
  );
  font-family: 'Satoshi', sans-serif;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: linear-gradient(135deg, #13111c 0%, #1e1b2e 100%);
`;

const AnimationWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

function App() {
  return (
    <Router>
      <FontStyles />
      <AppWrapper>
        <BackgroundWrapper />
        <AnimationWrapper>
          <BackgroundAnimation />
        </AnimationWrapper>
        <ContentWrapper>
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
        </ContentWrapper>
      </AppWrapper>
    </Router>
  );
}

export default App;
