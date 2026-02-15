'use client';

import { useState, useEffect } from 'react';
import { Gallery } from '@/components';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  type?: 'image' | 'video';
  mediaUrl?: string;
}

export default function GaleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery');
      const result = await response.json();

      if (result.success) {
        setItems(result.data || []);
      } else {
        setError('Galeri yüklenemedi');
      }
    } catch (err) {
      console.error('Galeri yükleme hatası:', err);
      setError('Galeri yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Galeri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hata</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Gallery
          items={items}
          title="Yaptığımız İşler"
          description="Gerçekleştirdiğimiz etkinliklerden örnekler. Her bir projede kalite ve profesyonellik ön plandadır."
        />
      </div>
    </div>
  );
}
