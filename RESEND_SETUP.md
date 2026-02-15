# Resend Email Servisi Kurulum Rehberi

## Sorun
SendGrid'de "Maximum credits exceeded" hatası alınıyor. SendGrid'in ücretsiz planı günlük 100 email limitine sahip.

## Çözüm: Resend Kullanımı

Resend, SendGrid'den daha iyi bir alternatif:
- ✅ Ayda 3,000 email (SendGrid: günde 100)
- ✅ Günde 100 email
- ✅ Daha kolay kurulum
- ✅ Daha iyi developer experience

## Kurulum Adımları

### 1. Resend Hesabı Oluştur
1. https://resend.com adresine gidin
2. "Sign Up" butonuna tıklayın
3. Email adresinizle kayıt olun

### 2. API Key Oluştur
1. Dashboard'a giriş yapın
2. Sol menüden "API Keys" seçeneğine tıklayın
3. "Create API Key" butonuna tıklayın
4. Key'e bir isim verin (örn: "Nilbatu Website")
5. "Create" butonuna tıklayın
6. **ÖNEMLİ:** API Key'i kopyalayın (bir daha gösterilmeyecek!)
   - Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 3. Email Domain Verify Etme (Opsiyonel ama Önerilen)

#### Seçenek 1: Kendi Domain'inizi Kullanın (Önerilen)
1. Dashboard'da "Domains" sekmesine gidin
2. "Add Domain" butonuna tıklayın
3. Domain'inizi girin (örn: `nilbatu.com`)
4. DNS kayıtlarını ekleyin (Resend size gerekli kayıtları gösterecek)
5. Verify edilene kadar bekleyin

#### Seçenek 2: Test için Kendi Email Adresinizi Verify Edin
1. Dashboard'da "Emails" sekmesine gidin
2. "Add Email" butonuna tıklayın
3. Email adresinizi girin (örn: `ipekfurkansalih@gmail.com`)
4. Email'inize gelen doğrulama linkine tıklayın

### 4. Environment Variable Ekleme

`.env.local` dosyanıza ekleyin:

```env
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# From Email (verify edilmiş email adresiniz)
FROM_EMAIL=ipekfurkansalih@gmail.com
```

**Not:** Eğer domain verify ettiyseniz, `FROM_EMAIL` olarak domain'inizden bir email kullanabilirsiniz:
```env
FROM_EMAIL=noreply@nilbatu.com
```

### 5. Server'ı Yeniden Başlatın

```bash
# Development server'ı durdurun (Ctrl+C)
# Sonra tekrar başlatın
npm run dev
```

## Test Etme

1. İletişim formunu doldurun
2. Terminal'de şu logları görmelisiniz:
   ```
   Resend ile e-posta gönderiliyor...
   Resend ile e-posta başarıyla gönderildi: {...}
   ```
3. Email'inizin gelen kutusunu kontrol edin

## Sorun Giderme

### "Unauthorized" hatası alıyorsanız:
- API Key'in doğru kopyalandığından emin olun
- `.env.local` dosyasında `RESEND_API_KEY` değişkeninin doğru olduğundan emin olun
- Server'ı yeniden başlattığınızdan emin olun

### Email gelmiyorsa:
- Spam klasörünü kontrol edin
- `FROM_EMAIL` adresinin verify edildiğinden emin olun
- Resend dashboard'da "Logs" sekmesinden email durumunu kontrol edin

## SendGrid'i Kaldırma (Opsiyonel)

Eğer artık SendGrid kullanmayacaksanız:
1. `.env.local` dosyasından `SENDGRID_API_KEY` satırını silebilirsiniz
2. `package.json`'dan `@sendgrid/mail` paketini kaldırabilirsiniz (opsiyonel)

## Limitler

- **Ücretsiz Plan:** Ayda 3,000 email, günde 100 email
- **Rate Limit:** Saniyede 2 API isteği

Bu limitler çoğu web sitesi için yeterlidir.
