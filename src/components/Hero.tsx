import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Founding 20 spots open — lock in ₦1,500/month for life
        </div>
        <h1 className={styles.h1}>
          We do the <span className={styles.accent}>hard part.</span> You hit Send.
        </h1>
        <p className={styles.sub}>
          JobDeyEasy finds jobs that fit you and prepares your entire application — tailored CV,
          matching cover letter, and exactly where to send it. All you do is copy, paste, and send.
        </p>
        <div className={styles.actions}>
          <a href="#signup" className={styles.btnPrimary}>Start Free Trial →</a>
          <a href="#how" className={styles.btnSecondary}>See how it works</a>
        </div>
        <div className={styles.trust}>
          <span className={styles.trustItem}><span className={styles.check}>✓</span> AI-drafted, human-checked</span>
          <span className={styles.trustItem}><span className={styles.check}>✓</span> No CV? We build one</span>
          <span className={styles.trustItem}><span className={styles.check}>✓</span> Delivered on WhatsApp</span>
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.floatTop}>
          <span className={styles.floatIcon}>✅</span>
          <div>
            <div className={styles.floatLabel}>Application ready</div>
            <div className={styles.floatValue}>GTBank — Data Analyst</div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.avatar}>💬</div>
            <div>
              <strong>JobDeyEasy</strong>
              <span>WhatsApp · online</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.msg}>
              <div className={`${styles.bubble} ${styles.them}`}>Hi! I need help applying for jobs. I don&apos;t even have a CV 😭</div>
              <div className={styles.time}>9:14 AM</div>
            </div>
            <div className={`${styles.msg} ${styles.right}`}>
              <div className={`${styles.bubble} ${styles.us}`}>No problem at all! We&apos;ll build your CV from scratch. Just answer 8 quick questions 👇</div>
              <div className={styles.time}>9:15 AM</div>
            </div>
            <div className={styles.msg}>
              <div className={`${styles.bubble} ${styles.them}`}>Okay done! What happens next?</div>
              <div className={styles.time}>9:32 AM</div>
            </div>
            <div className={`${styles.msg} ${styles.right}`}>
              <div className={`${styles.bubble} ${styles.us}`}>✅ Your CV is ready. We found 3 jobs that fit you perfectly. Everything arrives within 24 hours.</div>
              <div className={styles.time}>9:33 AM</div>
            </div>
          </div>
        </div>

        <div className={styles.floatBottom}>
          <span className={styles.floatIcon}>🎉</span>
          <div>
            <div className={styles.floatLabel}>7 days after applying</div>
            <div className={styles.floatValue}>Interview confirmed!</div>
          </div>
        </div>
      </div>
    </section>
  )
}
