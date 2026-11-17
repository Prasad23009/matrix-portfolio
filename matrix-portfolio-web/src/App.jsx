import { useEffect, useRef, useState } from 'react'
import './App.css'
import matrixTechnology from './assets/matrix-technology.png'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5154/api'
const WHATSAPP_NUMBER = '916281402892'

function WhatsAppIcon() {
  return <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.68 13.69L3 21l4.45-1.25A9 9 0 1 0 12 3Z" fill="currentColor" /><path d="M9.25 7.7c-.17-.4-.35-.4-.52-.4h-.44c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.7 4.16 3.68 2.05.81 2.47.65 2.92.61.45-.04 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.67-.8-.22-.08-.38-.12-.54.12-.16.24-.62.8-.76.97-.14.16-.28.18-.52.06-.24-.12-1.02-.39-1.95-1.24-.72-.66-1.2-1.47-1.34-1.72-.14-.24-.02-.37.1-.49.1-.1.24-.27.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.39-.76-1.9Z" fill="#151a23" /></svg>
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
  ],
  publicContactPhone: '6281402892',
  contactEmail: 'matrix071705@gmail.com',
}

const branchPages = {
  cse: { shortName: 'CSE', name: 'Computer Science Engineering', lead: 'Build software with stronger foundations.', description: 'Explore the thinking behind reliable applications, databases, algorithms, and technical project documentation.', topics: ['Web and application architecture', 'Database design and SQL', 'Algorithms and problem-solving', 'Testing, debugging, and documentation'] },
  it: { shortName: 'IT', name: 'Information Technology', lead: 'Turn information systems into clear solutions.', description: 'Get learning-focused guidance for web systems, data workflows, security-aware development, and technical communication.', topics: ['Web systems and APIs', 'Data management workflows', 'Software testing and deployment', 'Technical presentations and reports'] },
  ece: { shortName: 'ECE', name: 'Electronics and Communication Engineering', lead: 'Connect ideas across hardware and communication.', description: 'Plan, review, and document technical work around embedded systems, signal concepts, communication, and prototypes.', topics: ['Embedded systems concepts', 'Communication system fundamentals', 'IoT prototype planning', 'Circuit documentation and presentations'] },
  eee: { shortName: 'EEE', name: 'Electrical and Electronics Engineering', lead: 'Bring electrical ideas into a clear technical plan.', description: 'Receive guidance for structured technical exploration, simulation planning, reviews, and effective project documentation.', topics: ['Electrical system concepts', 'Control and automation foundations', 'Simulation and analysis planning', 'Technical review and documentation'] },
}

function getBranchFromHash() {
  const branchKey = window.location.hash.replace('#branch/', '')
  return branchPages[branchKey] ? branchKey : null
}

function getProjectIdFromHash() {
  const projectId = Number(window.location.hash.replace('#project/', ''))
  return Number.isInteger(projectId) && projectId > 0 ? projectId : null
}

const branchVisuals = {
  CSE: '#59d7ff',
  IT: '#9b8cff',
  ECE: '#66e6b8',
  EEE: '#ffc94d',
}

function ProjectCard({ project, index }) {
  const tools = project.technologies ?? []
  const accent = branchVisuals[project.branch] ?? '#f5c14f'

  return <article className="project-card scroll-reveal">
    <div className="project-visual" style={{ '--project-accent': accent }}>
      <div className="visual-meta"><span>{project.branch || 'MATRIX'}</span><span>0{index + 1}</span></div>
      <div className="visual-circuit"><i /><i /><i /></div>
      <div className="visual-tools">{tools.slice(0, 3).map((tool) => <span key={tool}>{tool}</span>)}</div>
    </div>
    <p className="project-number">PROJECT / {String(index + 1).padStart(2, '0')}</p>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <p className="tools-label">Tools used</p>
    <div className="tags">{tools.map((technology) => <span key={technology}>{technology}</span>)}</div>
    <a className="project-detail-link" href={`#project/${project.id}`}>View project details <span>↗</span></a>
  </article>
}

