import fs from 'fs';

for (let i = 1; i <= 6; i++) {
  const content = fs.readFileSync(`pptx_extracted/ppt/slides/slide${i}.xml`, 'utf8');
  console.log(`\n================== SLIDE ${i} SHAPES ==================`);
  const shapeMatches = content.match(/<p:sp>[\s\S]*?<\/p:sp>/g) || [];
  shapeMatches.forEach((shape, idx) => {
    const text = (shape.match(/<a:t>([^<]+)<\/a:t>/g) || []).map(t => t.replace(/<\/?a:t>/g, '')).join(' ');
    if (text.trim()) {
      console.log(`Shape ${idx + 1}: ${text}`);
    }
  });
}
