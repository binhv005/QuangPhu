import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectCategories, projectsList } from '../data/projectsData';
import AlternatingBentoGrid from '../components/AlternatingBentoGrid';

export default function ProjectCategoryPage({ category: categoryProp }) {
  const { catSlug } = useParams();
  const { lang } = useLanguage();
  const navigate = useNavigate();

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

        {/* Alternating Bento Grid for Projects in this category */}
        <AlternatingBentoGrid
          items={displayProjects.map((p) => ({
            ...p,
            src: p.image,
            title: p.title
          }))}
          onItemClick={(item) => navigate(`/du-an/${item.slug}`)}
          renderItemOverlay={(item) => (
            <div className="project-bento-overlay">
              <div className="project-bento-top-title">
                <span>{item.title}</span>
              </div>

              <div className="project-bento-bottom-action">
                <span className="bento-arrow-circle" aria-hidden="true">
                  <ArrowRight size={20} color="#ffffff" />
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
