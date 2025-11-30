import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  LogOut,
  MessageSquare,
  FileText,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'
import { format } from 'date-fns'

const ProjectDetails = ({ user, onLogout }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // Load project details
    const mockProject = {
      id: parseInt(id),
      title: 'Web Development Project',
      description: 'Create a full-stack web application using React and Node.js. Students will work in groups to build a complete web application with frontend and backend components.',
      dueDate: '2024-02-15',
      maxStudents: 4,
      status: 'active',
      createdAt: '2024-01-10',
      groups: [
        {
          id: 1,
          name: 'Team Alpha',
              students: ['satish', 'gopi',],
          progress: 75,
          tasks: [
            { 
              id: 1, 
              title: 'Setup project structure', 
              completed: true, 
              assignedTo: 'satish',
              dueDate: '2024-01-20',
              description: 'Initialize the project with proper folder structure and dependencies'
            },
            { 
              id: 2, 
              title: 'Design UI components', 
              completed: true, 
              assignedTo: 'gopi',
              dueDate: '2024-01-25',
              description: 'Create reusable UI components for the application'
            },
            { 
              id: 3, 
              title: 'Implement backend API', 
              completed: false, 
              assignedTo: 'praneeth',
              dueDate: '2024-02-05',
              description: 'Develop REST API endpoints for data management'
            },
            { 
              id: 4, 
              title: 'Testing and deployment', 
              completed: false, 
              assignedTo: 'shanu',
              dueDate: '2024-02-10',
              description: 'Write tests and deploy the application'
            }
          ],
          messages: [
            {
              id: 1,
              sender: 'satish',
              message: 'I\'ve completed the UI design. Please review it.',
              timestamp: '2024-01-25T10:30:00Z'
            },
            {
              id: 2,
              sender: 'gopi',
              message: 'Working on the API endpoints. Should be done by tomorrow.',
              timestamp: '2024-01-26T14:15:00Z'
            },
            {
              id: 3,
                  sender: 'shanu',
              message: 'Great work everyone! Let\'s keep up the momentum.',
              timestamp: '2024-01-26T16:20:00Z'
            }
          ],
          submissions: [
            {
              id: 1,
              title: 'UI Design Mockups',
              submittedBy: 'satish',
              submittedAt: '2024-01-25T10:30:00Z',
              files: ['mockup1.png', 'mockup2.png'],
              status: 'submitted'
            },
            {
              id: 2,
              title: 'API Implementation',
              submittedBy: 'gopi',
              submittedAt: '2024-01-26T14:15:00Z',
              files: ['api.js'],
              status: 'submitted'
            },
            {
              id: 3,
              title: 'Testing Report',
              submittedBy: 'shanu',
              submittedAt: '2024-01-27T09:00:00Z',
              files: ['test-report.pdf'],
              status: 'submitted'
            },
            {
              id: 4,
              title: 'Deployment Guide',
              submittedBy: 'praneeth',
              submittedAt: '2024-01-28T11:30:00Z',
              files: ['deploy.md'],
              status: 'submitted'
            }
          ]
        },
        {
          id: 2,
          name: 'Team Beta',
          students: ['shanu', 'praneeth'],
          progress: 45,
          tasks: [
            { 
              id: 1, 
              title: 'Setup project structure', 
              completed: true, 
              assignedTo: 'satish',
              dueDate: '2024-01-20',
              description: 'Initialize the project with proper folder structure and dependencies'
            },
            { 
              id: 2, 
              title: 'Design UI components', 
              completed: false, 
              assignedTo: 'gopi',
              dueDate: '2024-01-25',
              description: 'Create reusable UI components for the application'
            },
            { 
              id: 3, 
              title: 'Implement backend API', 
              completed: false, 
              assignedTo: 'shanu',
              dueDate: '2024-02-05',
              description: 'Develop REST API endpoints for data management'
            },
            { 
              id: 4, 
              title: 'Testing and deployment', 
              completed: false, 
              assignedTo: 'praneeth',
              dueDate: '2024-02-10',
              description: 'Write tests and deploy the application'
            }
          ],
          messages: [
            {
              id: 1,
              sender: 'satish',
              message: 'Let’s catch up on the UI design. Gopi, how is it going?',
              timestamp: '2024-01-26T09:15:00Z'
            }
          ],
          submissions: []
        }
      ]
    }
    setProject(mockProject)
  }, [id])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: user.name,
        message: newMessage,
        timestamp: new Date().toISOString()
      }
      
      // Find the user's group and add message
      const updatedProject = { ...project }
      const userGroup = updatedProject.groups.find(group => 
        group.students.includes(user.name)
      )
      
      if (userGroup) {
        userGroup.messages.push(message)
        setProject(updatedProject)
        setNewMessage('')
        setShowMessageModal(false)
      }
    }
  }

  const toggleTaskCompletion = (groupId, taskId) => {
    const updatedProject = { ...project }
    const group = updatedProject.groups.find(g => g.id === groupId)
    const task = group.tasks.find(t => t.id === taskId)
    
    if (task && task.assignedTo === user.name) {
      task.completed = !task.completed
      
      // Recalculate progress
      const completedTasks = group.tasks.filter(t => t.completed).length
      group.progress = Math.round((completedTasks / group.tasks.length) * 100)
      
      setProject(updatedProject)
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981'
    if (progress >= 50) return '#f59e0b'
    return '#ef4444'
  }

  const getUserGroup = () => {
    return project?.groups.find(group => group.students.includes(user.name))
  }

  if (!project) {
    return <div className="loading">Loading project details...</div>
  }

  const userGroup = getUserGroup()
  const isAdmin = user.role === 'admin'

  return (
    <div className="project-details">
      <header className="project-header">
        <div className="header-content">
          <button 
            onClick={() => navigate(isAdmin ? '/admin' : '/student')}
            className="back-btn"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </button>
          <div className="project-title">
            <h1>{project.title}</h1>
            <div className="project-meta">
              <span>Due: {format(new Date(project.dueDate), 'MMM dd, yyyy')}</span>
              <span>Max Students: {project.maxStudents}</span>
            </div>
          </div>
          <div className="user-info">
            <span>{user.name}</span>
            <button onClick={onLogout} className="logout-btn">
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="project-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button 
          className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
        <button 
          className={`tab ${activeTab === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          Submissions
        </button>
      </div>

      <main className="project-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="project-description">
              <h3>Project Description</h3>
              <p>{project.description}</p>
            </div>
            
            <div className="groups-overview">
              <h3>Groups ({project.groups.length})</h3>
              <div className="groups-grid">
                {project.groups.map(group => (
                  <div key={group.id} className="group-card">
                    <div className="group-header">
                      <h4>{group.name}</h4>
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
                    <div className="group-members">
                      <strong>Members:</strong> {group.students.join(', ')}
                    </div>
                    <div className="group-stats">
                      <span>Tasks: {group.tasks.length}</span>
                      <span>Completed: {group.tasks.filter(t => t.completed).length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="tasks-tab">
            {isAdmin ? (
              <div className="admin-tasks">
                <h3>All Groups Tasks</h3>
                {project.groups.map(group => (
                  <div key={group.id} className="group-tasks">
                    <h4>{group.name}</h4>
                    <div className="tasks-list">
                      {group.tasks.map(task => (
                        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                          <div className="task-info">
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                            <div className="task-meta">
                              <span>Assigned to: {task.assignedTo}</span>
                              <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                            </div>
                          </div>
                          <div className="task-status">
                            {task.completed ? (
                              <CheckCircle size={20} className="task-icon completed" />
                            ) : (
                              <Clock size={20} className="task-icon pending" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="student-tasks">
                {userGroup ? (
                  <>
                    <h3>My Tasks in {userGroup.name}</h3>
                    <div className="tasks-list">
                      {userGroup.tasks.map(task => (
                        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                          <div className="task-info">
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                            <div className="task-meta">
                              <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                            </div>
                          </div>
                          <div className="task-actions">
                            {task.assignedTo === user.name && (
                              <button 
                                onClick={() => toggleTaskCompletion(userGroup.id, task.id)}
                                className={`task-toggle ${task.completed ? 'completed' : 'pending'}`}
                              >
                                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                              </button>
                            )}
                            <div className="task-status">
                              {task.completed ? (
                                <CheckCircle size={20} className="task-icon completed" />
                              ) : (
                                <Clock size={20} className="task-icon pending" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="no-group">
                    <p>You are not assigned to any group for this project.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="messages-tab">
            {userGroup ? (
              <>
                <div className="messages-header">
                  <h3>Group Messages - {userGroup.name}</h3>
                  <button 
                    onClick={() => setShowMessageModal(true)}
                    className="send-message-btn"
                  >
                    <MessageSquare size={16} />
                    Send Message
                  </button>
                </div>
                <div className="messages-list">
                  {userGroup.messages.map(message => (
                    <div key={message.id} className="message-item">
                      <div className="message-header">
                        <span className="message-sender">{message.sender}</span>
                        <span className="message-time">
                          {format(new Date(message.timestamp), 'MMM dd, yyyy HH:mm')}
                        </span>
                      </div>
                      <div className="message-content">{message.message}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-group">
                <p>You are not assigned to any group for this project.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="submissions-tab">
            {userGroup ? (
              <>
                <div className="submissions-header">
                  <h3>Submissions - {userGroup.name}</h3>
                  <button className="submit-work-btn">
                    <FileText size={16} />
                    Submit Work
                  </button>
                </div>
                <div className="submissions-list">
                  {userGroup.submissions.length > 0 ? (
                    userGroup.submissions.map(submission => (
                      <div key={submission.id} className="submission-item">
                        <div className="submission-header">
                          <h5>{submission.title}</h5>
                          <span className="submission-status">{submission.status}</span>
                        </div>
                        <div className="submission-meta">
                          <span>Submitted by: {submission.submittedBy}</span>
                          <span>Date: {format(new Date(submission.submittedAt), 'MMM dd, yyyy HH:mm')}</span>
                        </div>
                        <div className="submission-files">
                          <strong>Files:</strong> {submission.files.join(', ')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-submissions">
                      <p>No submissions yet.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="no-group">
                <p>You are not assigned to any group for this project.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {showMessageModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Send Message</h3>
              <button 
                onClick={() => setShowMessageModal(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSendMessage} className="modal-form">
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows="4"
                  placeholder="Type your message here..."
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowMessageModal(false)}>
                  Cancel
                </button>
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetails