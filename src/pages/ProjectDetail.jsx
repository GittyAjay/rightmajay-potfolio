import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectDetailTree from '../components/ProjectDetailTree';

const PageContainer = styled.div`
  min-height: 100vh;
  font-family: 'Satoshi', sans-serif;
`;

const ProjectSection = styled.section`
  padding: 2rem 1.5rem;
  color: #fff;
  position: relative;
  min-height: calc(100vh - 4rem);

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.25rem 0;
  font-family: 'Satoshi', sans-serif;

  &:hover {
    color: #9D00FF;
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 3rem;
`;

const ProjectTitle = styled(motion.h1)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin: 1rem 0;
  color: #fff;
`;

const ProjectSubtitle = styled(motion.h2)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: #B4B4B4;
  font-weight: 400;
  margin-bottom: 2rem;
`;

const ProjectImage = styled(motion.div)`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 3rem;
  background: ${props => `url(${props.image}) center/cover no-repeat` || 'rgba(255, 255, 255, 0.05)'};

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const VideoDemo = styled.div`
  width: 100%;
  background: rgba(20, 20, 30, 0.3);
  border-radius: 16px;
  overflow: hidden;
  margin: 1rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    
    iframe, video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
  }
`;

const VideoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
  height: 60px;
  display: flex;
  align-items: center;
`;

const ProjectInfo = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  margin: 1rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectDescription = styled.div`
  width: 100%;
  max-width: 100%;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #fff;
  }

  li {
    color: #B4B4B4;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 0.75rem;
    list-style: none;
    position: relative;
    padding-left: 1.25rem;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #9D00FF;
      font-size: 1rem;
    }
  }
`;

const ProjectDetails = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #fff;
  }
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: rgba(157, 0, 255, 0.1);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  border: 1px solid rgba(157, 0, 255, 0.2);
`;

const TechStack = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #fff;
  }
`;

const TechItem = styled.span`
  background: rgba(157, 0, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #fff;
  font-weight: 400;
`;

const ProjectSidebar = styled.div`
  background: rgba(20, 20, 30, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: fit-content;
  position: sticky;
  top: 1.5rem;

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: #fff;
  }

  @media (max-width: 1024px) {
    position: static;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  margin-bottom: 1.25rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  color: #9D00FF;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const Value = styled.div`
  color: #fff;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const PlatformSection = styled.div`
  margin-top: 3rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #fff;
  }
`;

const TreeSection = styled.div`
  margin: 1rem 0;
  width: 100%;
  background: rgba(20, 20, 30, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FloatingVideoContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 320px;
  background: rgba(20, 20, 30, 0.95);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(157, 0, 255, 0.2);
  cursor: grab;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);

  &:active {
    cursor: grabbing;
  }

  &:hover {
    box-shadow: 0 12px 40px rgba(157, 0, 255, 0.15);
    border-color: rgba(157, 0, 255, 0.4);
  }

  .video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2);
    
    iframe, video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      pointer-events: auto;
    }
  }
`;

const FloatingVideoTitle = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(157, 0, 255, 0.1);
  border-bottom: 1px solid rgba(157, 0, 255, 0.2);

  h3 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      width: 16px;
      height: 16px;
      opacity: 0.8;
    }
  }

  .expand-hint {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const ExpandedVideoOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 1.5rem;
  backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const ExpandedVideoContainer = styled(motion.div)`
  width: 95%;
  max-width: 1600px;
  height: 95vh;
  background: rgba(20, 20, 30, 0.95);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(157, 0, 255, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }

  .video-container {
    flex: 1;
    position: relative;
    width: 100%;
    height: calc(100% - 70px);
    background: #000;
    
    iframe, video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
  }
