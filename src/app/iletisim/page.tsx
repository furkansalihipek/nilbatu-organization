'use client';

import { useState } from 'react';
import { Button, Card, Input } from '@/components';
import OpenStreetMap from '@/components/OpenStreetMap';

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        // Formu temizle
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const address = 'Adalet, 1643/18. Sk. No:16-1/B, 35530 Bayraklı/İzmir';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-20">
        <div className="absolute inset-0">
          <img
            src="https://www.nytmco.com/wp-content/uploads/2017/12/iletisim-banner.jpg"
            alt="Arkaplan görseli (İletişim)"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 opacity-70"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            İletişim
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Etkinliğiniz için bizimle iletişime geçin. Profesyonel ekibimiz size en uygun çözümü sunacaktır.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Bize Ulaşın
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Ad Soyad"
                    placeholder="Adınız ve soyadınız"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Telefon"
                    placeholder="Telefon numaranız"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="E-posta (Opsiyonel)"
                    placeholder="E-posta adresiniz"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Konu (Opsiyonel)"
                    placeholder="Mesaj konusu"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Telefon notu */}


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesajınız <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-blue-800 text-sm">
                      <strong>Sizinle daha hızlı iletişime geçmemiz için telefon numaranızı alıyoruz.</strong>
                      E-posta adresinizi de verirseniz size detaylı bilgi veya fiyat teklifi gönderebiliriz.
                    </p>
                  </div>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-800">{submitMessage}</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-red-800">{submitMessage}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gönderiliyor...
                    </div>
                  ) : (
                    'Mesaj Gönder'
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                İletişim Bilgileri
              </h2>

              <div className="space-y-6">
                <Card variant="outlined" className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Telefon</h3>
                      <p className="text-gray-600">0 (542) 802 76 17</p>
                      <p className="text-gray-600">0 (232) 446 02 33</p>
                    </div>
                  </div>
                </Card>

                <Card variant="outlined" className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">E-posta</h3>
                      <p className="text-gray-600">info@nilbatu.com</p>
                    </div>
                  </div>
                </Card>

                <Card variant="outlined" className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Adres</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Adalet, 1643/18. Sk. No:16-1/B<br />
                        35530 Bayraklı/İzmir<br />
                        Türkiye
                      </p>
                    </div>
                  </div>
                </Card>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Konumumuz
            </h2>
          </div>

          <OpenStreetMap address={address} />

          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const googleMapsUrl = 'https://www.google.com/maps/place/Nilbatu+Organizasyon+Turizm+Tanitim+Danismanlik/@38.4597083,27.1775583,17z/data=!4m16!1m9!3m8!1s0x14b97d56ce497293:0x997ec303c37bfe5f!2sNilbatu+Organizasyon+Turizm+Tanitim+Danismanlik!8m2!3d38.4605463!4d27.177612!9m1!1b1!16s%2Fg%2F11c2nbrt_0!3m5!1s0x14b97d56ce497293:0x997ec303c37bfe5f!8m2!3d38.4605463!4d27.177612!16s%2Fg%2F11c2nbrt_0?entry=ttu&g_ep=EgoyMDI1MDcxNS4xIKXMDSoASAFQAw%3D%3D';
                window.open(googleMapsUrl, '_blank');
              }}
            >
              Google Maps&apos;te Aç
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sık Sorulan Sorular
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              En çok sorulan sorulara yanıtlarımızı burada bulabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'Etkinlik organizasyonu için ne kadar süre önceden haber vermeliyim?',
                answer: 'En az 2-3 hafta önceden haber vermenizi öneririz. Büyük etkinlikler için daha uzun süre gerekebilir.'
              },
              {
                question: 'Etkinlik sırasında teknik destek sağlıyor musunuz?',
                answer: 'Evet. Profesyonel ekibimiz etkinlik boyunca sahada bulunarak tüm ekipmanların kurulumu, yönetimi ve teknik desteğini sağlar.'
              },
              {
                question: 'Hangi bölgelerde hizmet veriyorsunuz?',
                answer: 'İzmir ve çevre illerde hizmet veriyoruz. Uzak mesafe organizasyonlar için özel koşullarımız bulunmaktadır.'
              },
              {
                question: 'Fiyat teklifi nasıl alabilirim?',
                answer: 'İletişim formumuzu doldurarak veya telefon ile bize ulaşabilirsiniz. Detaylı bilgi aldıktan sonra size özel teklif hazırlarız.'
              }
            ].map((faq, index) => (
              <Card key={index} variant="outlined" className="p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 