import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectCategories, projectsList } from '../data/projectsData';

export default function ProjectsPage() {
  const { lang, t } = useLanguage();
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

        {/* Bento Staggered Grid (Matching Image 1) */}
        <div className="projects-bento-grid">
          {displayProjects.map((project, idx) => {
            const isLarge = idx % 3 === 0;

            return (
              <Link
                key={project.id || idx}
                to={`/du-an/${project.slug}`}
                className={`project-bento-card ${isLarge ? 'card-large' : 'card-small'} reveal-up`}
                data-delay={(idx % 3) * 120}
              >
                {/* Background Image */}
                <div className="project-bento-img-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="project-bento-img"
                  />
                </div>

                {/* Hover Gradient & Information Overlay */}
                <div className="project-bento-overlay">
                  <div className="project-bento-top-title">
                    <span>{project.title}</span>
                  </div>

                  <div className="project-bento-bottom-action">
                    <span className="bento-arrow-circle" aria-hidden="true">
                      <ArrowRight size={20} color="#ffffff" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
