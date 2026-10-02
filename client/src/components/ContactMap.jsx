import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import TypewriterText from './TypewriterText';

export default function ContactMap({ onPhoneClick }) {
  return (
    <section className="section contact-map-section" id="contact">
      <div className="container">
        <div className="section-header-center reveal-up">
          <h2 className="section-title">
            <TypewriterText
              segments={[
                { text: 'BẢN ĐỒ & ', className: '', lineBreak: false },
                { text: 'KẾT NỐI', className: 'gold-text', lineBreak: true }
              ]}
              speed={36}
            />
          </h2>
          <p className="section-subtitle">
            Kính mời quý khách hàng và đối tác đến thăm quan trực tiếp xưởng sản xuất cơ khí mỹ thuật Quảng Phú.
          </p>
        </div>

        <div className="contact-map-grid">
          {/* Info Card */}
          <div className="contact-info-card reveal-left">
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-red-rich)', marginBottom: '0.5rem' }}>
                CÔNG TY TNHH CƠ KHÍ MỸ THUẬT QUẢNG PHÚ
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-gold-primary)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '2rem' }}>
                TINH HOA KỸ THUẬT – CHUẨN MỰC NGHỆ THUẬT
              </p>

              <div className="contact-detail-list">
                <div className="contact-detail-item">
                  <div className="detail-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="detail-label">Địa chỉ xưởng & trụ sở</div>
                    <div className="detail-value">Thôn Quảng Bố, Xã Quảng Phú, Huyện Lương Tài, Tỉnh Bắc Ninh, Việt Nam</div>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="detail-label">Người liên hệ & SĐT / Zalo</div>
                    <div className="detail-value">
                      Đỗ Hà Phương – <a href="tel:0961031318" className="hotline-link" onClick={onPhoneClick}>0961 031 318</a>
                    </div>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="detail-label">Thời gian làm việc</div>
                    <div className="detail-value">08:00 – 17:30 (Thứ 2 – Thứ 7)</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="tel:0961031318" className="btn btn-secondary-red" onClick={onPhoneClick} style={{ flex: 1 }}>
                <Phone size={18} />
                <span>GỌI 0961 031 318</span>
              </a>
              <a href="https://maps.app.goo.gl/3jSzaGFSzLRdym8LA" target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold">
                <span>Google Maps</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="map-wrapper reveal-right" data-delay="150">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14902.666992686884!2d106.1824147!3d20.9659025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31359a19c5221b6d%3A0x86bb788d57564d27!2zUXXhuqNuZyBC4buRLCBRdeG6o25nIFBow7osIEzGsMahbmcgVMOgaSwgQuG6r2MgTmluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vị trí Cơ khí Mỹ thuật Quảng Phú"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
