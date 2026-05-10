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
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: locations } = await supabase
    .from('locations')
    .select('*')
    .order('name')

  return (
    <div
      style={{
        padding:
          'clamp(20px, 4vw, 40px) clamp(16px, 4vw, 32px)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '32px',
        }}
      >
        <h1
          style={{
            fontSize:
              'clamp(24px, 5vw, 28px)',
            fontWeight: '700',
            color: '#0D0D0D',
            margin: 0,
            letterSpacing: '-0.4px',
            lineHeight: 1.1,
            wordBreak: 'break-word',
          }}
        >
          QR Codes
        </h1>

        <p
          style={{
            color: '#888',
            fontSize:
              'clamp(14px, 3vw, 15px)',
            marginTop: '6px',
            lineHeight: 1.5,
            maxWidth: '720px',
          }}
        >
          Print and place these at each
          location in your facility
        </p>
      </div>

      {/* QR Generator */}
      <div
        style={{
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <QRGenerator
          locations={locations ?? []}
        />
      </div>
    </div>
  )
}