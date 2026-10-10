import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDatabase } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const pin = authHeader?.replace('Bearer ', '');
    const db = getDatabase();

    if (pin && pin !== db.settings.adminPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const ext = path.extname(originalName) || '.jpg';
    const baseName = path.basename(originalName, ext);
    const fileName = `${baseName}-${Date.now()}${ext}`;

    const uploadDir = path.resolve(process.cwd(), 'public', 'images', 'products');

    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      // Return public URL path
      return NextResponse.json({
        success: true,
        url: `/images/products/${fileName}`,
      });
    } catch (fsErr) {
      // In serverless environments where local filesystem might be read-only, return base64 data URL
      const mime = file.type || 'image/jpeg';
      const base64 = buffer.toString('base64');
      return NextResponse.json({
        success: true,
        url: `data:${mime};base64,${base64}`,
      });
    }
  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
