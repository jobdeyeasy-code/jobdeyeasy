import styles from './CTAAndFooter.module.css'

export default function CTAAndFooter() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '234XXXXXXXXXX'
  return (
    <>
      <section className={styles.ctaSection} id="signup">
        <div className={styles.ctaBox}>
          <h2>Ready to stop staring at a <span className={styles.accent}>blank page?</span></h2>
          <p>Start with one free application — no card needed. See exactly how JobDeyEasy works before you pay a single naira.</p>
          <div className={styles.actions}>
            <a href="#" className={styles.btnPrimary}>Start Free Trial →</a>
            <a href={`https://wa.me/${wa}`} className={styles.btnSecondary} target="_blank" rel="noopener noreferrer">
              💬 Message us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.footerLogo}>
            <span className={styles.green}>Job</span>
            <span className={styles.gold}>Dey</span>
            <span className={styles.green}>Easy</span>
            <div className={styles.motto}>We send. You shine.</div>
          </div>
          <div className={styles.links}>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div className={styles.copy}>
            © 2026 JobDeyEasy. Built for Nigerian job seekers, with care.
          </div>
        </div>
      </footer>

      <a href={`https://wa.me/${wa}`} className={styles.waFloat} title="Chat with us on WhatsApp" target="_blank" rel="noopener noreferrer">
        💬
      </a>
    </>
  )
}
