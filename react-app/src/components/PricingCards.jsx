export default function PricingCards({ onBook }) {
  const tiers = [
    {
      name: 'Basic',
      price: '£2,500',
      features: [
        '1 feedback round per assignment',
        '1 thesis coaching session',
        'Written presentation prep notes',
        'Full dissertation through defense'
      ],
      tier: 'basic'
    },
    {
      name: 'Regular',
      price: '£3,000',
      badge: '⭐ MOST POPULAR',
      features: [
        '3 feedback rounds per assignment',
        '2 thesis coaching sessions',
        '20 slides/year + 1 coaching',
        'Full dissertation through defense',
        '50% discount on rush fees'
      ],
      tier: 'regular',
      highlighted: true
    },
    {
      name: 'Premium',
      price: '£3,500',
      features: [
        'Unlimited feedback rounds',
        'Unlimited coaching sessions',
        'Unlimited presentations coaching',
        'Full dissertation through defense',
        'No rush fees • Priority support'
      ],
      tier: 'premium'
    }
  ]

  return (
    <div className="pricing-section">
      <h2>Choose Your Support Level</h2>
      <p>Three tiers of MSc coaching, feedback, and thesis support. All run for the full academic year.</p>

      <div className="pricing-grid">
        {tiers.map((tier) => (
          <div key={tier.tier} className={`tier-card ${tier.highlighted ? 'highlighted' : ''}`}>
            {tier.badge && <span className="tier-badge">{tier.badge}</span>}
            <h3 className="tier-name">{tier.name}</h3>
            <div className="tier-price">{tier.price}</div>
            <p className="tier-subtitle">Annual support for your MSc</p>
            <ul className="tier-features">
              {tier.features.map((feature, i) => (
                <li key={i}>✓ {feature}</li>
              ))}
            </ul>
            <button
              className="tier-cta"
              onClick={() => onBook(tier.tier, 'annual')}
            >
              {tier.name === 'Regular' ? 'Start Now' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

      <div className="payment-plans">
        <h3>💳 Payment Plans</h3>
        <div className="plans-grid">
          <div>
            <strong>Pay in Full</strong>
            <p>100% upfront for all tiers</p>
          </div>
          <div>
            <strong>Two-Part Plan</strong>
            <p>50% before start / 50% in 6 months</p>
          </div>
          <div>
            <strong>Custom Arrangement</strong>
            <p>Available on all tiers</p>
          </div>
        </div>
      </div>
    </div>
  )
}
