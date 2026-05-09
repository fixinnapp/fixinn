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
        padding: '40px 32px',
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
            fontSize: '28px',
            fontWeight: '700',
            color: '#0D0D0D',
            margin: 0,
            letterSpacing: '-0.4px',
          }}
        >
          QR Codes
        </h1>

        <p
          style={{
            color: '#888',
            fontSize: '15px',
            marginTop: '6px',
          }}
        >
          Print and place these at each location in your facility
        </p>
      </div>

      {/* QR Generator */}
      <QRGenerator locations={locations ?? []} />
    </div>
  )
}