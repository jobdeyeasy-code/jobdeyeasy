'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from './dashboard.module.css'

type Profile = { full_name: string; email: string; preferred_channel: string }
type Subscription = { tier: string; status: string; applications_used: number; applications_limit: number; renews_at: string | null }
type Application = { id: string; status: string; created_at: string; tailored_cv_url: string | null; tailored_cover_letter_url: string | null; apply_to_email_or_link: string | null; why_picked_notes: string[] | null; outcome_self_reported: string | null; job_postings: { title: string; company: string; location: string } | null }

const statusLabels: Record<string, { label: string; color: string; icon: string }> = {
  queued:         { label: 'In queue',        color: 'grey',   icon: '⏳' },
  ai_drafted:     { label: 'Being written',   color: 'blue',   icon: '✍️' },
  human_review:   { label: 'Human review',    color: 'orange', icon: '👁️' },
  ready:          { label: 'Ready for you',   color: 'green',  icon: '✅' },
  sent_to_client: { label: 'Delivered',       color: 'green',  icon: '📬' },
  client_applied: { label: 'You applied',     color: 'teal',   icon: '🚀' },
  interview:      { label: 'Interview!',      color: 'gold',   icon: '🎉' },
  rejected:       { label: 'Not selected',    color: 'red',    icon: '❌' },
  offer:          { label: 'Offer received!', color: 'gold',   icon: '🏆' },
}

