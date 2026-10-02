import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({ isOpen, src, caption, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div className="lightbox-modal" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Đóng">
        <X size={32} />
      </button>

      {onPrev && (
        <button
          className="lightbox-nav lightbox-prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Ảnh trước"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={caption} className="lightbox-img" />
        {caption && <div className="lightbox-caption">{caption}</div>}
      </div>

      {onNext && (
        <button
          className="lightbox-nav lightbox-next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Ảnh kế tiếp"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
}
