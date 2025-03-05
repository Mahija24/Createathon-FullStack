"use client"

import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Code } from "lucide-react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import ChallengesPage from "./pages/Challenges"
import LeaderboardPage from "./pages/LeaderboardPage"
import ProfilePage from "./pages/ProfilePage"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import TelegramBot from "./components/TelegramBot"
import { authService } from "./services/api"
import "./styles/App.css"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [showTelegramBot, setShowTelegramBot] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error("Auth check error:", err)
        setError("Failed to authenticate user")
      } finally {
        // Simulate loading time for demonstration
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    }

    checkAuth()
  }, [])

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/signin" replace />
    }
    return children
  }

  const toggleTelegramBot = () => {
    setShowTelegramBot(!showTelegramBot)
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading CodeChallenge...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        <Navbar currentUser={user} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-top">
                <div className="footer-brand">
                  <div className="footer-logo">
                    <Code className="footer-logo-icon" size={24} />
                    <span className="footer-logo-text">EduNexus</span>
                  </div>
                  <p className="footer-tagline">Empowering learners through interactive coding challenges</p>
                </div>
                <div className="footer-links">
                  <div className="footer-links-column">
                    <h4>Platform</h4>
                    <ul>
                      <li>
                        <Link to="/challenges">Challenges</Link>
                      </li>
                      <li>
                        <Link to="/leaderboard">Leaderboard</Link>
                      </li>
                      <li>
                        <a href="#">Learning Paths</a>
                      </li>
                      <li>
                        <a href="#">Resources</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-links-column">
                    <h4>Community</h4>
                    <ul>
                      <li>
                        <a href="#">Forum</a>
                      </li>
                      <li>
                        <a href="#">Discord</a>
                      </li>
                      <li>
                        <a href="#">Events</a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-links-column">
                    <h4>Company</h4>
                    <ul>
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">Careers</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                      <li>
                        <a href="#">Support</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p className="footer-copyright">&copy; {new Date().getFullYear()} EduNexus. All rights reserved.</p>
                <div className="footer-legal">
                  <a href="#">Terms of Service</a>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Telegram Bot Button - update the title */}
        <button className="telegram-bot-button" onClick={toggleTelegramBot} aria-label="Open EduBot">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .126 4.073l3.9 1.205 2.25 6.75a2.25 2.25 0 0 0 4.122.39l9-13.5a2.25 2.25 0 0 0-1.876-6.633z" />
          </svg>
        </button>

        {/* Telegram Bot Component */}
        {showTelegramBot && <TelegramBot onClose={toggleTelegramBot} />}
      </div>
    </Router>
  )
}

export default App

