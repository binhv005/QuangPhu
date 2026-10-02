import { useEffect } from 'react';

/**
 * useScrollReveal Hook
 * Kích hoạt hiệu ứng Scroll Reveal mượt mà khi cuộn tới từng section / phần tử:
 * .reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale, .reveal-clip
 */
export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    const selector =
      '.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale, .reveal-clip';

    const revealElement = (el) => {
      if (!el || el.classList.contains('revealed')) return;

      // Xử lý delay động qua data-delay
      const delay = el.getAttribute('data-delay') || el.dataset?.delay;
      if (delay) {
        el.style.transitionDelay = `${delay}ms`;
      }

      el.classList.add('revealed', 'active');
    };

    // Kiểm tra vị trí phần tử so với viewport
    const checkVisibility = () => {
      const elements = document.querySelectorAll(selector);
      const windowH = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        if (el.classList.contains('revealed')) return;

        const rect = el.getBoundingClientRect();
        // Kích hoạt khi đỉnh phần tử chạm vào 88% chiều cao màn hình
        if (rect.top <= windowH * 0.88 && rect.bottom >= 0) {
          revealElement(el);
        }
      });
    };

    // 1. Dùng IntersectionObserver hiện đại để theo dõi chính xác
    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealElement(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -50px 0px',
          threshold: [0, 0.08, 0.15],
        }
      );
    }

    // 2. Đăng ký phần tử cần theo dõi
    const initObserver = () => {
      const elements = document.querySelectorAll(selector);
      const windowH = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        if (el.classList.contains('revealed')) return;

        const rect = el.getBoundingClientRect();
        // Chỉ kích hoạt ngay nếu phần tử nằm gọn trong màn hình đầu tiên lúc vừa tải trang
        if (rect.top <= windowH * 0.75 && rect.bottom >= 0) {
          revealElement(el);
        } else if (observer) {
          observer.observe(el);
        } else {
          checkVisibility();
        }
      });
    };

    // Khởi tạo ban đầu
    initObserver();
    const t1 = setTimeout(initObserver, 100);
    const t2 = setTimeout(initObserver, 400);

    // 3. Lắng nghe sự kiện cuộn scroll để đảm bảo không bị miss phần tử nào
    const handleScroll = () => {
      checkVisibility();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // 4. Theo dõi DOM thay đổi (khi router chuyển trang hoặc nạp dữ liệu async)
    let mutationObserver = null;
    if ('MutationObserver' in window) {
      mutationObserver = new MutationObserver(() => {
        initObserver();
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, dependencies);
}
