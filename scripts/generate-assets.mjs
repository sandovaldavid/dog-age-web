import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// Symmetrical, anatomically accurate canine paw vector
// 4 digital pads (toes) arranged in an arc above the metacarpal pad
const PAW_PATH = `
  <ellipse cx="17" cy="24" rx="4.8" ry="7.2" transform="rotate(-28 17 24)" />
  <ellipse cx="26" cy="16" rx="5.2" ry="7.8" transform="rotate(-8 26 16)" />
  <ellipse cx="38" cy="16" rx="5.2" ry="7.8" transform="rotate(8 38 16)" />
  <ellipse cx="47" cy="24" rx="4.8" ry="7.2" transform="rotate(28 47 24)" />
  <path d="M 32 30 C 38 30, 48 35, 48 42 C 48 48.5, 42.5 53, 37.5 53 C 34.5 53, 33.2 51.5, 32 51.5 C 30.8 51.5, 29.5 53, 26.5 53 C 21.5 53, 16 48.5, 16 42 C 16 35, 26 30, 32 30 Z" />
`;

// 1. Generate public/favicon.svg with dynamic dark mode support
const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <style>
    path, ellipse {
      fill: #ea580c;
    }
    @media (prefers-color-scheme: dark) {
      path, ellipse {
        fill: #fb923c;
      }
    }
  </style>
  ${PAW_PATH}
</svg>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), faviconSvg.trim(), 'utf8');

// Function to generate standard paw SVG on transparent background
function getRawPawSvg(fillColor = '#ea580c') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="${fillColor}">
    ${PAW_PATH}
  </svg>`;
}

// Function to generate app icon with warm ivory background and padding
function getAppIconSvg(size, fillColor = '#ea580c', bgColor = '#fff8f2') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${bgColor}" />
    <g transform="translate(${size * 0.15}, ${size * 0.15}) scale(${size * 0.7 / 64})" fill="${fillColor}">
      ${PAW_PATH}
    </g>
  </svg>`;
}

// Helper to assemble PNGs into an ICO file
function pngBuffersToIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon type (1 = icon)
  header.writeUInt16LE(numImages, 4); // count

  const dirEntries = [];
  let currentOffset = 6 + numImages * 16;

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset
    dirEntries.push(entry);
    currentOffset += item.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((p) => p.buffer)]);
}

