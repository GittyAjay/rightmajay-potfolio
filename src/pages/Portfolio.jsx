import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import projects from '../data/projects'; // Update import to use default export

const PageContainer = styled.div`
  min-height: 100vh;
  background: #000;
  color: #fff;
  overflow-x: hidden;
  font-family: 'Satoshi', sans-serif;
`;

const ProjectsContainer = styled.div`
  padding: 2rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ProjectWrapper = styled(motion.div)`
  margin: 15vh 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  min-height: 500px;
  padding: 0 2rem;

  @media (max-width: 1200px) {
    gap: 2rem;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 0 1rem;
    min-height: auto;
  }
`;

const ProjectImagesContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 45%;
  height: 90vh;

  @media (max-width: 768px) {
    max-width: 100%;
    grid-template-columns: 1fr;
  }
`;

const ProjectImageCard = styled(motion.div)`
  width: 100%;
  aspect-ratio: auto;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background: #1a1a1a;
  border: 1px solid rgba(157, 0, 255, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .image-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    font-size: 0.9rem;
    text-align: center;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  &:hover .image-label {
    transform: translateY(0);
  }
`;

const ProjectContent = styled(motion.div)`
  flex: 1;
  padding: 2rem;
  background: rgba(157, 0, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(157, 0, 255, 0.1);
  backdrop-filter: blur(10px);
  align-self: center;
  max-width: 45%;
  height: fit-content;
`;

const ProjectTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #9d00ff, #ff00e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Satoshi', sans-serif;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const TechTag = styled.span`
  background: rgba(157, 0, 255, 0.1);
  border: 1px solid rgba(157, 0, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #9d00ff;
  font-family: 'Satoshi', sans-serif;
`;

const ViewButton = styled(motion.button)`
  background: rgba(157, 0, 255, 0.1);
  border: 1px solid rgba(157, 0, 255, 0.3);
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  font-family: 'Satoshi', sans-serif;

  &:hover {
    background: rgba(157, 0, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const fallbackImages = [
  'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8439094/pexels-photo-8439094.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/5926397/pexels-photo-5926397.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const defaultLabels = [
  'Login/Homepage',
  'Dashboard View',
  'Mobile Interface',
  'Features Overview',
  'Settings Panel',
];

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;

  .modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;

    img {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 8px;
    }
  }

  .close-button {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;

    &:hover {
      color: #9d00ff;
    }
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(157, 0, 255, 0.2);
    border: 1px solid rgba(157, 0, 255, 0.3);
    color: white;
    padding: 1rem;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(157, 0, 255, 0.4);
    }

    &.prev {
      left: 1rem;
    }

    &.next {
      right: 1rem;
    }
  }
`;

const ProjectImage = ({ images, labels }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const displayImages = images?.length ? images : fallbackImages;
  const displayLabels = labels?.length ? labels : defaultLabels;

  const handleImageClick = (index) => {
    setSelectedImage(displayImages[index]);
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const newIndex = prev - 1 < 0 ? displayImages.length - 1 : prev - 1;
      setSelectedImage(displayImages[newIndex]);
      return newIndex;
    });
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const newIndex = prev + 1 >= displayImages.length ? 0 : prev + 1;
      setSelectedImage(displayImages[newIndex]);
      return newIndex;
    });
  };

  return (
    <>
      <ProjectImagesContainer>
        {displayImages.slice(0, 5).map((image, index) => (
          <ProjectImageCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image}
              alt={displayLabels[index]}
              loading="lazy"
              onError={(e) => {
                console.log('Image failed to load, using fallback');
                e.target.src = fallbackImages[index % fallbackImages.length];
              }}
            />
            <div className="image-label">
              {displayLabels[index] || `View ${index + 1}`}
            </div>
          </ProjectImageCard>
        ))}
      </ProjectImagesContainer>

      {selectedImage && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>
              ×
            </button>
            <img src={selectedImage} alt="Full size view" />
            {displayImages.length > 1 && (
              <>
                <button className="nav-button prev" onClick={handlePrevious}>
                  ←
                </button>
                <button className="nav-button next" onClick={handleNext}>
                  →
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

const ProjectCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  max-width: 400px;

  // Pin styling
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: #ff6b6b;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectNumber = styled.div`
  font-size: 1.2rem;
  color: #ff6b6b;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ProjectDetails = styled.div`
  color: #888;
  font-size: 0.9rem;

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 0.5rem 0;
      display: flex;
      align-items: center;

      &::before {
        content: '•';
        color: #ff6b6b;
        margin-right: 0.5rem;
      }
    }
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  display: inline-block;
  background: ${(props) =>
    props.status === 'Completed'
      ? 'rgba(0, 255, 0, 0.1)'
      : props.status === 'Active'
        ? 'rgba(0, 128, 255, 0.1)'
        : 'rgba(255, 165, 0, 0.1)'};
  color: ${(props) =>
    props.status === 'Completed'
      ? '#00ff00'
      : props.status === 'Active'
        ? '#0080ff'
        : '#ffa500'};
  border: 1px solid currentColor;
