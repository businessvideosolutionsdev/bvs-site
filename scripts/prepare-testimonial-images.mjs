// Conventional color correction and resampling only. Never regenerate faces.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const names = ['daydream', 'bumblebee', 'blackwater', 'fairfield', 'i9', 'wow-wraps', 'courtesy', 'creature', 'tsb', 'southern-diesel-supply', 'imold'];
for (const name of names) {
  const source = `public/assets/testimonials/${name}-original.png`;
  // Lift midtones gently; already sunny footage needs less correction.
  const brightness = ['blackwater', 'fairfield', 'i9'].includes(name) ? 1.035 : 1.07;
  await sharp(source)
    .resize({ width: 1200, kernel: 'lanczos3' })
    .gamma(1.1)
    .modulate({ brightness, saturation: 1.025 })
    .sharpen({ sigma: 0.5, m1: 0.35, m2: 0.7 })
    .webp({ quality: 93, effort: 6 })
    .toFile(`public/assets/testimonials/${name}-adjusted.webp`);
}
for (const file of ['content/testimonials.json', 'content/blog.json', 'templates/home.html']) {
  let text = await readFile(file, 'utf8');
  for (const name of names) text = text.replaceAll(`/assets/testimonials/${name}-original.png`, `/assets/testimonials/${name}-adjusted.webp`);
  await writeFile(file, text);
}
console.log('Prepared 11 color-corrected thumbnails; original images retained unchanged.');
