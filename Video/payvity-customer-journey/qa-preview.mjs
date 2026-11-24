import puppeteer from 'file:///C:/Users/srivi/AppData/Local/npm-cache/_npx/702923228c2ce1e6/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import {writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const review=path.join(root,'review');
await mkdir(review,{recursive:true});
const browser=await puppeteer.launch({executablePath:'C:/Users/srivi/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',headless:true});
const report={cases:[],passed:false};
try{
  for(const mobile of [false,true]){
    for(const format of ['mp4','webm']){
      const page=await browser.newPage();
      await page.setViewport(mobile?{width:390,height:844,isMobile:true,deviceScaleFactor:1}:{width:1440,height:1000,deviceScaleFactor:1});
      const errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(`${r.status()} ${r.url()}`);});
      await page.goto(`http://127.0.0.1:4173/preview/?format=${format}`,{waitUntil:'networkidle0'});
      await page.waitForFunction(()=>document.querySelector('#film').readyState>=2,{timeout:30000});
      const seekResults=[];
      for(const time of [0.4,24.5,7.5,20,12.5,26.2,4,22,10,28,0.4]){
        const start=performance.now();
        await page.evaluate(t=>{
          const section=document.querySelector('#journey');
          const y=scrollY+section.getBoundingClientRect().top;
          scrollTo(0,y+(section.offsetHeight-innerHeight)*(t/30));
        },time);
        await page.waitForFunction(t=>{const d=window.payvityDiagnostics();return !d.seeking&&Math.abs(d.currentTime-t)<0.065;},{timeout:15000},time);
        const values=await page.evaluate(()=>window.payvityDiagnostics());
        seekResults.push({requestedTime:time,actualTime:values.currentTime,settleMs:performance.now()-start});
        if(format==='mp4'&&time===24.5)await page.screenshot({path:path.join(review,`${mobile?'mobile':'desktop'}-handover.png`)});
        if(format==='mp4'&&time===7.5)await page.screenshot({path:path.join(review,`${mobile?'mobile':'desktop'}-app-screen.png`)});
        if(format==='mp4'&&time===28){
          const cta=await page.$eval('#story-cta',el=>({inert:el.closest('[inert]')!==null,href:el.getAttribute('href'),label:el.textContent.trim()}));
          if(cta.inert||cta.href!=='#kontakt')throw new Error('Closing CTA is inaccessible');
          await page.click('#story-cta');
          if(!page.url().endsWith('#kontakt'))throw new Error('Native CTA anchor did not navigate');
        }
      }
      const details=await page.evaluate(()=>{
        const d=window.payvityDiagnostics();
        return {...d,overflow:document.documentElement.scrollWidth>innerWidth,paused:document.querySelector('#film').paused};
      });
      if(details.overflow||!details.paused||Math.abs(details.duration-30)>0.05)throw new Error('Layout, autoplay or duration check failed');
      const expectedDistance=mobile?350:400;
      if(details.scrollDistanceVh!==expectedDistance)throw new Error('Wrong default scroll distance');
      // Exercise the actual reviewer distance control, rather than only its config.
      await page.$eval('.review-settings',el=>el.open=true);
      await page.$eval('#distance',el=>{el.value='500';el.dispatchEvent(new Event('change'));});
      if((await page.evaluate(()=>window.payvityDiagnostics())).scrollDistanceVh!==500)throw new Error('Distance control did not apply');
      if(format==='mp4'){
        await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
        await page.waitForFunction(()=>document.body.classList.contains('reduced'));
        const reduced=await page.evaluate(()=>({pinned:getComputedStyle(document.querySelector('.pinned')).position,summary:getComputedStyle(document.querySelector('.reduced-summary')).display,poster:getComputedStyle(document.querySelector('#reduced-poster')).display,paused:document.querySelector('#film').paused}));
        if(reduced.pinned==='sticky'||reduced.summary==='none'||reduced.poster==='none'||!reduced.paused)throw new Error('Reduced motion fallback failed');
        await page.screenshot({path:path.join(review,`${mobile?'mobile':'desktop'}-reduced-motion.png`),fullPage:true});
      }
      if(errors.length)throw new Error(errors.join('\n'));
      report.cases.push({mobile,format,seekResults,details,errors,passed:true});
      await page.close();
    }
  }
  report.passed=true;
}finally{
  await browser.close();
  await writeFile(path.join(review,'browser-qa.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report));
}
