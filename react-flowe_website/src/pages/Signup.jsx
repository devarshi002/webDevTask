import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    const { error } = await signUp(email, password)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#fdf6f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="font-[Cormorant_Garamond] text-3xl text-[#8b5e52]">
            ✿ Petal <em className="italic text-[#c4957a]">&amp; Co.</em>
          </Link>
          <p className="text-sm font-light text-[#a08878] mt-2 tracking-wide">
            Join the garden 🌸
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e8d5c4] rounded-md px-8 py-10">
          <h2 className="font-[Cormorant_Garamond] text-[28px] text-[#5c3d35] mb-6">
            Create account
          </h2>

          {success ? (
            <div className="text-center py-6">
              <p className="text-2xl mb-3">🌸</p>
              <p className="font-[Cormorant_Garamond] text-xl text-[#5c3d35] mb-2">
                Check your email!
              </p>
              <p className="text-xs font-light text-[#a08878] leading-relaxed">
                We've sent a confirmation link to <strong>{email}</strong>.
                Click it to activate your account.
              </p>
              <Link to="/login"
                className="inline-block mt-6 text-xs tracking-widest uppercase
                  text-white bg-[#c4957a] hover:bg-[#b0806a] px-8 py-3 rounded-sm transition-colors">
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs
                  px-4 py-3 rounded-sm mb-5 tracking-wide">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-[0.14em] uppercase text-[#7a5c52]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="border border-[#e8d5c4] focus:border-[#c4957a] outline-none
                      px-3.5 py-2.5 text-sm font-light text-[#5c3d35] rounded-sm
                      placeholder-[#c4b5ac] transition-colors bg-[#fdf6f0]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-[0.14em] uppercase text-[#7a5c52]">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="border border-[#e8d5c4] focus:border-[#c4957a] outline-none
                      px-3.5 py-2.5 text-sm font-light text-[#5c3d35] rounded-sm
                      placeholder-[#c4b5ac] transition-colors bg-[#fdf6f0]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-[0.14em] uppercase text-[#7a5c52]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="border border-[#e8d5c4] focus:border-[#c4957a] outline-none
                      px-3.5 py-2.5 text-sm font-light text-[#5c3d35] rounded-sm
                      placeholder-[#c4b5ac] transition-colors bg-[#fdf6f0]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 text-xs tracking-widest uppercase text-white
                    bg-[#c4957a] hover:bg-[#b0806a] py-3.5 rounded-sm
                    transition-colors disabled:opacity-60"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-xs font-light text-[#a08878] mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-[#c4957a] hover:text-[#8b5e52] transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}