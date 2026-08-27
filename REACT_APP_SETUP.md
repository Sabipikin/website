# SabiPath React Web App - Complete Setup Guide

## 🚀 Quick Start

Your React web app is ready to build! Follow these steps:

### Step 1: Install Dependencies
```bash
cd react-app
npm install
```

### Step 2: Create Environment File
Create `.env` in `react-app/`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
VITE_API_URL=http://localhost:3000
```

### Step 3: Start Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Step 4: Build for Production
```bash
npm run build
```
Creates optimized `dist/` folder for deployment

---

## 📁 Project Structure

```
react-app/
├── index.html              # Entry HTML
├── vite.config.js          # Vite config
├── package.json            # Dependencies
├── .env                    # Environment variables (create this)
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app component
    ├── styles/
    │   └── index.css       # Global styles
    ├── components/
    │   ├── Header.jsx      # Navigation header
    │   ├── Hero.jsx        # Hero section
    │   ├── PricingCards.jsx # Pricing tier cards
    │   ├── AssessmentSelector.jsx # Single assessment selector
    │   ├── BookingModal.jsx # Calendly + Stripe modal
    │   ├── FAQ.jsx         # FAQ accordion
    │   └── Footer.jsx      # Footer
    └── pages/
        ├── Home.jsx        # Home page
        ├── Pricing.jsx     # Pricing page
        └── FAQ.jsx         # FAQ page
```

---

## 🛠️ Key Dependencies

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Vite** - Fast build tool
- **Stripe React** - Payment processing
- **Axios** - HTTP requests

---

## 🎯 Component Breakdown

### Header.jsx
- Sticky navigation
- Links to Home, Pricing, FAQ
- Contact button

### Hero.jsx
- Banner image background
- Main headline + CTA
- Option selector (Annual vs Single)

### PricingCards.jsx
- 3 annual tiers (Basic, Regular, Premium)
- Visual highlighting for "Most Popular"
- Feature lists

### AssessmentSelector.jsx
- Service type selector (Essay, Chapter, Defense, Bulk)
- Turnaround selector (Standard, Rush)
- Real-time price calculator
- Assessment type cards

### BookingModal.jsx
- Calendly embedded widget
- Stripe payment form with card element
- Form validation
- Success/error handling

### FAQ.jsx
- Accordion toggle
- 6 key questions
- Expandable answers

---

## 🔑 Configuration

### Environment Variables
Create `.env`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_API_URL=http://localhost:3000
VITE_CALENDLY_URL=https://calendly.com/your-username/consultation
```

### Stripe Setup
1. Get Publishable Key from Stripe Dashboard
2. Add to `.env`
3. For payments, need backend endpoint `/create-payment-intent`

### Calendly Setup
1. Get your Calendly URL
2. Add to `.env`
3. Will embed in modal

---

## 📦 Complete Component Template

Here's the full component structure (files to create):

```jsx
// src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/Header.module.css'

export default function Header({ onBookingClick }) {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <h1>🎓 SabiPath</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/faq">FAQ</Link>
        <button onClick={onBookingClick} className={styles.cta}>
          Book Consultation
        </button>
      </nav>
    </header>
  )
}
```

```jsx
// src/components/Hero.jsx
export default function Hero({ onModeSwitch }) {
  return (
    <section className="hero">
      <div className="hero-banner" />
      <div className="hero-content">
        <h2>Master Your MSc. Defend With Confidence.</h2>
        <p>Expert coaching & feedback from start to finish...</p>
        <div className="option-buttons">
          <button onClick={() => onModeSwitch('annual')}>
            📅 Annual Membership
          </button>
          <button onClick={() => onModeSwitch('single')}>
            📋 Single Assessment
          </button>
        </div>
      </div>
    </section>
  )
}
```

```jsx
// src/components/BookingModal.jsx
import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

export default function BookingModal({ isOpen, onClose, mode, tier }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!stripe || !elements) return

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: e.target.name.value,
        email: e.target.email.value,
      }
    })

    if (stripeError) {
      setError(stripeError.message)
      setLoading(false)
      return
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: mode === 'annual' ? 300000 : 18000,
          service: mode
        })
      })

      const data = await response.json()
      if (data.success) {
        alert('✅ Payment successful!')
        onClose()
      } else {
        setError('Payment failed. Please try again.')
      }
    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h2>Book Your Consultation</h2>
        <p>Let's discuss your needs and find the right plan.</p>

        {/* Calendly Widget */}
        <div className="calendly-widget">
          <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
          <div className="calendly-inline-widget" 
               data-url={import.meta.env.VITE_CALENDLY_URL}
               style={{ minWidth: '320px', height: '600px' }} />
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment}>
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <CardElement />
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Pay & Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

---

## 🚢 Deployment Options

### Option 1: Netlify (Recommended)
```bash
npm run build
# Drag dist/ folder to Netlify
```

### Option 2: Vercel
```bash
npm install -g vercel
vercel
```

### Option 3: GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

---

## 📋 Environment Variables Checklist

- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` - From Stripe Dashboard
- [ ] `VITE_API_URL` - Backend payment endpoint
- [ ] `VITE_CALENDLY_URL` - Your Calendly booking link

---

## 🔒 Security Checklist

- [ ] Never commit `.env` file
- [ ] Add `.env` to `.gitignore`
- [ ] Use `VITE_` prefix for public env vars only
- [ ] Never expose Stripe Secret Key
- [ ] Enable HTTPS in production

---

## 🛠️ Building the Components

To complete the React app, create these files:

1. **src/components/Header.jsx** - Navigation
2. **src/components/Hero.jsx** - Hero section with option selector
3. **src/components/PricingCards.jsx** - Annual tier cards
4. **src/components/AssessmentSelector.jsx** - Single assessment calculator
5. **src/components/BookingModal.jsx** - Calendly + Stripe integration
6. **src/components/FAQ.jsx** - Accordion FAQ
7. **src/components/Footer.jsx** - Footer with links
8. **src/pages/Home.jsx** - Home page layout
9. **src/pages/Pricing.jsx** - Pricing page with both options
10. **src/pages/FAQ.jsx** - Full FAQ page
11. **src/styles/index.css** - Global styles (copy from static version)
12. **src/styles/components.module.css** - Component styles

---

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Create `.env` file with your keys
3. Create all component files (see template above)
4. Create style files
5. Run `npm run dev`
6. Test locally at `http://localhost:5173`
7. Deploy: `npm run build && deploy dist/`

---

## 📚 Useful Resources

- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Vite Guide](https://vitejs.dev)
- [Stripe React SDK](https://stripe.com/docs/stripe-js/react)
- [Calendly API](https://calendly.com/integrations)

---

**Ready to build?** Start with `npm install` and create the first component!
