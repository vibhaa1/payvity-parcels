from pathlib import Path
import hashlib, json, shutil, struct, subprocess

ROOT=Path(__file__).resolve().parent
PROBE=r'C:\Users\srivi\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.1-full_build\bin\ffprobe.exe'

def probe(path, *options):
    return json.loads(subprocess.check_output([PROBE,'-v','error',*options,'-of','json',str(path)],text=True))

def atoms(path):
    result=[]
    with path.open('rb') as file:
        while True:
            offset=file.tell(); header=file.read(8)
            if len(header)!=8:break
            size,kind=struct.unpack('>I4s',header)
            if size==1:size=struct.unpack('>Q',file.read(8))[0]
            if size==0:break
            result.append((kind.decode('ascii',errors='replace'),offset))
            file.seek(offset+size)
    return result

report={'passed':True,'assets':[],'encodes':[]}
manifest=json.loads((ROOT/'assets-manifest.json').read_text())
for asset in manifest:
    digests=[]
    for file in [Path(asset['original']),ROOT/'assets'/asset['asset'],ROOT/'studio'/'assets'/asset['asset'],ROOT/'studio'/'mobile'/'assets'/asset['asset']]:
        digests.append(hashlib.sha256(file.read_bytes()).hexdigest().upper())
    assert all(digest==asset['sha256'] for digest in digests)
    report['assets'].append({'asset':asset['asset'],'allCopiesByteIdentical':True})
for tag in ['desktop','mobile']:
    for suffix in ['review-master-24fps.mp4','web.mp4','web.webm']:
        file=ROOT/'renders'/f'payvity-{tag}-{suffix}'
        data=probe(file,'-count_frames','-show_entries','format=duration:stream=codec_name,width,height,r_frame_rate,avg_frame_rate,nb_read_frames,has_b_frames')
        stream=data['streams'][0]
        assert stream['r_frame_rate']=='24/1' and int(stream['nb_read_frames'])==720
        assert abs(float(data['format']['duration'])-30)<0.05
        item={'file':file.name,'bytes':file.stat().st_size,**stream,'duration':data['format']['duration']}
        if suffix.startswith('web'):
            frames=probe(file,'-select_streams','v:0','-show_frames','-show_entries','frame=key_frame')['frames']
            keys=[i for i,f in enumerate(frames) if f['key_frame']]
            gaps=[b-a for a,b in zip(keys,keys[1:])]
            assert max(gaps)<=6
            item['maxKeyframeGapFrames']=max(gaps)
            item['maxKeyframeGapSeconds']=max(gaps)/24
        if suffix.endswith('mp4'):
            positions=dict(atoms(file))
            assert positions['moov']<positions['mdat']
            item['faststart']=True
        report['encodes'].append(item)
(ROOT/'review'/'media-qa.json').write_text(json.dumps(report,indent=2),encoding='utf-8')

# Retain the original approved planning record while making current entry points accurate.
if not (ROOT/'review'/'approved-plan-v1.txt').exists():
    shutil.copy2(ROOT/'SHOT-PLAN.txt',ROOT/'review'/'approved-plan-v1.txt')
    shutil.copy2(ROOT/'MISSING-FOOTAGE.json',ROOT/'review'/'missing-footage-v1.json')
edl=json.loads((ROOT/'edit-decision-list.json').read_text())
plan=['PAYVITY — CURRENT PRODUCTION SHOT PLAN',
      'Approved story with refinements: 24 fps / 30 seconds / real footage first.',
      'Current export is work in progress: only 26.5–30 needs additional exit footage.',
      '', 'FRAME-ACCURATE EDIT (24 fps)']
for s in edl['scenes']:
    end=s['start']+s['duration']
    source=(f"existing-counter.mp4 frames {s['sourceIn']}–{s['sourceIn']+s['frames']-1}, natural speed" if s['kind']=='video' else s.get('asset','MISSING EXIT FOOTAGE; black review slot'))
    plan.extend([f"{s['start']:08.3f}–{end:08.3f} s | {s['title']}",f'  {source}'])
