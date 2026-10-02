import React from 'react';
import { Search } from 'lucide-react';
import TypewriterText from './TypewriterText';

export default function Gallery({ onOpenLightbox }) {
  const galleryItems = [
    {
      src: '/assets/images/gallery-cham-dong.webp',
      caption: 'Chạm khắc đồng mỹ nghệ thủ công tinh xảo',
      span2: true
    },
    {
      src: '/assets/images/about-artisan.webp',
      caption: 'Nghệ nhân gọt giũa tượng chân dung danh nhân',
      span2: false
    },
    {
      src: '/assets/images/xe-nghi-truong-main.webp',
      caption: 'Khối xe nghi trượng uy nghiêm tại đại lễ kỷ niệm',
      span2: false
    },
    {
      src: '/assets/images/gallery-nha-xuong.webp',
      caption: 'Xưởng sản xuất cơ khí mỹ thuật quy mô lớn',
      span2: false
    },
    {
      src: '/assets/images/tuong-dai-chien-thang.webp',
      caption: 'Công trình tượng đài chiến thắng ngoài trời',
      span2: false
    }
  ];

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

        <div className="gallery-grid">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`gallery-item reveal-scale ${item.span2 ? 'span-2' : ''}`}
              data-delay={idx * 100}
              onClick={() => onOpenLightbox(item.src, item.caption, idx)}
            >
              <img src={item.src} alt={item.caption} loading="lazy" />
              <div className="gallery-hover-overlay">
                <span className="gallery-caption">{item.caption}</span>
              </div>
              <div className="gallery-zoom-icon">
                <Search size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
