import { useState, useEffect } from 'react'
import {
  Mail,
  Phone,
  ExternalLink,
  Code2,
  Database,
  Bot,
  Wrench,
  CheckCircle2,
  Copy,
  Check,
  Sun,
  Moon,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Layers,
  Terminal,
  MapPin,
  Sparkles
} from 'lucide-react'
import './App.css'

// Professional Inline SVG Icons for Brands
function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

interface Project {
  id: string
  title: string
  categoryBadge: string
  description: string
  highlights: string[]
  tags: string[]
  githubUrl: string
  liveUrl?: string
}

interface SkillDomain {
  id: string
  title: string
  icon: typeof Code2
  skills: string[]
}

export function App() {
  // Theme state with lazy initialization
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app-theme') as 'dark' | 'light' | null
      if (saved) return saved
    }
    return 'dark'
  })
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  // Candidate Data from Resume
  const candidate = {
    name: 'João Gabriel Dantas Amorim',
    shortName: 'João Gabriel',
    role: 'Desenvolvedor de Software | Estagiário de Engenharia de Software',
    headline: 'Desenvolvimento Full-Stack, Engenharia de Dados & Automação com IA',
    location: 'Brasília / DF',
    phone: '(61) 99833-8069',
    phoneRaw: '5561998338069',
    email: 'dantasjgabriel@gmail.com',
    github: 'https://github.com/amorimfps1',
    linkedin: 'https://www.linkedin.com/in/joaodamorim',
    bio: 'Estagiário de Engenharia de Software no Movimento Comunitário do Jardim Botânico (MCJB) e graduando no UniCEUB. Foco no desenvolvimento de soluções full-stack escaláveis, modelagem de bancos de dados relacionais (PostgreSQL/Supabase), automação de pipelines com Python e criação de agentes práticos com Inteligência Artificial.',
    education: [
      {
        institution: 'UniCEUB — Centro Universitário de Brasília',
        degree: 'Bacharelado em Engenharia de Software',
        status: 'Cursando — 2º semestre',
        forecast: 'Previsão de conclusão: 12/2030'
      },
      {
        institution: 'Formações Complementares',
        degree: 'Cursos de Python e Programação',
        status: 'Concluído',
        forecast: 'Lógica estruturada, automação de processos e desenvolvimento de scripts'
      }
    ],
    experience: {
      role: 'Estagiário de Engenharia de Software',
      company: 'MCJB — Movimento Comunitário do Jardim Botânico',
      period: '02/2026 – Atual',
      activities: [
        'Desenvolvimento e manutenção de sistema interno para organização e processamento de dados.',
        'Estruturação e modelagem de banco de dados, otimizando o acesso e a integridade das informações.',
        'Elaboração de consultas SQL complexas para extração, transformação e análise de dados.',
        'Automação de processos operacionais utilizando Python (biblioteca Pandas) e Google Apps Script, reduzindo tarefas manuais.',
        'Apoio direto na construção e otimização de fluxos de dados e pipelines.',
        'Execução de suporte técnico e manutenção preventiva de hardware, resolução ágil de problemas em estações de trabalho e administração de sistemas.'
      ]
    },
    projects: [
      {
        id: 'movimais',
        title: 'MoviMais',
        categoryBadge: 'Full-Stack & Cloud',
        description: 'Sistema de gestão que desempenhou um papel fundamental na administração e organização das operações do movimento comunitário.',
        highlights: [
          'Arquitetura full-stack desenvolvida com React, Vite, Supabase, PostgreSQL e validação rigorosa com Zod.',
          'Uso integrado de assistentes de LLMs (Antigravity, Claude) durante o ciclo para acelerar a entrega de código de alta qualidade.',
          'Banco de dados estruturado na nuvem, deploy em produção na Vercel com pipeline de integração contínua.'
        ],
        tags: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'Zod', 'Vercel', 'LLMs'],
        githubUrl: 'https://github.com/amorimfps1/movimais'
      },
      {
        id: 'mcjbchatbot',
        title: 'MCJB Chatbot',
        categoryBadge: 'IA em Produção',
        description: 'Chatbot com assistente virtual em ambiente real de produção para o Movimento Comunitário do Jardim Botânico.',
        highlights: [
          'Responde dúvidas dos usuários com base em base de conhecimento própria, sob medida para a instituição.',
          'Aplicação prática de agentes conversacionais e automações com Inteligência Artificial para atendimento eficiente.'
        ],
        tags: ['IA Conversacional', 'Agentes Generativos', 'Python', 'Base Proprietária', 'Produção'],
        githubUrl: 'https://github.com/amorimfps1/mcjbchatbot'
      },
      {
        id: 'portfolio',
        title: 'Meu Portfólio',
        categoryBadge: 'Frontend & Design System',
        description: 'Site pessoal de engenharia para apresentar projetos, competências técnicas e evolução profissional de forma moderna e sem clichês.',
        highlights: [
          'Desenvolvido com layout 100% responsivo utilizando React 19, TypeScript, Vite e CSS modular.',
          'Design System limpo, suporte completo a temas Dark/Light e foco em clareza técnica e arquitetura.'
        ],
        tags: ['React 19', 'TypeScript', 'Vite', 'Design System', 'Responsive'],
        githubUrl: 'https://github.com/amorimfps1/meu-portfolio'
      }
    ] as Project[],
    skillDomains: [
      {
        id: 'dev',
        title: 'Desenvolvimento & Arquitetura',
        icon: Code2,
        skills: ['JavaScript', 'TypeScript', 'React', 'Vite', 'HTML5', 'CSS3', 'Zod', 'Tailwind/CSS Moderno']
      },
      {
        id: 'data',
        title: 'Banco de Dados & Backend',
        icon: Database,
        skills: ['PostgreSQL', 'Supabase', 'Modelagem Relacional', 'Consultas SQL Avançadas', 'Pipelines ETL/ELT']
      },
      {
        id: 'ai',
        title: 'Inteligência Artificial & Automação',
        icon: Bot,
        skills: ['Ferramentas de LLMs (Antigravity, Claude)', 'Agentes Generativos', 'IA Conversacional', 'Python (Pandas, Scripts)']
      },
      {
        id: 'infra',
        title: 'Infraestrutura & Ferramentas',
        icon: Terminal,
        skills: ['Vercel (CI/CD Contínuo)', 'Git', 'GitHub', 'Google Apps Script', 'Google Workspace', 'ITSM (Jira)']
      },
      {
        id: 'methods',
        title: 'Metodologias & Produtividade',
        icon: Wrench,
        skills: ['Scrum', 'Kanban', 'Jira Service Management', 'Trello', 'Resolução Ágil de Problemas']
      }
    ] as SkillDomain[],
    softSkills: [
      'Comunicação verbal e escrita clara no atendimento a usuários e suporte técnico',
      'Organização rigorosa e atenção a detalhes na gestão de dados e processos',
      'Pensamento analítico aplicado à modelagem de dados e arquitetura',
      'Aprendizado contínuo, adaptabilidade e autonomia na resolução de problemas',
      'Trabalho em equipe e colaboração com times multidisciplinares'
    ]
  }

  // Theme Persistence
  useEffect(() => {
    document.body.className = themeMode === 'light' ? 'light-theme' : ''
    localStorage.setItem('app-theme', themeMode)
  }, [themeMode])

  // Scroll listener for sticky navbar and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)

      const sections = ['inicio', 'projetos', 'experiencia', 'habilidades', 'formacao', 'contato']
      const scrollPos = window.scrollY + 180

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(candidate.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(candidate.phone)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2500)
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app-wrapper">
      {/* Background Atmosphere Overlay */}
      <div className="bg-grid-overlay" aria-hidden="true"></div>

      {/* Header Navigation */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a href="#inicio" className="brand-logo" onClick={(e) => { e.preventDefault(); scrollTo('inicio'); }}>
            <span>{candidate.shortName}</span>
            <span className="brand-badge">Software & Data</span>
          </a>

          <nav>
            <ul className="nav-links">
              <li>
                <button
                  className={`nav-item ${activeSection === 'inicio' ? 'active' : ''}`}
                  onClick={() => scrollTo('inicio')}
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${activeSection === 'projetos' ? 'active' : ''}`}
                  onClick={() => scrollTo('projetos')}
                >
                  Projetos
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${activeSection === 'experiencia' ? 'active' : ''}`}
                  onClick={() => scrollTo('experiencia')}
                >
                  Experiência
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${activeSection === 'habilidades' ? 'active' : ''}`}
                  onClick={() => scrollTo('habilidades')}
                >
                  Habilidades
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${activeSection === 'formacao' ? 'active' : ''}`}
                  onClick={() => scrollTo('formacao')}
                >
                  Formação
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${activeSection === 'contato' ? 'active' : ''}`}
                  onClick={() => scrollTo('contato')}
                >
                  Contato
                </button>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            <a
              href={candidate.github}
              target="_blank"
              rel="noreferrer"
              className="action-icon-btn"
              title="GitHub"
              aria-label="Perfil no GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={candidate.linkedin}
              target="_blank"
              rel="noreferrer"
              className="action-icon-btn"
              title="LinkedIn"
              aria-label="Perfil no LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <button
              onClick={() => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark')}
              className="action-icon-btn"
              title={`Alternar para tema ${themeMode === 'dark' ? 'claro' : 'escuro'}`}
              aria-label="Alternar Tema"
            >
              {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="main-content">
        {/* Hero Section */}
        <section id="inicio" className="hero-section">
          <div className="container hero-layout">
            <div className="hero-text-block">
              <div className="status-pill">
                <span className="status-dot"></span>
                <span>Estagiário @ MCJB &bull; Graduando @ UniCEUB</span>
              </div>

              <h1 className="hero-title">
                Construindo soluções full-stack, <span className="hero-highlight">arquiteturas de dados</span> e automação inteligente.
              </h1>

              <p className="hero-description">
                {candidate.bio}
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={() => scrollTo('projetos')}>
                  <span>Ver Projetos em Produção</span>
                  <ArrowUpRight size={16} />
                </button>

                <a
                  href={`https://wa.me/${candidate.phoneRaw}?text=Ol%C3%A1%20Jo%C3%A3o,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  <Phone size={16} />
                  <span>WhatsApp</span>
                </a>

                <button className="btn-secondary" onClick={handleCopyEmail}>
                  {copiedEmail ? <Check size={16} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={16} />}
                  <span>{copiedEmail ? 'E-mail copiado!' : 'Copiar E-mail'}</span>
                </button>
              </div>
            </div>

            {/* Profile Overview Card */}
            <div className="hero-card-preview">
              <div className="profile-header">
                <div className="avatar-wrapper">
                  <img
                    src="https://github.com/amorimfps1.png"
                    alt={candidate.name}
                    className="avatar-img"
                  />
                </div>
                <div className="profile-meta">
                  <h3>{candidate.name}</h3>
                  <p>
                    <MapPin size={13} />
                    <span>{candidate.location}</span>
                  </p>
                </div>
              </div>

              <div className="quick-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Foco Atual</span>
                  <span className="spec-value">Engenharia & Dados</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Stack Principal</span>
                  <span className="spec-value">React, TS, Python, SQL</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Banco de Dados</span>
                  <span className="spec-value">PostgreSQL / Supabase</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Inteligência Artificial</span>
                  <span className="spec-value">LLMs & Automação</span>
                </div>
              </div>

              <div className="profile-social-row">
                <a
                  href={candidate.github}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-social-btn"
                >
                  <GithubIcon size={14} />
                  <span>github.com/amorimfps1</span>
                </a>
                <a
                  href={candidate.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-social-btn"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projetos" className="projects-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">
                <Layers size={14} />
                Casos Reais & Arquitetura
              </span>
              <h2 className="section-title">Projetos em Destaque</h2>
              <p className="section-subtitle">
                Sistemas em produção, arquiteturas modulares e soluções práticas com validação rigorosa de ponta a ponta.
              </p>
            </div>

            <div className="projects-grid">
              {candidate.projects.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-top">
                    <span className="project-badge-tag">{project.categoryBadge}</span>
                    <div className="project-links-row">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-icon-link"
                        title="Ver Código no GitHub"
                        aria-label={`Ver código de ${project.title}`}
                      >
                        <GithubIcon size={16} />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-icon-link"
                          title="Acessar Demonstração"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>

                  <ul className="project-highlights-list">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="project-highlight-item">
                        <CheckCircle2 size={14} className="highlight-bullet" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="project-tags">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="tech-chip">{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section id="experiencia" className="experience-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">
                <Briefcase size={14} />
                Trajetória Profissional
              </span>
              <h2 className="section-title">Experiência & Atuação</h2>
              <p className="section-subtitle">
                Atividades de desenvolvimento, modelagem de dados, automações de rotina e infraestrutura em ambiente real.
              </p>
            </div>

            <div className="experience-timeline">
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div className="timeline-role-info">
                    <h3>{candidate.experience.role}</h3>
                    <span className="timeline-company-badge">{candidate.experience.company}</span>
                  </div>
                  <span className="timeline-period-badge">{candidate.experience.period}</span>
                </div>

                <div className="responsibilities-grid">
                  {candidate.experience.activities.map((activity, idx) => (
                    <div key={idx} className="resp-item">
                      <Sparkles size={16} className="resp-icon" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills Domain Grid */}
        <section id="habilidades" className="skills-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">
                <Code2 size={14} />
                Competências Técnicas
              </span>
              <h2 className="section-title">Habilidades & Tecnologias</h2>
              <p className="section-subtitle">
                Organizadas por domínio de especialização, sem métricas abstratas e com foco no ecossistema prático de engenharia.
              </p>
            </div>

            <div className="skills-domain-grid">
              {candidate.skillDomains.map((domain) => {
                const DomainIcon = domain.icon
                return (
                  <div key={domain.id} className="domain-card">
                    <div className="domain-header">
                      <div className="domain-icon-box">
                        <DomainIcon size={18} />
                      </div>
                      <h3 className="domain-title">{domain.title}</h3>
                    </div>

                    <div className="domain-tags-wrap">
                      {domain.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Academic Education & Behavioral Competencies */}
        <section id="formacao" className="education-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">
                <GraduationCap size={14} />
                Formação Acadêmica & Perfil
              </span>
              <h2 className="section-title">Educação & Competências</h2>
              <p className="section-subtitle">
                Base acadêmica em Engenharia de Software associada a soft skills fundamentais para ambientes colaborativos de alto nível.
              </p>
            </div>

            <div className="edu-soft-grid">
              {/* Education Card */}
              <div className="edu-card">
                <h3 className="domain-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={20} color="var(--accent-primary)" />
                  Formação & Cursos
                </h3>

                {candidate.education.map((edu, idx) => (
                  <div key={idx} className="edu-entry">
                    <h4 className="edu-institution">{edu.institution}</h4>
                    <span className="edu-degree">{edu.degree}</span>
                    <span className="edu-meta">{edu.status} &bull; {edu.forecast}</span>
                  </div>
                ))}
              </div>

              {/* Behavioral Skills Card */}
              <div className="edu-card">
                <h3 className="domain-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} color="var(--accent-emerald)" />
                  Competências Comportamentais
                </h3>

                <div className="soft-skills-list">
                  {candidate.softSkills.map((soft, sIdx) => (
                    <div key={sIdx} className="soft-skill-item">
                      <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                      <span>{soft}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section id="contato" className="contact-section">
          <div className="container">
            <div className="contact-banner">
              <div className="contact-text-block">
                <h2>Vamos conversar sobre novas oportunidades?</h2>
                <p>
                  Estou disponível para atuações e projetos em Desenvolvimento de Software Full-Stack, Engenharia de Dados e automações com Inteligência Artificial em Brasília / DF ou remotamente.
                </p>
              </div>

              <div className="contact-channels-grid">
                <div className="contact-channel-card" onClick={handleCopyEmail}>
                  <div className="channel-info">
                    <Mail size={18} className="channel-icon" />
                    <div>
                      <div className="channel-label">E-mail Profissional</div>
                      <div className="channel-value">{candidate.email}</div>
                    </div>
                  </div>
                  {copiedEmail ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} color="var(--text-muted)" />}
                </div>

                <a
                  href={`https://wa.me/${candidate.phoneRaw}?text=Ol%C3%A1%20Jo%C3%A3o,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!`}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-channel-card"
                >
                  <div className="channel-info">
                    <Phone size={18} className="channel-icon" />
                    <div>
                      <div className="channel-label">WhatsApp / Telefone</div>
                      <div className="channel-value">{candidate.phone}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} color="var(--text-muted)" />
                </a>

                <a
                  href={candidate.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-channel-card"
                >
                  <div className="channel-info">
                    <LinkedinIcon size={18} />
                    <div>
                      <div className="channel-label">LinkedIn</div>
                      <div className="channel-value">linkedin.com/in/joaodamorim</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} color="var(--text-muted)" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Site Footer */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} {candidate.name}. Desenvolvido com React, TypeScript & Vite.
          </div>
          <div className="footer-socials">
            <a href={candidate.github} target="_blank" rel="noreferrer" className="action-icon-btn" title="GitHub">
              <GithubIcon size={16} />
            </a>
            <a href={candidate.linkedin} target="_blank" rel="noreferrer" className="action-icon-btn" title="LinkedIn">
              <LinkedinIcon size={16} />
            </a>
            <button onClick={handleCopyPhone} className="action-icon-btn" title="Copiar Telefone">
              <Phone size={16} />
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Feedback Toast */}
      {(copiedEmail || copiedPhone) && (
        <div className="toast-container">
          <CheckCircle2 size={16} color="var(--accent-emerald)" />
          <span>{copiedEmail ? 'E-mail copiado para a área de transferência!' : 'Telefone copiado para a área de transferência!'}</span>
        </div>
      )}
    </div>
  )
}

export default App

