import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import DownloadCV from '../components/DownloadCV';
import SocialLinks from '../components/SocialLinks';
import Project from './Project';
import Skills from './Skills';
// import About from '../components/About';
import devon from '../assets/images/ajay.jpeg';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import MoveToPortfolio from '../components/MoveToPortfolio';
import resumeData from '../data/data.json';
import About from './About';
const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  > footer {
    margin-top: auto;
  }
`;

const HomeContainer = styled.section`
  min-height: 100vh;
  color: #fff;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
`;

const ProjectsSection = styled.section`
  min-height: 100vh;
  color: #fff;
  padding: 6rem 2rem;
  position: relative;
  background: rgba(0, 0, 0, 0.4);
`;

const SkillsSection = styled.section`
  min-height: 100vh;
  color: #fff;
  padding: 6rem 2rem;
  position: relative;
  background: rgba(0, 0, 0, 0.4);
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #fff 0%, #8a8a8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(157, 0, 255, 0.5);
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  background: ${(props) => props.bg || '#2A2A2A'};
  margin-bottom: 1.5rem;
  overflow: hidden;
  position: relative;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const ProjectDescription = styled.p`
  color: #888;
  font-size: 1rem;
  line-height: 1.6;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #9d00ff;
`;

const SkillTitle = styled.h3`
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const SkillDescription = styled.p`
  color: #888;
  font-size: 1rem;
  line-height: 1.6;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContent = styled.div`
  z-index: 1;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: -20px;
    width: 100px;
    height: 100px;
    background: radial-gradient(
      circle,
      rgba(157, 0, 255, 0.2) 0%,
      transparent 70%
    );
    border-radius: 50%;
    filter: blur(15px);
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  font-weight: 800;
  margin: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(157, 0, 255, 0.95) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  color: rgba(180, 180, 180, 0.95);
  margin: 1.5rem 0 2rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: rgba(157, 0, 255, 0.7);
    margin-top: 1rem;

    @media (max-width: 768px) {
      margin: 1rem auto 0;
    }
  }
`;

const Description = styled(motion.p)`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 500px;
  line-height: 1.8;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 1rem auto 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(157, 0, 255, 0.3) 0%,
      rgba(157, 0, 255, 0) 70%
    );
    z-index: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 30px rgba(157, 0, 255, 0.4));
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 768px) {
    height: 400px;
    margin-top: 2rem;
  }
`;

const FloatingCode = styled(motion.div)`
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-family: 'Fira Code', monospace;
  font-size: ${(props) => props.size || '1rem'};
  white-space: pre;
  pointer-events: none;
  z-index: 0;
`;

const codeSnippets = [
  { text: '<h2>External JavaScript</h2>', x: '10%', y: '20%', size: '0.8rem' },
  { text: 'function() {\n  return true;\n}', x: '80%', y: '40%', size: '1rem' },
  { text: '@keyframes float {}', x: '15%', y: '70%', size: '1.2rem' },
  { text: '<div className="app">', x: '70%', y: '15%', size: '0.9rem' },
  { text: 'npm install react', x: '60%', y: '80%', size: '1.1rem' },
];

const HireButton = styled(motion.button)`
  background: rgba(157, 0, 255, 0.1);
  border: 1px solid rgba(157, 0, 255, 0.3);
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 2rem auto 0;

  &:hover {
    background: rgba(157, 0, 255, 0.2);
  }
`;

const Home = () => {
  return (
    <PageContainer>
      <HomeContainer>
        <ContentWrapper>
          <TextContent>
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {resumeData.name.split(' ').map((word, index) => (
                <React.Fragment key={index}>
                  {word}
                  {index < resumeData.name.split(' ').length - 1 && <br />}
                </React.Fragment>
              ))}
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              REACT NATIVE DEVELOPER
            </Subtitle>
            <Description
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              {resumeData.career_objective}
            </Description>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <DownloadCV />
              <MoveToPortfolio />
            </motion.div>
          </TextContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <ImageSection>
              <img src={devon} alt="Ajay Kumar Pandey" />
            </ImageSection>
          </motion.div>
        </ContentWrapper>
        <SocialLinks />
      </HomeContainer>
      <About />
      <Project />
      <Skills />
      <Contact />
      <Footer />
    </PageContainer>
  );
};

export default Home;
