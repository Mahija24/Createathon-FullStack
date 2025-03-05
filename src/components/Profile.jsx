"use client"

import { useState, useEffect } from "react"
import "../styles/Profile.css"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts"
import { authService } from "../services/api"

const Profile = ({ userData }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Get current user from local storage
    const user = authService.getCurrentUser()
    setCurrentUser(user)
  }, [])

  if (!userData) {
    return <div className="loading">Loading profile...</div>
  }

  // Helper function to get user initials
  const getUserInitials = () => {
    if (currentUser && currentUser.username) {
      return currentUser.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    }
    return userData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Progress chart data
  const challengeCompletionData = [
    { name: "Jan", completed: 5 },
    { name: "Feb", completed: 8 },
    { name: "Mar", completed: 12 },
    { name: "Apr", completed: 15 },
    { name: "May", completed: 18 },
    { name: "Jun", completed: 24 },
  ]

  const languageData = [
    { name: "JavaScript", value: 40 },
    { name: "Python", value: 30 },
    { name: "Java", value: 20 },
    { name: "Other", value: 10 },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"]

  const dailyActivityData = [
    { name: "Mon", activity: 3 },
    { name: "Tue", activity: 5 },
    { name: "Wed", activity: 2 },
    { name: "Thu", activity: 7 },
    { name: "Fri", activity: 4 },
    { name: "Sat", activity: 6 },
    { name: "Sun", activity: 8 },
  ]

  return (
    <div className="profile">
      <div className="profile-header">
        <div
          className="profile-cover"
          style={{ backgroundImage: `url(${userData.coverImage || "/placeholder.svg?height=200&width=1000"})` }}
        >
          
        </div>
        <div className="profile-info">
          <h1>{currentUser?.username || userData.name}</h1>
          <p className="profile-title">{userData.title}</p>
          <div className="profile-stats">
            <div className="stat">
              <div className="stat-value">{userData.stats.challenges}</div>
              <div className="stat-label">Challenges</div>
            </div>
            <div className="stat">
              <div className="stat-value">{userData.stats.points}</div>
              <div className="stat-label">Points</div>
            </div>
            <div className="stat">
              <div className="stat-value">{userData.stats.rank}</div>
              <div className="stat-label">Rank</div>
            </div>
            <div className="stat">
              <div className="stat-value">{userData.stats.streak}</div>
              <div className="stat-label">Streak</div>
            </div>
          </div>
          <div className="profile-badges">
            {userData.badges.map((badge, index) => (
              <div key={index} className="badge" title={badge.name}>
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-tooltip">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button className={`tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button
          className={`tab ${activeTab === "achievements" ? "active" : ""}`}
          onClick={() => setActiveTab("achievements")}
        >
          Achievements
        </button>
        <button
          className={`tab ${activeTab === "submissions" ? "active" : ""}`}
          onClick={() => setActiveTab("submissions")}
        >
          Submissions
        </button>
        <button className={`tab ${activeTab === "activity" ? "active" : ""}`} onClick={() => setActiveTab("activity")}>
          Activity
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "overview" && (
          <div className="overview">
            <div className="about-section">
              <h2>About</h2>
              <p>{userData.about || "No bio provided."}</p>

              <div className="user-details">
                <div className="detail">
                  <span className="detail-label">Member since:</span>
                  <span className="detail-value">{userData.memberSince}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{userData.location || "Not specified"}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Preferred languages:</span>
                  <div className="languages">
                    {userData.languages.map((lang, index) => (
                      <span key={index} className="language">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="recent-challenges">
              <h2>Recent Challenges</h2>
              {userData.recentChallenges.length > 0 ? (
                <div className="challenge-list">
                  {userData.recentChallenges.map((challenge, index) => (
                    <div key={index} className="challenge-item">
                      <div className="challenge-info">
                        <h3>{challenge.title}</h3>
                        <div className="challenge-meta">
                          <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>
                            {challenge.difficulty}
                          </span>
                          <span className="category">{challenge.category}</span>
                        </div>
                      </div>
                      <div className="challenge-result">
                        <span className={`status ${challenge.status.toLowerCase()}`}>{challenge.status}</span>
                        <span className="date">{challenge.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No recent challenges.</p>
              )}
            </div>

            <div className="stats-section">
              <h2>Statistics</h2>
              <div className="stats-grid">
                <div className="stats-card">
                  <h3>Challenge Completion</h3>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={challengeCompletionData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="stats-card">
                  <h3>Language Distribution</h3>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={languageData}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {languageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="stats-card">
                  <h3>Daily Activity</h3>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={dailyActivityData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="activity" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="achievements">
            <h2>Achievements</h2>
            <div className="achievement-grid">
              {userData.achievements.map((achievement, index) => (
                <div key={index} className={`achievement-card ${achievement.unlocked ? "unlocked" : "locked"}`}>
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                    {achievement.unlocked ? (
                      <span className="unlocked-date">Unlocked on {achievement.unlockedDate}</span>
                    ) : (
                      <div className="progress-info">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="submissions">
            <h2>Submissions</h2>
            <div className="filter-controls">
              <select className="filter-select">
                <option value="all">All Challenges</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
              <select className="filter-select">
                <option value="all">All Categories</option>
                <option value="algorithms">Algorithms</option>
                <option value="data-structures">Data Structures</option>
                <option value="databases">Databases</option>
              </select>
            </div>
            {userData.submissions && userData.submissions.length > 0 ? (
              <div className="submission-list">
                {userData.submissions.map((submission, index) => (
                  <div key={index} className={`submission-item ${submission.status.toLowerCase()}`}>
                    <div className="submission-header">
                      <h3>{submission.challengeTitle}</h3>
                      <span className={`status ${submission.status.toLowerCase()}`}>{submission.status}</span>
                    </div>
                    <div className="submission-meta">
                      <span className="date">{submission.date}</span>
                      <span className="language">{submission.language}</span>
                    </div>
                    <div className="submission-code">
                      <pre>{submission.code}</pre>
                    </div>
                    {submission.feedback && (
                      <div className="submission-feedback">
                        <h4>Feedback</h4>
                        <p>{submission.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No submissions yet.</p>
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="activity">
            <h2>Activity</h2>
            <div className="activity-timeline">
              {userData.activity && userData.activity.length > 0 ? (
                userData.activity.map((item, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-date">{item.date}</div>
                    <div className="activity-content">
                      <div className="activity-icon">{item.icon}</div>
                      <div className="activity-details">
                        <div className="activity-title">{item.title}</div>
                        <div className="activity-description">{item.description}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No activity yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile

