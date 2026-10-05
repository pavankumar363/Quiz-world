import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  ChevronRight,
  Clock3,
  Code2,
  Flame,
  Menu,
  Play,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import './styles.css'

const categories = [
  { title: 'General Knowledge', count: '120+ quizzes', icon: Brain },
  { title: 'Mathematics', count: '95+ quizzes', icon: BookOpen },
  { title: 'Science', count: '110+ quizzes', icon: Sparkles },
  { title: 'Computer Science', count: '85+ quizzes', icon: Code2 },
  { title: 'English', count: '70+ quizzes', icon: BookOpen },
  { title: 'Competitive Exams', count: '150+ quizzes', icon: Trophy },
]

const featured = [
  { title: 'AI Fundamentals', meta: '20 questions • 10 min', level: 'Intermediate', tag: 'Popular' },
  { title: 'Python Programming', meta: '25 questions • 15 min', level: 'Advanced', tag: 'Trending' },
  { title: 'General Science Challenge', meta: '15 questions • 8 min', level: 'Beginner', tag: 'New' },
]

function App() {
  const [page, setPage] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [code, setCode] = useState('')
  const [joinMessage, setJoinMessage] = useState('')

  const navigate = (next) => {
    setPage(next)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const joinQuiz = (e) => {
    e.preventDefault()
    const normalized = code.trim().toUpperCase()
    if (!normalized) {
      setJoinMessage('Enter a quiz code to continue.')
      return
    }
    setJoinMessage('Quiz code accepted for V1 demo. The secure quiz room flow will connect here next.')
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <button className="brand" onClick={() => navigate('home')} aria-label="Quiz World home">
            <span className="brand-mark"><Brain size={20} /></span>
            <span>
              <strong>Quiz World</strong>
              <small>Think. Answer. Compete. Master.</small>
            </span>
          </button>

          <nav className="desktop-nav">
            <button className={page === 'home' ? 'active' : ''} onClick={() => navigate('home')}>Home</button>
            <button onClick={() => navigate('explore')}>Explore</button>
            <button onClick={() => navigate('leaderboard')}>Leaderboard</button>
            <button onClick={() => navigate('ai')}>AI Quiz</button>
            <button className="nav-login" onClick={() => navigate('login')}>Login</button>
          </nav>

          <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="mobile-nav">
            <button onClick={() => navigate('home')}>Home</button>
            <button onClick={() => navigate('explore')}>Explore</button>
            <button onClick={() => navigate('leaderboard')}>Leaderboard</button>
            <button onClick={() => navigate('ai')}>AI Quiz</button>
            <button onClick={() => navigate('login')}>Login</button>
          </nav>
        )}
      </header>

      {page === 'home' && (
        <>
          <main>
            <section className="hero">
              <div className="container hero-grid">
                <div className="hero-copy">
                  <div className="eyebrow"><Sparkles size={16} /> PROFESSIONAL QUIZ PLATFORM</div>
                  <h1>Challenge your mind.<br /><span>Own the leaderboard.</span></h1>
                  <p>
                    Quiz World is a modern quiz experience for practice, classroom assessments,
                    competitions, and AI-powered question generation.
                  </p>
                  <div className="hero-actions">
                    <button className="primary-btn" onClick={() => navigate('explore')}><Play size={18} fill="currentColor" /> Start Quiz</button>
                    <button className="secondary-btn" onClick={() => navigate('explore')}>Explore Quizzes <ArrowRight size={18} /></button>
                  </div>
                  <div className="trust-row">
                    <span><ShieldCheck size={16} /> Secure quiz rooms</span>
                    <span><Users size={16} /> Student-ready</span>
                    <span><Trophy size={16} /> Competitive rankings</span>
                  </div>
                </div>

                <div className="hero-visual">
                  <div className="glow glow-one" />
                  <div className="glow glow-two" />
                  <div className="quiz-card">
                    <div className="quiz-card-top">
                      <div>
                        <small>LIVE CHALLENGE</small>
                        <h3>AI Fundamentals</h3>
                      </div>
                      <div className="timer-pill"><Clock3 size={16} /> 08:42</div>
                    </div>
                    <div className="progress-line"><span /></div>
                    <p className="q-number">Question 8 of 20</p>
                    <h4>Which approach helps a model learn from labeled examples?</h4>
                    <div className="options">
                      <button>A <span>Supervised learning</span></button>
                      <button>B <span>Random search</span></button>
                      <button>C <span>Packet switching</span></button>
                      <button>D <span>File compression</span></button>
                    </div>
                    <div className="quiz-card-bottom">
                      <span>+10 points</span>
                      <span>Rank #12</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="stats-strip">
              <div className="container stats-grid">
                <div><strong>500+</strong><span>Practice Quizzes</span></div>
                <div><strong>25K+</strong><span>Questions</span></div>
                <div><strong>10K+</strong><span>Learners</span></div>
                <div><strong>95%</strong><span>Completion Rate</span></div>
              </div>
            </section>

            <section className="section">
              <div className="container">
                <div className="section-heading">
                  <div>
                    <span className="section-kicker">FEATURED</span>
                    <h2>Quizzes worth taking</h2>
                    <p>Curated experiences with timers, scoring, explanations, and rankings.</p>
                  </div>
                  <button className="text-btn" onClick={() => navigate('explore')}>View all <ChevronRight size={18} /></button>
                </div>
                <div className="featured-grid">
                  {featured.map((quiz) => (
                    <article className="featured-card" key={quiz.title}>
                      <div className="card-topline">
                        <span className="tag">{quiz.tag}</span>
                        <span className="level">{quiz.level}</span>
                      </div>
                      <h3>{quiz.title}</h3>
                      <p>{quiz.meta}</p>
                      <button onClick={() => navigate('explore')}>Start quiz <ArrowRight size={17} /></button>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="section section-muted">
              <div className="container">
                <div className="section-heading">
                  <div>
                    <span className="section-kicker">EXPLORE</span>
                    <h2>Find your category</h2>
                    <p>Separate, focused quiz journeys for every interest.</p>
                  </div>
                </div>
                <div className="category-grid">
                  {categories.map(({ title, count, icon: Icon }) => (
                    <button className="category-card" key={title} onClick={() => navigate('explore')}>
                      <span className="category-icon"><Icon size={20} /></span>
                      <span><strong>{title}</strong><small>{count}</small></span>
                      <ChevronRight size={18} />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="section">
              <div className="container challenge-banner">
                <div>
                  <span className="section-kicker">DAILY CHALLENGE</span>
                  <h2>One quiz. One streak. Every day.</h2>
                  <p>Build consistency, earn points, and climb the leaderboard.</p>
                </div>
                <button className="primary-btn" onClick={() => navigate('explore')}><Flame size={18} /> Take today's challenge</button>
              </div>
            </section>

            <section className="section section-muted">
              <div className="container ai-panel">
                <div>
                  <span className="section-kicker">AI QUIZ</span>
                  <h2>Turn any topic into a quiz.</h2>
                  <p>Generate targeted practice from a topic, study text, or uploaded material in the full V1 workflow.</p>
                  <button className="primary-btn" onClick={() => navigate('ai')}>Open AI Quiz <Sparkles size={18} /></button>
                </div>
                <div className="ai-orb"><Sparkles size={42} /></div>
              </div>
            </section>
          </main>

          <footer className="site-footer">
            <div className="container footer-grid">
              <div>
                <div className="footer-brand"><span className="brand-mark"><Brain size={19} /></span><strong>Quiz World</strong></div>
                <p>Professional quiz, practice, and competition experiences.</p>
              </div>
              <div><h4>Platform</h4><button onClick={() => navigate('explore')}>Explore</button><button onClick={() => navigate('leaderboard')}>Leaderboard</button><button onClick={() => navigate('ai')}>AI Quiz</button></div>
              <div><h4>Account</h4><button onClick={() => navigate('login')}>Login</button><button onClick={() => navigate('student')}>Student Dashboard</button></div>
              <div><h4>Support</h4><button>About Quiz World</button><button>Contact</button></div>
            </div>
          </footer>
        </>
      )}

      {page === 'student' && (
        <section className="page-section">
          <div className="container">
            <div className="page-title">
              <span className="section-kicker">STUDENT</span>
              <h1>Student Dashboard</h1>
              <p>Your quizzes, performance, achievements, and live quiz access — all in one place.</p>
            </div>

            <div className="dashboard-grid">
              <aside className="side-card">
                <div className="profile-mini"><div className="avatar">S</div><div><strong>Student</strong><small>Quiz World learner</small></div></div>
                <button className="side-link active">Dashboard</button>
                <button className="side-link" onClick={() => navigate('join')}>Join Quiz</button>
                <button className="side-link" onClick={() => navigate('explore')}>Explore Quizzes</button>
                <button className="side-link" onClick={() => navigate('leaderboard')}>Leaderboard</button>
                <button className="side-link">My Results</button>
                <button className="side-link">Achievements</button>
              </aside>

              <div className="dashboard-main">
                <div className="welcome-card">
                  <div><span className="section-kicker">WELCOME BACK</span><h2>Ready for your next challenge?</h2><p>Join a quiz instantly with a code shared by your faculty or host.</p></div>
                  <button className="primary-btn" onClick={() => navigate('join')}>Attend Quiz <ArrowRight size={18} /></button>
                </div>
                <div className="kpi-grid">
                  <div className="kpi"><small>Quizzes completed</small><strong>24</strong><span>+4 this month</span></div>
                  <div className="kpi"><small>Average score</small><strong>82%</strong><span>Above your target</span></div>
                  <div className="kpi"><small>Accuracy</small><strong>88%</strong><span>Keep improving</span></div>
                  <div className="kpi"><small>Current rank</small><strong>#18</strong><span>+7 positions</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === 'join' && (
        <section className="page-section">
          <div className="container narrow">
            <button className="back-btn" onClick={() => navigate('student')}>← Back to dashboard</button>
            <div className="join-card-large">
              <span className="join-icon"><Trophy size={26} /></span>
              <span className="section-kicker">ATTEND QUIZ</span>
              <h1>Join with a Quiz Code</h1>
              <p>Enter the code provided by your faculty, teacher, or quiz host.</p>
              <form onSubmit={joinQuiz} className="join-form">
                <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="e.g. QW7X9P" maxLength={12} aria-label="Quiz code" />
                <button className="primary-btn" type="submit">Join Quiz <ArrowRight size={18} /></button>
              </form>
              {joinMessage && <div className="join-message">{joinMessage}</div>}
              <div className="join-notes"><span>✓ Active codes only</span><span>✓ One secure quiz room</span><span>✓ Results recorded automatically</span></div>
            </div>
          </div>
        </section>
      )}

      {page === 'explore' && (
        <section className="page-section">
          <div className="container">
            <div className="page-title"><span className="section-kicker">EXPLORE</span><h1>Explore Quizzes</h1><p>Choose a category and start practicing.</p></div>
            <div className="featured-grid">
              {featured.concat(featured).map((quiz, i) => <article className="featured-card" key={i}><div className="card-topline"><span className="tag">{quiz.tag}</span><span className="level">{quiz.level}</span></div><h3>{quiz.title}</h3><p>{quiz.meta}</p><button onClick={() => navigate('join')}>Start quiz <ArrowRight size={17} /></button></article>)}
            </div>
          </div>
        </section>
      )}

      {page === 'leaderboard' && (
        <section className="page-section">
          <div className="container narrow">
            <div className="page-title"><span className="section-kicker">RANKINGS</span><h1>Leaderboard</h1><p>Compete on score, accuracy, and completion speed.</p></div>
            <div className="leaderboard-card">
              {['Aarav', 'Saanvi', 'Pavan', 'Meera', 'Riya'].map((name, i) => <div className="leader-row" key={name}><strong>#{i + 1}</strong><span className="rank-avatar">{name[0]}</span><span className="leader-name">{name}</span><b>{980 - i * 42} pts</b></div>)}
            </div>
          </div>
        </section>
      )}

      {page === 'ai' && (
        <section className="page-section">
          <div className="container narrow">
            <div className="page-title"><span className="section-kicker">AI POWERED</span><h1>AI Quiz</h1><p>Create personalized practice from a topic.</p></div>
            <div className="form-card">
              <label>Topic<input placeholder="e.g. Python Functions" /></label>
              <div className="form-two"><label>Difficulty<select><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><label>Questions<select><option>10</option><option>20</option><option>25</option></select></label></div>
              <button className="primary-btn" onClick={() => setJoinMessage('AI quiz generation UI is ready. Connect your AI service in the next build step.')}>Generate Quiz <Sparkles size={18} /></button>
              {joinMessage && <div className="join-message">{joinMessage}</div>}
            </div>
          </div>
        </section>
      )}

      {page === 'login' && (
        <section className="page-section">
          <div className="container narrow">
            <div className="login-card">
              <span className="brand-mark large"><Brain size={24} /></span>
              <span className="section-kicker">WELCOME TO QUIZ WORLD</span>
              <h1>Sign in to continue</h1>
              <p>Access your role-based dashboard and quiz activity.</p>
              <label>Email<input type="email" placeholder="you@example.com" /></label>
              <label>Password<input type="password" placeholder="••••••••" /></label>
              <button className="primary-btn full" onClick={() => navigate('student')}>Login <ArrowRight size={18} /></button>
              <button className="text-btn centered" onClick={() => navigate('student')}>Preview Student Dashboard</button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)