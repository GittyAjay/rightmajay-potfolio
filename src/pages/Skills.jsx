import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import resumeData from '../data/data.json';
import {
  PageContainer,
  SkillsSection,
  ContentWrapper,
  SectionTitle,
  SkillsGrid,
  SkillCard,
  SkillTitle,
  SkillDescription
} from '../styles/SharedStyles';

const SkillIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #9D00FF;
`;

const SeeMoreButton = styled(motion.button)`
  background: rgba(157, 0, 255, 0.1);
  border: 1px solid rgba(157, 0, 255, 0.3);
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 8rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(157, 0, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export default function Skills() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const skillsData = [
    {
      icon: '⚛️',
      title: 'Advanced Skills',
      desc: resumeData.skills.advanced.join(', ')
    },
    {
      icon: '⚡',
      title: 'Performance',
      desc: resumeData.skills.performance.join(', ')
    },
    {
      icon: '🏗️',
      title: 'Architecture',
      desc: resumeData.skills.architecture.join(', ')
    },
    {
      icon: '🎨',
      title: 'UI/UX & Styling',
      desc: [...resumeData.skills.frameworks, ...resumeData.skills.styling].join(', ')
    },
    {
      icon: '✨',
      title: 'Animation & Design',
      desc: [...resumeData.skills.animation, ...resumeData.skills.design_tools].join(', ')
    },
    {
      icon: '🧪',
      title: 'Testing & Quality',
      desc: [
        ...resumeData.skills.testing.unit_integration,
        ...resumeData.skills.testing.e2e,
        ...resumeData.skills.testing.performance
      ].join(', ')
    },
    {
      icon: '🔧',
      title: 'Backend & APIs',
      desc: [
        ...resumeData.skills.backend,
        ...resumeData.skills.api_technologies
      ].join(', ')
    },
    {
      icon: '📊',
      title: 'Documentation & Analytics',
      desc: [...resumeData.skills.documentation, ...resumeData.skills.analytics].join(', ')
    }
  ];

  const displayedSkills = showAll ? skillsData : skillsData.slice(0, 4);

  const handleSeeMore = () => {
    navigate('/skills');
  };

  return (
    <PageContainer>
      <SkillsSection>
        <ContentWrapper>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Skills & Expertise ↘
          </SectionTitle>
          <SkillsGrid>
            {displayedSkills.map((skill, index) => (
              <SkillCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <SkillIcon>{skill.icon}</SkillIcon>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillDescription>
                  {skill.desc.length > 150
                    ? `${skill.desc.substring(0, 150)}...`
                    : skill.desc}
                </SkillDescription>
              </SkillCard>
            ))}
          </SkillsGrid>
          {!showAll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ textAlign: 'center' }}
            >
              <SeeMoreButton onClick={handleSeeMore}>
                See All Skills →
              </SeeMoreButton>
            </motion.div>
          )}
        </ContentWrapper>
      </SkillsSection>
    </PageContainer>
  );
}


