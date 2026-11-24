(() => {
  'use strict';
  const config = window.PAYVITY_PREVIEW_CONFIG;
  const video = document.querySelector('#film');
  const journey = document.querySelector('#journey');
  const scrubber = document.querySelector('#scrubber');
  const clock = document.querySelector('#clock');
  const closing = document.querySelector('#closing');
  const gap = document.querySelector('#gap-label');
  const diagnostics = document.querySelector('#diagnostics');
  const formatInput = document.querySelector('#format');
  const distanceInput = document.querySelector('#distance');
  const reduceInput = document.querySelector('#reduce');
  const mobileQuery = matchMedia(`(max-width:${config.mobileBreakpoint}px)`);
  const motionQuery = matchMedia('(prefers-reduced-motion:reduce)');
  const params = new URLSearchParams(location.search);
  const chapters = [[0,'Ankommen und begrüßen'],[6.875,'App öffnen'],[8.875,'Abholcode zeigen'],[11.708333,'Abholcode scannen'],[13.708333,'Abholcode bestätigt'],[15.041667,'Ein kurzer Moment'],[16.458333,'Paket holen und scannen'],[19.25,'Paket scannen'],[21.25,'Abholung bestätigt'],[23,'Paket übernehmen und verabschieden'],[26.5,'Ausgangsaufnahme ausstehend']];
  let target = 0, smooth = 0, previousTick = 0, frame = 0;
  let requested = 0, completed = 0, seekStarted = 0;
  let worstSeekMs = 0, totalSeekMs = 0, manualDistance = false;
  let sourceVersion = 0, manualReduction = params.get('motion') === 'reduce';
  const chosen = params.get('format');
  if (chosen === 'webm') formatInput.value = chosen;
  const initialDistance = Number(params.get('distance'));
  if (initialDistance >= 200 && initialDistance <= 1200) {
    manualDistance = true;
    distanceInput.value = initialDistance;
  }
  document.querySelector('#story-cta').setAttribute('href', config.ctaHref);
  function setDistance() {
    if (!manualDistance) distanceInput.value = mobileQuery.matches ? config.mobileScrollVh : config.desktopScrollVh;
    const value = Math.min(1200, Math.max(200, Number(distanceInput.value) || config.desktopScrollVh));
    distanceInput.value = value;
    journey.style.setProperty('--scroll-distance', value);
  }
  function isReduced() { return manualReduction || motionQuery.matches; }
  function showPosition(t) {
    scrubber.value = t;
    scrubber.setAttribute('aria-valuetext', `${t.toFixed(1)} von 30 Sekunden`);
    clock.value = `${t.toFixed(1).padStart(4,'0').replace('.',',')} / 30,0`;
    document.querySelector('#chapter').textContent = [...chapters].reverse().find(([start]) => t >= start)[1];
    const alpha = isReduced() ? 0 : Math.min(1, Math.max(0, (t-26.5)/0.7));
    closing.style.opacity = alpha;
    const active = alpha > 0.95;
    closing.classList.toggle('active', active);
    closing.inert = !active;
    closing.setAttribute('aria-hidden', String(!active));
    gap.hidden = t < config.missingExitStart || isReduced();
  }
  function tick(now) {
    frame = 0;
    if (isReduced() || document.hidden) return;
    const dt = Math.min(0.05, (now-previousTick)/1000 || 1/60);
    previousTick = now;
    smooth += (target-smooth)*(1-Math.exp(-dt/config.smoothingSeconds));
    if (Math.abs(target-smooth)<1/96) smooth=target;
    const duration = Number.isFinite(video.duration) ? video.duration : config.duration;
    const time = Math.min(smooth,Math.max(0,duration-1/config.fps));
    // Coalesce seeks: only one in flight; the latest scroll target always wins.
    if (video.readyState>=1 && !video.seeking && Math.abs(video.currentTime-time)>1/48) {
      seekStarted = performance.now();
      requested++;
      video.currentTime=time;
    }
    showPosition(smooth);
    if (Math.abs(target-smooth)>1/96 || video.seeking || Math.abs(video.currentTime-time)>1/48) schedule();
  }
  function schedule() { if (!frame) frame=requestAnimationFrame(tick); }
  function fromScroll() {
    if (isReduced()) return;
    const rect=journey.getBoundingClientRect();
    const distance=Math.max(1,journey.offsetHeight-innerHeight);
    target=Math.min(1,Math.max(0,-rect.top/distance))*config.duration;
    schedule();
  }
  function setReduction() {
    document.body.classList.toggle('reduced',isReduced());
    reduceInput.checked=isReduced();
    if (isReduced()) {
      if(frame)cancelAnimationFrame(frame);
      frame=0; target=0; smooth=0;
      if(video.readyState>=1)video.currentTime=0;
      showPosition(0);
    } else fromScroll();
  }
  function loadMedia() {
    const version=++sourceVersion;
    const tag=mobileQuery.matches?'mobile':'desktop';
    const extension=formatInput.value;
    video.poster=`../renders/payvity-${tag}-poster.jpg`;
    document.querySelector('#reduced-poster').src=video.poster;
    video.src=`../renders/payvity-${tag}-web.${extension}`;
    document.querySelector('#media-error').hidden=true;
    video.load();
    diagnostics.textContent=`${tag} · ${extension.toUpperCase()} · 24 fps · Laden …`;
    video.onloadedmetadata=()=>{
      if(version!==sourceVersion)return;
      diagnostics.textContent=`${tag} · ${extension.toUpperCase()} · ${video.videoWidth} × ${video.videoHeight} · ${video.duration.toFixed(2)} s · 24 fps`;
      if (isReduced()) video.currentTime=0; else {smooth=target; schedule();}
    };
  }
  video.addEventListener('seeked',()=>{
    const elapsed=performance.now()-seekStarted;
    if(seekStarted){completed++;totalSeekMs+=elapsed;worstSeekMs=Math.max(worstSeekMs,elapsed);seekStarted=0;}
    schedule();
  });
  video.addEventListener('error',()=>{document.querySelector('#media-error').hidden=false; diagnostics.textContent='Videodatei nicht verfügbar.';});
  scrubber.addEventListener('input',()=>{
    if(isReduced())return;
    const progress=Number(scrubber.value)/config.duration;
    const start=scrollY+journey.getBoundingClientRect().top;
    const distance=Math.max(1,journey.offsetHeight-innerHeight);
    target=progress*config.duration;
    scrollTo({top:start+distance*progress,behavior:'instant'});
    schedule();
  });
  distanceInput.addEventListener('change',()=>{manualDistance=true;setDistance();fromScroll();});
  formatInput.addEventListener('change',loadMedia);
  reduceInput.addEventListener('change',()=>{manualReduction=reduceInput.checked;setReduction();});
  motionQuery.addEventListener('change',setReduction);
  mobileQuery.addEventListener('change',()=>{setDistance();loadMedia();fromScroll();});
  addEventListener('resize',fromScroll,{passive:true});
  addEventListener('scroll',fromScroll,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)fromScroll();});
  // Read-only QA values; no autoplay or film-timeline wall clock.
  window.payvityDiagnostics=()=>({target,smooth,currentTime:video.currentTime,seeking:video.seeking,requested,completed,meanSeekMs:completed?totalSeekMs/completed:0,worstSeekMs,reduced:isReduced(),duration:video.duration,source:video.currentSrc,scrollDistanceVh:Number(distanceInput.value)});
  setDistance();loadMedia();setReduction();fromScroll();
})();
