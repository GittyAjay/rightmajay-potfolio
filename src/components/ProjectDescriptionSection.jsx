import React from 'react';
import { ProjectDescription } from '../styles/ProjectDetail.styles';

const ProjectDescriptionSection = ({ achievements }) => {
    return (
        <ProjectDescription>
            <h3>About the Project</h3>
            {achievements?.map((achievement, index) => (
                <li key={index}>{achievement}</li>
            ))}
        </ProjectDescription>
    );
};

export default ProjectDescriptionSection; 