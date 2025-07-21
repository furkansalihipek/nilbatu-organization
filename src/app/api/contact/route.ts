import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';
import sgMail from '@sendgrid/mail';

// Telegram Bot Token - Bu değeri environment variable olarak saklayacağız
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// SendGrid API Key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

// Bot instance'ı oluştur
const bot = TELEGRAM_BOT_TOKEN ? new TelegramBot(TELEGRAM_BOT_TOKEN) : null;

// SendGrid'i yapılandır
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    console.log('API çağrıldı, environment variables:', {
      hasSendGridKey: !!SENDGRID_API_KEY,
      hasTelegramToken: !!TELEGRAM_BOT_TOKEN,
      hasTelegramChatId: !!TELEGRAM_CHAT_ID
    });
    
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Form validasyonu - Zorunlu alanlar: name, phone, message
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Ad Soyad, Telefon ve Mesaj alanları zorunludur' },
        { status: 400 }
      );
    }

    // Email validasyonu (opsiyonel)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Geçersiz email adresi' },
          { status: 400 }
        );
      }
    }

    // Telegram mesajı oluştur
    const telegramMessage = `
🔔 *Yeni İletişim Formu Mesajı*

👤 *Ad Soyad:* ${name}
📧 *E-posta:* ${email || 'Belirtilmemiş'}
📞 *Telefon:* ${phone}
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
    console.log('E-posta gönderme kontrolü:', { 
      email, 
      hasSendGrid: !!SENDGRID_API_KEY,
      sendGridApiKeyLength: SENDGRID_API_KEY?.length 
    });
    if (email && SENDGRID_API_KEY) {
      console.log('E-posta gönderiliyor...');
      try {
        const emailResult = await sgMail.send({
          from: 'ipekfurkansalih@gmail.com', // Verify edilmiş e-posta adresiniz
          to: email,
          subject: 'Mesajınız Alındı - Nilbatu Organizasyon',
          html: `
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
                  <a href="https://nilbatu.com" 
                     style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">
                    🌐 Web Sitemiz
                  </a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                
                <div style="text-align: center; color: #6b7280; font-size: 14px;">
                  <p><strong>Nilbatu Organizasyon</strong></p>
                  <p>Adalet, 1643/18. Sk. No:16-1/B, 35530 Bayraklı/İzmir</p>
                  <p>📧 info@nilbatu.com | 📞 ${process.env.COMPANY_PHONE || '+90 XXX XXX XX XX'}</p>
                </div>
              </div>
            </div>
          `
        });
        console.log('E-posta başarıyla gönderildi:', emailResult);
      } catch (emailError) {
        console.error('E-posta gönderme hatası:', emailError);
        console.error('Hata detayı:', JSON.stringify(emailError, null, 2));
        // E-posta hatası olsa bile form başarılı sayılabilir
      }
    } else {
      console.log('E-posta gönderilmedi:', { email: !!email, hasSendGrid: !!SENDGRID_API_KEY });
    }

    // Başarılı yanıt
    return NextResponse.json(
      { 
        success: true, 
        message: email 
          ? 'Mesajınız başarıyla gönderildi. Size e-posta ile de teşekkür mesajı gönderdik.' 
          : 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
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