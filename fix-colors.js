
const fs = require('fs');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = require('path').join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('e:/Expedited-transport/src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('#0a0f00')) { content = content.replace(/#0a0f00/g, '#ffffff'); changed = true; }
  if (content.includes('#0a1628')) { content = content.replace(/#0a1628/g, '#ffffff'); changed = true; }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
});

