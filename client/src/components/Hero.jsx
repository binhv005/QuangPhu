import React from 'react';
import TypewriterText from './TypewriterText';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { lang, dict } = useLanguage();

  return (
    <section className="hero-section hero-art-showcase" id="hero">
      {/* Background Bottom-Left Cloud Motif Layer (Blurred & Subtle in background layer) */}
      <div className="hero-bottom-left-motif" aria-hidden="true">
        <img
          src="/assets/images/bg-motif-cloud.webp"
          alt=""
          loading="eager"
        />
      </div>

      <div className="hero-split-container">
        {/* Left Column: 50% Screen Width with Subtle Motif */}
        <div className="hero-editorial-left">
          {/* Main Headline with Letter-by-Letter Typewriter */}
          <div className="hero-title-wrap">
            <h1 className="hero-editorial-title">
              <TypewriterText
                key={`hero-typewriter-${lang}`}
                segments={[
                  { text: dict.hero.titlePart1, className: 'hero-title-crimson', lineBreak: false },
                  { text: dict.hero.titlePart2, className: 'hero-title-white', lineBreak: true }
                ]}
                speed={85}
                startDelay={200}
                showCursor={true}
                hideCursorOnComplete={false}
              />
            </h1>
          </div>

          {/* Brand Tagline / Short Introduction */}
          <div className="hero-tagline-wrap reveal-up" data-delay="280">
            <p className="hero-tagline-text">{dict.hero.tagline}</p>
          </div>
        </div>

        {/* Right Column: 50% Screen Width - Rotating Trống Đồng Emblem */}
        <div className="hero-editorial-right reveal-up" data-delay="250">
          <div className="hero-rotating-emblem-wrap">
            <img
              src="/assets/images/hero-rotating-emblem.webp"
              alt={dict.hero.emblemAlt}
              className="hero-rotating-emblem-img"
              style={{ animation: 'heroEmblemRotate 22s linear infinite' }}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
