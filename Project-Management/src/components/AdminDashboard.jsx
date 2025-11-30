import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  LogOut,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { format } from 'date-fns'

const AdminDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    dueDate: '',
    maxStudents: 4
  })

  useEffect(() => {
    // Load mock projects data
    const mockProjects = [
      {
        id: 1,
        title: 'Web Development Project',
        description: 'Create a full-stack web application using React and Node.js',
        dueDate: '2024-02-15',
        maxStudents: 4,
        status: 'active',
        groups: [
          {
            id: 1,
            name: 'Team Alpha',
            students: ['satish', 'gopi', 'pranneth', 'shanu'],
            progress: 75,
            tasks: [
              { id: 1, title: 'Setup project structure', completed: true },
              { id: 2, title: 'Design UI components', completed: true },
              { id: 3, title: 'Implement backend API', completed: false },
              { id: 4, title: 'Testing and deployment', completed: false }
            ]
          },
          {
            id: 2,
            name: 'Team Beta',
            students: ['satish', 'gopi', 'pranneth', 'shanu'],
            progress: 45,
            tasks: [
              { id: 1, title: 'Setup project structure', completed: true },
              { id: 2, title: 'Design UI components', completed: false },
              { id: 3, title: 'Implement backend API', completed: false },
              { id: 4, title: 'Testing and deployment', completed: false }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Data Science Analysis',
        description: 'Analyze customer data and create predictive models',
        dueDate: '2024-02-20',
        maxStudents: 3,
        status: 'active',
        groups: [
          {
            id: 3,
            name: 'Data Team',
            students: ['satish', 'gopi', 'pranneth', 'shanu'],
            progress: 60,
            tasks: [
              { id: 1, title: 'Data collection and cleaning', completed: true },
              { id: 2, title: 'Exploratory data analysis', completed: true },
              { id: 3, title: 'Model development', completed: false },
              { id: 4, title: 'Results presentation', completed: false }
            ]
          }
        ]
      }
    ]
    setProjects(mockProjects)
  }, [])

  const handleCreateProject = (e) => {
    e.preventDefault()
    const project = {
      id: Date.now(),
      ...newProject,
      status: 'active',
      groups: [],
      createdAt: new Date().toISOString()
    }
    setProjects([...projects, project])
    setNewProject({ title: '', description: '', dueDate: '', maxStudents: 4 })
    setShowCreateModal(false)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="status-icon completed" />
      case 'active': return <Clock className="status-icon active" />
      default: return <AlertCircle className="status-icon pending" />
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981'
    if (progress >= 50) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="dashboard admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome Gopi</span>
            <button onClick={onLogout} className="logout-btn">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>{projects.reduce((acc, p) => acc + p.groups.length, 0)}</h3>
              <p>Assigned Groups</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <h3>{projects.length}</h3>
              <p>Total Projects</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <h3>{projects.length}</h3>
              <p>Assined Tasks To Students</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>
                {projects.reduce((acc, p) => 
                  acc + p.groups.filter(g => g.progress === 100).length, 0
                )}
              </h3>
              <p>Completed Projects By students</p>
            </div>
          </div>
        </div>

        <div className="projects-section">
          <div className="section-header">
            <h2>Projects</h2>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="create-btn"
            >
              <Plus size={20} />
              Create Project
            </button>
          </div>

          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  {getStatusIcon(project.status)}
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  <span>Due: {format(new Date(project.dueDate), 'MMM dd, yyyy')}</span>
                  <span>Max Students: {project.maxStudents}</span>
                </div>
                <div className="project-groups">
                  <h4>Groups ({project.groups.length})</h4>
                  {project.groups.map(group => (
                    <div key={group.id} className="group-item">
                      <div className="group-info">
                        <span className="group-name">{group.name}</span>
                        <span className="group-students">
                          {group.students.join(', ')}
                        </span>
                      </div>
                      <div className="group-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ 
                              width: `${group.progress}%`,
                              backgroundColor: getProgressColor(group.progress)
                            }}
                          />
                        </div>
                        <span className="progress-text">{group.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="project-actions">
                  <button 
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="action-btn view"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                  <button className="action-btn edit">
                    <Edit size={16} />
                    Edit
                  </button>
                  <button className="action-btn delete">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Create New Project</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="modal-form">
              <div className="form-group">
                <label htmlFor="title">Project Title</label>
                <input
                  type="text"
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxStudents">Max Students per Group</label>
                <input
                  type="number"
                  id="maxStudents"
                  value={newProject.maxStudents}
                  onChange={(e) => setNewProject({...newProject, maxStudents: parseInt(e.target.value)})}
                  min="2"
                  max="10"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard