import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import LightboxModal from './components/LightboxModal';
import Toast from './components/Toast';
import { useScrollReveal } from './hooks/useScrollReveal';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProjectCategoryPage from './pages/ProjectCategoryPage';

function AppContent() {
  const location = useLocation();
  const { lang, t } = useLanguage();
  useScrollReveal([location.pathname, lang]);

  const [toastMsg, setToastMsg] = useState('');
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', caption: '' });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 4000);
  };

  const handlePhoneAction = (e) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      navigator.clipboard.writeText('0961031318').then(() => {
        showToast(t('common.copiedPhone', 'Đã sao chép số điện thoại Hotline: 0961 031 318'));
      }).catch(() => {
        showToast('Hotline: 0961 031 318');
      });
    }
  };

  const openLightbox = (src, caption) => {
    setLightbox({ isOpen: true, src, caption });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, src: '', caption: '' });
    document.body.style.overflow = '';
  };

  return (
    <div className="app-root">
      {/* Persistent Header */}
      <Header />

      {/* Multi-Page Routes */}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenLightbox={openLightbox}
                onToast={showToast}
                onPhoneClick={handlePhoneAction}
              />
            }
          />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route
            path="/dich-vu"
            element={<ServicesPage onOpenLightbox={openLightbox} />}
          />
          <Route
            path="/dich-vu/:slug"
            element={<ServiceDetailPage onOpenLightbox={openLightbox} />}
          />
          <Route
            path="/du-an"
            element={<ProjectsPage onOpenLightbox={openLightbox} />}
          />
          <Route
            path="/du-an/sang-tao"
            element={<ProjectCategoryPage category="sang-tao" />}
          />
          <Route
            path="/du-an/bo-ban-nganh"
            element={<ProjectCategoryPage category="bo-ban-nganh" />}
          />
          <Route
            path="/du-an/brand"
            element={<ProjectCategoryPage category="brand" />}
          />
          <Route
            path="/du-an/:slug"
            element={<ProjectDetailPage onOpenLightbox={openLightbox} />}
          />
          <Route path="/nang-luc" element={<CapabilitiesPage />} />
          <Route
            path="/gallery"
            element={<GalleryPage onOpenLightbox={openLightbox} />}
          />
          <Route path="/tin-tuc" element={<NewsPage />} />
          <Route
            path="/tin-tuc/:slug"
            element={
              <NewsDetailPage
                onToast={showToast}
                onPhoneClick={handlePhoneAction}
                onOpenLightbox={openLightbox}
              />
            }
          />
          <Route
            path="/lien-he"
            element={
              <ContactPage
                onToast={showToast}
                onPhoneClick={handlePhoneAction}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Persistent Footer */}
      <Footer onPhoneClick={handlePhoneAction} />

      {/* Persistent Floating CTA */}
      <FloatingCTA onPhoneClick={handlePhoneAction} />

      {/* Global Lightbox Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        src={lightbox.src}
        caption={lightbox.caption}
        onClose={closeLightbox}
      />

      {/* Toast Notification */}
      <Toast message={toastMsg} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}
