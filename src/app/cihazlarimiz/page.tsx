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
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNmM2Y0ZjYiLz48cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlNWU3ZWIiIHJ4PSIyMCIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjMwMCIgcj0iODAiIGZpbGw9IiMzYjgyZjYiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSIzMDAiIHI9IjYwIiBmaWxsPSIjNjBhNWZhIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMzAwIiByPSI0MCIgZmlsbD0iIzkzYzVmZCIvPjx0ZXh0IHg9IjQwMCIgeT0iNDUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzc0MTUxIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjMyIiBmb250LXdlaWdodD0iYm9sZCI+U2VzIFNpc3RlbWk8L3RleHQ+PC9zdmc+',
      description: 'Yüksek kaliteli ses çıkışı için profesyonel hoparlör sistemleri'
    },
    {
      id: 2,
      title: 'LED Işıklandırma',
      category: 'Işık Sistemleri',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNmM2Y0ZjYiLz48cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlNWU3ZWIiIHJ4PSIyMCIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjMwMCIgcj0iODAiIGZpbGw9IiNmNTllMGIiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSIzMDAiIHI9IjYwIiBmaWxsPSIjZmJiZjI0Ii8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMzAwIiByPSI0MCIgZmlsbD0iI2ZjZDM0ZCIvPjx0ZXh0IHg9IjQwMCIgeT0iNDUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzc0MTUxIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjMyIiBmb250LXdlaWdodD0iYm9sZCI+TGVkIMSwxLFrbGFuZGlybWE8L3RleHQ+PC9zdmc+',
      description: 'Modern LED ışıklandırma sistemleri ile etkileyici görsel efektler'
    },
    {
      id: 3,
      title: 'Sahne Platformu',
      category: 'Sahne Ekipmanları',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNmM2Y0ZjYiLz48cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlNWU3ZWIiIHJ4PSIyMCIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzhiNWNmNiIgcng9IjE1Ii8+PHJlY3QgeD0iMjgwIiB5PSIyMzAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iI2E3OGJmYSIgcng9IjEwIi8+PHJlY3QgeD0iNDQwIiB5PSIyMzAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iI2E3OGJmYSIgcng9IjEwIi8+PHRleHQgeD0iNDAwIiB5PSI0NTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzNzQxNTEiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIj5TYWhuZSBQbGF0Zm9ybXU8L3RleHQ+PC9zdmc+',
      description: 'Modüler sahne platformları ve profesyonel kurulum'
    },
    {
      id: 4,
      title: 'Projeksiyon Sistemi',
      category: 'Video ve Projeksiyon',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNmM2Y0ZjYiLz48cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlNWU3ZWIiIHJ4PSIyMCIvPjxyZWN0IHg9IjMwMCIgeT0iMjAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VmNDQ0NCIgcng9IjEwIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMjc1IiByPSI0MCIgZmlsbD0iI2ZlZjNjNyIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjI3NSIgcj0iMzAiIGZpbGw9IiNmZGU2OGEiLz48dGV4dCB4PSI0MDAiIHk9IjQ1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9ImJvbGQiPlByb2pla3NpeW9uPC90ZXh0Pjwvc3ZnPg==',
      description: 'Yüksek çözünürlüklü projeksiyon sistemleri'
    },
    {
      id: 5,
      title: 'Mikrofon Sistemi',
      category: 'Ses Sistemleri',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNmM2Y0ZjYiLz48cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlNWU3ZWIiIHJ4PSIyMCIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjMwMCIgcj0iODAiIGZpbGw9IiMzYjgyZjYiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSIzMDAiIHI9IjYwIiBmaWxsPSIjNjBhNWZhIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMzAwIiByPSI0MCIgZmlsbD0iIzkzYzVmZCIvPjx0ZXh0IHg9IjQwMCIgeT0iNDUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzc0MTUxIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjMyIiBmb250LXdlaWdodD0iYm9sZCI+TWlrcm9mb24gU2lzdGVtaTwvdGV4dD48L3N2Zz4=',
      description: 'Kablolu ve kablosuz mikrofon sistemleri'
    },
    {
      id: 6,
      title: 'Lazer Işık Efektleri',
      category: 'Işık Sistemleri',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNmM2Y0ZjYiLz48cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlNWU3ZWIiIHJ4PSIyMCIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjMwMCIgcj0iODAiIGZpbGw9IiNmNTllMGIiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSIzMDAiIHI9IjYwIiBmaWxsPSIjZmJiZjI0Ii8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMzAwIiByPSI0MCIgZmlsbD0iI2ZjZDM0ZCIvPjx0ZXh0IHg9IjQwMCIgeT0iNDUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzc0MTUxIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjMyIiBmb250LXdlaWdodD0iYm9sZCI+TGF6ZXIgxLEsxLFrIEVma3RsZXJpPC90ZXh0Pjwvc3ZnPg==',
      description: 'Etkileyici lazer ışık efektleri ve atmosfer yaratma'
    },
    {
      id: 7,
      title: 'Sahne Dekorasyonu',
      category: 'Sahne Ekipmanları',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNmM2Y0ZjYiLz48cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlNWU3ZWIiIHJ4PSIyMCIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzhiNWNmNiIgcng9IjE1Ii8+PHJlY3QgeD0iMjgwIiB5PSIyMzAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iI2E3OGJmYSIgcng9IjEwIi8+PHJlY3QgeD0iNDQwIiB5PSIyMzAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iI2E3OGJmYSIgcng9IjEwIi8+PHRleHQgeD0iNDAwIiB5PSI0NTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzNzQxNTEiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIj5TYWhuZSBEZWtvcmFzeW9udTwvdGV4dD48L3N2Zz4=',
      description: 'Özel tasarım sahne dekorasyon malzemeleri'
    },
    {
      id: 8,
      title: 'LED Ekran',
      category: 'Video ve Projeksiyon',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNmM2Y0ZjYiLz48cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlNWU3ZWIiIHJ4PSIyMCIvPjxyZWN0IHg9IjMwMCIgeT0iMjAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VmNDQ0NCIgcng9IjEwIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMjc1IiByPSI0MCIgZmlsbD0iI2ZlZjNjNyIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjI3NSIgcj0iMzAiIGZpbGw9IiNmZGU2OGEiLz48dGV4dCB4PSI0MDAiIHk9IjQ1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9ImJvbGQiPkxFRCBFa3JhbjwvdGV4dD48L3N2Zz4=',
      description: 'Büyük format LED ekranlar ve video duvarları'
    }
  ]

  const handleSubmit = (formData: FormData) => {
    console.log(formData);
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Cihazlarımız
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            En son teknoloji ekipmanlarımız ile etkinliklerinizi profesyonel seviyede gerçekleştiriyoruz. 
            Kaliteli ve güvenilir ekipmanlarımızla hizmetinizdeyiz.
          </p>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16 bg-white">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Teknik Özellikler
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ekipmanlarımızın teknik detayları ve özellikleri hakkında bilgi alın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="outlined" className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Kalite Garantisi</h3>
              <p className="text-gray-600 leading-relaxed">
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

      {/* Rental Information */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Kiralama Hizmetleri
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Ekipmanlarımızı kiralama hizmeti de sunuyoruz. Detaylı bilgi için bizimle iletişime geçin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Kiralama Süreleri</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Günlük kiralama</li>
                <li>• Haftalık kiralama</li>
                <li>• Aylık kiralama</li>
                <li>• Uzun dönem projeler</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Hizmet Kapsamı</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Ekipman kurulumu</li>
                <li>• Teknik destek</li>
                <li>• Operatör hizmeti</li>
                <li>• Nakliye ve sigorta</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button variant="secondary" size="lg"
            onClick={() => {
              setIsPopupOpen(true)
            }}>
              Kiralama Teklifi Alın
            </Button>
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