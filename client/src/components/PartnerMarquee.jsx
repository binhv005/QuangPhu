import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PartnerMarquee({ title, subtitle, showTitle = false }) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const displayTitle = title || (isEn ? 'Our Valued Clients' : 'Khách hàng & Đối tác tiêu biểu');
  const displaySubtitle = subtitle;

  const partners = [
    { name: 'Bộ Quốc phòng', logo: '/assets/partners/Bo-quoc-phong.webp' },
    { name: 'Bộ Công an', logo: '/assets/partners/Bo-cong-an-300x246.webp' },
    { name: 'Bộ Ngoại giao', logo: '/assets/partners/Bo-ngoai-giao-300x183.webp' },
    { name: 'Bộ Tài chính', logo: '/assets/partners/Bo-tai-chinh-300x300.webp' },
    { name: 'Bộ Khoa học & Công nghệ', logo: '/assets/partners/Bo-KHCN-300x300.webp' },
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
    { name: 'Hội Liên hiệp Thanh niên Việt Nam', logo: '/assets/partners/lien-hiep-thanh-nien-300x300.webp' },
    { name: 'Tập đoàn Điện lực Việt Nam (EVN)', logo: '/assets/partners/Artboard-3-300x156.webp' },
    { name: 'Tập đoàn Dầu khí Việt Nam (PVN)', logo: '/assets/partners/Petro-Vietnam.webp' },
    { name: 'Tập đoàn Bưu chính Viễn thông VNPT', logo: '/assets/partners/images-300x77.webp' },
    { name: 'Tổng công ty Cảng hàng không (ACV)', logo: '/assets/partners/acv-300x100.webp' },
    { name: 'Ngân hàng Agribank', logo: '/assets/partners/agribank-300x54.webp' },
    { name: 'Bảo hiểm BIC', logo: '/assets/partners/bic-300x123.webp' },
    { name: 'Ngân hàng BIDV', logo: '/assets/partners/bidv-300x98.webp' },
    { name: 'BIDV MetLife', logo: '/assets/partners/bidv-metliffe-300x68.webp' },
    { name: 'Lọc hóa dầu Bình Sơn (BSR)', logo: '/assets/partners/bsr-292x300.webp' },
    { name: 'Tập đoàn Eurowindow', logo: '/assets/partners/eurowindow-300x240.webp' },
    { name: 'Tập đoàn Ferroli', logo: '/assets/partners/ferroli-300x149.webp' },
    { name: 'Tập đoàn FLC', logo: '/assets/partners/flc.webp' },
    { name: 'Tập đoàn FPT', logo: '/assets/partners/fpt-300x182.webp' },
    { name: 'Tổng công ty HABECO', logo: '/assets/partners/habeco-300x80.webp' },
    { name: 'HANDICO', logo: '/assets/partners/handico.webp' },
    { name: 'Quản lý bay Việt Nam (VATM)', logo: '/assets/partners/logo-VATM-300x300.webp' },
    { name: 'Ngân hàng LPBank', logo: '/assets/partners/lpbank-300x74.webp' },
    { name: 'Ngân hàng Quân đội (MB)', logo: '/assets/partners/mb-300x135.webp' },
    { name: 'MobiFone', logo: '/assets/partners/mobifone-300x47.webp' },
    { name: 'Ngân hàng Nam Á', logo: '/assets/partners/nam-a-300x120.webp' },
    { name: 'Thép Nhật Quang', logo: '/assets/partners/nhatquang-300x210.webp' },
    { name: 'Tập đoàn Petrolimex', logo: '/assets/partners/petrolimex-300x150.webp' },
    { name: 'Phân bón Cà Mau (PVCFC)', logo: '/assets/partners/phan-bon-ca-mau-300x221.webp' },
    { name: 'Tập đoàn PPCAT', logo: '/assets/partners/ppcat.webp' },
    { name: 'Tổng công ty PVEP', logo: '/assets/partners/pvep-294x300.webp' },
    { name: 'Tổng công ty SABECO', logo: '/assets/partners/sabeco-300x297.webp' },
    { name: 'Ngân hàng SHB', logo: '/assets/partners/shb-300x86.webp' },
    { name: 'Tập đoàn Sun Group', logo: '/assets/partners/sungoup-300x93.webp' },
    { name: 'Tập đoàn Sunshine Group', logo: '/assets/partners/sunshine-300x150.webp' },
    { name: 'Ngân hàng Vietcombank', logo: '/assets/partners/vcb-300x103.webp' },
    { name: 'Tổng công ty VEC', logo: '/assets/partners/vec-300x300.webp' },
    { name: 'Tổng công ty VICEM', logo: '/assets/partners/vicem.webp' },
    { name: 'Ngân hàng VietinBank', logo: '/assets/partners/vietinbank-300x81.webp' },
    { name: 'Tổng công ty VINACONEX', logo: '/assets/partners/vinaconex-300x150.webp' },
    { name: 'VinaPhone', logo: '/assets/partners/vinaphone-300x225.webp' },
    { name: 'VMO Holdings', logo: '/assets/partners/vmo.webp' },
    { name: 'Vietnam Airlines', logo: '/assets/partners/vna-300x38.webp' },
    { name: 'Bảo hiểm Hàng không (VNI)', logo: '/assets/partners/vni-300x104.webp' },
    { name: 'Ngân hàng VPBank', logo: '/assets/partners/vpbank-300x68.webp' }
  ];

  const mid = Math.ceil(partners.length / 2);
  const row1 = partners.slice(0, mid);
  const row2 = partners.slice(mid);

  const renderMarqueeRow = (items, rowIndex, isReverse = false) => (
    <div className={`partner-marquee-wrapper ${isReverse ? 'marquee-reverse' : ''}`}>
      <div className={`partner-marquee-track ${isReverse ? 'track-reverse' : ''}`}>
        {/* Group 1 */}
        <div className="partner-marquee-group">
          {items.map((item, index) => (
            <div className="partner-logo-card" key={`r${rowIndex}-g1-${item.name}-${index}`} title={item.name}>
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
          {items.map((item, index) => (
            <div className="partner-logo-card" key={`r${rowIndex}-g2-${item.name}-${index}`} title={item.name}>
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
  );

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
      <div className="partner-marquee-rows-container reveal-up">
        {renderMarqueeRow(row1, 1, false)}
        {renderMarqueeRow(row2, 2, true)}
      </div>
    </section>
  );
}
