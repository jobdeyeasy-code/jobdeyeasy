'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from './signup.module.css'

const plans = [
  {
    id: 'free_trial',
    name: 'Free Trial',
    price: '₦0',
    period: 'once',
    tagline: 'One real application, completely free.',
    color: 'default',
    features: ['1 tailored application', 'CV + Cover letter + Send email', 'Profile & contact review', 'Email delivery', '"Why we picked this job" notes'],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '₦1,500',
    period: '/month',
    tagline: 'For people actively looking.',
    color: 'featured',
    badge: '⭐ Founding 20',
    features: ['5 applications/month', 'CV + Cover letter + Send email', 'Profile & contact review', 'Email + WhatsApp delivery', 'Daily job alerts coming soon', '7 & 14-day check-ins'],
  },
  {
    id: 'active_search',
    name: 'Active Search',
    price: '₦4,000',
    period: '/month',
    tagline: 'For serious job hunters.',
    color: 'default',
    features: ['15 applications/month', 'CV + Cover letter + Send email', 'Profile & contact review', 'Email + WhatsApp + SMS', 'Daily job alerts', '5 interview prep sets'],
  },
  {
    id: 'unlimited_hunt',
    name: 'Hunt Mode',
    price: '₦8,000',
    period: '/month',
    tagline: 'All-in, maximum advantage.',
    color: 'default',
    features: ['30 applications/month', 'CV + Cover letter + Send email', 'Profile & contact review', 'Email + WhatsApp + SMS', 'Daily job alerts', '10 interview prep sets', 'Priority review'],
  },
]

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<'plan' | 'account' | 'payment'>('plan')
  const [selectedPlan, setSelectedPlan] = useState<string>('free_trial')
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const chosen = plans.find(p => p.id === selectedPlan)!
  const isPaid = selectedPlan !== 'free_trial'

  async function handleAccount(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName } },
      })
      if (signUpError) throw signUpError
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: form.fullName,
          email: form.email,
          preferred_channel: 'email',
        })
        await supabase.from('subscriptions').insert({
          user_id: data.user.id,
          tier: selectedPlan,
          status: 'active',
          applications_limit: selectedPlan === 'free_trial' ? 1 : selectedPlan === 'starter' ? 5 : selectedPlan === 'active_search' ? 15 : 30,
          interview_prep_limit: selectedPlan === 'active_search' ? 5 : selectedPlan === 'unlimited_hunt' ? 10 : 0,
        })
        if (isPaid) {
          setStep('payment')
        } else {
          router.push('/onboarding')
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <a href="/" className={styles.logo}>
          <span className={styles.green}>Job</span><span className={styles.gold}>Dey</span><span className={styles.green}>Easy</span>
        </a>
        <a href="/login" className={styles.loginLink}>Already have an account? <strong>Log in</strong></a>
      </div>

      {/* STEP 1 — CHOOSE PLAN */}
      {step === 'plan' && (
        <div className={styles.container}>
          <div className={styles.stepHeader}>
            <div className={styles.stepBadge}>Step 1 of {isPaid ? 3 : 2}</div>
            <h1>Choose your plan</h1>
            <p>Start free to try it out. Upgrade whenever you&apos;re ready.</p>
          </div>
          <div className={styles.plansGrid}>
            {plans.map(plan => (
              <div
                key={plan.id}
                className={`${styles.planCard} ${selectedPlan === plan.id ? styles.selected : ''} ${plan.color === 'featured' ? styles.featured : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.badge && <div className={styles.planBadge}>{plan.badge}</div>}
                <div className={styles.planRadio}>
                  <div className={`${styles.radio} ${selectedPlan === plan.id ? styles.radioSelected : ''}`} />
                </div>
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planPrice}>{plan.price}<span>{plan.period}</span></div>
                <div className={styles.planTagline}>{plan.tagline}</div>
                <ul className={styles.planFeatures}>
                  {plan.features.map(f => <li key={f}><span>✓</span>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.planCta}>
            <button className={styles.btnPrimary} onClick={() => setStep('account')}>
              Continue with {chosen.name} →
            </button>
            <p className={styles.planCtaNote}>
              {isPaid ? `You'll be taken to payment after creating your account.` : `No card needed. Ever.`}
            </p>
          </div>
        </div>
      )}

      {/* STEP 2 — CREATE ACCOUNT */}
      {step === 'account' && (
        <div className={styles.container}>
          <div className={styles.stepHeader}>
            <div className={styles.stepBadge}>Step 2 of {isPaid ? 3 : 2}</div>
            <h1>Create your account</h1>
            <p>You chose <strong>{chosen.name}</strong> — {chosen.price}{chosen.period}</p>
          </div>
          <div className={styles.formCard}>
            <form onSubmit={handleAccount} className={styles.form}>
              <div className={styles.field}>
                <label>Full name</label>
                <input
                  type="text"
                  placeholder="Ada Okonkwo"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="ada@gmail.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
                <span className={styles.fieldHint}>Use a professional email — this is what employers will see</span>
              </div>
              <div className={styles.field}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  minLength={8}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              {error && <div className={styles.error}>{error}</div>}
              <button type="submit" className={styles.btnPrimary} disabled={loading}>
                {loading ? 'Creating account...' : isPaid ? 'Continue to payment →' : 'Create account & continue →'}
              </button>
            </form>
            <button className={styles.backBtn} onClick={() => setStep('plan')}>← Back to plans</button>
          </div>
        </div>
      )}

      {/* STEP 3 — PAYMENT (paid plans only) */}
      {step === 'payment' && (
        <div className={styles.container}>
          <div className={styles.stepHeader}>
            <div className={styles.stepBadge}>Step 3 of 3</div>
            <h1>Complete your payment</h1>
            <p>You&apos;re one step away from your first application.</p>
          </div>
          <div className={styles.formCard}>
            <div className={styles.paymentSummary}>
              <div className={styles.paymentRow}>
                <span>Plan</span>
                <strong>{chosen.name}</strong>
              </div>
              <div className={styles.paymentRow}>
                <span>Amount</span>
                <strong>{chosen.price}{chosen.period}</strong>
              </div>
              <div className={styles.paymentRow}>
                <span>Billed</span>
                <strong>Monthly</strong>
              </div>
            </div>
            <div className={styles.paymentDummy}>
              <div className={styles.paymentDummyIcon}>💳</div>
              <h3>Payment coming soon</h3>
              <p>We&apos;re setting up Paystack for secure Nigerian payments. For now, please message us on WhatsApp to complete your subscription and get started immediately.</p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '234XXXXXXXXXX'}?text=Hi! I just signed up for the ${chosen.name} plan (${chosen.price}${chosen.period}) and want to complete my payment.`}
                className={styles.btnWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Complete via WhatsApp →
              </a>
              <button className={styles.skipBtn} onClick={() => router.push('/onboarding')}>
                Continue for now (we&apos;ll follow up)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
