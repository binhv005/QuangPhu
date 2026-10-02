import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [headerTheme, setHeaderTheme] = useState('dark'); // 'dark' | 'light'
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { lang, setLang, t, dict } = useLanguage();
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScrollAndTheme = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      const headerCenterY = scrollY + 45;
      const lightSections = document.querySelectorAll(
        '.products-section, .projects-section, .partner-marquee-section, [data-theme="light"], .light-theme, .light-section'
      );

      let isOverLight = false;
      for (const section of lightSections) {
        const rect = section.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + rect.height;
        if (headerCenterY >= top && headerCenterY <= bottom) {
          isOverLight = true;
          break;
        }
      }

      setHeaderTheme(isOverLight ? 'light' : 'dark');
    };

    window.addEventListener('scroll', handleScrollAndTheme, { passive: true });
    window.addEventListener('resize', handleScrollAndTheme, { passive: true });
    handleScrollAndTheme();

    return () => {
      window.removeEventListener('scroll', handleScrollAndTheme);
      window.removeEventListener('resize', handleScrollAndTheme);
    };
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Click outside to close mobile sidebar & dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest('.mobile-toggle')) return;

      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        if (mobileOpen) {
          setMobileOpen(false);
          document.body.style.overflow = '';
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileOpen]);

  // Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = '';
  };

  const toggleDropdown = (name, e) => {
    e.stopPropagation();
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const leaveTimerRef = useRef(null);

  const handleMouseEnter = (name) => {
    if (window.innerWidth <= 992) return;
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 992) return;
    leaveTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220); // 220ms grace period so moving mouse is easy and seamless
  };

  const servicesSubItems = dict.nav.servicesDropdown;
  const projectsSubItems = dict.nav.projectsDropdown;

  return (
    <>
      {/* Mobile Backdrop Overlay - Click outside sidebar to close */}
      <div
        className={`mobile-nav-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={handleNavClick}
        aria-hidden="true"
      />

      <header className={`site-header ${scrolled ? 'scrolled' : ''} ${headerTheme === 'light' ? 'header-light-theme' : ''}`}>
        <div className="container header-container">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={handleNavClick}>
            <img src="/assets/images/about-logo.png" alt="Logo Quảng Phú" />
            <div className="brand-text">
              <span className="brand-title">{dict.brand.title}</span>
              <span className="brand-sub">{dict.brand.sub}</span>
            </div>
          </Link>

          {/* Right Nav + Actions Group */}
          <div className="header-right-nav-wrap">
            {/* Navigation Menu / Mobile Sidebar */}
            <nav className={`main-nav ${mobileOpen ? 'open' : ''}`} ref={navRef}>
              {/* Mobile Sidebar Header */}
              <div className="mobile-sidebar-header">
                <div className="mobile-sidebar-brand">
                  <img src="/assets/images/about-logo.png" alt="Logo Quảng Phú" />
                  <span>{dict.brand.title}</span>
                </div>
                <button
                  type="button"
                  className="mobile-sidebar-close"
                  onClick={handleNavClick}
                  aria-label="Đóng menu"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className="nav-list">
              {/* 1. Trang chủ */}
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleNavClick}
                  end
                >
                  {t('nav.home', 'Trang chủ')}
                </NavLink>
              </li>

              {/* 2. Về chúng tôi */}
              <li className="nav-item">
                <NavLink
                  to="/gioi-thieu"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleNavClick}
                >
                  {t('nav.about', 'Về chúng tôi')}
                </NavLink>
              </li>

              {/* 3. Dịch vụ (with Dropdown) */}
              <li
                className={`nav-item has-dropdown ${activeDropdown === 'services' ? 'dropdown-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="nav-link-dropdown-wrapper"
                  onClick={(e) => {
                    if (window.innerWidth <= 991) {
                      toggleDropdown('services', e);
                    }
                  }}
                >
                  <NavLink
                    to="/dich-vu"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      if (window.innerWidth <= 991) {
                        e.preventDefault();
                      } else {
                        handleNavClick();
                      }
                    }}
                  >
                    {t('nav.services', 'Dịch vụ')}
                  </NavLink>
                  <button
                    type="button"
                    className="dropdown-toggle-btn"
                    onClick={(e) => toggleDropdown('services', e)}
                    aria-label="Toggle Dịch vụ dropdown"
                  >
                    <ChevronDown size={14} className={`dropdown-arrow ${activeDropdown === 'services' ? 'rotate' : ''}`} />
                  </button>
                </div>

                {/* Submenu */}
                <ul className={`dropdown-menu ${activeDropdown === 'services' ? 'show' : ''}`}>
                  {servicesSubItems.map((sub, idx) => (
                    <li key={idx} className="dropdown-item">
                      <Link
                        to={sub.path}
                        className="dropdown-link"
                        onClick={handleNavClick}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* 4. Dự án (with Dropdown) */}
              <li
                className={`nav-item has-dropdown ${activeDropdown === 'projects' ? 'dropdown-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('projects')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="nav-link-dropdown-wrapper"
                  onClick={(e) => {
                    if (window.innerWidth <= 991) {
                      toggleDropdown('projects', e);
                    }
                  }}
                >
                  <NavLink
                    to="/du-an"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      if (window.innerWidth <= 991) {
                        e.preventDefault();
                      } else {
                        handleNavClick();
                      }
                    }}
                  >
                    {t('nav.projects', 'Dự án')}
                  </NavLink>
                  <button
                    type="button"
                    className="dropdown-toggle-btn"
                    onClick={(e) => toggleDropdown('projects', e)}
                    aria-label="Toggle Dự án dropdown"
                  >
                    <ChevronDown size={14} className={`dropdown-arrow ${activeDropdown === 'projects' ? 'rotate' : ''}`} />
                  </button>
                </div>

                {/* Submenu */}
                <ul className={`dropdown-menu ${activeDropdown === 'projects' ? 'show' : ''}`}>
                  {projectsSubItems.map((sub, idx) => (
                    <li key={idx} className="dropdown-item">
                      <Link
                        to={sub.path}
                        className="dropdown-link"
                        onClick={handleNavClick}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* 5. Tin tức */}
              <li className="nav-item">
                <NavLink
                  to="/tin-tuc"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleNavClick}
                >
                  {t('nav.news', 'Tin tức')}
                </NavLink>
              </li>
            </ul>

            {/* Mobile Extra Controls */}
            <div className="mobile-nav-footer">
              <div className="lang-switcher">
                <button
                  type="button"
                  className={`lang-btn ${lang === 'vi' ? 'active' : ''}`}
                  onClick={() => setLang('vi')}
                >
                  Vi
                </button>
                <span className="lang-sep">|</span>
                <button
                  type="button"
                  className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => setLang('en')}
                >
                  En
                </button>
              </div>
            </div>
          </nav>

          {/* Header Right Actions (Desktop) */}
          <div className="header-actions">
            {/* Language Switcher: Vi | En */}
            <div className="lang-switcher">
              <button
                type="button"
                className={`lang-btn ${lang === 'vi' ? 'active' : ''}`}
                onClick={() => setLang('vi')}
                title="Tiếng Việt"
              >
                Vi
              </button>
              <span className="lang-sep">|</span>
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
                title="English"
              >
                En
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => {
                const next = !mobileOpen;
                setMobileOpen(next);
                document.body.style.overflow = next ? 'hidden' : '';
              }}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  </>
  );
}

