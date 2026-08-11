const sharp = require('sharp');
const fs = require('fs');

async function removeBg(inputPath, outputPath) {
  try {
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // If the pixel is very close to white, make it transparent
      if (r > 240 && g > 240 && b > 240) {
        data[i + 3] = 0; // alpha = 0
      }
    }
    
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);
    
    console.log('Background removed successfully');
  } catch (err) {
    console.error(err);
  }
}

removeBg('C:/Users/HIJAZ TR/.gemini/antigravity/brain/6f468d6e-373f-43f7-97e7-6bca10a24f1a/local_truck_clean_1786471115975.png', 'public/images/local-trucking-hero-v3.png');
