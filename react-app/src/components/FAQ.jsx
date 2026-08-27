import { useState } from 'react'

export default function FAQ() {
  const [expanded, setExpanded] = useState(null)

  const faqs = [
    {
      q: '❓ Is this ghostwriting? Will I get in trouble?',
      a: 'No. SabiPath is teaching & coaching only. We review your drafts, provide feedback, and coach you on how to improve — you write and submit your own work. This keeps you safe from academic misconduct.'
    },
    {
      q: '❓ What if I don\'t get a good grade?',
      a: 'We aim for minimum B grades (or equivalent). If you receive below a B and it\'s due to our guidance issues, you\'re eligible for a 10% refund. We stand behind our coaching.'
    },
    {
      q: '❓ Annual or single — which should I choose?',
      a: 'Annual if you have 3+ assignments/chapters to work on — it\'s better value. Single Assessment if you just need help with one essay or want to try us out first. Many students start with single, then upgrade to annual.'
    },
    {
      q: '❓ How much does a single essay review cost?',
      a: '£150–£250 depending on length and deadline. Rush fees (£50) apply for 2-3 day turnaround. Chapter reviews are £300–£450.'
    },
    {
      q: '❓ Can I upgrade from single assessment to annual?',
      a: 'Yes! If you start with a single assessment and decide you want annual coverage, we\'ll credit your single assessment fee toward the annual tier.'
    },
    {
      q: '❓ How long does feedback take?',
      a: 'Standard: 5-7 business days | Rush: 2-3 business days (+£50). We provide detailed written feedback + optional coaching session.'
    }
  ]

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-grid">
        {faqs.map((item, i) => (
          <div key={i} className="faq-item">
            <div
              className={`faq-q ${expanded === i ? 'active' : ''}`}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <span>{item.q}</span>
              <span>{expanded === i ? '−' : '+'}</span>
            </div>
            {expanded === i && <div className="faq-a active">{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
