import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT_DIR = path.resolve('.');
const CLIENT_SRC = path.join(ROOT_DIR, 'client', 'src');
const CLIENT_PUBLIC = path.join(ROOT_DIR, 'client', 'public');
const IMAGES_DIR = path.join(CLIENT_PUBLIC, 'assets', 'images');
const PARTNERS_DIR = path.join(CLIENT_PUBLIC, 'assets', 'partners');

// 1. Gather all source text files to check references
function getAllFiles(dir, exts = ['.jsx', '.js', '.css', '.html', '.json']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (exts.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const sourceFiles = [
  ...getAllFiles(CLIENT_SRC),
  path.join(ROOT_DIR, 'client', 'index.html')
];

let allSourceText = '';
for (const file of sourceFiles) {
  allSourceText += '\n' + fs.readFileSync(file, 'utf8');
}

console.log(`Analyzing ${sourceFiles.length} source files...`);

// 2. Check images in IMAGES_DIR and PARTNERS_DIR
function checkDir(dir, relPrefix) {
  if (!fs.existsSync(dir)) return { used: [], unused: [] };
  const files = fs.readdirSync(dir);
  const used = [];
  const unused = [];

  for (const file of files) {
    if (file.endsWith('.mp4')) continue; // skip videos
    const relPath = `${relPrefix}/${file}`.replace(/\\/g, '/');
    const isReferenced = allSourceText.includes(file) || allSourceText.includes(relPath);
    if (isReferenced) {
      used.push({ file, relPath, fullPath: path.join(dir, file) });
    } else {
      unused.push({ file, relPath, fullPath: path.join(dir, file) });
    }
  }
  return { used, unused };
}

const imagesCheck = checkDir(IMAGES_DIR, '/assets/images');
const partnersCheck = checkDir(PARTNERS_DIR, '/assets/partners');

console.log('\n--- USED IMAGES in assets/images ---');
imagesCheck.used.forEach(x => console.log('  [USED]', x.file));

console.log('\n--- UNUSED IMAGES in assets/images ---');
imagesCheck.unused.forEach(x => console.log('  [UNUSED]', x.file));

console.log('\n--- USED IMAGES in assets/partners ---');
partnersCheck.used.forEach(x => console.log('  [USED]', x.file));

console.log('\n--- UNUSED IMAGES in assets/partners ---');
partnersCheck.unused.forEach(x => console.log('  [UNUSED]', x.file));
