const styles = {
  footer: {
    background: '#0F1535',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    padding: '60px 0 24px',
    marginTop: 'auto',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: 40,
    marginBottom: 40,
  },
  brand: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 22,
    fontWeight: 800,
    background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: 12,
  },
  desc: {
    color: '#6B7394',
    fontSize: 14,
    lineHeight: 1.7,
    maxWidth: 320,
    marginBottom: 16,
  },
  socialLinks: {
    display: 'flex',
    gap: 12,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#B0B8D1',
    textDecoration: 'none',
    fontSize: 16,
    transition: 'all 0.3s ease',
  },
  columnTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 16,
  },
  linksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    color: '#6B7394',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'color 0.3s ease',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    marginBottom: 24,
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  copyright: {
    color: '#4A5278',
    fontSize: 13,
  },
  bottomLinks: {
    display: 'flex',
    gap: 20,
  },
  bottomLink: {
    color: '#4A5278',
    textDecoration: 'none',
    fontSize: 13,
    transition: 'color 0.3s ease',
  },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div>
            <div style={styles.brand}>PrimePredict</div>
            <p style={styles.desc}>
              Kenya&apos;s most accurate football prediction platform. Get expert analysis, 
              premium tips, and data-driven predictions to maximize your winning potential.
            </p>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialIcon} aria-label="Twitter / X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" style={styles.socialIcon} aria-label="Telegram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              <a href="#" style={styles.socialIcon} aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <div style={styles.columnTitle}>Quick Links</div>
            <ul style={styles.linksList}>
              <li><a href="/predictions" style={styles.link}>Free Predictions</a></li>
              <li><a href="/premium" style={styles.link}>Premium Tips</a></li>
              <li><a href="/pricing" style={styles.link}>Pricing Plans</a></li>
              <li><a href="/results" style={styles.link}>Results</a></li>
              <li><a href="/dashboard" style={styles.link}>Dashboard</a></li>
            </ul>
          </div>

          <div>
            <div style={styles.columnTitle}>Predictions</div>
            <ul style={styles.linksList}>
              <li><a href="/predictions?category=1x2" style={styles.link}>1X2 Predictions</a></li>
              <li><a href="/predictions?category=over-under" style={styles.link}>Over/Under</a></li>
              <li><a href="/predictions?category=btts" style={styles.link}>BTTS</a></li>
              <li><a href="/predictions?category=double-chance" style={styles.link}>Double Chance</a></li>
              <li><a href="/predictions?category=ht-ft" style={styles.link}>HT/FT</a></li>
              <li><a href="/predictions?category=correct-score" style={styles.link}>Correct Score</a></li>
            </ul>
          </div>

          <div>
            <div style={styles.columnTitle}>Support</div>
            <ul style={styles.linksList}>
              <li><a href="#" style={styles.link}>Help Center</a></li>
              <li><a href="#" style={styles.link}>Privacy Policy</a></li>
              <li><a href="#" style={styles.link}>Terms of Service</a></li>
              <li><a href="#" style={styles.link}>Contact Us</a></li>
              <li><a href="#" style={styles.link}>FAQ</a></li>
            </ul>
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.bottom}>
          <span style={styles.copyright}>
            &copy; {new Date().getFullYear()} PrimePredict.co.ke. All rights reserved.
          </span>
          <div style={styles.bottomLinks}>
            <a href="#" style={styles.bottomLink}>Privacy Policy</a>
            <a href="#" style={styles.bottomLink}>Terms of Service</a>
            <a href="#" style={styles.bottomLink}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

