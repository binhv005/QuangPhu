import React from 'react';
import TypewriterText from './TypewriterText';
import AlternatingBentoGrid from './AlternatingBentoGrid';
import { servicesGeneralGallery } from '../data/servicesData';

export default function Gallery({ onOpenLightbox }) {
  const handleItemClick = (item) => {
    if (onOpenLightbox) {
      onOpenLightbox(item.src, item.title || item.caption);
    }
  };

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <div className="section-header-center reveal-up">
          <h2 className="section-title">
            <TypewriterText
              segments={[
                { text: 'HÌNH ẢNH ', className: '', lineBreak: false },
                { text: 'THỰC TẾ', className: 'gold-text', lineBreak: true }
              ]}
              speed={36}
            />
          </h2>
          <p className="section-subtitle">
            Khám phá quy trình chế tác và các sản phẩm mỹ thuật thực tế được thực hiện trực tiếp tại xưởng Quảng Phú.
          </p>
        </div>

        <AlternatingBentoGrid
          items={servicesGeneralGallery}
          onItemClick={handleItemClick}
        />
      </div>
    </section>
  );
}
