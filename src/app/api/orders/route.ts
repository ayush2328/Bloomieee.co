import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, Order, OrderItem } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingQuery = searchParams.get('track');
    const authHeader = request.headers.get('authorization');
    const pin = authHeader?.replace('Bearer ', '');
    const db = getDatabase();

    // If tracking query provided by customer
    if (trackingQuery) {
      const q = trackingQuery.trim().toLowerCase();
      const matched = db.orders.filter(
        (o) =>
          o.id.toLowerCase() === q ||
          o.customer.email.toLowerCase() === q ||
          o.customer.phone.replace(/\D/g, '').endsWith(q.replace(/\D/g, ''))
      );
      return NextResponse.json({ success: true, orders: matched });
    }

    // Otherwise, must be admin
    if (pin !== db.settings.adminPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      count: db.orders.length,
      orders: db.orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, shippingAddress, items, paymentMethod, couponCode, notes, giftMessage } = body;

    // Validation
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return NextResponse.json(
        { success: false, error: 'Please provide full customer name, email, and contact phone number.' },
        { status: 400 }
      );
    }

    if (!shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.state || !shippingAddress?.postalCode) {
      return NextResponse.json(
        { success: false, error: 'Please provide complete delivery street address, city, state, and pincode.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Your shopping cart is empty.' },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Verify stock and compute subtotal securely server-side
    let calculatedSubtotal = 0;
    const validatedItems: OrderItem[] = [];

    for (const item of items) {
      const prod = db.products.find((p) => p.id === item.productId || p.slug === item.slug);
      if (!prod) {
        return NextResponse.json(
          { success: false, error: `Product "${item.title || item.productId}" is no longer available.` },
          { status: 400 }
        );
      }

      if (prod.inStock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            error: `Insufficient stock for "${prod.title}". Only ${prod.inStock} piece(s) available.`,
          },
          { status: 400 }
        );
      }

      const itemTotal = prod.price * item.quantity;
      calculatedSubtotal += itemTotal;

      validatedItems.push({
        productId: prod.id,
        title: prod.title,
        slug: prod.slug,
        price: prod.price,
        quantity: item.quantity,
        image: prod.images[0] || '/images/products/lavender-romance-bouquet.jpg',
        selectedColor: item.selectedColor || prod.colors[0],
        selectedWrap: item.selectedWrap || prod.wrapOptions?.[0],
        giftMessage: item.giftMessage || giftMessage || '',
      });

      // Decrement stock
      prod.inStock = Math.max(0, prod.inStock - item.quantity);
    }

    // Shipping calculation
    const shippingFee =
      calculatedSubtotal >= db.settings.freeShippingThreshold
        ? 0
        : db.settings.standardShippingFee;

    // Coupon discount logic
    let discount = 0;
    if (couponCode && couponCode.trim().toUpperCase() === 'BLOOM10') {
      discount = Math.round(calculatedSubtotal * 0.1); // 10% off
    } else if (couponCode && couponCode.trim().toUpperCase() === 'FIRSTBLOOM') {
      discount = 150; // ₹150 off welcome coupon
    }

    const total = Math.max(0, calculatedSubtotal + shippingFee - discount);

    const orderId = `BLM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
      },
      shippingAddress: {
        street: shippingAddress.street.trim(),
        apartment: shippingAddress.apartment?.trim() || '',
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        postalCode: shippingAddress.postalCode.trim(),
        country: shippingAddress.country || 'India',
      },
      items: validatedItems,
      subtotal: calculatedSubtotal,
      shippingFee,
      discount,
      couponCode: couponCode ? couponCode.trim().toUpperCase() : undefined,
      total,
      paymentMethod: paymentMethod === 'cod' ? 'cod' : paymentMethod === 'manual_upi' ? 'manual_upi' : 'razorpay',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'pending',
      notes: notes?.trim() || '',
      giftMessage: giftMessage?.trim() || '',
    };

    db.orders.unshift(newOrder);
    saveDatabase(db);

    return NextResponse.json({
      success: true,
      order: newOrder,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ success: false, error: 'Could not process order' }, { status: 500 });
  }
}
