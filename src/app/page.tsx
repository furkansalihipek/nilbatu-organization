'use client'
import { useState } from 'react'
import { Button, Card, ContactPopup } from '@/components'

export default function Home() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)

  const handleContactClick = () => {
    setIsContactPopupOpen(true)
  }

  const handleCloseContactPopup = () => {
    setIsContactPopupOpen(false)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Profesyonel Organizasyon Hizmetleri
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Etkinliklerinizi unutulmaz kılıyoruz. Kaliteli ekipman ve uzman ekibimizle
              her türlü organizasyon ihtiyacınız için hizmetinizdeyiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  window.location.href = '/etkinlik-takvimi';
                }}
              >
                📅 Etkinlik Takvimi
              </Button>

              <Button variant="outline" size="lg" className="border-blue-900 hover:bg-blue-900 hover:text-white"
              onClick={() => {
                window.location.href = '/iletisim';
              }}>
                💰 Ücretsiz Teklif Alın
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden NİLBATU?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Yılların deneyimi ve profesyonel yaklaşımımızla etkinliklerinizi
              başarıyla gerçekleştiriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Kaliteli Ekipman</h3>
              <p className="text-gray-600 leading-relaxed">
                En son teknoloji ses ve ışık sistemleri ile profesyonel ekipmanlarımızla hizmet veriyoruz.
              </p>
            </Card>

            <Card variant="elevated" className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Zamanında Teslimat</h3>
              <p className="text-gray-600 leading-relaxed">
                Etkinliklerinizde zamanında ve düzenli hizmet garantisi veriyoruz.
              </p>
            </Card>

            <Card variant="elevated" className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Uzman Ekip</h3>
              <p className="text-gray-600 leading-relaxed">
                Deneyimli ve profesyonel ekibimizle etkinliklerinizi mükemmel şekilde yönetiyoruz.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Çeşitli organizasyon türleri için kapsamlı hizmetler sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Düğün Organizasyonu', icon: '💒' },
              { title: 'Kurumsal Etkinlikler', icon: '🏢' },
              { title: 'Ses ve Işık Sistemleri', icon: '🎵' },
              { title: 'Sahne ve Dekorasyon', icon: '🎭' }
            ].map((service, index) => (
              <Card key={index} variant="outlined" className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="primary" size="lg"
            onClick={() => {
              window.location.href = '/hizmetlerimiz';
            }}>
              Tüm Hizmetlerimizi Görün
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Etkinliğiniz İçin Teklif Alın
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Profesyonel ekibimizle görüşün, etkinliğiniz için en uygun çözümü birlikte bulalım.
          </p>
          <Button variant="secondary" size="lg"
          onClick={handleContactClick}>
            Hemen İletişime Geçin
          </Button>
        </div>
      </section>

      {/* Contact Popup */}
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={handleCloseContactPopup} 
      />
    </div>
  )
} 