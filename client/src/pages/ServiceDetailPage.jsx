import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import { servicesDataList } from '../data/servicesData';

export default function ServiceDetailPage({ onOpenLightbox }) {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const service = servicesDataList.find(
    (s) => s.slug === slug || s.id === slug
  );

  if (!service) {
    return (
      <div className="subpage-content" style={{ padding: '130px 0 80px', textAlign: 'center', backgroundColor: '#000000', minHeight: '80vh', color: '#ffffff' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: '#ffffff' }}>Không tìm thấy dịch vụ</h2>
          <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>
            Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã được cập nhật.
          </p>
          <Link to="/dich-vu" className="btn btn-outline-gold">
            <ArrowLeft size={16} />
            <span>QUAY LẠI TRANG DỊCH VỤ</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleImageClick = (src, title) => {
    if (onOpenLightbox) {
      onOpenLightbox(src, title || service.title);
    }
  };

  return (
    <div className="page-wrapper project-editorial-detail-page subpage-content">
      <div className="container project-detail-container">
        {/* Breadcrumb Navigation */}
        <nav className="project-detail-breadcrumb reveal-up">
          <Link to="/dich-vu" className="breadcrumb-parent">Dịch vụ</Link>
          <span className="breadcrumb-slash">/</span>
          <span className="breadcrumb-current">{service.title}</span>
        </nav>

        {/* Top Header Section: Service Number on Left + Title on Right */}
        <header className="project-detail-top-header reveal-up" data-delay="60">
          <div className="project-detail-date-col">
            <span className="project-detail-day">{service.badgeNum || '01'}</span>
            <span className="project-detail-month">{service.badgeSub || 'Dịch vụ'}</span>
          </div>
          <div className="project-detail-title-col">
            <h1 className="project-detail-heading">
              {service.title}
            </h1>
          </div>
        </header>

        {/* Article Story Text Paragraphs */}
        <div className="project-detail-story-content reveal-up" data-delay="120">
          {service.paragraphs && service.paragraphs.map((p, idx) => (
            <p key={idx} className="project-detail-p">
              {p}
            </p>
          ))}
        </div>

        {/* Photo Gallery (Pure images below text) */}
        <div className="project-detail-gallery-grid reveal-up" data-delay="180">
          {service.gallery && service.gallery.map((item, idx) => (
            <div
              key={idx}
              className={`project-detail-photo-card span-${item.span || 'half'}`}
              onClick={() => handleImageClick(item.src, service.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleImageClick(item.src, service.title)}
              title="Bấm để phóng to ảnh"
            >
              <div className="project-detail-photo-wrap">
                <img
                  src={item.src}
                  alt={`${service.title} - ảnh ${idx + 1}`}
                  loading="lazy"
                  className="project-detail-img"
                />
                <div className="project-detail-photo-overlay">
                  <span className="photo-zoom-icon">
                    <ZoomIn size={24} color="#ffffff" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link at bottom */}
        <div className="project-detail-back-row">
          <Link to="/dich-vu" className="btn btn-outline-gold">
            <ArrowLeft size={16} />
            <span>QUAY LẠI TRANG DỊCH VỤ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
