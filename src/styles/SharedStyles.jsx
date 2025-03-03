import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  font-family: 'Satoshi', sans-serif;
`;

export const SkillsSection = styled.section`
  min-height: 100vh;
  color: #fff;
  padding: 6rem 2rem;
  position: relative;
`;

export const SectionTitle = styled(motion.h2)`
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

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding: 0 2rem;
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  min-height: 320px;
  height: 100%;
  gap: 1rem;

  &:hover {
    border-color: rgba(157, 0, 255, 0.5);
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const SkillTitle = styled.h3`
  font-size: 1.25rem;
  color: #fff;
  font-weight: 500;
  margin: 0;
  min-height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SkillDescription = styled.p`
  color: #a0a0a0;
  font-size: 0.9rem;
  line-height: 1.6;
  font-weight: 400;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 6em;
`; 