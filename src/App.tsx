import { useState, useEffect } from 'react'
import './App.css'

// Types for Portfolio Data
interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'design' | 'tools'
}

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  category: 'webapp' | 'design'
  demoUrl: string
  githubUrl: string
  gradient: string
  icon: string
}

interface TimelineItem {
  id: number
  year: string
  role: string
  company: string
  description: string
}

function App() {
  // --- States ---
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark')
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'design' | 'tools'>('all')
  const [activeSection, setActiveSection] = useState('home')

  // Portfolio Editable Data
  const [portfolioData] = useState({
    name: 'João Gabriel Dantas Amorim',
    title: 'Estagiário de T.I. | Engenharia de Software',
    bio: 'Atuo como Estagiário de Suporte em T.I., contribuindo no atendimento aos usuários, registro e gestão de chamados em sistemas ITSM (Jira, Freshdesk), suporte a infraestrutura de redes e gestão de ativos. Experiência prática com ambientes ágeis, noções de redes (TCP/IP, DNS, DHCP) e automação de processos.',
    email: 'dantasjgabriel@gmail.com',
    github: 'https://github.com/amorimfps1',
    linkedin: 'https://www.linkedin.com/in/joaodamorim',
    location: 'Brasília, DF',
    phone: '(61) 99833-8069',
    experienceYears: 'Estágio',
    projectsCompleted: '3+ Áreas',
    technologiesMastered: '12+ Ferramentas',
    skills: [
      { name: 'Microsoft Excel Avançado', level: 95, category: 'frontend' },
      { name: 'Jira Service Management', level: 90, category: 'frontend' },
      { name: 'Freshdesk / Zendesk', level: 88, category: 'frontend' },
      { name: 'Google Workspace & Apps Script', level: 85, category: 'frontend' },
      { name: 'Configuração de Redes (TCP/IP, DNS, DHCP)', level: 85, category: 'backend' },
      { name: 'Roteadores, Switches & Cabeamento', level: 80, category: 'backend' },
      { name: 'APIs REST & Webhooks', level: 88, category: 'backend' },
      { name: 'Automação com Python', level: 90, category: 'design' },
      { name: 'Automação com n8n', level: 80, category: 'design' },
      { name: 'SQL & Modelagem de Bancos de Dados', level: 85, category: 'design' },
      { name: 'Análise de Dados com Pandas', level: 78, category: 'design' },
      { name: 'Git & GitHub para Versionamento', level: 90, category: 'tools' },
      { name: 'Metodologias Ágeis (Scrum / Kanban)', level: 88, category: 'tools' }
    ] as Skill[],
    projects: [
      {
        id: 4,
        title: 'Sistema Movi Nexus',
        description: 'Sistema feito com React, Vite, Python, Supabase e PostgreSQL para gestão de atividades do movimento comunitário Jardim Botânico, chamado Movie.',
        tags: ['React', 'Vite', 'Python', 'Supabase', 'PostgreSQL'],
        category: 'webapp',
        demoUrl: '#',
        githubUrl: 'https://github.com/amorimfps1/sistema-movi-nexus',
        gradient: '',
        icon: '🎬'
      },
      {
        id: 5,
        title: 'Saneamento Nexus',
        description: 'Projeto de saneamento e organização de dados para tratar cerca de cinco planilhas em um único código, consolidando, limpando e padronizando as informações.',
        tags: ['Python', 'ETL', 'Dados', 'Automação', 'Sellenium', 'PyAutoGui'],
        category: 'design',
        demoUrl: '#',
        githubUrl: 'https://github.com/amorimfps1/saneamento-aceite',
        gradient: '',
        icon: '🧩'
      }
    ] as Project[],
    timeline: [
      {
        id: 1,
        year: '2026 - Atual',
        role: 'Estagiário de Engenharia de Software',
        company: 'MCJB',
        description: 'Atendimento e suporte interno a usuários (Jira/Freshdesk), desenvolvimento de sistema interno de processamento de dados, banco de dados SQL, automação de rotinas em Python/n8n, integração via APIs/Webhooks e infraestrutura de redes local (TCP/IP, DNS, DHCP).'
      },
      {
        id: 2,
        year: '2026 - Cursando',
        role: 'Engenharia de Software (2º Semestre)',
        company: 'UniCEUB',
        description: 'Desenvolvimento de base acadêmica sólida com foco em arquitetura de sistemas, algoritmos, modelagem de dados e metodologias ágeis de engenharia.'
      },
      {
        id: 3,
        year: '2025',
        role: 'Cursos & Automação de Scripts',
        company: 'Formações Complementares',
        description: 'Especialização livre focada em Python, lógica de programação estruturada, automação de fluxos operacionais e ferramentas de produtividade empresarial.'
      }
    ] as TimelineItem[]
  })

  // Dynamic Typing Subtitle Effect
  const [typedTitle, setTypedTitle] = useState('')
  useEffect(() => {
    let index = 0
    setTypedTitle('')
    const text = portfolioData.title
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypedTitle(() => text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [portfolioData.title])

  // --- Theme Mode & Color Effects ---
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode') as 'dark' | 'light' | null
    if (savedTheme) {
      setThemeMode(savedTheme)
    }
  }, [])

  useEffect(() => {
    const root = document.body
    if (themeMode === 'light') {
      root.classList.add('light-theme')
    } else {
      root.classList.remove('light-theme')
    }
    localStorage.setItem('theme-mode', themeMode)
  }, [themeMode])

  // Scroll Event to collapse Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsNavbarScrolled(true)
      } else {
        setIsNavbarScrolled(false)
      }

      // Check current scroll position to set active navigation link
      const sections = ['home', 'about', 'skills', 'projects', 'experience']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const offsetTop = el.offsetTop
          const offsetHeight = el.offsetHeight
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dynamic Page Title
  useEffect(() => {
    document.title = `${portfolioData.name} | Portfólio Premium`
  }, [portfolioData.name])

  // --- Computed Theme Colors (Cyberpunk Black and Red variants) ---

  // Skills Filtering
  const filteredSkills = activeTab === 'all'
    ? portfolioData.skills
    : portfolioData.skills.filter(s => s.category === activeTab)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="root">
      {/* Glassmorphic Navigation Bar */}
      <header className={`navbar ${isNavbarScrolled ? 'scrolled' : ''}`}>
        <div className="portfolio-container">
          <div className="logo-wrapper" onClick={() => scrollToSection('home')}>
            <span>{portfolioData.name.split(' ')[0]}</span>
            <span className="logo-dot"></span>
          </div>

          <nav>
            <ul className="nav-menu">
              <li>
                <span className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => scrollToSection('home')}>
                  Início
                </span>
              </li>
              <li>
                <span className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => scrollToSection('about')}>
                  Sobre
                </span>
              </li>
              <li>
                <span className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => scrollToSection('skills')}>
                  Habilidades
                </span>
              </li>
              <li>
                <span className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => scrollToSection('projects')}>
                  Projetos
                </span>
              </li>
              <li>
                <span className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`} onClick={() => scrollToSection('experience')}>
                  Experiência
                </span>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <button
              className="icon-btn"
              onClick={() => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark')}
              title={`Alternar para modo ${themeMode === 'dark' ? 'Claro' : 'Escuro'}`}
              aria-label="Toggle Theme Mode"
            >
              {themeMode === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="portfolio-container hero-grid">
          <div className="hero-content">
            <div className="hero-avatar-wrapper">
              <img
                src="https://github.com/amorimfps1.png"
                alt={portfolioData.name}
                className="hero-avatar"
              />
            </div>

            <h1 className="hero-title">
              Olá, eu sou{' '}
              <span className="hero-name">{portfolioData.name}</span>
            </h1>

            <div className="hero-subtitle">
              <span>Eu atuo como </span>
              <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                {typedTitle}
              </span>
              <span
                className="cursor"
                style={{
                  animation: 'pulse-glow 1s infinite',
                  marginLeft: '2px',
                }}
              >
                |
              </span>
            </div>

            <p className="hero-description">{portfolioData.bio}</p>

            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollToSection('projects')}>
                Ver Meus Projetos
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>

              <a
                className="btn-secondary"
                href="https://api.whatsapp.com/send/?phone=61998338069&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>

              <div className="hero-social-links">
                <a
                  href={portfolioData.github}
                  className="icon-btn"
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  aria-label="GitHub Link"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>

                <a
                  href={portfolioData.linkedin}
                  className="icon-btn"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn Link"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Counters */}
      <div className="portfolio-container">
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-number">{portfolioData.experienceYears}</div>
            <div className="stat-label">MCJB / Suporte</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-number">{portfolioData.projectsCompleted}</div>
            <div className="stat-label">Frentes de Ação</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-number">{portfolioData.technologiesMastered}</div>
            <div className="stat-label">Tecnologias</div>
          </div>
        </div>
      </div>

      {/* About Section & Services */}
      <section id="about" className="section-wrapper">
        <div className="portfolio-container">
          <div className="section-header">
            <p className="section-subtitle">Objetivo e Foco</p>
            <h2 className="section-title">O Que Eu Ofereço</h2>
          </div>

          <div className="about-grid">
            {/* Service 1 */}
            <div className="service-card glass-card">
              <div className="service-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3 className="service-title">Suporte Técnico & ITSM</h3>
              <p className="service-description">
                Atendimento consultivo ágil aos usuários com registro, acompanhamento e triagem de incidentes/demandas nas plataformas Jira Service Management e Freshdesk.
              </p>
            </div>

            {/* Service 2 */}
            <div className="service-card glass-card">
              <div className="service-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <h3 className="service-title">Dev & Automações</h3>
              <p className="service-description">
                Criação de rotinas em Python, fluxos de ETL no n8n e análise exploratória estruturada em Pandas, reduzindo ações manuais e melhorando a qualidade dos dados.
              </p>
            </div>

            {/* Service 3 */}
            <div className="service-card glass-card">
              <div className="service-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                </svg>
              </div>
              <h3 className="service-title">Infraestrutura & Redes</h3>
              <p className="service-description">
                Estruturação física e lógica de redes LAN, crimpagem de cabeamento estruturado e parametrização de roteadores, switches, DNS, DHCP e regras TCP/IP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-wrapper">
        <div className="portfolio-container">
          <div className="section-header">
            <p className="section-subtitle">Proficiências</p>
            <h2 className="section-title">Minha Caixa de Ferramentas</h2>
          </div>

          <div className="skills-container">
            {/* Filter Tabs */}
            <div className="tabs-header">
              <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Todas</button>
              <button className={`tab-btn ${activeTab === 'frontend' ? 'active' : ''}`} onClick={() => setActiveTab('frontend')}>ITSM & Produtividade</button>
              <button className={`tab-btn ${activeTab === 'backend' ? 'active' : ''}`} onClick={() => setActiveTab('backend')}>Infra & Redes</button>
              <button className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`} onClick={() => setActiveTab('design')}>Dev & Automação</button>
              <button className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`} onClick={() => setActiveTab('tools')}>Ágil & Versionamento</button>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
              {filteredSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: `${skill.level}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-wrapper">
        <div className="portfolio-container">
          <div className="section-header">
            <p className="section-subtitle">Casos Práticos</p>
            <h2 className="section-title">Projetos & Atividades</h2>
          </div>

          <div className="projects-grid">
            {portfolioData.projects.map((project) => (
              <article key={project.id} className="project-card glass-card">
                <div className="project-visual">
                  <span className="project-visual-icon">{project.icon}</span>
                </div>
                <div className="project-body">
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-footer">
                    <a
                      href={project.githubUrl}
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver no GitHub
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience / Timeline Section */}
      <section id="experience" className="section-wrapper">
        <div className="portfolio-container">
          <div className="section-header">
            <p className="section-subtitle">Cronologia</p>
            <h2 className="section-title">Minha Jornada Profissional</h2>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>
            {portfolioData.timeline.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content glass-card">
                  <div className="timeline-date">{item.year}</div>
                  <h3 className="timeline-role">{item.role}</h3>
                  <h4 className="timeline-company">{item.company}</h4>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="portfolio-container footer-content">
          <div className="logo-wrapper">
            <span>{portfolioData.name.split(' ')[0]}</span>
            <span className="logo-dot"></span>
          </div>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} {portfolioData.name}. Todos os direitos reservados. Desenvolvido com React.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
