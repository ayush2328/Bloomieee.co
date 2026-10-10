import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, CustomRequest } from '@/lib/db';

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
      count: db.customRequests.length,
      requests: db.customRequests,
    });
  } catch (error) {
    console.error('Error fetching custom bouquet requests:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve requests' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      contact,
      flowerTypes,
      preferredColors,
      bouquetSize,
      budgetRange,
      occasion,
      notes,
      referenceImageUrl,
    } = body;

    if (!customerName || !contact || !preferredColors) {
      return NextResponse.json(
        { success: false, error: 'Please enter your name, contact information, and desired colors.' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const requestId = `REQ-${Math.floor(100 + Math.random() * 900)}`;

    const newRequest: CustomRequest = {
      id: requestId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      contact: contact.trim(),
      flowerTypes: Array.isArray(flowerTypes) && flowerTypes.length > 0 ? flowerTypes : ['Artisan Choice'],
      preferredColors: preferredColors.trim(),
      bouquetSize: bouquetSize || 'Standard Bouquet (5-7 stems)',
      budgetRange: budgetRange || '₹1000 - ₹2000',
      occasion: occasion || 'Special Occasion',
      notes: notes?.trim() || '',
      referenceImageUrl: referenceImageUrl || '',
      status: 'new',
    };

    db.customRequests.unshift(newRequest);
    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: 'Your custom bouquet request has been received with love! We will reach out to you via WhatsApp / email shortly.',
      request: newRequest,
    });
  } catch (error) {
    console.error('Error submitting custom request:', error);
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const pin = authHeader?.replace('Bearer ', '');
    const db = getDatabase();

    if (pin !== db.settings.adminPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    const reqItem = db.customRequests.find((r) => r.id === id);
    if (!reqItem) {
      return NextResponse.json({ success: false, error: 'Request not found' }, { status: 404 });
    }

    if (status) {
      reqItem.status = status;
    }

    saveDatabase(db);
    return NextResponse.json({ success: true, request: reqItem });
  } catch (error) {
    console.error('Error updating custom request:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
