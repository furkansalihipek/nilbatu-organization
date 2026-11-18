'use client';

import { useEffect, useCallback } from 'react';

export interface LightboxItem {
  src: string;
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
        <img
          key={currentItem.src}
          src={currentItem.src}
          alt={currentItem.title || 'Galeri görseli'}
          style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/60 px-4 py-2 rounded-full text-sm pointer-events-none z-40">
        {currentIndex + 1} / {items.length}
        {currentItem.title && ` • ${currentItem.title}`}
      </div>
    </div>
  );
}
