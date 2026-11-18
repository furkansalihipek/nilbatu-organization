import { NextRequest, NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-session';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      authenticated: hasAdminSession(request),
    });
  } catch (error) {
    console.error('Auth check hatası:', error);
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 500 }
    );
  }
}
