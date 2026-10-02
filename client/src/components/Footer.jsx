import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onPhoneClick }) {
  const { lang, dict, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer-sample">
      {/* Background Graphic: Logo Accent */}
      <div className="footer-pinwheel-bg" aria-hidden="true">
        <img
          src="/assets/images/logo.png"
          alt="Logo Quảng Phú"
          className="footer-logo-bg-img"
        />
      </div>

      <div className="container footer-sample-container">
        {/* Top Section */}
        <div className="footer-sample-top reveal-up">
          <div className="footer-sample-cols">
            {/* SITEMAP */}
            <div className="footer-sample-col">
              <h4 className="footer-sample-heading">{lang === 'en' ? 'SITEMAP' : 'SƠ ĐỒ TRANG'}</h4>
              <ul className="footer-sample-list">
                <li><Link to="/">{t('nav.home')}</Link></li>
                <li><Link to="/gioi-thieu">{t('nav.about')}</Link></li>
                <li><Link to="/dich-vu">{t('nav.services')}</Link></li>
                <li><Link to="/du-an">{t('nav.projects')}</Link></li>
                <li><Link to="/tin-tuc">{t('nav.news')}</Link></li>
                <li><Link to="/lien-he">{t('nav.contact')}</Link></li>
              </ul>
            </div>

            {/* OFFICE */}
            <div className="footer-sample-col">
              <h4 className="footer-sample-heading">{lang === 'en' ? 'OFFICE & WORKSHOP' : 'TRỤ SỞ & XƯỞNG'}</h4>
              <div className="footer-sample-text-group">
                <p>{dict.footer.addressVal}</p>
                <p>
                  <strong>{dict.footer.contactPersonLabel}</strong> {dict.footer.contactPersonVal}
                </p>
                <p className="footer-hotline-text">
                  Hotline: <a href="tel:0961031318" onClick={onPhoneClick}>0961 031 318</a>
                </p>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="footer-sample-col">
              <h4 className="footer-sample-heading">{lang === 'en' ? 'SOCIAL' : 'MẠNG XÃ HỘI'}</h4>
              <ul className="footer-sample-list">
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    Fanpage Facebook
                  </a>
                </li>
                <li>
                  <a href="https://zalo.me/0961031318" target="_blank" rel="noopener noreferrer">
                    Zalo (0961 031 318)
                  </a>
                </li>
                <li>
                  <a href="https://maps.app.goo.gl/3jSzaGFSzLRdym8LA" target="_blank" rel="noopener noreferrer">
                    Google Maps
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    Youtube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Circular Back To Top Button */}
          <div className="footer-back-to-top-wrapper">
            <button
              onClick={scrollToTop}
              className="footer-back-to-top-btn"
              aria-label={lang === 'en' ? 'Back to top' : 'Về đầu trang'}
              type="button"
            >
              <svg viewBox="0 0 100 100" className="back-to-top-svg">
                <path
                  id="textPath-back-to-top"
                  d="M 12 50 A 38 38 0 0 1 88 50"
                  fill="none"
                />
                <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" fill="none" />
                <text className="back-to-top-text" fill="#ffffff" fontSize="8" letterSpacing="1.2" fontWeight="500">
                  <textPath href="#textPath-back-to-top" startOffset="50%" textAnchor="middle">
                    {lang === 'en' ? 'BACK TO TOP' : 'VỀ ĐẦU TRANG'}
                  </textPath>
                </text>
                <path
                  d="M 50 63 L 50 37 M 43 44 L 50 37 L 57 44"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Message / Email Section */}
        <div className="footer-sample-message reveal-up" data-delay="120">
          <span className="footer-message-label">
            {lang === 'en' ? 'SEND US A MESSAGE' : 'GỬI THƯ CHO CHÚNG TÔI'}
          </span>
          <div className="footer-email-row">
            <a href="mailto:congtyquangphu@gmail.com" className="footer-email-link">
              congtyquangphu@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-sample-bottom">
          <p className="footer-copyright-full">
            © {new Date().getFullYear()} CƠ KHÍ MỸ THUẬT QUẢNG PHÚ. {dict.brand.copyright}
          </p>
          <p className="footer-copyright-short">
            © {new Date().getFullYear()} CƠ KHÍ MỸ THUẬT QUẢNG PHÚ
          </p>
        </div>
      </div>
    </footer>
  );
}
