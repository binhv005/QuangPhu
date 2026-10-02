import React, { useEffect } from 'react';
import { ZoomIn } from 'lucide-react';
import ServicesHeroShowcase from '../components/ServicesHeroShowcase';
import { servicesGeneralGallery } from '../data/servicesData';

export default function ServicesPage({ onOpenLightbox }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageClick = (src, title) => {
    if (onOpenLightbox) {
      onOpenLightbox(src, title || 'Dịch vụ Cơ khí Mỹ thuật Quảng Phú');
    }
  };

  const col1Items = servicesGeneralGallery.filter((item) => item.col === 1);
  const col2Items = servicesGeneralGallery.filter((item) => item.col === 2);
  const col3Items = servicesGeneralGallery.filter((item) => item.col === 3);

  return (
    <div className="services-page subpage-content" style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* 3 Tilted Crimson Cards Showcase Header */}
      <ServicesHeroShowcase />

      {/* 3-Column Bento Photo Gallery Grid (Matching Sample Layout) */}
      <section className="section services-pure-gallery-section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="services-bento-grid reveal-up" data-delay="100">
            {/* Column 1 (Left): Tall Top, Medium Bottom */}
            <div className="services-bento-col services-bento-col-1">
              {col1Items.map((item, idx) => (
                <div
                  key={`col1-${idx}`}
                  className={`services-bento-card services-bento-${item.type || 'medium'}`}
                  onClick={() => handleImageClick(item.src, item.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleImageClick(item.src, item.title)}
                  title={item.title}
                >
                  <div className="services-bento-img-box">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="services-bento-img"
                    />
                    <div className="services-gallery-hover-overlay">
                      <span className="photo-zoom-icon">
                        <ZoomIn size={24} color="#ffffff" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 (Center): Landscape Top, Medium Center, Landscape Bottom */}
            <div className="services-bento-col services-bento-col-2">
              {col2Items.map((item, idx) => (
                <div
                  key={`col2-${idx}`}
                  className={`services-bento-card services-bento-${item.type || 'landscape'}`}
                  onClick={() => handleImageClick(item.src, item.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleImageClick(item.src, item.title)}
                  title={item.title}
                >
                  <div className="services-bento-img-box">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="services-bento-img"
                    />
                    <div className="services-gallery-hover-overlay">
                      <span className="photo-zoom-icon">
                        <ZoomIn size={24} color="#ffffff" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 (Right): Medium Top, Tall Bottom */}
            <div className="services-bento-col services-bento-col-3">
              {col3Items.map((item, idx) => (
                <div
                  key={`col3-${idx}`}
                  className={`services-bento-card services-bento-${item.type || 'medium'}`}
                  onClick={() => handleImageClick(item.src, item.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleImageClick(item.src, item.title)}
                  title={item.title}
                >
                  <div className="services-bento-img-box">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="services-bento-img"
                    />
                    <div className="services-gallery-hover-overlay">
                      <span className="photo-zoom-icon">
                        <ZoomIn size={24} color="#ffffff" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