const tierLabels: Record<string, string> = {
  free_trial: 'Free Trial',
  starter: 'Starter',
  active_search: 'Active Search',
  unlimited_hunt: 'Hunt Mode',
}

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [sub, setSub] = useState<Subscription | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [activeTab, setActiveTab] = useState<'applications' | 'profile' | 'upgrade'>('applications')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const [{ data: prof }, { data: subData }, { data: apps }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('subscriptions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
        supabase.from('applications').select('*, job_postings(title, company, location)').eq('user_id', user.id).order('created_at', { ascending: false }),
      ])
      setProfile(prof)
      setSub(subData)
      setApplications(apps || [])
      setLoading(false)
    }
    load()
  }, [router])

  async function logout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingSpinner} />
      <p>Loading your dashboard...</p>
    </div>
  )

  const appsUsed = sub?.applications_used ?? 0
  const appsLimit = sub?.applications_limit ?? 1
  const appsPercent = Math.min((appsUsed / appsLimit) * 100, 100)

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <a href="/" className={styles.logo}>
            <span className={styles.green}>Job</span><span className={styles.gold}>Dey</span><span className={styles.green}>Easy</span>
          </a>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>{profile?.full_name?.[0]?.toUpperCase() ?? '?'}</div>
            <div>
              <div className={styles.userName}>{profile?.full_name ?? 'Your Name'}</div>
              <div className={styles.userPlan}>{tierLabels[sub?.tier ?? ''] ?? 'Free Trial'}</div>
            </div>
          </div>
        </div>

        <nav className={styles.sideNav}>
          <button className={`${styles.navItem} ${activeTab === 'applications' ? styles.active : ''}`} onClick={() => setActiveTab('applications')}>
            <span>📋</span> My Applications
          </button>
          <button className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`} onClick={() => setActiveTab('profile')}>
            <span>👤</span> My Profile
          </button>
          <button className={`${styles.navItem} ${activeTab === 'upgrade' ? styles.active : ''}`} onClick={() => setActiveTab('upgrade')}>
            <span>⚡</span> Upgrade Plan
          </button>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '234XXXXXXXXXX'}`}
            className={styles.navItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>💬</span> Message Us
          </a>
        </nav>

        <div className={styles.sidebarBottom}>
          {/* Usage meter */}
          {sub && (
            <div className={styles.usageMeter}>
              <div className={styles.usageLabel}>
                <span>Applications this month</span>
                <strong>{appsUsed} / {appsLimit === 9999 ? '30' : appsLimit}</strong>
              </div>
              <div className={styles.usageBar}>
                <div className={styles.usageFill} style={{ width: `${appsPercent}%` }} />
              </div>
            </div>
          )}
          <button className={styles.logoutBtn} onClick={logout}>Sign out</button>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className={styles.tabContent}>
            <div className={styles.tabHeader}>
              <div>
                <h1>My Applications</h1>
                <p>Every application we&apos;ve prepared for you, and where it stands.</p>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📭</div>
                <h3>No applications yet</h3>
                <p>We&apos;re working on finding the best jobs for your profile. You&apos;ll see your first application here within 24 hours of completing your profile.</p>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '234XXXXXXXXXX'}?text=Hi! I just completed my profile and wanted to check in.`} className={styles.btnPrimary} target="_blank" rel="noopener noreferrer">
                  💬 Message us on WhatsApp
                </a>
              </div>
            ) : (
              <div className={styles.appList}>
                {applications.map(app => {
                  const s = statusLabels[app.status] ?? { label: app.status, color: 'grey', icon: '•' }
                  return (
                    <div key={app.id} className={styles.appCard}>
                      <div className={styles.appCardTop}>
                        <div className={styles.appJobInfo}>
                          <div className={styles.appJobTitle}>{app.job_postings?.title ?? 'Job Application'}</div>
                          <div className={styles.appJobMeta}>
                            <span>🏢 {app.job_postings?.company ?? '—'}</span>
                            <span>📍 {app.job_postings?.location ?? '—'}</span>
                          </div>
                        </div>
                        <div className={`${styles.statusBadge} ${styles[`status_${s.color}`]}`}>
                          {s.icon} {s.label}
                        </div>
                      </div>

                      {/* Tracker steps */}
                      <div className={styles.tracker}>
                        {['CV Ready', 'Cover Letter Ready', 'Human Reviewed', 'Delivered to you'].map((step, i) => {
                          const stepStatuses = ['queued', 'ai_drafted', 'human_review', 'ready', 'sent_to_client', 'client_applied', 'interview', 'rejected', 'offer']
                          const currentIdx = stepStatuses.indexOf(app.status)
                          const done = currentIdx >= i + 1
                          return (
                            <div key={step} className={`${styles.trackerStep} ${done ? styles.trackerDone : ''}`}>
                              <div className={styles.trackerDot}>{done ? '✓' : i + 1}</div>
                              <div className={styles.trackerLabel}>{step}</div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Why we picked this */}
                      {app.why_picked_notes && app.why_picked_notes.length > 0 && (
                        <div className={styles.whyPicked}>
                          <div className={styles.whyPickedTitle}>Why we picked this job for you</div>
                          <ul>
                            {app.why_picked_notes.map((note, i) => <li key={i}>{note}</li>)}
                          </ul>
                        </div>
                      )}

                      {/* Documents */}
                      {(app.tailored_cv_url || app.tailored_cover_letter_url || app.apply_to_email_or_link) && (
                        <div className={styles.docLinks}>
                          {app.tailored_cv_url && (
                            <a href={app.tailored_cv_url} className={styles.docLink} target="_blank" rel="noopener noreferrer">
                              📄 Download Tailored CV
                            </a>
                          )}
                          {app.tailored_cover_letter_url && (
                            <a href={app.tailored_cover_letter_url} className={styles.docLink} target="_blank" rel="noopener noreferrer">
                              ✉️ Download Cover Letter
                            </a>
                          )}
                          {app.apply_to_email_or_link && (
                            <a href={app.apply_to_email_or_link.startsWith('http') ? app.apply_to_email_or_link : `mailto:${app.apply_to_email_or_link}`} className={`${styles.docLink} ${styles.docLinkGreen}`} target="_blank" rel="noopener noreferrer">
                              📧 Send your application
                            </a>
                          )}
                        </div>
                      )}

                      {/* Outcome */}
                      {app.outcome_self_reported && (
                        <div className={styles.outcome}>
                          Outcome you reported: <strong>{app.outcome_self_reported.replace('_', ' ')}</strong>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className={styles.tabContent}>
            <div className={styles.tabHeader}>
              <div>
                <h1>My Profile</h1>
                <p>Your information as we have it. Message us on WhatsApp to update anything.</p>
              </div>
            </div>
            <div className={styles.profileGrid}>
              <div className={styles.profileCard}>
                <div className={styles.profileCardTitle}>Account details</div>
                <div className={styles.profileRow}><span>Name</span><strong>{profile?.full_name ?? '—'}</strong></div>
                <div className={styles.profileRow}><span>Email</span><strong>{profile?.email ?? '—'}</strong></div>
                <div className={styles.profileRow}><span>Preferred delivery</span><strong>{profile?.preferred_channel ?? 'Email'}</strong></div>
              </div>
              <div className={styles.profileCard}>
                <div className={styles.profileCardTitle}>Subscription</div>
                <div className={styles.profileRow}><span>Current plan</span><strong>{tierLabels[sub?.tier ?? ''] ?? '—'}</strong></div>
                <div className={styles.profileRow}><span>Status</span><strong style={{ color: 'var(--green)', textTransform: 'capitalize' }}>{sub?.status ?? '—'}</strong></div>
                <div className={styles.profileRow}><span>Applications used</span><strong>{sub?.applications_used ?? 0} of {sub?.applications_limit ?? 1}</strong></div>
                {sub?.renews_at && <div className={styles.profileRow}><span>Renews</span><strong>{new Date(sub.renews_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></div>}
              </div>
              <div className={styles.profileCard} style={{ gridColumn: '1 / -1' }}>
                <div className={styles.profileCardTitle}>Need to update something?</div>
                <p className={styles.profileUpdateNote}>To update your CV, contact details, job preferences, or any other information, simply message us on WhatsApp. We&apos;ll sort it within 24 hours.</p>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '234XXXXXXXXXX'}?text=Hi! I need to update my profile.`} className={styles.btnWhatsapp} target="_blank" rel="noopener noreferrer">
                  💬 Message us to update
                </a>
              </div>
            </div>
          </div>
        )}

        {/* UPGRADE TAB */}
        {activeTab === 'upgrade' && (
          <div className={styles.tabContent}>
            <div className={styles.tabHeader}>
              <div>
                <h1>Upgrade your plan</h1>
                <p>Get more applications, interview prep, and daily job alerts.</p>
              </div>
            </div>
            <div className={styles.upgradeGrid}>
              {[
                { id: 'starter', name: 'Starter', price: '₦1,500/month', apps: '5 applications', features: ['Email + WhatsApp delivery', '7 & 14-day check-ins', 'Follow-up message written for you'] },
                { id: 'active_search', name: 'Active Search', price: '₦4,000/month', apps: '15 applications', features: ['Everything in Starter', 'Email + WhatsApp + SMS', 'Daily job alerts', '5 interview prep sets'] },
                { id: 'unlimited_hunt', name: 'Hunt Mode', price: '₦8,000/month', apps: '30 applications', features: ['Everything in Active Search', '10 interview prep sets', 'Priority 24-hour review'] },
              ].map(plan => (
                <div key={plan.id} className={`${styles.upgradeCard} ${sub?.tier === plan.id ? styles.currentPlan : ''}`}>
                  {sub?.tier === plan.id && <div className={styles.currentBadge}>Your current plan</div>}
                  <div className={styles.upgradeName}>{plan.name}</div>
                  <div className={styles.upgradePrice}>{plan.price}</div>
                  <div className={styles.upgradeApps}>{plan.apps} per month</div>
                  <ul className={styles.upgradeFeatures}>
                    {plan.features.map(f => <li key={f}><span>✓</span>{f}</li>)}
                  </ul>
                  {sub?.tier !== plan.id && (
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '234XXXXXXXXXX'}?text=Hi! I want to upgrade to the ${plan.name} plan (${plan.price}).`}
                      className={styles.btnPrimary}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Upgrade via WhatsApp →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
