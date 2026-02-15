import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Çıkış yapıldı',
    });

    // Session cookie'yi sil
    response.cookies.delete('admin_session');

    return response;
  } catch (error) {
    console.error('Logout hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Çıkış yapılamadı' },
      { status: 500 }
    );
  }
}
