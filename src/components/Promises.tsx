import styles from './Promises.module.css'

const promises = [
  { icon: '🔒', title: 'Never send without your approval', body: 'Every application comes to you first. We prepare it, you review it, you send it. Nothing goes anywhere without you seeing it.' },
  { icon: '📝', title: "Never invent experience you don't have", body: 'We write from what you tell us — nothing more. Your CV will be the most professional version of the truth, not a fiction.' },
  { icon: '🚫', title: "Never promise you'll get hired", body: "We can promise the quality of our work. We cannot promise the outcome — and anyone who does is not being honest with you." },
  { icon: '🛡️', title: 'Never share your CV without permission', body: 'Your personal information and documents belong to you. We never share them with anyone without your explicit say-so.' },
  { icon: '💡', title: "Never show a score we can't explain", body: "If we ever show you a number or a rating, we can explain exactly where it came from. No made-up statistics, ever." },
  { icon: '👤', title: 'Always treat you as a person, not a ticket', body: 'We work on your career, not your paperwork. Your name, your goals, your situation — that is what we keep in mind.' },
]

export default function Promises() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Our promises</div>
          <h2 className={styles.title}>What we will never do.</h2>
          <p className={styles.sub}>These are not marketing words. They are the rules we run this business by.</p>
        </div>
        <div className={styles.grid}>
          {promises.map(p => (
            <div key={p.title} className={styles.card}>
              <div className={styles.icon}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
