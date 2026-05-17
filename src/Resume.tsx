import React, { useRef } from "react";
import "./Resume.css";
import {
  FiMapPin,
  FiGlobe,
  FiMail,
  FiGithub,
  FiDownload,
} from "react-icons/fi"; // Import icons
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  name: "Dominic Javier", // or 'Kim Javier'
  title: "Technical Leader | Project Manager | DevOps & Full-Stack Developer",
  profileImage: "/profile.jpg", // Using a local image from the `public` folder is more reliable.
  contact: {
    location: "Camarines Sur, Philippines",
    website: "https://sargo.ph",
    email: "dominjav43@gmail.com",
    github: "https://github.com/dominjav43",
  },
  summary:
    "Hands-on technical leader, mobile architect, and DevOps engineer with extensive experience building full-stack applications, robust iOS & Android ecosystems, and cloud/network automation pipelines. I lead engineering teams to deliver high-performance, secure solutions, specializing in on-device OpenXML compilation, scalable EV charging infrastructures, and automated multi-vendor networking. Proficient in translating complex business or compliance requirements into production-grade systems.",
  coreCompetencies: [
    {
      category: "Infrastructure & Cloud Automation",
      skills:
        "AWS, OVH, Kubernetes, Terraform, Docker, Traefik LB, Flyway, SOPS",
    },
    {
      category: "Full-Stack & Mobile Engineering",
      skills: "React, NestJS, Node.js, Swift/SwiftUI, SwiftData, Kotlin, Jetpack Compose, Room, Hilt, PostgreSQL",
    },
    {
      category: "Network Automation & Orchestration",
      skills: "Cisco NSO (YANG, RFM, Python, Java), Netbox, Megaport, Equinix Fabric",
    },
    {
      category: "Enterprise Security & IAM",
      skills: "OIDC/OAuth2, Keycloak, Cognito, SSO, HashiCorp Vault, Cryptography",
    },
    {
      category: "Testing & Reliability Engineering",
      skills: "Test-Driven Development (TDD), Unit & UI/E2E testing, Pact, WireMock, Load/Stress Testing",
    },
    {
      category: "CI/CD & DevOps Operations",
      skills: "GitHub Actions, GitLab Pipelines, Production-grade deployment automation",
    },
    {
      category: "UI/UX & Technical Specs",
      skills: "Figma design-to-code tokens, high-fidelity mockups, developer-friendly specifications",
    },
  ] as ICompetency[],
  experience: [
    {
      title: "Co-Founder & Lead Engineer – SARDO Mobile Ecosystem",
      details: "2024–Present",
      points: [
        "Architected and built the unified SARDO (DepEd School Form 2 Attendance Helper) mobile ecosystem, launching native iOS (Swift, SwiftUI, `@Observable`, SwiftData) and Android (Kotlin, Jetpack Compose, Room DB, Hilt, MVVM) apps to solve administrative bottlenecks for educators.",
        "Engineered an on-device OpenXML spreadsheet engine (low-level ZIP compression & XML tree parsing) to programmatically edit, compute complex attendance sums, and compile official government spreadsheets without external server dependencies.",
        "Designed and implemented an interactive, animated date navigation header with built-in custom date pickers and day-stepping animations matching premium HIG and Material Design 3 paradigms.",
        "Enforced rigorous Test-Driven Development (TDD) cycles, establishing automated unit and UI testing pipelines that compile and execute cleanly in high-concurrency environments.",
        "Integrated secure local persistence, relationship schemas (students/sections), and data backup protocols, ensuring absolute privacy and 99.9% database reliability.",
      ],
    },
    {
      title: "Founder / Technical Lead – Tournament Bracket App",
      details: "2024–Present",
      points: [
        "Designed and launched a fully automated tournament bracket platform with dynamic scheduling and player management.",
        "Built a microservices backend (NestJS + PostgreSQL) and a modern React frontend.",
        "Implemented CI/CD pipelines via GitHub Actions, reducing deployment time from hours to minutes.",
        "Integrated user login with Google authentication for secure access.",
        "Delivered a reliable platform supporting continuous tournaments and high concurrency.",
      ],
    },
    {
      title: "Cisco NSO Multi-Vendor Interconnect Services Lead",
      details: "2025–Present",
      points: [
        "Led design and implementation of Cisco NSO-based multi-vendor interconnect services using RFM (Reactive Fast Maps), extending YANG models and Python orchestration logic to support Equinix Fabric and IX connections with vendor-specific options and lifecycle handling.",
        "Developed Megaport/Equinix NED enhancements (YANG + Java) and NSO templates that translate NSO connection-service data into correct Megaport/Equinix Fabric/IX API payloads, with robust ID persistence, idempotency checks, and status polling.",
        "Architected end-to-end IX automation pattern (provisioning, polling, external sync) integrating NSO, Equinix APIs, and Netbox as system of record (ix_type modeling), reusable across providers such as Megaport and Equinix.",
      ],
    },
    {
      title: "EV Industry – Infrastructure & Systems Architect",
      details: "",
      points: [
        "Architected scalable EV backend platforms on AWS and OVH, handling thousands of concurrent connections using a microservices-based model.",
        "Designed and implemented dynamic OCPP (Open Charge Point Protocol) WebSocket traffic splitting on Traefik Load Balancer using custom PathRegexp routing rules, enabling seamless, zero-downtime charger migration and blue-green API deployments.",
        "Optimized Flyway database migration architectures using containerized Kubernetes init jobs to ensure atomic, zero-downtime schema deployments under concurrent load, eliminating manual DB interventions.",
        "Automated resource provisioning, scaling, Keycloak identity/access management, and secure secrets handling using SOPS and HashiCorp Vault.",
      ],
    },
    {
      title: "Coolify Infrastructure Architect – Linode Bare Metal",
      details: "",
      points: [
        "Architected and deployed Coolify-based infrastructure on Linode bare metal, designing Dockerized application stacks, automated DNS and TLS handling, and environment isolation for internal platforms.",
      ],
    },
    {
      title: "Legacy System Modernization & Intercloud Migration",
      details: "",
      points: [
        "Migrated legacy React apps to the latest versions, improving maintainability and developer velocity.",
        "Transformed monolithic frontends into microfrontend architecture, enabling independent feature deployment.",
        "Implemented intercloud infrastructure with Terraform for seamless multi-cloud operations.",
        "Built integration contract testing systems using Pact, reducing integration failures by 70%.",
        "Integrated enterprise authentication and authorization using OIDC, OAuth2, Cognito, SSO, and Keycloak.",
      ],
    },
    {
      title: "Technical Architect & Lead Developer – Sipartech Automation Platform",
      details: "2025–Present",
      points: [
        "Architected and engineered the stateless NetDevOps Portal & Orchestrator API (Node.js, TypeScript, Express, React), completely replacing legacy network orchestration systems to achieve scalable, modern service lifecycle management.",
        "Implemented a reactive, scan-less Zero Touch Provisioning (ZTP) workflow leveraging Kea DHCP option 67 boot redirection, temporary management IP subnets, and automated SSH-based device bootstrap/upgrade agents.",
        "Designed and built an Audit-Driven Configuration Reconciliation engine, incorporating a side-by-side 3-Pane Configuration Audit View (NSO Intent vs. Running Hardware vs. Diff) for manual drift resolution (Sync-From/Re-deploy).",
        "Pioneered service-aware orchestration paradigms, displaying real-time client service dependencies (Transit IP BGP, EVPN E-Line) to run pre-deployment operational impact analysis and mitigate accidental network downtime.",
        "Developed custom NetBox data model extensions (custom fields like `nso_device_id`, `nso_sync_state`, and `interface_role`) to map ephemeral NSO check-sync/fleet-poll states, utilizing NetBox as the single Source of Truth (SoT).",
        "Enforced strict multi-vendor interface description standards via regex-based nomenclature checks (`CUST : <Client> [<Service>] [EPL <BW>]`) during automated port-termination provisioning.",
      ],
    },
  ] as IJob[],
  projects: [
    <>
      SARDO DepEd SF2 Helper Ecosystem – Native iOS (Swift, SwiftUI, `@Observable`, SwiftData) and Android (Kotlin, Compose, Room, Hilt) apps automating school report collation via on-device OpenXML sheet compilation.
    </>,
    "EV Backend Platforms – OCPP traffic splitting (Traefik LB regex), Flyway migrations, and load-tested systems on AWS & OVH",
    "Legacy React Migration & Microfrontend Architecture",
    "NetDevOps Portal & Automation Platform – Zero Touch Provisioning (ZTP) pipeline, 3-pane configuration drift reconciliation view, and NetBox SoT integration for multi-vendor network orchestrations (Transit IP & EVPN E-Line)",
    "Cisco NSO Multi-Vendor Interconnect – Reactive Fast Maps (RFM) orchestration and Megaport & Equinix Fabric APIs integration",
  ] as React.ReactNode[],
  skills: [
    "Project Management / Agile / Scrum / Kanban",
    "Full-Stack Development: NestJS, React, Node.js, TypeScript, TypeORM, PostgreSQL, Swift/SwiftUI, SwiftData, Kotlin, Jetpack Compose, Room, Hilt, Python, Java",
    "Cloud & Infrastructure: AWS, OVH, Terraform, Kubernetes, Docker, Traefik LB, Flyway, Coolify",
    "Network Automation: Cisco NSO, Netbox, Megaport, Equinix Fabric & IX",
    "Security & Identity: Cognito, OIDC, OAuth2, SSO, Keycloak, SOPS, HashiCorp Vault",
    "Testing & Reliability: Test-Driven Development (TDD), Unit & UI Testing, Pact, WireMock, Stress/Load Testing",
    "CI/CD: GitHub Actions, GitLab, Production Pipelines",
    "UI/UX & Documentation: Figma, HIG & Material Design 3, Developer-Friendly Specifications",
  ],
};

