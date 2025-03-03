import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const VideoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const StyledVideo = styled(motion.video)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15; // Adjust this value to control video visibility
`;

const InteractiveVideo = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, []);

    return (
        <VideoWrapper>
            <StyledVideo
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                initial={{ scale: 1.2 }}
                animate={{
                    scale: [1.2, 1.3, 1.2],
                    rotate: [0, 3, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                src={require('../assets/video.mp4')}  // Add your video path here
            />
        </VideoWrapper>
    );
};

export default InteractiveVideo; 