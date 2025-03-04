import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import projectsData from '../data/data.json';

const PageContainer = styled.div`
  min-height: 100vh;
  font-family: 'Satoshi', sans-serif;
`;

const ProjectSection = styled.section`
  padding: 6rem 2rem;
  color: #fff;
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  font-family: 'Satoshi', sans-serif;

  &:hover {
    color: #9D00FF;
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 3rem;
`;

const ProjectTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  margin: 2rem 0;
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

const ProjectInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProjectDescription = styled.div`
  max-width: 60%;

  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: #fff;
  }

  li {
    color: #B4B4B4;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
    list-style: none;
    position: relative;
    padding-left: 1.5rem;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #9D00FF;
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

const DetailItem = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
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
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SidebarSection = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.div`
  color: #9D00FF;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const Value = styled.div`
  color: #fff;
  font-size: 1rem;
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

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = parseInt(id) - 1;
  const project = projectsData?.projects?.[projectIndex];

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

  return (
    <PageContainer>
      <ProjectSection>
        <ContentWrapper>
          <BackButton onClick={() => navigate('/projects')} whileHover={{ x: -5 }}>
            ← Back to Projects
          </BackButton>

          <ProjectTitle>{project.title}</ProjectTitle>

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

          <PlatformSection>
            <h3>Platform:</h3>
            <TechList>
              {project.platform?.map((tech, index) => (
                <TechTag key={index}>{tech}</TechTag>
              ))}
            </TechList>
          </PlatformSection>
        </ContentWrapper>
      </ProjectSection>
    </PageContainer>
  );
};

export default ProjectDetail; 