import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Skills from './Skills';

const AllSkillsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
`;

const BackButton = styled(motion.button)`
  background: transparent;
  border: 1px solid rgba(157, 0, 255, 0.3);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(157, 0, 255, 0.1);
    border-color: rgba(157, 0, 255, 0.5);
  }
`;

export default function AllSkills() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <AllSkillsContainer>
      <BackButton
        onClick={handleBack}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ← Back
      </BackButton>
      <Skills showAll={true} />
    </AllSkillsContainer>
  );
}

