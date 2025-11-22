'use client'
import { useState } from 'react'
import { Card } from '@/components' // 'Button' bileşeni kullanıldığı için import'ta bırakıldı.
import Button from '@/components/Button' // Button'un nereden geldiğini varsayalım (component path'inize göre değişir)

export default function EtkinlikTakvimi() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const services = [
    'Düğün Organizasyonu',
    'Kurumsal Etkinlikler', 
    'Ses ve Işık Sistemleri',
    'Sahne ve Dekorasyon',
    'Diğer'
  ]

  // 'handleSubmit' uyarısını kaldırmak için 'e' parametresini kullanmadığınızı belirtmek yeterli:
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada form verilerini işleyebilirsiniz
    alert('Talebiniz alındı! En kısa sürede size dönüş yapacağız.')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📅 Etkinlik Takvimi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Etkinliğiniz için müsaitlik kontrolü yapın ve hemen rezervasyon yapın
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Takvim ve Form */}
          <Card variant="elevated" className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Rezervasyon Formu
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tarih Seçimi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Etkinlik Tarihi *
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Hizmet Seçimi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hizmet Türü *
                </label>
                <select
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Hizmet seçiniz</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* İletişim Bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="05XX XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                📅 Rezervasyon Yap
              </Button>
            </form>
          </Card>

          {/* Bilgi Kartı */}
          <div className="space-y-6">
            <Card variant="elevated" className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ℹ️ Rezervasyon Bilgileri
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Rezervasyonunuz 24 saat içinde onaylanır
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Ücretsiz danışmanlık hizmeti
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Esnek ödeme seçenekleri
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  İptal garantisi
                </li>
              </ul>
            </Card>

            <Card variant="elevated" className="p-6 bg-blue-50">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                📞 Acil İletişim
              </h3>
              <p className="text-blue-800 mb-4">
                Hızlı bilgi almak için hemen arayın:
              </p>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={() => window.location.href = 'tel:+905428027617'}
              >
                📞 Hemen Ara
              </Button>
            </Card>

            <Card variant="elevated" className="p-6 bg-green-50">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                💬 WhatsApp
              </h3>
              <p className="text-green-800 mb-4">
                WhatsApp üzerinden hızlı mesaj gönderin:
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full border-green-500 text-green-700 hover:bg-green-500 hover:text-white"
                onClick={() => window.open('https://wa.me/905428027617', '_blank')}
              >
                💬 WhatsApp&apos;tan Mesaj Gönder
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}