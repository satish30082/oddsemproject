import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Mail, Lock, RefreshCw } from 'lucide-react'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [captcha, setCaptcha] = useState(null)
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaError, setCaptchaError] = useState('')

  // Generate a random alphabet CAPTCHA
  const generateCaptcha = () => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const captchaText = Array(6)
      .fill(0)
      .map(() => alphabets.charAt(Math.floor(Math.random() * alphabets.length)))
      .join('')
    setCaptcha({ text: captchaText })
    setCaptchaAnswer('')
    setCaptchaError('')
  }

  // Generate captcha when component mounts
  useEffect(() => {
    generateCaptcha()
  }, [])

  // Show captcha when both email and password are entered
  useEffect(() => {
    if (formData.email.trim() && formData.password.trim()) {
      setShowCaptcha(true)
    } else {
      setShowCaptcha(false)
    }
  }, [formData.email, formData.password])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check CAPTCHA if shown
    if (showCaptcha) {
      if (!captchaAnswer.trim()) {
        setCaptchaError('Please enter the CAPTCHA text')
        return
      }
      if (captchaAnswer.toUpperCase() !== captcha.text) {
        setCaptchaError('Incorrect CAPTCHA. Please try again.')
        generateCaptcha()
        return
      }
    }

    // Hardcoded credentials for demo
    if (formData.email === 'hi14@email.com' && formData.password === '123') {
      onLogin({ id: 1, name: 'Arepalli Gopi', email: 'gopi14@email.com', role: 'admin' })
    } else if (formData.email === 'satish44@gmail.com' && formData.password === '12@') {
      onLogin({ id: 2, name: 'satish', email: 'satish44@gmail.com', role: 'student' })
    } else {
      alert('Invalid credentials. Please use the provided demo accounts.')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-avatar">
          <GraduationCap size={28} />
        </div>

        <div className="auth-header">
          <h1>Welcome</h1>
          <p>Sign in to join the community and manage group projects together.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-row">
            <div className="input-left mail">
              <Mail size={18} color="white" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Email"
              required
            />
          </div>

          <div className="input-row">
            <div className="input-left lock">
              <Lock size={18} color="white" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Password"
              required
            />
          </div>

          {showCaptcha && captcha && (
            <div className="captcha-container">
              <div className="captcha-text-display">
                {captcha.text}
              </div>
              <div className="captcha-instruction">
                <p>Enter the letters above:</p>
              </div>
              <div className="input-row">
                <input
                  type="text"
                  value={captchaAnswer}
                  onChange={(e) => {
                    setCaptchaAnswer(e.target.value)
                    setCaptchaError('')
                  }}
                  className="input-field captcha-input"
                  placeholder="Type the letters"
                  required
                />
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="captcha-refresh"
                title="Refresh CAPTCHA"
              >
                <RefreshCw size={16} />
              </button>
              {captchaError && <span className="captcha-error">{captchaError}</span>}
            </div>
          )}

          <button type="submit" className="pill-btn">
            Sign In
          </button>
        </form>

        <div className="demo-credentials-info">
          <p><strong>Demo Credentials:</strong></p>
          <div className="credential-item">
            <span className="credential-label">Admin:</span>
            <span className="credential-value">hi14@email.com / 123</span>
          </div>
          <div className="credential-item">
            <span className="credential-label">Student:</span>
            <span className="credential-value">satish44@gmail.com / 12@</span>
          </div>
        </div>

        <div className="auth-switch">
          <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login