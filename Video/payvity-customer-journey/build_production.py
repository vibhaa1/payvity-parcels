"""Rebuild the editable composition and native-24-fps review exports.

The final 3.5 seconds are deliberately black: the exit continuation is missing.
No generated footage, motion interpolation, or recreated app screens are used.
"""
from pathlib import Path
import argparse, json, shutil, subprocess

ROOT = Path(__file__).resolve().parent
STUDIO = ROOT / 'studio'
FFMPEG = Path(r'C:\Users\srivi\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.1-full_build\bin\ffmpeg.exe')
GSAP = Path(r'C:\Users\srivi\AppData\Local\npm-cache\_npx\702923228c2ce1e6\node_modules\hyperframes\dist\vendor\npm\gsap@3.15.0\dist\gsap.min.js')
FPS = 24
# Source in/out and master duration are integer frames; all real motion is 1x.
SCENES = [
    dict(id='arrival-greeting', kind='video', sourceIn=0, frames=165, title='Ankommen und begrüßen'),
    dict(id='app-home', kind='image', asset='01_app_home.jpeg', frames=48, title='App öffnen'),
    dict(id='human-code', kind='video', sourceIn=165, frames=68, title='Abholcode zeigen'),
    dict(id='code-screen', kind='image', asset='02_customer_code_scan.jpeg', frames=48, title='Abholcode scannen'),
    dict(id='human-check', kind='video', sourceIn=233, frames=32, title='Abholcode bestätigt'),
    dict(id='human-wait', kind='video', sourceIn=265, frames=34, title='Ein kurzer Moment'),
    dict(id='human-parcel', kind='video', sourceIn=329, frames=67, title='Paket holen und scannen'),
    dict(id='parcel-screen', kind='image', asset='03_parcel_scan.jpeg', frames=48, title='Paket scannen'),
    dict(id='success-screen', kind='image', asset='04_pickup_success.jpeg', frames=42, title='Abholung bestätigt'),
    dict(id='handover-turn', kind='video', sourceIn=396, frames=84, title='Paket übernehmen und verabschieden'),
    dict(id='exit-pending', kind='gap', frames=84, title='Ausgangsaufnahme ausstehend'),
]
cursor = 0
for scene in SCENES:
    scene['startFrame'] = cursor
    scene['start'] = cursor/FPS
    scene['duration'] = scene['frames']/FPS
    cursor += scene['frames']
assert cursor == 720

def run(args):
    subprocess.run([str(FFMPEG), '-hide_banner', '-loglevel', 'error', '-y', *map(str, args)], check=True)

def setup():
    for directory in ['assets', 'footage', 'vendor', 'compositions']:
        (STUDIO/directory).mkdir(parents=True, exist_ok=True)
    for asset in (ROOT/'assets').iterdir():
        shutil.copy2(asset, STUDIO/'assets'/asset.name)
    shutil.copy2(GSAP, STUDIO/'vendor'/'gsap.min.js')
    shutil.copy2(ROOT/'footage'/'existing-counter.mp4', STUDIO/'footage'/'existing-counter.mp4')
    timeline = dict(fps=FPS, duration=30, availableJourneyEnd=26.5,
                    status='work_in_progress_exit_missing', scenes=SCENES)
    (ROOT/'edit-decision-list.json').write_text(json.dumps(timeline, indent=2, ensure_ascii=False), encoding='utf-8')
    for mobile in [False, True]:
        width,height = (1080,1350) if mobile else (1920,1080)
        compid = 'payvity-mobile' if mobile else 'payvity-desktop'
        prefix = ''
        layers, motion = [], []
        for idx,s in enumerate(SCENES):
            start, dur = s['start'],s['duration']
            extended = dur + (0.125 if idx < len(SCENES)-1 else 0)
            attrs = f'id="{s["id"]}" class="clip scene" data-start="{start}" data-duration="{extended}" data-track-index="{idx}"'
            if s['kind'] == 'video':
                layers.append(f'<video {attrs} src="{prefix}footage/{s["id"]}.mp4" muted playsinline preload="auto" aria-label="{s["title"]}"></video>')
            elif s['kind'] == 'image':
                layers.append(f'<img {attrs} src="{prefix}assets/{s["asset"]}" alt="Original Amazon Hub: {s["title"]}" />')
            else:
                layers.append(f'<div {attrs} aria-label="Missing exit shot; work in progress"></div>')
            motion.append(f'tl.from("#{s["id"]}", {{opacity:0,duration:0.125,ease:"none",immediateRender:false}}, {start});')
        # Fixed canvas; no website headlines or CTA are baked into the composition.
        html = f'''<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width={width},height={height}">
<title>PAYVITY — {'Mobile' if mobile else 'Desktop'} Schnittvorschau</title>
<script src="{prefix}vendor/gsap.min.js"></script>
<style>*{{box-sizing:border-box}}html,body{{margin:0;width:{width}px;height:{height}px;overflow:hidden;background:#080B10}}#root{{position:relative;width:100%;height:100%;background:#080B10}}.scene{{position:absolute;inset:0;width:100%;height:100%;background:#080B10;overflow:hidden}}video.scene{{object-fit:contain}}img.scene{{display:block;object-fit:contain;padding:{72 if mobile else 40}px}} </style></head>
<body><main id="root" data-composition-id="{compid}" data-start="0" data-duration="30" data-width="{width}" data-height="{height}" data-fps="24">
{''.join(layers)}</main><script>window.__timelines=window.__timelines||{{}};const tl=gsap.timeline({{paused:true}});{''.join(motion)}window.__timelines["{compid}"]=tl;tl.seek(0);</script></body></html>'''
        destination = STUDIO/'mobile'/'index.html' if mobile else STUDIO/'index.html'
        destination.parent.mkdir(parents=True,exist_ok=True)
        destination.write_text(html, encoding='utf-8')
    # Frame-accurate source clips with three-frame handles for the crossfades.
    for s in SCENES:
        if s['kind'] != 'video':
            continue
        target = STUDIO/'footage'/f'{s["id"]}.mp4'
        if not target.exists():
            run(['-i',ROOT/'footage'/'existing-counter.mp4','-vf',
                 f'trim=start_frame={s["sourceIn"]}:end_frame={s["sourceIn"]+s["frames"]},setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=0.125',
                 '-an','-c:v','libx264','-preset','fast','-crf','14','-pix_fmt','yuv420p','-r','24','-movflags','+faststart',target])
    # A second self-contained project keeps mobile asset resolution inside its root.
    for folder in ['assets','vendor','footage']:
        target_dir = STUDIO/'mobile'/folder
        target_dir.mkdir(parents=True,exist_ok=True)
        for item in (STUDIO/folder).iterdir():
            if item.is_file():
                shutil.copy2(item,target_dir/item.name)
    shutil.copy2(STUDIO/'hyperframes.json',STUDIO/'mobile'/'hyperframes.json')

