"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Code,
  Brain,
  Trophy,
  Terminal,
  BarChartIcon as ChartBar,
  Zap,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  Sparkles,
  Rocket,
} from "lucide-react"
import "../styles/Home.css"

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  // Features to cycle through in the hero section
  const features = [
    {
      title: "Master Algorithms",
      description: "Learn and practice essential algorithms through interactive challenges",
      icon: <Brain className="feature-icon" size={32} />,
    },
    {
      title: "Build Your Portfolio",
      description: "Showcase your coding skills and track your progress over time",
      icon: <Code className="feature-icon" size={32} />,
    },
    {
      title: "Compete & Learn",
      description: "Join competitions, earn points, and climb the global leaderboard",
      icon: <Trophy className="feature-icon" size={32} />,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000) // Change feature every 5 seconds

    return () => clearInterval(interval)
  }, [features])

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Master Coding Challenges with EduNexus</h1>
          <p className="hero-subtitle">
            Improve your skills, compete with others, and prepare for technical interviews
          </p>
          <div className="hero-features">
            {features.map((feature, index) => (
              <div key={index} className={`hero-feature ${index === activeFeature ? "active" : ""}`}>
                {feature.icon}
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hero-actions">
            <Link to="/challenges" className="primary-button">
              Start Coding
              <ArrowRight size={16} />
            </Link>
            <Link to="/leaderboard" className="secondary-button">
              View Leaderboard
            </Link>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="code-illustration">
            <div className="code-window">
              <div className="code-header">
                <div className="window-controls">
                  <span className="control close"></span>
                  <span className="control minimize"></span>
                  <span className="control maximize"></span>
                </div>
                <div className="window-title">challenge.js</div>
              </div>
              <div className="code-content">
                <pre>
                  <code>
                    <span className="keyword">function</span> <span className="function">twoSum</span>(
                    <span className="parameter">nums</span>, <span className="parameter">target</span>) {"{"}
                    <br /> <span className="comment">// Find two numbers that add up to target</span>
                    <br /> <span className="keyword">const</span> <span className="variable">map</span> ={" "}
                    <span className="keyword">new</span> <span className="class">Map</span>();
                    <br />
                    <br /> <span className="keyword">for</span> (<span className="keyword">let</span>{" "}
                    <span className="variable">i</span> = 0; <span className="variable">i</span> {"<"}{" "}
                    <span className="variable">nums</span>.length; <span className="variable">i</span>++) {"{"}
                    <br /> <span className="keyword">const</span> <span className="variable">complement</span> ={" "}
                    <span className="variable">target</span> - <span className="variable">nums</span>[
                    <span className="variable">i</span>];
                    <br /> <span className="keyword">if</span> (<span className="variable">map</span>.has(
                    <span className="variable">complement</span>)) {"{"}
                    <br /> <span className="keyword">return</span> [<span className="variable">map</span>.get(
                    <span className="variable">complement</span>), <span className="variable">i</span>];
                    <br /> {"}"}
                    <br /> <span className="variable">map</span>.set(<span className="variable">nums</span>[
                    <span className="variable">i</span>], <span className="variable">i</span>);
                    <br /> {"}"}
                    <br /> <span className="keyword">return</span> [];
                    <br />
                    {"}"}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Brain className="feature-card-icon" size={32} />
            <h3>Diverse Challenges</h3>
            <p>From algorithms to data structures, we offer a wide range of challenges for all skill levels.</p>
          </div>
          <div className="feature-card">
            <Trophy className="feature-card-icon" size={32} />
            <h3>Compete & Learn</h3>
            <p>Compete with peers, earn points, and climb the leaderboard while improving your skills.</p>
          </div>
          <div className="feature-card">
            <Terminal className="feature-card-icon" size={32} />
            <h3>Interactive Coding</h3>
            <p>Write, test, and submit your code directly in our interactive code editor.</p>
          </div>
          <div className="feature-card">
            <ChartBar className="feature-card-icon" size={32} />
            <h3>Track Progress</h3>
            <p>Monitor your progress with detailed statistics and performance analytics.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">
              <Users size={32} />
            </div>
            <h3>Create an Account</h3>
            <p>Sign up and join our community of developers.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">
              <BookOpen size={32} />
            </div>
            <h3>Choose a Challenge</h3>
            <p>Browse challenges by difficulty or category.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">
              <Code size={32} />
            </div>
            <h3>Solve & Submit</h3>
            <p>Write your solution and submit for evaluation.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-icon">
              <Zap size={32} />
            </div>
            <h3>Improve & Advance</h3>
            <p>Learn from feedback and tackle harder challenges.</p>
          </div>
        </div>
      </section>

      <section className="popular-challenges">
        <div className="section-header">
          <h2>Popular Challenges</h2>
          <Link to="/challenges" className="view-all">
            View All
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="challenges-grid">
          <div className="challenge-card">
            <div className="challenge-header">
              <h3>Two Sum</h3>
              <span className="difficulty easy">Easy</span>
            </div>
            <p>Find two numbers in an array that add up to a specific target.</p>
            <div className="challenge-footer">
              <span className="category">Algorithms</span>
              <span className="points">
                <Star size={14} className="points-icon" />
                100 points
              </span>
            </div>
          </div>
          <div className="challenge-card">
            <div className="challenge-header">
              <h3>Merge Intervals</h3>
              <span className="difficulty medium">Medium</span>
            </div>
            <p>Merge overlapping intervals in an array of interval pairs.</p>
            <div className="challenge-footer">
              <span className="category">Arrays</span>
              <span className="points">
                <Star size={14} className="points-icon" />
                200 points
              </span>
            </div>
          </div>
          <div className="challenge-card">
            <div className="challenge-header">
              <h3>LRU Cache</h3>
              <span className="difficulty hard">Hard</span>
            </div>
            <p>Implement a Least Recently Used (LRU) cache with O(1) operations.</p>
            <div className="challenge-footer">
              <span className="category">Data Structures</span>
              <span className="points">
                <Star size={14} className="points-icon" />
                300 points
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <Sparkles className="quote-icon" size={24} />
              <p>
                "This platform helped me prepare for technical interviews and land my dream job at a top tech company."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <div className="avatar-icon">AJ</div>
              </div>
              <div className="author-info">
                <div className="author-name">Alex Johnson</div>
                <div className="author-title">Software Engineer at TechCorp</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <Sparkles className="quote-icon" size={24} />
              <p>
                "The interactive challenges and community feedback have significantly improved my problem-solving
                skills."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <div className="avatar-icon">SL</div>
              </div>
              <div className="author-info">
                <div className="author-name">Sarah Lee</div>
                <div className="author-title">Full Stack Developer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <Rocket className="cta-icon" size={48} />
          <h2>Ready to Level Up Your Coding Skills?</h2>
          <p>Join thousands of developers who are mastering algorithms and acing technical interviews.</p>
          <Link to="/signup" className="cta-button">
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

