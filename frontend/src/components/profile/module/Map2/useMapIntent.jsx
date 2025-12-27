import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";

export function useMapIntent() {
  const map = useMap();
  const [isMapActive, setIsMapActive] = useState(false);
  const startRef = useRef({ x: 0, y: 0, isDecided: false });

  useEffect(() => {
    if (!map) return;

    const container = map.getContainer();

    // تنظیم استایل اولیه برای جلوگیری از رفتارهای پیش‌فرض مرورگر
    container.style.touchAction = "none"; 

    const handleStart = (e) => {
      const point = e.touches ? e.touches[0] : e;
      startRef.current = {
        x: point.clientX,
        y: point.clientY,
        isDecided: false,
      };
      setIsMapActive(true); // به محض لمس، آماده تعامل باش
    };

    const handleMove = (e) => {
      const point = e.touches ? e.touches[0] : e;
      const dx = point.clientX - startRef.current.x;
      const dy = point.clientY - startRef.current.y;

      // اگر قبلاً تصمیم‌گیری شده که این حرکت اسکرول صفحه است، دیگر ادامه نده
      if (startRef.current.isDecided === "page-scroll") return;

      // تشخیص قصد کاربر در شروع حرکت (بعد از 5 پیکسل جابجایی)
      if (!startRef.current.isDecided && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        // اگر حرکت افقی قوی بود (احتمال اسکرول صفحه)
        if (Math.abs(dx) > Math.abs(dy) * 1.5 && e.touches) {
          startRef.current.isDecided = "page-scroll";
          setIsMapActive(false);
          return; // اجازه بده رویداد به اسکرول صفحه برسد
        } else {
          startRef.current.isDecided = "map-interact";
        }
      }

      // اگر تصمیم بر تعامل با نقشه است، جلوی انتشار رویداد به بدنه سایت (اسکرول افقی) را بگیر
      if (startRef.current.isDecided === "map-interact" || !e.touches) {
        e.stopPropagation();
        // برای Mouse eventها نیازی به preventDefault نیست تا Drag نقشه کار کند
        if (e.touches && e.cancelable) e.preventDefault();
      }
    };

    const handleEnd = () => {
      startRef.current.isDecided = false;
      setIsMapActive(false);
    };

    // رویدادهای لمسی
    container.addEventListener("touchstart", handleStart, { passive: false });
    container.addEventListener("touchmove", handleMove, { passive: false });
    container.addEventListener("touchend", handleEnd);

    // رویدادهای موس (Wheel به صورت پیش‌فرض کار خواهد کرد)
    container.addEventListener("mousedown", handleStart);
    // برای موس بهتر است حرکت روی کل صفحه مانیتور شود
    window.addEventListener("mousemove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleEnd);

    return () => {
      container.removeEventListener("touchstart", handleStart);
      container.removeEventListener("touchmove", handleMove);
      container.removeEventListener("touchend", handleEnd);
      container.removeEventListener("mousedown", handleStart);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
    };
  }, [map]);

  return isMapActive;
}