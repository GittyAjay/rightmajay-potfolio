import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaBehance, FaDiscord } from 'react-icons/fa';
import data from '../data/data.json';

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
    const { linkedin, github, instagram, twitter } = data;

    return (
        <SocialLinksContainer>
            <SocialLink
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaTwitter />
            </SocialLink>
            <SocialLink
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaLinkedinIn />
            </SocialLink>
            <SocialLink
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaGithub />
            </SocialLink>
            <SocialLink
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaInstagram />
            </SocialLink>
        </SocialLinksContainer>
    );
};

export default SocialLinks; 