import React, { useEffect } from 'react';
import ServicesHeroShowcase from '../components/ServicesHeroShowcase';
import AlternatingBentoGrid from '../components/AlternatingBentoGrid';
import { servicesGeneralGallery } from '../data/servicesData';

export default function ServicesPage({ onOpenLightbox }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageClick = (item) => {
    if (onOpenLightbox) {
      onOpenLightbox(item.src, item.title || 'Dịch vụ Cơ khí Mỹ thuật Quảng Phú');
    }
  };

  return (
    <div className="services-page subpage-content" style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* 3 Tilted Crimson Cards Showcase Header */}
      <ServicesHeroShowcase />

      {/* Alternating Pattern Bento Photo Gallery Grid (Matching Templates A & B) */}
      <section className="section services-pure-gallery-section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <AlternatingBentoGrid
            items={servicesGeneralGallery}
            onItemClick={handleImageClick}
          />
        </div>
      </section>
    </div>
  );
}
