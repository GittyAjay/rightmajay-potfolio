import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SocialLinksContainer = styled.div`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 100;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SocialLink = styled(motion.a)`
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #9D00FF;
  }
`;

const SocialLinks = () => {
    return (
        <SocialLinksContainer>
            <SocialLink
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                𝕏
            </SocialLink>
            <SocialLink
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                Bē
            </SocialLink>
            <SocialLink
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                ⌬
            </SocialLink>
        </SocialLinksContainer>
    );
};

export default SocialLinks; 