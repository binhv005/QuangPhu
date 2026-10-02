import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectCategories, projectsList } from '../data/projectsData';

export default function ProjectCategoryPage({ category: categoryProp }) {
  const { catSlug } = useParams();
  const { lang } = useLanguage();

  const activeCatKey = categoryProp || catSlug || 'bo-ban-nganh';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCatKey]);

  // Find category meta info
  const categoryInfo = projectCategories.find((c) => c.key === activeCatKey) || {
    key: activeCatKey,
    label: activeCatKey === 'bo-ban-nganh'
      ? 'Dự án Bộ Ban Ngành'
      : activeCatKey === 'sang-tao'
      ? 'Dự án Sáng tạo'
      : activeCatKey === 'brand'
      ? 'Dự án Brand'
      : 'Dự án'
  };

  // Filter projects by category (or all if none match)
  const categoryProjects = projectsList.filter(
    (p) => p.category === activeCatKey || activeCatKey === 'all'
  );

  const displayProjects = categoryProjects.length > 0 ? categoryProjects : projectsList;

  return (
    <div className="page-wrapper project-category-list-page subpage-content">
      <div className="container project-category-container">
        {/* Top Category Main Title */}
        <header className="project-category-header reveal-up">
          <h1 className="project-category-page-title">
            {categoryInfo.label}
          </h1>
        </header>

        {/* List of projects in this category (Matching Reference Image 2) */}
        <div className="project-category-list">
          {displayProjects.map((project, idx) => {
            const monthText = project.month ? (project.month.startsWith('Th') ? `Tháng ${project.month.replace('Th', '')}` : project.month) : 'Tháng 8';
            const shortDesc = project.paragraphs && project.paragraphs[0] ? project.paragraphs[0] : '';

            return (
              <article
                key={project.id || idx}
                className="project-category-item reveal-up"
                data-delay={idx * 80}
              >
                {/* Date Column */}
                <div className="project-category-date-col">
                  <span className="project-category-day">{project.day || '27'}</span>
                  <span className="project-category-month">{monthText}</span>
                </div>

                {/* Thumbnail Image Box */}
                <div className="project-category-thumb-box">
                  <Link to={`/du-an/${project.slug}`} className="project-category-thumb-link">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="project-category-thumb-img"
                    />
                  </Link>
                </div>

                {/* Content Column: Title, Paragraph, and Read More link */}
                <div className="project-category-content-col">
                  <h2 className="project-category-item-title">
                    <Link to={`/du-an/${project.slug}`} className="project-category-title-link">
                      {project.title}
                    </Link>
                  </h2>

                  <p className="project-category-item-desc">
                    {shortDesc}
                  </p>

                  <div className="project-category-action">
                    <Link to={`/du-an/${project.slug}`} className="project-category-readmore-btn">
                      <span>Xem Chi Tiết</span>
                      <ArrowRight size={17} className="project-category-arrow-icon" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
