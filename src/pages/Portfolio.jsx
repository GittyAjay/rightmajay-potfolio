import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import projects from '../data/projects'; // Update import to use default export
import { useNavigate } from 'react-router-dom';

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
    margin: 8vh 0;
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

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1.5rem;
  }
`;

const ProjectTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #9d00ff, #ff00e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Satoshi', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
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

  @media (max-width: 768px) {
    padding: 1rem;
  }

  .modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      max-height: 85vh;
      object-fit: contain;
    }

    @media (max-width: 768px) {
      max-width: 95vw;
      max-height: 80vh;
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
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 1rem;
    border-radius: 50%;

    &.prev {
      left: 1rem;
    }

    &.next {
      right: 1rem;
    }

    @media (max-width: 768px) {
      padding: 0.5rem;
      font-size: 1rem;

      &.prev {
        left: 0.5rem;
      }

      &.next {
        right: 0.5rem;
      }
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

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const MetadataItem = styled.div`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const MetadataLabel = styled.span`
  color: #9d00ff;
  font-weight: 500;
`;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  @media (max-width: 768px) {
    text-align: left;
    padding: 0 1rem;
  }
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

const ProjectSection = ({ project, index, scrollYProgress, totalProjects, onViewDetail }) => {
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

        <ViewButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewDetail(project.id)}
        >
          View Project →
        </ViewButton>
        {project.projectUrl && (
          <ViewButton
            style={{ marginLeft: '1rem', background: 'rgba(157,0,255,0.2)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(project.projectUrl, '_blank')}
          >
            External Link ↗
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

  @media (max-width: 768px) {
    padding: 2rem 1rem 4rem;
  }
`;

const RibbonContainer = styled.div`
  position: relative;
  background: rgba(157, 0, 255, 0.1);
  padding: 2rem 4rem;
  width: fit-content;

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    width: 90%;
  }

  &::before,
  &::after {
    @media (max-width: 480px) {
      display: none; // Hide ribbon folds on very small screens
    }
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

  @media (max-width: 768px) {
    font-size: clamp(2rem, 6vw, 3rem);
  }

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

    @media (max-width: 768px) {
      top: -1.5rem;
      font-size: 0.15em;
    }
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

// Add these new styled components
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.5rem;
  }
`;

const FilterButton = styled.button`
  background: ${(props) =>
    props.active ? 'rgba(157, 0, 255, 0.2)' : 'rgba(157, 0, 255, 0.1)'};
  border: 1px solid rgba(157, 0, 255, 0.3);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
`;

// Add this new styled component
const NoProjectsMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  background: rgba(157, 0, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(157, 0, 255, 0.1);
  margin: 2rem auto;
  max-width: 600px;
`;

// Add these new styled components
const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: rgba(157, 0, 255, 0.2);
  border: 1px solid rgba(157, 0, 255, 0.3);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 100;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(157, 0, 255, 0.4);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const Portfolio = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const navigate = useNavigate();

  // Add state for scroll button visibility
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedType, setSelectedType] = useState('All');

  const projectTypes = [
    'All',
    ...new Set(projects.map((project) => project.type)),
  ];

  const filteredProjects =
    selectedType === 'All'
      ? projects
      : projects.filter((project) => project.type === selectedType);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <PageContainer>
      <HeaderSection>
        <RibbonContainer>
          <PortfolioHeading>Featured Work</PortfolioHeading>
        </RibbonContainer>
      </HeaderSection>

      <FilterContainer>
        {projectTypes.map((type) => (
          <FilterButton
            key={type}
            active={selectedType === type}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProjectsContainer ref={containerRef}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectSection
              key={project.id}
              project={project}
              index={index}
              scrollYProgress={scrollYProgress}
              totalProjects={filteredProjects.length}
              onViewDetail={(id) => navigate(`/project/${id}`)}
            />
          ))
        ) : (
          <NoProjectsMessage>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              No projects found for {selectedType} category.
              <br />
              <ViewButton
                onClick={() => setSelectedType('All')}
                style={{ margin: '1rem auto', display: 'block' }}
              >
                View All Projects
              </ViewButton>
            </motion.div>
          </NoProjectsMessage>
        )}
      </ProjectsContainer>

      {/* Add Scroll to Top Button */}
      <AnimatePresence>
        {showScrollButton && (
          <ScrollToTopButton
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ↑
          </ScrollToTopButton>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Portfolio;
