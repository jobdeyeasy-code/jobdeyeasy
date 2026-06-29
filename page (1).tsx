.section { background: var(--white); padding: 80px 24px; }
.inner { max-width: 1100px; margin: 0 auto; }
.label { font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
.title { font-family: var(--font-poppins),'Poppins',sans-serif; font-size: clamp(1.6rem,3vw,2.4rem); font-weight: 700; color: var(--dark); margin-bottom: 16px; letter-spacing: -0.5px; }
.sub { color: var(--grey); font-size: 1rem; max-width: 560px; line-height: 1.7; }

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  margin-top: 48px;
  background: var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.step { background: var(--white); padding: 32px 24px; }
.num { font-family: var(--font-poppins),'Poppins',sans-serif; font-size: 2.5rem; font-weight: 800; color: var(--green-light); line-height: 1; margin-bottom: 16px; }
.icon { font-size: 1.8rem; margin-bottom: 12px; display: block; }
.step h3 { font-family: var(--font-poppins),'Poppins',sans-serif; font-size: 1rem; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
.step p { font-size: 0.875rem; color: var(--grey); line-height: 1.6; }

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .grid { grid-template-columns: 1fr; }
  .section { padding: 56px 20px; }
}
