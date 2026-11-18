# NİLBATU Organizasyon - Profesyonel Etkinlik Organizasyonu Web Sitesi

NİLBATU Organizasyon için geliştirilmiş modern ve profesyonel web sitesi. Next.js 15, React 19 ve TypeScript ile geliştirilmiştir.

## 🚀 Özellikler

- **Modern UI/UX**: Responsive tasarım ve kullanıcı dostu arayüz
- **Hızlı Performans**: Next.js 15 ile optimize edilmiş performans
- **İletişim Formu**: Telegram entegrasyonu ile otomatik bildirimler
- **Galeri**: Etkinlik fotoğrafları
- **Hizmetler ve Cihazlar**: Detaylı hizmet ve ekipman bilgileri
- **SEO Optimized**: Arama motoru optimizasyonu
- **Mobil Uyumlu**: Tüm cihazlarda mükemmel görünüm

## 📋 Gereksinimler

- Node.js 18+ 
- npm veya yarn

## 🛠️ Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/furkansalihipek/nilbatu-organization.git
cd nilbatu-organization
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables dosyasını oluşturun:
```bash
cp .env.example .env.local
```

4. `.env.local` dosyasını düzenleyip gerekli API anahtarlarını ekleyin:
- `TELEGRAM_BOT_TOKEN`: Telegram bot token'ı
- `TELEGRAM_CHAT_ID`: Telegram chat ID
- `ADMIN_USERNAME` ve `ADMIN_PASSWORD`: Galeri yönetimi giriş bilgileri
- `NEXT_PUBLIC_SITE_URL`: Sitemap ve robots.txt için sitenin adresi

5. Development server'ı başlatın:
```bash
npm run dev
```

6. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📦 Build ve Production

Production build oluşturmak için:
```bash
npm run build
npm start
```

## 🌐 Deployment

### Fly.io fotoğraf galerisi

Fly.io dağıtımında Docker imajı `data/gallery-data.json` ve
`data/gallery/uploads/` içindeki fotoğrafları taşır. Yayındaki galeri salt
okunurdur. Yeni fotoğrafları yerel yönetici paneli üzerinden ekledikten sonra
kayıt dosyasını ve fotoğrafları dağıtıma dahil edin.

### Vercel (Önerilen)

1. [Vercel](https://vercel.com) hesabınıza giriş yapın
2. GitHub repository'nizi import edin
3. Environment variables'ları ekleyin
4. Deploy butonuna tıklayın

Vercel otomatik olarak:
- Her push'ta yeni deployment yapar
- Production ve preview URL'leri sağlar
- SSL sertifikası ekler

### Diğer Platformlar

Proje standart Next.js uygulaması olduğu için Netlify, Railway, AWS gibi platformlarda da deploy edilebilir.

## 📁 Proje Yapısı

```
nilbatu-organization/
├── src/
│   ├── app/              # Next.js App Router sayfaları
│   │   ├── api/          # API routes
│   │   ├── cihazlarimiz/ # Cihazlar sayfası
│   │   ├── galeri/      # Galeri
│   │   ├── hizmetlerimiz/ # Hizmetler sayfası
│   │   ├── iletisim/     # İletişim sayfası
│   │   └── page.tsx      # Ana sayfa
│   └── components/       # React bileşenleri
├── public/               # Statik dosyalar
└── package.json          # Bağımlılıklar
```

## 🎨 Teknolojiler

- **Next.js 15**: React framework
- **React 19**: UI kütüphanesi
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Styling
- **Telegram Bot API**: Bildirim servisi
- **Leaflet**: Harita görüntüleme

## 📝 Sayfalar

- **Ana Sayfa** (`/`): Hero section, özellikler, hizmetler önizleme
- **Hizmetlerimiz** (`/hizmetlerimiz`): Detaylı hizmet bilgileri
- **Cihazlarımız** (`/cihazlarimiz`): Ekipman ve cihaz listesi
- **Galeri** (`/galeri`): Etkinlik fotoğrafları
- **İletişim** (`/iletisim`): İletişim formu ve harita

## 🔧 Geliştirme

Linting için:
```bash
npm run lint
```

## 📄 Lisans

Bu proje özel bir projedir.

## 👤 İletişim

NİLBATU Organizasyon
- 📧 Email: info@nilbatuorg.com
- 📞 Telefon: [Telefon numarası]
- 📍 Adres: Adalet, 1643/18. Sk. No:16-1/B, 35530 Bayraklı/İzmir

---

**Not**: Production'a deploy etmeden önce tüm environment variables'ların doğru şekilde ayarlandığından emin olun.
