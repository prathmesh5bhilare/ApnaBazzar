const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Curated verified high-resolution commercial ecommerce photography IDs from Unsplash
const imageMapping = {
  // Cosmetics
  'matte-lipstick.jpg': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=85',
  'liquid-foundation.jpg': 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&auto=format&fit=crop&q=85',
  'eyeshadow-palette-12-shades.jpg': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=85',
  'compact-powder.jpg': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=85',
  'kajal-pencil.jpg': 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=800&auto=format&fit=crop&q=85',
  'volumising-mascara.jpg': 'https://images.unsplash.com/photo-1591360236480-4ed861025fa1?w=800&auto=format&fit=crop&q=85',
  'cream-blush.jpg': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=85',
  'nail-polish-set-6-pcs.jpg': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=85',
  'liquid-eyeliner.jpg': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=85',
  'glow-highlighter.jpg': 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&auto=format&fit=crop&q=85',
  'lip-gloss-duo.jpg': 'https://images.unsplash.com/photo-1586880825830-efb7c7549b77?w=800&auto=format&fit=crop&q=85',
  'makeup-brush-set-10-pcs.jpg': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=85',

  // Jewellery
  'gold-plated-layered-chain.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=85',
  'pearl-necklace.jpg': 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop&q=85',
  'kundan-choker-set.jpg': 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&auto=format&fit=crop&q=85',
  'jhumka-earrings.jpg': 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=85',
  'american-diamond-studs.jpg': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=85',
  'pearl-drop-earrings.jpg': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&auto=format&fit=crop&q=85',
  'solitaire-ring.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=85',
  'gold-plated-bangles-set-4-pcs.jpg': 'https://images.unsplash.com/photo-1611591475879-1144a9f935f0?w=800&auto=format&fit=crop&q=85',
  'temple-jewellery-necklace-set.jpg': 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&auto=format&fit=crop&q=85',
  'gold-hoop-earrings.jpg': 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=85',
  'silver-tone-anklet-pair.jpg': 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=85',
  'statement-cocktail-ring.jpg': 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=85',

  // Categories & Banners
  'cat-cosmetics.jpg': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=85',
  'cat-jewellery.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=85',
  'banner-cosmetics.jpg': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&auto=format&fit=crop&q=85',
  'banner-jewellery.jpg': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&auto=format&fit=crop&q=85'
};

const outputDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('Downloading images to:', outputDir);
  for (const [filename, url] of Object.entries(imageMapping)) {
    const dest = path.join(outputDir, filename);
    try {
      await downloadImage(url, dest);
      const stats = fs.statSync(dest);
      console.log(`[SUCCESS] ${filename} (${stats.size} bytes)`);
    } catch (e) {
      console.error(`[ERROR] ${filename}: ${e.message}`);
    }
  }
  console.log('Done downloading images!');
}

run();
