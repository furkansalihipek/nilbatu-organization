import { NextRequest, NextResponse } from 'next/server';

// Environment variables'dan admin bilgilerini al
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Kullanıcı adı ve şifre gereklidir' },
        { status: 400 }
      );
    }

    // Basit authentication kontrolü
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({
        success: true,
        message: 'Giriş başarılı',
      });

      // Session cookie oluştur (30 gün geçerli)
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 gün
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Kullanıcı adı veya şifre hatalı' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Giriş yapılamadı' },
      { status: 500 }
    );
  }
}
