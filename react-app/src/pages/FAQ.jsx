import FAQComponent from '../components/FAQ'

export default function FAQPage() {
  return (
    <main style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#1f3b57', marginBottom: '40px' }}>Frequently Asked Questions</h1>
        <FAQComponent />
      </div>
    </main>
  )
}
