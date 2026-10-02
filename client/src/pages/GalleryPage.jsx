import React from 'react';
import Gallery from '../components/Gallery';

export default function GalleryPage({ onOpenLightbox }) {
  return (
    <div className="gallery-page subpage-content">
      <Gallery onOpenLightbox={onOpenLightbox} />
    </div>
  );
}
