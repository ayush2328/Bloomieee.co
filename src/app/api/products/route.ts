import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, Product } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();
    const sort = searchParams.get('sort') || 'featured';
    const occasion = searchParams.get('occasion');
    const flowerType = searchParams.get('flowerType');
    const color = searchParams.get('color');
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const inStockOnly = searchParams.get('inStock') === 'true';

    const db = getDatabase();
    let products = db.products.filter((p) => !p.isArchived);

    // Filters
    if (category && category !== 'All') {
      products = products.filter(
        (p) =>
          p.category.toLowerCase() === category.toLowerCase() ||
          p.secondaryCategories?.some((c) => c.toLowerCase() === category.toLowerCase())
      );
    }

    if (occasion) {
      products = products.filter((p) =>
        p.occasions.some((o) => o.toLowerCase() === occasion.toLowerCase())
      );
    }

    if (flowerType) {
      products = products.filter((p) =>
        p.flowerTypes.some((f) => f.toLowerCase().includes(flowerType.toLowerCase()))
      );
    }

    if (color) {
      products = products.filter((p) =>
        p.colors.some((c) => c.toLowerCase().includes(color.toLowerCase()))
      );
    }

    if (minPrice !== undefined) {
      products = products.filter((p) => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      products = products.filter((p) => p.price <= maxPrice);
    }

    if (inStockOnly) {
      products = products.filter((p) => p.inStock > 0);
    }

    if (search) {
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.flowerTypes.some((f) => f.toLowerCase().includes(search)) ||
          p.category.toLowerCase().includes(search)
      );
    }

    // Sorting
    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'newest') {
      products.reverse();
    } else {
      // Featured / Bestseller default
      products.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: false, error: 'Failed to load products' }, { status: 500 });
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
    if (!body.title || !body.price || !body.category) {
      return NextResponse.json({ success: false, error: 'Title, price, and category are required' }, { status: 400 });
    }

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: body.title,
      slug,
      category: body.category,
      secondaryCategories: body.secondaryCategories || [],
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      inStock: Number(body.inStock ?? 10),
      isFeatured: Boolean(body.isFeatured),
      isBestseller: Boolean(body.isBestseller),
      images: body.images?.length ? body.images : ['/images/products/lavender-romance-bouquet.jpg'],
      flowerTypes: body.flowerTypes || ['Handmade Flowers'],
      colors: body.colors || ['Multi-color'],
      wrapOptions: body.wrapOptions || ['Standard Wrap'],
      occasions: body.occasions || ['Any Occasion'],
      description: body.description || 'Handcrafted everlasting flowers.',
      dispatchTime: body.dispatchTime || '2-3 business days',
      careInstructions: body.careInstructions || 'Keep away from water. Dust gently.',
      packagingInfo: body.packagingInfo || 'Shipped in protective presentation carton with card.',
      rating: 5.0,
      reviewCount: 0,
    };

    db.products.unshift(newProduct);
    saveDatabase(db);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
