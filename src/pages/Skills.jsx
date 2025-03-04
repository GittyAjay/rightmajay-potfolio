import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import resumeData from '../data/data.json';
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

const StyledSkillCard = styled(motion.div)`
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
`;

const SkillContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SkillIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(157, 0, 255, 0.1);
  border-radius: 12px;
  margin-right: 1rem;

  img {
    width: 35px;
    height: 35px;
    transition: transform 0.3s ease;
  }
`;

const SkillInfo = styled.div`
  flex: 1;
`;

const SkillLevel = styled.div`
  font-size: 0.9rem;
  color: #9D00FF;
  margin-top: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillTag = styled.span`
  background: rgba(157, 0, 255, 0.08);
  color: #fff;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(157, 0, 255, 0.2);

  &:hover {
    background: rgba(157, 0, 255, 0.15);
    transform: translateY(-2px);
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

  const skillsData = [
    {
      icon: adv_skills,
      title: 'Advanced Skills',
      desc: resumeData.skills.advanced.join(', '),
      level: 95,
      tags: resumeData.skills.advanced
    },
    {
      icon: performance,
      title: 'Performance',
      desc: resumeData.skills.performance.join(', '),
      level: 85,
      tags: resumeData.skills.performance
    },
    {
      icon: architecture,
      title: 'Architecture',
      desc: resumeData.skills.architecture.join(', '),
      level: 90,
      tags: resumeData.skills.architecture
    },
    {
      icon: uiux,
      title: 'UI/UX & Styling',
      desc: [...resumeData.skills.frameworks, ...resumeData.skills.styling].join(', '),
      level: 80,
      tags: [...resumeData.skills.frameworks, ...resumeData.skills.styling]
    },
    {
      icon: animation,
      title: 'Animation & Design',
      desc: [...resumeData.skills.animation, ...resumeData.skills.design_tools].join(', '),
      level: 75,
      tags: [...resumeData.skills.animation, ...resumeData.skills.design_tools]
    },
    {
      icon: '🧪',
      title: 'Testing & Quality',
      desc: [
        ...resumeData.skills.testing.unit_integration,
        ...resumeData.skills.testing.e2e,
        ...resumeData.skills.testing.performance
      ].join(', '),
      level: 85,
      tags: [
        ...resumeData.skills.testing.unit_integration,
        ...resumeData.skills.testing.e2e,
        ...resumeData.skills.testing.performance
      ]
    },
    {
      icon: '🔧',
      title: 'Backend & APIs',
      desc: [
        ...resumeData.skills.backend,
        ...resumeData.skills.api_technologies
      ].join(', '),
      level: 90,
      tags: [
        ...resumeData.skills.backend,
        ...resumeData.skills.api_technologies
      ]
    },
    {
      icon: '📊',
      title: 'Documentation & Analytics',
      desc: [...resumeData.skills.documentation, ...resumeData.skills.analytics].join(', '),
      level: 70,
      tags: [...resumeData.skills.documentation, ...resumeData.skills.analytics]
    }
  ];

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

          <SkillsGrid>
            {displayedSkills.map((skill, index) => (
              <StyledSkillCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillContent>
                  <SkillHeader>
                    <SkillIconWrapper>
                      <img src={skill.icon} alt={skill.title} />
                    </SkillIconWrapper>
                    <SkillInfo>
                      <SkillTitle>{skill.title}</SkillTitle>
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
          </SkillsGrid>
          
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


