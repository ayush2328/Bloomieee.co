import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadDir = '/Users/ayush/.gemini/antigravity-ide/brain/baf99d3c-8586-4817-b0e5-ba59872f4b55/.user_uploaded';
const targetDir = path.resolve('public/images');
const productsDir = path.resolve('public/images/products');
const brandDir = path.resolve('public/images/brand');

fs.mkdirSync(productsDir, { recursive: true });
fs.mkdirSync(brandDir, { recursive: true });

async function run() {
  console.log('Extracting brand assets and real pipe-cleaner flower photos...');

  // 1. Extract circular logo from media_1791632446248.png
  // Bounds identified: minX: 81, minY: 356, size: 310
  try {
    await sharp(path.join(uploadDir, 'media_1791632446248.png'))
      .extract({ left: 81, top: 356, width: 310, height: 310 })
      .png()
      .toFile(path.join(brandDir, 'bloomieee-logo.png'));
    console.log('Extracted bloomieee-logo.png');
  } catch (err) {
    console.error('Error extracting logo:', err);
  }

  // 2. High-res Lavender Romance Bouquet with Loewe magazine (media_1791632415719.png)
  try {
    await sharp(path.join(uploadDir, 'media_1791632415719.png'))
      .jpeg({ quality: 95 })
      .toFile(path.join(productsDir, 'lavender-romance-bouquet.jpg'));
    console.log('Extracted lavender-romance-bouquet.jpg');
  } catch (err) {
    console.error('Error processing lavender bouquet:', err);
  }

  // 3. High-res Luxury Gift Box (media_1791632431268.jpg)
  try {
    await sharp(path.join(uploadDir, 'media_1791632431268.jpg'))
      .jpeg({ quality: 95 })
      .toFile(path.join(brandDir, 'luxury-gift-box.jpg'));
    console.log('Extracted luxury-gift-box.jpg');
  } catch (err) {
    console.error('Error processing gift box:', err);
  }

  // 4. Extract individual products from Instagram Grid (media_1791632438449.png)
  const gridSource = path.join(uploadDir, 'media_1791632438449.png');
  // Copy full grid screenshot for reference & Instagram feed section
  await sharp(gridSource).jpeg({ quality: 90 }).toFile(path.join(brandDir, 'instagram-grid-full.jpg'));

  const colWidth = 156;
  const rowHeight = 207;
  const cols = [0, 158, 316];
  const rows = [334, 543, 752];

  const gridProducts = [
    // Row 0
    { col: 0, row: 0, name: 'royal-blue-velvet-tulips', title: 'Royal Blue Velvet Tulips & Lily Bouquet' },
    { col: 1, row: 0, name: 'lavender-buttercream-roses', title: 'Lavender & Buttercream Rose Pastel Bouquet' },
    { col: 2, row: 0, name: 'sunlit-sunflower-daisy', title: 'Sunlit Golden Sunflower & Daisy Bouquet' },
    // Row 1
    { col: 0, row: 1, name: 'scarlet-rose-keepsake', title: 'Scarlet Red Velvet Rose Keepsake Gift' },
    { col: 1, row: 1, name: 'burgundy-bloom-scalloped', title: 'Burgundy Crimson Tulip & Lily Bouquet' },
    { col: 2, row: 1, name: 'burgundy-tulip-duet', title: 'Midnight Burgundy Tulip Duet' },
    // Row 2
    { col: 0, row: 2, name: 'sunset-blush-lilies', title: 'Sunset Blush Peachy Lilies Bouquet' },
    { col: 1, row: 2, name: 'roseate-star-lily', title: 'Roseate Star Pink Lily with Pearl Stamen' }
  ];

  for (const p of gridProducts) {
    try {
      await sharp(gridSource)
        .extract({
          left: cols[p.col],
          top: rows[p.row],
          width: colWidth,
          height: rowHeight
        })
        .jpeg({ quality: 95 })
        .toFile(path.join(productsDir, `${p.name}.jpg`));
      console.log(`Extracted ${p.name}.jpg`);
    } catch (err) {
      console.error(`Error extracting ${p.name}:`, err);
    }
  }

  console.log('All image assets successfully prepared in public/images/!');
}

run();