async function main() {
  console.log('Generating favicon icons...');

  // 16x16 PNG
  const p16 = await sharp(Buffer.from(getRawPawSvg('#ea580c')))
    .resize(16, 16)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-16x16.png'), p16);

  // 32x32 PNG
  const p32 = await sharp(Buffer.from(getRawPawSvg('#ea580c')))
    .resize(32, 32)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), p32);

  // 48x48 PNG
  const p48 = await sharp(Buffer.from(getRawPawSvg('#ea580c')))
    .resize(48, 48)
    .png()
    .toBuffer();

  // favicon.ico containing 16, 32, 48
  const icoBuffer = pngBuffersToIco([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);

  // apple-touch-icon.png (180x180)
  const appleTouch = await sharp(Buffer.from(getAppIconSvg(180, '#ea580c', '#fff8f2')))
    .resize(180, 180)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), appleTouch);

  // icon-192.png
  const icon192 = await sharp(Buffer.from(getAppIconSvg(192, '#ea580c', '#fff8f2')))
    .resize(192, 192)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-192.png'), icon192);

  // icon-512.png
  const icon512 = await sharp(Buffer.from(getAppIconSvg(512, '#ea580c', '#fff8f2')))
    .resize(512, 512)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-512.png'), icon512);

  // site.webmanifest
  const webmanifest = {
    name: 'Dog Age in Human Years',
    short_name: 'Dog Age',
    description: 'Calculate dog age in human years with the Wang et al. (2020) epigenetic formula.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff8f2',
    theme_color: '#ea580c',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'site.webmanifest'),
    JSON.stringify(webmanifest, null, 2),
    'utf8'
  );

  console.log('Generating OpenGraph 1200x630 cards...');

  function makeOgSvg({ title, subtitle, formula, example, cite }) {
    return `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff8f2" />
          <stop offset="55%" stop-color="#fff2e6" />
          <stop offset="100%" stop-color="#ffe6d1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bgGrad)" />

      <!-- Top decorative accent -->
      <rect x="0" y="0" width="1200" height="8" fill="#ea580c" />

      <!-- Main Content Card -->
      <rect x="60" y="46" width="1080" height="538" rx="24" fill="#ffffff" stroke="#f0dfce" stroke-width="2" />

      <!-- Badge -->
      <rect x="110" y="92" width="360" height="36" rx="18" fill="#ffedd5" />
      <text x="290" y="115" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="700" fill="#c2410c" text-anchor="middle" letter-spacing="1">CELL SYSTEMS • WANG ET AL. 2020</text>

      <!-- Title -->
      <text x="110" y="185" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="46" font-weight="800" fill="#3d2c1e">${title}</text>

      <!-- Subtitle -->
      <text x="110" y="235" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="500" fill="#7a604d">${subtitle}</text>

      <!-- Formula Box -->
      <rect x="110" y="275" width="620" height="70" rx="14" fill="#fff8f2" stroke="#ea580c" stroke-width="2" />
      <text x="140" y="319" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="24" font-weight="700" fill="#c2410c">${formula}</text>

      <!-- Comparative Milestones Bar -->
      <g transform="translate(110, 375)">
        <rect x="0" y="0" width="195" height="68" rx="12" fill="#fff8f2" stroke="#f0dfce" stroke-width="1.5" />
        <text x="97" y="26" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="600" fill="#7a604d" text-anchor="middle">${example.p1Label}</text>
        <text x="97" y="52" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="19" font-weight="800" fill="#3d2c1e" text-anchor="middle">${example.p1Val}</text>

        <rect x="212" y="0" width="195" height="68" rx="12" fill="#fff8f2" stroke="#f0dfce" stroke-width="1.5" />
        <text x="309" y="26" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="600" fill="#7a604d" text-anchor="middle">${example.p2Label}</text>
        <text x="309" y="52" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="19" font-weight="800" fill="#3d2c1e" text-anchor="middle">${example.p2Val}</text>

        <rect x="424" y="0" width="195" height="68" rx="12" fill="#fff8f2" stroke="#f0dfce" stroke-width="1.5" />
        <text x="521" y="26" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="600" fill="#7a604d" text-anchor="middle">${example.p3Label}</text>
        <text x="521" y="52" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="19" font-weight="800" fill="#3d2c1e" text-anchor="middle">${example.p3Val}</text>
      </g>

      <!-- Symmetrical Paw Illustration on Right -->
      <g transform="translate(800, 160) scale(4.8)" opacity="0.92" fill="#ea580c">
        ${PAW_PATH}
      </g>

      <!-- Footer attribution line -->
      <line x1="110" y1="480" x2="1030" y2="480" stroke="#f0dfce" stroke-width="1" />
      <text x="110" y="515" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="600" fill="#7a604d">${cite}</text>
      <text x="1030" y="515" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="700" fill="#c2410c" text-anchor="end">dog-age.sandovaldavid.com</text>
    </svg>
    `;
  }

  // Generate EN OpenGraph
  const enSvg = makeOgSvg({
    title: 'Dog Age in Human Years',
    subtitle: 'Forget “×7”. Science-based epigenetic formula for dog aging.',
    formula: 'human_age = 16 · ln(dog_age) + 31',
    example: {
      p1Label: '1 Dog Year',
      p1Val: '~31 Human Years',
      p2Label: '4 Dog Years',
      p2Val: '~53 Human Years',
      p3Label: '8 Dog Years',
      p3Val: '~64 Human Years',
    },
    cite: 'Educational open-source tool based on Wang et al. (Cell Systems 2020) • By David Sandoval',
  });
  const ogEn = await sharp(Buffer.from(enSvg)).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'og-image-en.png'), ogEn);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'og-image.png'), ogEn); // Default fallback

  // Generate ES OpenGraph
  const esSvg = makeOgSvg({
    title: 'Edad canina en años humanos',
    subtitle: 'Olvida el “×7”. Fórmula epigenética con base científica.',
    formula: 'edad_humana = 16 · ln(edad_perro) + 31',
    example: {
      p1Label: '1 Año canino',
      p1Val: '~31 Años humanos',
      p2Label: '4 Años caninos',
      p2Val: '~53 Años humanos',
      p3Label: '8 Años caninos',
      p3Val: '~64 Años humanos',
    },
    cite: 'Herramienta educativa de código abierto basada en Wang et al. (2020) • Por David Sandoval',
  });
  const ogEs = await sharp(Buffer.from(esSvg)).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'og-image-es.png'), ogEs);

  console.log('All icons and OpenGraph cards generated successfully in public/!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
