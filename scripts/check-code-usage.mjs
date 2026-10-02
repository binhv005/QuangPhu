import fs from 'fs';
import path from 'path';

const SRC = path.resolve('./client/src');

function getAllJsx(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getAllJsx(full));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

const allFiles = getAllJsx(SRC);
const fileContents = allFiles.map(f => ({ path: f, name: path.basename(f, path.extname(f)), content: fs.readFileSync(f, 'utf8') }));

console.log('--- Component/Page Usage Check ---');
for (const file of fileContents) {
  if (file.name === 'main' || file.name === 'App') continue;
  const isImported = fileContents.some(other => other.path !== file.path && (
    other.content.includes(`./${file.name}`) ||
    other.content.includes(`/${file.name}`) ||
    other.content.includes(`'${file.name}'`) ||
    other.content.includes(`"${file.name}"`) ||
    other.content.includes(file.name)
  ));
  console.log(`  ${file.name}: ${isImported ? 'USED' : 'UNUSED'}`);
}
