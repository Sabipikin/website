import { useState } from 'react'
import PricingCards from '../components/PricingCards'
import AssessmentSelector from '../components/AssessmentSelector'

export default function Pricing({ onBooking }) {
  const [mode, setMode] = useState('annual')

  return (
    <main>
      <section style={{ padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2em', color: '#1f3b57', marginBottom: '30px' }}>Choose Your Support Level</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto 40px' }}>
          <button
            onClick={() => setMode('annual')}
            style={{
              padding: '28px 24px',
              border: mode === 'annual' ? '3px solid #b8860b' : '3px solid #ddd',
              background: mode === 'annual' ? '#fffacd' : '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <h3 style={{ color: '#1f3b57' }}>📅 Full-Year Membership</h3>
            <p>Complete MSc support</p>
            <p style={{ fontWeight: 'bold', color: '#1f3b57', fontSize: '1.2em' }}>£2,500 – £3,500</p>
          </button>

          <button
            onClick={() => setMode('single')}
            style={{
              padding: '28px 24px',
              border: mode === 'single' ? '3px solid #b8860b' : '3px solid #ddd',
              background: mode === 'single' ? '#fffacd' : '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <h3 style={{ color: '#1f3b57' }}>📋 Single Assessment</h3>
            <p>One essay, chapter, or presentation</p>
            <p style={{ fontWeight: 'bold', color: '#b8860b', fontSize: '1.2em' }}>£150 – £750</p>
          </button>
        </div>
      </section>

      <section style={{ padding: '40px 24px', background: mode === 'annual' ? 'transparent' : '#f9fafb' }}>
        {mode === 'annual' ? (
          <PricingCards onBook={onBooking} />
        ) : (
          <AssessmentSelector onBook={onBooking} />
        )}
      </section>
    </main>
  )
}
