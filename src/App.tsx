import { useState } from 'react'
import './App.css'

/* ——— Brand icons ——— */
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

/* ——— Data ——— */
const ME = {
  name: 'João Gabriel Dantas Amorim',
  nameShort: 'João Gabriel',
  role: 'Full-Stack Engineer',
  location: 'Brasília, DF',
  phone: '(61) 99833-8069',
  email: 'dantasjgabriel@gmail.com',
  github: 'https://github.com/amorimfps1',
  githubHandle: 'amorimfps1',
  linkedin: 'https://linkedin.com/in/joaodamorim',
  linkedinHandle: 'joaodamorim',

  headline: 'Construo sistemas completos: banco relacional, API documentada e interface em produção.',

  context: [
    { label: 'Cargo atual', value: 'Estagiário · Eng. de Software, Dados e Automação', sub: 'MCJB · fev 2026 — presente' },
    { label: 'Formação',    value: 'Bacharelado em Engenharia de Software', sub: 'UniCEUB · 2º semestre · conclusão 12/2030' },
    { label: 'Localização', value: 'Brasília, DF', sub: 'Disponível para remoto' },
  ],

  // About — professional summary + objective
  about: [
    'Sou desenvolvedor Full Stack com foco em sistemas que vão do banco à tela: modelo o PostgreSQL, construo e documento a API em Python/Flask com OpenAPI e entrego a interface em React + TypeScript — com produtos já em produção.',
    'Meu diferencial está na integração de IA diretamente no produto via código: LLMs por API, function calling, estruturação de dados para RAG e agentes conversacionais, sem depender de plataformas low-code.',
    'Programo diariamente com Claude, Gemini Code Assist e Antigravity, o que aumenta minha velocidade de entrega sem abrir mão de código organizado e revisável.',
  ],

  objective:
    'Busco uma posição em fintech ou SaaS onde entregar cedo, aprender rápido e trabalhar perto da engenharia seja a regra — e não a exceção.',

  // Engineering qualifications
  qualifications: [
    { label: 'POO & MVC',             detail: 'Separação clara entre modelo, regra de negócio e interface. Código revisável, manutenível.' },
    { label: 'Documentação',          detail: 'APIs com OpenAPI/Swagger (Flask-RESTX): contratos explícitos, status codes corretos, sem adivinhação.' },
    { label: 'Segurança desde o início', detail: 'Validação ponta a ponta com Zod, sanitização de entradas, upload seguro com UUID e limites de tamanho.' },
    { label: 'Padronização',          detail: 'Nomenclatura consistente, respostas HTTP padronizadas, versionamento com Git/GitHub e CI no push.' },
    { label: 'IA no fluxo',           detail: 'Uso diário de Claude, Gemini e Antigravity para ganhar velocidade — revisando e adaptando o que é gerado.' },
  ],

  stack: {
    'Languages':             ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
    'Frameworks & Libraries':['React', 'Vite', 'Flask', 'Flask-RESTX', 'Zod', 'Pandas'],
    'Data & Infrastructure': ['PostgreSQL', 'Supabase', 'SQLite', 'Gunicorn', 'Vercel', 'Render'],
    'APIs & Architecture':   ['REST (criação e consumo)', 'OpenAPI / Swagger', 'MVC', 'POO', 'Git & GitHub'],
    'AI / LLMs':             ['LLM integration via API', 'Function calling', 'RAG', 'Agentes conversacionais', 'Claude API', 'Gemini API'],
  },

  projects: [
    {
      name:    'MOVI+',
      type:    'SaaS · Full Stack',
      problem: 'Gestão operacional de uma comunidade real sem sistema centralizado',
      detail:  'Construído do zero: modelagem relacional na nuvem, validação ponta a ponta com Zod e deploy contínuo na Vercel. Em produção desde o primeiro push.',
      stack:   'React · TypeScript · Supabase · PostgreSQL · Zod · Vercel',
      repo:    'https://github.com/amorimfps1/movimais',
      deploy:  null,
    },
    {
      name:    'API de Gestão Documental',
      type:    'REST API · SPA',
      problem: 'Upload, consulta e exclusão segura de documentos sem controle de acesso ou auditoria',
      detail:  'API REST completa com Swagger. SQLite com FK, cascade delete e índices. Upload com validação de extensão, limite de tamanho e UUID. SPA com busca em tempo real. Em produção no Render via Gunicorn.',
      stack:   'Python · Flask · SQLite · Swagger · Gunicorn · Render',
      repo:    'https://github.com/amorimfps1/gestaodedocumentos',
      deploy:  null,
    },
    {
      name:    'MCJB Chatbot',
      type:    'IA em produção',
      problem: 'Acesso conversacional a dados internos da organização sem expor a base bruta',
      detail:  'Assistente em uso real com usuários ativos. Dados estruturados para RAG + function calling, integração direta via API — sem plataforma de low-code.',
      stack:   'Python · LLM API · RAG · Function calling',
      repo:    'https://github.com/amorimfps1/mcjbchatbot',
      deploy:  null,
    },
  ],

  experience: {
    role:    'Estagiário — Engenharia de Software, Dados e Automação',
    company: 'MCJB',
    period:  'fev 2026 — presente',
    items: [
      'Desenvolvo e mantenho sistema interno de backend em Python para organização e processamento de dados da organização.',
      'Modelo banco relacional e escrevo consultas SQL complexas (ETL): extração, transformação e carga de dados.',
      'Automatizo rotinas operacionais com Python (Pandas) e Google Apps Script, eliminando tarefas manuais recorrentes.',
    ],
  },
}

