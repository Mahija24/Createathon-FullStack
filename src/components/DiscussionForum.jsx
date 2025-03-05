"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Leaderboard.css"

const Leaderboard = ({ leaderboardData }) => {
  const [timeframe, setTimeframe] = useState("all-time")
  const [category, setCategory] = useState("all")

  if (!leaderboardData) {
    return <div className="loading">Loading leaderboard...</div>
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
        <div className="leaderboard-filters">
          <div className="filter-group">
            <label htmlFor="timeframe">Timeframe:</label>
            <select
              id="timeframe"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="filter-select"
            >
              <option value="all-time">All Time</option>
              <option value="this-month">This Month</option>
              <option value="this-week">This Week</option>
              <option value="today">Today</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="algorithms">Algorithms</option>
              <option value="data-structures">Data Structures</option>
              <option value="databases">Databases</option>
            </select>
          </div>
        </div>
      </div>

      <div className="top-performers">
        <div className="top-three">
          {leaderboardData.topThree.map((user, index) => (
            <div key={user.id} className={`top-user rank-${index + 1}`}>
              <div className="rank">{index + 1}</div>
              <div className="user-avatar">
                <img src={user.avatar || "/placeholder.svg?height=80&width=80"} alt={user.name} />
              </div>
              <div className="user-info">
                <Link to={`/profile/${user.id}`} className="user-name">
                  {user.name}
                </Link>
                <div className="user-points">{user.points} points</div>
                <div className="user-badges">
                  {user.badges.map((badge, badgeIndex) => (
                    <span key={badgeIndex} className="badge" title={badge.name}>
                      {badge.icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Challenges</th>
              <th>Points</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.users.map((user) => (
              <tr key={user.id} className={user.isCurrentUser ? "current-user" : ""}>
                <td className="rank-cell">{user.rank}</td>
                <td className="user-cell">
                  <div className="user-avatar-small">
                    <img src={user.avatar || "/placeholder.svg?height=40&width=40"} alt={user.name} />
                  </div>
                  <div className="user-info-small">
                    <Link to={`/profile/${user.id}`} className="user-name">
                      {user.name}
                    </Link>
                    <div className="user-title">{user.title}</div>
                  </div>
                </td>
                <td className="challenges-cell">{user.challenges}</td>
                <td className="points-cell">{user.points}</td>
                <td className="streak-cell">{user.streak} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="pagination-button">Previous</button>
        <div className="pagination-pages">
          <button className="pagination-page active">1</button>
          <button className="pagination-page">2</button>
          <button className="pagination-page">3</button>
          <span className="pagination-ellipsis">...</span>
          <button className="pagination-page">10</button>
        </div>
        <button className="pagination-button">Next</button>
      </div>
    </div>
  )
}

export default Leaderboard

