"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Code, Clock, Award, BookOpen } from "lucide-react"
import ChallengeViewer from "../components/ChallengeViewer"
import "../styles/Challenges.css"

const ChallengesPage = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Enhanced mock data for challenges with more detailed descriptions
  const challenges = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      description:
        "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nThis is a classic problem that tests your ability to use hash maps for efficient lookups. While a brute force approach would involve checking every pair of numbers (O(n²) time complexity), you can solve this in a single pass through the array (O(n) time complexity) by using a hash map to store the complement of each number.",
      points: 100,
      timeEstimate: "15-30 minutes",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
        },
        {
          input: "nums = [3,3], target = 6",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
        },
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists.",
      ],
      hints: [
        "Try to use a HashMap to solve it in one pass.",
        "For each element, check if its complement (target - nums[i]) exists in the map.",
        "If it does, you've found a solution. If not, add the current element to the map.",
      ],
      approach:
        "The key insight is to use a hash map to store the numbers we've seen so far and their indices. For each number, we check if its complement (target - current number) is already in the hash map. If it is, we've found our solution. If not, we add the current number to the hash map and continue.",
      complexity: {
        time: "O(n) - We only need to iterate through the array once.",
        space: "O(n) - In the worst case, we might need to store all elements in the hash map.",
      },
      tags: ["Hash Table", "Array", "Two Pointers"],
      companies: ["Amazon", "Google", "Microsoft", "Facebook"],
      completionRate: "87%",
    },
    {
      id: "2",
      title: "Reverse Linked List",
      difficulty: "Medium",
      category: "Linked Lists",
      description:
        "Given the head of a singly linked list, reverse the list, and return the reversed list.\n\nThis problem tests your understanding of linked list operations and pointer manipulation. You'll need to carefully track and update the pointers to avoid losing references to nodes during the reversal process.\n\nYou can solve this problem using either an iterative or recursive approach. The iterative approach is generally more space-efficient, while the recursive approach can be more elegant but uses more stack space.",
      points: 200,
      timeEstimate: "20-40 minutes",
      examples: [
        {
          input: "head = [1,2,3,4,5]",
          output: "[5,4,3,2,1]",
        },
        {
          input: "head = [1,2]",
          output: "[2,1]",
        },
        {
          input: "head = []",
          output: "[]",
        },
      ],
      constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
      hints: [
        "A linked list can be reversed either iteratively or recursively.",
        "Try to use three pointers: prev, current, and next.",
        "For the iterative approach, initialize prev as null and current as head.",
        "In each iteration, save the next node, update the current node's next pointer to prev, and move prev and current forward.",
      ],
      approach:
        "For the iterative approach, we use three pointers: prev, current, and next. We initialize prev as null and current as the head of the list. In each iteration, we save the next node, update the current node's next pointer to prev, and move prev and current forward. We continue this process until current becomes null, at which point prev will be pointing to the new head of the reversed list.",
      complexity: {
        time: "O(n) - We need to visit each node once.",
        space: "O(1) - We only use a constant amount of extra space for the pointers.",
      },
      tags: ["Linked List", "Recursion"],
      companies: ["Amazon", "Microsoft", "Apple"],
      completionRate: "76%",
    },
    {
      id: "3",
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stacks",
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\nThis problem is a classic application of stack data structure. The key insight is that the most recently opened bracket must be closed first, which naturally fits the Last-In-First-Out (LIFO) property of stacks.",
      points: 100,
      timeEstimate: "15-25 minutes",
      examples: [
        {
          input: 's = "()"',
          output: "true",
        },
        {
          input: 's = "()[]{}"',
          output: "true",
        },
        {
          input: 's = "(]"',
          output: "false",
        },
        {
          input: 's = "([)]"',
          output: "false",
        },
        {
          input: 's = "{[]}"',
          output: "true",
        },
      ],
      constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
      hints: [
        "Use a stack to keep track of opening brackets.",
        "When you encounter a closing bracket, check if it matches the most recent opening bracket.",
        "Ensure that the stack is empty at the end for a valid string.",
      ],
      approach:
        "We use a stack to keep track of opening brackets. When we encounter an opening bracket, we push it onto the stack. When we encounter a closing bracket, we check if the stack is empty (which means there's no matching opening bracket) or if the top of the stack doesn't match the current closing bracket. If either condition is true, the string is invalid. After processing all characters, the stack should be empty for a valid string.",
      complexity: {
        time: "O(n) - We need to process each character once.",
        space: "O(n) - In the worst case, we might need to push all characters onto the stack.",
      },
      tags: ["Stack", "String"],
      companies: ["Google", "Facebook", "Amazon", "Microsoft"],
      completionRate: "92%",
    },
    {
      id: "4",
      title: "Merge K Sorted Lists",
      difficulty: "Hard",
      category: "Linked Lists",
      description:
        "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.\n\nThis problem combines the concepts of merging sorted lists and priority queues. While you could merge lists one by one, a more efficient approach uses a min-heap (priority queue) to always select the smallest element from among the k lists.\n\nThe problem tests your ability to work with linked lists, understand priority queues, and optimize for efficiency when dealing with multiple data sources.",
      points: 300,
      timeEstimate: "45-60 minutes",
      examples: [
        {
          input: "lists = [[1,4,5],[1,3,4],[2,6]]",
          output: "[1,1,2,3,4,4,5,6]",
          explanation:
            "The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6",
        },
        {
          input: "lists = []",
          output: "[]",
        },
        {
          input: "lists = [[]]",
          output: "[]",
        },
      ],
      constraints: [
        "k == lists.length",
        "0 <= k <= 10^4",
        "0 <= lists[i].length <= 500",
        "-10^4 <= lists[i][j] <= 10^4",
        "lists[i] is sorted in ascending order.",
        "The sum of lists[i].length won't exceed 10^4.",
      ],
      hints: [
        "Use a priority queue (min-heap) to efficiently merge the lists.",
        "Initialize the heap with the first node from each list.",
        "Always extract the minimum element from the heap, add it to the result, and add the next node from the same list to the heap.",
        "Continue until the heap is empty.",
      ],
      approach:
        "We use a min-heap to keep track of the smallest element among the k lists. We initialize the heap with the first node from each list. Then, we repeatedly extract the minimum element from the heap, add it to our result list, and add the next node from the same list to the heap. We continue this process until the heap is empty.",
      complexity: {
        time: "O(N log k) where N is the total number of nodes and k is the number of linked lists. The heap operations take O(log k) time, and we do this for each of the N nodes.",
        space: "O(k) for the heap which stores at most k nodes at any time.",
      },
      tags: ["Linked List", "Divide and Conquer", "Heap", "Priority Queue"],
      companies: ["Amazon", "Google", "Microsoft", "Facebook", "Apple"],
      completionRate: "42%",
    },
    {
      id: "5",
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      category: "Dynamic Programming",
      description:
        "Given a string s, return the longest palindromic substring in s.\n\nA palindrome is a string that reads the same backward as forward, such as 'madam' or 'racecar'.\n\nThis problem can be approached in multiple ways, including brute force, dynamic programming, or expanding around centers. The key insight is to recognize that a palindrome mirrors around its center, and there are 2n-1 possible centers (n single characters and n-1 pairs of characters).",
      points: 200,
      timeEstimate: "30-45 minutes",
      examples: [
        {
          input: 's = "babad"',
          output: '"bab"',
          explanation: '"aba" is also a valid answer.',
        },
        {
          input: 's = "cbbd"',
          output: '"bb"',
        },
        {
          input: 's = "a"',
          output: '"a"',
        },
        {
          input: 's = "ac"',
          output: '"a"',
          explanation: '"c" is also a valid answer.',
        },
      ],
      constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."],
      hints: [
        "Try expanding around the center for each character.",
        "Consider both odd-length palindromes (centered at a single character) and even-length palindromes (centered between two characters).",
        "For each center, expand outward as long as the characters match.",
        "Keep track of the longest palindrome found so far.",
      ],
      approach:
        "We can use the expand-around-center approach. For each position in the string, we consider it as a potential center of a palindrome and expand outward as long as the characters match. We need to handle both odd-length palindromes (centered at a single character) and even-length palindromes (centered between two characters). We keep track of the longest palindrome found so far and return it at the end.",
      complexity: {
        time: "O(n²) where n is the length of the string. For each of the 2n-1 centers, we might need to expand up to n times.",
        space: "O(1) as we only use a constant amount of extra space.",
      },
      tags: ["String", "Dynamic Programming"],
      companies: ["Amazon", "Microsoft", "Google"],
      completionRate: "65%",
    },
  ]

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleDifficultyFilter = (e) => {
    setDifficultyFilter(e.target.value)
  }

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value)
  }

  // Filter challenges based on search term and filters
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDifficulty =
      difficultyFilter === "all" || challenge.difficulty.toLowerCase() === difficultyFilter.toLowerCase()

    const matchesCategory =
      categoryFilter === "all" || challenge.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesDifficulty && matchesCategory
  })

  return (
    <div className="challenges-page">
      <div className="challenges-list">
        <div className="challenges-header">
          <h2>Coding Challenges</h2>
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <div className="filter-controls">
            <div className="filter-group">
              <Filter size={16} />
              <select value={difficultyFilter} onChange={handleDifficultyFilter} className="filter-select">
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="filter-group">
              <select value={categoryFilter} onChange={handleCategoryFilter} className="filter-select">
                <option value="all">All Categories</option>
                <option value="arrays">Arrays</option>
                <option value="linked lists">Linked Lists</option>
                <option value="stacks">Stacks</option>
                <option value="dynamic programming">Dynamic Programming</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="challenges-loading">
            <div className="loading-spinner"></div>
            <p>Loading challenges...</p>
          </div>
        ) : filteredChallenges.length === 0 ? (
          <div className="no-challenges">
            <BookOpen size={48} />
            <p>No challenges found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setDifficultyFilter("all")
                setCategoryFilter("all")
              }}
              className="reset-filters-button"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`challenge-item ${selectedChallenge && selectedChallenge.id === challenge.id ? "selected" : ""}`}
              onClick={() => handleChallengeSelect(challenge)}
            >
              <div className="challenge-item-header">
                <h3>{challenge.title}</h3>
                <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
              </div>
              <div className="challenge-meta">
                <span className="category">
                  <Code size={14} />
                  {challenge.category}
                </span>
                <span className="points">
                  <Award size={14} />
                  {challenge.points} points
                </span>
                {challenge.timeEstimate && (
                  <span className="time-estimate">
                    <Clock size={14} />
                    {challenge.timeEstimate}
                  </span>
                )}
              </div>
              <p className="challenge-brief">{challenge.description.split("\n")[0]}</p>
              <div className="completion-rate">
                <div className="completion-bar">
                  <div className="completion-fill" style={{ width: challenge.completionRate || "0%" }}></div>
                </div>
                <span className="completion-text">{challenge.completionRate || "0%"} completion rate</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="challenge-viewer-container">
        {selectedChallenge ? (
          <ChallengeViewer challenge={selectedChallenge} />
        ) : (
          <div className="no-challenge-selected">
            <BookOpen size={64} className="no-selection-icon" />
            <h2>Select a challenge to get started</h2>
            <p>Choose a challenge from the list on the left to view its details and start coding!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChallengesPage

