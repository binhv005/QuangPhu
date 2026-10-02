import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn } from 'lucide-react';

const allShowcaseItems = [
  {
    id: 1,
    image: '/assets/images/xe-nghi-truong-main.webp',
    title: 'Khối xe nghi trượng đại lễ Quốc gia A05 – A80',
  },
  {
    id: 2,
    image: '/assets/images/tuong-bac-ho.webp',
    title: 'Tượng Bác Hồ bằng đồng đúc tinh xảo thần thái',
  },
  {
    id: 3,
    image: '/assets/images/tuong-dai-chien-thang.webp',
    title: 'Tượng đài chiến thắng & Biểu tượng lịch sử',
  },
  {
    id: 4,
    image: '/assets/images/about-artisan.webp',
    title: 'Chế tác chạm khắc gò đúc đồng thủ công tinh hoa',
  },
  {
    id: 5,
    image: '/assets/images/qua-tang-my-thuat.webp',
    title: 'Mô hình biểu tượng quà tặng mỹ nghệ mạ vàng 24K',
  },
  {
    id: 6,
    image: '/assets/images/cong-trinh-di-tich.webp',
    title: 'Công trình di tích lịch sử văn hóa tiêu biểu',
  },
  {
    id: 7,
    image: '/assets/images/gallery-cham-dong.webp',
    title: 'Nghệ thuật chạm khắc đồng thủ công truyền thống',
  },
  {
    id: 8,
    image: '/assets/images/hero-artisan.webp',
    title: 'Nghệ nhân tạo tác khuôn mẫu & điêu khắc tỷ lệ vàng',
  },
  {
    id: 9,
    image: '/assets/images/khach-hang-su-kien.webp',
    title: 'Đại lễ & Sự kiện quy mô cấp Quốc gia',
  },
  {
    id: 10,
    image: '/assets/images/tuong-tho.webp',
    title: 'Tượng danh nhân & Tượng nghệ thuật linh thiêng',
  },
  {
    id: 11,
    image: '/assets/images/quy-trinh-han.webp',
    title: 'Kỹ thuật xử lý cơ khí mỹ thuật chính xác cao',
  },
  {
    id: 12,
    image: '/assets/images/gallery-nha-xuong.webp',
    title: 'Quy mô nhà xưởng chế tác cơ khí mỹ thuật hiện đại',
  },
  {
    id: 13,
    image: '/assets/images/khach-hang-co-quan.webp',
    title: 'Công trình biểu tượng cơ quan nhà nước & bộ ngành',
  },
  {
    id: 14,
    image: '/assets/images/khach-hang-di-tich.webp',
    title: 'Quần thể công trình tâm linh & di sản văn hóa',
  },
];

// 7-panel symmetrical stepped slot configuration (Mini - Low - Mid - Tall - Mid - Low - Mini)
const slotConfigs = [
  { type: 'mini', label: 'p1' },
  { type: 'low', label: 'p2' },
  { type: 'mid', label: 'p3' },
  { type: 'tall', label: 'p4' },
  { type: 'mid', label: 'p5' },
  { type: 'low', label: 'p6' },
  { type: 'mini', label: 'p7' },
];

export default function ShowcaseArc() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const total = allShowcaseItems.length;

  // Auto-slide smoothly every 2.6 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 2600);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  // Compute the 7 visible items based on current index
  const visibleItems = slotConfigs.map((slot, slotIdx) => {
    const itemIndex = (currentIndex + slotIdx) % total;
    return {
      ...allShowcaseItems[itemIndex],
      slotType: slot.type,
      slotLabel: slot.label,
    };
  });

  return (
    <section className="section showcase-arc-section" id="showcase">
      {/* Decorative Gold Artwork Background Layer */}
      <div className="home-bg-motif home-bg-motif-dark motif-cloud-top-right" aria-hidden="true" />
      <div className="home-bg-motif home-bg-motif-dark motif-mountain-bottom-left" aria-hidden="true" />

      <div className="container polyptych-wide-container">
        {/* 7-Panel Symmetrical Stepped Showcase Stage (Auto-sliding Carousel) */}
        <div
          className="polyptych-showcase-stage reveal-up"
          data-delay="150"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 7-Panel Track */}
          <div className="polyptych-showcase-track polyptych-7-track">
            {visibleItems.map((item) => (
              <div
                key={`${item.id}-${item.slotLabel}`}
                className={`polyptych-card polyptych-${item.slotLabel} polyptych-${item.slotType}`}
                title={item.title}
              >
                <div className="polyptych-card-inner">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="polyptych-img-smooth"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
