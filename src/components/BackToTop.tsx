'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileHidden, setIsMobileHidden] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const MOBILE_HIDE_DELAY = 3000; // 3 saniye sonra mobilde gizle

  const isMobile = useCallback(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }, []);

  const resetMobileHideTimer = useCallback(() => {
    if (!isMobile()) return;

    // Butonu göster
    setIsMobileHidden(false);

    // Önceki zamanlayıcıyı temizle
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    // Yeni zamanlayıcı başlat
    hideTimerRef.current = setTimeout(() => {
      setIsMobileHidden(true);
    }, MOBILE_HIDE_DELAY);
  }, [isMobile]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
        resetMobileHideTimer();
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [resetMobileHideTimer]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const shouldShow = isVisible && !isMobileHidden;

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            shouldShow
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-label="Yukarı çık"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
}
