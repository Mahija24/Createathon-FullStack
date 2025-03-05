"use client"

import { useState, useEffect } from "react"
import Leaderboard from "../components/Leaderboard"

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data for the leaderboard
    const mockLeaderboardData = {
      topThree: [
        {
          id: "1",
          name: "Alice Johnson",
          points: 9500,
          avatar: "/placeholder.svg?height=80&width=80",
          badges: [
            { name: "Algorithm Master", icon: "🏆" },
            { name: "Code Ninja", icon: "🥷" },
          ],
        },
        {
          id: "2",
          name: "Bob Smith",
          points: 9200,
          avatar: "/placeholder.svg?height=80&width=80",
          badges: [
            { name: "Bug Hunter", icon: "🐞" },
            { name: "Fast Solver", icon: "⚡" },
          ],
        },
        {
          id: "3",
          name: "Charlie Brown",
          points: 8800,
          avatar: "/placeholder.svg?height=80&width=80",
          badges: [
            { name: "Consistency King", icon: "👑" },
            { name: "Team Player", icon: "🤝" },
          ],
        },
      ],
      users: [
        {
          id: "4",
          rank: 4,
          name: "David Lee",
          title: "Frontend Developer",
          avatar: "/placeholder.svg?height=40&width=40",
          challenges: 120,
          points: 8500,
          streak: 15,
        },
        {
          id: "5",
          rank: 5,
          name: "Emma Davis",
          title: "Full Stack Engineer",
          avatar: "/placeholder.svg?height=40&width=40",
          challenges: 115,
          points: 8200,
          streak: 10,
        },
        {
          id: "6",
          rank: 6,
          name: "Frank Wilson",
          title: "Data Scientist",
          avatar: "/placeholder.svg?height=40&width=40",
          challenges: 110,
          points: 7900,
          streak: 7,
        },
        // Add more users to ensure we have enough data
        {
          id: "7",
          rank: 7,
          name: "Grace Wang",
          title: "Software Engineer",
          avatar: "/placeholder.svg?height=40&width=40",
          challenges: 105,
          points: 7600,
          streak: 12,
        },
        {
          id: "8",
          rank: 8,
          name: "Harry Chen",
          title: "Backend Developer",
          avatar: "/placeholder.svg?height=40&width=40",
          challenges: 100,
          points: 7300,
          streak: 9,
        },
        {
          id: "9",
          rank: 9,
          name: "Isabel Kim",
          title: "Machine Learning Engineer",
          avatar: "/placeholder.svg?height=40&width=40",
          challenges: 95,
          points: 7000,
          streak: 6,
        },
        {
          id: "10",
          rank: 10,
          name: "Jack Thompson",
          title: "DevOps Engineer",
          avatar: "/placeholder.svg?height=40&width=40",
          challenges: 90,
          points: 6700,
          streak: 8,
        },
      ],
    }

    // Simulate loading data
    setTimeout(() => {
      setLeaderboardData(mockLeaderboardData)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading leaderboard...</p>
      </div>
    )
  }

  return <Leaderboard leaderboardData={leaderboardData} />
}

export default LeaderboardPage

