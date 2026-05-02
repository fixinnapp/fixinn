export default function Home() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: '"DM Sans", sans-serif', background: '#ffffff', minHeight: '100vh' }}>

        {/* Navbar */}
        <nav style={{
          padding: '0 40px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #eaecf0',
          background: '#ffffff',
          position: 'sticky' as const,
          top: 0,
          zIndex: 10,
        }}>
          <img src="/logo.png" alt="FixInn" style={{ height: '40px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="/login" style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: '1.5px solid #eaecf0',
              background: '#ffffff',
              color: '#444',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
            }}>
              Staff login
            </a>
            <a href="mailto:aygulismayilova99@gmail.com" style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              background: '#2B5BF5',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(43,91,245,0.25)',
            }}>
              Request a demo →
            </a>
          </div>
        </nav>

        {/* Hero */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '100px 24px 80px',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f0f4ff',
            padding: '6px 16px',
            borderRadius: '20px',
            marginBottom: '28px',
          }}>
            <div style={{ width: '8px', height: '8px', background: '#2B5BF5', borderRadius: '50%' }} />
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#2B5BF5' }}>
              Now available in Norway
            </span>
          </div>

          <h1 style={{
            fontSize: '64px',
            fontWeight: '800',
            color: '#0D0D0D',
            margin: '0 0 24px',
            letterSpacing: '-2px',
            lineHeight: '1.05',
          }}>
            Facility issues,<br />
            <span style={{ color: '#2B5BF5' }}>reported instantly.</span>
          </h1>

          <p style={{
            fontSize: '20px',
            color: '#666',
            maxWidth: '580px',
            margin: '0 auto 48px',
            lineHeight: '1.6',
          }}>
            Place a QR code on the wall. Staff and guests scan it to report problems in seconds — no app, no login, no back-and-forth emails.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <a href="mailto:aygulismayilova99@gmail.com" style={{
              padding: '16px 32px',
              borderRadius: '14px',
              background: '#2B5BF5',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(43,91,245,0.3)',
            }}>
              Get a free pilot →
            </a>
            <a href="/report/main-lobby" style={{
              padding: '16px 32px',
              borderRadius: '14px',
              background: '#f7f8fc',
              color: '#444',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              border: '1.5px solid #eaecf0',
            }}>
              See a demo form
            </a>
          </div>
        </div>

        {/* How it works */}
        <div style={{
          background: '#f7f8fc',
          borderTop: '1px solid #eaecf0',
          borderBottom: '1px solid #eaecf0',
          padding: '80px 24px',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: '700',
              color: '#2B5BF5',
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              marginBottom: '16px',
            }}>
              How it works
            </p>
            <h2 style={{
              textAlign: 'center',
              fontSize: '40px',
              fontWeight: '800',
              color: '#0D0D0D',
              margin: '0 0 56px',
              letterSpacing: '-1px',
            }}>
              Three steps. That's it.
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}>
              {[
                {
                  step: '01',
                  title: 'Scan',
                  description: 'Someone spots a problem and scans the QR code on the wall. Opens instantly in their browser.',
                  emoji: '📱',
                },
                {
                  step: '02',
                  title: 'Report',
                  description: 'They select the issue type, describe the problem, and hit submit. Takes under 30 seconds.',
                  emoji: '📝',
                },
                {
                  step: '03',
                  title: 'Fix',
                  description: 'The facility manager sees it instantly in their dashboard with location, time, and details already filled in.',
                  emoji: '🔧',
                },
              ].map(item => (
                <div key={item.step} style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid #eaecf0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    background: '#f0f4ff',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginBottom: '20px',
                  }}>
                    {item.emoji}
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#2B5BF5', letterSpacing: '1px', margin: '0 0 8px' }}>
                    STEP {item.step}
                  </p>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#0D0D0D', margin: '0 0 12px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who it's for */}
        <div style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: '700',
              color: '#2B5BF5',
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              marginBottom: '16px',
            }}>
              Who it's for
            </p>
            <h2 style={{
              textAlign: 'center',
              fontSize: '40px',
              fontWeight: '800',
              color: '#0D0D0D',
              margin: '0 0 56px',
              letterSpacing: '-1px',
            }}>
              Built for any facility.
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}>
              {[
                { emoji: '🏨', title: 'Hotels', description: 'Guests and housekeeping report room and common area issues instantly.' },
                { emoji: '🏢', title: 'Office buildings', description: 'Staff report maintenance issues without calling or emailing anyone.' },
                { emoji: '🏫', title: 'Schools', description: 'Teachers and students flag facility problems across the whole campus.' },
                { emoji: '🏋️', title: 'Gyms & sports centers', description: 'Members report broken equipment before it becomes a bigger problem.' },
                { emoji: '🏪', title: 'Shopping centers', description: 'Tenants and visitors report shared area issues to one central team.' },
                { emoji: '🏗️', title: 'Property managers', description: 'Manage multiple buildings from one dashboard with full history.' },
              ].map(item => (
                <div key={item.title} style={{
                  background: '#f7f8fc',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #eaecf0',
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.emoji}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0D0D0D', margin: '0 0 8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: '#0D0D0D',
          padding: '80px 24px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '44px',
              fontWeight: '800',
              color: '#ffffff',
              margin: '0 0 16px',
              letterSpacing: '-1px',
            }}>
              Ready to try it?
            </h2>
            <p style={{ fontSize: '18px', color: '#888', margin: '0 0 40px', lineHeight: '1.6' }}>
              We're offering free pilots to facilities in Norway. Get set up in 30 minutes — we place the QR codes ourselves.
            </p>
            <a href="mailto:aygulismayilova99@gmail.com" style={{
              display: 'inline-block',
              padding: '18px 40px',
              borderRadius: '14px',
              background: '#2B5BF5',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(43,91,245,0.4)',
            }}>
              Request a free pilot →
            </a>
            <p style={{ color: '#555', fontSize: '13px', marginTop: '20px' }}>
              No commitment. No credit card. Just a working system in your facility.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '24px 40px',
          borderTop: '1px solid #eaecf0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <img src="/logo.png" alt="FixInn" style={{ height: '28px' }} />
          <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>
            © 2026 FixInn · SCAN. REPORT. FIX.
          </p>
        </div>

      </div>
    </>
  )
}