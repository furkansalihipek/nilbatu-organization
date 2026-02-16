'use client'
import { useState } from 'react'
import { Card, Gallery, ContactPopup } from '@/components'

export default function Cihazlarimiz() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Galeri için örnek görseller
  const galleryItems = [
    {
      id: 1,
      category: 'Ses Sistemleri',
      image: "https://www.bhphotovideo.com/images/fb/turbosound_iq18b_3000w_18_powered_subwoofer_1820893.jpg",
    },
    {
      id: 2,
      category: 'Işık Sistemleri',
      image: "https://www.sesnosa.com/idea/fy/85/myassets/products/086/1.jpg?revision=1711061524",
    },
    {
      id: 3,
      category: 'Sahne Ekipmanları',
      image: "https://temteknoloji.com.tr/wp-content/uploads/2024/06/image_1950-17.jpeg",
    },
    {
      id: 4,
      category: 'Led Wall ve Projeksiyon',
      image: 'https://platincdn.com/466/pictures/QFOZWPZPVI4272022155433_optoma-w400-lwe-03.jpg',
    },
    {
      id: 5,
      category: 'Ses Sistemleri',
      image: "https://www.maydanozmuzik.com/midas-midas-m32-live-53979-58-B.jpg",
    },
    {
      id: 6,
      category: 'Ses Sistemleri',
      image: "https://www.sescibaba.com/x32-40-kanalli-dijital-mikser-behringer-x32-90704-43-B.webp",
    },
    {
      id: 7,
      category: 'Görsel Kayıt Sistemleri',
      image: "https://d17bck4wpaw2mg.cloudfront.net/att/a/2/c/z/a2cz10/ltht.jpg",
    },
    {
      id: 8,
      category: 'Görsel Kayıt Sistemleri',
      image: "https://static.wixstatic.com/media/13ef96_3d08ad16152a471e9d193b14010a356d~mv2.png/v1/fill/w_980,h_551,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/13ef96_3d08ad16152a471e9d193b14010a356d~mv2.png",
    },
    {
      id: 9,
      category: 'Led Wall ve Projeksiyon',
      image: 'https://ledcontrollercard.com/wp-content/uploads/2023/03/products-23_5.jpg',
    },
    {
      id: 10,
      category: 'Ses Sistemleri',
      image: 'https://media.sweetwater.com/m/products/image/8bcb63a95d7YTmTKf7LTz0QXE7zMUu7PXx99mSyC.jpg',
    },
    {
      id: 11,
      category: 'Ses Sistemleri',
      image: 'https://cdn.qukasoft.com/f/733039/bzR6WWFuTXorNjQrTmlwc0g0TnNhYmhESUE9PQ/images/urunler/yamaha-dbr-12-12-aktif-kabin-hoparlor-1000wat-26980-1.jpg',
    },
    {
      id: 12,
      category: 'Ses Sistemleri',
      image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_28/281296/6684120_800.jpg',
    },
    {
      id: 13,
      category: 'Ses Sistemleri',
      image: 'https://www.soundrent.be/wp-content/uploads/2017/03/qlxd24_b58a_wireless_system_beta58a.png',
    },
    {
      id: 14,
      category: 'Ses Sistemleri',
      image: 'linearray.jpeg',
    },
    {
      id: 15,
      category: 'Işık Sistemleri',
      image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_32/325876/17317964_800.jpg',
    },
    {
      id: 16,
      category: 'Işık Sistemleri',
      image: 'https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/32476/uploads/urunresimleri/buyuk/redjet-cob-4100w-4x100-watt-led-cob-mo--df633.jpg',
    },
    {
      id: 17,
      category: 'Işık Sistemleri',
      image: 'https://cdn.qukasoft.com/f/733039/bzR6WmFtNG0vcUp3ZUdFOVU1NG5hQT09/p/metex-ledfres300a-rgbw-fresnel-spot-300-watt-auto-zoom-80133814-sw772sh1022.webp',
    },
    {
      id: 18,
      category: 'Işık Sistemleri',
      image: 'https://eniyises.com/highline-pilot-2000-isik-mikseri-super-teklif-super-fiyat-highline-35730-84-B.jpg',
    },
    {
      id: 19,
      category: 'Işık Sistemleri',
      image: 'prostone.jpg',
    },
    {
      id: 20,
      category: 'Led Wall ve Projeksiyon',
      image: 'led.png',
    },
    {
      id: 21,
      category: 'Görsel Kayıt Sistemleri',
      image: 'https://eu.connect.panasonic.com/sites/default/files/media/image/2022-09/ag-ac160a-ac130a-side-01-high-res.jpg',
    },
    {
      id: 22,
      category: 'Görsel Kayıt Sistemleri',
      image: 'https://provideo.com.tr/wp-content/uploads/2021/09/Avmatrix-HVS0402U-2-.jpg',
    },

  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-24 md:py-32 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="M32.png"
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
          hideAllCategory
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