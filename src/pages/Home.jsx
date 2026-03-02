import React, { useEffect, useMemo, useState } from 'react';
import { FaGithub, FaLinkedinIn, FaMoon, FaSun } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import styled, { createGlobalStyle } from 'styled-components';
import profileImage from '../assets/images/ajay.png';
import carehudleAudioCall from '../assets/images/carehild-audio-call.webp';
import carehudlChat from '../assets/images/carehild-chat.webp';
import carehudlImage from '../assets/images/carehudl-actiions.webp';
import carehudlContact from '../assets/images/carehudl-contact.webp';
import carehudlVideoCall from '../assets/images/carehudl-video-call.webp';
import elynkerImage from '../assets/images/elynker.png';
import eventwordkAbsent from '../assets/images/eventwordk-absent.webp';
import eventwordkLeave from '../assets/images/eventwordk-leave.webp';
import eventworkChat from '../assets/images/eventwork-chat.webp';
import eventworksImage from '../assets/images/eventwork-dashbaord.webp';
import eventworkSchedule from '../assets/images/evenwork-schedule.webp';
import propnewstimeCategory from '../assets/images/propnewstime-category.webp';
import propNewsTimesImage from '../assets/images/propnewstime.jpeg';
import propnewstimeappHomepage from '../assets/images/propnewstimeapp-hom-pahe.webp';
import staffworkActions from '../assets/images/staffwork-actions.webp';
import staffworksImage from '../assets/images/staffwork-dashboard.webp';
import staffworkTimeshifts from '../assets/images/staffwork-timeshifts.webp';
import staffworkShifts from '../assets/images/staffworrk-shifts.webp';
import resumeData from '../data/data.json';

const GlobalTheme = createGlobalStyle`
  :root {
    --bg: #f5f5f0;
    --surface: #ffffff;
    --border: #e4e4dc;
    --text: #111110;
    --muted: #78776c;
    --accent: #1a6cff;
    --on-accent: #ffffff;
    --accent-bg: #eef3ff;
    --green: #15803d;
    --green-bg: #f0fdf4;
    --text-soft: #4a4a44;
    --btn-primary-bg: #111110;
    --btn-primary-fg: #ffffff;
    --btn-primary-hover: #333333;
    --radius: 10px;
    --radius-lg: 16px;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
    --nav-bg: rgba(245, 245, 240, 0.9);
    --image-bg: #f1f1ee;
  }

  body[data-theme='dark'] {
    --bg: #121315;
    --surface: #181a1d;
    --border: #2a2d33;
    --text: #f2f3f5;
    --muted: #a3a8b3;
    --accent: #67a2ff;
    --on-accent: #0f172a;
    --accent-bg: #1a2c49;
    --green: #86efac;
    --green-bg: #14201a;
    --text-soft: #c7ccd6;
    --btn-primary-bg: #67a2ff;
    --btn-primary-fg: #0f172a;
    --btn-primary-hover: #8bb8ff;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.35), 0 8px 20px rgba(0, 0, 0, 0.3);
    --nav-bg: rgba(18, 19, 21, 0.85);
    --image-bg: #111317;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Satoshi', sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: 15px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }
`;

const Wrap = styled.div`
  max-width: 780px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
`;

const NavInner = styled(Wrap)`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavBrand = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
`;

const NavAvatarButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--border);
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  background: var(--surface);
  box-shadow: var(--shadow);
`;

const NavAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NavName = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;

  a {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--muted);
    transition: color 0.15s;
  }

  a:hover {
    color: var(--text);
    text-decoration: none;
  }

  a.active {
    color: var(--accent);
    font-weight: 700;
    text-decoration: none;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const NavActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const ThemeToggle = styled.button`
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface);
  color: var(--accent);
  font-size: 0.9rem;
  cursor: pointer;

  svg {
    width: 15px;
    height: 15px;
    display: block;
  }