/* ——— Main component ——— */
export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark'
    }
    return 'dark'
  })

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <div className="app">
      {/* ——— Header ——— */}
      <header className="header">
        <div className="container header-inner">
          <span className="brand">{ME.nameShort}</span>

          <div className="header-actions">
            <a href={ME.github} target="_blank" rel="noreferrer" className="header-link" aria-label="GitHub">
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
            <a href={ME.linkedin} target="_blank" rel="noreferrer" className="header-link" aria-label="LinkedIn">
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? '○' : '●'}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ——— Hero ——— */}
        <section id="hero" className="hero">
          <div className="container">
            <div className="hero-avatar-wrap">
              <img
                src="https://github.com/amorimfps1.png"
                alt={ME.name}
                className="hero-avatar"
                width={72}
                height={72}
              />
            </div>
            <p className="hero-role"><code>{ME.role}</code></p>
            <h1 className="hero-name">{ME.name}</h1>
            <p className="hero-headline">{ME.headline}</p>

            <div className="hero-meta">
              {ME.context.map(({ label, value, sub }) => (
                <div key={label} className="meta-row">
                  <span className="meta-label">{label}</span>
                  <span className="meta-value">{value}</span>
                  <span className="meta-sub">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— About ——— */}
        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title">About</h2>

            <div className="about-layout">
              <div className="about-body">
                {ME.about.map((p, i) => (
                  <p key={i} className="about-paragraph">{p}</p>
                ))}
                <p className="about-objective">{ME.objective}</p>
              </div>

              <div className="about-quals">
                <span className="quals-heading">Engineering qualifications</span>
                {ME.qualifications.map(({ label, detail }) => (
                  <div key={label} className="qual-row">
                    <span className="qual-label">{label}</span>
                    <span className="qual-detail">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——— Work / Projects ——— */}
        <section id="work" className="section">
          <div className="container">
            <h2 className="section-title">Work</h2>

            <div className="projects-list">
              {ME.projects.map((p) => (
                <div key={p.name} className="project-item">
                  <div className="project-header">
                    <div className="project-title-wrap">
                      <span className="project-name">{p.name}</span>
                      <span className="project-type">{p.type}</span>
                    </div>
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="project-link">
                        <GithubIcon size={13} /> Repo
                      </a>
                    )}
                  </div>
                  <p className="project-problem">{p.problem}</p>
                  <p className="project-detail">{p.detail}</p>
                  <code className="project-stack">{p.stack}</code>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="experience-block">
              <div className="exp-header">
                <div>
                  <span className="exp-role">{ME.experience.role}</span>
                  <span className="exp-company">{ME.experience.company}</span>
                </div>
                <span className="exp-period">{ME.experience.period}</span>
              </div>
              <ul className="exp-list">
                {ME.experience.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ——— Stack ——— */}
        <section id="stack" className="section">
          <div className="container">
            <h2 className="section-title">Stack</h2>

            <div className="stack-grid">
              {Object.entries(ME.stack).map(([group, items]) => (
                <div key={group} className="stack-group">
                  <span className="stack-group-label">{group}</span>
                  <span className="stack-group-items">{items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Contact ——— */}
        <section id="contact" className="section section--last">
          <div className="container">
            <h2 className="section-title">Contact</h2>
            <p className="contact-line">
              <a href={`mailto:${ME.email}`} className="contact-email">{ME.email}</a>
            </p>
          </div>
        </section>
      </main>

      {/* ——— Footer ——— */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-copy">© {new Date().getFullYear()} {ME.name}</span>
          <div className="footer-links">
            <a href={ME.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={ME.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
