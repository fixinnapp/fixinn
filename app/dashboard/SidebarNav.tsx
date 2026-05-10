'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

interface Props {
  userEmail: string
}

export default function SidebarNav({
  userEmail,
}: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const isMobile =
    typeof window !== 'undefined' &&
    window.innerWidth <= 768

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
    if (href === '/dashboard')
      return pathname === '/dashboard'

    return pathname.startsWith(href)
  }

  return (
    <aside
      style={{
        width: isMobile ? '100%' : '240px',
        minHeight: isMobile ? 'auto' : '100vh',
        background: '#ffffff',
        borderRight: isMobile
          ? 'none'
          : '1px solid #eaecf0',
        borderBottom: isMobile
          ? '1px solid #eaecf0'
          : 'none',
        display: 'flex',
        flexDirection: isMobile
          ? 'row'
          : 'column',
        position: isMobile
          ? 'relative'
          : 'sticky',
        top: 0,
        height: isMobile ? 'auto' : '100vh',
        flexShrink: 0,
        overflowX: isMobile
          ? 'auto'
          : 'visible',
        zIndex: 20,
      }}
    >
      <div
        style={{
          padding: isMobile
            ? '14px 16px'
            : '24px 20px',
          borderBottom: isMobile
            ? 'none'
            : '1px solid #eaecf0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/logo.png"
          alt="FixInn"
          style={{
            height: isMobile
              ? '28px'
              : '36px',
          }}
        />
      </div>

      <nav
        style={{
          padding: '12px',
          flex: 1,
          display: 'flex',
          flexDirection: isMobile
            ? 'row'
            : 'column',
          gap: '8px',
          overflowX: isMobile
            ? 'auto'
            : 'visible',
          alignItems: isMobile
            ? 'center'
            : 'stretch',
        }}
      >
        {!isMobile && (
          <p
            style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#bbb',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '8px 8px 4px',
              margin: 0,
            }}
          >
            Menu
          </p>
        )}

        {navItems.map((item) => {
          const active = isActive(item.href)

          return (
            <Link
              href={item.href}
              key={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: isMobile
                  ? '10px 14px'
                  : '10px 12px',
                borderRadius: '10px',
                textDecoration: 'none',
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
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
              }}
            >
              <span
                style={{ fontSize: '16px' }}
              >
                {item.icon}
              </span>

              {item.label}

              {active && !isMobile && (
                <div
                  style={{
                    marginLeft: 'auto',
                    width: '6px',
                    height: '6px',
                    background: '#2B5BF5',
                    borderRadius: '50%',
                  }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {!isMobile && (
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
                background: '#2B5BF5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                textOverflow: 'ellipsis',
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
              background: 'transparent',
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
      )}
    </aside>
  )
}