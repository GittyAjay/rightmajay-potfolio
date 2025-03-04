import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { ref, set, get, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { initializeDatabase } from '../firebase/initializeData';

const PageContainer = styled.div`
  min-height: 100vh;
  color: #fff;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const StyledForm = styled.form`
  background: rgba(13, 13, 13, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(157, 0, 255, 0.15);
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(157, 0, 255, 0.25);
    box-shadow: 0 8px 32px rgba(157, 0, 255, 0.1);
  }
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(157, 0, 255, 0.2);
  color: #fff;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 1.2rem;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(157, 0, 255, 0.5);
    box-shadow: 0 0 0 3px rgba(157, 0, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const TextArea = styled.textarea`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(157, 0, 255, 0.2);
  color: #fff;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  width: 100%;
  min-height: 120px;
  margin-bottom: 1.2rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: rgba(157, 0, 255, 0.5);
    box-shadow: 0 0 0 3px rgba(157, 0, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const GlowingButton = styled(motion.button)`
  position: relative;
  padding: 16px 48px;
  background: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(90deg, #9D00FF, #FF00E5);
    border-radius: 18px;
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    background: #000;
    border-radius: 15px;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
    filter: blur(2px);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(157, 0, 255, 0.5);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(157, 0, 255, 0.3),
      rgba(157, 0, 255, 0)
    );
    margin-left: 1rem;
  }
`;

const FormLabel = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 59, 48, 0.2);
  background: rgba(255, 59, 48, 0.05);
  color: rgba(255, 59, 48, 0.8);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  padding: 0;
  margin-left: auto;

  &:hover {
    background: rgba(255, 59, 48, 0.1);
    border-color: rgba(255, 59, 48, 0.3);
    color: rgba(255, 59, 48, 1);
  }

  &.delete-project {
    width: auto;
    height: auto;
    padding: 6px 12px;
    font-size: 13px;
    display: inline-flex;
    gap: 6px;
    align-items: center;
    margin-top: 1rem;
  }
`;

const CollapsibleSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 1rem;
  background: rgba(13, 13, 13, 0.4);
  border-radius: 12px;
  margin-bottom: ${props => props.isOpen ? '1rem' : '0'};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(13, 13, 13, 0.6);
  }
`;

const SectionContent = styled(motion.div)`
  overflow: hidden;
