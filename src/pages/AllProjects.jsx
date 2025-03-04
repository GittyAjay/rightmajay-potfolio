import React from 'react';
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
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BackButton = styled(motion.button)`
  background: transparent;
  border: 1px solid rgba(157, 0, 255, 0.3);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(157, 0, 255, 0.1);
    border-color: rgba(157, 0, 255, 0.5);
  }
`;

const AllProjects = () => {
    const handleBack = () => {
        window.history.back();
    };

    // Get all projects from resume data
    const projects = resumeData.projects.map((project, index) => ({
        id: index + 1,
        title: project.title,
        subtitle: project.platform?.join(', ') || '',
        description: project.achievements[0], // Show first achievement to keep cards cleaner
        image: "https://via.placeholder.com/400x200",
        technologies: [
            ...project.platform || [],
            "React Native",
            "TypeScript",
            "Redux"
        ],
        timeline: project.start_date ? `${project.start_date} - ${project.end_date || 'Present'}` : 'Ongoing'
    }));

    return (
        <PageContainer>
            <ProjectsSection>
                <ContentWrapper>
                    <BackButton
                        onClick={handleBack}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        ← Back
                    </BackButton>
                    
                    <HeaderSection>
                        <Title
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Project Portfolio
                        </Title>
                        <Subtitle
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Comprehensive collection of my professional work
                        </Subtitle>
                    </HeaderSection>

                    <ProjectsGrid>
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <ProjectImage image={project.image} />
                                <ProjectContent>
                                    <ProjectTitle>{project.title}</ProjectTitle>
                                    <ProjectDescription>
                                        {project.description}
                                    </ProjectDescription>
                                    <TechList>
                                        {project.technologies.map((tech, index) => (
                                            <TechTag key={index}>{tech}</TechTag>
                                        ))}
                                    </TechList>
                                </ProjectContent>
                            </ProjectCard>
                        ))}
                    </ProjectsGrid>
                </ContentWrapper>
            </ProjectsSection>
        </PageContainer>
    );
};

export default AllProjects; 