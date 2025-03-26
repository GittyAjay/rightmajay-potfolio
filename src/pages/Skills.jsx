import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import {
  PageContainer,
  SkillsSection,
  ContentWrapper,
  SkillsGrid,
  SkillCard,
  SkillTitle,
  SkillDescription
} from '../styles/SharedStyles';
import {
  HeaderSection,
  Title,
  Subtitle
} from '../styles/ProjectStyles';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4.5rem;
  width: 100%;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0;
    width: 100%;
  }
`;

const StyledSkillCard = styled(motion.div)`
  background: rgba(20, 0, 40, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(157, 0, 255, 0.15);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: rgba(157, 0, 255, 0.3);
    box-shadow: 0 8px 32px rgba(157, 0, 255, 0.1);
  }
`;

const SkillContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const SkillIconWrapper = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 0, 40, 0.6);
  border-radius: 12px;
  padding: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SkillInfo = styled.div`
  flex: 1;
`;

const StyledSkillTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
  margin: 0;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.25rem;
`;

const SkillLevel = styled.div`
  font-size: 0.95rem;
  color: #9D00FF;
  margin: 0;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const SkillTag = styled.span`
  background: rgba(20, 0, 40, 0.6);
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid rgba(157, 0, 255, 0.15);
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(157, 0, 255, 0.15);
    border-color: rgba(157, 0, 255, 0.3);
  }
`;

const GlowingButton = styled(motion.button)`
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
    background: linear-gradient(90deg, #9D00FF, #FF00E5);
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

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #9D00FF;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SkillProgress = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(157, 0, 255, 0.1);
  border-radius: 3px;
  margin: 0.5rem 0;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #9D00FF;
  width: ${props => props.level}%;
  transition: width 1s ease-out;
`;

const adv_skills = require("../assets/images/adv_skills.png");
const performance = require("../assets/images/performance.png");
const architecture = require("../assets/images/adv_skills.png");
const uiux = require("../assets/images/adv_skills.png");
const animation = require("../assets/images/adv_skills.png");

export default function Skills({ showAll = false }) {
  const navigate = useNavigate();
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const portfolioRef = ref(db, 'portfolio');
    const unsubscribe = onValue(portfolioRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Transform Firebase data into the format needed for skills
        const transformedSkills = [
          {
            icon: adv_skills,
            title: 'Advanced Skills',
            desc: data.skills.advanced.join(', '),
            level: 95,
            tags: data.skills.advanced
          },
          {
            icon: performance,
            title: 'Performance',
            desc: data.skills.performance.join(', '),
            level: 85,
            tags: data.skills.performance
          },
          {
            icon: architecture,
            title: 'Architecture',
            desc: data.skills.architecture.join(', '),
            level: 90,
            tags: data.skills.architecture
          },
          {
            icon: uiux,
            title: 'UI/UX & Styling',
            desc: [...data.skills.frameworks, ...data.skills.styling].join(', '),
            level: 80,
            tags: [...data.skills.frameworks, ...data.skills.styling]
          },
          {
            icon: animation,
            title: 'Animation & Design',
            desc: [...data.skills.animation, ...data.skills.design_tools].join(', '),
            level: 75,
            tags: [...data.skills.animation, ...data.skills.design_tools]
          },
          {
            icon: '🧪',
            title: 'Testing & Quality',
            desc: [
              ...data.skills.testing.unit_integration,
              ...data.skills.testing.e2e,
              ...data.skills.testing.performance
            ].join(', '),
            level: 85,
            tags: [
              ...data.skills.testing.unit_integration,
              ...data.skills.testing.e2e,
              ...data.skills.testing.performance
            ]
          },
          {
            icon: '🔧',
            title: 'Backend & APIs',
            desc: [
              ...data.skills.backend,
              ...data.skills.api_technologies
            ].join(', '),
            level: 90,
            tags: [
              ...data.skills.backend,
              ...data.skills.api_technologies
            ]
          },
          {
            icon: '📊',
            title: 'Documentation & Analytics',
            desc: [...data.skills.documentation, ...data.skills.analytics].join(', '),
            level: 70,
            tags: [...data.skills.documentation, ...data.skills.analytics]
          }
        ];
        setSkillsData(transformedSkills);
        setLoading(false);
      }
    }, (error) => {
      console.error('Error fetching skills:', error);
      setError('Error loading skills data');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <SkillsSection>
          <ContentWrapper>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Loading skills...
            </motion.div>
          </ContentWrapper>
        </SkillsSection>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <SkillsSection>
          <ContentWrapper>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          </ContentWrapper>
        </SkillsSection>
      </PageContainer>
    );
  }

  const displayedSkills = showAll ? skillsData : skillsData.slice(0, 4);

  return (
    <PageContainer>
      <SkillsSection>
        <ContentWrapper>
          <HeaderSection>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {showAll ? 'All Skills & Expertise' : 'Skills & Expertise'}
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive overview of my technical capabilities
            </Subtitle>
          </HeaderSection>

          <StyledGrid>
            {displayedSkills.map((skill, index) => (
              <StyledSkillCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
              >
                <SkillContent>
                  <SkillHeader>
                    <SkillIconWrapper>
                      <img src={skill.icon} alt={skill.title} />
                    </SkillIconWrapper>
                    <SkillInfo>
                      <StyledSkillTitle>{skill.title}</StyledSkillTitle>
                      <SkillLevel>Proficiency: {skill.level}%</SkillLevel>
                    </SkillInfo>
                  </SkillHeader>
                  <TagsContainer>
                    {Array.isArray(skill.tags) && skill.tags.map((tag, i) => (
                      <SkillTag key={i}>{tag}</SkillTag>
                    ))}
                  </TagsContainer>
                </SkillContent>
              </StyledSkillCard>
            ))}
          </StyledGrid>

          {!showAll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ textAlign: 'center', marginTop: '4rem' }}
            >
              <GlowingButton
                onClick={() => navigate('/all-skills')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                See All Skills →
              </GlowingButton>
            </motion.div>
          )}
        </ContentWrapper>
      </SkillsSection>
    </PageContainer>
  );
}


