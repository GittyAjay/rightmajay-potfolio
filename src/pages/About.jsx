import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import resumeData from '../data/data.json';

const AboutContainer = styled.div`
  min-height: 100vh;
  color: #fff;
  padding: 2rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  padding-bottom: 4rem;

  @media (max-width: 768px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 6rem;
  align-items: center;
  width: 100%;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
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
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    border: 3px solid rgba(157, 0, 255, 0.3);
    border-radius: 50%;
    animation: rotate 20s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid rgba(157, 0, 255, 0.5);
    border-radius: 50%;
    animation: rotate 15s linear infinite reverse;
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
  box-shadow: 0 0 50px rgba(157, 0, 255, 0.4);
  border: 3px solid rgba(157, 0, 255, 0.6);
`;

const TextContent = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;

  @media (max-width: 768px) {
    align-items: center;
    margin: 0 auto;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, #9d00ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: clamp(2rem, 6vw, 3rem);
    justify-content: center;
  }
`;

const Arrow = styled.span`
  color: #9d00ff;
  font-size: 2rem;
  margin-top: 1rem;
`;

const Description = styled(motion.p)`
  color: #888;
  font-size: 1.2rem;
  margin: 2rem 0;
  line-height: 1.8;
  width: 100%;

  @media (max-width: 768px) {
    text-align: center;
    margin: 2rem auto;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 4rem;
  margin-top: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const StatItem = styled(motion.div)`
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;

  span {
    color: #9d00ff;
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
  position: relative;
  padding: 16px 48px;
  background: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(90deg, #9d00ff, #ff00e5);
    border-radius: 18px;
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    background: #000;
    border-radius: 15px;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
    filter: blur(2px);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(157, 0, 255, 0.5);
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
  animation: scroll 40s linear infinite;
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

const Journey = styled.div`
  margin-top: 4rem;
  width: 100%;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    background: rgba(157, 0, 255, 0.3);
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 2rem;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  padding-right: 50%;
  position: relative;
  margin: 2rem 0;

  &:nth-child(even) {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: 50%;
  }

  @media (max-width: 768px) {
    padding-right: 0;
    padding-left: 4rem;

    &:nth-child(even) {
      padding-left: 4rem;
    }
  }
`;

const TimelineContent = styled.div`
  background: rgba(157, 0, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  width: 80%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #9d00ff;
    border-radius: 50%;
    right: -60px;
    top: 50%;
    transform: translateY(-50%);
  }

  ${TimelineItem}:nth-child(even) & {
    &::after {
      left: -60px;
      right: auto;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;

    &::after {
      left: -52px;
      right: auto;
      width: 15px;
      height: 15px;
    }

    ${TimelineItem}:nth-child(even) & {
      &::after {
        left: -52px;
      }
    }
  }
`;

const TimelineTitle = styled.h3`
  color: #fff;
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
`;

const TimelineDate = styled.span`
  color: #9d00ff;
  font-size: 0.9rem;
`;

const TimelineDescription = styled.p`
  color: #888;
  margin: 1rem 0 0;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ProjectStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectStat = styled.div`
  background: rgba(157, 0, 255, 0.15);
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: center;

  span {
    color: #9d00ff;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const About = () => {
  const navigate = useNavigate();

  const calculateExperience = () => {
    const startDate = new Date(resumeData.work_experience[0].start_date);
    const currentDate = new Date();
    
    const totalMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
                       (currentDate.getMonth() - startDate.getMonth());
    
    const years = totalMonths / 12;
    
    return years.toFixed(1);
  };

  const skillsText = [
    ...resumeData.skills.advanced,
    ...resumeData.skills.performance,
    ...resumeData.skills.architecture,
  ].join(' • ');

  const experience = calculateExperience();

  return (
    <AboutContainer>
      <TechStack>
        <ScrollingText>
          {skillsText} • {skillsText}
        </ScrollingText>
      </TechStack>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Journey
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
            <StatNumber>
              {3.9} <span>yr</span>
            </StatNumber>
            <StatLabel>Experience</StatLabel>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <StatNumber>
              {resumeData.projects.length}
              <span>+</span>
            </StatNumber>
            <StatLabel>Projects Completed</StatLabel>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <StatNumber>
              100K<span>+</span>
            </StatNumber>
            <StatLabel>Daily Users</StatLabel>
          </StatItem>
        </Stats>
        <Journey>
          <TimelineContainer>
            {resumeData.journey.map((item, index) => (
              <TimelineItem
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <TimelineContent>
                  <TimelineDate>{item.date}</TimelineDate>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>{item.description}</TimelineDescription>
                  <ProjectStats>
                    {item.stats.map((stat, statIndex) => (
                      <ProjectStat key={statIndex}>
                        <span>{stat.value}</span>
                        <br />
                        {stat.label}
                      </ProjectStat>
                    ))}
                  </ProjectStats>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </Journey>
        <HireButton
          as="button"
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/#contact');
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch ↗
        </HireButton>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;
