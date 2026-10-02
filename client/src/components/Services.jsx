import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TypewriterText from './TypewriterText';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { lang, dict } = useLanguage();
  const allServices = dict.services.items;
  const leftColumnServices = [allServices[0], allServices[2]].filter(Boolean);
  const rightColumnServices = [allServices[1], allServices[3]].filter(Boolean);

  return (
    <section className="section products-section services-masonry-section" id="services">
      {/* Decorative Gold Artwork Background Layer */}
      <div className="home-bg-motif home-bg-motif-light motif-cloud-top-right" aria-hidden="true" />
      <div className="home-bg-motif home-bg-motif-light motif-mountain-bottom-left" aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className="services-masonry-header reveal-up">
          <h2 className="services-masonry-title">
            <TypewriterText
              key={lang}
              segments={[
                { text: dict.services.sectionTitle1, className: '', lineBreak: false },
                { text: dict.services.sectionTitle2, className: 'gold-text', lineBreak: true }
              ]}
              speed={36}
            />
          </h2>
          <p className="services-masonry-subtitle">
            {dict.services.subtitle}
          </p>
        </div>

        {/* 2-Column Staggered Masonry Grid */}
        <div className="services-masonry-grid">
          {/* Column 1 (Left) */}
          <div className="services-masonry-col services-col-left">
            {leftColumnServices.map((item, idx) => (
              <article className="services-masonry-item reveal-up" key={item.num} data-delay={idx * 140}>
                <Link to={item.link} className="services-item-img-link">
                  <div className="services-item-img-wrap">
                    <img src={item.img} alt={item.title} loading="lazy" />
                  </div>
                </Link>
                <div className="services-item-content">
                  <h3 className="services-item-title">
                    <Link to={item.link}>{item.title}</Link>
                  </h3>
                  <p className="services-item-desc">{item.desc}</p>
                </div>
              </article>
            ))}

            {/* Bottom Link "Xem tất cả dịch vụ ->" */}
            <div className="services-masonry-all-link-wrap reveal-up" data-delay="300">
              <Link to="/dich-vu" className="services-all-projects-link">
                <span>{dict.services.viewAll}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Column 2 (Right - Staggered Offset Down) */}
          <div className="services-masonry-col services-col-right">
            {rightColumnServices.map((item, idx) => (
              <article className="services-masonry-item reveal-up" key={item.num} data-delay={idx * 140 + 100}>
                <Link to={item.link} className="services-item-img-link">
                  <div className="services-item-img-wrap">
                    <img src={item.img} alt={item.title} loading="lazy" />
                  </div>
                </Link>
                <div className="services-item-content">
                  <h3 className="services-item-title">
                    <Link to={item.link}>{item.title}</Link>
                  </h3>
                  <p className="services-item-desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

