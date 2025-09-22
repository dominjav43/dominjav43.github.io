import React from 'react';
import './Resume.css';
import { FiMapPin, FiGlobe, FiMail, FiGithub } from 'react-icons/fi'; // Import icons

// --- DATA ---
// Separating data from the component makes it easier to manage and update.

interface IJob {
  title: string;
  details: string;
  points: string[];
}

interface ICompetency {
  category: string;
  skills: string;
}

const resumeData = {
  name: 'Kim Javier',
  title: 'Technical Leader | Project Manager | DevOps & Full-Stack Developer',
  profileImage:
    'https://media.licdn.com/dms/image/v2/C5603AQFGp_E9-asKBA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1610005980560?e=1761177600&v=beta&t=9T_mHMFsjhMcT9ekimSDQ8w-XSjk6FoffMb38gnOOGc', // <-- Add your image to the `public` folder
  contact: {
    location: 'Camarines Sur, Philippines',
    website: 'https://sargo.ph',
    email: 'dominjav43@gmail.com',
    github: 'https://github.com/dominjav43',
  },
  summary:
    'Hands-on technical leader and project manager with expertise in full-stack development, DevOps, cloud infrastructure, network automation, and enterprise security. I build and lead engineering teams to deliver robust, automated, and secure systems for industries including EV platforms and intercloud services. Skilled in bridging software development, infrastructure, and network operations, with a focus on scalable, high-performance, and maintainable applications.',
  coreCompetencies: [
    {
      category: 'Infrastructure & Cloud Automation',
      skills:
        'AWS, OVH, Terraform, Docker/Kubernetes, IAM, SOPS, HashiCorp Vault',
    },
    {
      category: 'Full-Stack & Microservices',
      skills: 'NestJS, React, Node.js, PostgreSQL, Microfrontend architectures',
    },
    {
      category: 'Network Automation & Connectivity',
      skills: 'Cisco NSO, NetBox, Megaport, Equinix',
    },
    {
      category: 'Enterprise Security',
      skills: 'OIDC/OAuth2, Keycloak, SSO, IAM, Vault, SOPS',
    },
    {
      category: 'Testing & Reliability',
      skills: 'Stress/load testing, integration testing, Pact, WireMock',
    },
    {
      category: 'CI/CD & DevOps',
      skills: 'GitHub Actions, GitLab pipelines, production deployments',
    },
    {
      category: 'UI/UX & Documentation',
      skills: 'Figma, developer-friendly specifications',
    },
  ] as ICompetency[],
  experience: [
    {
      title: 'Founder / Technical Lead – Tournament Bracket App',
      details: '2024–Present',
      points: [
        'Designed and launched a fully automated tournament bracket platform with dynamic scheduling and player management.',
        'Built a microservices backend (NestJS + PostgreSQL) and a modern React frontend.',
        'Implemented CI/CD pipelines via GitHub Actions, reducing deployment time from hours to minutes.',
        'Integrated user login with Google authentication for secure access.',
        'Delivered a reliable platform supporting continuous tournaments and high concurrency.',
      ],
    },
    {
      title: 'EV Industry – Infrastructure & Systems Architect',
      details: '',
      points: [
        'Architected scalable EV backend platforms on AWS and OVH, handling thousands of concurrent connections.',
        'Automated provisioning, scaling, and identity/access management across multiple cloud environments.',
        'Implemented stress/load testing to validate performance and reliability.',
        'Managed secrets and secure configuration using SOPS and Keycloak.',
      ],
    },
    {
      title: 'Legacy System Modernization & Intercloud Migration',
      details: '',
      points: [
        'Migrated legacy React apps to the latest versions, improving maintainability and developer velocity.',
        'Transformed monolithic frontends into microfrontend architecture, enabling independent feature deployment.',
        'Implemented intercloud infrastructure with Terraform for seamless multi-cloud operations.',
        'Built integration contract testing systems using Pact, reducing integration failures by 70%.',
        'Integrated enterprise authentication and authorization using OIDC, OAuth2, Cognito, SSO, and Keycloak.',
      ],
    },
    {
      title: 'Network Services Automation – Cisco NSO & Vendor Integration',
      details: '',
      points: [
        'Designed backend automation systems using Cisco NSO, integrating Megaport virtual connectivity and Equinix data centers.',
        'Maintained network inventory and orchestration with NetBox.',
        'Ensured secure vendor API authentication and automated workflows.',
      ],
    },
  ] as IJob[],
  projects: [
    <>
      Tournament Bracket Platform – Live at{' '}
      <a href="https://sargo.ph" target="_blank" rel="noopener noreferrer">
        sargo.ph
      </a>{' '}
      (Google login)
    </>,
    'EV Backend Platforms – Scalable, stress-tested systems on AWS and OVH',
    'Legacy React Migration & Microfrontend Implementation',
    'Network Automation Backend – Cisco NSO integration with Megaport & Equinix',
  ] as React.ReactNode[],
  skills: [
    'Project Management / Agile / Scrum',
    'Full-Stack Development: NestJS, React, Node.js, TypeScript, TypeORM, PostgreSQL',
    'Cloud & Infrastructure: AWS, OVH, Terraform, Kubernetes, Docker, IAM',
    'Network Automation: Cisco NSO, NetBox, Megaport, Equinix',
    'Security & Identity: Cognito, OIDC, OAuth2, SSO, Keycloak, SOPS, HashiCorp Vault',
    'Testing & Reliability: Simulators, Pact, WireMock, Stress/Load Testing',
    'CI/CD: GitHub Actions, GitLab, Production Pipelines',
    'UI/UX & Documentation: Figma, Developer-Friendly Specifications',
  ],
};

