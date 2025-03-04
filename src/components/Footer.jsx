import React from 'react';
import styled from 'styled-components';

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
            <SocialLink href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </SocialLink>
            <SocialLink href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
          </SocialLinks>
        </Column>

        {/* Right Column */}
        <Column>
          <Title>Quick Links</Title>
          <Links>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </Links>
        </Column>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 