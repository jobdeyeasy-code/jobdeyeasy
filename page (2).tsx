'use client'
import { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  { q: "I don't have a CV at all. Can you still help me?", a: "Yes — absolutely. If you don't have a CV, we'll build one for you from scratch. You'll answer a few simple questions on WhatsApp or our website about your work history, skills, and education, and we'll create a professional CV from your answers. It goes through the same human review as everything else before it reaches you." },
  { q: "How long does it take to get my application?", a: "Our review window is 24 hours for all paid tiers, and 48 hours for the free trial. In practice, we usually deliver faster than that. We'll always tell you the maximum wait time when you sign up, and we'll let you know the moment your application is ready." },
  { q: 'What does "AI-drafted, human-checked" actually mean?', a: "It means AI writes the first draft of your CV and cover letter, tailored to the specific job — which is faster and more consistent than writing from scratch every time. Then a real person at JobDeyEasy reads it before it ever reaches you, checking for accuracy, tone, and quality. The AI does the heavy lifting; the human makes sure it's actually good." },
  { q: "What if I use up my monthly applications before the month ends?", a: "You can buy extra applications one at a time — ₦500 each on Starter, ₦400 on Active Search, ₦300 on Hunt Mode. Or you can upgrade your tier anytime. Either way, just message us and we'll sort it out before preparing anything." },
  { q: "Do I need to download an app?", a: "No. Everything is delivered through WhatsApp, email, or SMS — whatever you're already using. You can also log in to a simple dashboard on the website to download your documents and track your applications, but there's nothing to install." },
  { q: 'What is the "Founding 20" offer exactly?', a: "The first 20 people who sign up for the Starter plan this month lock in ₦1,500/month for life — even after we raise prices later. This is a real, permanent offer, not a countdown trick. Once those 20 spots are filled, the offer closes." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel before your next billing date and you won't be charged again. No penalties, no awkward calls. Just message us or cancel from your dashboard." },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Questions</div>
          <h2 className={styles.title}>Everything you might want to know.</h2>
        </div>
        <div className={styles.list}>
          {faqs.map((f, i) => (
            <div key={i} className={`${styles.item} ${open === i ? styles.open : ''}`}>
              <button className={styles.q} onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <span className={styles.arrow}>+</span>
              </button>
              <div className={styles.a}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
