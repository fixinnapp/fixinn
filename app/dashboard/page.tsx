import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import ReportCard from './ReportCard'

export default async function DashboardPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              cookieStore.set(
                name,
                value,
                options
              )
            }
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: reports } = await supabase
    .from('reports')
    .select(
      '*, locations(name, floor, building)'
    )
    .order('created_at', {
      ascending: false,
    })

  const { data: staffList } = await supabase
    .from('staff')
    .select('id, name')
    .order('name')

  const open =
    reports?.filter(
      (r) => r.status === 'open'
    ).length ?? 0

  const inProgress =
    reports?.filter(
      (r) => r.status === 'in_progress'
    ).length ?? 0

  const resolved =
    reports?.filter(
      (r) => r.status === 'resolved'
    ).length ?? 0

  return (
    <div
      style={{
        padding:
          'clamp(20px, 4vw, 40px) clamp(16px, 4vw, 32px)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
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
          }}
        >
          Reports
        </h1>

        <p
          style={{
            color: '#888',
            fontSize:
              'clamp(14px, 3vw, 15px)',
            marginTop: '6px',
            lineHeight: 1.5,
          }}
        >
          All facility issues reported via
          QR scan
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
          width: '100%',
        }}
      >
        {[
          {
            label: 'Open',
            value: open,
            dot: '#f59e0b',
            bg: '#fffbeb',
            border: '#fde68a',
            text: '#92400e',
          },
          {
            label: 'In progress',
            value: inProgress,
            dot: '#2B5BF5',
            bg: '#f0f4ff',
            border: '#c7d7fd',
            text: '#1e40af',
          },
          {
            label: 'Resolved',
            value: resolved,
            dot: '#10b981',
            bg: '#f0fdf4',
            border: '#bbf7d0',
            text: '#065f46',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding:
                'clamp(16px, 3vw, 24px)',
              border:
                '1px solid #eaecf0',
              boxShadow:
                '0 1px 4px rgba(0,0,0,0.04)',
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: stat.dot,
                  flexShrink: 0,
                }}
              />

              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#888',
                }}
              >
                {stat.label}
              </span>
            </div>

            <p
              style={{
                fontSize:
                  'clamp(28px, 6vw, 32px)',
                fontWeight: '700',
                color: '#0D0D0D',
                margin: 0,
                letterSpacing: '-0.5px',
                wordBreak: 'break-word',
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Reports */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
        }}
      >
        {reports && reports.length > 0 ? (
          reports.map((report) => (
            <ReportCard
              key={`${report.id}-${report.status}`}
              report={report}
              staffList={staffList ?? []}
            />
          ))
        ) : (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding:
                'clamp(32px, 8vw, 64px) clamp(20px, 5vw, 48px)',
              textAlign: 'center',
              border:
                '1px solid #eaecf0',
            }}
          >
            <p
              style={{
                fontSize:
                  'clamp(28px, 8vw, 32px)',
                marginBottom: '12px',
              }}
            >
              📭
            </p>

            <p
              style={{
                fontSize:
                  'clamp(16px, 4vw, 17px)',
                fontWeight: '600',
                color: '#0D0D0D',
                margin: 0,
              }}
            >
              No reports yet
            </p>

            <p
              style={{
                fontSize:
                  'clamp(13px, 3vw, 14px)',
                color: '#aaa',
                marginTop: '6px',
                lineHeight: 1.5,
              }}
            >
              Reports will appear here when
              someone scans a QR code
            </p>
          </div>
        )}
      </div>
    </div>
  )
}