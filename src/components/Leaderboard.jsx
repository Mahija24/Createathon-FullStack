"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Trophy, Medal, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import "../styles/Leaderboard.css"

const Leaderboard = ({ leaderboardData }) => {
  const [timeframe, setTimeframe] = useState("all-time")
  const [category, setCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  if (!leaderboardData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading leaderboard...</p>
      </div>
    )
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    // In a real app, you would check if there are more pages
    setCurrentPage(currentPage + 1)
  }

  // Get medal color based on rank
  const getMedalColor = (rank) => {
    switch (rank) {
      case 1:
        return "#FFD700" // Gold
      case 2:
        return "#C0C0C0" // Silver
      case 3:
        return "#CD7F32" // Bronze
      default:
        return "#6b7280" // Gray
    }
  }

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
        <div className="leaderboard-filters">
          <div className="filter-group">
            <Filter size={16} />
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
              <div className="rank">
                <Trophy size={16} color={getMedalColor(index + 1)} />
              </div>
              <div className="user-avatar">
                <div className="avatar-content">{getInitials(user.name)}</div>
              </div>
              <div className="user-info">
                <Link to={`/profile/${user.id}`} className="user-name">
                  {user.name}
                </Link>
                <div className="user-points">{user.points.toLocaleString()} points</div>
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
                <td className="rank-cell">
                  <div className="rank-badge">
                    {user.rank <= 3 ? <Medal size={16} color={getMedalColor(user.rank)} /> : user.rank}
                  </div>
                </td>
                <td className="user-cell">
                  <div className="user-avatar-small">
                    <div className="avatar-content-small">{getInitials(user.name)}</div>
                  </div>
                  <div className="user-info-small">
                    <Link to={`/profile/${user.id}`} className="user-name">
                      {user.name}
                    </Link>
                    <div className="user-title">{user.title}</div>
                  </div>
                </td>
                <td className="challenges-cell">{user.challenges}</td>
                <td className="points-cell">{user.points.toLocaleString()}</td>
                <td className="streak-cell">{user.streak} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>
          <ChevronLeft size={16} />
          Previous
        </button>
        <div className="pagination-pages">
          <button className={`pagination-page ${currentPage === 1 ? "active" : ""}`} onClick={() => setCurrentPage(1)}>
            1
          </button>
          <button className={`pagination-page ${currentPage === 2 ? "active" : ""}`} onClick={() => setCurrentPage(2)}>
            2
          </button>
          <button className={`pagination-page ${currentPage === 3 ? "active" : ""}`} onClick={() => setCurrentPage(3)}>
            3
          </button>
          <span className="pagination-ellipsis">...</span>
          <button className="pagination-page" onClick={() => setCurrentPage(10)}>
            10
          </button>
        </div>
        <button className="pagination-button" onClick={handleNextPage}>
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default Leaderboard

