import { useRef, useEffect } from 'react';

export default function Header({ searchQuery, onSearchChange, onMenuClick }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="header">
      {/* Left – Logo */}
      <div className="logo-wrap">
        <img 
          src="/images/logo/logo-tjakrindo.png"
          alt="PT Tjakrindo Mas"
          className="logo-image"
          width="240"
          height="100"
        />
      </div>

      {/* Center – Search */}
      <div className="header-center">
        <div className="header-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari produk…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Cari produk"
          />
        </div>
      </div>

      {/* Right – Contact + hamburger */}
      <div className="header-right">
        <div className="header-contact">
          <a href="tel:+62317993818" className="contact-item" aria-label="Telepon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.36 2 2 0 0 1 3.62 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
            </svg>
            <span>+62 31 799 3818</span>
          </a>
          <div className="contact-divider" />
          <a href="mailto:info@tjakrindomas.com" className="contact-item" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
            <span>info@tjakrindomas.com</span>
          </a>
        </div>

        <button className="btn-hamburger" onClick={onMenuClick} aria-label="Buka Filter">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}