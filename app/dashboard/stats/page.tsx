import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import StatsCharts from './StatsCharts'

export default async function StatsPage() {
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

  const { data: reports } = await supabase
    .from('reports')
    .select(
      '*, locations(name, floor, building)'
    )
    .order('created_at', {
      ascending: false,
    })

  const total = reports?.length ?? 0

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

  const resolvedReports =
    reports?.filter(
      (r) => r.resolved_at && r.created_at
    ) ?? []

  const avgResolutionHours =
    resolvedReports.length > 0
      ? Math.round(
          resolvedReports.reduce(
            (sum, r) => {
              const diff =
                new Date(
                  r.resolved_at
                ).getTime() -
                new Date(
                  r.created_at
                ).getTime()

              return (
                sum +
                diff /
                  (1000 * 60 * 60)
              )
            },
            0
          ) / resolvedReports.length
        )
      : null

  const issueTypeCounts =
    reports?.reduce((acc, r) => {
      acc[r.issue_type] =
        (acc[r.issue_type] ?? 0) + 1

      return acc
    }, {} as Record<string, number>) ?? {}

  const issueTypeData = (
    Object.entries(
      issueTypeCounts
    ) as [string, number][]
  )
    .map(([type, count]) => ({
      type,
      count,
    }))
    .sort(
      (a, b) => b.count - a.count
    )

  const locationCounts =
    reports?.reduce((acc, r) => {
      const locationInfo =
        Array.isArray(r.locations)
          ? r.locations[0]
          : r.locations

      const name =
        locationInfo?.name ??
        'Unknown'

      acc[name] =
        (acc[name] ?? 0) + 1

      return acc
    }, {} as Record<string, number>) ??
    {}

  const locationData = (
    Object.entries(
      locationCounts
    ) as [string, number][]
  )
    .map(([location, count]) => ({
      location,
      count,
    }))
    .sort(
      (a, b) => b.count - a.count
    )
    .slice(0, 6)

  const weeklyData = Array.from(
    { length: 8 },
    (_, i) => {
      const weekStart = new Date()

      weekStart.setDate(
        weekStart.getDate() -
          7 * (7 - i)
      )

      weekStart.setHours(
        0,
        0,
        0,
        0
      )

      const weekEnd = new Date(
        weekStart
      )

      weekEnd.setDate(
        weekEnd.getDate() + 7
      )

      const count =
        reports?.filter((r) => {
          const d = new Date(
            r.created_at
          )

          return (
            d >= weekStart &&
            d < weekEnd
          )
        }).length ?? 0

      return {
        week:
          weekStart.toLocaleDateString(
            'en-GB',
            {
              day: 'numeric',
              month: 'short',
            }
          ),
        count,
      }
    }
  )

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
          }}
        >
          Statistics
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
          Overview of facility issues
          and performance
        </p>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
          width: '100%',
        }}
      >
        {[
          {
            label: 'Total reports',
            value: total,
            color: '#0D0D0D',
            bg: '#ffffff',
            border: '#eaecf0',
          },
          {
            label: 'Open',
            value: open,
            color: '#92400e',
            bg: '#fffbeb',
            border: '#fde68a',
          },
          {
            label: 'In progress',
            value: inProgress,
            color: '#1e40af',
            bg: '#f0f4ff',
            border: '#c7d7fd',
          },
          {
            label: 'Resolved',
            value: resolved,
            color: '#065f46',
            bg: '#f0fdf4',
            border: '#bbf7d0',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: stat.bg,
              borderRadius: '14px',
              padding:
                'clamp(16px, 3vw, 24px)',
              border: `1px solid ${stat.border}`,
              minWidth: 0,
            }}
          >
            <p
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#888',
                margin: '0 0 8px',
              }}
            >
              {stat.label}
            </p>

            <p
              style={{
                fontSize:
                  'clamp(28px, 6vw, 36px)',
                fontWeight: '800',
                color: stat.color,
                margin: 0,
                letterSpacing: '-1px',
                wordBreak: 'break-word',
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Average Resolution */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding:
            'clamp(18px, 4vw, 24px)',
          border: '1px solid #eaecf0',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            background: '#f0f4ff',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            flexShrink: 0,
          }}
        >
          ⏱️
        </div>

        <div
          style={{
            flex: '1 1 220px',
            minWidth: 0,
          }}
        >
          <p
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#888',
              margin: '0 0 4px',
            }}
          >
            Average resolution time
          </p>

          <p
            style={{
              fontSize:
                'clamp(22px, 5vw, 28px)',
              fontWeight: '800',
              color: '#0D0D0D',
              margin: 0,
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
              wordBreak: 'break-word',
            }}
          >
            {avgResolutionHours !== null
              ? avgResolutionHours < 1
                ? 'Less than 1 hour'
                : avgResolutionHours <
                    24
                  ? `${avgResolutionHours} hours`
                  : avgResolutionHours <
                      48
                    ? `1 day ${
                        avgResolutionHours %
                        24
                      } hours`
                    : `${Math.floor(
                        avgResolutionHours /
                          24
                      )} days ${
                        avgResolutionHours %
                        24
                      } hours`
              : 'No resolved reports yet'}
          </p>
        </div>

        {resolved > 0 && (
          <div
            style={{
              marginLeft: 'auto',
              minWidth: '90px',
            }}
          >
            <p
              style={{
                fontSize: '13px',
                color: '#888',
                margin: '0 0 4px',
              }}
            >
              Resolution rate
            </p>

            <p
              style={{
                fontSize:
                  'clamp(24px, 5vw, 28px)',
                fontWeight: '800',
                color: '#065f46',
                margin: 0,
              }}
            >
              {total > 0
                ? Math.round(
                    (resolved /
                      total) *
                      100
                  )
                : 0}
              %
            </p>
          </div>
        )}
      </div>

      <StatsCharts
        issueTypeData={issueTypeData}
        locationData={locationData}
        weeklyData={weeklyData}
      />
    </div>
  )
}