`;

const ProjectMetadata = styled.div`
  margin: 1rem 0;
`;

const MetadataItem = styled.div`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MetadataLabel = styled.span`
  color: #9d00ff;
  font-weight: 500;
`;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const AchievementItem = styled.li`
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: '→';
    position: absolute;
    left: 0;
    color: #9d00ff;
  }
`;

// Create a custom hook for transform effects
const useProjectTransforms = (scrollYProgress, index, total) => {
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    index === 0 ? [1, 0.8] : index === total - 1 ? [0.8, 1] : [0.8, 0.8]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0]
  );

  return { scale, opacity };
};

const ProjectSection = ({ project, index, scrollYProgress, totalProjects }) => {
  const { scale, opacity } = useProjectTransforms(
    scrollYProgress,
    index,
    totalProjects
  );

  return (
    <ProjectWrapper
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{ scale, opacity }}
    >
      <ProjectImage images={project.images} labels={project.labels} />
      <ProjectContent
        initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <ProjectTitle>{project.title}</ProjectTitle>
        <StatusBadge status={project.status}>{project.status}</StatusBadge>

        <p>{project.description}</p>

        <ProjectMetadata>
          <MetadataItem>
            <MetadataLabel>Timeline:</MetadataLabel>
            <span>{project.timeline}</span>
          </MetadataItem>
          <MetadataItem>
            <MetadataLabel>Role:</MetadataLabel>
            <span>{project.role}</span>
          </MetadataItem>
          <MetadataItem>
            <MetadataLabel>Client:</MetadataLabel>
            <span>{project.client}</span>
          </MetadataItem>
          <MetadataItem>
            <MetadataLabel>Team:</MetadataLabel>
            <span>{project.team}</span>
          </MetadataItem>
        </ProjectMetadata>

        <TechStack>
          {project.tools.split(', ').map((tech, index) => (
            <TechTag key={index}>{tech}</TechTag>
          ))}
        </TechStack>

        <AchievementsList>
          {project.achievements.map((achievement, index) => (
            <AchievementItem key={index}>{achievement}</AchievementItem>
          ))}
        </AchievementsList>

        {project.projectUrl && (
          <ViewButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(project.projectUrl, '_blank')}
          >
            View Project →
          </ViewButton>
        )}
      </ProjectContent>
    </ProjectWrapper>
  );
};

const HeaderSection = styled.div`
  padding: 4rem 2rem 6rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
`;

const RibbonContainer = styled.div`
  position: relative;
  background: rgba(157, 0, 255, 0.1);
  padding: 2rem 4rem;
  width: fit-content;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -15px;
    width: 15px;
    height: 100%;
    background: rgba(157, 0, 255, 0.2);
    transform-origin: right;
    transform: skewY(45deg);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 100%;
    height: 15px;
    background: rgba(157, 0, 255, 0.2);
    transform-origin: top;
    transform: skewX(45deg);
  }

  // Add right side ribbon fold
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -15px;
    width: 15px;
    height: 100%;
    background: rgba(157, 0, 255, 0.2);
    transform-origin: left;
    transform: skewY(-45deg);
  }
`;

const PortfolioHeading = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  text-align: center;
  font-weight: 800;
  line-height: 1.1;
  position: relative;
  background: linear-gradient(120deg, #9d00ff, #ff00e5, #9d00ff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 8s linear infinite;
  margin: 0;

  &::before {
    content: 'Portfolio';
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.2em;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(157, 0, 255, 0.4);
    width: 100%;
    text-align: center;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const Portfolio = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <PageContainer>
      <HeaderSection>
        <RibbonContainer>
          <PortfolioHeading>Featured Work</PortfolioHeading>
        </RibbonContainer>
      </HeaderSection>
      <ProjectsContainer ref={containerRef}>
        {projects.map((project, index) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={index}
            scrollYProgress={scrollYProgress}
            totalProjects={projects.length}
          />
        ))}
      </ProjectsContainer>
    </PageContainer>
  );
};

export default Portfolio;
