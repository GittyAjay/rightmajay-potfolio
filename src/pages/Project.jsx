import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import {
  PageContainer,
  ProjectsSection,
  ContentWrapper,
  HeaderSection,
  Title,
  Subtitle,
  ProjectsGrid,
  ProjectCard,
  ProjectImage,
  ProjectContent,
  ProjectTitle,
  ProjectDescription,
  TechList,
  TechTag
} from '../styles/ProjectStyles';

const SeeMoreButton = styled(motion.button)`
  background: rgba(157, 0, 255, 0.1);
  border: 1px solid rgba(157, 0, 255, 0.3);
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  margin: 2rem auto 0;
  transition: all 0.3s ease;
  display: block;

  &:hover {
    background: rgba(157, 0, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const StyledProjectCard = styled(motion.div)`
  background: rgba(157, 0, 255, 0.05);
  border: 1px solid rgba(157, 0, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    background: rgba(157, 0, 255, 0.1);
    box-shadow: 0 10px 20px rgba(157, 0, 255, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #9D00FF, #FF00E5);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ProjectImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(157, 0, 255, 0.1);
  border-radius: 12px;
  margin-right: 1rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const BackButton = styled(motion.button)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(157, 0, 255, 0.2);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: absolute;
  top: -3rem;
  left: 0;

  &:hover {
    background: rgba(157, 0, 255, 0.1);
    border-color: rgba(157, 0, 255, 0.3);
  }
`;

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

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(90deg, #9D00FF, #FF00E5);
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(157, 0, 255, 0.5);
  }
`;

const MoveToProject = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(157, 0, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(157, 0, 255, 0.2);
    transform: translateY(-2px);
    
    svg {
      transform: translate(2px, -2px);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

const Projects = () => {
  const navigate = useNavigate();
  const isFullList = window.location.pathname === '/projects';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const portfolioRef = ref(db, 'portfolio');
    const unsubscribe = onValue(portfolioRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // console.log("initial projects", data.projects);
        // Transform the projects data
        const transformedProjects = data.projects.map((project, index) => {
          if(index === 0){
            console.log("project", project);
          }
          return {
            id: index + 1,
            title: project.title,
            projectUrl: project.url,
            subtitle: project.platform?.join(', ') || '',
          description: project.achievements.join('. '),
          image: project.image || "https://via.placeholder.com/400x200",
          technologies: [
            "React Native",
            "TypeScript",
            "Redux",
            ...project.platform || []
          ],
          role: "Lead Developer",
          timeline: project.start_date ? `${project.start_date} - ${project.end_date || 'Present'}` : 'Ongoing',
          client: "Various Clients"
        }
      });
        setProjects(transformedProjects);
        setLoading(false);
      }
    }, (error) => {
      console.error('Error fetching projects:', error);
      setError('Error loading projects data');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <ProjectsSection>
          <ContentWrapper>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Loading projects...
            </motion.div>
          </ContentWrapper>
        </ProjectsSection>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ProjectsSection>
          <ContentWrapper>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          </ContentWrapper>
        </ProjectsSection>
      </PageContainer>
    );
  }

  // Use all projects if on full list view, otherwise show only first 3
  const displayedProjects = isFullList ? projects : projects.slice(0, 3);
  console.log("displayedProjects1211", projects);
  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleSeeMore = () => {
    navigate('/projects');
  };

  return (
    <PageContainer>
      <ProjectsSection>
        <ContentWrapper>
          {isFullList && (
            <BackButton
              onClick={() => navigate('/')} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ← Back
            </BackButton>
          )}
          <HeaderSection>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isFullList ? 'All Projects' : 'My Projects'}
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A showcase of my work in mobile and web development
            </Subtitle>
          </HeaderSection>

          <ProjectsGrid>
            {displayedProjects.map((project, index) => (
              <StyledProjectCard
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectHeader>
                  {project.projectUrl && (
                    <MoveToProject onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.projectUrl, '_blank');
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </MoveToProject>
                  )}
                  <ProjectImageWrapper>
                    <img src={project.image} alt={project.title} />
                  </ProjectImageWrapper>
                  <div>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <div style={{ color: '#9D00FF', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      {project.timeline}
                    </div>
                  </div>
                </ProjectHeader>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechList>
                  {project.technologies.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechList>
              </StyledProjectCard>
            ))}
          </ProjectsGrid>
          
          {!isFullList && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ textAlign: 'center', marginTop: '4rem' }}
            >
              <GlowingButton
                onClick={handleSeeMore}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                See All Projects →
              </GlowingButton>
            </motion.div>
          )}
        </ContentWrapper>
      </ProjectsSection>
    </PageContainer>
  );
};

export default Projects;
