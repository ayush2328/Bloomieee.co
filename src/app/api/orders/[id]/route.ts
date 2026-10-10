import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDatabase();
    const order = db.orders.find((o) => o.id.toLowerCase() === id.toLowerCase());

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get('authorization');
    const pin = authHeader?.replace('Bearer ', '');
    const db = getDatabase();

    if (pin !== db.settings.adminPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const order = db.orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    const body = await request.json();

    if (body.orderStatus) {
      order.orderStatus = body.orderStatus;
    }
    if (body.paymentStatus) {
      order.paymentStatus = body.paymentStatus;
    }
    if (body.trackingNumber !== undefined) {
      order.trackingNumber = body.trackingNumber;
    }

    saveDatabase(db);
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 });
  }
}