`;

const ChevronIcon = styled.span`
  transform: ${props => props.isOpen ? 'rotate(90deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;
  display: inline-block;
  margin-right: 0.5rem;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: rgba(13, 13, 13, 0.95);
  border: 1px solid rgba(157, 0, 255, 0.15);
  border-radius: 24px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const ModalText = styled.p`
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const CancelButton = styled(GlowingButton)`
  background: rgba(255, 255, 255, 0.1);
  
  &::before {
    background: linear-gradient(90deg, #2D3436, #636E72);
  }

  &:hover {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  }
`;

const DeleteButton = styled(GlowingButton)`
  background: rgba(255, 59, 48, 0.1);
  
  &::before {
    background: linear-gradient(90deg, #FF3B30, #FF6B6B);
  }

  &:hover {
    box-shadow: 0 0 30px rgba(255, 59, 48, 0.3);
  }
`;

const SocialLinkForm = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid rgba(157, 0, 255, 0.1);
`;

const SocialLinkGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;

  ${FormGroup} {
    margin: 0;
    width: 100%;
    
    ${Input} {
      margin: 0;
    }

    ${FormLabel} {
      margin-bottom: 0.75rem;
    }
  }
`;

const AddButton = styled(GlowingButton)`
  padding: 12px 24px;
  font-size: 14px;
  background: rgba(157, 0, 255, 0.1);
  
  &::before {
    background: linear-gradient(90deg, #9D00FF, #FF00E5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    platform: [],
    image: '',
    achievements: [''],
    start_date: '',
    end_date: ''
  });
  const [openSections, setOpenSections] = useState({
    basicInfo: true,
    careerObjective: false,
    socialLinks: false,
    resume: false,
    projects: false,
    skills: false,
    newProject: false,
    journey: false,
    newJourney: false
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    projectIndex: null,
    journeyIndex: null,
    type: null // 'project' or 'journey'
  });
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [newJourney, setNewJourney] = useState({
    title: '',
    id: null,
    date: '',
    description: '',
    stats: [{ value: '', label: '' }]
  });

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
      if (user) {
        initializeDatabase().then(() => {
          fetchPortfolioData();
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchPortfolioData = async () => {
    try {
      const dataRef = ref(db, 'portfolio');
      const snapshot = await get(dataRef);

      if (snapshot.exists()) {
        setPortfolioData(snapshot.val());
      } else {
        setError('No data found in database');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data: ' + err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const dataRef = ref(db, 'portfolio');
      await set(dataRef, portfolioData);
      alert('Changes saved successfully!');
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Error saving data: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const dataRef = ref(db, 'portfolio');
      const unsubscribe = onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
          setPortfolioData(snapshot.val());
        }
      }, (error) => {
        console.error('Error in real-time updates:', error);
        setError('Error in real-time updates: ' + error.message);
      });

      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  const updateField = (path, value) => {
    const pathArray = path.split('.');
    setPortfolioData(prevData => {
      const newData = { ...prevData };
      let current = newData;
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      current[pathArray[pathArray.length - 1]] = value;
      return newData;
    });
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDeleteProject = (index) => {
    setDeleteModal({ isOpen: true, projectIndex: index, journeyIndex: null, type: 'project' });
  };

  const handleDeleteJourney = (index) => {
    setDeleteModal({ isOpen: true, projectIndex: null, journeyIndex: index, type: 'journey' });
  };

  const confirmDelete = () => {
    if (deleteModal.type === 'project') {
      const updatedProjects = portfolioData.projects.filter((_, i) => i !== deleteModal.projectIndex);
      updateField('projects', updatedProjects);
    } else if (deleteModal.type === 'journey') {
      const updatedJourney = portfolioData.journey.filter((_, i) => i !== deleteModal.journeyIndex);
      updateField('journey', updatedJourney);
    }
    setDeleteModal({ isOpen: false, projectIndex: null, journeyIndex: null, type: null });
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleAddSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      if (!isValidUrl(newSocialLink.url)) {
        setErrorModal({
          isOpen: true,
          message: 'Please enter a valid URL (e.g., https://example.com)'
        });
        return;
      }
      const platform = newSocialLink.platform.toLowerCase().replace(/\s+/g, '_');
      const newData = { ...portfolioData };
      newData[platform] = newSocialLink.url;
      setPortfolioData(newData);
      setNewSocialLink({ platform: '', url: '' });
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading...
          </motion.div>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <ContentWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <StyledForm onSubmit={handleLogin}>
              <SectionTitle>Admin Login</SectionTitle>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <GlowingButton
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </GlowingButton>
            </StyledForm>
          </motion.div>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <SectionTitle>Portfolio Admin</SectionTitle>
            <GlowingButton
              onClick={handleSave}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSaving}
              style={{
                opacity: isSaving ? 0.7 : 1,
                cursor: isSaving ? 'not-allowed' : 'pointer'
              }}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </GlowingButton>
          </div>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {portfolioData && (
            <div>
              <CollapsibleSection>
                <SectionHeader onClick={() => toggleSection('basicInfo')}>
                  <ChevronIcon isOpen={openSections.basicInfo}>›</ChevronIcon>
                  <SectionTitle style={{ margin: 0 }}>Basic Information</SectionTitle>
                </SectionHeader>
                {openSections.basicInfo && (
                  <SectionContent
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                  >
                    <StyledForm>
                      <FormGroup>
                        <FormLabel>Name</FormLabel>
                        <Input
                          type="text"
                          value={portfolioData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <Input
                          type="email"
                          value={portfolioData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="Enter your email address"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Location</FormLabel>
                        <Input
                          type="text"
                          value={portfolioData.location}
                          onChange={(e) => updateField('location', e.target.value)}
                          placeholder="Enter your location"
                        />
                      </FormGroup>
                    </StyledForm>
                  </SectionContent>
                )}
              </CollapsibleSection>

              <CollapsibleSection>
                <SectionHeader onClick={() => toggleSection('careerObjective')}>
                  <ChevronIcon isOpen={openSections.careerObjective}>›</ChevronIcon>
                  <SectionTitle style={{ margin: 0 }}>Career Objective</SectionTitle>
                </SectionHeader>
                {openSections.careerObjective && (
                  <SectionContent
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                  >
                    <StyledForm>
                      <FormGroup>
                        <FormLabel>Professional Summary</FormLabel>
                        <TextArea
                          value={portfolioData.career_objective}
                          onChange={(e) => updateField('career_objective', e.target.value)}
                          placeholder="Write a brief summary of your professional goals and experience"
                        />
                      </FormGroup>
                    </StyledForm>
                  </SectionContent>
                )}
              </CollapsibleSection>

              <CollapsibleSection>
                <SectionHeader onClick={() => toggleSection('socialLinks')}>
                  <ChevronIcon isOpen={openSections.socialLinks}>›</ChevronIcon>
                  <SectionTitle style={{ margin: 0 }}>Social Links</SectionTitle>
                </SectionHeader>
                {openSections.socialLinks && (
                  <SectionContent
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                  >
                    <StyledForm>
                      {['linkedin', 'github', 'twitter', 'instagram'].map((platform) => (
                        <FormGroup key={platform}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '1rem'
                          }}>
                            <div style={{ flex: 1 }}>
                              <FormLabel>{platform.charAt(0).toUpperCase() + platform.slice(1)}</FormLabel>
                              <Input
                                type="url"
                                value={portfolioData[platform] || ''}
                                onChange={(e) => {
                                  const url = e.target.value;
                                  if (url && !isValidUrl(url)) {
                                    setErrorModal({
                                      isOpen: true,
                                      message: 'Please enter a valid URL (e.g., https://example.com)'
                                    });
                                    return;
                                  }
                                  const newData = { ...portfolioData };
                                  newData[platform] = url;
                                  setPortfolioData(newData);
                                }}
                                placeholder={`Enter your ${platform} URL`}
                              />
                            </div>
                            {portfolioData[platform] && (
                              <RemoveButton
                                type="button"
                                onClick={() => {
                                  const newData = { ...portfolioData };
                                  newData[platform] = '';
                                  setPortfolioData(newData);
                                }}
                                style={{ marginBottom: '0.75rem' }}
                              >
                                ×
                              </RemoveButton>
                            )}
                          </div>
                        </FormGroup>
                      ))}

                      {Object.entries(portfolioData).map(([key, value]) => {
                        if (
                          typeof value === 'string' &&
                          value.startsWith('http') &&
                          !['linkedin', 'github', 'twitter', 'instagram', 'resumeURL'].includes(key)
                        ) {
                          return (
                            <FormGroup key={key}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: '1rem'
                              }}>
                                <div style={{ flex: 1 }}>
                                  <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}</FormLabel>
                                  <Input
                                    type="url"
                                    value={value}
                                    onChange={(e) => {
                                      const url = e.target.value;
                                      if (url && !isValidUrl(url)) {
                                        setErrorModal({
                                          isOpen: true,
                                          message: 'Please enter a valid URL (e.g., https://example.com)'
                                        });
                                        return;
                                      }
                                      const newData = { ...portfolioData };
                                      newData[key] = url;
                                      setPortfolioData(newData);
                                    }}
                                    placeholder={`Enter your ${key} URL`}
                                  />
                                </div>
                                <RemoveButton
                                  type="button"
                                  onClick={() => {
                                    const newData = { ...portfolioData };
                                    delete newData[key];
                                    setPortfolioData(newData);
                                  }}
                                  style={{ marginBottom: '0.75rem' }}
                                >
                                  ×
                                </RemoveButton>
                              </div>
                            </FormGroup>
                          );
                        }
                        return null;
                      })}

                      <SocialLinkForm>
                        <SectionTitle style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                          Add New Social Link
                        </SectionTitle>
                        <SocialLinkGrid>
                          <FormGroup>
                            <FormLabel>Platform Name</FormLabel>
                            <Input
                              type="text"
                              value={newSocialLink.platform}
                              onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
                              placeholder="Enter platform name (e.g. Facebook)"
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>URL</FormLabel>
                            <Input
                              type="url"
                              value={newSocialLink.url}
                              onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                              placeholder="Enter your profile URL"
                            />
                          </FormGroup>
                        </SocialLinkGrid>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                          <AddButton
                            type="button"
                            onClick={handleAddSocialLink}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!newSocialLink.platform || !newSocialLink.url}
                          >
                            Add Social Link
                          </AddButton>
                        </div>
                      </SocialLinkForm>
                    </StyledForm>
                  </SectionContent>
                )}
              </CollapsibleSection>

              <CollapsibleSection>
                <SectionHeader onClick={() => toggleSection('resume')}>
                  <ChevronIcon isOpen={openSections.resume}>›</ChevronIcon>
                  <SectionTitle style={{ margin: 0 }}>Resume</SectionTitle>
                </SectionHeader>
                {openSections.resume && (
                  <SectionContent
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                  >
                    <StyledForm>
                      <FormGroup>
                        <FormLabel>Resume URL</FormLabel>
                        <Input
                          type="url"
                          value={portfolioData.resumeURL || ''}
                          onChange={(e) => {
                            const url = e.target.value;
                            if (url && !isValidUrl(url)) {
                              setErrorModal({
                                isOpen: true,
                                message: 'Please enter a valid URL (e.g., https://example.com)'
                              });
                              return;
                            }
                            updateField('resumeURL', url);
                          }}
                          placeholder="Enter the URL to your resume"
                        />
                        {portfolioData.resumeURL && (
                          <div style={{ marginTop: '1rem' }}>
                            <a
                              href={portfolioData.resumeURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: '#9D00FF',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem'
                              }}
                            >
                              View current resume ↗
                            </a>
                          </div>
                        )}
                      </FormGroup>
                    </StyledForm>
                  </SectionContent>
                )}
              </CollapsibleSection>

              <CollapsibleSection>
                <SectionHeader onClick={() => toggleSection('projects')}>
                  <ChevronIcon isOpen={openSections.projects}>›</ChevronIcon>
                  <SectionTitle style={{ margin: 0 }}>Projects</SectionTitle>
                </SectionHeader>
                {openSections.projects && (
                  <SectionContent
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                  >
                    <StyledForm>
                      {portfolioData.projects && portfolioData.projects.map((project, index) => (
                        <div key={index} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(157, 0, 255, 0.1)' }}>
                          <FormGroup>
                            <FormLabel>Project Title</FormLabel>
                            <Input
                              type="text"
                              value={project.title}
                              onChange={(e) => {
                                const updatedProjects = [...portfolioData.projects];
                                updatedProjects[index] = { ...project, title: e.target.value };
                                updateField('projects', updatedProjects);
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>Project Image URL</FormLabel>
                            <Input
                              type="url"
                              value={project.image}
                              onChange={(e) => {
                                const updatedProjects = [...portfolioData.projects];
                                updatedProjects[index] = { ...project, image: e.target.value };
                                updateField('projects', updatedProjects);
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>Platforms (comma-separated)</FormLabel>
                            <Input
                              type="text"
                              value={project.platform ? project.platform.join(', ') : ''}
                              onChange={(e) => {
                                const platforms = e.target.value.split(',').map(p => p.trim()).filter(p => p);
                                const updatedProjects = [...portfolioData.projects];
                                updatedProjects[index] = { ...project, platform: platforms };
                                updateField('projects', updatedProjects);
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>Start Date (YYYY-MM)</FormLabel>
                            <Input
                              type="text"
                              value={project.start_date || ''}
                              onChange={(e) => {
                                const updatedProjects = [...portfolioData.projects];
                                updatedProjects[index] = { ...project, start_date: e.target.value };
                                updateField('projects', updatedProjects);
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>End Date (YYYY-MM or 'current')</FormLabel>
                            <Input
                              type="text"
                              value={project.end_date || ''}
                              onChange={(e) => {
                                const updatedProjects = [...portfolioData.projects];
                                updatedProjects[index] = { ...project, end_date: e.target.value };
                                updateField('projects', updatedProjects);
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>Achievements</FormLabel>
                            {project.achievements.map((achievement, achievementIndex) => (
                              <div key={achievementIndex} style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: '1rem',
                                marginBottom: '1rem'
                              }}>
                                <div style={{ flex: 1 }}>
                                  <TextArea
                                    value={achievement}
                                    onChange={(e) => {
                                      const updatedProjects = [...portfolioData.projects];
                                      updatedProjects[index] = {
                                        ...project,
                                        achievements: project.achievements.map((a, i) =>
                                          i === achievementIndex ? e.target.value : a
                                        )
                                      };
                                      updateField('projects', updatedProjects);
                                    }}
                                  />
                                </div>
                                <RemoveButton
                                  type="button"
                                  onClick={() => {
                                    const updatedProjects = [...portfolioData.projects];
                                    updatedProjects[index] = {
                                      ...project,
                                      achievements: project.achievements.filter((_, i) => i !== achievementIndex)
                                    };
                                    updateField('projects', updatedProjects);
                                  }}
                                  style={{ marginBottom: '0.75rem' }}
                                >
                                  ×
                                </RemoveButton>
                              </div>
                            ))}
                            <GlowingButton
                              type="button"
                              onClick={() => {
                                const updatedProjects = [...portfolioData.projects];
                                updatedProjects[index] = {
                                  ...project,
                                  achievements: [...project.achievements, '']
                                };
                                updateField('projects', updatedProjects);
                              }}
                              style={{ marginTop: '1rem' }}
                            >
                              Add Achievement
                            </GlowingButton>
                          </FormGroup>
                          <RemoveButton
                            type="button"
                            className="delete-project"
                            onClick={() => handleDeleteProject(index)}
                          >
                            <span>×</span> Delete Project
                          </RemoveButton>
                        </div>
                      ))}

                      <div style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <SectionTitle>Add New Project</SectionTitle>
                          <GlowingButton
                            type="button"
                            onClick={() => toggleSection('newProject')}
                            style={{ padding: '8px 16px', fontSize: '14px' }}
                          >
                            {openSections.newProject ? 'Close Form' : 'Add New Project'}
                          </GlowingButton>
                        </div>

                        {openSections.newProject && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FormGroup>
                              <FormLabel>Project Title</FormLabel>
                              <Input
                                type="text"
                                value={newProject.title}
                                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel>Project Image URL</FormLabel>
                              <Input
                                type="url"
                                value={newProject.image}
                                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel>Platforms (comma-separated)</FormLabel>
                              <Input
                                type="text"
                                value={newProject.platform.join(', ')}
                                onChange={(e) => {
                                  const platforms = e.target.value.split(',').map(p => p.trim()).filter(p => p);
                                  setNewProject({ ...newProject, platform: platforms });
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel>Start Date (YYYY-MM)</FormLabel>
                              <Input
                                type="text"
                                value={newProject.start_date}
                                onChange={(e) => setNewProject({ ...newProject, start_date: e.target.value })}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel>End Date (YYYY-MM or 'current')</FormLabel>
                              <Input
                                type="text"
                                value={newProject.end_date}
                                onChange={(e) => setNewProject({ ...newProject, end_date: e.target.value })}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel>Achievement</FormLabel>
                              <TextArea
                                value={newProject.achievements[0]}
                                onChange={(e) => setNewProject({ ...newProject, achievements: [e.target.value] })}
                              />
                            </FormGroup>
                            <GlowingButton
                              type="button"
                              onClick={() => {
                                if (newProject.title && newProject.achievements[0]) {
                                  const updatedProjects = [...(portfolioData.projects || []), newProject];
                                  updateField('projects', updatedProjects);
                                  setNewProject({
                                    title: '',
                                    platform: [],
                                    image: '',
                                    achievements: [''],
                                    start_date: '',
                                    end_date: ''
                                  });
                                  toggleSection('newProject');
                                }
                              }}
                            >
                              Add Project
                            </GlowingButton>
                          </motion.div>
                        )}
                      </div>
                    </StyledForm>
                  </SectionContent>
                )}
              </CollapsibleSection>

              <CollapsibleSection>
                <SectionHeader onClick={() => toggleSection('skills')}>
                  <ChevronIcon isOpen={openSections.skills}>›</ChevronIcon>
                  <SectionTitle style={{ margin: 0 }}>Skills</SectionTitle>
                </SectionHeader>
                {openSections.skills && (
                  <SectionContent
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                  >
                    <StyledForm>
                      <FormGroup>
                        <FormLabel>Advanced Skills (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.advanced.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.advanced', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Performance Skills (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.performance.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.performance', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Architecture Skills (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.architecture.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.architecture', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Frameworks (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.frameworks.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.frameworks', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Styling Skills (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.styling.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.styling', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Animation Skills (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.animation.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.animation', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Design Tools (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.design_tools.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.design_tools', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Unit & Integration Testing (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.testing.unit_integration.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.testing.unit_integration', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>E2E Testing (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.testing.e2e.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.testing.e2e', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Performance Testing (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.testing.performance.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.testing.performance', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Code Quality Tools (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.code_quality.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.code_quality', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Backend Technologies (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.backend.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.backend', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>API Technologies (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.api_technologies.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.api_technologies', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Databases (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.databases.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.databases', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Authentication (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.authentication.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.authentication', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Documentation Tools (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.documentation.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.documentation', skills);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Analytics Tools (comma-separated)</FormLabel>
                        <TextArea
                          value={portfolioData.skills.analytics.join(', ')}
                          onChange={(e) => {
                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            updateField('skills.analytics', skills);
                          }}
                        />
                      </FormGroup>
                    </StyledForm>
                  </SectionContent>
                )}
              </CollapsibleSection>

              <CollapsibleSection>
                <SectionHeader onClick={() => toggleSection('journey')}>
                  <ChevronIcon isOpen={openSections.journey}>›</ChevronIcon>
                  <SectionTitle style={{ margin: 0 }}>Journey</SectionTitle>
                </SectionHeader>
                {openSections.journey && (
                  <SectionContent
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                  >
                    <StyledForm>
                      {portfolioData.journey && portfolioData.journey.map((journey, index) => (
                        <div key={index} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(157, 0, 255, 0.1)' }}>
                          <FormGroup>
                            <FormLabel>Title</FormLabel>
                            <Input
                              type="text"
                              value={journey.title}
                              onChange={(e) => {
                                const updatedJourney = [...portfolioData.journey];
                                updatedJourney[index] = { ...journey, title: e.target.value };
                                updateField('journey', updatedJourney);
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>Date</FormLabel>
                            <Input
                              type="text"
                              value={journey.date}
                              onChange={(e) => {
                                const updatedJourney = [...portfolioData.journey];
                                updatedJourney[index] = { ...journey, date: e.target.value };
                                updateField('journey', updatedJourney);
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>Description</FormLabel>
                            <TextArea
                              value={journey.description}
                              onChange={(e) => {
                                const updatedJourney = [...portfolioData.journey];
                                updatedJourney[index] = { ...journey, description: e.target.value };
                                updateField('journey', updatedJourney);
                              }}
                            />
                          </FormGroup>

                          <FormGroup>
                            <FormLabel>Stats</FormLabel>
                            {journey.stats.map((stat, statIndex) => (
                              <div key={statIndex} style={{
                                display: 'flex',
                                gap: '1rem',
                                marginBottom: '1rem',
                                alignItems: 'flex-end'
                              }}>
                                <div style={{ flex: 1 }}>
                                  <FormLabel>Value</FormLabel>
                                  <Input
                                    type="text"
                                    value={stat.value}
                                    onChange={(e) => {
                                      const updatedJourney = [...portfolioData.journey];
                                      updatedJourney[index].stats[statIndex].value = e.target.value;
                                      updateField('journey', updatedJourney);
                                    }}
                                  />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <FormLabel>Label</FormLabel>
                                  <Input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => {
                                      const updatedJourney = [...portfolioData.journey];
                                      updatedJourney[index].stats[statIndex].label = e.target.value;
                                      updateField('journey', updatedJourney);
                                    }}
                                  />
                                </div>
                                <RemoveButton
                                  type="button"
                                  onClick={() => {
                                    const updatedJourney = [...portfolioData.journey];
                                    updatedJourney[index].stats = journey.stats.filter((_, i) => i !== statIndex);
                                    updateField('journey', updatedJourney);
                                  }}
                                  style={{ marginBottom: '0.75rem' }}
                                >
                                  ×
                                </RemoveButton>
                              </div>
                            ))}
                            <GlowingButton
                              type="button"
                              onClick={() => {
                                const updatedJourney = [...portfolioData.journey];
                                updatedJourney[index].stats.push({ value: '', label: '' });
                                updateField('journey', updatedJourney);
                              }}
                              style={{ marginTop: '1rem' }}
                            >
                              Add Stat
                            </GlowingButton>
                          </FormGroup>

                          <RemoveButton
                            type="button"
                            className="delete-project"
                            onClick={() => handleDeleteJourney(index)}
                          >
                            <span>×</span> Delete Journey Item
                          </RemoveButton>
                        </div>
                      ))}

                      <div style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <SectionTitle>Add New Journey Item</SectionTitle>
                          <GlowingButton
                            type="button"
                            onClick={() => toggleSection('newJourney')}
                            style={{ padding: '8px 16px', fontSize: '14px' }}
                          >
                            {openSections.newJourney ? 'Close Form' : 'Add New Journey Item'}
                          </GlowingButton>
                        </div>

                        {openSections.newJourney && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FormGroup>
                              <FormLabel>Title</FormLabel>
                              <Input
                                type="text"
                                value={newJourney.title}
                                onChange={(e) => setNewJourney({ ...newJourney, title: e.target.value })}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel>Date</FormLabel>
                              <Input
                                type="text"
                                value={newJourney.date}
                                onChange={(e) => setNewJourney({ ...newJourney, date: e.target.value })}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel>Description</FormLabel>
                              <TextArea
                                value={newJourney.description}
                                onChange={(e) => setNewJourney({ ...newJourney, description: e.target.value })}
                              />
                            </FormGroup>

                            <FormGroup>
                              <FormLabel>Stats</FormLabel>
                              {newJourney.stats.map((stat, index) => (
                                <div key={index} style={{
                                  display: 'flex',
                                  gap: '1rem',
                                  marginBottom: '1rem',
                                  alignItems: 'flex-end'
                                }}>
                                  <div style={{ flex: 1 }}>
                                    <FormLabel>Value</FormLabel>
                                    <Input
                                      type="text"
                                      value={stat.value}
                                      onChange={(e) => {
                                        const updatedStats = [...newJourney.stats];
                                        updatedStats[index].value = e.target.value;
                                        setNewJourney({ ...newJourney, stats: updatedStats });
                                      }}
                                    />
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <FormLabel>Label</FormLabel>
                                    <Input
                                      type="text"
                                      value={stat.label}
                                      onChange={(e) => {
                                        const updatedStats = [...newJourney.stats];
                                        updatedStats[index].label = e.target.value;
                                        setNewJourney({ ...newJourney, stats: updatedStats });
                                      }}
                                    />
                                  </div>
                                  {index > 0 && (
                                    <RemoveButton
                                      type="button"
                                      onClick={() => {
                                        setNewJourney({
                                          ...newJourney,
                                          stats: newJourney.stats.filter((_, i) => i !== index)
                                        });
                                      }}
                                      style={{ marginBottom: '0.75rem' }}
                                    >
                                      ×
                                    </RemoveButton>
                                  )}
                                </div>
                              ))}
                              <GlowingButton
                                type="button"
                                onClick={() => {
                                  setNewJourney({
                                    ...newJourney,
                                    stats: [...newJourney.stats, { value: '', label: '' }]
                                  });
                                }}
                                style={{ marginTop: '1rem' }}
                              >
                                Add Stat
                              </GlowingButton>
                            </FormGroup>

                            <GlowingButton
                              type="button"
                              onClick={() => {
                                if (newJourney.title && newJourney.date && newJourney.description) {
                                  const maxId = Math.max(...portfolioData.journey.map(j => j.id), 0);
                                  const journeyWithId = {
                                    ...newJourney,
                                    id: maxId + 1
                                  };
                                  const updatedJourney = [...portfolioData.journey, journeyWithId];
                                  updateField('journey', updatedJourney);
                                  setNewJourney({
                                    title: '',
                                    id: null,
                                    date: '',
                                    description: '',
                                    stats: [{ value: '', label: '' }]
                                  });
                                  toggleSection('newJourney');
                                }
                              }}
                            >
                              Add Journey Item
                            </GlowingButton>
                          </motion.div>
                        )}
                      </div>
                    </StyledForm>
                  </SectionContent>
                )}
              </CollapsibleSection>
            </div>
          )}
        </motion.div>

        {errorModal.isOpen && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <ModalTitle>Invalid URL</ModalTitle>
              <ModalText>
                {errorModal.message}
              </ModalText>
              <ModalButtons>
                <GlowingButton
                  onClick={() => setErrorModal({ isOpen: false, message: '' })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  OK
                </GlowingButton>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}

        {deleteModal.isOpen && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <ModalTitle>{deleteModal.type === 'project' ? 'Delete Project' : 'Delete Journey Item'}</ModalTitle>
              <ModalText>
                Are you sure you want to delete this {deleteModal.type}? This action cannot be undone.
              </ModalText>
              <ModalButtons>
                <CancelButton
                  onClick={() => setDeleteModal({ isOpen: false, projectIndex: null, journeyIndex: null, type: null })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </CancelButton>
                <DeleteButton
                  onClick={confirmDelete}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete
                </DeleteButton>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default Admin;
