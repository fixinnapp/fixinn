import { supabase } from '@/app/lib/supabase'
import ReportForm from './ReportForm'

interface Props {
  params: Promise<{ location: string }>
}

export default async function ReportPage({ params }: Props) {
  const { location: locationSlug } = await params

  const { data: location } = await supabase
    .from('locations')
    .select('*, organizations(*)')
    .eq('slug', locationSlug)
    .single()

  if (!location) {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet" />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"DM Sans", sans-serif',
          background: '#ffffff',
          padding: '24px'
        }}>
          <img src="/logo.png" alt="FixInn" style={{ height: '64px', marginBottom: '32px' }} />
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0D0D0D', margin: 0 }}>Location not found</h1>
          <p style={{ color: '#888', marginTop: '10px', fontSize: '15px', textAlign: 'center' }}>
            This QR code doesn't point to a valid location. Please contact your facility manager.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet" />
      <div style={{ minHeight: '100vh', background: '#f7f8fc', fontFamily: '"DM Sans", sans-serif' }}>

        {/* Navbar — white, same as logo background */}
        <nav style={{
          background: '#ffffff',
          borderBottom: '1px solid #eaecf0',
          padding: '0 28px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky' as const,
          top: 0,
          zIndex: 10,
        }}>
          <img src="/logo.png" alt="FixInn" style={{ height: '26px' }} />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f0f4ff',
            padding: '7px 14px',
            borderRadius: '20px',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              background: '#2B5BF5',
              borderRadius: '50%',
            }} />
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#2B5BF5' }}>
              Issue report
            </span>
          </div>
        </nav>

        {/* Location header */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #eaecf0',
          padding: '20px 28px',
        }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: '#f0f4ff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0,
              }}>📍</div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#0D0D0D', margin: 0 }}>
                  {location.name}
                </p>
                <p style={{ fontSize: '13px', color: '#888', margin: 0, marginTop: '2px' }}>
                  {location.organizations.name}
                  {location.floor ? ` · ${location.floor}` : ''}
                  {location.building ? ` · ${location.building}` : ''}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ maxWidth: '560px', margin: '0 auto', padding: '36px 20px 80px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0D0D0D', margin: 0, letterSpacing: '-0.3px' }}>
              Report an issue
            </h1>
            <p style={{ color: '#888', fontSize: '15px', marginTop: '8px', lineHeight: '1.5' }}>
              Fill in the details below and we'll notify the facility team right away.
            </p>
          </div>
          <ReportForm locationId={location.id} organizationId={location.organization_id} />
        </div>

      </div>
    </>
  )
}