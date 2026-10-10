import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const pin = authHeader?.replace('Bearer ', '');
    const db = getDatabase();

    if (pin !== db.settings.adminPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      count: db.subscribers.length,
      subscribers: db.subscribers,
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const db = getDatabase();
    const existing = db.subscribers.find((s) => s.email.toLowerCase() === email);

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed to Letters & Little Blooms ♡",
      });
    }

    db.subscribers.unshift({
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active',
    });

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: 'Welcome to our floral circle! Check your inbox for a special welcome treat.',
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json({ success: false, error: 'Failed to subscribe' }, { status: 500 });
  }
}
