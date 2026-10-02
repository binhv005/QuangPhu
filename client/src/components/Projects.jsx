import React, { useState, useEffect } from 'react';
import TypewriterText from './TypewriterText';
import { useLanguage } from '../context/LanguageContext';

export default function Projects({ onOpenLightbox }) {
  const { lang, dict } = useLanguage();

  const defaultProjectsVi = [
    {
      title: 'Khối xe nghi trượng A05',
      category: 'ĐẠI LỄ QUỐC GIA',
      image: '/assets/images/xe-nghi-truong-main.jpg'
    },
    {
      title: 'Tượng đài chiến thắng',
      category: 'CÔNG TRÌNH TƯỢNG ĐÀI',
      image: '/assets/images/tuong-dai-chien-thang.jpg'
    },
    {
      title: 'Tượng Bác Hồ',
      category: 'TƯỢNG CHÂN DUNG',
      image: '/assets/images/tuong-bac-ho.jpg'
    },
    {
      title: 'Công trình di tích',
      category: 'DI TÍCH LỊCH SỬ',
      image: '/assets/images/cong-trinh-di-tich.jpg'
    }
  ];

  const defaultProjectsEn = [
    {
      title: 'Ceremonial Float A05',
      category: 'NATIONAL CEREMONY',
      image: '/assets/images/xe-nghi-truong-main.jpg'
    },
    {
      title: 'Victory Monument',
      category: 'MONUMENTAL SCULPTURE',
      image: '/assets/images/tuong-dai-chien-thang.jpg'
    },
    {
      title: 'President Ho Chi Minh Statue',
      category: 'PORTRAIT STATUE',
      image: '/assets/images/tuong-bac-ho.jpg'
    },
    {
      title: 'Heritage Site Installation',
      category: 'HISTORICAL HERITAGE',
      image: '/assets/images/cong-trinh-di-tich.jpg'
    }
  ];

  const [projects, setProjects] = useState(lang === 'en' ? defaultProjectsEn : defaultProjectsVi);

  useEffect(() => {
    setProjects(lang === 'en' ? defaultProjectsEn : defaultProjectsVi);
  }, [lang]);

  useEffect(() => {
    // Fetch dynamic project list from MongoDB API
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.data.length > 0) {
          setProjects(data.data);
        }
      })
      .catch((err) => console.log('Using default project list:', err));
  }, []);

  return (
    <section className="section projects-section" id="projects">
      {/* Decorative Gold Artwork Background Layer */}
      <div className="home-bg-motif home-bg-motif-light motif-cloud-top-left" aria-hidden="true" />
      <div className="home-bg-motif home-bg-motif-light motif-mountain-bottom-right" aria-hidden="true" />

      <div className="container">
        <div className="section-header-center reveal-up">
          <h2 className="section-title">
            <TypewriterText
              key={lang}
              segments={[
                { text: dict.projects.sectionTitle1, className: '', lineBreak: false },
                { text: dict.projects.sectionTitle2, className: 'gold-text', lineBreak: true }
              ]}
              speed={36}
            />
          </h2>
          <p className="section-subtitle">
            {dict.projects.subtitle}
          </p>
        </div>

        <div className="projects-track">
          {projects.map((item, idx) => (
            <div
              className="project-item reveal-scale"
              data-delay={idx * 110}
              key={idx}
              onClick={() => onOpenLightbox(item.image, item.title)}
            >
              <div className="project-img-wrap">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="project-overlay">
                  <span className="project-cat">{item.category}</span>
                  <h4 className="project-name">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
