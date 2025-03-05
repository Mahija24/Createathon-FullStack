"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import CodeEditor from "./CodeEditor"
import "../styles/ChallengeViewer.css"

const ChallengeViewer = ({ challenge }) => {
  const [activeTab, setActiveTab] = useState("description")
  const [solution, setSolution] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setFeedback({
        status: "success",
        message: "All tests passed successfully!",
        testResults: [
          { name: "Test 1", passed: true, message: "Correct output" },
          { name: "Test 2", passed: true, message: "Correct output" },
        ],
      })
    }, 2000)
  }

  if (!challenge) return <div className="loading">Loading challenge...</div>

  return (
    <div className="challenge-viewer">
      <div className="challenge-header">
        <h1>{challenge.title}</h1>
        <div className="challenge-meta">
          <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
          <span className="category">{challenge.category}</span>
          <span className="points">{challenge.points} points</span>
        </div>
      </div>

      <div className="challenge-tabs">
        <button
          className={`tab ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button className={`tab ${activeTab === "hints" ? "active" : ""}`} onClick={() => setActiveTab("hints")}>
          Hints
        </button>
        <button
          className={`tab ${activeTab === "submissions" ? "active" : ""}`}
          onClick={() => setActiveTab("submissions")}
        >
          Submissions
        </button>
        <button
          className={`tab ${activeTab === "discussion" ? "active" : ""}`}
          onClick={() => setActiveTab("discussion")}
        >
          Discussion
        </button>
      </div>

      <div className="challenge-content">
        {activeTab === "description" && (
          <div className="description">
            <ReactMarkdown>{challenge.description}</ReactMarkdown>

            <div className="examples">
              <h3>Examples</h3>
              {challenge.examples.map((example, index) => (
                <div key={index} className="example">
                  <div className="example-input">
                    <strong>Input:</strong> <code>{example.input}</code>
                  </div>
                  <div className="example-output">
                    <strong>Output:</strong> <code>{example.output}</code>
                  </div>
                  {example.explanation && (
                    <div className="example-explanation">
                      <strong>Explanation:</strong> {example.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="constraints">
              <h3>Constraints</h3>
              <ul>
                {challenge.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "hints" && (
          <div className="hints">
            <h3>Hints</h3>
            <ul>
              {challenge.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="submissions">
            <h3>Your Submissions</h3>
            {challenge.submissions && challenge.submissions.length > 0 ? (
              <div className="submission-history">
                {challenge.submissions.map((submission, index) => (
                  <div key={index} className={`submission ${submission.status.toLowerCase()}`}>
                    <div className="submission-header">
                      <span className="submission-date">{submission.date}</span>
                      <span className="submission-status">{submission.status}</span>
                    </div>
                    <div className="submission-details">
                      <pre>{submission.code}</pre>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't made any submissions yet.</p>
            )}
          </div>
        )}

        {activeTab === "discussion" && (
          <div className="discussion">
            <h3>Discussion</h3>
            <p>Join the conversation about this challenge.</p>
            {/* Discussion forum component would go here */}
          </div>
        )}
      </div>

      <div className="solution-section">
        <h2>Your Solution</h2>
        <CodeEditor value={solution} onChange={setSolution} language={challenge.language || "javascript"} />

        <div className="action-buttons">
          <button className="run-button">Run Code</button>
          <button className="submit-button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Solution"}
          </button>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.status}`}>
            <h3>{feedback.message}</h3>
            <div className="test-results">
              {feedback.testResults.map((test, index) => (
                <div key={index} className={`test ${test.passed ? "passed" : "failed"}`}>
                  <span className="test-name">{test.name}</span>
                  <span className="test-message">{test.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChallengeViewer

