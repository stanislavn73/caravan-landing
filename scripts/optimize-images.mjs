import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join, parse } from "path";

const IMAGES_DIR = "public/images";
const FULL_RES_DIR = "public/images/full-res";

// Images that need full-res versions (trailer + config product images)
const FULL_RES_IMAGES = [
  "trailer-wide",
  "trailer-offroad",
  "config-base",
  "config-mid",
  "config-performance",
];

// Display image max width
const DISPLAY_MAX_WIDTH = 1200;
// Full-res max width (for magnifier/large screens)
const FULL_RES_MAX_WIDTH = 3000;
// Background images max width
const BG_MAX_WIDTH = 1920;

async function generateBlurDataURL(inputPath) {
  const buffer = await sharp(inputPath)
    .resize(20, null, { withoutEnlargement: true })
    .webp({ quality: 20 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function optimizeImage(inputPath, outputPath, maxWidth, quality = 75) {
  const metadata = await sharp(inputPath).metadata();
  const width = Math.min(metadata.width || maxWidth, maxWidth);

  await sharp(inputPath)
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath);

  return outputPath;
}

async function main() {
  const blurDataURLs = {};

  // Get all jpg/png images (excluding hash-named files and temp files)
  const files = await readdir(IMAGES_DIR);
  const imageFiles = files.filter(
    (f) =>
      /\.(jpg|jpeg|png)$/i.test(f) &&
      !f.startsWith("~") &&
      f.length < 60 // skip hash-named files
  );

  console.log("Processing images:", imageFiles);

  for (const file of imageFiles) {
    const { name } = parse(file);
    const inputPath = join(IMAGES_DIR, file);

    // Determine if this is a background image
    const isBg = name.includes("bg") || name.includes("hero");
    const isLogo = name.includes("logo");
    const needsFullRes = FULL_RES_IMAGES.includes(name);

    if (isLogo) {
      // Logos: just convert to webp, keep original size
      const outputPath = join(IMAGES_DIR, `${name}.webp`);
      await sharp(inputPath)
        .resize(500, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`  Logo: ${file} -> ${name}.webp`);
      continue;
    }

    // Create display version
    const displayWidth = isBg ? BG_MAX_WIDTH : DISPLAY_MAX_WIDTH;
    const displayPath = join(IMAGES_DIR, `${name}.webp`);
    await optimizeImage(inputPath, displayPath, displayWidth, isBg ? 70 : 75);
    console.log(`  Display: ${file} -> ${name}.webp`);

    // Create full-res version for product images
    if (needsFullRes) {
      const fullResPath = join(FULL_RES_DIR, `${name}.webp`);
      await optimizeImage(inputPath, fullResPath, FULL_RES_MAX_WIDTH, 85);
      console.log(`  Full-res: ${file} -> full-res/${name}.webp`);
    }

    // Generate blur placeholder
    const blurDataURL = await generateBlurDataURL(inputPath);
    blurDataURLs[name] = blurDataURL;
    console.log(`  Blur: ${name} (${blurDataURL.length} chars)`);
  }

  // Output blur data URLs as a TypeScript module
  const tsContent = `// Auto-generated blur placeholders - do not edit manually
// Run: node scripts/optimize-images.mjs to regenerate

export const blurDataURLs: Record<string, string> = ${JSON.stringify(blurDataURLs, null, 2)};
`;

  const { writeFile } = await import("fs/promises");
  await writeFile("lib/blur-data-urls.ts", tsContent);
  console.log("\nBlur data URLs written to lib/blur-data-urls.ts");

  // Print size comparison
  console.log("\n--- Size comparison ---");
  for (const file of imageFiles) {
    const { name } = parse(file);
    const isLogo = name.includes("logo");
    if (isLogo) continue;

    const inputPath = join(IMAGES_DIR, file);
    const webpPath = join(IMAGES_DIR, `${name}.webp`);
    try {
      const origMeta = await sharp(inputPath).metadata();
      const webpMeta = await sharp(webpPath).metadata();
      const origSize = (await import("fs")).statSync(inputPath).size;
      const webpSize = (await import("fs")).statSync(webpPath).size;
      console.log(
        `  ${name}: ${(origSize / 1024).toFixed(0)}KB -> ${(webpSize / 1024).toFixed(0)}KB (${((1 - webpSize / origSize) * 100).toFixed(0)}% reduction)`
      );
    } catch {
      // skip
    }
  }
}

main().catch(console.error);
