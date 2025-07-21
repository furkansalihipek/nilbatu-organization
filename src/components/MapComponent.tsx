'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet marker icon sorununu çözmek için
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  address?: string;
  className?: string;
}

export default function MapComponent({ 
  address = "Bayraklı, İzmir, Türkiye",
  className = "w-full h-96 rounded-lg"
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // İzmir koordinatları (varsayılan)
    const defaultCoords: [number, number] = [38.460112, 27.175690];

    // Harita oluştur
    const map = L.map(mapRef.current).setView(defaultCoords, 15);

    // OpenStreetMap tile layer ekle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Özel marker ikonu oluştur
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background: linear-gradient(135deg, #3B82F6, #1E40AF);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
        ">
          📍
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    // Marker ekle
    const marker = L.marker(defaultCoords, { icon: customIcon }).addTo(map);

    // Popup içeriği
    const popupContent = `
      <div style="text-align: center; padding: 10px;">
        <h3 style="margin: 0 0 8px 0; color: #1F2937; font-weight: bold;">Nilbatu Etkinlik Organizasyon</h3>
        <p style="margin: 0; color: #6B7280; font-size: 14px;">${address}</p>
        <button 
          onclick="window.open('https://www.google.com/maps/place/Nilbatu+Organizasyon+Turizm+Tanitim+Danismanlik/@38.4597083,27.1775583,17.72z/data=!4m8!3m7!1s0x14b97d56ce497293:0x997ec303c37bfe5f!8m2!3d38.4605463!4d27.177612!9m1!1b1!16s%2Fg%2F11c2nbrt_0?entry=ttu&g_ep=EgoyMDI1MDcxNS4xIKXMDSoASAFQAw%3D%3D', '_blank')"
          style="
            background: #3B82F6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            margin-top: 8px;
            cursor: pointer;
            font-size: 14px;
          "
        >
          Google Maps&apos;te Aç
        </button>
      </div>
    `;

    marker.bindPopup(popupContent);

    // Adres geocoding (ücretsiz Nominatim API kullanarak)
    if (address && address !== "Bayraklı, İzmir, Türkiye") {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            const newCoords: [number, number] = [lat, lon];
            
            map.setView(newCoords, 16);
            marker.setLatLng(newCoords);
          }
        })
        .catch(error => {
          console.log('Geocoding hatası:', error);
        });
    }

    // Harita yüklendiğinde loading'i kaldır
    map.whenReady(() => {
      setIsLoading(false);
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [address]);

  return (
    <div className={`${className} relative`}>
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg shadow-lg"
        style={{ minHeight: '400px' }}
      />
      
      {/* Yükleme göstergesi */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Harita yükleniyor...</p>
          </div>
        </div>
      )}
    </div>
  );
} 