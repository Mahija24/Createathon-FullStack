import { useParams } from "react-router-dom";
import Profile from "../components/Profile";

const ProfilePage = () => {
  const { userId } = useParams();

  const mockUserData = {
    id: userId,
    name: "Sanjay29",
    title: "Software Engineer",
    stats: {
      challenges: 150,
      points: 3500,
      rank: 42,
      streak: 7,
    },
    badges: [
      { name: "Algorithm Master", icon: "🏆" },
      { name: "Bug Hunter", icon: "🐞" },
      { name: "Code Ninja", icon: "🥷" },
    ],
    about: "Passionate about solving complex problems and learning new technologies.",
    memberSince: "January 2022",
    location: "San Francisco, CA",
    languages: ["JavaScript", "Python", "Java"],
    recentChallenges: [
      {
        title: "Binary Search",
        difficulty: "Medium",
        category: "Algorithms",
        status: "Completed",
        date: "2023-06-15",
      },
      {
        title: "Linked List Reversal",
        difficulty: "Hard",
        category: "Data Structures",
        status: "In Progress",
        date: "2023-06-10",
      },
    ],
    achievements: [
      {
        title: "100 Days Streak",
        description: "Completed challenges for 100 days in a row",
        icon: "🔥",
        unlocked: true,
        unlockedDate: "2023-05-01",
      },
      {
        title: "Algorithm Ace",
        description: "Solved 50 algorithm challenges",
        icon: "🧠",
        unlocked: false,
        progress: 35,
        target: 50,
      },
    ],
    submissions: [
      {
        challengeTitle: "Two Sum",
        status: "Completed",
        date: "2023-06-14",
        language: "JavaScript",
        code: "function twoSum(nums, target) {\n  // Solution code\n}",
        feedback: "Great job! Your solution is optimal in both time and space complexity.",
      },
    ],
    activity: [
      {
        date: "2023-06-15",
        icon: "🏆",
        title: "Completed Challenge",
        description: 'Solved "Binary Search" challenge',
      },
      {
        date: "2023-06-10",
        icon: "🚀",
        title: "Reached New Rank",
        description: "Advanced to rank 42",
      },
    ],
    upcomingEvents: [
      {
        title: "Weekly Coding Contest",
        date: "2023-06-20",
        description: "Participate in our weekly coding contest and win prizes!",
      },
      {
        title: "Advanced Algorithms Workshop",
        date: "2023-06-25",
        description: "Learn advanced algorithmic techniques from industry experts.",
      },
    ],
    ongoingEvents: [
      {
        title: "30-Day Coding Challenge",
        progress: 20,
        totalDays: 30,
        description: "Complete one coding challenge every day for 30 days.",
      },
    ],
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Avatar Circle Positioned Above Username */}
      <div
        style={{
          position: "absolute",
          top: "100px", // Adjusted position above username
          left: "8%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4A90E2, #6A5ACD)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "48px",
          fontWeight: "bold",
          boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)",
        }}
      >
        S
      </div>

      {/* Profile Component */}
      <Profile userData={mockUserData} />
    </div>
  );
};

export default ProfilePage;