def render(mobile=False):
    width,height = (1080,1350) if mobile else (1920,1080)
    tag = 'mobile' if mobile else 'desktop'
    parts = ROOT/'renders'/'parts'/tag
    parts.mkdir(parents=True, exist_ok=True)
    previous = None
    for idx,s in enumerate(SCENES):
        target = parts/f'{idx:02d}-{s["id"]}.mp4'
        frame = parts/f'{idx:02d}-last.png'
        if not target.exists():
            args=[]
            if s['kind']=='video':
                args += ['-i',STUDIO/'footage'/f'{s["id"]}.mp4']
                base=f'[0:v]scale={width}:{height}:force_original_aspect_ratio=decrease:force_divisible_by=2,pad={width}:{height}:(ow-iw)/2:(oh-ih)/2:color=0x080B10,setsar=1,format=yuv420p,trim=end_frame={s["frames"]},setpts=PTS-STARTPTS[base]'
            elif s['kind']=='image':
                args += ['-loop','1','-framerate','24','-i',STUDIO/'assets'/s['asset']]
                margin = 72 if mobile else 40
                base=f'[0:v]scale={width-2*margin}:{height-2*margin}:force_original_aspect_ratio=decrease:force_divisible_by=2,pad={width}:{height}:(ow-iw)/2:(oh-ih)/2:color=0x080B10,setsar=1,format=yuv420p[base]'
            else:
                args += ['-f','lavfi','-i',f'color=c=0x080B10:s={width}x{height}:r=24']
                base='[0:v]format=yuv420p[base]'
            if previous:
                args += ['-loop','1','-framerate','24','-i',previous]
                filtergraph=base+';[1:v]format=yuva420p,fade=t=out:st=0:d=0.125:alpha=1[old];[base][old]overlay=0:0:shortest=1:format=auto,format=yuv420p[out]'
            else:
                filtergraph=base+';[base]fade=t=in:st=0:d=0.125[out]'
            run([*args,'-filter_complex_threads','1','-filter_complex',filtergraph,'-map','[out]',
                 '-frames:v',s['frames'],'-an','-r','24','-c:v','libx264','-preset','fast',
                 '-crf','14','-pix_fmt','yuv420p','-g','24','-threads','4',target])
        if not frame.exists():
            run(['-i',target,'-vf',f'select=eq(n\\,{s["frames"]-1})','-frames:v','1',frame])
        previous=frame
        print(f'{tag}: {s["id"]} ready',flush=True)
    concat=parts/'concat.txt'
    concat_lines = []
    for i,s in enumerate(SCENES):
        clip_path = parts / ('%02d-%s.mp4' % (i,s['id']))
        concat_lines.append("file '%s'\n" % clip_path.as_posix())
    concat.write_text(''.join(concat_lines), encoding='utf-8')
    master=ROOT/'renders'/f'payvity-{tag}-review-master-24fps.mp4'
    run(['-f','concat','-safe','0','-i',concat,'-c','copy','-movflags','+faststart',
         '-metadata','title=PAYVITY work in progress - exit shot missing',master])
    web=ROOT/'renders'/f'payvity-{tag}-web.mp4'
    run(['-i',master,'-an','-c:v','libx264','-preset','slow','-crf','20','-pix_fmt','yuv420p',
         '-g','6','-keyint_min','6','-sc_threshold','0','-bf','0','-threads','4','-movflags','+faststart',web])
    run(['-i',master,'-an','-c:v','libvpx-vp9','-crf','28','-b:v','0','-g','6','-row-mt','1',
         '-cpu-used','3','-threads','4',ROOT/'renders'/f'payvity-{tag}-web.webm'])
    run(['-ss','4','-i',master,'-frames:v','1',ROOT/'renders'/f'payvity-{tag}-poster.jpg'])
    print(f'{tag}: master, seeking MP4, WebM and poster exported',flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--render',action='store_true')
    options=parser.parse_args()
    setup()
    if options.render:
        render(False)
        render(True)
