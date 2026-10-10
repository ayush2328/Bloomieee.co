import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const db = getDatabase();

    if (!pin || pin !== db.settings.adminPin) {
      return NextResponse.json({ success: false, error: 'Invalid admin credentials' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      token: pin,
      user: { name: 'Bloomieee Admin', role: 'owner' },
    });
  } catch (error) {
    console.error('Error during admin auth:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const pin = authHeader?.replace('Bearer ', '');
    const db = getDatabase();

    if (pin !== db.settings.adminPin) {
      return NextResponse.json({ success: false, authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ success: true, authenticated: true });
  } catch (error) {
    return NextResponse.json({ success: false, authenticated: false }, { status: 500 });
  }
}
