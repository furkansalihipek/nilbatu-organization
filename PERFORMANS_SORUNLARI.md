# 🐌 Performans Sorunları ve Çözüm Önerileri

## 🔴 KRİTİK SORUNLAR (Hemen Düzeltilmeli)

### 1. **Büyük ve Optimize Edilmemiş Görseller**
**Sorun:**
- `public/M32.png` - **5.2MB** ⚠️ ÇOK BÜYÜK!
- `public/nilbatu.png` - **1.3MB** ⚠️ Büyük
- `public/gallery/1768235386067_WhatsApp_Image_2025-12-21_at_02.38.00.jpeg` - **1.0MB** ⚠️ Büyük
- `public/kusadasi.jpeg` - **203KB** (orta)

**Etki:** Sayfa yükleme süresini 5-10 saniye yavaşlatıyor.

**Çözüm:**
- Görselleri WebP formatına çevirin (50-70% daha küçük)
- Görselleri optimize edin (TinyPNG, Squoosh gibi araçlarla)
- M32.png'yi 500KB altına düşürün
- nilbatu.png'yi 200KB altına düşürün

---

### 2. **Next.js Image Component Kullanılmıyor**
**Sorun:** Tüm sayfalarda normal `<img>` tag'i kullanılıyor. Next.js'in optimize edilmiş `Image` component'i kullanılmıyor.

**Etkilenen Dosyalar:**
- `src/app/page.tsx` (line 21)
- `src/app/cihazlarimiz/page.tsx` (line 117)
- `src/app/iletisim/page.tsx` (line 82)
- `src/app/hizmetlerimiz/page.tsx` (line 21)
- `src/components/Gallery.tsx` (line 136)

**Etki:** Görseller otomatik optimize edilmiyor, lazy loading yok, responsive görseller yok.

**Çözüm:**
```tsx
// ❌ YANLIŞ
<img src="kusadasi.jpeg" alt="..." />

// ✅ DOĞRU
import Image from 'next/image'
<Image src="/kusadasi.jpeg" alt="..." width={1920} height={1080} priority />
```

---

### 3. **Harici Görseller (Optimize Edilmemiş)**
**Sorun:** `cihazlarimiz/page.tsx` içinde 8 adet harici URL'den görsel yükleniyor:
- https://www.bhphotovideo.com/...
- https://www.sesnosa.com/...
- https://temteknoloji.com.tr/...
- https://platincdn.com/...
- https://www.maydanozmuzik.com/...
- https://d17bck4wpaw2mg.cloudfront.net/...
- https://sc04.alicdn.com/...
- https://ledcontrollercard.com/...

**Etki:** 
- Harici sunuculardan yavaş yükleme
- CORS sorunları olabilir
- Görseller optimize edilmemiş
- CDN kontrolü yok

**Çözüm:**
- Görselleri `public/` klasörüne indirin
- Next.js Image component ile optimize edin
- Veya Next.js Image Optimization ile harici görselleri optimize edin (`next.config.ts`'de domain ekleyin)

---

### 4. **Gereksiz Bağımlılık: next-intl**
**Sorun:** `next-intl` paketi yüklü ama hiçbir yerde kullanılmıyor.

**Etki:** Gereksiz bundle boyutu (~50-100KB)

**Çözüm:**
```bash
npm uninstall next-intl
```

---

## 🟡 ORTA ÖNCELİKLİ SORUNLAR

### 5. **FontAwesome - Tüm Paket Yükleniyor**
**Sorun:** Sadece 2 icon kullanılıyor (Facebook, Instagram) ama tüm FontAwesome paketi yükleniyor.

**Etki:** ~200-300KB gereksiz JavaScript

**Çözüm:**
- SVG icon'ları kullanın (daha hafif)
- Veya sadece kullanılan icon'ları import edin (tree-shaking)

---

### 6. **Harici Görsel: İletişim Sayfası**
**Sorun:** `src/app/iletisim/page.tsx` içinde harici URL'den görsel yükleniyor:
- https://www.nytmco.com/wp-content/uploads/2017/12/iletisim-banner.jpg

**Çözüm:**
- Görseli `public/` klasörüne indirin
- Next.js Image component kullanın

---

### 7. **Çift Email Servisi**
**Sorun:** Hem `@sendgrid/mail` hem `resend` yüklü. İkisi de kullanılıyor (fallback olarak).

**Etki:** Gereksiz bundle boyutu (~50KB)

**Not:** Bu normal olabilir (fallback mekanizması), ama sadece birini kullanmayı düşünebilirsiniz.

---

## 🟢 DÜŞÜK ÖNCELİKLİ (İyileştirmeler)

### 8. **Gallery Component - Lazy Loading**
**Durum:** Gallery component'inde `loading="lazy"` var, bu iyi.

**İyileştirme:** Next.js Image component kullanılırsa otomatik lazy loading olur.

---

### 9. **Leaflet Map**
**Durum:** Map component lazy load edilmiş (`dynamic import`), bu iyi.

**Not:** Sadece iletişim sayfasında kullanılıyor, bu doğru yaklaşım.

---

## 📊 Özet ve Öncelik Sırası

### Hemen Yapılması Gerekenler:
1. ✅ **M32.png'yi optimize et** (5.2MB → <500KB)
2. ✅ **Tüm `<img>` tag'lerini `Image` component'ine çevir**
3. ✅ **Harici görselleri yerel klasöre indir ve optimize et**
4. ✅ **next-intl paketini kaldır**

### Orta Vadede:
5. ⚠️ **FontAwesome yerine SVG icon'lar kullan**
6. ⚠️ **İletişim sayfasındaki harici görseli yerelleştir**

### İsteğe Bağlı:
7. 💡 **Email servislerinden birini kaldır (sadece birini kullan)**

---

## 🚀 Beklenen Performans İyileştirmesi

Bu düzeltmeler yapıldıktan sonra:
- **Sayfa yükleme süresi:** ~10 saniye → ~2-3 saniye
- **Bundle boyutu:** ~%20-30 azalma
- **Lighthouse skoru:** +20-30 puan artış
- **First Contentful Paint:** ~%50 iyileşme

---

## 📝 Notlar

- Tüm görselleri WebP formatına çevirmeyi düşünün
- Next.js Image component otomatik olarak WebP'ye çevirir (tarayıcı destekliyorsa)
- Production build'de performans daha iyi olacaktır (`npm run build`)
