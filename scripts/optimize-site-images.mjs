// Conventional resizing and WebP compression only. Source photos remain unchanged.
import sharp from 'sharp';

const derivatives = [
  ['public/assets/behind-the-scenes/on-location-team.webp', 'public/assets/behind-the-scenes/on-location-team-optimized.webp', 1000, 70],
  ['public/assets/behind-the-scenes/prodips-shoot-original.jpg', 'public/assets/behind-the-scenes/prodips-shoot.webp', 750, 65],
  ['public/assets/behind-the-scenes/fairfield-interview-original.jpg', 'public/assets/behind-the-scenes/fairfield-interview.webp', 560, 55],
  ['public/assets/blog/florida-homeowner-filming.webp', 'public/assets/blog/florida-homeowner-filming-optimized.webp', 900, 60],
  ['public/assets/team.jpg', 'public/assets/team.webp', 1024, 78],
];

for (const [source, destination, width, quality] of derivatives) {
  await sharp(source)
    .resize({ width, withoutEnlargement: true, kernel: 'lanczos3' })
    .webp({ quality, effort: 6 })
    .toFile(destination);
}

console.log(`Prepared ${derivatives.length} optimized derivatives; source photos retained unchanged.`);
