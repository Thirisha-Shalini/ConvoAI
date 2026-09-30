import { useState } from "react";
import "./App.css";

const EMPTY_OTP = ["", "", "", "", "", ""];
;
function App() {
  const [screen, setScreen] = useState("splash");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(EMPTY_OTP);
  const [agreed, setAgreed] = useState(false);

  const handlePhoneChange = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
  };

  const handleOtpChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);

    if (digit && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const isPhoneReady = phone.length >= 10 && agreed;
  const isOtpReady = otp.every((value) => value !== "");

  const renderSplash = () => (
    <div className="screen-shell splash-screen" onClick={() => setScreen("onboarding")}>
      <div className="splash-logo-wrap">
        <div className="splash-logo">
          <span className="bar bar-one" />
          <span className="bar bar-two" />
          <span className="bar bar-three" />
          <span className="spark">✦</span>
        </div>
      </div>

      <h1>ConvoAI</h1>
      <p>Step into a smarter way to learn</p>
    </div>
  );

  const renderOnboarding = () => (
    <div className="screen-shell phone-page light-page">
      <button className="skip-btn" onClick={() => setScreen("login")}>
        Skip
      </button>

      <div className="onboarding-content">
        <div className="illustration-wrap">
          <div className="shape shape-one" />
          <div className="shape shape-two" />
          <div className="person-bubble">👩🏻</div>
          <div className="phone-bubble">📱</div>
        </div>

        <div className="section-copy">
          <h2>Welcome To ConvoAI</h2>
          <p>
            Practice real conversations, get instant feedback, and speak naturally in
            any situation.
          </p>
        </div>

        <button className="primary-button" onClick={() => setScreen("login")}>
          Continue
        </button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="screen-shell phone-page light-page login-page">
      <div className="top-purple-bar">
        <h1>ConvoAI</h1>
      </div>

      <div className="content-area form-area">
        <label className="field-label">Login with your phone number to continue</label>

        <input
          type="tel"
          placeholder="Enter Your Mobile Number"
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          className="text-input"
        />

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>I agree to the Terms &amp; Privacy Policy</span>
        </label>

        <button
          className="primary-button"
          disabled={!isPhoneReady}
          onClick={() => setScreen("otp")}
        >
          Get Started
        </button>
      </div>
    </div>
  );

  const renderOtp = () => (
    <div className="screen-shell phone-page light-page otp-page">
      <div className="top-purple-bar compact-bar">
        <button className="back-button" onClick={() => setScreen("login")}>
          ←
        </button>
      </div>

      <div className="content-area form-area">
        <h2 className="otp-heading">Enter OTP</h2>

        <p className="otp-text">
          Enter the 6-digit code we sent to {phone ? `+91 ${phone}` : "+91 98765 43210"}
        </p>

        <div className="otp-row">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={value}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              className="otp-input"
            />
          ))}
        </div>

        <p className="resend-text">Resend OTP in 30s</p>

        <button
          className="primary-button"
          disabled={!isOtpReady}
          onClick={() => setScreen("home")}
        >
          Verify
        </button>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="screen-shell home-shell">
      <header className="home-header">
        <div className="user-meta">
          <div className="mini-avatar">S</div>
          <span>Hi Sathish! 👋</span>
        </div>
        <button className="notification-btn">🔔</button>
      </header>

      <main className="home-body">
        <div className="progress-card">
          <h3>Today's Progress</h3>

          <div className="progress-header">
            <span>Daily Goal Progress</span>
            <strong>65%</strong>
          </div>

          <div className="progress-track">
            <span className="progress-fill" />
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <span>💬</span>
              <strong>10</strong>
              <small>Chats</small>
            </div>
            <div className="stat-box">
              <span>📞</span>
              <strong>4</strong>
              <small>Calls</small>
            </div>
            <div className="stat-box">
              <span>⏱</span>
              <strong>38</strong>
              <small>Minutes</small>
            </div>
          </div>

          <div className="goal-banner">🔥 You're 1 step away from your daily goal.</div>
        </div>

        <div className="mini-cards">
          <div className="mini-card">
            <span>🔥</span>
            <strong>0</strong>
            <small>Day Streak</small>
          </div>
          <div className="mini-card">
            <span>🔷</span>
            <strong>0</strong>
            <small>Total coins</small>
          </div>
        </div>

        <div className="section-block">
          <h3>AI Insights</h3>
          <div className="insights-grid">
            <InsightCard icon="🎙" value="38%" label="Fluency" />
            <InsightCard icon="◉" value="9%" label="Pronunciation" />
            <InsightCard icon="▤" value="12" label="New Words" />
          </div>
        </div>

        <div className="section-block">
          <h3>Recent Conversations</h3>
          <div className="conversation-card-list">
            <ConversationItem icon="📞" title="Job Interview Practice" time="6 min" />
            <ConversationItem icon="💬" title="Ordering Food" time="10 min" />
          </div>
        </div>

        <div className="section-block">
          <h3>Your Weekly Stats</h3>
          <div className="week-grid">
            <div className="week-card">
              <span>◉</span>
              <strong>140 min</strong>
              <small>Total Talk Time</small>
            </div>
            <div className="week-card">
              <span>▰</span>
              <strong>23</strong>
              <small>Total Talks</small>
            </div>
          </div>
        </div>
      </main>

      <nav className="bottom-nav">
        <button className="nav-item active">
          <span>⌂</span>
          <small>Home</small>
        </button>
        <button className="nav-item">
          <span>💬</span>
          <small>Practice</small>
        </button>
        <button className="nav-item">
          <span>📊</span>
          <small>Progress</small>
        </button>
        <button className="nav-item">
          <span>👤</span>
          <small>Profile</small>
        </button>
      </nav>
    </div>
  );

  if (screen === "splash") return renderSplash();
  if (screen === "onboarding") return renderOnboarding();
  if (screen === "login") return renderLogin();
  if (screen === "otp") return renderOtp();
  if (screen === "home") return renderHome();

  return null;
}

function InsightCard({ icon, value, label }) {
  return (
    <div className="insight-box">
      <div className="insight-icon">{icon}</div>
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}

function ConversationItem({ icon, title, time }) {
  return (
    <div className="conversation-item">
      <div className="conv-icon">{icon}</div>
      <div className="conv-text">
        <strong>{title}</strong>
        <span>View Feedback</span>
      </div>
      <small>{time}</small>
    </div>
  );
}

export default App;
