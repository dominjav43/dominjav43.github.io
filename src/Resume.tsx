import React, { useState, useRef } from "react";
import "./Resume.css";
import {
  FiMapPin,
  FiGlobe,
  FiMail,
  FiGithub,
  FiDownload,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface IJob {
  title: string;
  details: string;
  coreExpertise: string;
  points: string[];
}

interface ICompetency {
  category: string;
  skills: string;
}

interface IOperationDomain {
  title: string;
  items: string[];
}

const resumeData = {
  name: "Dominic Javier",
  title: "Technical Leader | DevOps & AI Engineer | Full-Stack Architect",
  profileImage: "/profile.jpg",
  contact: {
    location: "Camarines Sur, Philippines",
    email: "dominjav43@gmail.com",
    github: "https://github.com/dominjav43",
    website: "https://dominjav43.github.io",
  },
  summary:
    "Hands-on technical leader, full stack architect, and DevOps engineer with extensive experience building full-stack applications, robust iOS & Android ecosystems, and cloud/network automation pipelines. I lead engineering teams to deliver premium, secure solutions, specializing in agent-native design-to-code pipelines (Open Design), on-device OpenXML compilation, scalable EV charging infrastructures, and automated multi-vendor networking. Proficient in translating complex business or compliance requirements into production-grade systems. Beyond implementation, I own the full engineering lifecycle — architecture documentation, functional specification, QA planning, incident response, and release management across production platforms.",
  coreCompetencies: [
    {
      category: "Agentic AI & LLM Orchestration",
      skills:
        "Agentic Workflows (ECC), PRP Workflows (PRD/Plan/Implement), Ralph Autonomous Loops, Open Design (nexu-io/open-design), Multi-Agent Fleet Orchestration, Loop Operators, Context/Token Optimization, TDD-guided AI Development, Custom MCP Servers",
    },
    {
      category: "Infrastructure & Cloud Automation",
      skills:
        "AWS, OVH, Kubernetes, Terraform, Docker, Traefik LB, Flyway, SOPS, Coolify",
    },
    {
      category: "Full-Stack & Mobile Engineering",
      skills: "React, NestJS, Node.js, Swift/SwiftUI, `@Observable`, SwiftData, Kotlin, Jetpack Compose, Room, Hilt, PostgreSQL",
    },
    {
      category: "Network Automation & Orchestration",
      skills: "Cisco NSO (YANG, RFM, Python, Java), NetBox, Kea DHCP (ZTP Option 67), Megaport, Equinix Fabric & IX",
    },
    {
      category: "Enterprise Security & IAM",
      skills: "OIDC/OAuth2, Keycloak, Authentik, Cognito, SSO, HashiCorp Vault, Cryptography",
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
      category: "UI/UX & Design Systems",
      skills: "Open Design (nexu-io/open-design), Figma design-to-code tokens, portable DESIGN.md systems, high-fidelity interactive mockups",
    },
    {
      category: "Technical PM & Engineering Documentation",
      skills: "System architecture documentation, functional specification authoring, QA test planning, incident response & postmortems, release management & changelogs, user/admin guide authoring, code review & design audit facilitation, engineering standards definition",
    },
  ] as ICompetency[],
  experience: [
    {
      title: "Founder & Lead Engineer – SARDO Mobile Ecosystem",
      details: "2026\u2013Present",
      coreExpertise: "iOS (Swift, SwiftUI, `@Observable`, SwiftData), Android (Kotlin, Jetpack Compose, Room, Hilt), OpenXML, MVVM, TDD",
      points: [
        "**Architected** and launched the unified SARDO (DepEd School Form 2 Attendance Helper) mobile ecosystem, delivering native iOS (Swift, SwiftUI, `@Observable`, SwiftData) and Android (Kotlin, Jetpack Compose, Room, Hilt) applications that reclaim up to 8 hours of monthly administrative overhead per educator.",
        "**Engineered** an on-device OpenXML spreadsheet engine (low-level ZIP compression & XML tree parsing) to programmatically edit, compute complex attendance sums, and compile official government spreadsheets without external server dependencies.",
        "**Designed** and implemented an interactive, animated date navigation header with built-in custom date pickers and day-stepping animations matching premium HIG and Material Design 3 paradigms.",
        "**Implemented** a hybrid freemium monetization architecture enabling 3 free spreadsheet exports with full feature previews, seamlessly linked with local device-state tracking to ensure reliable and tamper-proof access control.",
        "**Enforced** rigorous Test-Driven Development (TDD) cycles, establishing automated unit and UI testing pipelines that compile and execute cleanly in high-concurrency environments.",
        "**Integrated** secure local persistence, relationship schemas (students/sections), and data backup protocols, ensuring absolute privacy and 99.9% database reliability.",
      ],
    },
    {
      title: "Technical Architect & Lead Developer – Sipartech Automation Platform",
      details: "2025\u2013Present",
      coreExpertise: "Node.js, TypeScript, Express, React, NestJS, Kea DHCP (ZTP Option 67), NetBox API, Cisco NSO, YANG",
      points: [
        "**Architected** and engineered a stateless Sipartech Portal & Orchestrator API (Node.js, TypeScript, Express, React), completely replacing legacy network orchestration systems to achieve scalable, modern service lifecycle management.",
        "**Spearheaded** a reactive, scan-less Zero Touch Provisioning (ZTP) workflow leveraging Kea DHCP option 67 boot redirection, temporary management IP subnets, and automated SSH-based device bootstrap/upgrade agents.",
        "**Pioneered** service-aware orchestration paradigms, displaying real-time client service dependencies (Transit IP BGP, EVPN E-Line) to run pre-deployment operational impact analysis and mitigate accidental network downtime.",
        "**Engineered** custom NetBox data model extensions to map ephemeral NSO check-sync/fleet-poll states, utilizing NetBox as the single Source of Truth (SoT).",
      ],
    },
    {
      title: "Cisco NSO Multi-Vendor Interconnect Services Lead",
      details: "2025\u2013Present",
      coreExpertise: "Cisco NSO, YANG, RFM (Reactive Fast Maps), Python, Java, Equinix Fabric & IX APIs, Megaport API, NetBox",
      points: [
        "**Spearheaded** the design and implementation of Cisco NSO-based multi-vendor interconnect services using RFM (Reactive Fast Maps), extending YANG models and Python orchestration logic to support Equinix Fabric and IX connections with vendor-specific options and lifecycle handling.",
        "**Engineered** Megaport/Equinix NED enhancements (YANG + Java) and NSO templates that translate NSO connection-service data into correct Megaport/Equinix Fabric/IX API payloads, with robust ID persistence, idempotency checks, and status polling.",
        "**Architected** an end-to-end IX automation pattern (provisioning, polling, external sync) integrating NSO, Equinix APIs, and Netbox as system of record (ix_type modeling), reusable across providers such as Megaport and Equinix.",
      ],
    },
    {
      title: "EV Industry – Infrastructure & Systems Architect",
      details: "2024\u2013Present",
      coreExpertise: "AWS, OVH, Kubernetes (EKS), Traefik LB, OCPP, Flyway, SOPS, HashiCorp Vault, Keycloak, Authentik",
      points: [
        "**Architected** scalable EV backend platforms on AWS and OVH, handling thousands of concurrent connections using a microservices-based model.",
        "**Engineered** and implemented dynamic OCPP (Open Charge Point Protocol) WebSocket traffic splitting on Traefik Load Balancer using custom PathRegexp routing rules, enabling seamless, zero-downtime charger migration and blue-green API deployments.",
        "**Optimized** Flyway database migrations via Kubernetes init jobs, achieving fully automated, atomic schema updates under high concurrent loads",
        "**Automated** resource provisioning, scaling, Keycloak & Authentik identity/access management, and secure secrets handling using SOPS and HashiCorp Vault.",
        "**Led** production stress testing campaigns validating 4,000 concurrent charge boxes with zero errors — eliminated DB bottlenecks (query latency 23s \u2192 <10ms, MySQL CPU 100% \u2192 <20%) and authored AWS-to-OVH migration analysis driving 50% operating cost reduction.",
      ],
    },
  ] as IJob[],
  projects: [
    {
      title: "SARDO DepEd SF2 Ecosystem",
      icon: "\uD83D\uDCF1",
      description: "Native iOS (Swift, SwiftUI, SwiftData) and Android (Kotlin, Compose, Room, Hilt) apps automating school report collation via on-device OpenXML sheet compilation.",
      achievements: [
        "Designed freemium monetization architecture with local device-state tracking for tamper-proof access control, balancing revenue with user trust.",
        "Engineered on-device OpenXML spreadsheet engine that compiles government-compliant attendance reports without server dependencies.",
        "Established TDD pipelines with automated unit, UI, and concurrency test cycles across both platforms.",
        "Authored cross-platform architecture documentation covering SwiftData/Room schemas, MVVM state flow, and deployment workflows.",
      ],
      tags: ["SwiftUI", "Jetpack Compose", "OpenXML", "SwiftData", "Hilt"]
    },
    {
      title: "Sipartech Network Automation Platform",
      icon: "\uD83D\uDD0C",
      description: "Multi-vendor network automation platform replacing legacy Prelude — ZTP, configuration reconciliation, and service orchestration.",
      achievements: [
        "Architected the complete platform and documented system design, functional requirements, and API contracts for a multi-vendor NSO-based automation replacement.",
        "Specified and delivered user, admin, and install guides alongside ZTP templates, DHCP server configuration, and device onboarding workflows.",
        "Led QA planning with formal test coverage and regression reviews for customer port provisioning, EVPN E-Line, and device sync scenarios.",
        "Chaired code review audits comparing implementation fidelity against design specifications across major feature MRs.",
      ],
      tags: ["NestJS", "React", "Cisco NSO", "NetBox", "DHCP ZTP"]
    },
    {
      title: "E55C EV Charging Infrastructure Platform",
      icon: "\u26A1",
      description: "Production EV charging backend (SteVe OCPP + angus-api OCPI bridge) stress-tested and optimized for thousands of concurrent chargers across multiple EMSPs.",
      achievements: [
        "Led production stress test campaigns across 4,000 simulated charge boxes (8,000 connectors) — identified and eliminated LOCK TABLES bottlenecks via UNIQUE constraint migration and INSERT IGNORE rewrite, reducing avg query latency from 23s to <10ms.",
        "Performed deep database optimization across 3 critical bottlenecks: rewrote OCPP query views eliminating 706k-row temp tables (30s \u2192 <10ms), fixed window function full-table scans (1.58M rows \u2192 2 rows), reduced MySQL CPU from 100% to <20%.",
        "Stress-validated platform stability and resource profiles at scale — zero errors, zero orphans, sustained 25-30% CPU at 1,400+ OCPP RPM — de-risking the infrastructure migration from AWS to OVH.",
        "Authored discrepancy report mapping AWS vs OVH production resources across 9 dimensions (compute, storage, networking, auth, observability), driving resource reconfiguration that reduced operating costs by 50%.",
      ],
      tags: ["Java", "OCPP", "OCPI", "AWS", "OVH", "Kubernetes", "MongoDB"]
    },
    {
      title: "WibX Internet Exchange Automation",
      icon: "\uD83C\uDF10",
      description: "Multi-vendor IX automation platform integrating Cisco NSO, Equinix Fabric/IX, and Megaport for automated interconnect provisioning.",
      achievements: [
        "Architected IX automation patterns (provisioning, polling, external sync) integrating NSO, Equinix APIs, and NetBox as system of record.",
        "Authored software architecture docs, error handling standards, and NETCONF/NED runbooks for multi-vendor device orchestration.",
        "Designed customer circuit and port lifecycle models with provisioning workflows and status state machines.",
        "Defined engineering standards for API design, error codes, and code review processes across the automation platform.",
      ],
      tags: ["Cisco NSO", "Equinix", "Megaport", "NetBox", "BIRD"]
    }
  ],
};

const engineeringOperations: IOperationDomain[] = [
  {
    title: "Documentation & Specification",
    items: [
      "System architecture documentation for 4 production platforms — EV charging, telecom automation, mobile, and interconnect.",
      "Functional requirements and technical specifications driving implementation plans and service package designs.",
      "User guides, admin guides, and upgrade instructions enabling operator self-sufficiency across platforms.",
      "Cross-project design systems with tokenized CSS variables and component documentation.",
    ],
  },
  {
    title: "Testing & Quality Assurance",
    items: [
      "Production stress test campaigns including cluster resource audits, MongoDB CPU root cause analysis, and fix validation.",
      "Quality assurance test plans for EVPN E-Line provisioning, sync poller reliability, and device synchronization flows.",
      "Code review audits comparing implementation fidelity against design specifications across major feature MRs.",
      "Regression test coverage reviews for critical workflows (customer port provisioning, circuit lifecycle).",
    ],
  },
  {
    title: "Incident & Release Management",
    items: [
      "Production incident postmortems: sustained database load after mass charger reboots, Web UI performance degradation under load.",
      "Root cause analyses for OCPI token sync failures across EMSPs and MongoDB CPU spikes under concurrent stress.",
      "Multi-platform release versioning strategy with structured changelogs tracking every environment deployment.",
      "SteVe community upgrade migration planning across development, staging, and production environment layers.",
    ],
  },
];

const Resume: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [imgError, setImgError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const resumeRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f5f4ed",
        logging: false
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdfWidth = 210;
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Dominic_Javier_CV.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index} className="inline-code">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const initials = resumeData.name
    .split(" ")
    .map(n => n[0])
    .join("");

  return (
    <div className={`portfolio-wrapper ${theme === "dark" ? "dark-theme" : ""}`}>
      <div className="controls-bar">
        <button
          onClick={toggleTheme}
          className="control-btn"
          aria-label="Toggle dark/light theme"
          title="Toggle Theme"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
        <button
          onClick={handleDownloadPdf}
          className="control-btn"
          disabled={isDownloading}
          aria-label="Download CV as PDF"
          title="Download PDF"
        >
          <FiDownload />
        </button>
      </div>

      <div className="resume-container" ref={resumeRef}>
        <header className="resume-header">
          <div className="header-content">
            <h1>{resumeData.name}</h1>
            <p className="title-line">{resumeData.title}</p>
            <div className="contact-row">
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>{resumeData.contact.location}</span>
              </div>
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a>
              </div>
              <div className="contact-item">
                <FiGithub className="contact-icon" />
                <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer">
                  {resumeData.contact.github.replace("https://github.com/", "")}
                </a>
              </div>
              <div className="contact-item">
                <FiGlobe className="contact-icon" />
                <a href={resumeData.contact.website} target="_blank" rel="noopener noreferrer">
                  {resumeData.contact.website.replace("https://", "")}
                </a>
              </div>
            </div>
          </div>
          <div className="profile-image-container">
            {imgError || !resumeData.profileImage ? (
              <div className="profile-initials">
                {initials}
              </div>
            ) : (
              <img
                src={resumeData.profileImage}
                alt={resumeData.name}
                className="profile-image"
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </header>

        <section>
          <div className="section-head">
            <span className="section-num">01</span>
            <h2>Summary</h2>
          </div>
          <p className="summary-body">{resumeData.summary}</p>
          <div className="competency-grid">
            {resumeData.coreCompetencies.map((comp, idx) => (
              <div key={idx} className="competency-card">
                <h4>{comp.category}</h4>
                <p>{comp.skills}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="section-head">
            <span className="section-num">02</span>
            <h2>Professional Experience</h2>
          </div>
          <div className="timeline">
            {resumeData.experience.map((job, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-header">
                  <h3 className="role-title">{job.title}</h3>
                  {job.details && <span className="job-details">{job.details}</span>}
                </div>
                <ul className="job-bullet-list">
                  {job.points.map((pt, pIdx) => (
                    <li key={pIdx}>{renderFormattedText(pt)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="section-head">
            <span className="section-num">03</span>
            <h2>Featured Projects</h2>
          </div>
          <div className="projects-grid">
            {resumeData.projects.map((proj, idx) => (
              <div key={idx} className="project-card">
                <div className="project-icon-title">
                  <span className="proj-icon">{proj.icon}</span>
                  <div>
                    <h4>{proj.title}</h4>
                    <p className="project-blurb">{proj.description}</p>
                  </div>
                </div>
                <ul className="project-achievements">
                  {proj.achievements.map((a, aIdx) => (
                    <li key={aIdx}>{a}</li>
                  ))}
                </ul>
                <div className="project-tags">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="section-head">
            <span className="section-num">04</span>
            <h2>Engineering Operations</h2>
          </div>
          <p className="summary-body">
            Production engineering patterns applied across every platform I build — from documentation and
            specification through testing, incident response, and release management.
          </p>
          <div className="ops-grid">
            {engineeringOperations.map((domain, idx) => (
              <div key={idx} className="ops-card">
                <h4>{domain.title}</h4>
                <ul className="ops-list">
                  {domain.items.map((item, iIdx) => (
                    <li key={iIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <footer className="resume-footer">
          <span className="footer-text">© {new Date().getFullYear()} Dominic Javier. Typeset with kami &amp; terracotta.</span>
          <button onClick={handleDownloadPdf} className="download-btn" disabled={isDownloading}>
            <FiDownload /> {isDownloading ? "Compiling PDF\u2026" : "Download Resume PDF"}
          </button>
        </footer>
      </div>

      <div className="print-optimized-resume" ref={printRef}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <div>
            <h1>{resumeData.name}</h1>
            <div className="print-title">{resumeData.title}</div>
          </div>
          <div style={{ textAlign: "right", fontSize: "10px", color: "#504e49", fontWeight: 400, lineHeight: 1.4 }}>
            <div>{resumeData.contact.location}</div>
            <div>{resumeData.contact.email}</div>
            <div>{resumeData.contact.website.replace("https://", "")}</div>
            <div>{resumeData.contact.github.replace("https://", "")}</div>
          </div>
        </div>

        <h2>Executive Summary</h2>
        <p>{resumeData.summary}</p>

        <h2>Core Expertise & Skills</h2>
        <div className="print-comp-grid" style={{ marginBottom: "4px" }}>
          {resumeData.coreCompetencies.map((comp, idx) => (
            <div key={idx} className="print-comp-item">
              <strong>{comp.category}:</strong> {comp.skills}
            </div>
          ))}
        </div>

        <h2>Professional Experience</h2>
        {resumeData.experience.slice(0, 4).map((job, idx) => (
          <div key={idx} className="print-job-entry">
            <div className="print-job-header">
              <span>{job.title}</span>
              <span className="print-job-dates">{job.details}</span>
            </div>
            <ul className="print-job-list">
              {job.points.slice(0, 4).map((pt, pIdx) => (
                <li key={pIdx}>{renderFormattedText(pt)}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2>Featured Projects</h2>
        {resumeData.projects.map((proj, idx) => (
          <div key={idx} className="print-job-entry">
            <div className="print-job-header">
              <span>{proj.icon} {proj.title}</span>
            </div>
            <ul className="print-job-list">
              {proj.achievements.slice(0, 2).map((a, aIdx) => (
                <li key={aIdx}>{a}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2>Engineering Operations</h2>
        <p style={{ fontSize: "10px", lineHeight: "1.4", color: "#3d3d3a", margin: "0 0 6px 0" }}>
          Documentation &amp; Specification · Testing &amp; QA · Incident &amp; Release Management
        </p>
      </div>
    </div>
  );
};

export default Resume;
