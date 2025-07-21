'use client';

import { useState } from 'react';
import Card from './Card';
import Lightbox from './Lightbox';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface GalleryProps {
  items: GalleryItem[];
  title?: string;
  description?: string;
}

const Gallery: React.FC<GalleryProps> = ({ items, title, description }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Kategorileri otomatik olarak çıkar
  const categories = ['Tümü', ...Array.from(new Set(items.map(item => item.category)))];

  // Filtrelenmiş öğeler
  const filteredItems = selectedCategory === 'Tümü' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  // Lightbox için sadece görselleri al
  const images = items.map(item => item.image);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Filter Buttons */}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              variant="elevated"
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => openLightbox(items.findIndex(i => i.id === item.id))}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔊</div>
                    <div className="text-sm text-blue-600 font-medium">{item.category}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-blue-600 font-medium mb-1">
                  {item.category}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bu kategoride görsel bulunamadı
            </h3>
            <p className="text-gray-600">
              Farklı bir kategori seçmeyi deneyin.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={images}
        currentIndex={currentImageIndex}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default Gallery; 