import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectCategories, projectsList } from '../data/projectsData';
import AlternatingBentoGrid from '../components/AlternatingBentoGrid';

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projectsList
    : projectsList.filter((p) => p.category === activeCategory || activeCategory === 'all');

  // If filtered list is small, fallback to full list
  const displayProjects = filteredProjects.length > 0 ? filteredProjects : projectsList;

  return (
    <div className="page-wrapper projects-bento-page subpage-content">
      <div className="container projects-bento-container">
        {/* Top Header Bar: Page Title on Left + Filter Tabs on Right */}
        <header className="projects-bento-header reveal-up">
          <div className="projects-bento-header-left">
            <h1 className="projects-bento-main-title">
              {lang === 'en' ? 'Featured Projects' : 'Dự Án Tiêu Biểu'}
            </h1>
          </div>

          <div className="projects-bento-tabs-wrap">
            <div className="projects-bento-tabs">
              {projectCategories.map((cat, idx) => {
                const isActive = activeCategory === cat.key;
                return (
                  <React.Fragment key={cat.key}>
                    {idx > 0 && <span className="projects-tab-divider">|</span>}
                    <button
                      type="button"
                      onClick={() => setActiveCategory(cat.key)}
                      className={`projects-tab-btn ${isActive ? 'active' : ''}`}
                    >
                      {cat.label}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </header>

        {/* Alternating Bento Grid (Alternates Pattern A & Pattern B per 8 items) */}
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
