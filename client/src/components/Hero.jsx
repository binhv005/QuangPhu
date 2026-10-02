import React, { useState, useEffect } from 'react';
import TypewriterText from './TypewriterText';
import { useLanguage } from '../context/LanguageContext';

function CountUpNumber({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

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

          {/* Auto Count-Up Statistics Row */}
          <div className="hero-stats-row reveal-up" data-delay="280">
            <div className="hero-stat-item">
              <div className="hero-stat-number">
                <CountUpNumber target={500} suffix="+" duration={2200} />
              </div>
              <p className="hero-stat-label">{dict.hero.statProjectsLabel}</p>
            </div>

            <div className="hero-stat-item">
              <div className="hero-stat-number">
                <CountUpNumber target={15} suffix="+" duration={1800} />
              </div>
              <p className="hero-stat-label">{dict.hero.statYearsLabel}</p>
            </div>
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
