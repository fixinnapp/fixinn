import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import QRGenerator from './QRGenerator'

export default async function QRPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: locations } = await supabase
    .from('locations')
    .select('*')
    .order('name')

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet" />
      <div style={{ minHeight: '100vh', background: '#f7f8fc', fontFamily: '"DM Sans", sans-serif' }}>

        {/* Navbar */}
        <nav style={{
          background: '#ffffff',
          borderBottom: '1px solid #eaecf0',
          padding: '0 32px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky' as const,
          top: 0,
          zIndex: 10,
        }}>
          <img src="/logo.png" alt="FixInn" style={{ height: '26px' }} />
          <a href="/dashboard" style={{
            color: '#444',
            fontSize: '13px',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            ← Back to Reports
          </a>
        </nav>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#0D0D0D',
              margin: 0,
              letterSpacing: '-0.4px'
            }}>
              QR Codes
            </h1>
            <p style={{ color: '#888', fontSize: '15px', marginTop: '6px' }}>
              Print and place these at each location in your facility
            </p>
          </div>
          <QRGenerator locations={locations ?? []} />
        </div>
      </div>
    </>
  )
}