// Import images using relative paths from the assets directory
import carehudleAudioCall from '../assets/images/carehild-audio-call.webp';
import carehudlChat from '../assets/images/carehild-chat.webp';
import carehudlAction from '../assets/images/carehudl-actiions.webp';
import carehudlContact from '../assets/images/carehudl-contact.webp';
import carehudlVideoCall from '../assets/images/carehudl-video-call.webp';
import { default as elynkerHomepage } from '../assets/images/elynker.png';
import eventwordkAbsent from '../assets/images/eventwordk-absent.webp'; // Profile view with actions
import eventwordkLeave from '../assets/images/eventwordk-leave.webp'; // Profile view with actions
import eventworkChat from '../assets/images/eventwork-chat.webp'; // More menu options
import eventworkDashbaord from '../assets/images/eventwork-dashbaord.webp'; // Chat conversation screen
import eventworkSchedule from '../assets/images/evenwork-schedule.webp'; // Contacts listing
import inasquare from '../assets/images/inasuare.png';
import propnewstimeCategory from '../assets/images/propnewstime-category.webp'; // News categories grid
import propnewstimeappHomepage from '../assets/images/propnewstimeapp-hom-pahe.webp'; // News homepage with SEBI article
import staffworkActions from '../assets/images/staffwork-actions.webp';
import staffworkDashboard from '../assets/images/staffwork-dashboard.webp';
import staffworkTimeshifts from '../assets/images/staffwork-timeshifts.webp';
import staffworkShifts from '../assets/images/staffworrk-shifts.webp';

