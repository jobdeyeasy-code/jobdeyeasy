'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from './login.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: loginError } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    if (loginError) {
      setError('Incorrect email or password. Please try again.')
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <a href="/" className={styles.logo}>
          <span className={styles.green}>Job</span><span className={styles.gold}>Dey</span><span className={styles.green}>Easy</span>
        </a>
        <h1>Welcome back</h1>
        <p>Log in to see your applications and profile.</p>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label>Email address</label>
            <input type="email" placeholder="ada@gmail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" placeholder="Your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Logging in...' : 'Log in →'}
          </button>
        </form>
        <p className={styles.footer}>Don&apos;t have an account? <a href="/signup">Sign up free</a></p>
      </div>
    </div>
  )
}
