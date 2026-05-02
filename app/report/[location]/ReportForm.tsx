'use client'

import { useState } from 'react'
import { supabase } from '@/app/lib/supabase'

interface Props {
  locationId: string
  organizationId: string
}

const issueTypes = [
  { value: 'Plumbing', emoji: '🚿', label: 'Plumbing' },
  { value: 'Electrical', emoji: '💡', label: 'Electrical' },
  { value: 'Cleaning', emoji: '🧹', label: 'Cleaning' },
  { value: 'Equipment', emoji: '🔧', label: 'Equipment' },
  { value: 'Safety', emoji: '⚠️', label: 'Safety' },
  { value: 'Other', emoji: '📦', label: 'Other' },
]

export default function ReportForm({ locationId, organizationId }: Props) {
  const [issueType, setIssueType] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!issueType || !description) {
      setError('Please select an issue type and describe the problem.')
      return
    }
    setError('')
    setLoading(true)

    const { error: submitError } = await supabase.from('reports').insert({
      location_id: locationId,
      organization_id: organizationId,
      issue_type: issueType,
      description,
      reporter_email: email || null,
      status: 'open',
    })

    setLoading(false)
    if (submitError) {
      setError('Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '48px 32px',
        textAlign: 'center',
        border: '1px solid #eaecf0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          background: '#f0f4ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '32px'
        }}>✅</div>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0D0D0D', margin: 0 }}>
          Report submitted
        </h2>
        <p style={{ color: '#888', marginTop: '10px', fontSize: '15px', lineHeight: '1.6', maxWidth: '320px', margin: '10px auto 0' }}>
          Your report has been received. The facility team will look into this shortly.
        </p>
        <div style={{ marginTop: '32px' }}>
          <img src="/logo.png" alt="FixInn" style={{ height: '32px', opacity: 0.5 }} />
        </div>
      </div>
    )
  }

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600' as const,
    color: '#0D0D0D',
    marginBottom: '12px',
  }

  const inputStyle = {
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    border: '1.5px solid #eaecf0',
    fontSize: '15px',
    fontFamily: '"DM Sans", sans-serif',
    background: '#f7f8fc',
    color: '#0D0D0D',
    outline: 'none',
    boxSizing: 'border-box' as const,
    lineHeight: '1.5',
  }

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #eaecf0',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>

      {/* Issue type */}
      <div style={cardStyle}>
        <label style={labelStyle}>
          What type of issue is this? <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {issueTypes.map(type => (
            <button
              key={type.value}
              onClick={() => setIssueType(type.value)}
              style={{
                padding: '14px 12px',
                borderRadius: '12px',
                border: issueType === type.value
                  ? '2px solid #2B5BF5'
                  : '1.5px solid #eaecf0',
                background: issueType === type.value ? '#2B5BF5' : '#f7f8fc',
                color: issueType === type.value ? '#ffffff' : '#444',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: '"DM Sans", sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s',
                textAlign: 'left' as const,
              }}
            >
              <span style={{ fontSize: '18px' }}>{type.emoji}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div style={cardStyle}>
        <label style={labelStyle}>
          Describe the issue <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="e.g. The tap in the kitchen sink is leaking, water is pooling on the floor..."
          rows={4}
          style={{ ...inputStyle, resize: 'none' as const }}
        />
      </div>

      {/* Email */}
      <div style={cardStyle}>
        <label style={labelStyle}>
          Your email
          <span style={{ fontWeight: '400', color: '#aaa', fontSize: '13px', marginLeft: '6px' }}>
            (optional)
          </span>
        </label>
        <p style={{ fontSize: '13px', color: '#aaa', margin: '0 0 12px', lineHeight: '1.5' }}>
          Only used if the team needs to follow up with you.
        </p>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={inputStyle}
        />
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: '#fff5f5',
          border: '1px solid #fed7d7',
          borderRadius: '10px',
          padding: '14px 16px',
          color: '#c53030',
          fontSize: '14px',
          fontWeight: '500',
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%',
          padding: '18px',
          background: loading ? '#93b0fa' : '#2B5BF5',
          color: '#ffffff',
          border: 'none',
          borderRadius: '14px',
          fontSize: '16px',
          fontWeight: '700',
          fontFamily: '"DM Sans", sans-serif',
          cursor: loading ? 'not-allowed' : 'pointer',
          letterSpacing: '0.2px',
          transition: 'background 0.2s',
          boxShadow: loading ? 'none' : '0 4px 16px rgba(43,91,245,0.3)',
        }}
      >
        {loading ? 'Submitting...' : 'Submit report →'}
      </button>

      <p style={{ textAlign: 'center', color: '#ccc', fontSize: '12px', margin: 0 }}>
        Powered by FixInn
      </p>
    </div>
  )
}