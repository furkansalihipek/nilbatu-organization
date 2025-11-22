'use client';

import dynamic from 'next/dynamic';

// Client-side only map component
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-lg bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Harita yükleniyor...</p>
      </div>
    </div>
  )
});

interface OpenStreetMapProps {
  address?: string;
  className?: string;
}

export default function OpenStreetMap(props: OpenStreetMapProps) {
  return <MapComponent {...props} />;
} 