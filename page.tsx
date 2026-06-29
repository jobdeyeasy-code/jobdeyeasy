.section { background: var(--cream); padding: 80px 24px; }
.inner { max-width: 1100px; margin: 0 auto; }

.header { text-align: center; margin-bottom: 48px; }
.label { font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
.title { font-family: var(--font-poppins),'Poppins',sans-serif; font-size: clamp(1.6rem,3vw,2.4rem); font-weight: 700; color: var(--dark); letter-spacing: -0.5px; }

.list { width: 100%; }
.item { border-bottom: 1px solid var(--border); }
.q {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 22px 0;
  font-family: var(--font-poppins),'Poppins',sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.q:hover { color: var(--green); }
.arrow { color: var(--green); font-size: 1.4rem; transition: transform 0.2s; flex-shrink: 0; line-height: 1; }
.open .arrow { transform: rotate(45deg); }

.a {
  font-size: 0.925rem;
  color: var(--grey);
  line-height: 1.75;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding-bottom 0.3s;
}
.open .a { max-height: 300px; padding-bottom: 22px; }

@media (max-width: 560px) {
  .section { padding: 56px 20px; }
  .q { font-size: 0.9rem; }
}
