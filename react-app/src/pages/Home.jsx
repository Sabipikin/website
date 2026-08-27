import Hero from '../components/Hero'
import PricingCards from '../components/PricingCards'
import AssessmentSelector from '../components/AssessmentSelector'
import FAQ from '../components/FAQ'

export default function Home({ onBooking, mode }) {
  return (
    <main>
      <Hero onModeSwitch={(m) => onBooking(null, m)} />

      <section>
        {mode === 'annual' ? (
          <PricingCards onBook={onBooking} />
        ) : (
          <AssessmentSelector onBook={onBooking} />
        )}
      </section>

      <section style={{ background: '#f9fafb', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.8em', color: '#1f3b57' }}>How SabiPath Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px' }}>
            {[
              { num: '1', title: 'Choose Your Tier', desc: 'Annual or single assessment' },
              { num: '2', title: 'Book & Pay', desc: 'Secure your spot' },
              { num: '3', title: 'Get Oriented', desc: 'Intro call with your coach' },
              { num: '4', title: 'Submit & Get Feedback', desc: 'Structured feedback rounds' },
              { num: '5', title: 'Coaching Sessions', desc: '1:1 support for thesis/defense' },
              { num: '6', title: 'Defend With Confidence', desc: 'Full viva/defense prep' }
            ].map((step, i) => (
              <div key={i} style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                borderTop: '4px solid #b8860b'
              }}>
                <div style={{ fontSize: '2.5em', color: '#b8860b', fontWeight: 'bold', marginBottom: '10px' }}>{step.num}</div>
                <h4 style={{ color: '#1f3b57', marginBottom: '8px', fontSize: '1.1em' }}>{step.title}</h4>
                <p style={{ color: '#666', fontSize: '0.95em' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.8em', color: '#1f3b57' }}>What Students Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { quote: '"My thesis was the hardest thing I\'ve done"', text: 'Having structured coaching for my dissertation defense gave me real confidence. I passed with merit.', author: 'Sarah M., MSc Biology' },
              { quote: '"Feedback that actually mattered"', text: 'Regular feedback rounds helped me improve my writing throughout the year. My grades improved across every assignment.', author: 'James P., MSc Engineering' },
              { quote: '"Worth every penny for one essay"', text: 'I just needed help with one critical assignment. The feedback I got was detailed and actionable. Best investment in my degree.', author: 'Emma T., MSc Economics' }
            ].map((t, i) => (
              <div key={i} style={{
                background: '#fff',
                padding: '24px',
                borderRadius: '8px',
                borderLeft: '4px solid #b8860b',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontWeight: '700', color: '#1f3b57', marginBottom: '10px', fontSize: '0.95em' }}>{t.quote}</div>
                <div style={{ color: '#666', fontSize: '0.9em', marginBottom: '12px' }}>{t.text}</div>
                <div style={{ color: '#1f3b57', fontWeight: '600', fontSize: '0.9em' }}>{t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </main>
  )
}