`;

const ExpandedVideoHeader = styled.div`
  height: 70px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(20, 20, 30, 0.95);
  border-bottom: 1px solid rgba(157, 0, 255, 0.2);
  position: relative;
  pointer-events: auto; /* Ensures header remains interactive */

  .title-section {
    display: flex;
    align-items: center;
    gap: 12px;

    svg {
      width: 24px;
      height: 24px;
      color: #9D00FF;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #fff;
      margin: 0;
    }
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(157, 0, 255, 0.4);
    transform: scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = parseInt(id) - 1;
  const project = projects[projectIndex];
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [floatingPosition, setFloatingPosition] = useState({ x: 0, y: 0 });
  const [dragConstraints, setDragConstraints] = useState({
    top: 0,
    left: -window.innerWidth + 320,
    right: 0,
    bottom: window.innerHeight - 200
  });

  useEffect(() => {
    const handleResize = () => {
      setDragConstraints({
        top: 0,
        left: -window.innerWidth + 320,
        right: 0,
        bottom: window.innerHeight - 200
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!project) {
    return (
      <PageContainer>
        <ProjectSection>
          <ContentWrapper>
            <BackButton onClick={() => navigate('/projects')} whileHover={{ x: -5 }}>
              ← Back to Projects
            </BackButton>
            <ProjectTitle>Project not found</ProjectTitle>
          </ContentWrapper>
        </ProjectSection>
      </PageContainer>
    );
  }
  console.log("project1211", project);
  return (
    <PageContainer>
      <ProjectSection>
        <ContentWrapper>
          <BackButton onClick={() => navigate('/projects')} whileHover={{ x: -5 }}>
            ← Back to Projects
          </BackButton>

          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDetailTree project={project} />
          {project.videoUrl && (
            <>
              <AnimatePresence>
                {!isVideoExpanded && (
                  <FloatingVideoContainer
                    drag
                    dragMomentum={false}
                    dragElastic={0}
                    dragConstraints={dragConstraints}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: floatingPosition.x, y: floatingPosition.y, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onDragEnd={(_, info) => {
                      setFloatingPosition({
                        x: floatingPosition.x + info.offset.x,
                        y: floatingPosition.y + info.offset.y
                      });
                    }}
                  >
                    <FloatingVideoTitle onClick={() => setIsVideoExpanded(true)}>
                      <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4 8H2v12a2 2 0 002 2h12v-2H4V8z" /><path d="M20 2H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm-9 12V6l7 4-7 4z" />
                        </svg>
                        Project Demo
                      </h3>
                      <span className="expand-hint">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                        </svg>
                        Click to expand
                      </span>
                    </FloatingVideoTitle>
                    <div className="video-container">
                      <iframe
                        src={project.videoUrl}
                        title="Project Demo Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </FloatingVideoContainer>
                )}

                {isVideoExpanded && (
                  <ExpandedVideoOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => {
                      if (e.target === e.currentTarget) {
                        setIsVideoExpanded(false);
                      }
                    }}
                  >
                    <ExpandedVideoContainer
                      animate={{
                        scale: 1,
                        opacity: 1
                      }}
                      initial={{ scale: 0.95, opacity: 0 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <ExpandedVideoHeader>
                        <div className="title-section">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm8 3l5 3-5 3V9z" />
                          </svg>
                          <h3>Project Demo</h3>
                        </div>
                        <div className="controls">
                          <CloseButton onClick={() => setIsVideoExpanded(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z" />
                            </svg>
                          </CloseButton>
                        </div>
                      </ExpandedVideoHeader>
                      <div className="video-container">
                        <iframe
                          src={project.videoUrl}
                          title="Project Demo Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </ExpandedVideoContainer>
                  </ExpandedVideoOverlay>
                )}
              </AnimatePresence>
            </>
          )}


          <ProjectInfo>
            <ProjectDescription>
              <h3>About the Project</h3>
              {project.achievements?.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ProjectDescription>

            <ProjectSidebar>
              <h3>Project Details</h3>

              <DetailItem>
                <Label>Role</Label>
                <Value>{project.role || 'Lead Developer'}</Value>
              </DetailItem>

              <DetailItem>
                <Label>Timeline</Label>
                <Value>{project.timeline || '2021-11 - 2022-07'}</Value>
              </DetailItem>

              <DetailItem>
                <Label>Client</Label>
                <Value>{project.client || 'Confidential'}</Value>
              </DetailItem>

              <DetailItem>
                <Label>Team</Label>
                <Value>{project.team || 'Development Team'}</Value>
              </DetailItem>

              <DetailItem>
                <Label>Tools Used</Label>
                <Value>{project.tools || 'React Native, TypeScript'}</Value>
              </DetailItem>
            </ProjectSidebar>
          </ProjectInfo>


        </ContentWrapper>
      </ProjectSection>
    </PageContainer>
  );
};

export default ProjectDetail; 