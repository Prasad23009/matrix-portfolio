import { useEffect, useRef, useState } from 'react'
import './App.css'
import matrixTechnology from './assets/matrix-technology.png'
import DiagramGenerator from './components/DiagramGenerator'
import ProjectEstimator from './components/ProjectEstimator'
import SyllabusRecommender from './components/SyllabusRecommender'
import TechChecker from './components/TechChecker'
import VivaSimulator from './components/VivaSimulator'

const API_URL = import.meta.env.VITE_API_URL || 'https://matrix-api-a9fk.onrender.com/api'
const WHATSAPP_NUMBER = '916281402892'

function WhatsAppIcon() {
  return <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.68 13.69L3 21l4.45-1.25A9 9 0 1 0 12 3Z" fill="currentColor" /><path d="M9.25 7.7c-.17-.4-.35-.4-.52-.4h-.44c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.7 4.16 3.68 2.05.81 2.47.65 2.92.61.45-.04 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.67-.8-.22-.08-.38-.12-.54.12-.16.24-.62.8-.76.97-.14.16-.28.18-.52.06-.24-.12-1.02-.39-1.95-1.24-.72-.66-1.2-1.47-1.34-1.72-.14-.24-.02-.37.1-.49.1-.1.24-.27.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.39-.76-1.9Z" fill="#151a23" /></svg>
}

function DocumentIcon() {
  return <svg className="document-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.75h7.2L18 7.55v13.7H6V2.75Z" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M13 2.9v4.9h4.8M8.5 12h7M8.5 15.5h7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
}

const fallbackProfile = {
  businessName: 'Matrix',
  headline: 'Technical project guidance for engineering students',
  about:
    'Matrix provides learning-focused technical project guidance, debugging support, reviews, and documentation help for B.Tech and M.Tech students.',
  services: [
    'Project planning and architecture guidance',
    'Technical review and debugging support',
    'Documentation and presentation guidance',
  ],
  supportedBranches: [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics and Communication Engineering',
    'Electrical and Electronics Engineering',
    'Internet of Things',
  ],
  publicContactPhone: '6281402892',
  contactEmail: 'matrix071705@gmail.com',
}

const branchPages = {
  cse: { shortName: 'CSE', name: 'Computer Science Engineering', lead: 'Build software with stronger foundations.', description: 'Explore the thinking behind reliable applications, databases, algorithms, and technical project documentation.', topics: ['Web and application architecture', 'Database design and SQL', 'Algorithms and problem-solving', 'Testing, debugging, and documentation'] },
  it: { shortName: 'IT', name: 'Information Technology', lead: 'Turn information systems into clear solutions.', description: 'Get learning-focused guidance for web systems, data workflows, security-aware development, and technical communication.', topics: ['Web systems and APIs', 'Data management workflows', 'Software testing and deployment', 'Technical presentations and reports'] },
  ece: { shortName: 'ECE', name: 'Electronics and Communication Engineering', lead: 'Connect ideas across hardware and communication.', description: 'Plan, review, and document technical work around embedded systems, signal concepts, communication, and prototypes.', topics: ['Embedded systems concepts', 'Communication system fundamentals', 'IoT prototype planning', 'Circuit documentation and presentations'] },
  eee: { shortName: 'EEE', name: 'Electrical and Electronics Engineering', lead: 'Bring electrical ideas into a clear technical plan.', description: 'Receive guidance for structured technical exploration, simulation planning, reviews, and effective project documentation.', topics: ['Electrical system concepts', 'Control and automation foundations', 'Simulation and analysis planning', 'Technical review and documentation'] },
  iot: { shortName: 'IOT', name: 'Internet of Things', lead: 'Connect the physical world to smart cloud systems.', description: 'Explore embedded microcontrollers, sensors, MQTT pipelines, and real-time telemetry dashboards.', topics: ['Microcontroller firmware (ESP32/Arduino)', 'Sensor integration & signal conditioning', 'MQTT & Cloud telemetry protocols', 'Edge computing & automation dashboards'] },
}

function getBranchFromHash() {
  const hash = window.location.hash
  if (hash.startsWith('#branch/')) {
    const branchKey = hash.replace('#branch/', '')
    return branchPages[branchKey] ? branchKey : null
  }
  return null
}

function getProjectIdFromHash() {
  const hash = window.location.hash
  if (hash.startsWith('#project/')) {
    const projectId = Number(hash.replace('#project/', ''))
    return Number.isInteger(projectId) && projectId > 0 ? projectId : null
  }
  return null
}

function isDocsHash() {
  return window.location.hash === '#docs'
}

const branchVisuals = {
  CSE: '#59d7ff',
  IT: '#9b8cff',
  ECE: '#66e6b8',
  EEE: '#ffc94d',
  IOT: '#f43f5e',
}

