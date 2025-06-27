import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';

const FooterContainer = styled.footer`
  background: transparent;
  padding: 60px 24px;
  color: white;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Column = styled.div`
  background: transparent;
  padding: 0;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    transform: none;
    background: transparent;
    box-shadow: none;
  }
`;

const Logo = styled.h2`
  font-size: 42px;
  margin: 0 0 24px 0;
  color: white;
  font-weight: 600;
  
  span {
    color: #9D00FF;
    background: none;
    -webkit-text-fill-color: initial;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 32px 0;
  max-width: 500px;
`;

const Title = styled.h3`
  font-size: 24px;
  margin: 0 0 24px 0;
  color: #fff;
  font-weight: 600;
  position: relative;
  padding-bottom: 12px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: #9D00FF;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Link = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #9D00FF;
    transform: none;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 24px;
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #9D00FF;
    transform: none;
  }
`;

const Footer = () => {
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
      console.error('Error fetching footer data:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // Or a loading spinner if you prefer
  }

  const { linkedin, github, instagram, twitter } = socialLinks;

  return (
    <FooterContainer>
      <FooterContent>
        {/* Left Column */}
        <Column>
          <Logo>Thanks for <span>visiting</span></Logo>
          <Description>
            created by Ajay Pandey using React, Three.js framer, and styled-components.
          </Description>
          <SocialLinks>
            {github && (
              <SocialLink href={github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </SocialLink>
            )}
            {linkedin && (
              <SocialLink href={linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </SocialLink>
            )}
            {twitter && (
              <SocialLink href={twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
            )}
            {instagram && (
              <SocialLink href={instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialLink>
            )}
          </SocialLinks>
        </Column>

        {/* Right Column */}
        <Column>
          <Title>Quick Links</Title>
          <Links>
            <Link href="/about">About</Link>
            <Link href="/portfolio">Projects</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </Links>
        </Column>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 