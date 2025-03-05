"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { authService } from "../services/api"
import { LogIn, AlertCircle } from "lucide-react"
import "../styles/SignIn.css"

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    console.log("Logging in with:", email, password)

    try {
      const data = await authService.login(email, password)
      console.log("Login successful:", data)

      // Set the user in the parent component state
      if (setUser) {
        setUser(data.user)
      }

      // Navigate to profile page
      navigate(`/profile/${data.user.id}`)
    } catch (err) {
      setError(err.message || "Failed to sign in. Please check your credentials.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <h2>Sign In</h2>
        {error && (
          <div className="error-alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? (
              <span className="loading-spinner-small"></span>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>
        <p className="sign-up-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
    
  )
}

export default SignIn
