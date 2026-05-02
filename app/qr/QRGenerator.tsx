'use client'

import { QRCodeSVG } from 'qrcode.react'

interface Location {
  id: string
  name: string
  slug: string
  building: string
  floor: string
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export default function QRGenerator({ locations = [] }: { locations: Location[] }) {
  function printQR(location: Location) {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const url = `${BASE_URL}/report/${location.slug}`
    const qrElement = document.getElementById(`qr-${location.id}`)?.outerHTML ?? ''

    printWindow.document.write(`
      <html>
        <head>
          <title>QR - ${location.name}</title>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            @page { size: A4; margin: 0; }
            body {
            width: 210mm;
            min-height: 297mm;
            font-family: 'DM Sans', sans-serif;
            background: #f0f4ff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .card {
            width: 170mm;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 10mm;
            padding: 16mm;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8mm;
            box-shadow: 0 4mm 24mm rgba(43,91,245,0.12);
          }
            .logo {
              height: 14mm;
            }
            .qr-wrapper {
              background: #f0f4ff;
              border-radius: 8mm;
              padding: 8mm;
              width: 100mm;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .qr-wrapper svg {
              display: block;
              width: 80mm !important;
              height: 80mm !important;
            }
            .scan-label {
              margin-top: 4mm;
              font-size: 4.5mm;
              font-weight: 700;
              color: #2B5BF5;
            }
            .divider {
              width: 100%;
              height: 0.3mm;
              background: #eaecf0;
            }
            .location-name {
              font-size: 13mm;
              font-weight: 800;
              color: #0D0D0D;
              letter-spacing: -0.3mm;
              line-height: 1.15;
            }
            .location-detail {
              font-size: 5mm;
              color: #888;
              font-weight: 500;
              margin-top: -4mm;
            }
            .cta {
              background: #2B5BF5;
              color: white;
              font-size: 6mm;
              font-weight: 700;
              padding: 5mm 0;
              border-radius: 5mm;
              width: 100%;
            }
            .instruction {
              font-size: 4mm;
              color: #aaa;
              line-height: 1.8;
            }
            .tagline {
              font-size: 3.5mm;
              color: #ccc;
              letter-spacing: 3px;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="${BASE_URL}/logo.png" alt="FixInn" class="logo" />
            <div class="qr-wrapper">
              ${qrElement}
              <div class="scan-label">📱 Scan to report an issue</div>
            </div>
            <div class="divider"></div>
            <div class="location-name">${location.name}</div>
            <div class="location-detail">${[location.floor, location.building].filter(Boolean).join(' · ')}</div>
            <div class="cta">Scan &amp; describe the issue →</div>
            <div class="instruction">
              No app needed · No login required<br>
              Your report goes directly to the facility team
            </div>
            <div class="tagline">SCAN. REPORT. FIX.</div>
          </div>
          <script>
            window.onload = () => setTimeout(() => window.print(), 500)
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '14px' }}>
      {locations.map(location => {
        const url = `${BASE_URL}/report/${location.slug}`
        return (
          <div key={location.id} style={{
            background: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'stretch',
            border: '1px solid #eaecf0',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{
              background: '#f0f4ff',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              minWidth: '130px',
              borderRight: '1px solid #e0e7ff',
            }}>
              <div id={`qr-${location.id}`} style={{
                background: 'white',
                padding: '8px',
                borderRadius: '10px',
                border: '1px solid #e0e7ff',
              }}>
                <QRCodeSVG value={url} size={88} fgColor="#0D0D0D" />
              </div>
              <p style={{
                color: '#2B5BF5',
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase' as const,
                margin: 0,
              }}>
                Scan me
              </p>
            </div>

            <div style={{
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column' as const,
              justifyContent: 'center',
              gap: '4px',
              flex: 1,
            }}>
              <p style={{ fontWeight: '700', fontSize: '17px', color: '#0D0D0D', margin: 0 }}>
                {location.name}
              </p>
              <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
                {[location.floor, location.building].filter(Boolean).join(' · ')}
              </p>
              <p style={{ color: '#ccc', fontSize: '11px', margin: '6px 0 0', fontFamily: 'monospace' }}>
                {url}
              </p>
            </div>

            <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => printQR(location)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#2B5BF5',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '700',
                  fontFamily: '"DM Sans", sans-serif',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap' as const,
                  boxShadow: '0 2px 8px rgba(43,91,245,0.25)',
                }}
              >
                Print →
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}