import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fullHtml = fs.readFileSync('official_submission.html', 'utf8');

// Extract each section
const slides = fullHtml.match(/<section class="slide">[\s\S]*?<\/section>/g);
if (slides) {
  const headMatch = fullHtml.match(/<head>[\s\S]*?<\/head>/)[0];
  slides.forEach((slideHtml, idx) => {
    const singleHtml = `<!DOCTYPE html><html>${headMatch}<body style="width:16in; height:9in; margin:0; padding:0; overflow:hidden;">${slideHtml}</body></html>`;
    const singleFile = path.resolve(`slide_${idx + 1}.html`);
    fs.writeFileSync(singleFile, singleHtml);
    const pngPath = path.resolve(`slide_${idx + 1}.png`);
    try {
      execSync(`"${chromePath}" --headless=new --no-sandbox --disable-gpu --window-size=1920,1080 --screenshot="${pngPath}" "file:///${singleFile.replace(/\\/g, '/')}"`);
      console.log(`Rendered slide_${idx + 1}.png (${fs.statSync(pngPath).size} bytes)`);
    } catch (e) {
      console.error(`Failed slide ${idx + 1}:`, e);
    }
  });
}
