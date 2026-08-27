import { Link, useNavigate } from 'react-router-dom'
import '../styles/Header.module.css'

export default function Header({ onBookingClick }) {
  return (
    <header className="header">
      <h1>🎓 SabiPath</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/pricing" className="nav-link">Pricing</Link>
        <Link to="/faq" className="nav-link">FAQ</Link>
        <button onClick={onBookingClick} className="nav-cta">Contact</button>
      </nav>
    </header>
  )
}
