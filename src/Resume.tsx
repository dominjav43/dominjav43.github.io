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
  FiCpu,
  FiBriefcase,
  FiCode,
  FiZap,
} from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// --- DATA ---
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
  name: "Dominic Javier",
  title: "Technical Leader | DevOps & AI Engineer | Full-Stack Mobile Architect",
  profileImage: "/profile.jpg", // Graceful fallback is implemented in UI
  contact: {
    location: "Camarines Sur, Philippines",
    email: "dominjav43@gmail.com",
    github: "https://github.com/dominjav43",
    website: "https://dominjav43.github.io",
  },
  summary:
    "Hands-on technical leader, mobile architect, and DevOps engineer with extensive experience building full-stack applications, robust iOS & Android ecosystems, cloud/network automation pipelines, and agentic AI architectures. I lead engineering teams to deliver premium, secure solutions, specializing in agent-native design-to-code pipelines (Open Design), on-device OpenXML compilation, scalable EV charging infrastructures, and automated multi-vendor networking. Proficient in translating complex business or compliance requirements into production-grade systems.",
  coreCompetencies: [
    {
      category: "Agentic AI & LLM Orchestration",
      skills:
        "Specialized Agent Design (ECC), Open Design (nexu-io/open-design), Multi-Agent Fleet Orchestration, Loop Operators, Context/Token Optimization, TDD-guided AI Development, Custom MCP Servers",
    },
    {
      category: "Infrastructure & Cloud Automation",
      skills:
        "AWS, OVH, Kubernetes, Terraform, Docker, Traefik LB, Flyway, SOPS",
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
  ] as ICompetency[],
  experience: [
    {
      title: "Agentic AI Platform Architect – Everything Claude Code (ECC)",
      details: "2025–Present",
      points: [
        "Architected and engineered Everything Claude Code (ECC), an advanced agentic developer framework supporting 30+ domain-specific agents, 140+ custom workflow skills, and 60+ automated slash commands.",
        "Built the core Autonomous Loop Operator that orchestrates agent fleets, detects execution stalls, recovers from context limits, and dynamically syncs workspace files via a standard MCP protocol.",
        "Integrated Open Design (nexu-io/open-design) to build agent-native UI/UX engines, enabling agents to parse portable DESIGN.md systems and generate premium, design-system-compliant frontends.",
        "Designed cost-aware model routing pipelines that analyze prompt complexity, leverage prompt caching, and optimize context token budgets to minimize LLM execution overhead.",
        "Integrated strict quality and security gates, automating Test-Driven Development (TDD) pipelines and enforcing local security scanners for credentials, JWT/JWKS, SOPS, and HashiCorp Vault integrations.",
        "Developed custom MCP servers and harness-optimization systems that maximize subagent tool completion rates and simplify multi-agent task delegation."
      ],
    },
    {
      title: "Co-Founder & Lead Engineer – SARDO Mobile Ecosystem",
      details: "2024–Present",
      points: [
        "Architected and built the unified SARDO (DepEd School Form 2 Attendance Helper) mobile ecosystem, launching native iOS (Swift, SwiftUI, `@Observable`, SwiftData) and Android (Kotlin, Jetpack Compose, Room DB, Hilt, MVVM) apps to solve administrative bottlenecks for educators.",
        "Engineered an on-device OpenXML spreadsheet engine (low-level ZIP compression & XML tree parsing) to programmatically edit, compute complex attendance sums, and compile official government spreadsheets without external server dependencies.",
        "Designed and implemented an interactive, animated date navigation header with built-in custom date pickers and day-stepping animations matching premium HIG and Material Design 3 paradigms.",
        "Designed a hybrid freemium monetization architecture enabling 3 free spreadsheet exports with full feature previews, seamlessly linked with local device-state tracking to ensure reliable and tamper-proof access control.",
        "Enforced rigorous Test-Driven Development (TDD) cycles, establishing automated unit and UI testing pipelines that compile and execute cleanly in high-concurrency environments.",
        "Integrated secure local persistence, relationship schemas (students/sections), and data backup protocols, ensuring absolute privacy and 99.9% database reliability.",
      ],
    },
    {
      title: "Technical Architect & Lead Developer – Multi-Vendor NetDevOps Platform",
      details: "2025–Present",
      points: [
        "Architected and engineered a stateless NetDevOps Portal & Orchestrator API (Node.js, TypeScript, Express, React), completely replacing legacy network orchestration systems to achieve scalable, modern service lifecycle management.",
        "Implemented a reactive, scan-less Zero Touch Provisioning (ZTP) workflow leveraging Kea DHCP option 67 boot redirection, temporary management IP subnets, and automated SSH-based device bootstrap/upgrade agents.",
        "Designed and built an Audit-Driven Configuration Reconciliation engine, incorporating a side-by-side 3-Pane Configuration Audit View (Cisco NSO Intent vs. Running Hardware vs. Diff) for manual drift resolution (Sync-From/Re-deploy).",
        "Pioneered service-aware orchestration paradigms, displaying real-time client service dependencies (Transit IP BGP, EVPN E-Line) to run pre-deployment operational impact analysis and mitigate accidental network downtime.",
        "Developed custom NetBox data model extensions (custom fields like `nso_device_id`, `nso_sync_state`, and `interface_role`) to map ephemeral NSO check-sync/fleet-poll states, utilizing NetBox as the single Source of Truth (SoT).",
        "Enforced strict multi-vendor interface description standards via regex-based nomenclature checks (`CUST : <Client> [<Service>] [EPL <BW>]`) during automated port-termination provisioning.",
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
      details: "2024–Present",
      points: [
        "Architected scalable EV backend platforms on AWS and OVH, handling thousands of concurrent connections using a microservices-based model.",
        "Designed and implemented dynamic OCPP (Open Charge Point Protocol) WebSocket traffic splitting on Traefik Load Balancer using custom PathRegexp routing rules, enabling seamless, zero-downtime charger migration and blue-green API deployments.",
        "Optimized Flyway database migration architectures using containerized Kubernetes init jobs to ensure atomic, zero-downtime schema deployments under concurrent load, eliminating manual DB interventions.",
        "Automated resource provisioning, scaling, Keycloak & Authentik identity/access management, and secure secrets handling using SOPS and HashiCorp Vault.",
      ],
    },
  ] as IJob[],
  projects: [
    {
      title: "SARDO DepEd SF2 Ecosystem",
      icon: "📱",
      description: "Native iOS (Swift, SwiftUI, `@Observable`, SwiftData) and Android (Kotlin, Compose, Room, Hilt) apps automating school report collation via on-device OpenXML sheet compilation.",
      tags: ["SwiftUI", "Jetpack Compose", "OpenXML", "SwiftData", "Hilt"]
    },
    {
      title: "NetDevOps Automation Portal",
      icon: "🔌",
      description: "Zero Touch Provisioning (ZTP) Option 67 boot redirection, 3-pane configuration drift reconciliation engine, and custom NetBox schema mapping for multi-vendor network orchestrations.",
      tags: ["NestJS", "React", "Cisco NSO", "NetBox", "DHCP ZTP"]
    },
    {
      title: "EV Backend Platforms",
      icon: "⚡",
      description: "OCPP WebSocket traffic splitting (Traefik LB regex), containerized Flyway migrations on AWS & OVH Kubernetes.",
      tags: ["Kubernetes", "Traefik", "Flyway", "AWS", "OCPP"]
    }
  ],
  skills: [
    "Specialized Agent Design (ECC)",
    "Open Design (nexu-io/open-design)",
    "Multi-Agent Fleet Orchestration",
    "Swift/SwiftUI & `@Observable`",
    "Kotlin & Jetpack Compose",
    "Cisco NSO & YANG Automation",
    "NetBox Integration",
    "Kubernetes & Terraform",
    "Docker & Traefik LB",
    "Flyway DB Migrations",
    "Test-Driven Development (TDD)",
    "Keycloak, Authentik & Cognito OAuth2"
  ]
};

const Resume: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeTab, setActiveTab] = useState<"summary" | "experience" | "projects" | "skills">("summary");
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
      // Small timeout to allow render cycle to flush
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Double resolution for ultra sharp print
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // A4 dimensions in mm
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

  // Safe Profile Icon Fallback
  const initials = resumeData.name
    .split(" ")
    .map(n => n[0])
    .join("");

  return (
    <div className={`portfolio-wrapper ${theme === "dark" ? "dark-theme" : ""}`}>
      {/* Background Orbs */}
      <div className="ambient-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      {/* Floating Theme / Controls Top Bar */}
      <div className="floating-controls">
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

      {/* Interactive Main Board */}
      <div className="resume-container" ref={resumeRef}>
        {/* Header */}
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
                <a href={resumeData.contact.website} target="_blank" rel="noopener noreferrer">
                  {resumeData.contact.website.replace("https://", "")}
                </a>
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
            </div>
          </div>
          
          <div className="profile-image-container">
            <div className="scan-line"></div>
            {imgError || !resumeData.profileImage ? (
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: "var(--accent-gradient)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "2.5em",
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  border: "4px solid var(--bg-secondary)"
                }}
              >
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

        {/* Dynamic Metric Counter Panels */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">30+</span>
            <span className="stat-label">AI Agents Engineered</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">140+</span>
            <span className="stat-label">Custom Workflow Skills</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Active App Users</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">TDD / CI Green Builds</span>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="tabs-header">
          <button
            onClick={() => setActiveTab("summary")}
            className={`tab-btn ${activeTab === "summary" ? "active" : ""}`}
          >
            <FiZap style={{ marginRight: "6px" }} /> Summary
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`tab-btn ${activeTab === "experience" ? "active" : ""}`}
          >
            <FiBriefcase style={{ marginRight: "6px" }} /> Professional Exp
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
          >
            <FiCode style={{ marginRight: "6px" }} /> Featured Projects
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`tab-btn ${activeTab === "skills" ? "active" : ""}`}
          >
            <FiCpu style={{ marginRight: "6px" }} /> Skills Matrix
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="tab-content">
          {activeTab === "summary" && (
            <section className="tab-pane-summary">
              <h2>Executive Summary</h2>
              <p style={{ fontSize: "1.05em", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "30px" }}>
                {resumeData.summary}
              </p>

              <h2>Core Architecture Domains</h2>
              <div className="competency-grid">
                {resumeData.coreCompetencies.map((comp, idx) => (
                  <div key={idx} className="competency-card">
                    <h4>{comp.category}</h4>
                    <p>{comp.skills}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "experience" && (
            <section className="tab-pane-experience">
              <h2>Professional Experience Timeline</h2>
              <div className="timeline">
                {resumeData.experience.map((job, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-header">
                      <h3 className="role-title">{job.title}</h3>
                      {job.details && <span className="job-details">{job.details}</span>}
                    </div>
                    <ul className="job-bullet-list">
                      {job.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "projects" && (
            <section className="tab-pane-projects">
              <h2>Featured Production Architectures</h2>
              <div className="projects-grid">
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="project-card">
                    <div className="project-icon-title">
                      <span className="proj-icon">{proj.icon}</span>
                      <h4>{proj.title}</h4>
                    </div>
                    <p>{proj.description}</p>
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
          )}

          {activeTab === "skills" && (
            <section className="tab-pane-skills">
              <h2>Verified Skill Endorsements</h2>
              <div className="skills-container">
                <div className="skill-group">
                  <h4>Full Technical Stack</h4>
                  <div className="skill-chips">
                    {resumeData.skills.map((skill, idx) => (
                      <span key={idx} className="skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="download-footer">
          <span className="footer-text">© {new Date().getFullYear()} Dominic Javier. Handcrafted using React + Design Tokens.</span>
          <button onClick={handleDownloadPdf} className="download-btn" disabled={isDownloading}>
            <FiDownload /> {isDownloading ? "Compiling PDF..." : "Download Resume PDF"}
          </button>
        </footer>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* HIDDEN PRINT-OPTIMIZED DRAFT RENDER FOR ONE-PAGE A4 jsPDF     */}
      {/* ------------------------------------------------------------- */}
      <div className="print-optimized-resume" ref={printRef}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
          <div>
            <h1>{resumeData.name}</h1>
            <div className="print-title">{resumeData.title}</div>
          </div>
          <div style={{ textAlign: "right", fontSize: "10px", color: "#475569", fontWeight: 500, lineHeight: 1.4 }}>
            <div>{resumeData.contact.location}</div>
            <div>{resumeData.contact.email}</div>
            <div>{resumeData.contact.website.replace("https://", "")}</div>
            <div>{resumeData.contact.github.replace("https://", "")}</div>
          </div>
        </div>

        <h2>Executive Summary</h2>
        <p>{resumeData.summary}</p>

        <h2>Core Expertise & Skills Matrix</h2>
        <div className="print-comp-grid" style={{ marginBottom: "5px" }}>
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
              {job.points.slice(0, 3).map((pt, pIdx) => (
                <li key={pIdx}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resume;
