import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join } from "path";

const DIRS = ["public/frames", "public/frames2"];
const QUALITY = 92;

for (const dir of DIRS) {
  const files = (await readdir(dir)).filter(f => f.endsWith(".jpg"));
  console.log(`Converting ${files.length} files in ${dir}...`);
  let done = 0;
  await Promise.all(
    files.map(async file => {
      const src  = join(dir, file);
      const dest = join(dir, file.replace(".jpg", ".webp"));
      await sharp(src).webp({ quality: QUALITY }).toFile(dest);
      await unlink(src);
      done++;
      if (done % 50 === 0) console.log(`  ${dir}: ${done}/${files.length}`);
    })
  );
  console.log(`  Done: ${dir}`);
}
console.log("All done.");
