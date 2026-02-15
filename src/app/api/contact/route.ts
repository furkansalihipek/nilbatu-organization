import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';
import sgMail from '@sendgrid/mail';
import { Resend } from 'resend';

// Telegram Bot Token - Bu değeri environment variable olarak saklayacağız
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Email servisleri
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'ipekfurkansalih@gmail.com';

// Bot instance'ı oluştur
const bot = TELEGRAM_BOT_TOKEN ? new TelegramBot(TELEGRAM_BOT_TOKEN) : null;

// SendGrid'i yapılandır
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Resend instance'ı oluştur
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    console.log('API çağrıldı, environment variables:', {
      hasSendGridKey: !!SENDGRID_API_KEY,
      hasTelegramToken: !!TELEGRAM_BOT_TOKEN,
      hasTelegramChatId: !!TELEGRAM_CHAT_ID
    });
    
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Form validasyonu - Zorunlu alanlar: name, email, message
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Ad Soyad, E-posta ve Mesaj alanları zorunludur' },
        { status: 400 }
      );
    }

    // Email validasyonu (zorunlu)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçersiz email adresi' },
        { status: 400 }
      );
    }

    // Telegram mesajı oluştur
    const telegramMessage = `
🔔 *Yeni İletişim Formu Mesajı*

👤 *Ad Soyad:* ${name}
📧 *E-posta:* ${email}
📞 *Telefon:* ${phone || 'Belirtilmemiş'}
📝 *Konu:* ${subject || 'Belirtilmemiş'}
💬 *Mesaj:*
${message}

⏰ *Tarih:* ${new Date().toLocaleString('tr-TR')}
🌐 *IP Adresi:* ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Bilinmiyor'}
    `;

    // Telegram'a mesaj gönder
    if (bot && TELEGRAM_CHAT_ID) {
      try {
        await bot.sendMessage(TELEGRAM_CHAT_ID, telegramMessage, {
          parse_mode: 'Markdown'
        });
      } catch (telegramError) {
        console.error('Telegram mesaj gönderme hatası:', telegramError);
        // Telegram hatası olsa bile form başarılı sayılabilir
      }
    }

    // E-posta varsa otomatik teşekkür e-postası gönder
    let emailSent = false;
    let emailError = null;

    if (email) {
      const emailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Nilbatu Organizasyon</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Profesyonel Etkinlik Organizasyonu</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">Merhaba ${name},</h2>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Mesajınızı aldık ve teşekkür ederiz. Ekibimiz en kısa sürede size dönüş yapacaktır.
            </p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Mesaj Detayları:</h3>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Konu:</strong> ${subject || 'Belirtilmemiş'}</p>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Telefon:</strong> ${phone}</p>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Mesaj:</strong> ${message}</p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Etkinliğiniz için size en uygun çözümü sunmak için çalışıyoruz. 
              Detaylı bilgi ve fiyat teklifi ile size ulaşacağız.
            </p>
            
            <div style="margin: 30px 0; text-align: center; margin-bottom: 100px;">
              <a href="tel:${process.env.COMPANY_PHONE || '+90 XXX XXX XX XX'}" 
                 style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">
                📞 Hemen Ara
              </a>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://nilbatu.com'}" 
                 style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">
                🌐 Web Sitemiz
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="text-align: center; color: #6b7280; font-size: 14px;">
              <p><strong>Nilbatu Organizasyon</strong></p>
              <p>Adalet, 1643/18. Sk. No:16-1/B, 35530 Bayraklı/İzmir</p>
              <p>📧 info@nilbatuorg.com | 📞 ${process.env.COMPANY_PHONE || '+90 XXX XXX XX XX'}</p>
            </div>
          </div>
        </div>
      `;

      // Önce Resend'i dene (daha kolay kurulum ve daha iyi limitler)
      if (resend) {
        try {
          console.log('Resend ile e-posta gönderiliyor...');
          const result = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Mesajınız Alındı - Nilbatu Organizasyon',
            html: emailHTML,
          });
          console.log('✅ Resend ile e-posta başarıyla gönderildi:', result.data?.id || 'Success');
          emailSent = true;
        } catch (resendError: unknown) {
          const resendErr = resendError as Error;
          console.error('❌ Resend e-posta gönderme hatası:', resendErr?.message || resendError);
          if (resendErr?.message) {
            console.error('Resend hata detayı:', JSON.stringify(resendError, null, 2));
          }
          emailError = resendErr?.message || 'Resend hatası';
          // SendGrid'e geç
        }
      } else {
        console.warn('⚠️ Resend API key bulunamadı. SendGrid deneniyor...');
      }

      // Resend başarısız olduysa veya yoksa SendGrid'i dene
      if (!emailSent && SENDGRID_API_KEY) {
        try {
          console.log('SendGrid ile e-posta gönderiliyor...');
          await sgMail.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Mesajınız Alındı - Nilbatu Organizasyon',
            html: emailHTML,
          });
          console.log('✅ SendGrid ile e-posta başarıyla gönderildi');
          emailSent = true;
          emailError = null;
        } catch (sgError: unknown) {
          const sgErr = sgError as Error & { response?: { body?: { errors?: Array<{ message?: string }> } } };
          console.error('❌ SendGrid e-posta gönderme hatası:', sgErr?.message || sgError);
          if (sgErr?.response?.body) {
            console.error('SendGrid hata detayı:', JSON.stringify(sgErr.response.body, null, 2));
            // "Maximum credits exceeded" hatasını özel olarak işle
            if (sgErr.response.body.errors?.[0]?.message?.includes('Maximum credits exceeded')) {
              emailError = 'SendGrid günlük limitine ulaşıldı. Lütfen Resend API key ekleyin.';
              console.error('💡 Çözüm: Resend API key ekleyin. Detaylar için RESEND_SETUP.md dosyasına bakın.');
            }
          }
          if (!emailError) {
            emailError = sgErr?.message || 'SendGrid hatası';
          }
        }
      }

      if (!emailSent) {
        console.warn('⚠️ E-posta gönderilemedi:', {
          hasResend: !!RESEND_API_KEY,
          hasSendGrid: !!SENDGRID_API_KEY,
          error: emailError,
        });
        if (!RESEND_API_KEY && !SENDGRID_API_KEY) {
          console.warn('💡 Hiçbir email servisi yapılandırılmamış. RESEND_SETUP.md dosyasına bakın.');
        } else if (!RESEND_API_KEY && SENDGRID_API_KEY) {
          console.warn('💡 Resend API key ekleyin (daha iyi limitler). RESEND_SETUP.md dosyasına bakın.');
        }
      }
    }

    // Başarılı yanıt
    const successMessage = email && emailSent
      ? 'Mesajınız başarıyla gönderildi. Size e-posta ile de teşekkür mesajı gönderdik.'
      : email && !emailSent
      ? 'Mesajınız başarıyla gönderildi. (E-posta gönderilemedi, ancak mesajınız alındı)'
      : 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';

    return NextResponse.json(
      { 
        success: true, 
        message: successMessage,
        emailSent: emailSent,
        emailError: emailError || undefined,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Form işleme hatası:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
} 