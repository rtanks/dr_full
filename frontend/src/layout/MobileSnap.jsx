import { useRef, useState, useEffect, Fragment } from 'react';

export default function MobileSnap({ children }) {
  const container = useRef(null);
  const sections = useRef([]);
  const [index, setIndex] = useState(0);
  const isScrolling = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const onTouchStart = (e) => {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchEnd = (e) => {
      if (isScrolling.current) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };

      const deltaX = touchStart.current.x - touchEnd.x;
      const threshold = 30;

      if (Math.abs(deltaX) < threshold) return;

      isScrolling.current = true;

      if (deltaX > 0) {
        setIndex((prev) =>
          Math.min(prev + 1, sections.current.length - 1)
        );
      } else {
        setIndex((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 400);
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const target = sections.current[index];
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [index]);

  return (
    <div
      ref={container}
      dir="rtl"
      className="w-full h-full scroll-smooth snap-x 
          snap-mandatory flex flex-row gap-1.5 sm:gap-5 py-2 px-4 sm:p-3 overflow-x-scroll sm:justify-center sm:overflow-x-hidden"
    >
      {children.map((child, i) => (
        <div
          key={i}
          ref={(el) => (sections.current[i] = el)}
          className="snap-start shrink-0 h-full w-full"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
