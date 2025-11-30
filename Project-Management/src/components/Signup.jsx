import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, GraduationCap, UserPlus, Mail, Lock } from 'lucide-react'

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    studentId: '',
    facultyId: '',
    department: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validation
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    

    if (!formData.studentId.trim() && !formData.facultyId.trim()) {
      newErrors.studentId = 'Student/Faculty ID is required'
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
  // role removed
  studentId: formData.studentId,
  facultyId: formData.facultyId,
        department: formData.department,
      }
      
      // Store user data (in a real app, this would be sent to a backend)
      localStorage.setItem('user', JSON.stringify(newUser))
      onSignup(newUser)
      setIsLoading(false)
    }, 1000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-avatar userplus">
          <UserPlus size={28} />
        </div>

        <div className="auth-header">
          <h1>Welcome</h1>
          <p>Sign up and be part of a collaborative, inclusive platform for all.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="role">I am a:</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${formData.role === 'student' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, role: 'student' })}
              >
                <Users size={20} /> Student
              </button>
              <button
                type="button"
                className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, role: 'admin' })}
              >
                <GraduationCap size={20} /> Admin
              </button>
            </div>
          </div>
          <div className="input-row">
            <div className="input-left user">
              <Users size={18} color="white" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className={`input-field ${errors.name ? 'error' : ''}`}
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
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
              placeholder="Email"
              className={`input-field ${errors.email ? 'error' : ''}`}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          {formData.role === 'student' && (
            <div className="input-row">
              <div className="input-left id">
                <Users size={18} color="white" />
              </div>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Student ID"
                className={`input-field ${errors.studentId ? 'error' : ''}`}
                required
              />
              {errors.studentId && <span className="error-message">{errors.studentId}</span>}
            </div>
          )}
          {formData.role === 'admin' && (
            <div className="input-row">
              <div className="input-left id faculty">
                <GraduationCap size={18} color="white" />
              </div>
              <input
                type="text"
                id="facultyId"
                name="facultyId"
                value={formData.facultyId}
                onChange={handleChange}
                placeholder="Faculty ID"
                className={`input-field ${errors.facultyId ? 'error' : ''}`}
                required
              />
              {errors.facultyId && <span className="error-message">{errors.facultyId}</span>}
            </div>
          )}
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
              placeholder="Create password"
              className={`input-field ${errors.password ? 'error' : ''}`}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="input-row">
            <div className="input-left lock">
              <Lock size={18} color="white" />
            </div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
              required
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="pill-btn" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <div className="auth-switch">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup