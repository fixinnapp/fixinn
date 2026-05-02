'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '8px 16px',
        borderRadius: '10px',
        border: '1.5px solid #333',
        background: 'transparent',
        color: '#999',
        fontSize: '13px',
        fontWeight: '600',
        fontFamily: '"DM Sans", sans-serif',
        cursor: 'pointer',
      }}
    >
      Sign out
    </button>
  )
}