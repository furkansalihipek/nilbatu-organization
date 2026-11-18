'use client'
import { useState } from 'react'
import { Card, Gallery, ContactPopup } from '@/components'

export default function Cihazlarimiz() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const galleryItems = [
    { id: 1, image: '/ekipman/ekipman-01.jpg' },
    { id: 3, image: '/ekipman/ekipman-03.jpg' },
    { id: 4, image: '/ekipman/ekipman-04.jpg' },
    { id: 5, image: '/ekipman/ekipman-05.jpg' },
    { id: 6, image: '/ekipman/ekipman-06.webp' },
    { id: 7, image: '/ekipman/ekipman-07.jpg' },
    { id: 8, image: '/ekipman/ekipman-08.avif' },
    { id: 9, image: '/ekipman/ekipman-09.jpg' },
    { id: 10, image: '/ekipman/ekipman-10.webp' },
    { id: 11, image: '/ekipman/ekipman-11.jpg' },
    { id: 12, image: '/ekipman/ekipman-12.jpg' },
    { id: 13, image: '/ekipman/ekipman-13.png' },
    { id: 14, image: '/linearray.jpeg' },
    { id: 15, image: '/ekipman/ekipman-15.jpg' },
    { id: 16, image: '/ekipman/ekipman-16.jpg' },
    { id: 17, image: '/ekipman/ekipman-17.webp' },
    { id: 18, image: '/ekipman/ekipman-18.jpg' },
    { id: 19, image: '/prostone.jpg' },
    { id: 20, image: '/led.png' },
    { id: 21, image: '/ekipman/panasonic-ag-ac160a.webp' },
    { id: 22, image: '/ekipman/ekipman-22.jpg' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-24 md:py-32 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/M32.png"
            alt="Arkaplan görseli (Cihazlar)"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Teknik Donanım
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            En son teknoloji ekipmanlarımız ile etkinliklerinizi profesyonel seviyede gerçekleştiriyoruz.
            Kaliteli ve güvenilir ekipmanlarımızla hizmetinizdeyiz.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <Gallery
          items={galleryItems}
          title="Ekipman Galerimiz"
          description="Profesyonel ekipmanlarımızın görsellerini inceleyin. Her kategori için detaylı bilgi alabilirsiniz."
        />
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Öne Çıkan Özellikler
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="outlined" className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Kalite Garantisi</h3>
              <p className="text-gray-600 leading-reld">
                Tüm ekipmanlarımız orijinal ve garantili ürünlerdir. Düzenli bakım ve kontrol yapılmaktadır.
              </p>
            </Card>

            <Card variant="outlined" className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Yüksek Performans</h3>
              <p className="text-gray-600 leading-relaxed">
                En son teknoloji ekipmanlar ile maksimum performans ve kaliteli sonuçlar elde ediyoruz.
              </p>
            </Card>

            <Card variant="outlined" className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Hızlı Kurulum</h3>
              <p className="text-gray-600 leading-relaxed">
                Deneyimli ekibimiz ile ekipmanlarınızı hızlı ve güvenli şekilde kuruyoruz.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Popup */}
      <ContactPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  )
} 