/* Pre-compress public raster images once at build time, never on a page request. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
sharp.concurrency(2);
const versions = {}, delivery = {};
const excluded = new Set(['design-media', 'image-media', 'industry-showcases']);
function walk(folder) {
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(folder, entry.name);
    return entry.isDirectory() ? excluded.has(entry.name) ? [] : walk(file)
      : /\.(png|jpe?g|webp|avif|svg|ico|gif)$/i.test(file) ? [file] : [];
  });
}
(async () => {
  fs.mkdirSync('public/image-media', { recursive: true });
  let before = 0, after = 0;
  for (const file of walk('public')) {
    const input = fs.readFileSync(file);
    const url = '/' + file.slice('public/'.length).split(path.sep).map(encodeURIComponent).join('/');
    const hash = crypto.createHash('sha256').update(input).digest('hex').slice(0, 12);
    versions[url] = hash;
    if (/\.(svg|ico)$/i.test(file)) continue;
    const meta = await sharp(input).metadata();
    if ((meta.pages ?? 1) > 1 || !meta.width) continue;
    const mark = /^\/(?:brand|technology-stack|service-showcase\/logos|platform-logos|review-platforms)\//.test(url);
    const quality = mark ? 82 : 70;
    const widths = mark ? [96, 240, 480] : [320, 640, 960, 1280];
    const variants = [];
    for (const width of widths) {
      const dest = `public/image-media/${hash}-v21-q${quality}-${width}.webp`;
      if (!fs.existsSync(dest)) await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(dest);
      const metadata = await sharp(dest).metadata();
      if (!variants.some(v => v.width === metadata.width)) variants.push({ src: dest.slice('public'.length), width: metadata.width, bytes: fs.statSync(dest).size });
    }
    if (input.length < variants.at(-1).bytes && !variants.some(v => v.bytes < input.length)) continue;
    const smaller = variants.filter(v => v.bytes < input.length);
    const chosen = smaller.at(-1) ?? variants.at(-1);
    const available = variants.filter(v => v.width <= chosen.width);
    delivery[url] = { src: chosen.src, srcSet: available.map(v => v.src + ' ' + v.width + 'w').join(', ') };
    before += input.length; after += chosen.bytes;
  }
  fs.writeFileSync('src/lib/image-versions.json', JSON.stringify(versions, null, 2) + '\n');
  fs.writeFileSync('src/lib/image-delivery.json', JSON.stringify(delivery, null, 2) + '\n');
  fs.writeFileSync('src/lib/image-release.json', JSON.stringify({ version: crypto.createHash('sha256').update(JSON.stringify(versions)).digest('hex').slice(0, 12) }) + '\n');
  console.log(`Versioned ${Object.keys(versions).length} images; ${Object.keys(delivery).length} responsive static deliveries: ${(before/1048576).toFixed(2)} MiB → ${(after/1048576).toFixed(2)} MiB. Originals unchanged.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
