import React from 'react';
import resumeData from '../data/data.json';
import {
    PageContainer,
    SkillsSection,
    ContentWrapper,
    SectionTitle,
    SkillsGrid,
    SkillCard,
    SkillTitle,
    SkillDescription
} from '../styles/SharedStyles';

export default function FullSkills() {
    const allSkills = {
        "Advanced": resumeData.skills.advanced,
        "Performance": resumeData.skills.performance,
        "Architecture": resumeData.skills.architecture,
        "Frameworks": resumeData.skills.frameworks,
        "Styling": resumeData.skills.styling,
        "Animation": resumeData.skills.animation,
        "Design Tools": resumeData.skills.design_tools,
        "Testing": [
            ...resumeData.skills.testing.unit_integration,
            ...resumeData.skills.testing.e2e,
            ...resumeData.skills.testing.performance
        ],
        "Backend": resumeData.skills.backend,
        "API Technologies": resumeData.skills.api_technologies,
        "Databases": resumeData.skills.databases,
        "Authentication": resumeData.skills.authentication,
        "Documentation": resumeData.skills.documentation,
        "Analytics": resumeData.skills.analytics
    };

    const skillIcons = {
        "Advanced": "⚛️",
        "Performance": "⚡",
        "Architecture": "🏗️",
        "Frameworks": "📱",
        "Styling": "🎨",
        "Animation": "✨",
        "Design Tools": "🎯",
        "Testing": "🧪",
        "Backend": "🔧",
        "API Technologies": "🌐",
        "Databases": "💾",
        "Authentication": "🔐",
        "Documentation": "📚",
        "Analytics": "📊"
    };

    return (
        <PageContainer>
            <SkillsSection>
                <ContentWrapper>
                    <SectionTitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Complete Skill Set
                    </SectionTitle>
                    <SkillsGrid>
                        {Object.entries(allSkills).map(([category, skills], index) => (
                            <SkillCard
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div style={{
                                    fontSize: '2rem',
                                    marginBottom: '1rem',
                                    background: 'rgba(157, 0, 255, 0.1)',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {skillIcons[category]}
                                </div>
                                <SkillTitle>{category}</SkillTitle>
                                <SkillDescription>
                                    {Array.isArray(skills) ? skills.join(', ') : skills}
                                </SkillDescription>
                            </SkillCard>
                        ))}
                    </SkillsGrid>
                </ContentWrapper>
            </SkillsSection>
        </PageContainer>
    );
} 