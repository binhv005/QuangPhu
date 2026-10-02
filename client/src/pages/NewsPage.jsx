import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { newsArticles } from '../data/newsData';

function parseArticleDate(dateStr, lang) {
  if (!dateStr) return { day: '16', month: lang === 'en' ? 'Apr' : 'Tháng 4' };
  const parts = dateStr.split('/');
  if (parts.length >= 2) {
    const day = parts[0];
    const monthNum = parseInt(parts[1], 10);
    const month = lang === 'en' ? `Month ${monthNum}` : `Tháng ${monthNum}`;
    return { day, month };
  }
  return { day: '16', month: lang === 'en' ? 'Apr' : 'Tháng 4' };
}

export default function NewsPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="page-wrapper news-editorial-page subpage-content">
      <div className="container news-editorial-container">
        {/* Page Title */}
        <header className="news-editorial-header reveal-up">
          <h1 className="news-editorial-main-title">
            {lang === 'en' ? 'News' : 'Tin tức'}
          </h1>
        </header>

        {/* Editorial News List (Rows matching design sample) */}
        <div className="news-editorial-list">
          {newsArticles.map((article, idx) => {
            const { day, month } = parseArticleDate(article.date, lang);

            return (
              <article
                key={article.id || idx}
                className="news-editorial-row reveal-up"
                data-delay={idx * 80}
              >
                {/* 1. Date Column */}
                <div className="news-editorial-date-col">
                  <span className="news-editorial-day">{day}</span>
                  <span className="news-editorial-month">{month}</span>
                </div>

                {/* 2. Featured Image Column */}
                <div className="news-editorial-thumb-col">
                  <Link
                    to={`/tin-tuc/${article.slug}`}
                    className="news-editorial-img-link"
                    title={article.title}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                    />
                  </Link>
                </div>

                {/* 3. Content Column */}
                <div className="news-editorial-content-col">
                  <h2 className="news-editorial-title">
                    <Link to={`/tin-tuc/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="news-editorial-summary">
                    {article.summary || article.excerpt}
                  </p>
                  <Link
                    to={`/tin-tuc/${article.slug}`}
                    className="news-editorial-cta-link"
                  >
                    <span>{lang === 'en' ? 'Read Details' : 'Xem Chi Tiết'}</span>
                    <span className="news-editorial-arrow">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
