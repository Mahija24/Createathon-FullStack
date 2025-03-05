"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Code, Menu, X, User, LogIn, Moon, Sun, ChevronDown, Settings, LogOut } from "lucide-react"
import "../styles/Navbar.css"

const Navbar = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check for dark mode preference
    const darkModePreference = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(darkModePreference)
    if (darkModePreference) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    // Close the user menu
    setIsUserMenuOpen(false)

    // Redirect to home page
    navigate("/")

    // Reload the page to reset the app state
    window.location.reload()
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  // Get initials from user name
  const getUserInitials = () => {
    if (!currentUser || !currentUser.username) return "U"

    return currentUser.username
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <Code className="logo-icon" size={24} />
          <span className="logo-text">EduNexus</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className={`navbar-item ${isActive("/")}`} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/challenges"
            className={`navbar-item ${isActive("/challenges")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Challenges
          </Link>
          <Link
            to="/leaderboard"
            className={`navbar-item ${isActive("/leaderboard")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Leaderboard
          </Link>
          {currentUser && (
            <Link
              to={`/profile/${currentUser.id}`}
              className={`navbar-item ${isActive(`/profile/${currentUser.id}`)}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {currentUser ? (
            <div className="user-menu-container">
              <button className="user-menu-button" onClick={toggleUserMenu} aria-label="Open user menu">
                <div className="user-avatar">
                  <span className="user-initials">{getUserInitials()}</span>
                </div>
                <span className="user-name">{currentUser.username}</span>
                <ChevronDown size={16} />
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <Link
                    to={`/profile/${currentUser.id}`}
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="login-button">
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
          )}

          <button className="menu-toggle" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

