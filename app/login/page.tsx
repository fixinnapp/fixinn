'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogin() {
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setError('')
    setLoading(true)

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)
    if (loginError) {
      setError('Invalid email or password. Please try again.')
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet" />
      <div style={{
        minHeight: '100vh',
        background: '#f7f8fc',
        fontFamily: '"DM Sans", sans-serif',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}>

        {/* Logo above card */}
        <img
          src="/logo.png"
          alt="FixInn"
          style={{ height: '26px', marginBottom: '40px' }}
        />

        {/* Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '40px',
          width: '100%',
          maxWidth: '420px',
          border: '1px solid #eaecf0',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>

          <div style={{ marginBottom: '28px' }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#0D0D0D',
              margin: 0,
              letterSpacing: '-0.3px'
            }}>
              Welcome back
            </h1>
            <p style={{ color: '#888', fontSize: '15px', marginTop: '6px' }}>
              Sign in to your FixInn staff portal
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '14px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#444',
                marginBottom: '6px'
              }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #eaecf0',
                  fontSize: '15px',
                  fontFamily: '"DM Sans", sans-serif',
                  background: '#f7f8fc',
                  color: '#0D0D0D',
                  outline: 'none',
                  boxSizing: 'border-box' as const,
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#444',
                marginBottom: '6px'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #eaecf0',
                  fontSize: '15px',
                  fontFamily: '"DM Sans", sans-serif',
                  background: '#f7f8fc',
                  color: '#0D0D0D',
                  outline: 'none',
                  boxSizing: 'border-box' as const,
                }}
              />
            </div>

            {error && (
              <div style={{
                background: '#fff5f5',
                border: '1px solid #fed7d7',
                borderRadius: '10px',
                padding: '12px 14px',
                color: '#c53030',
                fontSize: '14px',
                fontWeight: '500',
              }}>
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                background: loading ? '#93b0fa' : '#2B5BF5',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                fontFamily: '"DM Sans", sans-serif',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '6px',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(43,91,245,0.3)',
                transition: 'all 0.2s',
                letterSpacing: '0.2px',
              }}
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </div>

        </div>

        <p style={{
          textAlign: 'center',
          color: '#bbb',
          fontSize: '12px',
          marginTop: '28px',
          letterSpacing: '1.5px',
        }}>
          SCAN. REPORT. FIX.
        </p>

      </div>
    </>
  )
}