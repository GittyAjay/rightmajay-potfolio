import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ref, push } from 'firebase/database';
import { db } from '../firebase/config';

const ContactSection = styled.section`
  min-height: 100vh;
  color: #fff;
  padding: 4rem 0;
  position: relative;
  background: rgba(157, 0, 255, 0.05);
  font-family: 'Satoshi', sans-serif;
`;

const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ContactForm = styled.form`
  max-width: 600px;
  margin: 2.5rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    margin: 2rem auto;
    gap: 1.25rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #9D00FF;
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #9D00FF;
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SendButton = styled(motion.button)`
  position: relative;
  padding: 16px 48px;
  background: linear-gradient(90deg, #9D00FF, #FF00E5);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: 0.5s;
  }

  &:hover::before {
    transform: translateX(100%);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(157, 0, 255, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled(motion.span)`
  color: #ff4444;
  font-size: 0.875rem;
  font-weight: 400;
  position: absolute;
  bottom: -1.25rem;
  left: 0;
`;

const SuccessMessage = styled(motion.div)`
  color: #00ff95;
  font-size: 1rem;
  font-weight: 400;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: rgba(0, 255, 149, 0.1);
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #fff 0%, #8a8a8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Create a new message reference in the 'messages' node
            const messagesRef = ref(db, 'messages');
            await push(messagesRef, {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                timestamp: new Date().toISOString()
            });

            setSubmitSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ContactSection id="contact">
            <ContactContent>
                <SectionTitle
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Get in Touch
                </SectionTitle>
                <SectionSubtitle>
                    Have a question or want to work together? Feel free to reach out!
                </SectionSubtitle>
                <ContactForm onSubmit={handleSubmit}>
                    <InputWrapper>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ borderColor: errors.name ? '#ff4444' : '' }}
                        />
                        <AnimatePresence>
                            {errors.name && (
                                <ErrorMessage
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    {errors.name}
                                </ErrorMessage>
                            )}
                        </AnimatePresence>
                    </InputWrapper>

                    <InputWrapper>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ borderColor: errors.email ? '#ff4444' : '' }}
                        />
                        <AnimatePresence>
                            {errors.email && (
                                <ErrorMessage
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    {errors.email}
                                </ErrorMessage>
                            )}
                        </AnimatePresence>
                    </InputWrapper>

                    <InputWrapper>
                        <TextArea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            style={{ borderColor: errors.message ? '#ff4444' : '' }}
                        />
                        <AnimatePresence>
                            {errors.message && (
                                <ErrorMessage
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    {errors.message}
                                </ErrorMessage>
                            )}
                        </AnimatePresence>
                    </InputWrapper>

                    <SendButton
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </SendButton>

                    <AnimatePresence>
                        {submitSuccess && (
                            <SuccessMessage
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                Thank you! Your message has been sent successfully.
                            </SuccessMessage>
                        )}
                    </AnimatePresence>
                </ContactForm>
            </ContactContent>
        </ContactSection>
    );
};

export default Contact; 