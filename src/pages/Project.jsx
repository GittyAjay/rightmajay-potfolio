import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import resumeData from '../data/data.json';
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

const Projects = () => {
  const navigate = useNavigate();

  const projects = resumeData.projects.map((project, index) => ({
    id: index + 1,
    title: project.title,
    subtitle: project.platform?.join(', ') || '',
    description: project.achievements.join('. '),
    image: "https://via.placeholder.com/400x200",
    technologies: [
      "React Native",
      "TypeScript",
      "Redux",
      ...project.platform || []
    ],
    role: "Lead Developer",
    timeline: project.start_date ? `${project.start_date} - ${project.end_date || 'Present'}` : 'Ongoing',
    client: "Various Clients"
  }));

  const displayedProjects = projects.slice(0, 4);

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
          <HeaderSection>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              My Projects
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
              <ProjectCard
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectImage image={project.image} />
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechList>
                    {project.technologies.map((tech, index) => (
                      <TechTag key={index}>{tech}</TechTag>
                    ))}
                  </TechList>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>

          <SeeMoreButton
            onClick={handleSeeMore}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            See All Projects →
          </SeeMoreButton>
        </ContentWrapper>
      </ProjectsSection>
    </PageContainer>
  );
};

export default Projects;
