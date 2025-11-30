import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import AdminDashboard from './components/AdminDashboard'
import StudentDashboard from './components/StudentDashboard'
import ProjectDetails from './components/ProjectDetails'
import Home from './components/Home'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleSignup = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }


  return (
    <Router basename="/oddsemproject/">
      <div className="app">
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? 
                <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace /> : 
                <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              user ? 
                <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace /> : 
                <Signup onSignup={handleSignup} />
            } 
          />
          <Route 
            path="/admin" 
            element={
              user && user.role === 'admin' ? 
                <AdminDashboard user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/student" 
            element={
              user && user.role === 'student' ? 
                <StudentDashboard user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/project/:id" 
            element={
              user ? 
                <ProjectDetails user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
              ) : (
                <Home />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App