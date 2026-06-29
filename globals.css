import styles from './HowItWorks.module.css'

const steps = [
  { num: '01', icon: '📋', title: 'Tell us about yourself', body: 'Send your CV — or if you don\'t have one, answer a few simple questions on WhatsApp or our site and we\'ll build one for you from scratch.' },
  { num: '02', icon: '🔍', title: 'We find jobs that actually fit you', body: 'A real person searches for jobs that match your skills, experience, and salary range. Not random listings — jobs we\'d actually apply to if we were you.' },
  { num: '03', icon: '✍️', title: 'We do all the writing', body: 'Every application is drafted by AI and checked by a real human before it reaches you. A CV tailored to that exact role, a matching cover letter, and exactly where to send it.' },
  { num: '04', icon: '📱', title: 'We deliver it to you', body: 'Everything arrives on WhatsApp, email, or SMS — wherever you\'re most comfortable. No app to download. No complicated portal.' },
  { num: '05', icon: '🚀', title: 'You just send it', body: 'Copy, paste, attach, send. That\'s it. We even write the follow-up message for you to send a week later if you haven\'t heard back.' },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.inner}>
        <div className={styles.label}>The process</div>
        <h2 className={styles.title}>Five steps. Zero stress.</h2>
        <p className={styles.sub}>From &quot;I need a job&quot; to &quot;my application is sent&quot; — here&apos;s exactly what happens.</p>
        <div className={styles.grid}>
          {steps.map(s => (
            <div key={s.num} className={styles.step}>
              <div className={styles.num}>{s.num}</div>
              <span className={styles.icon}>{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
