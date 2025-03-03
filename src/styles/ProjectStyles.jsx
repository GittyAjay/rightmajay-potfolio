import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  min-height: 100vh;
`;

export const ProjectsSection = styled.section`
  padding: 6rem 1rem;
  position: relative;
  color: #fff;

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    gap: 4rem;
  }
`;

export const HeaderSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Title = styled(motion.h1)`
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, #8a8a8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
`;

export const Subtitle = styled(motion.h2)`
  font-size: clamp(1rem, 2.5vw, 1.8rem);
  color: #B4B4B4;
  margin: 1rem 0 1.5rem;
  font-weight: 400;
  line-height: 1.6;

  @media (min-width: 768px) {
    margin: 1.5rem 0 2rem;
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  padding: 0 0.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 0 1rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`;

export const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-5px);
      border-color: rgba(157, 0, 255, 0.3);
    }
  }

  @media (hover: none) {
    &:active {
      transform: scale(0.98);
      border-color: rgba(157, 0, 255, 0.3);
    }
  }
`;

export const ProjectImage = styled.div`
  width: 100%;
  height: 180px;
  background: ${props => `url(${props.image}) center/cover no-repeat` || 'rgba(255, 255, 255, 0.05)'};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    height: 200px;
  }
`;

export const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 0.75rem;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const ProjectDescription = styled.p`
  color: #B4B4B4;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (min-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;

  @media (min-width: 768px) {
    gap: 0.5rem;
  }
`;

export const TechTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #fff;
  white-space: nowrap;
  
  @media (hover: hover) {
    &:hover {
      background: rgba(157, 0, 255, 0.2);
    }
  }

  @media (min-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    border-radius: 20px;
  }
`; 