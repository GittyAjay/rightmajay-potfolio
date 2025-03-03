import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

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
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff 0%, #8a8a8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #fff;
  }

  p {
    color: #B4B4B4;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-weight: 400;
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

  h4 {
    font-size: 1rem;
    font-weight: 500;
    color: #9D00FF;
    margin-bottom: 0.5rem;
  }

  p {
    color: #B4B4B4;
    font-size: 1rem;
    font-weight: 400;
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
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #fff;
  font-weight: 400;
`;

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // This would typically come from an API or database
  const project = {
    id: 1,
    title: "Project One",
    subtitle: "A modern web application",
    description: "A sophisticated web application built with modern technologies, focusing on user experience and performance. The project involved creating a responsive and intuitive interface that seamlessly integrates with a robust backend system.",
    longDescription: `This project represents a significant milestone in modern web development, showcasing the power of combining cutting-edge technologies with user-centric design principles. The application features a responsive layout that adapts seamlessly across all device sizes, ensuring a consistent and engaging user experience.

    Key features include:
    • Real-time data synchronization
    • Advanced search and filtering capabilities
    • Interactive data visualization
    • Secure user authentication
    • Optimized performance metrics`,
    image: "https://via.placeholder.com/1200x600",
    technologies: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Tailwind CSS"],
    role: "Full Stack Developer",
    timeline: "3 months",
    client: "Client Name",
    team: "Solo Project",
    tools: "VS Code, Git, Docker, AWS"
  };

  return (
    <PageContainer>
      <ProjectSection>
        <ContentWrapper>
          <BackButton
            onClick={() => navigate('/projects')}
            whileHover={{ x: -5 }}
          >
            ← Back to Projects
          </BackButton>

          <ProjectHeader>
            <ProjectTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {project.title}
            </ProjectTitle>
            <ProjectSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.subtitle}
            </ProjectSubtitle>
          </ProjectHeader>

          <ProjectImage
            image={project.image}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />

          <ProjectInfo>
            <ProjectDescription>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                About the Project
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {project.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {project.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </motion.div>
            </ProjectDescription>

            <ProjectDetails>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Project Details
              </motion.h3>
              <DetailItem>
                <h4>Role</h4>
                <p>{project.role}</p>
              </DetailItem>
              <DetailItem>
                <h4>Timeline</h4>
                <p>{project.timeline}</p>
              </DetailItem>
              <DetailItem>
                <h4>Client</h4>
                <p>{project.client}</p>
              </DetailItem>
              <DetailItem>
                <h4>Team</h4>
                <p>{project.team}</p>
              </DetailItem>
              <DetailItem>
                <h4>Tools Used</h4>
                <p>{project.tools}</p>
              </DetailItem>
              <DetailItem>
                <h4>Technologies</h4>
                <TechList>
                  {project.technologies.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechList>
              </DetailItem>
            </ProjectDetails>
          </ProjectInfo>
        </ContentWrapper>
      </ProjectSection>
    </PageContainer>
  );
};

export default ProjectDetail; 