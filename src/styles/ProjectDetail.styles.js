import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  min-height: 100vh;
  font-family: 'Satoshi', sans-serif;
`;

export const ProjectSection = styled.section`
  padding: 6rem 2rem;
  color: #fff;
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const BackButton = styled(motion.button)`
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  font-family: 'Satoshi', sans-serif;

  &:hover {
    color: #9D00FF;
  }
`;

export const ProjectHeader = styled.div`
  margin-bottom: 3rem;
`;

export const ProjectTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  margin: 2rem 0;
  color: #fff;
`;

export const ProjectInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const ProjectDescription = styled.div`
  max-width: 60%;

  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: #fff;
  }

  li {
    color: #B4B4B4;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
    list-style: none;
    position: relative;
    padding-left: 1.5rem;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #9D00FF;
    }
  }
`;

export const ProjectSidebar = styled.div`
  background: rgba(20, 20, 30, 0.5);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #fff;
  }
`;

export const DetailItem = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.div`
  color: #9D00FF;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

export const Value = styled.div`
  color: #fff;
  font-size: 1rem;
`;

export const TreeSection = styled.div`
  margin-top: 4rem;
  width: 100%;
`; 