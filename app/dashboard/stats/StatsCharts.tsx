'use client'

interface IssueTypeData {
  type: string
  count: number
}

interface LocationData {
  location: string
  count: number
}

interface WeeklyData {
  week: string
  count: number
}

interface Props {
  issueTypeData: IssueTypeData[]
  locationData: LocationData[]
  weeklyData: WeeklyData[]
}

const COLORS: Record<string, string> = {
  Plumbing: '#2B5BF5',
  Electrical: '#f59e0b',
  Cleaning: '#10b981',
  Equipment: '#8b5cf6',
  Safety: '#ef4444',
  Other: '#6b7280',
}

export default function StatsCharts({ issueTypeData, locationData, weeklyData }: Props) {
  const maxIssue = Math.max(...issueTypeData.map(d => d.count), 1)
  const maxLocation = Math.max(...locationData.map(d => d.count), 1)
  const maxWeekly = Math.max(...weeklyData.map(d => d.count), 1)

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #eaecf0',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '24px' }}>

      {/* Issue types + Locations side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Issue type breakdown */}
        <div style={cardStyle}>
          <p style={{ fontSize: '15px', fontWeight: '700', color: '#0D0D0D', margin: '0 0 20px' }}>
            Issues by type
          </p>
          {issueTypeData.length === 0 ? (
            <p style={{ color: '#aaa', fontSize: '14px' }}>No data yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
              {issueTypeData.map(item => (
                <div key={item.type}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>{item.type}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0D0D0D' }}>{item.count}</span>
                  </div>
                  <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(item.count / maxIssue) * 100}%`,
                      background: COLORS[item.type] ?? '#2B5BF5',
                      borderRadius: '4px',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Most problematic locations */}
        <div style={cardStyle}>
          <p style={{ fontSize: '15px', fontWeight: '700', color: '#0D0D0D', margin: '0 0 20px' }}>
            Most reported locations
          </p>
          {locationData.length === 0 ? (
            <p style={{ color: '#aaa', fontSize: '14px' }}>No data yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
              {locationData.map((item, i) => (
                <div key={item.location}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>{item.location}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0D0D0D' }}>{item.count}</span>
                  </div>
                  <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(item.count / maxLocation) * 100}%`,
                      background: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#2B5BF5',
                      borderRadius: '4px',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Weekly trend */}
      <div style={cardStyle}>
        <p style={{ fontSize: '15px', fontWeight: '700', color: '#0D0D0D', margin: '0 0 24px' }}>
          Reports over time (last 8 weeks)
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '140px' }}>
          {weeklyData.map((item, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#0D0D0D' }}>
                {item.count > 0 ? item.count : ''}
              </span>
              <div style={{
                width: '100%',
                height: `${Math.max((item.count / maxWeekly) * 100, item.count > 0 ? 8 : 2)}%`,
                background: item.count > 0 ? '#2B5BF5' : '#f0f0f0',
                borderRadius: '6px 6px 0 0',
                transition: 'height 0.5s ease',
                minHeight: '4px',
              }} />
              <span style={{ fontSize: '10px', color: '#aaa', textAlign: 'center' as const, lineHeight: '1.2' }}>
                {item.week}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}