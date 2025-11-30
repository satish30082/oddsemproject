import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  LogOut,
  Eye,
  MessageSquare,
  FileText
} from 'lucide-react'
import { format } from 'date-fns'

const StudentDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [myGroups, setMyGroups] = useState([])

  useEffect(() => {
    // Load mock data for student
    const mockProjects = [
      {
        id: 1,
        title: 'Web Development Project',
        description: 'Create a full-stack web application using React and Node.js',
        dueDate: '2024-02-15',
        status: 'active',
        myGroup: {
          id: 1,
          name: 'Team Alpha',
          students: ['satish', 'gopi', 'pranneth', 'shanu'],
          progress: 75,
          tasks: [
            { 
              id: 1, 
              title: 'Setup project structure', 
              completed: true, 
              assignedTo: 'satish',
              dueDate: '2024-01-20'
            },
            { 
              id: 2, 
              title: 'Design UI components', 
              completed: true, 
              assignedTo: 'gopi',
              dueDate: '2024-01-25'
            },
            { 
              id: 3, 
              title: 'Implement backend API', 
              completed: false, 
              assignedTo: 'pranneth',
              dueDate: '2024-02-05'
            },
            { 
              id: 4, 
              title: 'Testing and deployment', 
              completed: false, 
              assignedTo: 'shanu',
              dueDate: '2024-02-10'
            }
          ],
          messages: [
            {
              id: 1,
              sender: 'gopi',
              message: 'I\'ve completed the UI design. Please review it.',
              timestamp: '2024-01-25T10:30:00Z'
            },
            {
              id: 2,
              sender: 'pranneth',
              message: 'Working on the API endpoints. Should be done by tomorrow.',
              timestamp: '2024-01-26T14:15:00Z'
            }
          ]
        }
      },
      {
        id: 2,
        title: 'Data Science Analysis',
        description: 'Analyze customer data and create predictive models',
        dueDate: '2024-02-20',
        status: 'active',
        myGroup: {
          id: 2,
          name: 'Data Team',
          students: ['satish', 'gopi', 'pranneth', 'shanu'],
          progress: 60,
          tasks: [
            { 
              id: 1, 
              title: 'Data collection and cleaning', 
              completed: true, 
              assignedTo: 'gopi',
              dueDate: '2024-01-18'
            },
            { 
              id: 2, 
              title: 'Exploratory data analysis', 
              completed: true, 
              assignedTo: 'pranneth',
              dueDate: '2024-01-22'
            },
            { 
              id: 3, 
              title: 'Model development', 
              completed: false, 
              assignedTo: 'satish',
              dueDate: '2024-02-08'
            },
            { 
              id: 4, 
              title: 'Results presentation', 
              completed: false, 
              assignedTo: 'shanu',
              dueDate: '2024-02-15'
            }
          ],
          messages: [
            {
              id: 1,
              sender: 'pranneth',
              message: 'The EDA is complete. Found some interesting patterns in the data.',
              timestamp: '2024-01-22T16:45:00Z'
            }
          ]
        }
      }
    ]
    setProjects(mockProjects)
    setMyGroups(mockProjects.filter(p => p.myGroup))
  }, [])

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

  // FIX: Safely handle undefined group or tasks
  const getMyTasks = (group) => {
    return (group?.tasks || []).filter(task => task.assignedTo === user.name)
  }

  const getOverdueTasks = (group) => {
    const today = new Date()
    return (group?.tasks || []).filter(task => 
      !task.completed && new Date(task.dueDate) < today
    )
  }

  return (
    <div className="dashboard student-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
          <div className="user-info">
            <span>Welcome, satish</span>
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
              <h3>{myGroups.length}</h3>
              <p>Active Groups</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>
                {myGroups.reduce((acc, group) => 
                  acc + getMyTasks(group).filter(task => task.completed).length, 0
                )}
              </h3>
              <p>Completed Tasks</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <AlertCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>
                {myGroups.reduce((acc, group) => 
                  acc + getOverdueTasks(group).length, 0
                )}
              </h3>
              <p>Overdue Tasks</p>
            </div>
          </div>
        </div>

        <div className="projects-section">
          <h2>My Projects</h2>
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
                </div>
                
                {project.myGroup && (
                  <div className="my-group">
                    <h4>My Group: {project.myGroup.name}</h4>
                    <div className="group-members">
                      <strong>Members:</strong> {project.myGroup.students.join(', ')}
                    </div>
                    <div className="group-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${project.myGroup.progress}%`,
                            backgroundColor: getProgressColor(project.myGroup.progress)
                          }}
                        />
                      </div>
                      <span className="progress-text">{project.myGroup.progress}% Complete</span>
                    </div>
                    
                    <div className="my-tasks">
                      <h5>My Tasks</h5>
                      {getMyTasks(project.myGroup).map(task => (
                        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                          <div className="task-info">
                            <span className="task-title">{task.title}</span>
                            <span className="task-due">Due: {format(new Date(task.dueDate), 'MMM dd')}</span>
                          </div>
                          <div className="task-status">
                            {task.completed ? (
                              <CheckCircle size={16} className="task-icon completed" />
                            ) : (
                              <Clock size={16} className="task-icon pending" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="project-actions">
                  <button 
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="action-btn view"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                  {project.myGroup && (
                    <>
                      <button className="action-btn message">
                        <MessageSquare size={16} />
                        Messages ({project.myGroup.messages.length})
                      </button>
                      <button className="action-btn submit">
                        <FileText size={16} />
                        Submit Work
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default StudentDashboard