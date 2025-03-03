import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import resumeData from '../data/data.json';

const AboutContainer = styled.div`
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
  gap: 4rem;
  align-items: center;
  padding-top: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  max-width: 500px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid rgba(157, 0, 255, 0.3);
    border-radius: 50%;
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const CircularImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: url('/images/coding-setup.jpg') center center;
  background-size: cover;
  box-shadow: 0 0 30px rgba(157, 0, 255, 0.3);
`;

const TextContent = styled.div`
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, #8a8a8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Arrow = styled.span`
  color: #9D00FF;
  font-size: 2rem;
  margin-top: 1rem;
`;

const Description = styled(motion.p)`
  color: #888;
  font-size: 1.1rem;
  margin: 2rem 0;
  max-width: 500px;
  line-height: 1.6;

  @media (max-width: 768px) {
    margin: 2rem auto;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatItem = styled(motion.div)`
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;

  span {
    color: #9D00FF;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const HireButton = styled(motion.button)`
  background: #9D00FF;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 2rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const TechStack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0.5;
`;

const ScrollingText = styled.div`
  display: inline-block;
  animation: scroll 20s linear infinite;
  font-family: 'Fira Code', monospace;
  color: #666;

  @keyframes scroll {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const About = () => {
    // Calculate years of experience from work experience
    const calculateExperience = () => {
        const startDate = new Date(resumeData.work_experience[0].start_date);
        const currentDate = new Date();
        return Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365));
    };

    // Get advanced skills for scrolling text
    const skillsText = [
        ...resumeData.skills.advanced,
        ...resumeData.skills.performance,
        ...resumeData.skills.architecture
    ].join(' • ');

    return (
        <AboutContainer>
            <TechStack>
                <ScrollingText>
                    {skillsText} • {skillsText} {/* Repeated for continuous scroll */}
                </ScrollingText>
            </TechStack>
            <ContentWrapper>
                <ImageSection>
                    <CircularImage />
                </ImageSection>
                <TextContent>
                    <Title
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {resumeData.name} <Arrow>↘</Arrow>
                    </Title>
                    <Description
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {resumeData.career_objective}
                    </Description>
                    <Stats>
                        <StatItem
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <StatNumber>{resumeData.projects.length}<span>+</span></StatNumber>
                            <StatLabel>Projects Completed</StatLabel>
                        </StatItem>
                        <StatItem
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <StatNumber>{calculateExperience()}<span>+</span></StatNumber>
                            <StatLabel>Years Experience</StatLabel>
                        </StatItem>
                    </Stats>
                    <HireButton
                        as="a"
                        href={`mailto:${resumeData.email}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Me ↗
                    </HireButton>
                </TextContent>
            </ContentWrapper>
        </AboutContainer>
    );
};

export default About;
