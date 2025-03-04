import React from 'react';
import { ProjectSidebar, DetailItem, Label, Value } from '../styles/ProjectDetail.styles';

const ProjectSidebarDetails = ({ project }) => {
    const details = [
        { label: 'Role', value: project.role || 'Lead Developer' },
        { label: 'Timeline', value: project.timeline || '2021-11 - 2022-07' },
        { label: 'Client', value: project.client || 'Confidential' },
        { label: 'Team', value: project.team || 'Development Team' },
        { label: 'Tools Used', value: project.tools || 'React Native, TypeScript' },
    ];

    return (
        <ProjectSidebar>
            <h3>Project Details</h3>
            {details.map((detail, index) => (
                <DetailItem key={index}>
                    <Label>{detail.label}</Label>
                    <Value>{detail.value}</Value>
                </DetailItem>
            ))}
        </ProjectSidebar>
    );
};

export default ProjectSidebarDetails; 