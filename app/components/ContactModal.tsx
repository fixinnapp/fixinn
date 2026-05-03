'use client'

import { useState } from 'react'
import { supabase } from '@/app/lib/supabase'

interface Props {
  requestType: string
  onClose: () => void
}

export default function ContactModal({ requestType, onClose }: Props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!firstName || !lastName || !organization || !email) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setLoading(true)

    const { error: submitError } = await supabase.from('leads').insert({
      first_name: firstName,
      last_name: lastName,
      organization,
      email,
      message,
      request_type: requestType,
    })

    setLoading(false)
    if (submitError) {
      setError('Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-60 bg-white rounded-2xl shadow-2xl max-w-lg mx-auto overflow-y-auto max-h-[90vh]"
        style={{ zIndex: 60 }}
      >
        <div className="p-6 sm:p-8">

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
                ✅
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Request received!</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Thank you for your interest in FixInn. We'll be in touch within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  {requestType}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  Let's get started
                </h2>
                <p className="text-sm text-gray-400">
                  Fill in your details and we'll be in touch within 24 hours.
                </p>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-4">

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      First name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Anna"
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Last name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Hansen"
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Organization <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    placeholder="Bergen Hotel AS"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Work email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="anna@bergenhotel.no"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Message
                    <span className="text-gray-400 font-normal ml-1">(optional)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us about your facility..."
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-400 focus:bg-white transition resize-none"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
                    ⚠️ {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-md shadow-blue-100 mt-1"
                >
                  {loading ? 'Sending...' : 'Submit request →'}
                </button>

                <button
                  onClick={onClose}
                  className="text-xs text-gray-400 hover:text-gray-600 transition text-center"
                >
                  Cancel
                </button>

              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}