plan.extend(['','DECISIONS IMPLEMENTED',
    'The real doorway arrival and counter approach establish arrival.',
    'Real greeting and scanning movement remain continuous; no photographic inserts.',
    'App home → customer code scan → parcel scan → pickup success is explicit.',
    'The source parcel-return action replaces optional full storage retrieval.',
    'Actual receipt, lifting and beginning of the turn use source frames 396–479.',
    'Only the continuing walk and physical exit remain missing.',
    'Human photos are preserved as references/match-frame guides, not animated shots.',
    'Masks, devices, wardrobe, package proportions and shop details remain original.',
    'Three-frame transitions separate editorial inserts; all human movement stays 1x.',
    'Native 24 fps retained. No optical flow or 24-to-30 cadence conversion.',
    'Mobile preserves both people and the interaction with contained landscape footage.',
    'Native HTML provides closing headlines, CTA, configurable scroll and reduced motion.',
    'Default actual scroll travel is 400vh desktop and 350vh mobile.',
    '', 'REMAINING SHOT AND COST',
    'One 3.5-second exit continuation, ideally from a five-second generated take.',
    'Proposed list-price estimate: Kling 2.5 Turbo Pro via fal, USD 0.07/second.',
    'Five seconds: USD 0.35 per attempt; three attempts: USD 1.05 before extras/taxes.',
    'No paid jobs submitted; generator connection and confirmed charge remain pending.',
    'See MISSING-FOOTAGE.json and PRODUCTION-STATUS.txt for references and caveats.',
    '', 'REVIEW',
    'http://127.0.0.1:4173/preview/',
    'Desktop project: studio/index.html. Mobile project: studio/mobile/index.html.',
    'The existing Next.js website has not been modified.',
    'review/approved-plan-v1.txt retains the earlier planning record.'])
(ROOT/'SHOT-PLAN.txt').write_text('\n'.join(plan)+'\n',encoding='utf-8')
missing={
    'status':'awaiting_exit_clip_or_generation_connection_and_cost_authorization',
    'paidGenerationStarted':False,
    'master':{'durationSeconds':30,'fps':24,'desktop':[1920,1080],'mobile':[1080,1350]},
    'clipRequests':[{
        'id':'exit-continuation','filename':'exit-continuation.mp4',
        'masterStart':26.5,'masterEnd':30,'usableSeconds':3.5,'proposedGeneratedSeconds':5,
        'firstFrame':'review/exit-continuation-start.jpg',
        'locationReference':'review/entrance-location-reference.jpg',
        'continuityReferences':['assets/05_human_scanning.png','assets/06_human_handover.png','footage/existing-counter.mp4'],
        'prompt':'Continue the last real frame of the customer carrying the original Amazon parcel at the counter. The same long brown-haired customer, rust knitted sweater, blue jeans, patterned face mask and green phone continues her turn and walks naturally towards the established glass entrance. Show her visibly leaving through that entrance carrying the same parcel with unchanged dimensions, orientation and Prime tape. The blonde associate in beige long sleeves, red apron and black mask returns to work. Preserve exact shop geography, black subway tiles, white counter, jars, equipment and Hub sign. Use the source entrance location reference to connect the exit, rather than inventing a different doorway. Realistic anatomy, physical contact, parcel weight and footfalls. Gentle camera tracking; keep customer and parcel visible through departure. No generated interface, captions, CTA, unmasked faces, slideshow movement or floating devices. No reversal of arrival footage, which lacks the parcel. No dialogue/audio required.',
        'proposedProvider':'fal','proposedModel':'fal-ai/kling-video/v2.5-turbo/pro/image-to-video',
        'estimate':{'currency':'USD','listPricePerSecond':0.07,'perFiveSecondAttempt':0.35,'threeAttempts':1.05,
                    'source':'https://fal.ai/pricing','checkedOn':'2026-11-24','accountQuoteConfirmed':False,'spendingAuthorized':False,
                    'excludes':['taxes','upscaling','additional reference-image preparation','retries beyond stated count']},
        'qualityGate':['seam matches source end','same customer, wardrobe and mask','same parcel and devices','established entrance geography','continuous physical walk','visible exit carrying parcel','no anatomy or texture instability']
    }],
    'supersededShotRequests':['replacement arrival','generated app phone plate','full storage retrieval','generated success phone plate'],
    'reason':'Approved refinements prioritize existing real footage and explicit original screenshot inserts.'
}
(ROOT/'MISSING-FOOTAGE.json').write_text(json.dumps(missing,indent=2,ensure_ascii=False),encoding='utf-8')
print(json.dumps({'verifiedAssets':len(report['assets']),'verifiedExports':len(report['encodes']),'fps':24,'framesPerExport':720,'missingUsableSeconds':3.5}))
