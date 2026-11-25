import puppeteer from 'file:///C:/Users/srivi/AppData/Local/npm-cache/_npx/702923228c2ce1e6/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const browser=await puppeteer.launch({executablePath:'C:/Users/srivi/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',headless:true});
try{
  const page=await browser.newPage();
  await page.goto('http://127.0.0.1:4173/studio/index.html',{waitUntil:'domcontentloaded'});
  const map=await page.evaluate(()=>{
    const tl=window.__timelines['payvity-desktop'];
    const clips=[...document.querySelectorAll('.scene')].map(el=>({id:el.id,start:Number(el.dataset.start),duration:Number(el.dataset.duration),kind:el.tagName,source:el.getAttribute('src')}));
    const tweens=tl.getChildren(false,true,false).map(t=>({targets:t.targets().map(el=>el.id),start:t.startTime(),duration:t.duration(),properties:Object.keys(t.vars).filter(k=>!['duration','ease','immediateRender','parent','overwrite','delay','runBackwards'].includes(k))}));
    return {paused:tl.paused(),rootDuration:Number(document.querySelector('#root').dataset.duration),fps:Number(document.querySelector('#root').dataset.fps),clips,tweens};
  });
  if(!map.paused||map.rootDuration!==30||map.fps!==24||map.tweens.length!==11)throw new Error('Timeline contract mismatch');
  if(map.tweens.some(t=>t.properties.some(p=>p!=='opacity')||t.duration!==0.125))throw new Error('Unexpected motion or duration');
  map.review={transition:'Three-frame opacity crossfades only; no image translations, scaling or artificial human motion.',knownGap:'26.5–30 seconds intentionally black; missing physical exit.',holds:'Original screenshot inserts and real human source motion. No decorative ambient animation.'};
  await writeFile(fileURLToPath(new URL('./review/animation-map.json',import.meta.url)),JSON.stringify(map,null,2));
  console.log(JSON.stringify({paused:map.paused,rootDuration:map.rootDuration,registeredTweens:map.tweens.length,properties:'opacity only'}));
}finally{await browser.close();}
