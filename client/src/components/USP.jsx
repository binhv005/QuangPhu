import React from 'react';
import { Trophy, Users, Server, ShieldCheck, HelpCircle } from 'lucide-react';
import TypewriterText from './TypewriterText';
import { useLanguage } from '../context/LanguageContext';

export default function USP() {
  const { lang, dict } = useLanguage();
  const icons = [Trophy, Users, Server, ShieldCheck, HelpCircle];

  return (
    <section className="section usp-section" id="usp">
      <div className="container usp-grid">
        <div className="usp-content">
          <h2 className="section-title">
            <TypewriterText
              key={lang}
              segments={[
                { text: dict.usp.title1, className: '' },
                { text: dict.usp.title2, className: 'gold-text', lineBreak: true }
              ]}
              speed={36}
            />
          </h2>

          <p className="about-desc reveal-up" data-delay="100">
            {dict.usp.desc}
          </p>

          <div className="usp-list">
            {dict.usp.items.map((text, idx) => {
              const Icon = icons[idx % icons.length];
              return (
                <div
                  className="usp-item reveal-up"
                  data-delay={idx * 80 + 150}
                  key={idx}
                >
                  <div className="usp-icon">
                    <Icon size={22} />
                  </div>
                  <div className="usp-text">{text}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="usp-media reveal-right" data-delay="150">
          <div className="usp-media-frame">
            <img src="/assets/images/xe-nghi-truong-main.jpg" alt="Quang Phu Fine Art Mechanics" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

