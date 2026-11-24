from pathlib import Path
import json
root=Path(__file__).resolve().parent
file=root/'MISSING-FOOTAGE.json'
data=json.loads(file.read_text(encoding='utf-8'))
data['status']='blocked_fal_account_Rio_out_of_credits'
shot=data['clipRequests'][0]
shot['proposedProvider']='fal'
shot['proposedModel']='alibaba/wan-3.0-prime/image-to-video'
shot['estimate']={'currency':'USD','ratePerSecond':0.05,'seconds':5,'estimatedPerAttempt':0.25,'source':'fal connected-account estimate_cost response','checkedOn':'2026-11-24','advisoryOnly':True,'configurationQuoteGuaranteed':False,'generationSubmitted':False}
data['generationBlock']={'accountName':'Rio','stage':'reference_upload_initiate','httpStatus':403,'reason':'balance_exhausted','creditsPurchased':False,'uploadsCompleted':False,'generationSubmitted':False,'nextAction':'Add credits to the connected fal account, then check_account_status before uploading or submitting.','billingUrl':'https://fal.ai/connect/credits?utm_medium=fal_mcp&utm_campaign=balance_exhausted&utm_content=codex'}
file.write_text(json.dumps(data,indent=2,ensure_ascii=False),encoding='utf-8')
with (root/'PRODUCTION-STATUS.txt').open('a',encoding='utf-8') as out:
    out.write('\nLATEST GENERATION STATUS\nfal is now connected. The model-selection tool proposed a Wan 3.0 Prime draft\n(alibaba/wan-3.0-prime/image-to-video); its live rate estimate is USD 0.05 per\nsecond, or USD 0.25 for five seconds. This is an advisory rate calculation.\nReference upload initiation was rejected with HTTP 403: balance_exhausted on\nthe connected fal account named Rio. No upload completed and no paid generation\nwas submitted. No credits were purchased. Add credits to Rio, then verify account\nreadiness before resuming. The source frame is retained in review/.\n')
with (root/'SHOT-PLAN.txt').open('a',encoding='utf-8') as out:
    out.write('\nLIVE PROVIDER UPDATE\nfal connected; Wan 3.0 Prime draft estimated at USD 0.25 for five seconds.\nReference upload was blocked because account Rio has no credits. No generation\nsubmitted. The earlier Kling USD 0.35 calculation remains an alternative estimate.\n')
browser=json.loads((root/'review'/'browser-qa.json').read_text())
mobile=json.loads((root/'review'/'mobile-hyperframes-check.json').read_text(encoding='utf-8-sig'))
desktop=json.loads((root/'studio'/'.hyperframes'/'artifacts'/'checks'/'4adb055e-6b4a-434d-965c-b529a65b7143.json').read_text(encoding='utf-8-sig'))
summary={'desktopHyperframes':{'ok':desktop['ok'],'runtimeErrors':desktop['runtime']['errorCount'],'layoutErrors':desktop['layout']['errorCount']},'mobileHyperframes':{'ok':mobile['ok'],'runtimeErrors':mobile['runtime']['errorCount'],'layoutErrors':mobile['layout']['errorCount']},'browserPassed':browser['passed'],'browserCases':[{'mobile':case['mobile'],'format':case['format'],'seekTargets':len(case['seekResults']),'meanSeekMs':case['details']['meanSeekMs'],'worstSeekMs':case['details']['worstSeekMs'],'noOverflow':not case['details']['overflow'],'noAutoplay':case['details']['paused']} for case in browser['cases']],'reviewedWarnings':['11-layer timeline kept together to match the single frame-based edit list.','Three-frame opening fade intentionally begins on charcoal; website poster supplies the initial visible still.','Silent film is intentional for bidirectional scroll playback; no supplied audio exists.'],'limitation':'Local Chromium emulation; actual Safari/iOS and final exit shot remain unverified.'}
(root/'review'/'qa-summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps({'browserPassed':browser['passed'],'desktopHyperframes':desktop['ok'],'mobileHyperframes':mobile['ok'],'generationSubmitted':False,'generationBlocked':'out_of_credits'}))
