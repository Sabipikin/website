export default function Hero({ onModeSwitch }) {
  return (
    <>
      <div className="hero" />

      <div className="hero-content">
        <h2>Master Your MSc. Defend With Confidence.</h2>
        <p>Expert coaching & feedback from start to finish. Whether you need full-year support or help with one critical assignment — we've got you covered.</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onModeSwitch('annual')}>Explore Options</button>
          <button className="btn btn-secondary" onClick={() => onModeSwitch('single')}>Book Free Consultation</button>
        </div>
      </div>

      <div className="option-selector">
        <h3>What's Your Situation?</h3>
        <p>Choose the support that matches your needs</p>
        <div className="option-buttons">
          <div className="option-btn active">
            <h4>📅 Full-Year Membership</h4>
            <p>Complete MSc support: all assignments, group projects, thesis, defense prep</p>
            <p className="price">£2,500 – £3,500</p>
            <p className="subtitle">3-6 feedback rounds per essay • Coaching included</p>
          </div>
          <div className="option-btn">
            <h4>📋 One-Off Assessment Help</h4>
            <p>Single essay, chapter, or presentation feedback — no long-term commitment</p>
            <p className="price gold">£150 – £750</p>
            <p className="subtitle">Perfect for testing us out • Flexible timing</p>
          </div>
        </div>
      </div>
    </>
  )
}
