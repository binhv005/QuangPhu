import React from 'react';
import Hero from '../components/Hero';
import ShowcaseArc from '../components/ShowcaseArc';
import HeritageVideo from '../components/HeritageVideo';
import Services from '../components/Services';
import Projects from '../components/Projects';
import PartnerMarquee from '../components/PartnerMarquee';

export default function HomePage({ onOpenLightbox, onToast, onPhoneClick }) {
  return (
    <div className="home-page">
      <Hero onOpenLightbox={onOpenLightbox} />
      <ShowcaseArc onOpenLightbox={onOpenLightbox} />
      <HeritageVideo />
      <Services />
      <Projects onOpenLightbox={onOpenLightbox} />
      <PartnerMarquee />
    </div>
  );
}


