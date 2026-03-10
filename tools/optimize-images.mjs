import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'assets', 'images');
fs.mkdirSync(outDir, { recursive: true });

const jobs = [
  { src: 'berita1.png', out: 'berita1_thumb.webp', w: 140, h: 140 },
  { src: 'berita2.png', out: 'berita2_thumb.webp', w: 140, h: 140 },
  { src: 'video1.png', out: 'video1_slider.webp', w: 1280, h: Math.round(1280 * 9 / 16) },
  { src: 'video2.png', out: 'video2_slider.webp', w: 1280, h: Math.round(1280 * 9 / 16) },
];

async function run() {
  for (const job of jobs) {
    const srcPath = path.join(process.cwd(), job.src);
    const outPath = path.join(outDir, job.out);
    try {
      await sharp(srcPath)
        .resize(job.w, job.h, { fit: 'cover' })
        .webp({ quality: 75 })
        .toFile(outPath);
      console.log('OK', outPath);
    } catch (e) {
      console.error('FAIL', job.src, e.message);
    }
  }
}
run();
