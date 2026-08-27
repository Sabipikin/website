import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import Header from './components/Header'
import Hero from './components/Hero'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import FAQ from './pages/FAQ'
import BookingModal from './components/BookingModal'
import Footer from './components/Footer'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo')

function App() {
  const [showBooking, setShowBooking] = useState(false)
  const [mode, setMode] = useState('annual')
  const [selectedTier, setSelectedTier] = useState('regular')

  const handleBooking = (tier = null, m = null) => {
    if (tier) setSelectedTier(tier)
    if (m) setMode(m)
    setShowBooking(true)
  }

  return (
    <Router>
      <div className="app">
        <Header onBookingClick={() => handleBooking()} />
        <Routes>
          <Route path="/" element={<Home onBooking={handleBooking} />} />
          <Route path="/pricing" element={<Pricing onBooking={handleBooking} />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />

        {showBooking && (
          <Elements stripe={stripePromise}>
            <BookingModal
              isOpen={showBooking}
              onClose={() => setShowBooking(false)}
              mode={mode}
              tier={selectedTier}
            />
          </Elements>
        )}
      </div>
    </Router>
  )
}

export default App
