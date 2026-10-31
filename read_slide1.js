import fs from 'fs';

console.log('=== SLIDE 1 XML ===');
console.log(fs.readFileSync('pptx_extracted/ppt/slides/slide1.xml', 'utf8'));
