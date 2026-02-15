import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('admin_session');
    const isAuthenticated = session && session.value === 'authenticated';

    return NextResponse.json({
      success: true,
      authenticated: isAuthenticated,
    });
  } catch (error) {
    console.error('Auth check hatası:', error);
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 500 }
    );
  }
}
