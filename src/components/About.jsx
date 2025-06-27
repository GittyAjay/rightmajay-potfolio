import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';

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
    background: linear-gradient(90deg, #9D00FF, #FF00E5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
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
  background: rgba(157, 0, 255, 0.05);
  border: 1px solid rgba(157, 0, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    background: rgba(157, 0, 255, 0.1);
    box-shadow: 0 10px 20px rgba(157, 0, 255, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #9D00FF, #FF00E5);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  h3 {
    font-weight: 700;
    margin-bottom: 1rem;
    color: #9D00FF;
  }

  p {
    font-weight: 400;
    color: #fff;
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
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const portfolioRef = ref(db, 'portfolio');
    const unsubscribe = onValue(portfolioRef, (snapshot) => {
      if (snapshot.exists()) {
        setPortfolioData(snapshot.val());
        setLoading(false);
      }
    }, (error) => {
      console.error('Error fetching about data:', error);
      setError('Failed to load data');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Calculate years and months of experience
  const calculateExperience = () => {
    if (!portfolioData) return 0;
    const startDate = new Date(portfolioData.work_experience[0].start_date);
    const currentDate = new Date();
    
    const totalMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
                       (currentDate.getMonth() - startDate.getMonth());
    
    const years = totalMonths / 12;
    
    return years.toFixed(1);
  };

  if (loading) {
    return (
      <AboutSection>
        <AboutContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading...
          </motion.div>
        </AboutContent>
      </AboutSection>
    );
  }

  if (error) {
    return (
      <AboutSection>
        <AboutContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        </AboutContent>
      </AboutSection>
    );
  }

  // Get latest work experience achievements
  const latestAchievements = portfolioData.work_experience[0].achievements;
  
  // Calculate experience once and store it
  const experience = calculateExperience();

  return (
    <AboutSection>
      <AboutContent>
        <AboutText>
          <h3>My Journey</h3>
          <p>
            {portfolioData.career_objective}
          </p>
          <p>
            {latestAchievements[0]}
          </p>
        </AboutText>
        <ExperienceGrid>
          <ExperienceCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{experience} yr</h3>
            <p>Experience in {portfolioData.skills.advanced[0]}</p>
          </ExperienceCard>
          <ExperienceCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{portfolioData.projects.length}+ Projects</h3>
            <p>Successfully Completed</p>
          </ExperienceCard>
          <ExperienceCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>100K+ Users</h3>
            <p>Daily Active Users</p>
          </ExperienceCard>
          <ExperienceCard
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>40% Improvement</h3>
            <p>In Development Efficiency</p>
          </ExperienceCard>
        </ExperienceGrid>
      </AboutContent>
    </AboutSection>
  );
};

export default About;    