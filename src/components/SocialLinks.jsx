import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaBehance, FaDiscord } from 'react-icons/fa';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';

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
    const [socialLinks, setSocialLinks] = useState({
        linkedin: '',
        github: '',
        instagram: '',
        twitter: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const portfolioRef = ref(db, 'portfolio');
        const unsubscribe = onValue(portfolioRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setSocialLinks({
                    linkedin: data.linkedin || '',
                    github: data.github || '',
                    instagram: data.instagram || '',
                    twitter: data.twitter || ''
                });
                setLoading(false);
            }
        }, (error) => {
            console.error('Error fetching social links:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return null; // Or a loading spinner if you prefer
    }

    const { linkedin, github, instagram, twitter } = socialLinks;

    return (
        <SocialLinksContainer>
            {twitter && (
                <SocialLink
                    href={twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaTwitter />
                </SocialLink>
            )}
            {linkedin && (
                <SocialLink
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaLinkedinIn />
                </SocialLink>
            )}
            {github && (
                <SocialLink
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaGithub />
                </SocialLink>
            )}
            {instagram && (
                <SocialLink
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaInstagram />
                </SocialLink>
            )}
        </SocialLinksContainer>
    );
};

export default SocialLinks; 