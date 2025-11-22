'use client'
import { useState } from 'react'
import { Button, Card, Gallery, ContactPopup } from '@/components'

export default function Cihazlarimiz() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const equipment = [
    {
      category: 'Ses Sistemleri',
      items: [
        { name: 'Profesyonel Hoparlörler', description: 'Yüksek kaliteli ses çıkışı için profesyonel hoparlör sistemleri', icon: '🔊' },
        { name: 'Mikrofonlar', description: 'Kablolu ve kablosuz mikrofon sistemleri', icon: '🎤' },
        { name: 'Mikserler', description: 'Profesyonel ses mikserleri ve kontrol sistemleri', icon: '🎛️' },
        { name: 'Amplifikatörler', description: 'Güçlü ve net ses için amplifikatör sistemleri', icon: '⚡' }
      ]
    },
    {
      category: 'Işık Sistemleri',
      items: [
        { name: 'LED Paneller', description: 'Modern LED ışıklandırma sistemleri', icon: '💡' },
        { name: 'Spot Işıklar', description: 'Hareketli ve sabit spot ışık sistemleri', icon: '🔦' },
        { name: 'Lazer Sistemleri', description: 'Etkileyici lazer ışık efektleri', icon: '✨' },
        { name: 'Fog Makineleri', description: 'Atmosfer yaratmak için sis makineleri', icon: '☁️' }
      ]
    },
    {
      category: 'Sahne Ekipmanları',
      items: [
        { name: 'Sahne Platformları', description: 'Modüler sahne platformları ve rampalar', icon: '🎪' },
        { name: 'Perdeler ve Kumaşlar', description: 'Profesyonel sahne perdeleri ve dekoratif kumaşlar', icon: '🎭' },
        { name: 'Sahne Mobilyaları', description: 'Çeşitli sahne mobilyaları ve aksesuarlar', icon: '🪑' },
        { name: 'Sahne Dekorasyonu', description: 'Özel tasarım sahne dekorasyon malzemeleri', icon: '🎨' }
      ]
    },
    {
      category: 'Video ve Projeksiyon',
      items: [
        { name: 'Projeksiyon Cihazları', description: 'Yüksek çözünürlüklü projeksiyon sistemleri', icon: '📽️' },
        { name: 'LED Ekranlar', description: 'Büyük format LED ekranlar ve video duvarları', icon: '📺' },
        { name: 'Kamera Sistemleri', description: 'Profesyonel video çekim ekipmanları', icon: '📹' },
        { name: 'Video Mikserler', description: 'Çoklu video kaynak yönetimi sistemleri', icon: '🎬' }
      ]
    }
  ]

  // Galeri için örnek görseller
  const galleryItems = [
    {
      id: 1,
      title: 'Profesyonel Ses Sistemi',
      category: 'Ses Sistemleri',
      image: "https://www.bhphotovideo.com/images/fb/turbosound_iq18b_3000w_18_powered_subwoofer_1820893.jpg",
      description: 'Yüksek kalitesli seslendirme için en güncel ekipmanlar'
    },
    {
      id: 2,
      title: 'Işıklandırma Sistemleri',
      category: 'Işık Sistemleri',
      image: "https://www.sesnosa.com/idea/fy/85/myassets/products/086/1.jpg?revision=1711061524",
      description: 'Modern güçlü ışıklandırma sistemleri ile etkileyici görsel efektler'
    },
    {
      id: 3,
      title: 'Sahne Platformu',
      category: 'Sahne Ekipmanları',
      image: "https://temteknoloji.com.tr/wp-content/uploads/2024/06/image_1950-17.jpeg",
      description: 'Modüler sahne platformları ve profesyonel kurulum'
    },
    {
      id: 4,
      title: 'Projeksiyon Sistemi',
      category: 'Video Wall ve Projeksiyon',
      image: 'https://platincdn.com/466/pictures/QFOZWPZPVI4272022155433_optoma-w400-lwe-03.jpg',
      description: 'Yüksek çözünürlüklü projeksiyon sistemleri'
    },
    {
      id: 5,
      title: 'Reji Mikseri',
      category: 'Ses Sistemleri',
      image: "https://www.maydanozmuzik.com/midas-midas-m32-live-53979-58-B.jpg",
      description: 'Profesyonel ses mikserleri ve kontrol sistemleri'
    },
    {
      id: 6,
      title: 'Kamera/Fotoğraf',
      category: 'Görsel Kayıt Sistemleri',
      image: "https://d17bck4wpaw2mg.cloudfront.net/att/a/2/c/z/a2cz10/ltht.jpg",
      description: 'Ortama özel yüksek çözünürlüklü kayıt ve yayın sistemleri'
    },
    {
      id: 7,
      title: 'Jimmy Jib ',
      category: 'Görsel Kayıt Sistemleri',
      image: "https://sc04.alicdn.com/kf/H388defe2297a421690ccc523f45f6a81m.jpg",
      description: "Hareketli ve dinamik çekimler için profesyonel jimmy jib sistemleri"
    },
    {
      id: 8,
      title: 'LED Ekran',
      category: 'Video Wall ve Projeksiyon',
      image: 'https://ledcontrollercard.com/wp-content/uploads/2023/03/products-23_5.jpg',
      description: 'İstenilen ölçülerlerde indoor ve outdoor led ekranlar'
    }
  ]

  const handleSubmit = (formData: FormData) => {
    console.log(formData);
    setIsPopupOpen(false);
  };

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
            Cihazlarımız
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            En son teknoloji ekipmanlarımız ile etkinliklerinizi profesyonel seviyede gerçekleştiriyoruz.
            Kaliteli ve güvenilir ekipmanlarımızla hizmetinizdeyiz.
          </p>
        </div>
      </section>

      {/* Equipment Categories */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {equipment.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {category.category}
                </h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex} variant="elevated" className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section> */}

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