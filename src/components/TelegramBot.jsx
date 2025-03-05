"use client"

import { useState, useEffect, useRef } from "react"
import { X, Send, Bot, Paperclip, Smile, Mic, Code, MoreHorizontal, Search } from "lucide-react"
import "../styles/TelegramBot.css"

const TelegramBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi there! I'm EduBot, your learning assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Pre-defined quick suggestions
  const quickSuggestions = [
    "How do I start a challenge?",
    "What programming languages are supported?",
    "How does the scoring system work?",
    "Need help with my profile",
    "Show me beginner-friendly challenges",
  ]

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages.length])

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus()

    // Show initial suggestions
    setSuggestions(quickSuggestions.slice(0, 3))
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!inputMessage.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setSuggestions([])

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(
      () => {
        const botResponse = generateBotResponse(inputMessage)
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: botResponse.message,
            sender: "bot",
            timestamp: new Date(),
          },
        ])
        setIsTyping(false)

        // Set suggestions based on context
        setSuggestions(botResponse.suggestions || [])
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleSuggestionClick = (suggestion) => {
    // Add user message from suggestion
    const userMessage = {
      id: messages.length + 1,
      text: suggestion,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setSuggestions([])

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(
      () => {
        const botResponse = generateBotResponse(suggestion)
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: botResponse.message,
            sender: "bot",
            timestamp: new Date(),
          },
        ])
        setIsTyping(false)

        // Set suggestions based on context
        setSuggestions(botResponse.suggestions || [])
      },
      1000 + Math.random() * 1000,
    )
  }

  const generateBotResponse = (userInput) => {
    const userInputLower = userInput.toLowerCase()

    // Enhanced response logic with follow-up suggestions
    if (userInputLower.includes("hello") || userInputLower.includes("hi")) {
      return {
        message: "Hello! How can I assist you with your learning journey today?",
        suggestions: [
          "Show me today's challenges",
          "How do I improve my ranking?",
          "Need help with a specific problem",
        ],
      }
    } else if (userInputLower.includes("challenge") || userInputLower.includes("problem")) {
      return {
        message:
          "We have many coding challenges available! You can browse them by difficulty or category on the Challenges page. Would you like me to recommend one?",
        suggestions: ["Show me easy challenges", "Show me algorithm challenges", "How are challenges scored?"],
      }
    } else if (
      userInputLower.includes("account") ||
      userInputLower.includes("sign up") ||
      userInputLower.includes("login")
    ) {
      return {
        message:
          "You can create an account by clicking the Sign Up button. If you already have an account, use the Sign In option. Your account lets you track progress and save your achievements.",
        suggestions: ["How do I reset my password?", "What data is saved in my profile?", "Is my data secure?"],
      }
    } else if (userInputLower.includes("profile")) {
      return {
        message:
          "Your profile page shows your progress, completed challenges, and achievements. You can access it by clicking on your avatar in the top right after signing in. You can also see detailed statistics and track your learning journey.",
        suggestions: ["How are achievements earned?", "Can I customize my profile?", "Show me my statistics"],
      }
    } else if (userInputLower.includes("leaderboard")) {
      return {
        message:
          "The leaderboard shows top performers based on points earned from solving challenges. Keep solving challenges to climb the ranks! Points are awarded based on challenge difficulty and efficiency of your solution.",
        suggestions: [
          "How is ranking calculated?",
          "Can I compete with friends?",
          "What rewards do top performers get?",
        ],
      }
    } else if (userInputLower.includes("languages") || userInputLower.includes("programming")) {
      return {
        message:
          "EduNexus supports multiple programming languages including JavaScript, Python, Java, C++, and Ruby. You can choose your preferred language when solving challenges. We're constantly adding support for more languages!",
        suggestions: ["Which language is best for beginners?", "Can I use TypeScript?", "How do I switch languages?"],
      }
    } else if (userInputLower.includes("scoring") || userInputLower.includes("points")) {
      return {
        message:
          "Points are awarded based on the difficulty of the challenge and the efficiency of your solution. Easy challenges give 50-100 points, medium ones 100-200, and hard ones 200-300. Optimized solutions receive bonus points!",
        suggestions: ["How do I get more points?", "Do points expire?", "Show my current points"],
      }
    } else if (userInputLower.includes("help")) {
      return {
        message:
          "I can help with information about challenges, account setup, navigation, specific coding problems, or learning strategies. Just let me know what you need!",
        suggestions: ["How do I start a challenge?", "I'm stuck on a problem", "Recommend learning resources"],
      }
    } else if (userInputLower.includes("thank")) {
      return {
        message:
          "You're welcome! Feel free to ask if you need anything else. I'm here to help you succeed in your learning journey!",
        suggestions: ["Show me what's new", "Give me a challenge tip", "How do I contact support?"],
      }
    } else {
      return {
        message:
          "I'm not sure I understand completely. Could you rephrase that? I can help with challenges, account information, coding concepts, or learning strategies.",
        suggestions: quickSuggestions.slice(0, 3),
      }
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="telegram-bot">
      <div className="bot-header">
        <div className="bot-info">
          <Bot size={24} />
          <div>
            <h3>EduBot</h3>
            <span className="bot-status">Online</span>
          </div>
        </div>
        <div className="bot-actions">
          <button className="bot-action-button" title="Search conversation">
            <Search size={18} />
          </button>
          <button className="bot-action-button" title="More options">
            <MoreHorizontal size={18} />
          </button>
          <button className="close-button" onClick={onClose} aria-label="Close chat">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender === "bot" ? "bot-message" : "user-message"}`}>
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot-message">
            <div className="message-content typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {suggestions.length > 0 && !isTyping && (
          <div className="suggestions-container">
            {suggestions.map((suggestion, index) => (
              <button key={index} className="suggestion-chip" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="message-input" onSubmit={handleSendMessage}>
        <div className="input-actions">
          <button type="button" className="input-action-button" title="Add emoji">
            <Smile size={20} />
          </button>
          <button type="button" className="input-action-button" title="Attach file">
            <Paperclip size={20} />
          </button>
          <button type="button" className="input-action-button" title="Record voice">
            <Mic size={20} />
          </button>
          <button type="button" className="input-action-button" title="Send code snippet">
            <Code size={20} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          ref={inputRef}
        />
        <button type="submit" className="send-button" disabled={!inputMessage.trim()} aria-label="Send message">
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

export default TelegramBot

