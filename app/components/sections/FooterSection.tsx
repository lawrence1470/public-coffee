'use client'

export function FooterSection() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <p className="footer-text">
          © 2024 Coffee Bird. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="#" className="footer-link">Terms</a>
          <span className="footer-divider">·</span>
          <a href="#" className="footer-link">Privacy</a>
        </div>
      </div>
    </footer>
  )
}