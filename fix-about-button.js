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
      if (file.endsWith('.tsx')) {
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

  if (content.includes('backgroundColor: "#E31E24", color: "#000000"')) {
    content = content.replace(/backgroundColor: "#E31E24", color: "#000000"/g, 'backgroundColor: "#E31E24", color: "#ffffff"');
    changed = true;
  }
  
  const pattern1 = /display: "flex", alignItems: "center", justifyContent: "space-between",\s*padding: "24px 40px", backgroundColor/g;
  if (pattern1.test(content)) {
    content = content.replace(pattern1, 'display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px",\n                    padding: "24px 40px", backgroundColor');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
});
