import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projectsList } from '../data/projectsData';
import AlternatingBentoGrid from '../components/AlternatingBentoGrid';

export default function ProjectDetailPage({ onOpenLightbox }) {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const project = projectsList.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="subpage-content" style={{ padding: '130px 0 80px', textAlign: 'center', backgroundColor: '#000000', minHeight: '80vh', color: '#ffffff' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: '#ffffff' }}>Không tìm thấy dự án</h2>
          <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>
            Dự án bạn đang tìm kiếm không tồn tại hoặc đã được cập nhật.
          </p>
          <Link to="/du-an" className="btn btn-outline-gold">
            <ArrowLeft size={16} />
            <span>QUAY LẠI TRANG DỰ ÁN</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleImageClick = (item) => {
    if (onOpenLightbox) {
      onOpenLightbox(item.src, item.title || project.title);
    }
  };

  const monthText = project.month ? (project.month.startsWith('Th') ? `Tháng ${project.month.replace('Th', '')}` : project.month) : 'Tháng 8';

  return (
    <div className="page-wrapper project-editorial-detail-page subpage-content">
      <div className="container project-detail-container">
        {/* Breadcrumb Navigation */}
        <nav className="project-detail-breadcrumb reveal-up">
          <Link to="/du-an" className="breadcrumb-parent">Dự án</Link>
          <span className="breadcrumb-slash">/</span>
          <span className="breadcrumb-current">{project.title}</span>
        </nav>

        {/* Top Header Section: Project Day/Month on Left + Title on Right */}
        <header className="project-detail-top-header reveal-up" data-delay="60">
          <div className="project-detail-date-col">
            <span className="project-detail-day">{project.day || '27'}</span>
            <span className="project-detail-month">{monthText}</span>
          </div>
          <div className="project-detail-title-col">
            <h1 className="project-detail-heading">
              {project.title}
            </h1>
          </div>
        </header>

        {/* Article Story Text Paragraphs */}
        <div className="project-detail-story-content reveal-up" data-delay="120">
          {project.paragraphs && project.paragraphs.map((p, idx) => (
            <p key={idx} className="project-detail-p">
              {p}
            </p>
          ))}
        </div>

        {/* Photo Gallery (Alternating Bento Clusters Matching Reference Templates) */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="reveal-up" data-delay="180" style={{ marginBottom: '60px' }}>
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#ffffff', textAlign: 'left' }}>
              BỘ SƯU TẬP <span className="gold-text">HÌNH ẢNH CÔNG TRÌNH THỰC TẾ</span>
            </h2>
            <AlternatingBentoGrid
              items={project.gallery}
              onItemClick={handleImageClick}
            />
          </div>
        )}

        {/* Back Link at bottom */}
        <div className="project-detail-back-row">
          <Link to="/du-an" className="btn btn-outline-gold">
            <ArrowLeft size={16} />
            <span>QUAY LẠI TRANG DỰ ÁN</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
