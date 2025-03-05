"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Dashboard.css"

const Dashboard = ({ userData }) => {
  const [activeTab, setActiveTab] = useState("overview")

  if (!userData) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {userData.name}!</h1>
        <p className="last-login">Last login: {userData.lastLogin}</p>
      </div>

      <div className="dashboard-tabs">
        <button className={`tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button
          className={`tab ${activeTab === "challenges" ? "active" : ""}`}
          onClick={() => setActiveTab("challenges")}
        >
          My Challenges
        </button>
        <button
          className={`tab ${activeTab === "achievements" ? "active" : ""}`}
          onClick={() => setActiveTab("achievements")}
        >
          Achievements
        </button>
        <button className={`tab ${activeTab === "stats" ? "active" : ""}`} onClick={() => setActiveTab("stats")}>
          Statistics
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "overview" && (
          <div className="overview">
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Completed</h3>
                <div className="stat-value">{userData.stats.completed}</div>
                <div className="stat-label">challenges</div>
              </div>
              <div className="stat-card">
                <h3>Current Streak</h3>
                <div className="stat-value">{userData.stats.streak}</div>
                <div className="stat-label">days</div>
              </div>
              <div className="stat-card">
                <h3>Total Points</h3>
                <div className="stat-value">{userData.stats.points}</div>
                <div className="stat-label">points</div>
              </div>
              <div className="stat-card">
                <h3>Rank</h3>
                <div className="stat-value">#{userData.stats.rank}</div>
                <div className="stat-label">global</div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {userData.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-details">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="recommended-challenges">
              <h2>Recommended Challenges</h2>
              <div className="challenge-cards">
                {userData.recommendedChallenges.map((challenge, index) => (
                  <Link to={`/challenges/${challenge.id}`} key={index} className="challenge-card">
                    <div className="challenge-card-header">
                      <h3>{challenge.title}</h3>
                      <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
                    </div>
                    <p>{challenge.description}</p>
                    <div className="challenge-card-footer">
                      <span className="category">{challenge.category}</span>
                      <span className="points">{challenge.points} points</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "challenges" && (
          <div className="my-challenges">
            <div className="challenges-filter">
              <select className="filter-select">
                <option value="all">All Challenges</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>
              <select className="filter-select">
                <option value="all">All Categories</option>
                <option value="algorithms">Algorithms</option>
                <option value="data-structures">Data Structures</option>
                <option value="databases">Databases</option>
              </select>
            </div>

            <div className="challenge-list">
              {userData.challenges.map((challenge, index) => (
                <Link to={`/challenges/${challenge.id}`} key={index} className="challenge-list-item">
                  <div className="challenge-info">
                    <h3>{challenge.title}</h3>
                    <div className="challenge-meta">
                      <span className={`status ${challenge.status.toLowerCase()}`}>{challenge.status}</span>
                      <span className="category">{challenge.category}</span>
                    </div>
                  </div>
                  <div className="challenge-progress">
                    {challenge.status === "Completed" ? (
                      <div className="completion-info">
                        <span className="completion-date">Completed on {challenge.completedDate}</span>
                        <span className="score">
                          {challenge.score}/{challenge.maxScore}
                        </span>
                      </div>
                    ) : (
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(challenge.progress / 100) * 100}%` }}></div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="achievements">
            <h2>Your Achievements</h2>
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

        {activeTab === "stats" && (
          <div className="statistics">
            <h2>Your Statistics</h2>
            <div className="stats-grid">
              <div className="stats-card">
                <h3>Challenge Completion</h3>
                <div className="chart-placeholder">
                  {/* In a real app, you would use a chart library here */}
                  <div className="placeholder-text">Challenge Completion Chart</div>
                </div>
              </div>
              <div className="stats-card">
                <h3>Language Distribution</h3>
                <div className="chart-placeholder">
                  <div className="placeholder-text">Language Distribution Chart</div>
                </div>
              </div>
              <div className="stats-card">
                <h3>Daily Activity</h3>
                <div className="chart-placeholder">
                  <div className="placeholder-text">Daily Activity Chart</div>
                </div>
              </div>
              <div className="stats-card">
                <h3>Performance by Category</h3>
                <div className="chart-placeholder">
                  <div className="placeholder-text">Category Performance Chart</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

