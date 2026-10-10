import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = getDatabase();
    // Exclude admin PIN from public response
    const { adminPin, ...publicSettings } = db.settings;
    return NextResponse.json({ success: true, settings: publicSettings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const pin = authHeader?.replace('Bearer ', '');
    const db = getDatabase();

    if (pin !== db.settings.adminPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    db.settings = {
      ...db.settings,
      ...body,
      freeShippingThreshold: body.freeShippingThreshold !== undefined ? Number(body.freeShippingThreshold) : db.settings.freeShippingThreshold,
      standardShippingFee: body.standardShippingFee !== undefined ? Number(body.standardShippingFee) : db.settings.standardShippingFee,
      expressShippingFee: body.expressShippingFee !== undefined ? Number(body.expressShippingFee) : db.settings.expressShippingFee,
    };

    saveDatabase(db);
    const { adminPin, ...updatedPublic } = db.settings;
    return NextResponse.json({ success: true, settings: updatedPublic });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}
