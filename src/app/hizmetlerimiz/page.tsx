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
                <span className="text-2xl">💒</span>
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
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ses ve Işık Sistemleri</h3>
              <p className="text-gray-600 leading-relaxed">
                En son teknoloji ses ve ışık sistemleri ile etkinliklerinizi etkileyici hale getiriyoruz.
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
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Görüşme ve Planlama</h3>
              <p className="text-gray-600 leading-relaxed">
                Etkinliğinizin detaylarını dinleyerek size en uygun çözümü planlıyoruz.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Teklif ve Anlaşma</h3>
              <p className="text-gray-600 leading-relaxed">
                Detaylı teklifimizi sunuyor ve anlaşma sonrası hazırlıklara başlıyoruz.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hazırlık ve Kurulum</h3>
              <p className="text-gray-600 leading-relaxed">
                Ekipmanlarımızı hazırlayıp etkinlik alanında profesyonel kurulum yapıyoruz.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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