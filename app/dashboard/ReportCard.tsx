'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

interface Report {
  id: string
  issue_type: string
  description: string
  status: string
  assigned_to: string | null
  created_at: string
  locations: {
    name: string
    floor: string
    building: string
  } | null
}

interface StaffMember {
  id: string
  name: string
}

interface Props {
  report: Report
  staffList: StaffMember[]
}

export default function ReportCard({ report, staffList }: Props) {
  const [status, setStatus] = useState(report.status)
  const [assignedTo, setAssignedTo] = useState(report.assigned_to ?? '')
  const [previousStatus, setPreviousStatus] = useState(report.status)
  const [loading, setLoading] = useState(false)
  const [justChanged, setJustChanged] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

 async function updateStatus(newStatus: string) {
  setLoading(true)
  const updateData: Record<string, string | null> = { status: newStatus }
  
  if (newStatus === 'resolved') {
    updateData.resolved_at = new Date().toISOString()
  } else {
    updateData.resolved_at = null
  }

  const { error } = await supabase
    .from('reports')
    .update(updateData)
    .eq('id', report.id)

  if (!error) {
    setPreviousStatus(status)
    setStatus(newStatus)
    setJustChanged(true)
    setTimeout(() => setJustChanged(false), 5000)
  }
  setLoading(false)
  router.refresh()
}

  async function undoStatus() {
    setLoading(true)
    const { error } = await supabase
      .from('reports')
      .update({ status: previousStatus })
      .eq('id', report.id)

    if (!error) {
      setStatus(previousStatus)
      setJustChanged(false)
    }
    setLoading(false)
    router.refresh()
  }

  async function handleAssign(name: string) {
    setAssignedTo(name)
    await supabase
      .from('reports')
      .update({ assigned_to: name || null })
      .eq('id', report.id)
    router.refresh()
  }

  const statusConfig: Record<string, { label: string; dot: string; bg: string; text: string; border: string }> = {
    open: { label: 'Open', dot: '#f59e0b', bg: '#fffbeb', text: '#92400e', border: '#fde68a' },
    in_progress: { label: 'In Progress', dot: '#2B5BF5', bg: '#f0f4ff', text: '#1e40af', border: '#c7d7fd' },
    resolved: { label: 'Resolved', dot: '#10b981', bg: '#f0fdf4', text: '#065f46', border: '#bbf7d0' },
  }

  const current = statusConfig[status] ?? statusConfig.open

  const btnStyle = (color: string) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    border: `1.5px solid ${color}`,
    background: 'transparent',
    color: color,
    fontSize: '13px',
    fontWeight: '600' as const,
    fontFamily: '"DM Sans", sans-serif',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1,
    transition: 'all 0.15s',
  })

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '16px',
      padding: '22px 24px',
      border: '1px solid #eaecf0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      opacity: status === 'resolved' ? 0.65 : 1,
      transition: 'opacity 0.2s',
    }}>

      {/* Top row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap' as const,
        gap: '12px',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' as const }}>
          <span style={{
            background: '#f7f8fc',
            border: '1px solid #eaecf0',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            color: '#444',
          }}>
            {report.issue_type}
          </span>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            background: current.bg,
            color: current.text,
            border: `1px solid ${current.border}`,
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: current.dot,
              flexShrink: 0
            }} />
            {current.label}
          </span>

          {/* Assigned badge */}
          {assignedTo && (
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              background: '#f7f8fc',
              color: '#444',
              border: '1px solid #eaecf0',
            }}>
              👤 {assignedTo}
            </span>
          )}
        </div>

        <span style={{ color: '#bbb', fontSize: '12px', fontWeight: '500', flexShrink: 0 }}>
          {new Date(report.created_at).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
          })}
        </span>
      </div>

      {/* Description */}
      <p style={{
        color: '#333',
        fontSize: '15px',
        margin: '0 0 10px',
        lineHeight: '1.6',
      }}>
        {report.description}
      </p>

      {/* Location */}
      <p style={{
        color: '#aaa',
        fontSize: '13px',
        margin: '0 0 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{ color: '#2B5BF5' }}>📍</span>
        {report.locations?.name}
        {report.locations?.floor ? ` · ${report.locations.floor}` : ''}
        {report.locations?.building ? ` · ${report.locations.building}` : ''}
      </p>

      {/* Assign dropdown */}
      {staffList.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <select
            value={assignedTo}
            onChange={e => handleAssign(e.target.value)}
            style={{
              padding: '9px 14px',
              borderRadius: '8px',
              border: '1.5px solid #eaecf0',
              background: '#f7f8fc',
              fontSize: '13px',
              fontFamily: '"DM Sans", sans-serif',
              color: assignedTo ? '#0D0D0D' : '#aaa',
              fontWeight: '500',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="">Assign to...</option>
            {staffList.map(s => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Undo banner */}
      {justChanged && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#f7f8fc',
          borderRadius: '10px',
          padding: '10px 16px',
          fontSize: '13px',
          color: '#444',
          border: '1px solid #eaecf0',
          marginBottom: '12px',
        }}>
          <span>Status updated to <strong>{current.label}</strong></span>
          <button
            onClick={undoStatus}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: '#2B5BF5',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif',
              padding: '0',
              textDecoration: 'underline'
            }}
          >
            Undo
          </button>
        </div>
      )}

      {/* Action buttons */}
      {!justChanged && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
          {status === 'open' && (
            <>
              <button onClick={() => updateStatus('in_progress')} style={btnStyle('#2B5BF5')}>
                Mark in progress
              </button>
              <button onClick={() => updateStatus('resolved')} style={btnStyle('#10b981')}>
                Resolve directly
              </button>
            </>
          )}
          {status === 'in_progress' && (
            <>
              <button onClick={() => updateStatus('resolved')} style={btnStyle('#10b981')}>
                Mark resolved ✓
              </button>
              <button onClick={() => updateStatus('open')} style={btnStyle('#aaa')}>
                Back to open
              </button>
            </>
          )}
          {status === 'resolved' && (
            <button onClick={() => updateStatus('open')} style={btnStyle('#aaa')}>
              Reopen
            </button>
          )}
        </div>
      )}
    </div>
  )
}