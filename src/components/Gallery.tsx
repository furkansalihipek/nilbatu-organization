'use client';

import { useState } from 'react';
import Card from './Card';
import Lightbox from './Lightbox';
import type { LightboxItem } from './Lightbox';

interface GalleryItem {
  id: number;
  title?: string;
  image: string;
  description?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  title?: string;
  description?: string;
}

export default function Gallery({ items, title, description }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lightboxItems: LightboxItem[] = items.map(item => ({
    src: item.image,
    title: item.title,
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            {description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{description}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            return (
              <Card
                key={item.id}
                variant="elevated"
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div
                  className="relative cursor-pointer h-48"
                  onClick={(e) => { e.stopPropagation(); openLightbox(idx); }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  {item.title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>}
                  {item.description && <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>}
                </div>
              </Card>
            );
          })}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz görsel eklenmemiş</h3>
            <p className="text-gray-600">Yakında yeni görseller eklenecek.</p>
          </div>
        )}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={currentIndex}
        onNext={() => setCurrentIndex((prev) => (prev + 1) % lightboxItems.length)}
        onPrev={() => setCurrentIndex((prev) => (prev - 1 + lightboxItems.length) % lightboxItems.length)}
      />
    </div>
  );
}