// --- COMPONENTS ---
// Breaking the UI into smaller, reusable components improves clarity and maintainability.

const ResumeHeader: React.FC = () => (
  <header className="resume-header">
    <div className="header-main">
      <h1>{resumeData.name}</h1>
      <p className="title">{resumeData.title}</p>
      <div className="contact-info">
        <div className="contact-item">
          <FiMapPin className="contact-icon" />
          <span>{resumeData.contact.location}</span>
        </div>
        <div className="contact-item">
          <FiGlobe className="contact-icon" />
          <a
            href={resumeData.contact.website}
            target="_blank"
            rel="noopener noreferrer">
            {resumeData.contact.website.replace('https://', '')}
          </a>
        </div>
        <div className="contact-item">
          <FiMail className="contact-icon" />
          <a href={`mailto:${resumeData.contact.email}`}>
            {resumeData.contact.email}
          </a>
        </div>
        <div className="contact-item">
          <FiGithub className="contact-icon" />
          <a
            href={resumeData.contact.github}
            target="_blank"
            rel="noopener noreferrer">
            {resumeData.contact.github.replace('https://github.com/', '')}
          </a>
        </div>
      </div>
    </div>
    <img
      src={resumeData.profileImage}
      alt="Profile"
      className="profile-image"
    />
  </header>
);

const ResumeSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className={title.toLowerCase()}>
    <h2>{title}</h2>
    {children}
  </section>
);

const JobEntry: React.FC<{ job: IJob }> = ({ job }) => (
  <div className="job-entry">
    <h3>
      {job.title}
      {job.details && ` – ${job.details}`}
    </h3>
    <ul>
      {job.points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
);

// --- MAIN COMPONENT ---
// The main component now assembles the smaller pieces, making the structure clear.

const Resume: React.FC = () => {
  return (
    <div className="resume-container">
      <ResumeHeader />

      <ResumeSection title="Summary">
        <p>{resumeData.summary}</p>
        <h3>Core Competencies:</h3>
        <ul>
          {resumeData.coreCompetencies.map((comp, index) => (
            <li key={index}>
              <strong>{comp.category}:</strong> {comp.skills}
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="Experience">
        {resumeData.experience.map((job, index) => (
          <JobEntry key={index} job={job} />
        ))}
      </ResumeSection>

      <ResumeSection title="Projects / Featured Work">
        <ul>
          {resumeData.projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="Skills">
        <ul>
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </ResumeSection>

      {/*
      <ResumeSection title="Education">
        <p>
          [Your Degree], [Your University], [Year]
        </p>
      </ResumeSection>
      */}
    </div>
  );
};

export default Resume;
