import { useState } from 'react'

export default function AssessmentSelector({ onBook }) {
  const [assessment, setAssessment] = useState('essay')
  const [turnaround, setTurnaround] = useState('standard')

  const prices = {
    essay: { standard: 180, rush: 230 },
    chapter: { standard: 375, rush: 425 },
    defense: { standard: 250, rush: 300 },
    bulk: { standard: 625, rush: 675 }
  }

  const price = prices[assessment][turnaround]
  const details = {
    essay: '1-on-1 feedback + written comments (2,000–5,000 words)',
    chapter: 'In-depth review + structural guidance (5,000–10,000 words)',
    defense: '1-hour viva prep session + materials',
    bulk: '2-3 assessments over semester (10-20% discount)'
  }

  const assessments = [
    { id: 'essay', emoji: '📄', title: 'Single Essay', desc: '2,000–5,000 words' },
    { id: 'chapter', emoji: '📚', title: 'Chapter Review', desc: '5,000–10,000 words' },
    { id: 'defense', emoji: '🎤', title: 'Defense Coaching', desc: '1-hour session' },
    { id: 'bulk', emoji: '✨', title: 'Bulk 2-3', desc: '10-20% discount' }
  ]

  return (
    <div className="single-assessment">
      <p className="intro">
        💡 <strong>Try us risk-free.</strong> Get expert feedback on one assignment and see the difference quality coaching makes.
      </p>

      <div className="selector-group">
        <label className="selector-label">📝 What Do You Need Help With?</label>
        <div className="selector-options">
          {assessments.map(a => (
            <button
              key={a.id}
              className={`selector-option ${assessment === a.id ? 'active' : ''}`}
              onClick={() => setAssessment(a.id)}
            >
              {a.title}
            </button>
          ))}
        </div>
      </div>

      <div className="selector-group">
        <label className="selector-label">⏱️ How Quickly Do You Need It?</label>
        <div className="selector-options">
          <button
            className={`selector-option ${turnaround === 'standard' ? 'active' : ''}`}
            onClick={() => setTurnaround('standard')}
          >
            Standard (5-7 days)
          </button>
          <button
            className={`selector-option ${turnaround === 'rush' ? 'active' : ''}`}
            onClick={() => setTurnaround('rush')}
          >
            Rush (2-3 days, +£50)
          </button>
        </div>
      </div>

      <div className="price-display">
        <div className="price-label">Total Cost</div>
        <div className="price-amount">£{price}</div>
        <div className="price-details">{details[assessment]}</div>
      </div>

      <button
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '20px', padding: '16px' }}
        onClick={() => onBook(assessment, 'single')}
      >
        Proceed to Booking
      </button>

      <div className="assessment-grid">
        {assessments.map(a => (
          <div
            key={a.id}
            className={`assessment-card ${assessment === a.id ? 'selected' : ''}`}
            onClick={() => setAssessment(a.id)}
          >
            <div className="assessment-emoji">{a.emoji}</div>
            <div className="assessment-title">{a.title}</div>
            <div className="assessment-desc">{a.desc}</div>
            <div className="assessment-price">£{Math.min(...Object.values(prices[a.id]))}–£{Math.max(...Object.values(prices[a.id]))}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
