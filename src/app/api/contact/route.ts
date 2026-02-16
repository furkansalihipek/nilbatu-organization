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
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nilbatuorg.com';
      const logoUrl = `${siteUrl}/dark-logo.jpg`;

      const emailHTML = `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 30px 0;">
            <tr>
              <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                  
                  <!-- Header - Dark background with logo on the right -->
                  <tr>
                    <td style="background-color: #0a0a0a; padding: 24px 32px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="color: #ffffff; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; vertical-align: middle;">
                            Nilbatu Organizasyon
                          </td>
                          <td align="right" style="vertical-align: middle;">
                            <img src="${logoUrl}" alt="Nilbatu Organizasyon" width="100" style="display: block; border: 0; outline: none; max-width: 100px; height: auto;" />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Accent line -->
                  <tr>
                    <td style="height: 4px; background: linear-gradient(90deg, #3b82f6, #06b6d4, #10b981);"></td>
                  </tr>

                  <!-- Thank you message -->
                  <tr>
                    <td style="padding: 48px 40px 20px 40px;">
                      <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #111827;">
                        Teşekkür Ederiz! 🎉
                      </h1>
                      <p style="margin: 0; font-size: 16px; color: #6b7280; line-height: 1.5;">
                        Mesajınızı başarıyla aldık.
                      </p>
                    </td>
                  </tr>

                  <!-- Main content -->
                  <tr>
                    <td style="padding: 16px 40px 24px 40px;">
                      <p style="margin: 0 0 20px 0; font-size: 16px; color: #374151; line-height: 1.7;">
                        Sayın <strong>${name}</strong>,
                      </p>
                      <p style="margin: 0 0 20px 0; font-size: 16px; color: #374151; line-height: 1.7;">
                        İletişim formumuz aracılığıyla bize ulaştığınız için teşekkür ederiz. Mesajınız ekibimize iletilmiştir ve en kısa sürede sizinle iletişime geçeceğiz.
                      </p>
                      <p style="margin: 0 0 20px 0; font-size: 16px; color: #374151; line-height: 1.7;">
                        Etkinliğinizi unutulmaz kılmak için profesyonel ekibimiz ve kaliteli ekipmanlarımızla hizmetinizdeyiz.
                      </p>
                    </td>
                  </tr>

                  <!-- Message details box -->
                  <tr>
                    <td style="padding: 0 40px 32px 40px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <tr>
                          <td style="padding: 24px;">
                            <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #1e40af; text-transform: uppercase; letter-spacing: 1px;">
                              Mesaj Detaylarınız
                            </p>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 6px 0; font-size: 14px; color: #6b7280; width: 90px;">Konu:</td>
                                <td style="padding: 6px 0; font-size: 14px; color: #1f2937; font-weight: 500;">${subject || 'Belirtilmemiş'}</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Telefon:</td>
                                <td style="padding: 6px 0; font-size: 14px; color: #1f2937; font-weight: 500;">${phone || 'Belirtilmemiş'}</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Mesaj:</td>
                                <td style="padding: 6px 0; font-size: 14px; color: #1f2937; font-weight: 500; line-height: 1.5;">${message}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding: 0 40px;">
                      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0;">
                    </td>
                  </tr>

                  <!-- Footer - Founder -->
                  <tr>
                    <td style="padding: 32px 40px 24px 40px;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p style="margin: 0 0 2px 0; font-size: 16px; font-weight: 700; color: #111827;">
                              Hanry Balandı
                            </p>
                            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #3b82f6; text-transform: uppercase; letter-spacing: 1px;">
                              Founder
                            </p>
                            <p style="margin: 0; font-size: 14px; color: #6b7280;">
                              📞 <a href="tel:+905428027617" style="color: #6b7280; text-decoration: none;">0542 802 76 17</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Bottom bar -->
                  <tr>
                    <td style="background-color: #0a0a0a; padding: 20px 40px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="text-align: center;">
                            <p style="margin: 0 0 6px 0; font-size: 13px; color: #9ca3af;">
                              Adalet, 1643/18. Sk. No:16-1/B, 35530 Bayraklı/İzmir
                            </p>
                            <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                              📧 <a href="mailto:info@nilbatuorg.com" style="color: #60a5fa; text-decoration: none;">info@nilbatuorg.com</a>
                              &nbsp;&nbsp;|&nbsp;&nbsp;
                              🌐 <a href="${siteUrl}" style="color: #60a5fa; text-decoration: none;">nilbatuorg.com</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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