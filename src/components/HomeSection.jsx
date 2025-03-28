import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import MoveToPortfolio from './MoveToPortfolio';
import SocialLinks from './SocialLinks';

const HomeContainer = styled.section`
  min-height: 100vh;
  color: #fff;
  padding: 2rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
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
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 8vw, 5rem);
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, #8a8a8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #b4b4b4;
  margin: 1rem 0 2rem;
`;

const Description = styled(motion.p)`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 500px;

  @media (max-width: 768px) {
    margin: 1rem auto 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(157, 0, 255, 0.2) 0%,
      rgba(157, 0, 255, 0) 70%
    );
    z-index: 0;
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

const HomeSection = () => {
  return (
    <HomeContainer>
      {codeSnippets.map((snippet, index) => (
        <FloatingCode
          key={index}
          style={{ left: snippet.x, top: snippet.y, fontSize: snippet.size }}
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          {snippet.text}
        </FloatingCode>
      ))}
      <ContentWrapper>
        <TextContent>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ajay
            <br />
            Pandey
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            FULL-STACK WEB DEVELOPER
          </Subtitle>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I'm a full-stack web developer and I work remotely from India.
          </Description>
          {/* <DownloadCV /> */}
          <MoveToPortfolio />
        </TextContent>
        <ImageSection>{/* Add your image here */}</ImageSection>
      </ContentWrapper>
      <SocialLinks />
    </HomeContainer>
  );
};

export default HomeSection;
