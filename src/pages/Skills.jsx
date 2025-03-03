import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  font-family: 'Satoshi', sans-serif;
`;

const SkillsSection = styled.section`
  min-height: 100vh;
  color: #fff;
  padding: 6rem 2rem;
  position: relative;
  // Remove or make this more transparent:
  // background: rgba(157, 0, 255, 0.05);
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

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding: 0 2rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
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
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    border-color: rgba(157, 0, 255, 0.5);
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #9D00FF;
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const SkillDescription = styled.p`
  color: #a0a0a0;
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 400;
`;

export default function Skills() {
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
            {[
              { icon: '⚛️', title: 'Frontend Development', desc: 'Creating beautiful and responsive user interfaces with React, Vue, and modern CSS.' },
              { icon: '🛠️', title: 'Backend Development', desc: 'Building robust server-side applications with Node.js, Python, and databases.' },
              { icon: '📱', title: 'Mobile Development', desc: 'Developing cross-platform mobile applications using React Native.' },
              { icon: '🎨', title: 'UI/UX Design', desc: 'Designing intuitive and engaging user experiences with Figma and Adobe XD.' }
            ].map((skill, index) => (
              <SkillCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <SkillIcon>{skill.icon}</SkillIcon>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillDescription>{skill.desc}</SkillDescription>
              </SkillCard>
            ))}
          </SkillsGrid>
        </ContentWrapper>
      </SkillsSection>
    </PageContainer>
  );
}


