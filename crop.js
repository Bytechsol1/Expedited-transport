const sharp = require('sharp');
const path = 'C:/Users/HIJAZ TR/.gemini/antigravity/brain/6f468d6e-373f-43f7-97e7-6bca10a24f1a';

async function run() {
  // Image 02
  await sharp(`${path}/media__1786400271180.png`)
    .extract({ left: 0, top: 430, width: 623, height: 350 })
    .jpeg({ quality: 90 })
    .toFile('public/images/ltl-accordion-2-final.jpg');

  // Image 03
  await sharp(`${path}/media__1786400287438.jpg`)
    .extract({ left: 0, top: 35, width: 641, height: 370 })
    .jpeg({ quality: 90 })
    .toFile('public/images/ltl-accordion-3-final.jpg');

  // Image 04
  await sharp(`${path}/media__1786400287438.jpg`)
    .extract({ left: 0, top: 450, width: 641, height: 370 })
    .jpeg({ quality: 90 })
    .toFile('public/images/ltl-accordion-4-final.jpg');

  // Image 05
  await sharp(`${path}/media__1786400300436.png`)
    .extract({ left: 0, top: 35, width: 639, height: 360 })
    .jpeg({ quality: 90 })
    .toFile('public/images/ltl-accordion-5-final.jpg');

  // Image 06
  await sharp(`${path}/media__1786400300436.png`)
    .extract({ left: 0, top: 445, width: 639, height: 360 })
    .jpeg({ quality: 90 })
    .toFile('public/images/ltl-accordion-6-final.jpg');
    
  console.log("Extraction complete.");
}
run();
