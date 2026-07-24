const { Jimp } = require('jimp');

async function removeBackground() {
  const image = await Jimp.read('public/images/truck-cutout-new.png');
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // If pixel is very close to white, make it transparent
    if (r > 245 && g > 245 && b > 245) {
      this.bitmap.data[idx + 3] = 0; // Set alpha to 0
    }
  });

  await image.write('public/images/truck-cutout-transparent.png');
  console.log('Done!');
}

removeBackground().catch(console.error);
