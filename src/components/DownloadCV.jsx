import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(157, 0, 255, 0.1);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid rgba(157, 0, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(157, 0, 255, 0.2);
    border-color: rgba(157, 0, 255, 0.3);
  }
`;

const DownloadIcon = styled.span`
  font-size: 1.2rem;
`;

const DownloadCV = () => {
    return (
        <DownloadButton
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <DownloadIcon>⬇️</DownloadIcon>
            DOWNLOAD CV
        </DownloadButton>
    );
};

export default DownloadCV; 