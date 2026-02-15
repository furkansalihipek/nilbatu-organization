'use client';

import { useEffect, useCallback, useState, useRef } from 'react';

export interface LightboxItem {
  src: string;
  type: 'image' | 'video';
  title?: string;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxItem[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNext,
  onPrev
}: LightboxProps) {
  const currentItem = items[currentIndex];
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    switch (e.key) {
      case 'Escape': onClose(); break;
      case 'ArrowRight': onNext(); break;
      case 'ArrowLeft': onPrev(); break;
    }
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  // Video değiştiğinde error'ı sıfırla
  useEffect(() => {
    setVideoError(null);
  }, [currentIndex]);

  // Video değiştiğinde play'i dene
  useEffect(() => {
    if (isOpen && currentItem?.type === 'video' && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // autoplay engellenmiş olabilir, sorun değil — kullanıcı tıklayarak başlatabilir
      });
    }
  }, [isOpen, currentIndex, currentItem]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95"
      onClick={(e) => {
        // Sadece backdrop'a tıklayınca kapat
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-50 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-50 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Media Content */}
      <div
        className="w-full h-full flex items-center justify-center p-12"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {currentItem.type === 'video' ? (
          <div
            className="relative"
            style={{ maxWidth: '90vw', maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {videoError ? (
              /* Video yüklenemedi — hata mesajı göster */
              <div className="bg-gray-900 rounded-xl p-12 text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-white text-lg mb-2">Video oynatılamadı</p>
                <p className="text-gray-400 text-sm mb-4">{videoError}</p>
                <a
                  href={currentItem.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Videoyu İndir
                </a>
              </div>
            ) : (
              /* Video Player */
              <video
                ref={videoRef}
                key={`video-${currentIndex}-${currentItem.src}`}
                controls
                autoPlay
                playsInline
                preload="auto"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: '8px',
                  background: '#000',
                }}
                onError={(e) => {
                  const video = e.target as HTMLVideoElement;
                  const err = video.error;
                  let msg = 'Bilinmeyen hata';
                  if (err) {
                    switch (err.code) {
                      case 1: msg = 'Video yükleme iptal edildi'; break;
                      case 2: msg = 'Ağ hatası — video indirilemedi'; break;
                      case 3: msg = 'Video kodu çözülemedi — format desteklenmiyor olabilir'; break;
                      case 4: msg = 'Video kaynağı desteklenmiyor'; break;
                    }
                  }
                  console.error('Video error:', err, currentItem.src);
                  setVideoError(msg);
                }}
              >
                <source src={currentItem.src} type="video/mp4" />
                <source src={currentItem.src} type="video/quicktime" />
                <source src={currentItem.src} type="video/webm" />
                Tarayıcınız bu videoyu oynatamıyor.
              </video>
            )}
          </div>
        ) : (
          /* Image */
          <img
            key={currentItem.src}
            src={currentItem.src}
            alt={currentItem.title || 'Galeri görseli'}
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/60 px-4 py-2 rounded-full text-sm pointer-events-none z-40">
        {currentIndex + 1} / {items.length}
        {currentItem.title && ` • ${currentItem.title}`}
      </div>
    </div>
  );
}
