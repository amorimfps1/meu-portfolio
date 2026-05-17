import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
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
  const [themeColor, setThemeColor] = useState<'red' | 'crimson' | 'scarlet' | 'orange' | 'purple'>('red')
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'design' | 'tools'>('all')
  const [contactSuccess, setContactSuccess] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Form State
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')

  // Portfolio Editable Data
  const [portfolioData, setPortfolioData] = useState({
    name: 'João Gabriel Dantas Amorim',
    title: 'Estagiário de Suporte em T.I. | Engenharia de Software',
    bio: 'Atuo como Estagiário de Suporte em T.I., contribuindo no atendimento aos usuários, registro e gestão de chamados em sistemas ITSM (Jira, Freshdesk), suporte a infraestrutura de redes e gestão de ativos. Experiência prática com ambientes ágeis, noções de redes (TCP/IP, DNS, DHCP) e automação de processos.',
    email: 'dantasjgabriel@gmail.com',
    github: 'https://github.com/amorimfps1',
    linkedin: 'https://linkedin.com', // Default placeholder for LinkedIn
    twitter: 'https://twitter.com',
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
        id: 1,
        title: 'Sistema de Processamento MCJB',
        description: 'Desenvolvimento e manutenção de um sistema interno robusto para processamento, modelagem e integridade de dados corporativos da organização.',
        tags: ['Python', 'SQL', 'Modelagem', 'Git'],
        category: 'webapp',
        demoUrl: '#',
        githubUrl: 'https://github.com/amorimfps1',
        gradient: 'linear-gradient(135deg, #ef4444, #991b1b)',
        icon: '💾'
      },
      {
        id: 2,
        title: 'Automações Inteligentes com n8n & IA',
        description: 'Construção de pipelines de automação e webhooks, otimizando fluxos de dados internos e reduzindo tarefas operacionais manuais da equipe.',
        tags: ['Python', 'n8n', 'APIs REST', 'Agentes IA'],
        category: 'webapp',
        demoUrl: '#',
        githubUrl: 'https://github.com/amorimfps1',
        gradient: 'linear-gradient(135deg, #dc2626, #f97316)',
        icon: '🤖'
      },
      {
        id: 3,
        title: 'Estruturação de Redes Localizadas',
        description: 'Suporte à infraestrutura de redes: configuração física e lógica de roteadores/switches, cabeamento estruturado e regras de TCP/IP, DNS e DHCP.',
        tags: ['Redes', 'TCP/IP', 'DNS / DHCP', 'Switches'],
        category: 'design',
        demoUrl: '#',
        githubUrl: 'https://github.com/amorimfps1',
        gradient: 'linear-gradient(135deg, #7f1d1d, #000000)',
        icon: '🌐'
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
    // Check localStorage
    const savedTheme = localStorage.getItem('theme-mode') as 'dark' | 'light' | null
    if (savedTheme) {
      setThemeMode(savedTheme)
    }
    const savedColor = localStorage.getItem('theme-color') as any
    if (savedColor) {
      setThemeColor(savedColor)
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

  useEffect(() => {
    localStorage.setItem('theme-color', themeColor)
  }, [themeColor])

  // Scroll Event to collapse Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsNavbarScrolled(true)
      } else {
        setIsNavbarScrolled(false)
      }

      // Check current scroll position to set active navigation link
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
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

  // --- Handlers ---
  const handleColorChange = (color: typeof themeColor) => {
    setThemeColor(color)
  }

  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar todos os valores para os padrões de fábrica?')) {
      setPortfolioData({
        name: 'JOÃO GABRIEL DANTAS AMORIM',
        title: 'Estagiário de Suporte em T.I. | Engenharia de Software',
        bio: 'Atuo como Estagiário de Suporte em T.I., contribuindo no atendimento aos usuários, registro e gestão de chamados em sistemas ITSM (Jira, Freshdesk), suporte a infraestrutura de redes e gestão de ativos. Experiência prática com ambientes ágeis, noções de redes (TCP/IP, DNS, DHCP) e automação de processos.',
        email: 'dantasjgabriel@gmail.com',
        github: 'https://github.com/amorimfps1',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
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
        ],
        projects: [
          {
            id: 1,
            title: 'Sistema de Processamento MCJB',
            description: 'Desenvolvimento e manutenção de um sistema interno robusto para processamento, modelagem e integridade de dados corporativos da organização.',
            tags: ['Python', 'SQL', 'Modelagem', 'Git'],
            category: 'webapp',
            demoUrl: '#',
            githubUrl: 'https://github.com/amorimfps1',
            gradient: 'linear-gradient(135deg, #ef4444, #991b1b)',
            icon: '💾'
          },
          {
            id: 2,
            title: 'Automações Inteligentes com n8n & IA',
            description: 'Construção de pipelines de automação e webhooks, otimizando fluxos de dados internos e reduzindo tarefas operacionais manuais da equipe.',
            tags: ['Python', 'n8n', 'APIs REST', 'Agentes IA'],
            category: 'webapp',
            demoUrl: '#',
            githubUrl: 'https://github.com/amorimfps1',
            gradient: 'linear-gradient(135deg, #dc2626, #f97316)',
            icon: '🤖'
          },
          {
            id: 3,
            title: 'Estruturação de Redes Localizadas',
            description: 'Suporte à infraestrutura de redes: configuração física e lógica de roteadores/switches, cabeamento estruturado e regras de TCP/IP, DNS e DHCP.',
            tags: ['Redes', 'TCP/IP', 'DNS / DHCP', 'Switches'],
            category: 'design',
            demoUrl: '#',
            githubUrl: 'https://github.com/amorimfps1',
            gradient: 'linear-gradient(135deg, #7f1d1d, #000000)',
            icon: '🌐'
          }
        ],
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
        ]
      })
      setThemeColor('red')
      setThemeMode('dark')
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName || !formEmail || !formMessage) {
      alert('Por favor, preencha todos os campos.')
      return
    }
    // Simulate sending animation
    setContactSuccess(true)
    // Clear form fields
    setFormName('')
    setFormEmail('')
    setFormMessage('')
  }

  // --- Computed Theme Colors (Cyberpunk Black and Red variants) ---
  const activeColorValues = {
    red: { primary: '#ef4444', primaryGlow: 'rgba(239, 68, 68, 0.18)', primaryBorder: 'rgba(239, 68, 68, 0.4)', primaryDark: '#dc2626' },
    crimson: { primary: '#dc2626', primaryGlow: 'rgba(220, 38, 38, 0.18)', primaryBorder: 'rgba(220, 38, 38, 0.4)', primaryDark: '#991b1b' },
    scarlet: { primary: '#991b1b', primaryGlow: 'rgba(153, 27, 27, 0.18)', primaryBorder: 'rgba(153, 27, 27, 0.4)', primaryDark: '#7f1d1d' },
    orange: { primary: '#f97316', primaryGlow: 'rgba(249, 115, 22, 0.18)', primaryBorder: 'rgba(249, 115, 22, 0.4)', primaryDark: '#ea580c' },
    purple: { primary: '#a855f7', primaryGlow: 'rgba(168, 85, 247, 0.18)', primaryBorder: 'rgba(168, 85, 247, 0.4)', primaryDark: '#7c3aed' }
  }[themeColor]

  const rootStyles = {
    '--primary-color': activeColorValues.primary,
    '--primary-glow': activeColorValues.primaryGlow,
    '--primary-border': activeColorValues.primaryBorder,
    '--primary-dark': activeColorValues.primaryDark
  } as React.CSSProperties

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
    <div id="root" style={rootStyles}>
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
              <li>
                <span className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToSection('contact')}>
                  Contato
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

            {/* Customizer Drawer Trigger Button */}
            <button
              className="icon-btn customizer-trigger"
              onClick={() => setIsCustomizerOpen(true)}
              title="Abrir Personalizador ao Vivo"
              aria-label="Abrir Personalizador ao Vivo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span className="pulse-badge"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="portfolio-container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="animate-pulse" style={{ color: 'var(--primary-color)' }}>⚡</span>
              <span>Disponível para Freelance e Suporte de Alta Performance</span>
            </div>
            <h1 className="hero-title">
              Olá, eu sou <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #ffffff, var(--primary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{portfolioData.name}</span>
            </h1>
            <div className="hero-subtitle">
              <span>Eu atuo como </span>
              <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{typedTitle}</span>
              <span className="cursor" style={{ animation: 'pulse-glow 1s infinite', marginLeft: '2px' }}>|</span>
            </div>
            <p className="hero-description">{portfolioData.bio}</p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollToSection('projects')}>
                Ver Meus Projetos
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
                Entrar em Contato
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counters */}
      <div className="portfolio-container">
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-number" style={{ background: 'linear-gradient(135deg, #ffffff, var(--primary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{portfolioData.experienceYears}</div>
            <div className="stat-label">MCJB / Suporte</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-number" style={{ background: 'linear-gradient(135deg, #ffffff, var(--primary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{portfolioData.projectsCompleted}</div>
            <div className="stat-label">Frentes de Ação</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-number" style={{ background: 'linear-gradient(135deg, #ffffff, var(--primary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{portfolioData.technologiesMastered}</div>
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
                        width: `${skill.level}%`,
                        background: 'linear-gradient(90deg, var(--primary-color), var(--primary-dark))'
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
                  <div className="project-gradient-bg" style={{ background: project.gradient }}>
                    <span className="project-visual-icon">{project.icon}</span>
                  </div>
                  <div className="project-overlay">
                    <a href={project.githubUrl} className="icon-btn" target="_blank" rel="noreferrer" title="Código Fonte" aria-label="Project Source Code">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
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

      {/* Contact Section */}
      <section id="contact" className="section-wrapper">
        <div className="portfolio-container">
          <div className="section-header">
            <p className="section-subtitle">Conectividade</p>
            <h2 className="section-title">Envie uma Mensagem Direta</h2>
          </div>

          <div className="contact-grid">
            {/* Left Contact Methods */}
            <div className="contact-info">
              <div className="contact-info-header">
                <h3>Vamos Colaborar!</h3>
                <p>Tem uma vaga de estágio aberta, uma infraestrutura de redes para organizar ou projetos de automação operacional para tirar do papel? Entre em contato agora!</p>
              </div>

              <div className="contact-methods">
                <div className="contact-method-card glass-card">
                  <div className="cm-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div className="cm-details">
                    <h4>E-mail</h4>
                    <p>{portfolioData.email}</p>
                  </div>
                </div>

                <div className="contact-method-card glass-card">
                  <div className="cm-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="cm-details">
                    <h4>Telefone / WhatsApp</h4>
                    <p>{portfolioData.phone}</p>
                  </div>
                </div>

                <div className="contact-method-card glass-card">
                  <div className="cm-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="cm-details">
                    <h4>Localização</h4>
                    <p>{portfolioData.location}</p>
                  </div>
                </div>
              </div>

              <div className="contact-socials">
                <h4>Minhas Redes</h4>
                <div className="social-icons-row">
                  <a href={portfolioData.github} className="icon-btn" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub Link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Form Wrapper */}
            <div className="contact-form-wrapper glass-card">
              {!contactSuccess ? (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Nome Completo</label>
                    <input
                      id="name"
                      type="text"
                      className="form-input"
                      placeholder="Ex: João da Silva"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Endereço de E-mail</label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="Ex: joao@exemplo.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Sua Mensagem</label>
                    <textarea
                      id="message"
                      className="form-input"
                      placeholder="Escreva sua proposta de estágio ou projeto..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Enviar Mensagem
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              ) : (
                <div className="success-card">
                  <div className="success-icon-box" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3>Mensagem Enviada!</h3>
                  <p>Obrigado por se conectar, {formName || 'amigo(a)'}! Seu sinal criativo foi enfileirado com sucesso. Responderei o mais rápido possível.</p>
                  <button className="btn-secondary" style={{ marginTop: '12px' }} onClick={() => setContactSuccess(false)}>
                    Enviar outra mensagem
                  </button>
                </div>
              )}
            </div>
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
            &copy; {new Date().getFullYear()} {portfolioData.name}. Todos os direitos reservados. Desenvolvido com React de Alta Performance.
          </p>
        </div>
      </footer>

      {/* --- Live Customizer Side Panel Panel --- */}
      <div
        className={`customizer-backdrop ${isCustomizerOpen ? 'open' : ''}`}
        onClick={() => setIsCustomizerOpen(false)}
      ></div>

      <div className={`customizer-panel ${isCustomizerOpen ? 'open' : ''}`}>
        <div className="customizer-header">
          <h3 className="customizer-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Personalizador ao Vivo
          </h3>
          <button className="icon-btn" onClick={() => setIsCustomizerOpen(false)} aria-label="Fechar Personalizador">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="customizer-body">
          {/* Accent Color Theme */}
          <div className="customizer-section">
            <h4 className="cust-sec-title">Paleta de Destaque (Tons Vermelhos)</h4>
            <div className="color-options-row">
              <button
                className={`color-dot-select ${themeColor === 'red' ? 'active' : ''}`}
                style={{ backgroundColor: '#ef4444' }}
                onClick={() => handleColorChange('red')}
                title="Laser Red"
                aria-label="Laser Red"
              />
              <button
                className={`color-dot-select ${themeColor === 'crimson' ? 'active' : ''}`}
                style={{ backgroundColor: '#dc2626' }}
                onClick={() => handleColorChange('crimson')}
                title="Crimson"
                aria-label="Crimson"
              />
              <button
                className={`color-dot-select ${themeColor === 'scarlet' ? 'active' : ''}`}
                style={{ backgroundColor: '#991b1b' }}
                onClick={() => handleColorChange('scarlet')}
                title="Scarlet"
                aria-label="Scarlet"
              />
              <button
                className={`color-dot-select ${themeColor === 'orange' ? 'active' : ''}`}
                style={{ backgroundColor: '#f97316' }}
                onClick={() => handleColorChange('orange')}
                title="Volcanic Orange"
                aria-label="Volcanic Orange"
              />
              <button
                className={`color-dot-select ${themeColor === 'purple' ? 'active' : ''}`}
                style={{ backgroundColor: '#a855f7' }}
                onClick={() => handleColorChange('purple')}
                title="Purple Cyber"
                aria-label="Purple Cyber"
              />
            </div>
          </div>

          {/* Theme Mode Toggle */}
          <div className="customizer-section">
            <h4 className="cust-sec-title">Modo de Ambiente</h4>
            <button
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark')}
            >
              {themeMode === 'dark' ? '☀️ Alternar para Modo Claro' : '🌙 Alternar para Modo Escuro'}
            </button>
          </div>

          {/* Edit Profile Text fields */}
          <div className="customizer-section">
            <h4 className="cust-sec-title">Metadados Pessoais</h4>

            <div className="form-group">
              <label htmlFor="cust-name" className="form-label">Nome Completo</label>
              <input
                id="cust-name"
                type="text"
                className="form-input"
                value={portfolioData.name}
                onChange={(e) => setPortfolioData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cust-title" className="form-label">Subtítulo Profissional</label>
              <input
                id="cust-title"
                type="text"
                className="form-input"
                value={portfolioData.title}
                onChange={(e) => setPortfolioData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cust-bio" className="form-label">Bio (Apresentação Criativa)</label>
              <textarea
                id="cust-bio"
                className="form-input"
                style={{ minHeight: '80px' }}
                value={portfolioData.bio}
                onChange={(e) => setPortfolioData(prev => ({ ...prev, bio: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cust-email" className="form-label">E-mail de Contato</label>
              <input
                id="cust-email"
                type="email"
                className="form-input"
                value={portfolioData.email}
                onChange={(e) => setPortfolioData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cust-loc" className="form-label">Localização Física</label>
              <input
                id="cust-loc"
                type="text"
                className="form-input"
                value={portfolioData.location}
                onChange={(e) => setPortfolioData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cust-phone" className="form-label">Telefone / Celular</label>
              <input
                id="cust-phone"
                type="text"
                className="form-input"
                value={portfolioData.phone}
                onChange={(e) => setPortfolioData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          {/* Counter Stats Section */}
          <div className="customizer-section">
            <h4 className="cust-sec-title">Estatísticas e Métricas</h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div className="form-group">
                <label htmlFor="cust-exp" className="form-label">Exp.</label>
                <input
                  id="cust-exp"
                  type="text"
                  className="form-input"
                  style={{ padding: '8px 10px', textAlign: 'center' }}
                  value={portfolioData.experienceYears}
                  onChange={(e) => setPortfolioData(prev => ({ ...prev, experienceYears: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cust-proj" className="form-label">Frentes</label>
                <input
                  id="cust-proj"
                  type="text"
                  className="form-input"
                  style={{ padding: '8px 10px', textAlign: 'center' }}
                  value={portfolioData.projectsCompleted}
                  onChange={(e) => setPortfolioData(prev => ({ ...prev, projectsCompleted: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cust-tech" className="form-label">Techs</label>
                <input
                  id="cust-tech"
                  type="text"
                  className="form-input"
                  style={{ padding: '8px 10px', textAlign: 'center' }}
                  value={portfolioData.technologiesMastered}
                  onChange={(e) => setPortfolioData(prev => ({ ...prev, technologiesMastered: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="customizer-footer">
          <button
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleResetDefaults}
          >
            Restaurar Padrões
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
