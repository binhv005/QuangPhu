import React from 'react';
import { Link } from 'react-router-dom';
import Capabilities from '../components/Capabilities';
import Process from '../components/Process';
import USP from '../components/USP';
import { ArrowRight } from 'lucide-react';

export default function CapabilitiesPage() {
  return (
    <div className="capabilities-page subpage-content">
      {/* Capabilities 3 Pillars */}
      <Capabilities />

      <div className="section-divider" />

      {/* Process 6 Steps */}
      <Process />

      <div className="section-divider" />

      {/* USP */}
      <USP />

      {/* Call to Action */}
      <section className="section" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(184, 134, 11, 0.08) 0%, #f8f5ee 70%)', textAlign: 'center' }}>
        <div className="container">
          <div className="reveal-up" style={{ maxWidth: '750px', margin: '0 auto' }}>
            <h2 className="section-title">
              SẴN SÀNG TRIỂN KHAI <span className="gold-text">CÔNG TRÌNH CỦA BẠN</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Hãy để Quảng Phú biến ý tưởng và bản thiết kế của bạn thành hiện thực với chất lượng bền vững nhất.
            </p>
            <Link to="/lien-he" className="btn btn-primary-gold">
              <span>LIÊN HỆ ĐỘI NGŨ KỸ SƯ & NGHỆ NHÂN</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
