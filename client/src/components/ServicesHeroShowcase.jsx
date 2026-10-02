import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function ServicesHeroShowcase({ onScrollToService }) {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const cardsVi = [
    {
      id: 'xe-nghi-truong',
      titleLine1: 'Tổ chức',
      titleLine2: 'Sự kiện',
      sub: 'Khối xe nghi trượng A05 – A80',
      img: '/assets/images/xe-nghi-truong-main.jpg',
      tiltClass: 'tilt-left'
    },
    {
      id: 'tuong-tho',
      titleLine1: 'Tượng đài &',
      titleLine2: 'Chân dung',
      sub: 'Tượng Bác Hồ & Tượng thờ gia tiên',
      img: '/assets/images/tuong-bac-ho.jpg',
      tiltClass: 'tilt-center'
    },
    {
      id: 'qua-tang',
      titleLine1: 'Sản xuất',
      titleLine2: 'Mỹ thuật & Quà tặng',
      sub: 'Biểu trưng độc bản & Cơ khí nghệ thuật',
      img: '/assets/images/qua-tang-my-thuat.jpg',
      tiltClass: 'tilt-right'
    }
  ];

  const cardsEn = [
    {
      id: 'xe-nghi-truong',
      titleLine1: 'Event',
      titleLine2: 'Organization',
      sub: 'Grand Ceremonial Floats A05 – A80',
      img: '/assets/images/xe-nghi-truong-main.jpg',
      tiltClass: 'tilt-left'
    },
    {
      id: 'tuong-tho',
      titleLine1: 'Monuments &',
      titleLine2: 'Portraits',
      sub: 'President Ho Chi Minh & Ancestral Statues',
      img: '/assets/images/tuong-bac-ho.jpg',
      tiltClass: 'tilt-center'
    },
    {
      id: 'qua-tang',
      titleLine1: 'Artistic &',
      titleLine2: 'Luxury Gifts',
      sub: 'Exclusive Emblems & Precision Art',
      img: '/assets/images/qua-tang-my-thuat.jpg',
      tiltClass: 'tilt-right'
    }
  ];

  const cards = lang === 'en' ? cardsEn : cardsVi;

  const handleClick = (id) => {
    if (onScrollToService) {
      onScrollToService(id);
    } else {
      navigate(`/dich-vu/${id}`);
    }
  };

  return (
    <section className="services-hero-showcase-section">
      <div className="services-showcase-bg-layer" />

      <div className="services-showcase-container">
        <div className="services-showcase-trio reveal-up" data-delay="100">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`services-tilted-card ${card.tiltClass}`}
              onClick={() => handleClick(card.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(card.id)}
            >
              <div className="services-card-surface">
                {/* Full-bleed Showcase Image */}
                <img
                  src={card.img}
                  alt={`${card.titleLine1} ${card.titleLine2}`}
                  className="services-card-img"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay for Crisp Text Contrast */}
                <div className="services-card-overlay" />

                {/* Bottom Left Title Text */}
                <div className="services-card-caption">
                  <h3 className="services-caption-title">
                    <span className="services-caption-line">
                      {card.titleLine1}
                    </span>
                    <span className="services-caption-line">
                      {card.titleLine2}
                    </span>
                  </h3>
                  <p className="services-caption-sub">{card.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
