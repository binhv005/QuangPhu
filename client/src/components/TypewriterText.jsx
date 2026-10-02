import React, { useState, useEffect, useRef } from 'react';

/**
 * TypewriterText - Hiệu ứng gõ máy từng ký tự mượt mà, tự nhiên
 * - Kích hoạt khi xuất hiện trong viewport hoặc ngay khi tải trang (Hero)
 * - Hỗ trợ cả string đơn lẻ hoặc mảng segments (đa dòng, đổi màu gradient, v.v.)
 * - Con trỏ nhấp nháy nổi bật
 * - Zero layout shift: giữ nguyên 100% kích thước khối text ban đầu bằng hidden placeholder
 */
export default function TypewriterText({
  text,
  segments,
  speed = 70,
  startDelay = 200,
  showCursor = true,
  hideCursorOnComplete = false,
  className = '',
  as: Component = 'span'
}) {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Chuẩn hóa props text / segments
  const normalizedSegments = React.useMemo(() => {
    if (segments && segments.length > 0) return segments;
    if (typeof text === 'string') return [{ text, className: '' }];
    return [];
  }, [text, segments]);

  const [typedCounts, setTypedCounts] = useState(() => normalizedSegments.map(() => 0));
  const [isCompleted, setIsCompleted] = useState(false);

  // Reset state when segments change (e.g. language change / reload)
  useEffect(() => {
    setTypedCounts(normalizedSegments.map(() => 0));
    setIsCompleted(false);
  }, [normalizedSegments]);

  // Kích hoạt khi xuất hiện trong Viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      setIsInView(true);
      return;
    }

    // Kiểm tra trực tiếp xem phần tử có trong màn hình không (Hero ở top trang)
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.95 && rect.bottom >= 0) {
      setIsInView(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '50px 0px 50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [normalizedSegments]);

  // Hiệu ứng gõ ký tự với nhịp điệu tự nhiên
  useEffect(() => {
    if (!isInView || isCompleted || normalizedSegments.length === 0) return;

    let segmentIdx = 0;
    let charIdx = 0;
    let timeoutId;
    const totalSegments = normalizedSegments.length;

    const typeNextChar = () => {
      if (segmentIdx >= totalSegments) {
        setIsCompleted(true);
        return;
      }

      const currentSegment = normalizedSegments[segmentIdx];
      const targetLen = currentSegment.text.length;

      if (charIdx < targetLen) {
        charIdx++;
        setTypedCounts((prev) => {
          const updated = [...prev];
          updated[segmentIdx] = charIdx;
          return updated;
        });

        // Nhịp điệu gõ tự nhiên
        const currentChar = currentSegment.text[charIdx - 1];
        let charDelay = speed;
        if (currentChar === '–' || currentChar === '-' || currentChar === ':' || currentChar === '.') {
          charDelay = speed * 1.8;
        } else if (currentChar === ' ' || currentChar === ',') {
          charDelay = speed * 1.2;
        } else {
          charDelay = speed + (Math.random() * 10 - 5);
        }

        timeoutId = setTimeout(typeNextChar, Math.max(16, charDelay));
      } else {
        segmentIdx++;
        charIdx = 0;
        timeoutId = setTimeout(typeNextChar, speed * 2);
      }
    };

    timeoutId = setTimeout(typeNextChar, startDelay);

    return () => clearTimeout(timeoutId);
  }, [isInView, normalizedSegments, speed, startDelay, isCompleted]);

  // Xác định vị trí hiển thị con trỏ
  let activeCursorSegmentIdx = -1;
  for (let i = 0; i < normalizedSegments.length; i++) {
    if (typedCounts[i] < normalizedSegments[i].text.length) {
      activeCursorSegmentIdx = i;
      break;
    }
  }
  if (activeCursorSegmentIdx === -1) {
    activeCursorSegmentIdx = normalizedSegments.length - 1;
  }

  return (
    <Component ref={containerRef} className={`typewriter-container ${className}`}>
      {normalizedSegments.map((seg, idx) => {
        const count = typedCounts[idx] || 0;
        const visibleText = seg.text.slice(0, count);
        const hiddenText = seg.text.slice(count);
        const isCursorHere =
          showCursor &&
          (!isCompleted || !hideCursorOnComplete) &&
          activeCursorSegmentIdx === idx;

        return (
          <React.Fragment key={idx}>
            {seg.lineBreak && <br />}
            <span className={seg.className || ''}>
              <span>{visibleText}</span>
              {isCursorHere && (
                <span className="typewriter-cursor" aria-hidden="true">
                  |
                </span>
              )}
              {hiddenText && (
                <span className="typewriter-placeholder" aria-hidden="true">
                  {hiddenText}
                </span>
              )}
            </span>
          </React.Fragment>
        );
      })}
    </Component>
  );
}
