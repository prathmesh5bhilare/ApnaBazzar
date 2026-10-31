import fs from 'fs';

for (let i = 1; i <= 7; i++) {
  const relFile = `pptx_extracted/ppt/slides/_rels/slide${i}.xml.rels`;
  if (fs.existsSync(relFile)) {
    console.log(`Slide ${i} rels:`, fs.readFileSync(relFile, 'utf8'));
  }
}
