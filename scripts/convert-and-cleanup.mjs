import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT_DIR = path.resolve('.');
const CLIENT_DIR = path.join(ROOT_DIR, 'client');
const CLIENT_SRC = path.join(CLIENT_DIR, 'src');
const CLIENT_PUBLIC = path.join(CLIENT_DIR, 'public');
const IMAGES_DIR = path.join(CLIENT_PUBLIC, 'assets', 'images');
const PARTNERS_DIR = path.join(CLIENT_PUBLIC, 'assets', 'partners');

// Map of conversions from old filename to new webp filename
const imageConversions = [
  // Images
  { dir: IMAGES_DIR, from: 'about-artisan.jpg', to: 'about-artisan.webp' },
  { dir: IMAGES_DIR, from: 'about-logo.png', to: 'about-logo.webp' },
  { dir: IMAGES_DIR, from: 'bg-motif-cloud.png', to: 'bg-motif-cloud.webp' },
  { dir: IMAGES_DIR, from: 'bg-motif-mountain.png', to: 'bg-motif-mountain.webp' },
  { dir: IMAGES_DIR, from: 'cong-trinh-di-tich.jpg', to: 'cong-trinh-di-tich.webp' },
  { dir: IMAGES_DIR, from: 'gallery-cham-dong.jpg', to: 'gallery-cham-dong.webp' },
  { dir: IMAGES_DIR, from: 'gallery-nha-xuong.jpg', to: 'gallery-nha-xuong.webp' },
  { dir: IMAGES_DIR, from: 'hero-artisan.jpg', to: 'hero-artisan.webp' },
  { dir: IMAGES_DIR, from: 'hero-rotating-emblem.png', to: 'hero-rotating-emblem.webp' },
  { dir: IMAGES_DIR, from: 'khach-hang-co-quan.jpg', to: 'khach-hang-co-quan.webp' },
  { dir: IMAGES_DIR, from: 'khach-hang-di-tich.jpg', to: 'khach-hang-di-tich.webp' },
  { dir: IMAGES_DIR, from: 'khach-hang-su-kien.jpg', to: 'khach-hang-su-kien.webp' },
  { dir: IMAGES_DIR, from: 'logo.png', to: 'logo.webp' },
  { dir: IMAGES_DIR, from: 'qua-tang-my-thuat.jpg', to: 'qua-tang-my-thuat.webp' },
  { dir: IMAGES_DIR, from: 'quy-trinh-han.jpg', to: 'quy-trinh-han.webp' },
  { dir: IMAGES_DIR, from: 'tuong-bac-ho.jpg', to: 'tuong-bac-ho.webp' },
  { dir: IMAGES_DIR, from: 'tuong-dai-chien-thang.jpg', to: 'tuong-dai-chien-thang.webp' },
  { dir: IMAGES_DIR, from: 'tuong-tho.jpg', to: 'tuong-tho.webp' },
  { dir: IMAGES_DIR, from: 'xe-nghi-truong-main.jpg', to: 'xe-nghi-truong-main.webp' },
  { dir: IMAGES_DIR, from: '1790914174331_3763498134712611457_3763498134712611457_7ddc2411d84842ef2995298f982feedb.jpg', to: '1790914174331_3763498134712611457_3763498134712611457_7ddc2411d84842ef2995298f982feedb.webp' },
  
  // Partners
  { dir: PARTNERS_DIR, from: 'Bo-ngoai-giao-300x183.png', to: 'Bo-ngoai-giao-300x183.webp' },
  { dir: PARTNERS_DIR, from: 'Bo-tai-chinh-300x300.png', to: 'Bo-tai-chinh-300x300.webp' },
  { dir: PARTNERS_DIR, from: 'lien-hiep-thanh-nien-300x300.png', to: 'lien-hiep-thanh-nien-300x300.webp' },
  { dir: PARTNERS_DIR, from: 'tong-lien-doan-300x277.png', to: 'tong-lien-doan-300x277.webp' },
  { dir: PARTNERS_DIR, from: 'TW-doan-272x300.png', to: 'TW-doan-272x300.webp' },
];

async function convertImages() {
  console.log('--- 1. Converting used images to WebP ---');
  for (const item of imageConversions) {
    const inputPath = path.join(item.dir, item.from);
    const outputPath = path.join(item.dir, item.to);
    if (fs.existsSync(inputPath)) {
      await sharp(inputPath)
        .webp({ quality: 88, effort: 6 })
        .toFile(outputPath);
      const inStat = fs.statSync(inputPath);
      const outStat = fs.statSync(outputPath);
      const savings = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(1);
      console.log(`✓ Converted ${item.from} -> ${item.to} (${(inStat.size/1024).toFixed(1)}KB -> ${(outStat.size/1024).toFixed(1)}KB, -${savings}%)`);
    }
  }
}

function getAllSourceFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getAllSourceFiles(fullPath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jsx', '.js', '.css', '.html', '.json'].includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function updateCodeReferences() {
  console.log('\n--- 2. Updating code references to WebP ---');
  const sourceFiles = [
    ...getAllSourceFiles(CLIENT_SRC),
    path.join(CLIENT_DIR, 'index.html')
  ];

  for (const filePath of sourceFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const item of imageConversions) {
      if (content.includes(item.from)) {
        content = content.replaceAll(item.from, item.to);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated references in: ${path.relative(ROOT_DIR, filePath)}`);
    }
  }
}

function deleteUnusedFiles() {
  console.log('\n--- 3. Deleting unused images & old source files ---');
  
  // List of old image files that were converted
  for (const item of imageConversions) {
    const inputPath = path.join(item.dir, item.from);
    if (item.from !== item.to && fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
      console.log(`🗑 Deleted converted original: ${item.from}`);
    }
  }

  // Unused images in images dir
  const unusedImages = [
    '1790914174255_3763498134712611457_3763498134712611457_0f99173e49b66b0cdab3a7e22a6b3eba.jpg',
    '1790914174280_3763498134712611457_3763498134712611457_f4251df77b0e623de3471c6cc5f761b7.jpg',
    '1790914174295_3763498134712611457_3763498134712611457_65c9531735dc897b8ae5cb25e453adec.jpg',
    '1790914174307_3763498134712611457_3763498134712611457_ac5b4699dd9463fc0898c16d464020e3.jpg',
    '1790914174319_3763498134712611457_3763498134712611457_86cca0ea55744505a15cf676c523fb04.jpg',
    '1790914174350_3763498134712611457_3763498134712611457_e0bc90fe367a199a133a997b52380a30.jpg',
    '1790914174362_3763498134712611457_3763498134712611457_496323da53e09bf68a8fe6497aef4e68.jpg',
    '1790914174375_3763498134712611457_3763498134712611457_e54ab99a13033bf058f6a1c62b99828e.jpg',
    '1790914174385_3763498134712611457_3763498134712611457_659d4f59ffc7c4f64e05689299e707d4.jpg',
    '1790914174396_3763498134712611457_3763498134712611457_88465772e0f63b0290fad15019a4f903.jpg',
    '1790914284640_3763498134712611457_3763498134712611457_9b97be04c8e4495ab8dbf300e3db4602.jpg',
    '1790914284663_3763498134712611457_3763498134712611457_5b4c1d51ed154240eeca8113c1ec2f4b.jpg',
    '1790914284678_3763498134712611457_3763498134712611457_ba3694066fc6577396aa5602364d4310.jpg',
    '37d5eb9a4618f39ef793e618c2d8b0c3.jpg',
    'about-flower-emblem.png',
    'about-logo-emblem.png',
    'hero-backdrop-shape.svg',
    'hero-rotating-emblem-orig.png',
    'hero-shape-red.png',
    'trongdong-gold-transparent.png',
    'trongdong-nobg.png',
    'trongdong.jpg',
    'tuong-bac-ho-no-bg.png'
  ];

  for (const file of unusedImages) {
    const full = path.join(IMAGES_DIR, file);
    if (fs.existsSync(full)) {
      fs.unlinkSync(full);
      console.log(`🗑 Deleted unused image: ${file}`);
    }
  }

  // Unused partners
  const unusedPartners = [
    'Bo-KHCN-300x300.jpg',
    'Bo-KHCN-300x300.png',
    'Bo-quoc-phong-1.svg',
    'Bo-quoc-phong-2.svg'
  ];

  for (const file of unusedPartners) {
    const full = path.join(PARTNERS_DIR, file);
    if (fs.existsSync(full)) {
      fs.unlinkSync(full);
      console.log(`🗑 Deleted unused partner asset: ${file}`);
    }
  }

  // Unused components
  const unusedComponents = [
    path.join(CLIENT_SRC, 'components', 'AdminLeadsModal.jsx'),
    path.join(CLIENT_SRC, 'components', 'Customers.jsx')
  ];

  for (const file of unusedComponents) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`🗑 Deleted unused component: ${path.basename(file)}`);
    }
  }
}

async function main() {
  await convertImages();
  updateCodeReferences();
  deleteUnusedFiles();
  console.log('\n✨ Asset optimization & cleanup completed successfully!');
}

main().catch(console.error);
