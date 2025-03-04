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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const dataRef = ref(db, 'portfolio');
      await set(dataRef, portfolioData);
      alert('Data saved successfully to Firebase!');
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Error saving data: ' + err.message);
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
            >
              Save Changes
            </GlowingButton>
          </div>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {portfolioData && (
            <div>
              <StyledForm>
                <SectionTitle>Basic Information</SectionTitle>
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

              <StyledForm>
                <SectionTitle>Career Objective</SectionTitle>
                <FormGroup>
                  <FormLabel>Professional Summary</FormLabel>
                  <TextArea
                    value={portfolioData.career_objective}
                    onChange={(e) => updateField('career_objective', e.target.value)}
                    placeholder="Write a brief summary of your professional goals and experience"
                  />
                </FormGroup>
              </StyledForm>

              <StyledForm>
                <SectionTitle>Social Links</SectionTitle>
                <FormGroup>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <Input
                    type="url"
                    value={portfolioData.linkedin}
                    onChange={(e) => updateField('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>GitHub Profile</FormLabel>
                  <Input
                    type="url"
                    value={portfolioData.github}
                    onChange={(e) => updateField('github', e.target.value)}
                    placeholder="https://github.com/your-username"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Twitter Profile</FormLabel>
                  <Input
                    type="url"
                    value={portfolioData.twitter}
                    onChange={(e) => updateField('twitter', e.target.value)}
                    placeholder="https://twitter.com/your-handle"
                  />
                </FormGroup>
              </StyledForm>

              <StyledForm>
                <SectionTitle>Resume</SectionTitle>
                <FormGroup>
                  <FormLabel>Resume URL</FormLabel>
                  <Input
                    type="url"
                    value={portfolioData.resumeURL || ''}
                    onChange={(e) => updateField('resumeURL', e.target.value)}
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
            </div>
          )}
        </motion.div>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Admin;
