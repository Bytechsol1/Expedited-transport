const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'frames');
const frames2Dir = path.join(__dirname, 'public', 'frames2');
const videosDir = path.join(__dirname, 'public', 'videos');

[framesDir, frames2Dir, videosDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// A tiny 1x1 base64 encoded JPG
const jpgBase64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';
const jpgBuffer = Buffer.from(jpgBase64, 'base64');

// Create dummy frames
for (let i = 0; i <= 240; i++) {
  const pad = String(i).padStart(5, '0');
  fs.writeFileSync(path.join(framesDir, `frame_${pad}.jpg`), jpgBuffer);
  fs.writeFileSync(path.join(frames2Dir, `frame_${pad}.jpg`), jpgBuffer);
}

// A tiny valid mp4 base64 encoded (very small placeholder)
const mp4Base64 = 'AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAALNtZGF0AAACrgYF//+//7xgADgAAAAMAAABwgALAAAAAAAAAAAAAAAATrM4F725+cAA/4/QAAAB6G1vb3YAAABsbXZoZAAAAADR7ZAB0e2QAQAAAAEAAAEAAAEAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAADh0cmFrAAAAXHRraGQAAAAD0e2QAdHtkAEAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAQAAAAEAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAAEAAAAAAQAAAAAABAAAADxtZGlhAAAAIG1kaGQAAAAA0e2QAdHtkAEAAAAAAQAAAAEAAAAAAAAAA1oAAABNaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAAAeG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAFRzdGJsAAAANHN0c2QAAAAAAAAAAQAAACRhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAQAAAAAAAAAAAAAAAABzdHRzAAAAAAAAAAEAAAABAAAAAQAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzejAAAAAAAAAAAAAAAQAAABRzdGNvAAAAAAAAAAEAAAA4AAAAFHN0c3MAAAAAAAAAAQAAAAE=';
const mp4Buffer = Buffer.from(mp4Base64, 'base64');

// Create dummy videos
for (let i = 1; i <= 6; i++) {
  fs.writeFileSync(path.join(videosDir, `feature-${i}.mp4`), mp4Buffer);
}

console.log("Dummy assets generated successfully!");
