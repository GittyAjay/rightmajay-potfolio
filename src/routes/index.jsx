import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from '../components/layout/LoadingScreen';
import Home from '../pages/Home';
import About from '../pages/About';
import Skills from '../pages/Skills';
import Experience from '../pages/Experience';
import Projects from '../pages/Projects';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';

// Lazy load heavier components
const Certifications = React.lazy(() => import('../pages/Certifications'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route
                path="/certifications"
                element={
                    <Suspense fallback={<LoadingScreen />}>
                        <Certifications />
                    </Suspense>
                }
            />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
};

export default AppRoutes; 