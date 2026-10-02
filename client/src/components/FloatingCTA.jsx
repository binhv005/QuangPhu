import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingCTA({ onPhoneClick }) {
  const { dict } = useLanguage();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-cta-container">
      {/* Hotline Button */}
      <a
        href="tel:0961031318"
        className="float-btn float-call"
        onClick={onPhoneClick}
        aria-label={dict.common.callHotline}
        title={`${dict.common.callHotline} 0961 031 318`}
      >
        <Phone size={22} />
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/0961031318"
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn float-zalo"
        aria-label={dict.common.chatZalo}
        title={`${dict.common.chatZalo} 0961 031 318`}
      >
        <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '-0.5px' }}>ZALO</span>
      </a>

      {/* Back to top */}
      <button
        className={`float-btn float-top ${showTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label={dict.common.backToTop}
        title={dict.common.backToTop}
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}
