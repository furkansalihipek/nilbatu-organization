import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const bot = TELEGRAM_BOT_TOKEN ? new TelegramBot(TELEGRAM_BOT_TOKEN) : null;

function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendTelegramNotification(htmlMessage: string): Promise<{
  sent: boolean;
  error?: string;
}> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return { sent: false, error: 'TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID tanımlı değil' };
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    signal: AbortSignal.timeout(8000),
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: htmlMessage,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  const payload = (await response.json()) as {
    ok?: boolean;
    description?: string;
  };

  if (!response.ok || !payload.ok) {
    return {
      sent: false,
      error: payload.description || `Telegram API HTTP ${response.status}`,
    };
  }

  return { sent: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof message !== 'string' || !message.trim() ||
        (phone != null && typeof phone !== 'string') ||
        (subject != null && typeof subject !== 'string')) {
      return NextResponse.json(
        { error: 'Ad Soyad, E-posta ve Mesaj alanları zorunludur' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Geçersiz email adresi' },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'Bilinmiyor';

    const telegramMessage = [
      '🔔 <b>Yeni İletişim Formu Mesajı</b>',
      '',
      `👤 <b>Ad Soyad:</b> ${escapeTelegramHtml(name)}`,
      `📧 <b>E-posta:</b> ${escapeTelegramHtml(email)}`,
      `📞 <b>Telefon:</b> ${escapeTelegramHtml(phone || 'Belirtilmemiş')}`,
      `📝 <b>Konu:</b> ${escapeTelegramHtml(subject || 'Belirtilmemiş')}`,
      '💬 <b>Mesaj:</b>',
      escapeTelegramHtml(message),
      '',
      `⏰ <b>Tarih:</b> ${escapeTelegramHtml(new Date().toLocaleString('tr-TR'))}`,
      `🌐 <b>IP:</b> ${escapeTelegramHtml(ip)}`,
    ].join('\n');

    let telegramSent = false;

    try {
      const telegramResult = await sendTelegramNotification(telegramMessage);
      telegramSent = telegramResult.sent;
      if (!telegramSent) {
        console.error('Telegram bildirimi gönderilemedi:', telegramResult.error);
      }
    } catch (error) {
      console.error('Telegram mesaj gönderme hatası:', error);
    }

    if (!telegramSent && bot && TELEGRAM_CHAT_ID) {
      try {
        await bot.sendMessage(TELEGRAM_CHAT_ID, telegramMessage, {
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        });
        telegramSent = true;
      } catch (fallbackError) {
        console.error('Telegram (bot fallback) hatası:', fallbackError);
      }
    }

    if (!telegramSent) {
      return NextResponse.json(
        { success: false, error: 'Mesajınız gönderilemedi. Lütfen tekrar deneyin veya telefonla bize ulaşın.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
        telegramSent,
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
