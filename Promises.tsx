.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250,248,243,0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
}
.inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.wordmark {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.3px;
}
.green { color: var(--green); }
.gold  { color: var(--gold); }

.links {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
}
.links a {
  text-decoration: none;
  color: var(--grey);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}
.links a:hover { color: var(--green); }
.cta {
  background: var(--green) !important;
  color: var(--white) !important;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 600 !important;
}
.cta:hover { background: var(--green-dark) !important; }

@media (max-width: 768px) {
  .links { display: none; }
}
