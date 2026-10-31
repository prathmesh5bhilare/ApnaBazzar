import fs from 'fs';

for (let i = 1; i <= 7; i++) {
  const file = `pptx_extracted/ppt/slides/slide${i}.xml`;
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const texts = content.match(/<a:t>([^<]+)<\/a:t>/g)?.map(t => t.replace(/<\/?a:t>/g, '')) || [];
    console.log(`=== SLIDE ${i} ===`);
    console.log(texts.join(' '));
  }
}
