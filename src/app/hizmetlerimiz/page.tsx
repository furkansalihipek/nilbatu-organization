'use client'
import { useState } from 'react'
import { Button, Card, ContactPopup } from '@/components' // 'Button' bileşeni kullanıldığı için 'Button' uyarısı kaybolmalı

export default function Services() {
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
      <section className="relative text-white py-24 md:py-32 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="nilbatu.png"
            alt="Arkaplan görseli (Hizmetlerimiz)"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Hizmetlerimiz
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Profesyonel organizasyon hizmetlerimizle etkinliklerinizi unutulmaz kılıyoruz.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kapsamlı Hizmetlerimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Her türlü etkinlik için profesyonel çözümler sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Wedding Organization */}
            <Card variant="outlined" className="text-center p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🫶🏻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Düğün / Nişan / Kına Organizasyonu</h3>
              <p className="text-gray-600 leading-relaxed">
                Hayatınızın en özel günü için mükemmel organizasyon. Ses, ışık, dekorasyon ve tüm detaylar bizde.
              </p>
            </Card>

            {/* Corporate Events */}
            <Card variant="outlined" className="text-center p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kurumsal Etkinlikler</h3>
              <p className="text-gray-600 leading-relaxed">
                Şirket toplantıları, konferanslar, lansmanlar ve özel etkinlikler için profesyonel çözümler.
              </p>
            </Card>

            <Card variant="outlined" className="text-center p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Okul Mezuniyetleri</h3>
              <p className="text-gray-600 leading-relaxed">
                Etkinliğinizin temasına uygun sahne tasarımı ve dekorasyon hizmetleri.
              </p>
            </Card>

            {/* Sound & Light Systems */}
            <Card variant="outlined" className="text-center p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sahne Sistemleri</h3>
              <p className="text-gray-600 leading-relaxed">
                En son teknoloji ses, ışık, platform ve led ekran sistemleri ile etkinliklerinizi etkileyici hale getiriyoruz.
              </p>
            </Card>

            {/* DJ Services */}
            <Card variant="outlined" className="text-center p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">DJ ve Müzik Hizmetleri</h3>
              <p className="text-gray-600 leading-relaxed">
                Profesyonel DJ&apos;ler ve müzik sistemleri ile etkinliklerinizi canlandırıyoruz.
              </p>
            </Card>

            {/* Event Planning */}
            <Card variant="outlined" className="text-center p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Etkinlik Planlama</h3>
              <p className="text-gray-600 leading-relaxed">
                Etkinliğinizin başından sonuna kadar profesyonel planlama ve koordinasyon.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Working Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Çalışma Adımlarımız
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Etkinliğinizi başarıyla gerçekleştirmek için izlediğimiz adımlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Görüşme ve Planlama</h3>
              <p className="text-gray-600 leading-relaxed">
                Etkinliğinizin detaylarını dinleyerek size en uygun çözümü planlıyoruz.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Teklif ve Anlaşma</h3>
              <p className="text-gray-600 leading-relaxed">
                Detaylı teklifimizi sunuyor ve anlaşma sonrası hazırlıklara başlıyoruz.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hazırlık ve Kurulum</h3>
              <p className="text-gray-600 leading-relaxed">
                Ekipmanlarımızı hazırlayıp etkinlik alanında profesyonel kurulum yapıyoruz.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Etkinlik ve Sonrası</h3>
              <p className="text-gray-600 leading-relaxed">
                Etkinliğinizi başarıyla gerçekleştirip sonrasında da destek sağlıyoruz.
              </p>
            </div>
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
          <Button variant="secondary" size="lg" onClick={handleContactClick}>
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