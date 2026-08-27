import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

export default function BookingModal({ isOpen, onClose, mode, tier }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [step, setStep] = useState('booking')

  if (!isOpen) return null

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)
    const name = e.target.fullName?.value || 'Guest'
    const email = e.target.email?.value || ''

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { name, email }
    })

    if (stripeError) {
      setError(stripeError.message)
      setLoading(false)
      return
    }

    try {
      const amount = mode === 'annual' ? 300000 : 18000
      alert('✅ Booking confirmed! We will contact you within 24 hours.\n\nEmail: ' + email)
      onClose()
    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {step === 'booking' && (
          <>
            <h2>📅 Schedule Your Consultation</h2>
            <p>Pick a time that works for you. We'll discuss your needs and recommend the best plan.</p>

            <div className="calendly-widget">
              <p style={{ textAlign: 'center', color: '#999', fontSize: '0.9em' }}>
                🔗 Calendly widget embedded here
              </p>
              <p style={{ textAlign: 'center', color: '#666', fontSize: '0.85em', marginTop: '20px' }}>
                ⏰ 30-minute call • No credit card required • Receive Zoom link via email
              </p>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={() => setStep('payment')}
            >
              Proceed to Payment
            </button>
          </>
        )}

        {step === 'payment' && (
          <>
            <h2>💳 Complete Your Payment</h2>
            <p>Secure your spot for the consultation.</p>

            <form onSubmit={handlePayment}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '12px', width: '100%' }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '12px', width: '100%' }}
              />

              <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
                <CardElement />
              </div>

              {error && <div style={{ color: 'red', marginBottom: '12px', fontSize: '0.9em' }}>{error}</div>}

              <div style={{ background: '#f9f9f9', padding: '16px', borderRadius: '6px', marginBottom: '12px', borderLeft: '4px solid #b8860b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Service:</span>
                  <span style={{ fontWeight: 'bold' }}>{mode === 'annual' ? 'Annual Membership' : 'Single Assessment'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3em', fontWeight: 'bold', color: '#b8860b' }}>
                  <span>Total:</span>
                  <span>£{mode === 'annual' ? '3,000' : '180'}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }} disabled={loading}>
                {loading ? 'Processing...' : 'Pay & Secure Spot'}
              </button>

              <p style={{ color: '#999', fontSize: '0.85em', textAlign: 'center', marginTop: '12px' }}>
                🔒 Secure payment • Stripe secured • Receipt emailed immediately
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
