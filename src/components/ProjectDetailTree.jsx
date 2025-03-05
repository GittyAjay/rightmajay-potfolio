import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const TreeContainer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: rgba(20, 0, 40, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(157, 0, 255, 0.2);

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const TreeLevel = styled.div`
  width: 100%;
  max-width: 900px;
  position: relative;
  
  &:not(:first-child)::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 20px;
    background: rgba(157, 0, 255, 0.5);
  }

  @media (max-width: 768px) {
    &:not(:first-child)::before {
      height: 15px;
      top: -15px;
    }
  }
`;

const NodeBox = styled.div`
  background: rgba(30, 0, 60, 0.7);
  border: 1px solid rgba(157, 0, 255, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(40, 0, 80, 0.8);
    border-color: rgba(157, 0, 255, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NodeTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ExpandButton = styled.span`
  color: rgba(157, 0, 255, 0.8);
  font-size: 1.2rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(157, 0, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(157, 0, 255, 0.2);
  }
`;

const ContentList = styled.ul`
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    margin: 1rem 0 0;
    gap: 0.8rem;
  }
`;

const ContentItem = styled.li`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  padding-left: 1.2rem;
  position: relative;

  &::before {
    content: '•';
    color: rgba(157, 0, 255, 0.8);
    position: absolute;
    left: 0;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding-left: 1rem;
  }
`;

const SubList = styled.ul`
  margin: 0.8rem 0 0.8rem 1rem;
  padding-left: 1rem;
  list-style: none;
  border-left: 1px dashed rgba(157, 0, 255, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    margin: 0.6rem 0 0.6rem 0.5rem;
    padding-left: 0.8rem;
    gap: 0.4rem;
  }
`;

const SubItem = styled.li`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '○';
    color: rgba(157, 0, 255, 0.6);
    position: absolute;
    left: 0;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding-left: 0.8rem;
  }
`;

const CodeSnippet = styled.code`
  display: block;
  background: rgba(10, 0, 20, 0.8);
  padding: 0.75rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #a8ff78;
  font-family: 'Fira Code', monospace;
  border: 1px solid rgba(157, 0, 255, 0.2);

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.8rem;
    overflow-x: auto;
  }
`;

// Component for Overview Section
const OverviewSection = ({ project, isExpanded, onToggle }) => (
    <TreeLevel>
        <NodeBox onClick={onToggle}>
            <NodeTitle>
                {project?.title || 'Project Overview'}
                <ExpandButton>{isExpanded ? '−' : '+'}</ExpandButton>
            </NodeTitle>
            {isExpanded && (
                <ContentList>
                    <ContentItem>
                        Project Description
                        <SubList>
                            <SubItem>{project?.description || 'Project description here'}</SubItem>
                            <SubItem>Status: {project?.status || 'In Development'}</SubItem>
                            <SubItem>Timeline: {project?.timeline || 'Ongoing'}</SubItem>
                        </SubList>
                    </ContentItem>
                </ContentList>
            )}
        </NodeBox>
    </TreeLevel>
);

// Component for Technical Stack Section
const TechnicalStackSection = ({ project, isExpanded, onToggle }) => (
    <TreeLevel>
        <NodeBox onClick={onToggle}>
            <NodeTitle>
                Technical Stack
                <ExpandButton>{isExpanded ? '−' : '+'}</ExpandButton>
            </NodeTitle>
            {isExpanded && (
                <ContentList>
                    {project?.technicalStack?.core?.map((section, index) => (
                        <ContentItem key={index}>
                            {section.title}
                            <SubList>
                                {section.items.map((item, i) => (
                                    <SubItem key={i}>{item}</SubItem>
                                ))}
                            </SubList>
                        </ContentItem>
                    ))}
                    {project?.technicalStack?.additional?.map((section, index) => (
                        <ContentItem key={`additional-${index}`}>
                            {section.title}
                            <SubList>
                                {section.items.map((item, i) => (
                                    <SubItem key={i}>{item}</SubItem>
                                ))}
                            </SubList>
                        </ContentItem>
                    ))}
                </ContentList>
            )}
        </NodeBox>
    </TreeLevel>
);

// Component for Implementation Section
const ImplementationSection = ({ project, isExpanded, onToggle }) => (
    <TreeLevel>
        <NodeBox onClick={onToggle}>
            <NodeTitle>
                Implementation Details
                <ExpandButton>{isExpanded ? '−' : '+'}</ExpandButton>
            </NodeTitle>
            {isExpanded && (
                <ContentList>
                    {project?.implementation?.core?.map((section, index) => (
                        <ContentItem key={index}>
                            {section.title}
                            <SubList>
                                {section.items.map((item, i) => (
                                    <SubItem key={i}>{item}</SubItem>
                                ))}
                            </SubList>
                        </ContentItem>
                    ))}
                    {project?.implementation?.optimization?.map((section, index) => (
                        <ContentItem key={`optimization-${index}`}>
                            {section.title}
                            <SubList>
                                {section.items.map((item, i) => (
                                    <SubItem key={i}>{item}</SubItem>
                                ))}
                            </SubList>
                        </ContentItem>
                    ))}
                </ContentList>
            )}
        </NodeBox>
    </TreeLevel>
);

// Component for Future Section
const FutureSection = ({ project, isExpanded, onToggle }) => (
    <TreeLevel>
        <NodeBox onClick={onToggle}>
            <NodeTitle>
                Future Enhancements
                <ExpandButton>{isExpanded ? '−' : '+'}</ExpandButton>
            </NodeTitle>
            {isExpanded && (
                <ContentList>
                    {project?.future?.features?.map((section, index) => (
                        <ContentItem key={index}>
                            {section.title}
                            <SubList>
                                {section.items.map((item, i) => (
                                    <SubItem key={i}>{item}</SubItem>
                                ))}
                            </SubList>
                        </ContentItem>
                    ))}
                </ContentList>
            )}
        </NodeBox>
    </TreeLevel>
);

// Main Component
const ProjectDetailTree = ({ project }) => {
    const [expandedNodes, setExpandedNodes] = useState({
        overview: true,
        tech: true,
        implementation: false,
        future: false
    });

    const toggleNode = (nodeId) => {
        setExpandedNodes(prev => ({
            ...prev,
            [nodeId]: !prev[nodeId]
        }));
    };

    if (!project) {
        return null;
    }

    return (
        <TreeContainer>
            <OverviewSection
                project={project}
                isExpanded={expandedNodes.overview}
                onToggle={() => toggleNode('overview')}
            />
            <TechnicalStackSection
                project={project}
                isExpanded={expandedNodes.tech}
                onToggle={() => toggleNode('tech')}
            />
            <ImplementationSection
                project={project}
                isExpanded={expandedNodes.implementation}
                onToggle={() => toggleNode('implementation')}
            />
            <FutureSection
                project={project}
                isExpanded={expandedNodes.future}
                onToggle={() => toggleNode('future')}
            />
        </TreeContainer>
    );
};

export default ProjectDetailTree;