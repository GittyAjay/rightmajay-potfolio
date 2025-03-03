import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  min-height: 100vh;
  color: #fff;
  padding: 6rem 2rem;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  font-family: 'Satoshi', sans-serif;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #fff 0%, #8a8a8a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }

  p {
    color: #888;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-weight: 400;
  }
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

const About = () => {
  return (
    <AboutSection>

      <AboutContent>
        <AboutText>
          <h3>My Journey</h3>
          <p>
            I embarked on my web development journey with a passion for creating
            digital experiences that make a difference. Over the years, I've
            worked on various projects ranging from small business websites to
            complex web applications.
          </p>
          <p>
            My approach combines technical expertise with creative problem-solving,
            ensuring that every project I undertake is both functional and
            aesthetically pleasing.
          </p>
        </AboutText>
        <ExperienceGrid>
          <ExperienceCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>5+ Years</h3>
            <p>Experience in Web Development</p>
          </ExperienceCard>
          <ExperienceCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>50+ Projects</h3>
            <p>Successfully Completed</p>
          </ExperienceCard>
          <ExperienceCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>20+ Clients</h3>
            <p>Satisfied Customers</p>
          </ExperienceCard>
        </ExperienceGrid>
      </AboutContent>
    </AboutSection>
  );
};

export default About; 