function SnippetBlock({ language, code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4 border border-gray-700 text-left">
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center text-xs text-gray-400">
        <span>{language.toUpperCase()}</span>
        <button
          onClick={handleCopy}
          className="bg-indigo-600 text-white px-2.5 py-1 rounded hover:bg-indigo-500 transition-colors cursor-pointer"
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-200 overflow-x-auto font-mono m-0 bg-gray-950">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function DocsView({ profile }) {
  const apiUrl = "https://matrix-api-a9fk.onrender.com"

  return (
    <main className="branch-page">
      <section className="branch-hero" id="top">
        <nav className="nav">
          <a className="brand" href="#top"><span className="brand-mark">M</span><span>{profile.businessName}</span></a>
          <a className="nav-cta" href="#top">← Back to Matrix</a>
        </nav>
        <div className="branch-hero-content reveal">
          <p className="eyebrow">DEVELOPER PORTAL / API DOCS</p>
          <p className="branch-name">Matrix API Documentation</p>
          <h1>Integration & Endpoints Reference</h1>
          <p className="hero-copy">Explore backend integration capabilities, health diagnostics, and student project inquiry submissions.</p>
        </div>
      </section>

      <section className="section" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">BASE CONFIGURATION</p>
            <h2>Connection Endpoints</h2>
          </div>
          <p>Production API Base URL: <code style={{ color: '#59d7ff', background: '#111827', padding: '4px 8px', borderRadius: '4px' }}>{apiUrl}</code></p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
          <div className="service-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ background: '#059669', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>GET</span>
              <code style={{ fontSize: '1.1rem', color: '#f3f4f6' }}>/health</code>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Returns current service operational health status.</p>
            <SnippetBlock language="bash" code={`curl -X GET ${apiUrl}/health`} />
          </div>

          <div className="service-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ background: '#059669', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>GET</span>
              <code style={{ fontSize: '1.1rem', color: '#f3f4f6' }}>/api/projects</code>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Fetches all active final year technical projects. Supports optional branch query filters.</p>
            <SnippetBlock language="bash" code={`curl -X GET "${apiUrl}/api/projects?branch=CSE"`} />
          </div>

          <div className="service-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ background: '#2563eb', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>POST</span>
              <code style={{ fontSize: '1.1rem', color: '#f3f4f6' }}>/api/enquiries</code>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Submits a student guidance enquiry or project discussion request directly to Matrix backend.</p>
            <SnippetBlock language="json" code={`curl -X POST ${apiUrl}/api/enquiries \\\n  -H "Content-Type: application/json" \\\n  -d '{"name":"Student Name","email":"student@uni.edu","message":"Need guidance on IoT project architecture"}'`} />
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark">M</span><span>{profile.businessName}</span></a>
        <span>Learning-focused technical guidance</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  )
}

function ProjectFilter({ selectedBranch, setSelectedBranch }) {
  const branches = ["ALL", "CSE", "IT", "ECE", "EEE", "IOT"]
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '16px 0 24px 0' }}>
      {branches.map((branch) => {
        const isActive = selectedBranch === branch
        return (
          <button
            key={branch}
            type="button"
            onClick={() => setSelectedBranch(branch)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              border: isActive ? '1px solid #6366f1' : '1px solid #374151',
              backgroundColor: isActive ? '#4f46e5' : '#1f2937',
              color: '#ffffff',
              boxShadow: isActive ? '0 0 12px rgba(79, 70, 229, 0.5)' : 'none',
              transition: 'all 0.15s ease-in-out',
            }}
          >
            {branch}
          </button>
        )
      })}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const tools = project.technologies ?? []
  const accent = branchVisuals[project.branch] ?? '#f5c14f'
  const branchText = project.branch || 'MATRIX'
  const whatsappProjectText = encodeURIComponent(`Hello Matrix, I am interested in project #${project.id} (${branchText}): ${project.title}`)

  return <article className="project-card scroll-reveal">
    <div className="project-visual" style={{ '--project-accent': accent }}>
      <div className="visual-meta"><span>{branchText}</span><span>0{index + 1}</span></div>
      <div className="visual-circuit"><i /><i /><i /></div>
      <div className="visual-tools">{tools.slice(0, 3).map((tool) => <span key={tool}>{tool}</span>)}</div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
      <p className="project-number" style={{ margin: 0 }}>PROJECT / {String(index + 1).padStart(2, '0')}</p>
      <span style={{ fontSize: '0.72rem', background: '#1f2937', color: '#f5c14f', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>Ready-to-Build</span>
    </div>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <p className="tools-label">Tools used</p>
    <div className="tags">{tools.map((technology) => <span key={technology}>{technology}</span>)}</div>
    
    <div className="deliverables-box" style={{ background: '#0a0d12', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', color: '#b9c0cb', border: '1px solid #29313d', margin: '16px 0' }}>
      <strong style={{ color: '#f5c14f', display: 'block', marginBottom: '6px' }}>📦 What You Get:</strong>
      <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: '1.5' }}>
        <li>Complete Source Code & Setup Guide</li>
        <li>Architecture & Flow Diagrams</li>
        <li>Project Report & PPT Presentation</li>
        <li>1-on-1 Viva & Debugging Support</li>
      </ul>
    </div>

    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
      <a className="project-detail-link" href={`#project/${project.id}`} style={{ flex: '1', textAlign: 'center', padding: '10px 12px', border: '1px solid #3a4350', borderRadius: '8px' }}>View details <span>↗</span></a>
      <a className="button secondary whatsapp-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappProjectText}`} target="_blank" rel="noreferrer" style={{ flex: '1', textAlign: 'center', padding: '10px 12px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><WhatsAppIcon /> Request on WhatsApp</a>
    </div>
  </article>
}

function ProjectDetail({ project, profile }) {
  const tools = project.technologies ?? []
  const documents = [...(project.documents ?? [])].sort((first, second) => first.displayOrder - second.displayOrder)
  const branch = project.branch || 'MATRIX'
  const whatsappText = encodeURIComponent(`Hello Matrix, I would like to discuss this ${branch} project: ${project.title}`)
  const defaultDocUrl = `/docs/Project_${project.id}_Report.pdf`

  return (
    <main className="project-detail-page">
      <section className="project-detail-hero">
        <nav className="nav">
          <a className="brand" href="#top"><span className="brand-mark">M</span><span>{profile.businessName}</span></a>
          <a className="nav-cta" href={`#branch/${branch.toLowerCase()}`}>← Back to {branch} projects</a>
        </nav>
        <div className="project-detail-content">
          <p className="eyebrow">{branch} / PROJECT DETAIL</p>
          <h1>{project.title}</h1>
          <p className="hero-copy">{project.description}</p>
          <div className="detail-actions">
            <a className="button primary" href="#contact">Send an enquiry <span>→</span></a>
            <a className="button whatsapp-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} target="_blank" rel="noreferrer">
              <WhatsAppIcon />WhatsApp Matrix <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section detail-section">
        <div className="detail-grid">
          <div>
            <p className="eyebrow">TOOLS USED</p>
            <h2>Technology stack</h2>
            <div className="tags detail-tags">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </div>
          <div>
            <p className="eyebrow">LEARNING FOCUS</p>
            <h2>Build, test, explain.</h2>
            <p>This is a learning-focused project idea. Use it to understand the architecture, explore the tools, document your work, and present your own implementation clearly.</p>
          </div>
        </div>
      </section>

      <section className="section project-resources">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">PROJECT RESOURCES</p>
            <h2>Documents for this project.</h2>
          </div>
          <p>Download the materials published for this project, such as the synopsis, architecture plan, and deliverable guide.</p>
        </div>

        <div className="resource-grid">
          {documents.length > 0 ? (
            documents.map((document) => (
              <a className="resource-card" href={document.publicUrl} target="_blank" rel="noreferrer" key={document.id}>
                <DocumentIcon />
                <span className="resource-type">{document.documentType || 'DOCUMENT'}</span>
                <h3>{document.title}</h3>
                <span className="resource-action">Open document <b>↗</b></span>
              </a>
            ))
          ) : (
            <a className="resource-card" href={defaultDocUrl} target="_blank" rel="noreferrer" download>
              <DocumentIcon />
              <span className="resource-type">SYNOPSIS & REPORT</span>
              <h3>Project #{project.id} Technical Synopsis</h3>
              <span className="resource-action">Download PDF <b>↓</b></span>
            </a>
          )}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">CONTACT MATRIX</p>
          <h2>Discuss this project idea.</h2>
          <p>Share what you want to learn or build, and Matrix will help you identify a clear next step.</p>
          <div className="contact-links">
            <a href={`tel:${profile.publicContactPhone}`}><span>CALL</span>{profile.publicContactPhone}</a>
            <a href={`mailto:${profile.contactEmail}`}><span>EMAIL</span>{profile.contactEmail}</a>
          </div>
        </div>
        <div className="detail-contact-card">
          <p>{project.title}</p>
          <a className="button whatsapp-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} target="_blank" rel="noreferrer">
            <WhatsAppIcon />Message on WhatsApp <span>↗</span>
          </a>
        </div>
      </section>
    </main>
  )
}

function BranchPage({ branch, projects, profile, form, status, updateForm, submitEnquiry }) {
  const branchProjects = projects.filter((project) => (project.branch || '').trim().toUpperCase() === branch.shortName)

  return (
    <main className="branch-page">
      <section className="branch-hero" id="top">
        <nav className="nav">
          <a className="brand" href="#top"><span className="brand-mark">M</span><span>{profile.businessName}</span></a>
          <a className="nav-cta" href="#top">← Back to Matrix</a>
        </nav>
        <div className="branch-hero-content reveal">
          <p className="eyebrow">{branch.shortName} / BRANCH PAGE</p>
          <p className="branch-name">{branch.name}</p>
          <h1>{branch.lead}</h1>
          <p className="hero-copy">{branch.description}</p>
          <a className="button primary" href="#branch-contact">Discuss your requirement <span>→</span></a>
        </div>
      </section>
      <section className="section branch-focus">
        <div className="section-heading compact reveal"><div><p className="eyebrow">WHAT WE CAN DISCUSS</p><h2>A focused starting point for {branch.shortName} students.</h2></div></div>
        <div className="focus-grid">
          {branch.topics.map((topic, index) => <article className="focus-card reveal" key={topic}><span>0{index + 1}</span><h3>{topic}</h3></article>)}
        </div>
      </section>
      <section className="section branch-projects" id="branch-projects">
        <div className="section-heading compact scroll-reveal"><div><p className="eyebrow">PROJECT CATALOGUE / {branch.shortName}</p><h2>Explore {branch.shortName} project ideas.</h2></div></div>
        {branchProjects.length > 0 ? (
          <div className="project-grid branch-project-grid">{branchProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div>
        ) : <p className="project-empty">Project ideas are loading. Please refresh in a moment.</p>}
      </section>
      <section className="contact-section branch-contact" id="branch-contact">
        <div className="contact-copy reveal"><p className="eyebrow">CONTACT MATRIX / {branch.shortName}</p><h2>Share your {branch.shortName} question or project idea.</h2><p>Describe what you are learning, building, or reviewing. Your enquiry will be sent to Matrix securely.</p><div className="contact-links"><a href={`tel:${profile.publicContactPhone}`}><span>CALL</span>{profile.publicContactPhone}</a><a href={`mailto:${profile.contactEmail}`}><span>EMAIL</span>{profile.contactEmail}</a><a className="whatsapp-link" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Matrix, I have a ${branch.shortName} project question.`)}`} target="_blank" rel="noreferrer"><span>WHATSAPP</span><b><WhatsAppIcon />Chat with Matrix</b></a></div></div>
        <form className="contact-form reveal" onSubmit={(event) => submitEnquiry(event, branch.shortName)}>
          <div className="form-title"><span>{branch.shortName} ENQUIRY</span><span>01 / 01</span></div>
          <label>Your name<input name="name" value={form.name} onChange={updateForm} required placeholder="Enter your name" /></label>
          <label>Email address<input name="email" type="email" value={form.email} onChange={updateForm} required placeholder="you@example.com" /></label>
          <label>What type of guidance do you need?<select name="interest" value={form.interest} onChange={updateForm}>{profile.services.map((service) => <option key={service}>{service}</option>)}</select></label>
          <label>Tell us about your requirement<textarea name="message" value={form.message} onChange={updateForm} required maxLength="1900" placeholder={`Share your ${branch.shortName} topic, project idea, or question...`} rows="5" /><span className="field-note">{form.message.length}/1900 characters</span></label>
          <button className="button submit-button" type="submit" disabled={status?.type === 'loading'}>{status?.type === 'loading' ? 'Sending...' : 'Send enquiry'} <span>→</span></button>
          {status && <p className={`notice ${status.type}`}>{status.text}</p>}
        </form>
      </section>
      <footer><a className="brand" href="#top"><span className="brand-mark">M</span><span>{profile.businessName}</span></a><span>Learning-focused technical guidance</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  )
}

function App() {
  const [profile, setProfile] = useState(fallbackProfile)
  const [projects, setProjects] = useState([
    { id: 1, title: 'Autonomous multi-agent system for automated code review & refactoring', branch: 'CSE', description: 'Multi-agent AI framework analyzing security, performance, and code idioms with automated PR generation.', technologies: ['Python', 'LangChain', 'OpenAI API', 'AST', 'Git'] },
    { id: 16, title: 'Multi-cloud cost optimization & automated resource rightsizing engine', branch: 'IT', description: 'Scans multi-cloud environments, identifies idle infrastructure, and applies Terraform script adjustments.', technologies: ['Terraform', 'Python', 'AWS Boto3', 'Prometheus'] },
    { id: 31, title: 'Edge-computed computer vision pipeline for smart traffic & parking management', branch: 'ECE', description: 'Local video stream processing on edge devices to detect parking vacancies and traffic density.', technologies: ['Python', 'YOLOv8', 'OpenCV', 'MQTT', 'Jetson Nano'] },
    { id: 46, title: 'Smart grid energy consumption forecasting & load-shedding simulator', branch: 'EEE', description: 'Machine learning dashboard predicting peak load demand and simulating regional substation balancing.', technologies: ['Python', 'XGBoost', 'Pandas', 'Streamlit'] },
    // IoT Projects
    { id: 61, title: 'Edge-AI Fall Detection & Vital Sign Monitoring Wearable', branch: 'IOT', description: 'ESP32 wearable utilizing MPU6050 accelerometer and MAX30102 heart rate sensor with MQTT alerts.', technologies: ['ESP32', 'MQTT', 'Node-RED', 'Python'] },
    { id: 62, title: 'LoRaWAN-Based Remote Patient Health Tracking & Emergency Alert System', branch: 'IOT', description: 'STM32 LoRa sensor node for real-time patient telemetry monitoring and emergency triggers.', technologies: ['STM32', 'LoRa', 'FreeRTOS', 'Cloud Dashboard'] },
    { id: 63, title: 'IoT-Enabled Smart Insulin Pen with Dosage Logging & Missed-Dose Alerts', branch: 'IOT', description: 'BLE-connected insulin injector logging dosage timestamps and triggering mobile reminders.', technologies: ['BLE', 'nRF52840', 'OLED', 'React Native'] },
    { id: 64, title: 'Smart Posture Corrector & Ergonomic Spine Monitoring Vest', branch: 'IOT', description: 'Flex sensor vest mapping posture angles via Web Bluetooth to real-time analytics graphs.', technologies: ['Arduino Nano', 'Flex Sensors', 'Web Bluetooth', 'D3.js'] },
    { id: 65, title: 'Contactless Body Temperature & Air Quality Hazard Monitor for Hospitals', branch: 'IOT', description: 'IR thermometer and gas sensor station reporting airborne hazards and patient fever alerts.', technologies: ['MLX90614', 'MQ-135', 'ESP8266', 'ThingsBoard'] },
    { id: 66, title: 'Solar-Powered IoT Air Quality & Urban Microclimate Monitoring Grid', branch: 'IOT', description: 'ESP32 sensor node tracking PM2.5 and atmospheric data with Grafana visualization.', technologies: ['ESP32', 'InfluxDB', 'Grafana', 'BME280'] },
    { id: 67, title: 'Smart Street Lighting System with Dynamic Radar-Based Dimming', branch: 'IOT', description: 'Ultrasonic radar and current sensors dynamically dimming street lamps and logging faults.', technologies: ['ESP32', 'HC-SR04', 'ACS712', 'MQTT'] },
    { id: 68, title: 'IoT-Based Intelligent Traffic Signal Preemption System for Emergency Vehicles', branch: 'IOT', description: 'Raspberry Pi computer vision traffic controller prioritizing ambulances on approach.', technologies: ['Raspberry Pi', 'OpenCV', 'RFID', 'LoRa'] },
    { id: 69, title: 'Smart Manhole Cover Displacement & Toxic Gas Leakage Detection System', branch: 'IOT', description: 'NB-IoT tilt and gas sensor node sending immediate SMS alerts upon cover displacement.', technologies: ['NB-IoT', 'SIM7000E', 'MQ-4', 'Twilio API'] },
    { id: 70, title: 'Automated Flood & River Water Level Monitoring Network with Predictive Alarms', branch: 'IOT', description: 'Ultrasonic distance sensor array forecasting water level rises and triggering flood warnings.', technologies: ['ESP32', 'Ultrasonic', 'Firebase', 'Node-RED'] },
    { id: 71, title: 'IoT-Enabled Predictive Maintenance System for Rotating Industrial Motors', branch: 'IOT', description: 'ADXL345 vibration sensor node capturing anomaly metrics and streaming to FastAPI dashboard.', technologies: ['ESP32', 'Python', 'FastAPI', 'Scikit-learn'] },
    { id: 72, title: 'Real-Time Warehouse Inventory Tracking Using Active RFID & IoT Gateways', branch: 'IOT', description: 'RFID reader gateway logging pallet movements into PostgreSQL database in real-time.', technologies: ['ESP32-CAM', 'RC522', 'PostgreSQL', 'Node.js'] },
    { id: 73, title: 'Industrial Automated Conveyor Sorting System Using Color & Weight Sensors', branch: 'IOT', description: 'Arduino automated sorting line categorizing boxes by color and load cell weight.', technologies: ['Arduino Mega', 'TCS3200', 'HX711', 'Servo Motors'] },
    { id: 74, title: 'Smart Factory Energy Metering & Power Factor Correction Unit', branch: 'IOT', description: 'PZEM energy monitor tracking industrial phase current, voltage, and power factor.', technologies: ['PZEM-004T', 'ESP8266', 'Modbus', 'MQTT'] },
    { id: 75, title: 'LoRa-Based Remote Pipeline Corrosion & Pressure Monitoring System', branch: 'IOT', description: 'Industrial pressure transducer and thickness gauge reporting long-range LoRa telemetry.', technologies: ['Pressure Sensor', 'LoRaWAN', 'Grafana', 'STM32'] },
    { id: 76, title: 'Autonomous Solar-Powered Precision Irrigation & Soil Nutrient Optimizer', branch: 'IOT', description: 'NPK soil sensor and capacitive moisture probes automating solenoid drip valves.', technologies: ['NPK Sensor', 'ESP32', 'Solenoid Valves', 'Blynk'] },
    { id: 77, title: 'IoT-Based Greenhouse Climate Automation & Crop Yield Predictor', branch: 'IOT', description: 'Climate sensor node regulating greenhouse exhaust fans and predicting yields via ML.', technologies: ['DHT22', 'Soil Temp', 'Machine Learning', 'Python'] },
    { id: 78, title: 'Smart Livestock Tracking & Geo-Fencing Collar Using GPS & LoRa', branch: 'IOT', description: 'GPS animal collar tracking cattle coordinates with geofence boundary alerts.', technologies: ['NEO-6M GPS', 'ESP32', 'LoRa', 'Leaflet.js'] },
    { id: 79, title: 'Automated Pest Detection & Solar Light Trap System with Image Capture', branch: 'IOT', description: 'ESP32-CAM capturing insect trap images and forwarding alerts to Telegram bot.', technologies: ['ESP32-CAM', 'PIR Sensor', 'Flask', 'Telegram API'] },
    { id: 80, title: 'Post-Harvest Cold Storage Temperature & Humidity Monitoring Logger', branch: 'IOT', description: 'Waterproof temperature loggers optimized for deep-sleep battery longevity in cold storage.', technologies: ['DS18B20', 'ESP8266', 'AWS IoT Core', 'Deep Sleep'] },
    { id: 81, title: 'Zero-Trust Secure IoT Smart Door Lock with Facial Recognition & OTP', branch: 'IOT', description: 'Raspberry Pi camera face recognition lock backed by fallback mobile OTP authentication.', technologies: ['Raspberry Pi 4', 'OpenCV', 'Solenoid Lock', 'Web App'] },
    { id: 82, title: 'IoT Home Energy Disaggregation & Appliance-Level Power Meter', branch: 'IOT', description: 'Current transformer clamp meters disaggregating individual home appliance power consumption.', technologies: ['Current Transformers', 'ESP32', 'InfluxDB', 'React'] },
    { id: 83, title: 'Smart Plant Care Assistant with Automated Drip Irrigation & Sunlight Tracking', branch: 'IOT', description: 'Servo pan-tilt solar tracker and automated watering plant pot with web dashboard.', technologies: ['Moisture Sensor', 'Servo Motor', 'ESP8266', 'Web App'] },
    { id: 84, title: 'Smart Gas Leakage Detection & Automatic Cylinder Shut-Off Valve', branch: 'IOT', description: 'LPG gas sensor triggering stepper motor emergency valve shut-off and WhatsApp alert.', technologies: ['MQ-6 Sensor', 'Stepper Motor', 'ESP32', 'WhatsApp API'] },
    { id: 85, title: 'IoT Automated Waste Segregator Bin Using Optical & Metal Sorting', branch: 'IOT', description: 'Inductive proximity and color sorting bin separating metallic and organic waste automatically.', technologies: ['Proximity Sensor', 'Color Sensor', 'Arduino Uno', 'Servos'] },
    { id: 86, title: 'IoT-Enabled Autonomous Delivery Rover with Obstacle Avoidance & GPS', branch: 'IOT', description: 'Wheeled rover navigating via ultrasonic sensors and streaming live WebRTC video.', technologies: ['Raspberry Pi', 'L298N', 'Ultrasonic', 'WebRTC'] },
    { id: 87, title: 'Cloud-Connected Agricultural Drone Flight Telemetry & Battery Monitor', branch: 'IOT', description: 'Pixhawk MAVLink telemetry bridge reporting drone battery and flight path to cloud.', technologies: ['Pixhawk', 'MAVLink', 'ESP8266', 'Cloud Dashboard'] },
    { id: 88, title: 'IoT Underwater ROV Depth & Temperature Logger', branch: 'IOT', description: 'Waterproof pressure sensor pod measuring deep-water depth and aquatic temperature.', technologies: ['MS5837 Sensor', 'Arduino', 'NRF24L01', 'OLED'] },
    { id: 89, title: 'Smart Parking Slot Reservation & Guidance Rover', branch: 'IOT', description: 'Ultrasonic bay sensor network guiding vehicles to open parking stalls via mobile app.', technologies: ['IR Proximity', 'ESP32', 'Servos', 'React Native'] },
    { id: 90, title: 'IoT-Based Wildfire Early Warning & Smoke Dispersion Tracking Drone', branch: 'IOT', description: 'Gas and temperature sensor mesh network tracking wildfire smoke progression.', technologies: ['MQ-2 Sensor', 'DHT11', 'GPS Module', 'LoRa Mesh'] },
  ])
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: 'Project planning and architecture guidance',
    message: '',
  })
  const [status, setStatus] = useState(null)
  const [branchKey, setBranchKey] = useState(getBranchFromHash)
  const [projectId, setProjectId] = useState(getProjectIdFromHash)
  const [showDocs, setShowDocs] = useState(isDocsHash)
  const [projectFilter, setProjectFilter] = useState('ALL')
  const [projectSearch, setProjectSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const [profileResponse, projectsResponse] = await Promise.all([
          fetch(`${API_URL}/profile`),
          fetch(`${API_URL}/projects`),
        ])

        if (!profileResponse.ok || !projectsResponse.ok) {
          throw new Error('Unable to load portfolio information.')
        }

        const remoteProfile = await profileResponse.json()
        const remoteProjects = await projectsResponse.json()

        // Merge remote profile data with fallback supportedBranches if missing
        setProfile({
          ...remoteProfile,
          supportedBranches: fallbackProfile.supportedBranches
        })

        // If remote API returns projects, combine or use them along with our full branch list
        if (remoteProjects && remoteProjects.length > 0) {
          // Keep remote projects and append ours if they aren't duplicates, or let remote take precedence
          setProjects((prev) => {
            const existingIds = new Set(remoteProjects.map(p => p.id))
            const uniqueFallbacks = prev.filter(p => !existingIds.has(p.id))
            return [...remoteProjects, ...uniqueFallbacks]
          })
        }
      } catch {
        // Fallback state is already initialized with all projects including IoT
      }
    }

    loadPortfolio()
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [branchKey, showDocs, projects])

  function moveHero(event) {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const bounds = hero.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14

    hero.style.setProperty('--parallax-x', `${x}px`)
    hero.style.setProperty('--parallax-y', `${y}px`)
  }

  function resetHero() {
    const hero = heroRef.current
    if (!hero) return
    hero.style.setProperty('--parallax-x', '0px')
    hero.style.setProperty('--parallax-y', '0px')
  }

  useEffect(() => {
    function updateRouting() {
      setBranchKey(getBranchFromHash())
      setProjectId(getProjectIdFromHash())
      setShowDocs(isDocsHash())
    }
    window.addEventListener('hashchange', updateRouting)
    return () => window.removeEventListener('hashchange', updateRouting)
  }, [])

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function goToSection(sectionId) {
    setMenuOpen(false)
    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const filteredProjects = projects.filter((project) => {
    if (projectFilter === 'ALL') return false

    const pBranch = String(project.branch || '').trim().toUpperCase()
    const targetFilter = String(projectFilter || '').trim().toUpperCase()

    const matchesBranch = pBranch === targetFilter

    const searchText = `${project.title || ''} ${project.description || ''} ${(project.technologies ?? []).join(' ')}`.toLowerCase()
    return matchesBranch && searchText.includes(projectSearch.toLowerCase())
  })

  async function submitEnquiry(event, branchName = '') {
    event.preventDefault()
    setStatus({ type: 'loading', text: 'Sending your enquiry...' })

    try {
      const response = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `${branchName ? `Branch: ${branchName}\n` : ''}Requested support: ${form.interest}\n\n${form.message}`,
        }),
      })

      if (!response.ok) throw new Error('Unable to send enquiry.')

      setForm({
        name: '',
        email: '',
        interest: 'Project planning and architecture guidance',
        message: '',
      })
      setStatus({
        type: 'success',
        text: 'Thank you — Matrix has received your enquiry.',
      })
    } catch {
      setStatus({
        type: 'error',
        text: 'Unable to send your enquiry. Please try again shortly.',
      })
    }
  }

  const selectedProject = projectId ? projects.find((project) => project.id === projectId) : null

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} profile={profile} />
  }

  if (showDocs) {
    return <DocsView profile={profile} />
  }

  if (branchKey) {
    return <BranchPage branch={branchPages[branchKey]} projects={projects} profile={profile} form={form} status={status} updateForm={updateForm} submitEnquiry={submitEnquiry} />
  }

  return (
    <main>
      <section className="hero" id="top" ref={heroRef} onMouseMove={moveHero} onMouseLeave={resetHero}>
        <nav className="nav">
          <a className="brand" href="#top" aria-label="Matrix home">
            <span className="brand-mark">M</span>
            <span>{profile.businessName}</span>
          </a>

          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span />
            <span />
          </button>

          <div id="mobile-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#services" onClick={(event) => { event.preventDefault(); goToSection('services') }}>Services</a>
            <a href="#projects" onClick={(event) => { event.preventDefault(); goToSection('projects') }}>Projects</a>
            <a href="#docs" onClick={(event) => { event.preventDefault(); window.location.hash = 'docs' }}>API Docs</a>
            <a href="#contact" onClick={(event) => { event.preventDefault(); goToSection('contact') }}>Contact</a>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a className="button secondary whatsapp-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Matrix, I would like to chat about project guidance.')}`} target="_blank" rel="noreferrer" style={{ padding: '8px 12px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><WhatsAppIcon /> WhatsApp</a>
            <a className="nav-cta" href="#contact">Let&apos;s talk <span>↗</span></a>
          </div>
        </nav>

        <div className="hero-visual" aria-hidden="true">
          <img src={matrixTechnology} alt="" />
        </div>

        <div className="hero-content reveal">
          <div className="hero-label"><span className="pulse-dot" /> Learning-focused technical support</div>
          <h1>{profile.headline}</h1>
          <p className="hero-copy">{profile.about}</p>

          <div className="hero-actions">
            <a className="button primary" href="#contact">Start a conversation <span>→</span></a>
            <a className="button secondary" href="#docs" onClick={(e) => { e.preventDefault(); window.location.hash = 'docs'; }}>API Docs & Code</a>
            <a className="button secondary whatsapp-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Matrix, I need guidance for my final year project.')}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><WhatsAppIcon /> WhatsApp Quick Chat</a>
          </div>

          <div className="hero-proof">
            <span>For B.Tech & M.Tech</span><span>•</span><span>CSE · IT · ECE · EEE · IOT</span>
          </div>
        </div>

        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <p className="scroll-cue">SCROLL TO DISCOVER <span>↓</span></p>
      </section>

      <section className="section intro-strip scroll-reveal">
        <p>Build with clarity</p><span>✦</span><p>Learn by doing</p><span>✦</span><p>Present with confidence</p>
      </section>

      <section className="section" id="services">
        <div className="section-heading scroll-reveal">
          <div>
            <p className="eyebrow">01 / HOW MATRIX HELPS</p>
            <h2>Practical guidance for your technical growth.</h2>
          </div>
          <p>Focused support that helps you understand the work, make better decisions, and communicate your ideas clearly.</p>
        </div>

        <div className="card-grid">
          {profile.services.map((service, index) => (
            <article className="service-card scroll-reveal" key={service}>
              <span>0{index + 1}</span>
              <h3>{service}</h3>
              <span className="card-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section branches">
        <div className="section-heading compact scroll-reveal">
          <div>
            <p className="eyebrow">02 / SUPPORTED BRANCHES</p>
            <h2>Guidance designed for your discipline.</h2>
          </div>
        </div>

        <div className="branch-list">
          {profile.supportedBranches.map((branch, index) => {
            const pageKey = Object.keys(branchPages).find((key) => branchPages[key].name === branch)
            return <a className="scroll-reveal branch-link" href={`#branch/${pageKey}`} key={branch}><b>0{index + 1}</b>{branch}<i>↗</i></a>
          })}
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading scroll-reveal">
          <div>
            <p className="eyebrow">03 / PORTFOLIO & FILTER</p>
            <h2>Examples of technical work.</h2>
          </div>
          <p>Choose your engineering branch below to view focused project ideas.</p>
        </div>

        <div className="project-filters scroll-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="search" value={projectSearch} onChange={(event) => setProjectSearch(event.target.value)} placeholder="Search projects or tools (e.g. ESP32, Python, MQTT, React)" aria-label="Search projects or tools" style={{ padding: '12px', borderRadius: '8px', background: '#111827', border: '1px solid #374151', color: '#fff' }} />
          <ProjectFilter selectedBranch={projectFilter} setSelectedBranch={setProjectFilter} />
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}
        </div>
        {filteredProjects.length === 0 && (
          <p className="project-empty" style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
            {projectFilter === 'ALL' 
              ? '👆 Select a branch above (CSE, IT, ECE, EEE, IOT) to view available final-year projects.' 
              : 'No matching projects found for this selection.'}
          </p>
        )}
      </section>

      <section className="section" style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <div className="section-heading scroll-reveal">
          <div>
            <p className="eyebrow">04 / QUICK REFERENCE SNIPPET</p>
            <h2>Sample Integration Code</h2>
          </div>
          <p>Easily grab quick API snippets for your lab assignments and presentations.</p>
        </div>
        <SnippetBlock language="javascript" code={`// Fetch projects directly from Matrix Backend API\nfetch('https://matrix-api-a9fk.onrender.com/api/projects')\n  .then(res => res.json())\n  .then(data => console.log(data));`} />
      </section>

      {/* Universal Academic Syllabus Recommender */}
      <SyllabusRecommender />

      {/* Tech Stack Compatibility Checker */}
      <TechChecker />

      {/* Interactive Architecture Diagram Generator */}
      <DiagramGenerator />

      {/* Interactive AI Timeline Estimator */}
      <ProjectEstimator />

      {/* Interactive Viva Voce Mock Simulator */}
      <VivaSimulator />

      <section className="contact-section" id="contact">
        <div className="contact-copy scroll-reveal">
          <p className="eyebrow">09 / CONTACT MATRIX</p>
          <h2>Let&apos;s turn your question into a clear next step.</h2>
          <p>Tell us what you are working on and which type of guidance would help most. We&apos;ll receive your enquiry securely.</p>
          <div className="contact-links">
            <a href={`tel:${profile.publicContactPhone}`}><span>CALL</span>{profile.publicContactPhone}</a>
            <a href={`mailto:${profile.contactEmail}`}><span>EMAIL</span>{profile.contactEmail}</a>
            <a className="whatsapp-link" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Matrix, I would like to ask about technical project guidance.')}`} target="_blank" rel="noreferrer"><span>WHATSAPP</span><b><WhatsAppIcon />Chat with Matrix</b></a>
          </div>
        </div>

        <form className="contact-form scroll-reveal" onSubmit={submitEnquiry}>
          <div className="form-title"><span>STUDENT ENQUIRY</span><span>01 / 01</span></div>
          <label>
            Your name
            <input name="name" value={form.name} onChange={updateForm} required placeholder="Enter your name" />
          </label>
          <label>
            Email address
            <input name="email" type="email" value={form.email} onChange={updateForm} required placeholder="you@example.com" />
          </label>
          <label>
            What type of guidance do you need?
            <select name="interest" value={form.interest} onChange={updateForm}>
              {profile.services.map((service) => <option key={service}>{service}</option>)}
            </select>
          </label>
          <label>
            Tell us about your requirement
            <textarea name="message" value={form.message} onChange={updateForm} required maxLength="1900" placeholder="Share your topic, project idea, or question..." rows="5" />
            <span className="field-note">{form.message.length}/1900 characters</span>
          </label>
          <button className="button submit-button" type="submit" disabled={status?.type === 'loading'}>
            {status?.type === 'loading' ? 'Sending...' : 'Send enquiry'} <span>→</span>
          </button>
          {status && <p className={`notice ${status.type}`}>{status.text}</p>}
        </form>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark">M</span><span>{profile.businessName}</span></a>
        <span>Learning-focused technical guidance</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  )
}

export default App