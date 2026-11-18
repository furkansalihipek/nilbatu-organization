import { NextRequest, NextResponse } from 'next/server';

import { adminSessionCookie, adminSessionMaxAge, createAdminSession } from '@/lib/admin-session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (typeof username !== 'string' || !username || typeof password !== 'string' || !password) {
      return NextResponse.json(
        { success: false, error: 'Kullanıcı adı ve şifre gereklidir' },
        { status: 400 }
      );
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Yönetici girişi yapılandırılmamış' },
        { status: 503 }
      );
    }

    if (username === adminUsername && password === adminPassword) {
      const response = NextResponse.json({
        success: true,
        message: 'Giriş başarılı',
      });

      // Session cookie oluştur (30 gün geçerli)
      response.cookies.set(adminSessionCookie, createAdminSession(adminUsername, adminPassword), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: adminSessionMaxAge,
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
