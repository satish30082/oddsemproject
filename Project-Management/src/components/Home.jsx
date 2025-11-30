import { Link } from 'react-router-dom'
import { GraduationCap, LogIn, UserPlus, LayoutList, CheckCircle2, FileText } from 'lucide-react'

const Home = () => {
  return (
    <div className="home">
      <header className="home-nav">
        <div className="home-nav__inner">
          <div className="brand">
            <div className="brand-icon">
              <GraduationCap size={20} />
            </div>
            <span>PROJECT MANEGER</span>
          </div>
          <nav className="nav-links">
            <Link to="/" className="nav-link">
              <GraduationCap size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Home
            </Link>
            <Link to="/login" className="nav-link">
              <LogIn size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Sign In
            </Link>
            <Link to="/signup" className="cta">
              <UserPlus size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Create Account
            </Link>
          </nav>
        </div>
      </header>

      <main className="home-main">
        <section className="hero">
          <div className="hero-text">
            <h1>Welcome</h1>
            <p>
              Collaborate, plan, and achieve together. This platform is for everyone—students, teachers, and teams.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn primary">
                Get Started
              </Link>
              <Link to="/login" className="btn">
                View Projects
              </Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-card">
              <span className="dot dot--green" />
              <span className="line" />
              <span className="line" />
              <span className="dot dot--yellow" />
            </div>
          </div>
        </section>

        <section className="faculty-cta">
          <div className="faculty-cta__inner">
            <h2>For Faculty — Manage, Mentor, Measure</h2>
            <p>Invite your classes, set projects, and supervise group progress with easy-to-use tools built for teaching.</p>
            <div className="faculty-actions">
              <Link to="/signup?role=admin" className="btn primary">Join as Faculty</Link>
              <Link to="/login" className="btn">Sign In</Link>
            </div>
          </div>
        </section>

        {/* Features section removed as requested */}
      </main>

      <footer className="home-footer">
        <div className="home-footer__inner">
          <span>GROUP PROJECT MANEGER</span>
        </div>
      </footer>
    </div>
  )
}

export default Home