`;

const Main = styled.main``;

const Hero = styled.div`
  padding: 72px 0 64px;
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 24px;
  align-items: center;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 20px;

  span:first-child {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    display: inline-block;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.1;
  margin-bottom: 20px;
`;

const HeroText = styled.p`
  font-size: 1rem;
  color: var(--muted);
  max-width: 560px;
  margin-bottom: 24px;
  line-height: 1.7;
`;

const HeroImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 200px;
  justify-self: end;

  @media (max-width: 700px) {
    justify-self: center;
    width: 200px;
    align-items: center;
  }
`;

const HeroImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  object-fit: cover;

  @media (max-width: 700px) {
    width: 160px;
    height: 160px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const HeroLinks = styled.div`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const LinkChip = styled.a`
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.92rem;
  color: var(--muted);
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 50%;

  &:hover {
    color: var(--text);
    text-decoration: none;
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: var(--radius);
  cursor: pointer;
  border: none;
  transition: all 0.15s;
  white-space: nowrap;
`;

const PrimaryButton = styled(Button)`
  background: var(--btn-primary-bg);
  color: var(--btn-primary-fg);

  &:hover {
    background: var(--btn-primary-hover);
    text-decoration: none;
    color: var(--btn-primary-fg);
  }
`;

const GhostButton = styled(Button)`
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);

  &:hover {
    border-color: #c4c4bc;
    text-decoration: none;
  }
`;

const Section = styled.section`
  padding: 64px 0;
  border-top: 1px solid var(--border);
`;

const SectionLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--muted);
  margin-bottom: 8px;
`;

const SectionTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.6px;
  margin-bottom: 32px;
`;

const SectionHint = styled.p`
  font-size: 0.85rem;
  color: var(--muted);
  margin-top: -20px;
  margin-bottom: 24px;
`;

const SkillRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
  align-items: start;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const SkillCategory = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-top: 3px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 4px 12px;
  border-radius: var(--radius);
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s, border-color 0.2s;

  &:hover {
    border-color: #c4c4bc;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: contain;
  background: var(--image-bg);
  border-radius: 12px;
  border: 1px solid var(--border);
  margin-bottom: 18px;
  cursor: pointer;
`;

const OpenAppLink = styled.a`
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid #d7e4ff;
  border-radius: var(--radius);
  padding: 5px 10px;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(17, 17, 16, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LightboxPanel = styled.div`
  width: min(100%, 980px);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
`;

const LightboxTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
`;

const LightboxTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
`;

const LightboxClose = styled.button`
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const LightboxImageWrap = styled.div`
  position: relative;
  background: var(--image-bg);
  height: min(74vh, 720px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const LightboxNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  border: 1px solid var(--accent);
  background: var(--surface);
  color: var(--accent);
  border-radius: 999px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1;
  box-shadow: var(--shadow);

  &:hover {
    background: var(--accent-bg);
  }
`;

const LightboxPrev = styled(LightboxNav)`
  left: 12px;
`;

const LightboxNext = styled(LightboxNav)`
  right: 12px;
`;

const LightboxMeta = styled.div`
  padding: 10px 16px;
  border-top: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--muted);
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
`;

const CardTitle = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
`;

const CardSub = styled.span`
  font-size: 0.85rem;
  color: var(--muted);
  font-weight: 400;
`;

const Badge = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: var(--radius);
  background: var(--accent-bg);
  color: var(--accent);
  white-space: nowrap;
  flex-shrink: 0;
`;

const Period = styled.div`
  font-size: 0.78rem;
  color: var(--muted);
  margin-bottom: 16px;
`;

const BulletList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;

  li {
    font-size: 0.875rem;
    color: var(--text-soft);
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  li::before {
    content: '-';
    color: var(--muted);
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

const StackRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
`;

const StackTag = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--green-bg);
  border: 1px solid #bbf7d0;
  color: var(--green);
  padding: 3px 10px;
  border-radius: var(--radius);
`;

const ExpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const ExpRole = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const ExpCompany = styled.div`
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 500;
  margin-top: 2px;
`;

const CompanyLink = styled.a`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--accent);
  border: 1px solid #d7e4ff;
  background: var(--accent-bg);
  border-radius: var(--radius);
  padding: 4px 8px;
  display: inline-flex;
  margin-top: 8px;

  &:hover {
    text-decoration: none;
  }
`;

const Pill = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--muted);
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 4px 12px;
  border-radius: var(--radius);
  white-space: nowrap;
`;

const EducationCard = styled.div`
  margin-top: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px 28px;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const EducationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const DegreeLink = styled.a`
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid #d7e4ff;
  border-radius: var(--radius);
  padding: 6px 10px;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
  }
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 28px;

  &::before {
    content: '';
    position: absolute;
    left: 9px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDot = styled.span`
  position: absolute;
  left: -28px;
  top: 18px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--surface);
  box-shadow: 0 0 0 2px var(--accent-bg);
`;

const ContactBox = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
  box-shadow: var(--shadow);

  p {
    color: var(--muted);
    font-size: 0.95rem;
    margin-bottom: 24px;
  }
`;

const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Footer = styled.footer`
  border-top: 1px solid var(--border);
  padding: 24px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--muted);
`;

const Reveal = styled.div`
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.4s, transform 0.4s;

  &.visible {
    opacity: 1;
    transform: none;
  }
`;

const keyLabels = {
  advanced: 'Mobile',
  performance: 'Performance',
  architecture: 'Architecture',
  frameworks: 'Frameworks',
  styling: 'Styling',
  animation: 'Animation',
  design_tools: 'Design Tools',
  testing: 'Testing',
  code_quality: 'Code Quality',
  backend: 'Backend',
  api_technologies: 'APIs',
  databases: 'Databases',
  authentication: 'Auth',
  documentation: 'Docs',
  analytics: 'Analytics',
};

const prettyLabel = (key) => keyLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const formatDate = (value) => {
  if (!value || value === 'current') {
    return 'Present';
  }

  const [year, month] = value.split('-');
  if (!year || !month) {
    return value;
  }

  return new Date(Number(year), Number(month) - 1, 1).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  });
};

