export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4 className="footer-heading">About Us</h4>
          <p className="footer-desc">
            Leading supplier of quality pipes and hoses for industrial,
            commercial, and residential applications.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#">Catalog</a></li>
            <li><a href="#">Technical Specs</a></li>
            <li><a href="#">Bulk Orders</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Customer Services</h4>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Visit Us</h4>
          <div className="footer-address">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <p>JL. Raya Kepatihan No.168A, Kepatihan, Kec. Menganti, Kabupaten Gresik, Jawa Timur 61174</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PT Tjakrindo Mas. All rights reserved.</p>
      </div>
    </footer>
  );
}