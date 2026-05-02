export default function Home() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a' }}>
        Fixlioo
      </h1>
      <p style={{ color: '#666', marginTop: '8px', fontSize: '16px' }}>
        Facility issue reporting — powered by QR & NFC
      </p>

      <div style={{ marginTop: '40px', padding: '24px', background: '#f5f5f5', borderRadius: '12px' }}>
        <p style={{ fontWeight: '600', marginBottom: '16px' }}>System status</p>
        <p>✅ Database connected</p>
        <p>✅ Multi-tenant architecture ready</p>
        <p>✅ Secure report submission enabled</p>
        <p>✅ Photo storage configured</p>
        <p>✅ Staff authentication ready</p>
      </div>

      <p style={{ marginTop: '40px', color: '#999', fontSize: '14px' }}>
        MVP in development — Phase 4 of 7
      </p>
    </div>
  )
}