function ProjectDetail({ project, profile }) {
  const tools = project.technologies ?? []
  const branch = project.branch || 'MATRIX'
  const whatsappText = encodeURIComponent(`Hello Matrix, I would like to discuss this ${branch} project: ${project.title}`)

  return <main className="project-detail-page">
    <section className="project-detail-hero">
      <nav className="nav"><a className="brand" href="#top"><span className="brand-mark">M</span><span>{profile.businessName}</span></a><a className="nav-cta" href={`#branch/${branch.toLowerCase()}`}>← Back to {branch} projects</a></nav>
      <div className="project-detail-content">
        <p className="eyebrow">{branch} / PROJECT DETAIL</p>
        <h1>{project.title}</h1>
        <p className="hero-copy">{project.description}</p>
        <div className="detail-actions"><a className="button primary" href="#contact">Send an enquiry <span>→</span></a><a className="button whatsapp-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} target="_blank" rel="noreferrer"><WhatsAppIcon />WhatsApp Matrix <span>↗</span></a></div>
      </div>
    </section>
    <section className="section detail-section">
      <div className="detail-grid"><div><p className="eyebrow">TOOLS USED</p><h2>Technology stack</h2><div className="tags detail-tags">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div><div><p className="eyebrow">LEARNING FOCUS</p><h2>Build, test, explain.</h2><p>This is a learning-focused project idea. Use it to understand the architecture, explore the tools, document your work, and present your own implementation clearly.</p></div></div>
    </section>
    <section className="contact-section" id="contact"><div className="contact-copy"><p className="eyebrow">CONTACT MATRIX</p><h2>Discuss this project idea.</h2><p>Share what you want to learn or build, and Matrix will help you identify a clear next step.</p><div className="contact-links"><a href={`tel:${profile.publicContactPhone}`}><span>CALL</span>{profile.publicContactPhone}</a><a href={`mailto:${profile.contactEmail}`}><span>EMAIL</span>{profile.contactEmail}</a></div></div><div className="detail-contact-card"><p>{project.title}</p><a className="button whatsapp-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} target="_blank" rel="noreferrer"><WhatsAppIcon />Message on WhatsApp <span>↗</span></a></div></section>
  </main>
}

function BranchPage({ branch, projects, profile, form, status, updateForm, submitEnquiry }) {
  const branchProjects = projects.filter((project) => project.branch === branch.shortName)

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
    { id: 1, title: 'Business Website', description: 'A responsive website for a small business.', technologies: ['HTML', 'CSS', 'JavaScript'] },
    { id: 2, title: 'Customer Enquiry API', description: 'An API for receiving and managing customer enquiries.', technologies: ['ASP.NET Core', '.NET 10', 'PostgreSQL'] },
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

        setProfile(await profileResponse.json())
        setProjects(await projectsResponse.json())
      } catch {
        setStatus({
          type: 'error',
          text: 'The website could not reach the API. Make sure PortfolioApi is running.',
        })
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
  }, [branchKey, projects])

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
    function updateBranchPage() {
      setBranchKey(getBranchFromHash())
      setProjectId(getProjectIdFromHash())
    }
    window.addEventListener('hashchange', updateBranchPage)
    return () => window.removeEventListener('hashchange', updateBranchPage)
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
    const matchesBranch = projectFilter === 'ALL' || project.branch === projectFilter
    const searchText = `${project.title} ${project.description} ${(project.technologies ?? []).join(' ')}`.toLowerCase()
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
            <a href="#contact" onClick={(event) => { event.preventDefault(); goToSection('contact') }}>Contact</a>
          </div>

          <a className="nav-cta" href="#contact">Let&apos;s talk <span>↗</span></a>
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
            <a className="button secondary" href="#services">Explore services</a>
          </div>

          <div className="hero-proof">
            <span>For B.Tech & M.Tech</span><span>•</span><span>CSE · IT · ECE · EEE</span>
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
            <p className="eyebrow">03 / PORTFOLIO</p>
            <h2>Examples of technical work.</h2>
          </div>
          <p>Explore the kind of digital work, problem-solving, and technology that Matrix supports.</p>
        </div>

        <div className="project-filters scroll-reveal"><input type="search" value={projectSearch} onChange={(event) => setProjectSearch(event.target.value)} placeholder="Search projects or tools" aria-label="Search projects or tools" /><select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)} aria-label="Filter projects by branch"><option value="ALL">All branches</option><option value="CSE">CSE</option><option value="IT">IT</option><option value="ECE">ECE</option><option value="EEE">EEE</option></select></div>

        <div className="project-grid">
          {(projectFilter === 'ALL' && !projectSearch ? filteredProjects.slice(0, 6) : filteredProjects).map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}
        </div>
        {filteredProjects.length === 0 && <p className="project-empty">No matching projects found. Try another keyword or branch.</p>}
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy scroll-reveal">
          <p className="eyebrow">04 / CONTACT MATRIX</p>
          <h2>Let&apos;s turn your question into a clear next step.</h2>
          <p>Tell us what you are working on and which type of guidance would help most. We&apos;ll receive your enquiry securely.</p>
          <div className="contact-links">
            <a href={`tel:${profile.publicContactPhone}`}><span>CALL</span>{profile.publicContactPhone}</a>
            <a href={`mailto:${profile.contactEmail}`}><span>EMAIL</span>{profile.contactEmail}</a>
            <a className="whatsapp-link" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Matrix, I would like to ask about technical project guidance.')}`} target="_blank" rel="noreferrer"><span>WHATSAPP</span><b><WhatsAppIcon />Chat with Matrix</b></a>
          </div>
        </div>

        <form className="contact-form scroll-reveal" onSubmit={submitEnquiry}>
          <div className="form-title"><span>YOUR ENQUIRY</span><span>01 / 01</span></div>
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
