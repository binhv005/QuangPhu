import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import { newsArticles } from '../data/newsData';

export default function NewsDetailPage({ onToast, onOpenLightbox }) {
  const { slug } = useParams();

  const article = newsArticles.find(
    (a) => a.slug === slug || String(a.id) === slug
  );

  if (!article) {
    return (
      <div className="subpage-content" style={{ padding: '130px 0 80px', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title">Không tìm thấy bài viết</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang đường dẫn khác.
          </p>
          <Link to="/tin-tuc" className="btn btn-primary-gold">
            <ArrowLeft size={16} />
            <span>QUAY LẠI TIN TỨC</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleImageClick = (src, title) => {
    if (onOpenLightbox) {
      onOpenLightbox(src, title);
    }
  };

  return (
    <div className="page-wrapper news-detail-page subpage-content project-detail-layout">
      {/* Breadcrumb Navigation */}
      <section className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <Link to="/">Trang chủ</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/tin-tuc">Tin tức</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="current">{article.title}</span>
          </div>
        </div>
      </section>

      {/* Top Header Section: Tiêu đề + Vài câu text tóm tắt */}
      <section className="project-detail-header-section">
        <div className="container">
          <div className="project-detail-header-inner">
            <h1 className="project-main-heading">
              {article.title}
            </h1>

            {article.summary && (
              <div className="project-intro-lead">
                <p>{article.summary}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Body: Toàn bộ ảnh thuần túy (Không có text đè lên ảnh) */}
      <section className="project-gallery-section">
        <div className="container">
          <div className="project-gallery-grid">
            {article.gallery && article.gallery.map((item, idx) => (
              <div
                key={idx}
                className={`project-photo-item span-${item.span || 'half'}`}
                onClick={() => handleImageClick(item.src, item.title || article.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleImageClick(item.src, item.title || article.title)}
                title="Bấm để phóng to ảnh"
              >
                <div className="project-photo-wrap">
                  <img
                    src={item.src}
                    alt={item.title || article.title}
                    loading="lazy"
                    className="project-photo-img"
                  />
                  <div className="project-photo-overlay-pure">
                    <span className="photo-zoom-icon">
                      <ZoomIn size={24} color="#ffffff" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Back Button */}
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Link to="/tin-tuc" className="btn btn-outline-gold">
              <ArrowLeft size={16} />
              <span>QUAY LẠI DANH SÁCH TIN TỨC</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
