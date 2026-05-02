export default function Home() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="font-[DM_Sans] bg-white text-gray-900">

        {/* Navbar */}
        <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
          <div className="max-w-[1100px] mx-auto px-4 py-4 flex items-center justify-between">
            <img src="/logo.png" className="h-8" />

            <div className="hidden sm:flex items-center gap-4">
              <a href="/login" className="text-sm font-medium text-gray-600 hover:text-black">
                Staff login
              </a>
              <a
                href="mailto:your@email.com"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700"
              >
                Request demo
              </a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-16 md:py-28">
          <div className="max-w-[720px] mx-auto px-4 text-center">

            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Now available in Norway
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-5">
              Facility issues,
              <br />
              <span className="text-blue-600">reported instantly.</span>
            </h1>

            <p className="text-[15px] sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed mb-8">
              Place a QR code on the wall. Staff and guests scan it to report problems in seconds — no app, no login, no back-and-forth emails. Everything goes directly to the right person with location and context included.
            </p>

            <div className="flex justify-center gap-3">
              <a className="flex-1 sm:flex-none text-center px-4 sm:px-6 py-3 rounded-lg bg-blue-600 text-white text-sm sm:text-base font-semibold shadow hover:bg-blue-700">
                Get a free pilot
              </a>
              <a className="flex-1 sm:flex-none text-center px-4 sm:px-6 py-3 rounded-lg border border-gray-200 text-gray-700 text-sm sm:text-base font-medium hover:bg-gray-50">
                See demo
              </a>
            </div>

          </div>
        </section>

        {/* How it works */}
        <section className="py-20 border-y border-gray-100 bg-gray-50">
          <div className="max-w-[1100px] mx-auto px-4">

            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-3">
                How it works
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Three steps. That’s it.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Scan',
                  desc: 'Someone spots a problem and scans the QR code placed on the wall. It opens instantly in their browser — no app required.',
                  emoji: '📱',
                },
                {
                  title: 'Report',
                  desc: 'They select the issue type, add a quick description, and submit. The whole process takes less than 30 seconds.',
                  emoji: '📝',
                },
                {
                  title: 'Fix',
                  desc: 'The facility manager receives the report immediately with location, time, and all details already included.',
                  emoji: '🔧',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 md:p-6 rounded-xl border border-gray-200 hover:shadow-md transition">

                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-lg mb-4">
                    {item.emoji}
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Who it's for */}
        <section className="py-20">
          <div className="max-w-[1100px] mx-auto px-4">

            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-3">
                Who it's for
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Built for any facility
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  emoji: '🏨',
                  title: 'Hotels',
                  desc: 'Guests and housekeeping can instantly report issues in rooms and shared spaces without contacting staff.',
                },
                {
                  emoji: '🏢',
                  title: 'Office buildings',
                  desc: 'Employees report maintenance issues without emails, calls, or delays.',
                },
                {
                  emoji: '🏫',
                  title: 'Schools',
                  desc: 'Teachers and students flag issues across the campus in seconds.',
                },
                {
                  emoji: '🏋️',
                  title: 'Gyms & sports centers',
                  desc: 'Members report broken equipment before it becomes a bigger problem.',
                },
                {
                  emoji: '🏪',
                  title: 'Shopping centers',
                  desc: 'Tenants and visitors report shared space issues to one central team.',
                },
                {
                  emoji: '🏗️',
                  title: 'Property managers',
                  desc: 'Manage multiple buildings with full issue tracking and history.',
                },
              ].map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-sm transition">

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-lg">
                      {item.emoji}
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-black text-white text-center">
          <div className="max-w-xl mx-auto px-4">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to try it?
            </h2>

            <p className="text-gray-400 mb-8">
              We’re offering free pilots to facilities in Norway. Get set up in 30 minutes — we place the QR codes ourselves.
            </p>

            <a className="inline-block px-8 py-4 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700">
              Request a free pilot
            </a>

          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-6">
          <div className="max-w-[1100px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <img src="/logo.png" className="h-6" />
            <p className="text-xs text-gray-400">
              © 2026 FixInn · SCAN. REPORT. FIX.
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}