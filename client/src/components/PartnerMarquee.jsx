import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PartnerMarquee({ title, subtitle, showTitle = false }) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const displayTitle = title || (isEn ? 'Our Valued Clients' : 'Khách hàng & Đối tác tiêu biểu');
  const displaySubtitle = subtitle;

  const partners = [
    { name: 'Bộ Quốc phòng', logo: '/assets/partners/Bo-quoc-phong.svg' },
    { name: 'Bộ Công an', logo: '/assets/partners/Bo-cong-an-300x246.webp' },
    { name: 'Bộ Ngoại giao', logo: '/assets/partners/Bo-ngoai-giao-300x183.webp' },
    { name: 'Bộ Tài chính', logo: '/assets/partners/Bo-tai-chinh-300x300.webp' },
    { name: 'Bộ Khoa học & Công nghệ', logo: '/assets/partners/Bo-KHCN-300x300.webp' },
    { name: 'Bộ Văn hoá, Thể thao và Du lịch', logo: '/assets/partners/Bo-quoc-phong.svg' },
    { name: 'Bộ Giáo dục và Đào tạo', logo: '/assets/partners/Bo-quoc-phong.svg' },
    { name: 'Bộ Nông nghiệp và Môi trường', logo: '/assets/partners/Bo-quoc-phong.svg' },
    { name: 'Bộ Xây dựng', logo: '/assets/partners/Bo-quoc-phong.svg' },
    { name: 'Ngân hàng Nhà nước', logo: '/assets/partners/Ngan-hang-nha-nuoc-300x213.webp' },
    { name: 'UBND TP. Hà Nội', logo: '/assets/partners/HN-300x300.webp' },
    { name: 'UBND TP. Hải Phòng', logo: '/assets/partners/Hai-Phong-300x300.webp' },
    { name: 'UBND TP. Đà Nẵng', logo: '/assets/partners/Da-Nang-300x300.webp' },
    { name: 'Tỉnh Bắc Ninh', logo: '/assets/partners/Bac-Ninh-300x300.webp' },
    { name: 'Tỉnh Ninh Bình', logo: '/assets/partners/Ninh-Binh-300x300.webp' },
    { name: 'Tỉnh Quảng Trị', logo: '/assets/partners/Quang-Tri-300x300.webp' },
    { name: 'Tỉnh Thái Nguyên', logo: '/assets/partners/Thai-Nguyen-300x300.webp' },
    { name: 'Tỉnh Gia Lai', logo: '/assets/partners/Gia-Lai-300x300.webp' },
    { name: 'Tỉnh Lào Cai', logo: '/assets/partners/Lao-Cai-300x300.webp' },
    { name: 'Trung ương Đoàn TNCS Hồ Chí Minh', logo: '/assets/partners/TW-doan-272x300.webp' },
    { name: 'Tổng Liên đoàn Lao động Việt Nam', logo: '/assets/partners/tong-lien-doan-300x277.webp' },
    { name: 'Hội Nông dân Việt Nam', logo: '/assets/partners/hoi-nong-dan-300x300.webp' },
    { name: 'Hội Liên hiệp Thanh niên Việt Nam', logo: '/assets/partners/lien-hiep-thanh-nien-300x300.webp' }
  ];

  return (
    <section className="partner-marquee-section" id="partners">
      {showTitle && (
        <div className="container" style={{ marginBottom: '28px', textAlign: 'center' }}>
          <div className="section-header-center">
            <h2 className="section-title" style={{ color: '#111111', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              {displayTitle}
            </h2>
            {displaySubtitle && (
              <p className="section-subtitle" style={{ color: '#666666', marginTop: '6px', fontSize: '0.95rem', maxWidth: '650px', margin: '6px auto 0' }}>
                {displaySubtitle}
              </p>
            )}
            <div className="red-divider-center" style={{ width: '48px', height: '3px', background: 'var(--color-red-primary, #e53935)', margin: '14px auto 0', borderRadius: '2px' }} />
          </div>
        </div>
      )}
      <div className="partner-marquee-wrapper reveal-up">
        <div className="partner-marquee-track">
          {/* Group 1 */}
          <div className="partner-marquee-group">
            {partners.map((item, index) => (
              <div className="partner-logo-card" key={`g1-${item.name}-${index}`} title={item.name}>
                <div className="partner-logo-img-wrap">
                  <img
                    src={item.logo}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <span className="partner-logo-name">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Group 2 (Duplicate for infinite seamless loop) */}
          <div className="partner-marquee-group" aria-hidden="true">
            {partners.map((item, index) => (
              <div className="partner-logo-card" key={`g2-${item.name}-${index}`} title={item.name}>
                <div className="partner-logo-img-wrap">
                  <img
                    src={item.logo}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <span className="partner-logo-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
