import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

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

  @media (max-width: 768px) {
    padding: 12px 32px;
    font-size: 16px;
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    padding: 10px 24px;
    font-size: 14px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(90deg, #00ffbb, #00a2ff);
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

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 30px rgba(0, 162, 255, 0.5);
    }
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 0 15px rgba(0, 162, 255, 0.3);
  }
`;

const MoveToPortfolio = () => {
  return (
    <GlowingButton
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        window.location.href = '/portfolio';
      }}
    >
      Portfolio
    </GlowingButton>
  );
};

export default MoveToPortfolio;
