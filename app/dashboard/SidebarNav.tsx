'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import {
  useEffect,
  useState,
} from 'react'

interface Props {
  userEmail: string
}

export default function SidebarNav({
  userEmail,
}: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const [isMobile, setIsMobile] =
    useState(false)

  const [open, setOpen] =
    useState(false)

  useEffect(() => {
    function handleResize() {
      setIsMobile(
        window.innerWidth <= 768
      )
    }

    handleResize()

    window.addEventListener(
      'resize',
      handleResize
    )

    return () =>
      window.removeEventListener(
        'resize',
        handleResize
      )
  }, [])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navItems = [
    {
      href: '/dashboard',
      label: 'Reports',
      icon: '📋',
    },
    {
      href: '/dashboard/stats',
      label: 'Statistics',
      icon: '📊',
    },
    {
      href: '/dashboard/qr',
      label: 'QR Codes',
      icon: '🔲',
    },
  ]

  function isActive(href: string) {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }

    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Top Bar */}
      {isMobile && (
        <div
          style={{
            height: '64px',
            background: '#fff',
            borderBottom:
              '1px solid #eaecf0',
            display: 'flex',
            alignItems: 'center',
            justifyContent:
              'space-between',
            padding: '0 16px',
            position: 'sticky',
            top: 0,
            zIndex: 1001,
          }}
        >
          <img
            src="/logo.png"
            alt="FixInn"
            style={{
              height: '28px',
            }}
          />

          <button
            onClick={() =>
              setOpen(!open)
            }
            style={{
              border: 'none',
              background:
                'transparent',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#111',
            }}
          >
            ☰
          </button>
        </div>
      )}

      {/* Overlay */}
      {isMobile && open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'rgba(0,0,0,0.45)',
            zIndex: 1000,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          minHeight: '100vh',
          background: '#ffffff',
          borderRight:
            '1px solid #eaecf0',
          display: 'flex',
          flexDirection: 'column',
          position: isMobile
            ? 'fixed'
            : 'sticky',
          top: 0,
          left:
            isMobile && !open
              ? '-260px'
              : '0',
          height: '100vh',
          flexShrink: 0,
          zIndex: 1002,
          transition:
            'left 0.25s ease',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom:
              '1px solid #eaecf0',
            display: 'flex',
            alignItems: 'center',
            justifyContent:
              'space-between',
          }}
        >
          <img
            src="/logo.png"
            alt="FixInn"
            style={{
              height: '36px',
            }}
          />

          {isMobile && (
            <button
              onClick={() =>
                setOpen(false)
              }
              style={{
                border: 'none',
                background:
                  'transparent',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav
          style={{
            padding: '12px',
            flex: 1,
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#bbb',
              letterSpacing: '1px',
              textTransform:
                'uppercase',
              padding: '8px 8px 4px',
              margin: 0,
            }}
          >
            Menu
          </p>

          {navItems.map((item) => {
            const active =
              isActive(item.href)

            return (
              <Link
                href={item.href}
                key={item.href}
                onClick={() =>
                  setOpen(false)
                }
                style={{
                  display: 'flex',
                  alignItems:
                    'center',
                  gap: '12px',
                  padding:
                    '10px 12px',
                  borderRadius:
                    '10px',
                  marginBottom: '2px',
                  textDecoration:
                    'none',
                  fontSize: '14px',
                  fontWeight: active
                    ? '700'
                    : '500',
                  color: active
                    ? '#2B5BF5'
                    : '#555',
                  background: active
                    ? '#f0f4ff'
                    : 'transparent',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                  }}
                >
                  {item.icon}
                </span>

                {item.label}

                {active && (
                  <div
                    style={{
                      marginLeft:
                        'auto',
                      width: '6px',
                      height: '6px',
                      background:
                        '#2B5BF5',
                      borderRadius:
                        '50%',
                    }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: '16px 12px',
            borderTop:
              '1px solid #eaecf0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: '#f7f8fc',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                background:
                  '#2B5BF5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'center',
                color: 'white',
                fontSize: '13px',
                fontWeight: '700',
                flexShrink: 0,
              }}
            >
              {userEmail
                .charAt(0)
                .toUpperCase()}
            </div>

            <p
              style={{
                fontSize: '12px',
                color: '#666',
                margin: 0,
                overflow: 'hidden',
                textOverflow:
                  'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '140px',
              }}
            >
              {userEmail}
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '10px',
              border:
                '1.5px solid #eaecf0',
              background:
                'transparent',
              color: '#888',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily:
                '"DM Sans", sans-serif',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>↩</span>
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}