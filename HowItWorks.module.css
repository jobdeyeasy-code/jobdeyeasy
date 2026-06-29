import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Free Trial',
    price: '₦0',
    period: 'once',
    tagline: 'Try it with zero risk. One real application, on us.',
    badge: null,
    featured: false,
    features: [
      '1 tailored application',
      'CV built from scratch if needed',
      'Profile & contact review',
      '"Why we picked this job" notes',
      'Delivered by email',
    ],
    notIncluded: [
      'WhatsApp & SMS delivery',
      'Daily job alerts',
      'Interview prep',
    ],
    cta: 'Start for free',
    ctaStyle: 'outline',
    extraApps: null,
  },
  {
    name: 'Starter',
    price: '₦1,500',
    period: '/month',
    tagline: 'For people actively looking but not in a rush.',
    badge: '⭐ Founding 20 — Lock in for life',
    featured: true,
    features: [
      '5 tailored applications/month',
      'CV built from scratch if needed',
      'Profile & contact review',
      '"Why we picked this job" notes',
      'Email + WhatsApp delivery',
      '7 & 14-day outcome check-ins',
      'Follow-up message written for you',
    ],
    notIncluded: [
      'Daily job alerts',
      'SMS delivery',
      'Interview prep',
    ],
    cta: 'Claim your spot →',
    ctaStyle: 'primary',
    extraApps: '₦500 per extra application',
  },
  {
    name: 'Active Search',
    price: '₦4,000',
    period: '/month',
    tagline: 'For people applying seriously and want to move fast.',
    badge: null,
    featured: false,
    features: [
      '15 tailored applications/month',
      'CV built from scratch if needed',
      'Profile & contact review',
      '"Why we picked this job" notes',
      'Email + WhatsApp + SMS delivery',
      '7 & 14-day outcome check-ins',
      'Follow-up message written for you',
      'Daily job alerts',
      '5 interview prep sets included',
      '24-hour review window',
    ],
    notIncluded: [],
    cta: 'Get started',
    ctaStyle: 'outline',
    extraApps: '₦400 per extra application',
  },
  {
    name: 'Hunt Mode',
    price: '₦8,000',
    period: '/month',
    tagline: 'All-in. For people who want every possible advantage.',
    badge: null,
    featured: false,
    features: [
      '30 tailored applications/month',
      'CV built from scratch if needed',
      'Profile & contact review',
      '"Why we picked this job" notes',
      'Email + WhatsApp + SMS delivery',
      '7 & 14-day outcome check-ins',
      'Follow-up message written for you',
      'Daily job alerts',
      '10 interview prep sets included',
      'Priority 24-hour review',
    ],
    notIncluded: [],
    cta: 'Get started',
    ctaStyle: 'outline',
    extraApps: '₦300 per extra application · Extra interview prep ₦500/set',
  },
]

export default function Pricing() {
  return (
    <section className={styles.section} id="pricing">
      <div className={styles.inner}>
        <div className={styles.label}>Pricing</div>
        <h2 className={styles.title}>Simple, honest pricing.</h2>
        <p className={styles.sub}>Start free. Upgrade when you&apos;re ready. Cancel anytime — no stress.</p>

        <div className={styles.grid}>
          {plans.map(plan => (
            <div key={plan.name} className={`${styles.card} ${plan.featured ? styles.featured : ''}`}>
              {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
              <div className={styles.planName}>{plan.name}</div>
              <div className={styles.price}>{plan.price} <span>{plan.period}</span></div>
              <div className={styles.tagline}>{plan.tagline}</div>
              <ul className={styles.features}>
                {plan.features.map(f => (
                  <li key={f}><span className={styles.check}>✓</span>{f}</li>
                ))}
                {plan.notIncluded.map(f => (
                  <li key={f} className={styles.excluded}><span className={styles.x}>✗</span>{f}</li>
                ))}
              </ul>
              {plan.extraApps && (
                <div className={styles.extraNote}>{plan.extraApps}</div>
              )}
              <a href="#signup" className={`${styles.btn} ${plan.ctaStyle === 'primary' ? styles.btnPrimary : styles.btnOutline}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className={styles.foundingNote}>
          🏆 <strong>Founding 20:</strong> The first 20 people on Starter this month lock in ₦1,500/month for life — even after we raise prices. Once those spots are filled, the offer closes.
        </div>
      </div>
    </section>
  )
}
