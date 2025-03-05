"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { authService } from "../services/api"
import { UserPlus, AlertCircle, Check } from "lucide-react"
import "../styles/SignIn.css" // Reusing the same styles

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required"
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      // Sending correct data format to backend
      const response = await authService.register({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword, // Ensuring password2 is sent
      })

      console.log("Registration successful:", response)
      setSuccess(true)

      // Redirect to sign-in page after a delay
      setTimeout(() => {
        navigate("/signin")
      }, 2000)
    } catch (err) {
      console.error("Registration error:", err)
      setErrors({
        general: err.response?.data || "Registration failed. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <h2>Create an Account</h2>

        {errors.general && (
          <div className="error-alert">
            <AlertCircle size={18} />
            <span>{errors.general}</span>
          </div>
        )}

        {success && (
          <div className="success-alert">
            <Check size={18} />
            <span>Account created successfully! Redirecting to login...</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              disabled={isLoading || success}
            />
            {errors.first_name && <div className="error-message">{errors.first_name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              disabled={isLoading || success}
            />
            {errors.last_name && <div className="error-message">{errors.last_name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading || success}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading || success}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading || success}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="sign-in-button" disabled={isLoading || success}>
            {isLoading ? (
              <span className="loading-spinner-small"></span>
            ) : (
              <>
                <UserPlus size={18} />
                Sign Up
              </>
            )}
          </button>
        </form>

        <p className="sign-up-link">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
