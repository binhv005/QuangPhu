import React, { useRef, useEffect } from 'react';

export default function HeritageVideo() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Ensure video is paused on initial load
    video.pause();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            // Play video when user scrolls into view
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay policy fallback (silent catch)
              });
            }
          } else {
            // Pause video when out of view
            video.pause();
          }
        });
      },
      {
        threshold: [0, 0.2, 0.5],
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="video-section-pure fullwidth-video-section"
      id="video-heritage"
    >
      <div className="video-pure-fullwidth reveal-up" data-delay="100">
        <video
          ref={videoRef}
          src="/assets/videos/trongdong.mp4"
          className="pure-video-player"
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}