const formatRange = (start, end) => `${formatDate(start)} - ${formatDate(end)}`;

const Home = () => {
  const D = resumeData;
  const [activeSection, setActiveSection] = useState('projects');
  const [theme, setTheme] = useState('light');
  const [activeSliderProject, setActiveSliderProject] = useState(null);
  const [sliderIndices, setSliderIndices] = useState({});
  const [lightboxProjectTitle, setLightboxProjectTitle] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const projectImageByTitle = {
    staffworks: staffworksImage,
    eventworks: eventworksImage,
    carehudl: carehudlImage,
    propnewstimes: propNewsTimesImage,
    'prop news times': propNewsTimesImage,
    elynker: elynkerImage,
  };
  const projectLinkByTitle = {
    staffworks:
      'https://play.google.com/store/apps/details?id=com.gigflex.staffworks&pcampaignid=web_share',
    eventworks:
      'https://play.google.com/store/apps/details?id=com.gigflex.eventsworks&pcampaignid=web_share',
    carehudl:
      'https://play.google.com/store/apps/details?id=com.gigflex.carehudl&hl=en_IN',
    propnewstimes:
      'https://play.google.com/store/apps/details?id=com.propnewstimes&hl=en_IN',
    'prop news times':
      'https://play.google.com/store/apps/details?id=com.propnewstimes&hl=en_IN',
    elynker: 'https://www.elynker.com/homepage',
  };
  const projectGalleryByTitle = {
    staffworks: [staffworksImage, staffworkActions, staffworkTimeshifts, staffworkShifts],
    eventworks: [eventworksImage, eventwordkAbsent, eventwordkLeave, eventworkSchedule, eventworkChat],
    carehudl: [carehudlChat, carehudlVideoCall, carehudleAudioCall, carehudlContact, carehudlImage],
    propnewstimes: [propnewstimeappHomepage, propnewstimeCategory, propNewsTimesImage],
    'prop news times': [propnewstimeappHomepage, propnewstimeCategory, propNewsTimesImage],
    elynker: [elynkerImage],
  };

  const skills = useMemo(() => {
    return Object.entries(D.skills || {}).map(([category, value]) => {
      if (Array.isArray(value)) {
        return { category: prettyLabel(category), tags: value };
      }

      const nestedTags = Object.values(value || {}).flat();
      return { category: prettyLabel(category), tags: nestedTags };
    });
  }, [D.skills]);

  const projects = useMemo(() => {
    return (D.projects || []).map((project) => ({
      title: project.title,
      subtitle: project.role || project.client,
      period: project.timeline,
      stack: (project.tools || '').split(',').map((item) => item.trim()).filter(Boolean),
      bullets: (project.achievements || []).slice(0, 3),
      image: projectImageByTitle[(project.title || '').toLowerCase()] || null,
      url: projectLinkByTitle[(project.title || '').toLowerCase()] || null,
      images:
        projectGalleryByTitle[(project.title || '').toLowerCase()] ||
        (projectImageByTitle[(project.title || '').toLowerCase()]
          ? [projectImageByTitle[(project.title || '').toLowerCase()]]
          : []),
    }));
  }, [D.projects]);

  const experience = useMemo(() => {
    const fromWork = [...(D.work_experience || [])];
    const hasOsizone = fromWork.some((item) => /osizone/i.test(item.company || ''));

    if (!hasOsizone) {
      const osizoneJourney = (D.journey || []).find((item) => /osizone/i.test(item.description || ''));
      if (osizoneJourney) {
        fromWork.push({
          title: osizoneJourney.title || 'React Native Developer',
          company: 'Osizone Services',
          location: 'Varanasi',
          start_date: '2019-07',
          end_date: '2021-09',
          achievements: [
            osizoneJourney.description,
            'Built scalable cross-platform apps with Redux and Firebase authentication.',
            'Delivered production apps to Google Play and Apple App Store.',
          ],
        });
      }
    }

    return fromWork;
  }, [D.work_experience, D.journey]);

  const getCompanyUrl = (companyName) => {
    const normalized = (companyName || '').toLowerCase();
    if (normalized.includes('e.soft')) {
      return 'https://www.esoftech.com/';
    }
    if (normalized.includes('osizone')) {
      return 'https://www.osizone.com/';
    }
    return null;
  };
  const education = (D.education || []).filter(
    (item) => item.degree && item.degree.toUpperCase() === 'BCA'
  );
  const degreeLinkByName = {
    BCA: 'https://drive.google.com/file/d/1_2nlRtvDPCeXYTIg99_dmP_nBJUSNwFz/view?usp=sharing',
  };

  const currentRole = experience.find((item) => item.end_date === 'current') || experience[experience.length - 1];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sectionIds = ['projects', 'skills', 'experience', 'education', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const offset = 140;
      let current = sectionIds[0];

      sections.forEach((section) => {
        if (window.scrollY + offset >= section.offsetTop) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!activeSliderProject) {
      return;
    }

    const activeProject = projects.find((project) => project.title === activeSliderProject);
    const totalImages = activeProject?.images?.length || 0;
    if (totalImages <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setSliderIndices((prev) => {
        const current = prev[activeSliderProject] || 0;
        return {
          ...prev,
          [activeSliderProject]: (current + 1) % totalImages,
        };
      });
    }, 1400);

    return () => window.clearInterval(timer);
  }, [activeSliderProject, projects]);

  const handleNavClick = (sectionId) => () => {
    setActiveSection(sectionId);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const getProjectSlideImage = (project) => {
    if (!project.images?.length) {
      return null;
    }

    if (activeSliderProject !== project.title) {
      return project.images[0];
    }

    const index = sliderIndices[project.title] || 0;
    return project.images[index % project.images.length];
  };

  const lightboxProject = projects.find((project) => project.title === lightboxProjectTitle) || null;

  const closeLightbox = () => {
    setLightboxProjectTitle(null);
    setLightboxIndex(0);
  };

  const openLightbox = (project) => {
    if (!project.images?.length) {
      return;
    }

    setLightboxProjectTitle(project.title);
    setLightboxIndex(sliderIndices[project.title] || 0);
  };

  const goToNextLightbox = () => {
    if (!lightboxProject?.images?.length) {
      return;
    }

    setLightboxIndex((prev) => (prev + 1) % lightboxProject.images.length);
  };

  const goToPrevLightbox = () => {
    if (!lightboxProject?.images?.length) {
      return;
    }

    setLightboxIndex((prev) => (prev - 1 + lightboxProject.images.length) % lightboxProject.images.length);
  };

  useEffect(() => {
    if (!lightboxProject?.images?.length || lightboxProject.images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setLightboxIndex((prev) => (prev + 1) % lightboxProject.images.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, [lightboxProject]);

  useEffect(() => {
    if (!lightboxProjectTitle) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
      if (event.key === 'ArrowRight') {
        goToNextLightbox();
      }
      if (event.key === 'ArrowLeft') {
        goToPrevLightbox();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxProjectTitle, lightboxProject]);

  return (
    <>
      <GlobalTheme />
      <Nav>
        <NavInner>
          <NavBrand onClick={handleScrollToTop} aria-label="Go to top">
            <NavAvatarButton>
              <NavAvatarImage src={profileImage} alt={D.name} />
            </NavAvatarButton>
            <NavName>{D.name}</NavName>
          </NavBrand>
          <NavActions>
            <NavLinks>
              <a
                href="#projects"
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={handleNavClick('projects')}
              >
                Projects
              </a>
              <a
                href="#skills"
                className={activeSection === 'skills' ? 'active' : ''}
                onClick={handleNavClick('skills')}
              >
                Skills
              </a>
              <a
                href="#experience"
                className={activeSection === 'experience' ? 'active' : ''}
                onClick={handleNavClick('experience')}
              >
                Experience
              </a>
              <a
                href="#education"
                className={activeSection === 'education' ? 'active' : ''}
                onClick={handleNavClick('education')}
              >
                Education
              </a>
              <a
                href="#contact"
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={handleNavClick('contact')}
              >
                Contact
              </a>
            </NavLinks>
            <ThemeToggle
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </ThemeToggle>
          </NavActions>
        </NavInner>
      </Nav>

      <Main>
        <Wrap>
          <Hero>
            <div>
              <HeroEyebrow>
                <span />
                <span>{currentRole?.title || 'React Native Developer'}</span>
              </HeroEyebrow>
              <HeroTitle>{D.name}</HeroTitle>
              <HeroText>
                React Native developer focused on building reliable, scalable mobile products with clean UX and strong
                performance.
              </HeroText>
              <Actions>
                <PrimaryButton href={`mailto:${D.email}`}>Email me</PrimaryButton>
                <GhostButton href={`tel:${D.phone}`}>Call me</GhostButton>
              </Actions>
            </div>
            <HeroImageWrap>
              <HeroImage src={profileImage} alt={D.name} />
              <HeroLinks>
                <LinkChip href={D.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </LinkChip>
                <LinkChip href={D.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </LinkChip>
                <LinkChip href={D.twitter} target="_blank" rel="noreferrer" aria-label="X">
                  <FaXTwitter />
                </LinkChip>
              </HeroLinks>
            </HeroImageWrap>
          </Hero>

          <Section id="projects">
            <SectionLabel>Projects</SectionLabel>
            <SectionTitle>Key work</SectionTitle>
            <CardList>
              {projects.map((project) => (
                <Reveal className="reveal" key={project.title}>
                  <Card>
                    {getProjectSlideImage(project) ? (
                      <ProjectImage
                        src={getProjectSlideImage(project)}
                        alt={`${project.title} preview`}
                        onMouseEnter={() => setActiveSliderProject(project.title)}
                        onMouseLeave={() => setActiveSliderProject(null)}
                        onClick={() => openLightbox(project)}
                      />
                    ) : null}
                    <TopRow>
                      <div>
                        <CardTitle>
                          {project.title} <CardSub>- {project.subtitle}</CardSub>
                        </CardTitle>
                        <Period>{project.period}</Period>
                      </div>
                      {project.url ? (
                        <OpenAppLink href={project.url} target="_blank" rel="noreferrer">
                          Open app
                        </OpenAppLink>
                      ) : (
                        <Badge>Private</Badge>
                      )}
                    </TopRow>
                    <BulletList>
                      {project.bullets.map((bullet, index) => (
                        <li key={`${project.title}-${index}`}>{bullet}</li>
                      ))}
                    </BulletList>
                    <StackRow>
                      {project.stack.map((item) => (
                        <StackTag key={`${project.title}-${item}`}>{item}</StackTag>
                      ))}
                    </StackRow>
                  </Card>
                </Reveal>
              ))}
            </CardList>
          </Section>

          <Section id="skills">
            <SectionLabel>Skills</SectionLabel>
            <SectionTitle>Technical toolkit</SectionTitle>
            {skills.map((skill) => (
              <Reveal className="reveal" key={skill.category}>
                <SkillRow>
                  <SkillCategory>{skill.category}</SkillCategory>
                  <Tags>
                    {skill.tags.map((tag) => (
                      <Tag key={`${skill.category}-${tag}`}>{tag}</Tag>
                    ))}
                  </Tags>
                </SkillRow>
              </Reveal>
            ))}
          </Section>

          <Section id="experience">
            <SectionLabel>Experience</SectionLabel>
            <SectionTitle>Where I have worked</SectionTitle>
            <Timeline>
              {experience.map((item, index) => (
                <Reveal className="reveal" key={`${item.company}-${index}`}>
                  <TimelineItem>
                    <TimelineDot />
                    <Card>
                      <ExpHeader>
                        <div>
                          <ExpRole>{item.title}</ExpRole>
                          <ExpCompany>
                            {item.company}, {item.location}
                          </ExpCompany>
                          {getCompanyUrl(item.company) ? (
                            <CompanyLink
                              href={getCompanyUrl(item.company)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View company
                            </CompanyLink>
                          ) : null}
                        </div>
                        <Pill>{formatRange(item.start_date, item.end_date)}</Pill>
                      </ExpHeader>
                      <BulletList>
                        {item.achievements.map((bullet, bulletIndex) => (
                          <li key={`${item.company}-${bulletIndex}`}>{bullet}</li>
                        ))}
                      </BulletList>
                    </Card>
                  </TimelineItem>
                </Reveal>
              ))}
            </Timeline>
          </Section>

          <Section id="education">
            <SectionLabel>Education</SectionLabel>
            <SectionTitle>Academic background</SectionTitle>
            <SectionHint>Instruction: Click "View Degree" to open the BCA degree document.</SectionHint>
            <Timeline>
              {education.map((edu, index) => (
                <TimelineItem key={`${edu.institution}-${index}`}>
                  <TimelineDot />
                  <EducationCard>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{edu.degree}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '2px' }}>
                        {edu.institution}, {edu.location}
                      </div>
                    </div>
                    <EducationActions>
                      <Pill>{formatRange(edu.start_date, edu.end_date)}</Pill>
                      {degreeLinkByName[edu.degree?.toUpperCase()] ? (
                        <DegreeLink
                          href={degreeLinkByName[edu.degree?.toUpperCase()]}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Degree
                        </DegreeLink>
                      ) : null}
                    </EducationActions>
                  </EducationCard>
                </TimelineItem>
              ))}
            </Timeline>
          </Section>

          <Section id="contact">
            <SectionLabel>Contact</SectionLabel>
            <SectionTitle>Get in touch</SectionTitle>
            <ContactBox>
              <p>Open to new opportunities, freelance projects, and interesting conversations.</p>
              <ContactRow>
                <PrimaryButton href={`mailto:${D.email}`}>{D.email}</PrimaryButton>
                <GhostButton href={D.github} target="_blank" rel="noreferrer">
                  GitHub
                </GhostButton>
                <GhostButton href={D.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </GhostButton>
                <GhostButton href={`tel:${D.phone}`}>{D.phone}</GhostButton>
              </ContactRow>
            </ContactBox>
          </Section>
        </Wrap>
      </Main>

      <Footer>{`© ${new Date().getFullYear()} ${D.name}`}</Footer>

      {lightboxProject ? (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxPanel onClick={(event) => event.stopPropagation()}>
            <LightboxTop>
              <LightboxTitle>{lightboxProject.title}</LightboxTitle>
              <LightboxClose onClick={closeLightbox}>Close</LightboxClose>
            </LightboxTop>
            <LightboxImageWrap>
              <LightboxImage
                src={lightboxProject.images[lightboxIndex % lightboxProject.images.length]}
                alt={`${lightboxProject.title} slide`}
              />
              {lightboxProject.images.length > 1 ? (
                <>
                  <LightboxPrev onClick={goToPrevLightbox}>‹</LightboxPrev>
                  <LightboxNext onClick={goToNextLightbox}>›</LightboxNext>
                </>
              ) : null}
            </LightboxImageWrap>
            <LightboxMeta>
              {`${(lightboxIndex % lightboxProject.images.length) + 1} / ${lightboxProject.images.length} · Auto + manual scroll`}
            </LightboxMeta>
          </LightboxPanel>
        </LightboxOverlay>
      ) : null}
    </>
  );
};

export default Home;
