'use client';

import { useState } from 'react';
import Card from './Card';
import Lightbox from './Lightbox';
import type { LightboxItem } from './Lightbox';

interface GalleryItem {
  id: number;
  title?: string;
  category: string;
  image: string;
  description?: string;
  type?: 'image' | 'video';
  mediaUrl?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  title?: string;
  description?: string;
  hideAllCategory?: boolean;
}

export default function Gallery({ items, title, description, hideAllCategory = false }: GalleryProps) {
  const allCategories = items.map(item => item.category).filter(Boolean);
  const uniqueCategories = Array.from(new Set(allCategories));
  const categories = allCategories.length > 0
    ? (hideAllCategory ? uniqueCategories : ['Tümü', ...uniqueCategories])
    : [];

  const defaultCategory = hideAllCategory && uniqueCategories.length > 0
    ? uniqueCategories[0]
    : 'Tümü';

  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = selectedCategory === 'Tümü'
    ? items
    : items.filter(item => item.category === selectedCategory);

  // Lightbox items — video için mediaUrl veya image kullan
  const lightboxItems: LightboxItem[] = filteredItems.map(item => {
    const isVideo = (item.type || 'image') === 'video';
    return {
      src: isVideo ? (item.mediaUrl || item.image) : item.image,
      type: isVideo ? 'video' : 'image',
      title: item.title,
    };
  });

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

        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => {
            const isVideo = (item.type || 'image') === 'video';

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
                  {isVideo ? (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                      {/* Play butonu */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                          <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Video Badge */}
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                        ▶ Video
                      </span>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
                <div className="p-4">
                  {item.category && <div className="text-sm text-blue-600 font-medium mb-1">{item.category}</div>}
                  {item.title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>}
                  {item.description && <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>}
                </div>
              </Card>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Bu kategoride görsel bulunamadı</h3>
            <p className="text-gray-600">Farklı bir kategori seçmeyi deneyin.</p>
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
