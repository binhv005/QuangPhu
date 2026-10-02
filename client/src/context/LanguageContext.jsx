import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('qp_lang');
      return saved === 'en' ? 'en' : 'vi';
    } catch {
      return 'vi';
    }
  });

  const setLang = (newLang) => {
    const validLang = newLang === 'en' ? 'en' : 'vi';
    setLangState(validLang);
    try {
      localStorage.setItem('qp_lang', validLang);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
    document.documentElement.lang = validLang;
  };

  const toggleLang = () => {
    setLang(lang === 'vi' ? 'en' : 'vi');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Helper to safely get nested translation strings like t('nav.home') or fallback
  const t = (path, fallback = '') => {
    try {
      const keys = path.split('.');
      let current = translations[lang];
      for (const k of keys) {
        if (current && current[k] !== undefined) {
          current = current[k];
        } else {
          return fallback || path;
        }
      }
      return current !== undefined ? current : (fallback || path);
    } catch {
      return fallback || path;
    }
  };

  const dict = translations[lang] || translations.vi;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