// --- COMPONENTS ---
// Breaking the UI into smaller, reusable components improves clarity and maintainability.

const DownloadButton: React.FC<{ onDownload: () => void }> = ({
  onDownload,
}) => (
  <button onClick={onDownload} className="download-pdf-button">
    <FiDownload />
    Download as PDF
  </button>
);

const handleDownloadPdf = async (element: HTMLElement | null) => {
  if (!element) return;

  // Find the button wrapper and hide it for the screenshot
  const downloadButton = element.querySelector(
    ".download-button-wrapper",
  ) as HTMLElement;
  if (downloadButton) downloadButton.style.display = "none";

  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better quality
    useCORS: true, // Needed for external images like your profile picture
    // Ensure it captures the full height of the content, not just the visible part
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  // Show the button again after the screenshot is taken
  if (downloadButton) downloadButton.style.display = "flex";

  const imgData = canvas.toDataURL("image/png");
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // A4 width in mm is 210. Calculate height to maintain aspect ratio.
  const pdfWidth = 210;
  const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

  // Create a PDF with custom dimensions matching the content's aspect ratio
  const pdf = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: [pdfWidth, pdfHeight],
  });

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("DominicJavier-Resume.pdf");
};

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
            {resumeData.contact.website.replace("https://", "")}
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
            {resumeData.contact.github.replace("https://github.com/", "")}
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
  const resumeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="resume-container" ref={resumeRef}>
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

      <div className="download-button-wrapper">
        <DownloadButton
          onDownload={() => handleDownloadPdf(resumeRef.current)}
        />
      </div>

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