export const projects = [
  {
    id: 1,
    title: 'Staffworks',
    projectUrl:
      'https://play.google.com/store/apps/details?id=com.gigflex.staffworks&pcampaignid=web_share',
    description:
      'Enterprise workforce management platform enabling efficient staff scheduling, real-time tracking, and automated payroll processing. Features advanced geofencing, shift management, and comprehensive reporting tools.',
    status: 'Completed',
    timeline: '2023-01 - 2023-08',
    role: 'Lead Developer',
    client: 'Enterprise Staffing Solutions',
    team: '5 Developers, 2 UI/UX Designers, 1 Project Manager',
    tools: 'React Native, TypeScript, Redux, Node.js, MongoDB',
    achievements: [
      'Developed and launched a workforce management platform serving 10,000+ monthly users',
      'Reduced scheduling conflicts by 85% through intelligent allocation algorithms',
      'Improved staff attendance tracking accuracy by 95% using geofencing',
      'Decreased payroll processing time by 60% through automation',
      'Achieved 99.9% system uptime with robust offline functionality',
      'Increased staff satisfaction by 40% through improved shift management',
      'Implemented real-time analytics reducing reporting time by 70%',
      'Streamlined onboarding process reducing training time by 50%',
    ],
    technicalStack: {
      core: [
        {
          title: 'Workforce Management',
          items: [
            'Advanced staff scheduling',
            'Real-time tracking system',
            'Automated payroll processing',
            'Geofencing integration',
            'Shift management',
            'Reporting dashboard',
          ],
        },
        {
          title: 'Core Technologies',
          items: [
            'React Native with TypeScript',
            'Redux for state management',
            'Node.js backend services',
            'MongoDB database',
            'WebSocket for real-time',
          ],
        },
      ],
      additional: [
        {
          title: 'Security Features',
          items: ['Role-based access', 'Data encryption', 'Audit logging'],
        },
        {
          title: 'Integration Services',
          items: ['Payroll systems', 'HR management', 'Time tracking'],
        },
      ],
    },
    implementation: {
      core: [
        {
          title: 'Staff Management',
          items: [
            'Scheduling system',
            'Attendance tracking',
            'Performance monitoring',
            'Leave management',
          ],
        },
        {
          title: 'Data Management',
          items: [
            'Real-time sync',
            'Offline support',
            'Data backup',
            'Analytics engine',
          ],
        },
      ],
      optimization: [
        {
          title: 'Performance Features',
          items: ['Caching system', 'Load balancing', 'Query optimization'],
        },
        {
          title: 'Mobile Features',
          items: ['Push notifications', 'Location services', 'Offline mode'],
        },
      ],
    },
    future: {
      features: [
        {
          title: 'AI Integration',
          items: [
            'Smart scheduling',
            'Predictive analytics',
            'Automated reporting',
          ],
        },
        {
          title: 'Platform Expansion',
          items: [
            'Multi-tenant support',
            'API marketplace',
            'White-label solution',
          ],
        },
      ],
    },
    videoUrl: 'https://www.youtube.com/embed/lr2RxrWqkko',
    imageUrl: 'https://www.gigflex.com/wp-content/uploads/2021/07/staff_01.png',
    images: [
      staffworkDashboard,
      staffworkActions,
      staffworkTimeshifts,
      staffworkShifts,
    ],
    labels: ['Homepage', 'Actions', 'Shifts', 'New Shift'],
  },
  {
    id: 2,
    title: 'EventWorks',
    projectUrl:
      'https://play.google.com/store/apps/details?id=com.gigflex.eventsworks&pcampaignid=web_share',
    description:
      'Comprehensive event management platform that streamlines staff allocation, venue coordination, and real-time event monitoring. Features dynamic scheduling, resource management, and integrated security protocols.',
    status: 'Completed',
    // 'Homepage',
    // 'Present/Absent View',
    // 'Late View',
    // 'Daily Schedule',
    // 'Today View',
    images: [
      eventworkDashbaord, // Chat conversation screen
      eventwordkAbsent, // Contacts listing
      eventwordkLeave, // Video call interface
      eventworkSchedule, // Contacts listing
      eventworkChat, // Profile view with actions
      eventworkDashbaord, // More menu options
    ],
    timeline: '2022-09 - 2023-04',
    role: 'Technical Lead',
    client: 'Event Management Company',
    team: '4 Developers, 2 UI/UX Designers, 1 QA Engineer',
    tools: 'React Native, GraphQL, AWS, Node.js',
    achievements: [
      'Enabled efficient workforce management, ensuring optimal resource allocation',
      'Reduced manual entry time by 40% with an integrated attendance system',
      'Implemented robust security features to ensure attendee and staff safety',
      'Increased event setup efficiency by 50% through automated resource allocation',
      'Achieved 99.9% system uptime during peak event periods',
      'Reduced event planning timeline by 30% through streamlined processes',
    ],
    technicalStack: {
      core: [
        {
          title: 'Event Management Features',
          items: [
            'Dynamic staff allocation system',
            'Real-time event monitoring',
            'Resource tracking and management',
            'Automated scheduling system',
            'Venue capacity optimization',
            'Emergency response integration',
          ],
        },
        {
          title: 'Core Technologies',
          items: [
            'React Native for cross-platform development',
            'GraphQL for efficient data queries',
            'AWS for scalable infrastructure',
            'Socket.io for real-time updates',
            'MongoDB for flexible data storage',
          ],
        },
      ],
      additional: [
        {
          title: 'Security & Access Control',
          items: [
            'RFID integration',
            'Biometric verification',
            'Role-based access control',
          ],
        },
        {
          title: 'Integration Services',
          items: [
            'Payment gateway integration',
            'Third-party vendor APIs',
            'Emergency services connection',
          ],
        },
      ],
    },
    implementation: {
      core: [
        {
          title: 'Event Management System',
          items: [
            'Automated resource allocation',
            'Real-time capacity monitoring',
            'Dynamic staff scheduling',
            'Emergency response system',
          ],
        },
        {
          title: 'Data Management',
          items: [
            'Distributed database system',
            'Real-time synchronization',
            'Backup and recovery',
            'Data analytics integration',
          ],
        },
      ],
      optimization: [
        {
          title: 'Performance Features',
          items: [
            'Load balancing',
            'Cache optimization',
            'Query performance tuning',
          ],
        },
        {
          title: 'Scalability',
          items: [
            'Horizontal scaling',
            'Microservices architecture',
            'Container orchestration',
          ],
        },
      ],
    },
    future: {
      features: [
        {
          title: 'Advanced Analytics',
          items: [
            'Predictive attendance modeling',
            'Resource optimization AI',
            'Automated vendor management',
          ],
        },
        {
          title: 'Enhanced Security',
          items: [
            'AI-powered threat detection',
            'Automated security protocols',
            'Integrated emergency response',
          ],
        },
      ],
    },
    videoUrl: 'https://www.youtube.com/embed/UbCDt_tbBWE',
    imageUrl: 'https://www.gigflex.com/wp-content/uploads/2021/07/event_02.png',
    labels: [
      'Homepage',
      'Present/Absent View',
      'Late View',
      'Daily Schedule',
      'Today View',
    ],
  },
  {
    id: 3,
    title: 'Carehudl',
    images: [
      carehudlChat, // Chat messaging interface
      carehudlVideoCall, // Video call screen
      carehudleAudioCall, // Audio call screen
      carehudlContact, // Message thread view
      carehudlAction, // User profile actions
    ],
    description:
      'Healthcare management platform facilitating patient care coordination, staff scheduling, and medical resource allocation. Features real-time patient monitoring and integrated medical records management.',
    status: 'Completed',
    timeline: '2023-05 - 2023-12',
    role: 'Senior Developer',
    client: 'Healthcare Provider Network',
    team: '6 Developers, 1 UI/UX Designer, 2 Healthcare Consultants',
    tools: 'React Native, Redux Saga, Firebase, FHIR API',
    achievements: [
      'Improved scheduling efficiency, reducing manual coordination time',
      'Simplified documentation processes, reducing paperwork and improving accuracy',
      'Implemented HIPAA-compliant data management system',
      'Reduced patient wait times by 35% through optimized scheduling',
      'Increased staff efficiency by 45% with automated task management',
      'Achieved 99.99% uptime for critical care functions',
    ],
    technicalStack: {
      core: [
        {
          title: 'Healthcare Management Features',
          items: [
            'Electronic Health Records (EHR) integration',
            'Real-time patient monitoring',
            'Automated staff scheduling',
            'Medical resource tracking',
            'HIPAA-compliant data handling',
            'Emergency alert system',
          ],
        },
        {
          title: 'Core Technologies',
          items: [
            'React Native with TypeScript',
            'Redux Saga for state management',
            'FHIR API integration',
            'Firebase for real-time updates',
            'MongoDB for medical records',
          ],
        },
      ],
      additional: [
        {
          title: 'Security & Compliance',
          items: [
            'HIPAA compliance system',
            'End-to-end encryption',
            'Audit trail logging',
          ],
        },
        {
          title: 'Integration Services',
          items: [
            'Medical device integration',
            'Laboratory system connection',
            'Pharmacy management system',
          ],
        },
      ],
    },
    implementation: {
      core: [
        {
          title: 'Patient Care System',
          items: [
            'Patient record management',
            'Care plan automation',
            'Medication tracking',
            'Appointment scheduling',
          ],
        },
        {
          title: 'Staff Management',
          items: [
            'Shift management',
            'Skill-based routing',
            'Workload balancing',
            'Performance tracking',
          ],
        },
      ],
      optimization: [
        {
          title: 'Performance Features',
          items: [
            'Offline data access',
            'Fast data synchronization',
            'Resource optimization',
          ],
        },
        {
          title: 'Security Measures',
          items: [
            'Role-based access',
            'Data encryption',
            'Secure communication',
          ],
        },
      ],
    },
    future: {
      features: [
        {
          title: 'AI Integration',
          items: [
            'Predictive care analytics',
            'Automated diagnosis assistance',
            'Resource optimization',
          ],
        },
        {
          title: 'Enhanced Patient Care',
          items: [
            'Telemedicine integration',
            'Remote monitoring',
            'Patient engagement tools',
          ],
        },
      ],
    },
    videoUrl: 'https://www.youtube.com/embed/24f35bO9PzQ',
    imageUrl:
      'https://www.gigflex.com/wp-content/uploads/2021/07/CareHudl_03.jpg',
    labels: [
      'User Profile Actions',
      'Video Call',
      'Audio Call',
      'Chat',
      'Actions',
    ],
  },
  {
    id: 4,
    title: 'Prop News Times',
    images: [
      propnewstimeappHomepage, // News homepage with SEBI article
      propnewstimeCategory, // News categories grid
    ],
    projectUrl:
      'https://play.google.com/store/apps/details?id=com.propnewstimes&pcampaignid=web_share',
    description:
      'Real estate news and analytics platform providing real-time market insights, property listings, and investment analysis tools. Features automated news aggregation and personalized content delivery.',
    status: 'Active',
    timeline: '2023-08 - Present',
    role: 'Lead Developer',
    client: 'Real Estate Media Company',
    team: '3 Developers, 1 Data Analyst, 2 Content Managers',
    tools: 'React Native, Node.js, MongoDB, AWS',
    achievements: [
      'Generated timely real estate updates, attracting 5,000 new users',
      'Compiled and analyzed 50+ property news articles weekly',
      'Increased user engagement by 20% through personalized content',
      'Implemented automated news aggregation reducing manual effort by 70%',
      'Achieved 40% increase in user retention through improved UX',
      'Developed real-time market analysis tools',
    ],
    technicalStack: {
      core: [
        {
          title: 'News Platform Features',
          items: [
            'Automated news aggregation',
            'Real-time market updates',
            'Property listing integration',
            'Investment analysis tools',
            'Personalized content delivery',
            'Market trend visualization',
          ],
        },
        {
          title: 'Core Technologies',
          items: [
            'React Native for mobile apps',
            'Node.js backend services',
            'MongoDB for content storage',
            'AWS for cloud infrastructure',
            'Elasticsearch for search',
          ],
        },
      ],
      additional: [
        {
          title: 'Content Management',
          items: [
            'Automated content curation',
            'SEO optimization',
            'Content analytics',
          ],
        },
        {
          title: 'Analytics Integration',
          items: [
            'Market trend analysis',
            'User behavior tracking',
            'Performance metrics',
          ],
        },
      ],
    },
    implementation: {
      core: [
        {
          title: 'News Management',
          items: [
            'Content aggregation system',
            'Real-time updates',
            'Category management',
            'Search optimization',
          ],
        },
        {
          title: 'User Experience',
          items: [
            'Personalization engine',
            'Recommendation system',
            'Interactive features',
            'Push notifications',
          ],
        },
      ],
      optimization: [
        {
          title: 'Performance Features',
          items: [
            'Content caching',
            'Image optimization',
            'Load time reduction',
          ],
        },
        {
          title: 'Analytics',
          items: [
            'User engagement tracking',
            'Content performance',
            'Market trend analysis',
          ],
        },
      ],
    },
    future: {
      features: [
        {
          title: 'AI Integration',
          items: [
            'Automated market analysis',
            'Predictive trend modeling',
            'Smart content curation',
          ],
        },
        {
          title: 'Enhanced Features',
          items: [
            'Virtual property tours',
            'Investment calculators',
            'Market comparison tools',
          ],
        },
      ],
    },
    videoUrl: 'https://www.youtube.com/embed/8MGV27Rvakg',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D5612AQFY6ojlJtBw6A/article-cover_image-shrink_720_1280/B56ZVfVysQHsAI-/0/1741061303927?e=1746662400&v=beta&t=AlvlvTNTHP8Lxp8Lll7tn86FQMM2_7sfsMDKrnwaABU',
    labels: ['Dashboard View', 'Category View'],
  },
  {
    id: 5,
    title: 'Elynker',
    images: [elynkerHomepage],
    projectUrl: 'https://www.elynker.com/homepage',
    description:
      'Digital transformation platform providing comprehensive business solutions including process automation, analytics, and cloud integration. Features customizable workflows and real-time performance monitoring.',
    status: 'Active',
    timeline: '2023-04 - Present',
    role: 'Technical Architect',
    client: 'Multiple Enterprise Clients',
    team: '8 Developers, 3 Business Analysts, 2 DevOps Engineers',
    tools: 'React Native, AWS, Kubernetes, Terraform',
    achievements: [
      'Guided digital transformation initiatives for 75 clients',
      'Achieved 40% improvement in operational efficiency',
      'Developed React-based web application with 5,000 active users',
      'Drove 15% revenue growth within six months',
      'Implemented cloud-native architecture reducing costs by 30%',
      'Automated 60% of manual business processes',
    ],
    technicalStack: {
      core: [
        {
          title: 'Platform Features',
          items: [
            'Process automation engine',
            'Real-time analytics dashboard',
            'Cloud integration services',
            'Workflow management',
            'Performance monitoring',
            'Custom report generation',
          ],
        },
        {
          title: 'Core Technologies',
          items: [
            'React Native for mobile',
            'Kubernetes for orchestration',
            'Terraform for infrastructure',
            'AWS cloud services',
            'GraphQL for API',
          ],
        },
      ],
      additional: [
        {
          title: 'Security & Compliance',
          items: [
            'Enterprise-grade security',
            'Compliance monitoring',
            'Access control system',
          ],
        },
        {
          title: 'Integration Services',
          items: [
            'Legacy system integration',
            'API management',
            'Data migration tools',
          ],
        },
      ],
    },
    implementation: {
      core: [
        {
          title: 'Business Process Automation',
          items: [
            'Workflow automation',
            'Document processing',
            'Task management',
            'Process analytics',
          ],
        },
        {
          title: 'Cloud Infrastructure',
          items: [
            'Microservices architecture',
            'Container orchestration',
            'Auto-scaling',
            'Disaster recovery',
          ],
        },
      ],
      optimization: [
        {
          title: 'Performance Features',
          items: [
            'Resource optimization',
            'Load balancing',
            'Cache management',
          ],
        },
        {
          title: 'Monitoring',
          items: [
            'Real-time metrics',
            'Performance analytics',
            'System health checks',
          ],
        },
      ],
    },
    future: {
      features: [
        {
          title: 'AI/ML Integration',
          items: [
            'Predictive analytics',
            'Machine learning models',
            'Automated decision making',
          ],
        },
        {
          title: 'Platform Evolution',
          items: [
            'Blockchain integration',
            'IoT device support',
            'Extended API ecosystem',
          ],
        },
      ],
    },
    videoUrl: 'https://www.youtube.com/embed/a37C30HCLtg',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQElPugfA0SAnw/feedshare-shrink_800/0/1726032502682?e=1744243200&v=beta&t=aCpUSMTUXAyDNeeLs3J3WJHgq0XiP0dMMJ5a8lYzYxw',
    labels: ['Homepage'],
  },
  {
    id: 6,
    title: 'Inasquare',
    images: [inasquare],
    description:
      'E-commerce platform tailored for the Omani market, featuring localized shopping experience, multi-vendor support, and integrated payment solutions. Supports both B2C and B2B transactions.',
    status: 'Completed',
    timeline: '2019-02 - 2019-06',
    role: 'Full Stack Developer',
    client: 'Retail Company in Oman',
    team: '4 Developers, 1 UI Designer, 1 Product Manager',
    tools: 'React Native, Node.js, MongoDB, Stripe',
    achievements: [
      'Launched successful e-commerce platform in Oman',
      'Drove 30% growth in regional sales within three months',
      'Attracted 25,000 active users in the first year',
      'Implemented localized payment solutions',
      'Reduced checkout time by 40%',
      'Achieved 98% positive user feedback',
    ],
    technicalStack: {
      core: [
        {
          title: 'E-commerce Features',
          items: [
            'Multi-vendor marketplace',
            'Order management system',
            'Inventory tracking',
            'Payment processing',
            'Shipping integration',
            'Analytics dashboard',
          ],
        },
        {
          title: 'Core Technologies',
          items: [
            'React Native for mobile',
            'Node.js backend',
            'MongoDB database',
            'Redis caching',
            'AWS infrastructure',
          ],
        },
      ],
      additional: [
        {
          title: 'Payment & Security',
          items: [
            'Local payment gateways',
            'Fraud detection',
            'Data encryption',
          ],
        },
        {
          title: 'Localization',
          items: [
            'Arabic language support',
            'Regional pricing',
            'Cultural customization',
          ],
        },
      ],
    },
    implementation: {
      core: [
        {
          title: 'Shopping Experience',
          items: [
            'Product catalog',
            'Search system',
            'Cart management',
            'Checkout process',
          ],
        },
        {
          title: 'Backend Systems',
          items: [
            'Order processing',
            'Inventory management',
            'User authentication',
            'Analytics tracking',
          ],
        },
      ],
      optimization: [
        {
          title: 'Performance Features',
          items: [
            'Image optimization',
            'Cache management',
            'Load time reduction',
          ],
        },
        {
          title: 'User Experience',
          items: [
            'Personalization',
            'Search optimization',
            'Mobile responsiveness',
          ],
        },
      ],
    },
    future: {
      features: [
        {
          title: 'Platform Expansion',
          items: [
            'Regional market expansion',
            'B2B marketplace features',
            'Advanced analytics',
          ],
        },
        {
          title: 'Enhanced Features',
          items: [
            'AI-powered recommendations',
            'Automated marketing',
            'Loyalty program',
          ],
        },
      ],
    },
    videoUrl: 'https://www.youtube.com/embed/bsfEurlPbY0',
    imageUrl:
      'https://unctad.org/sites/default/files/2021-03/2021-03-15_eCommerceCOVID19report-1-1220x675px.jpg',
    labels: ['Homepage'],
  },
];

// First, let's create a copy of the projects array
const projectsData = [...projects];

// Then update the projects with missing data
const updatedProjects = projectsData.map((project) => ({
  ...project,
  labels: project.labels || [
    'Login/Homepage',
    'Dashboard View',
    'Mobile Interface',
    'Features Overview',
    'Settings Panel',
  ],
  // ... rest of the default values ...
}));

// Export the updated projects
export default updatedProjects;
