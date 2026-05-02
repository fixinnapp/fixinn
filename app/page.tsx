export default function Home() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap"
        rel="stylesheet"
      />

      <div className="font-[DM_Sans] bg-white min-h-screen">

        {/* Navbar */}
        <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 md:px-10 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
          <img src="/logo.png" alt="FixInn" className="h-8 md:h-10" />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="/login"
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 text-center"
            >
              Staff login
            </a>

            <a
              href="mailto:aygulismayilova99@gmail.com"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold text-center shadow-md"
            >
              Request a demo →
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">

          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="text-xs font-semibold text-blue-600">
              Now available in Norway
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black leading-tight tracking-tight mb-6">
            Facility issues,<br />
            <span className="text-blue-600">reported instantly.</span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
            Place a QR code on the wall. Staff and guests scan it to report problems in seconds — no app, no login, no back-and-forth emails.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:aygulismayilova99@gmail.com"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg"
            >
              Get a free pilot →
            </a>

            <a
              href="/report/main-lobby"
              className="px-6 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 font-semibold"
            >
              See a demo form
            </a>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-gray-50 border-y border-gray-200 px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">

            <p className="text-center text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
              How it works
            </p>

            <h2 className="text-center text-2xl md:text-4xl font-extrabold mb-12">
              Three steps. That's it.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Scan',
                  description: 'Someone spots a problem and scans the QR code on the wall.',
                  emoji: '📱',
                },
                {
                  step: '02',
                  title: 'Report',
                  description: 'They describe the issue and submit in under 30 seconds.',
                  emoji: '📝',
                },
                {
                  step: '03',
                  title: 'Fix',
                  description: 'Manager sees it instantly with full details.',
                  emoji: '🔧',
                },
              ].map(item => (
                <div key={item.step} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">

                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl mb-4">
                    {item.emoji}
                  </div>

                  <p className="text-xs font-bold text-blue-600 mb-1">
                    STEP {item.step}
                  </p>

                  <h3 className="text-lg font-bold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">

            <p className="text-center text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
              Who it's for
            </p>

            <h2 className="text-center text-2xl md:text-4xl font-extrabold mb-12">
              Built for any facility.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { emoji: '🏨', title: 'Hotels' },
                { emoji: '🏢', title: 'Offices' },
                { emoji: '🏫', title: 'Schools' },
                { emoji: '🏋️', title: 'Gyms' },
                { emoji: '🏪', title: 'Shopping centers' },
                { emoji: '🏗️', title: 'Property managers' },
              ].map(item => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <h3 className="font-bold">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black text-white px-4 py-16 md:py-20 text-center">
          <div className="max-w-xl mx-auto">

            <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
              Ready to try it?
            </h2>

            <p className="text-gray-400 mb-8">
              Free pilots in Norway. Setup in 30 minutes.
            </p>

            <a
              href="mailto:aygulismayilova99@gmail.com"
              className="inline-block px-8 py-4 bg-blue-600 rounded-xl font-bold shadow-lg"
            >
              Request a free pilot →
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 px-4 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <img src="/logo.png" alt="FixInn" className="h-6" />
          <p className="text-xs text-gray-400">
            © 2026 FixInn · SCAN. REPORT. FIX.
          </p>
        </footer>

      </div>
    </>
  )
}