"use client"

import { useEffect, useRef } from "react"
import "../styles/CodeEditor.css"

// This is a simplified version. In a real app, you'd use a library like Monaco Editor or CodeMirror
const CodeEditor = ({ value, onChange, language = "javascript" }) => {
  const editorRef = useRef(null)

  useEffect(() => {
    // In a real implementation, you would initialize your code editor library here
    // For example: monaco.editor.create(editorRef.current, {...})

    // For this simplified version, we'll just focus the textarea
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  return (
    <div className="code-editor">
      <div className="editor-header">
        <span className="language">{language}</span>
        <div className="editor-actions">
          <button className="action-button">Format</button>
          <button className="action-button">Reset</button>
        </div>
      </div>
      <textarea
        ref={editorRef}
        className="editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`// Write your ${language} solution here`}
        spellCheck="false"
      />
      <div className="editor-footer">
        <span className="line-count">Lines: {value.split("\n").length}</span>
        <span className="char-count">Characters: {value.length}</span>
      </div>
    </div>
  )
}

export default CodeEditor

