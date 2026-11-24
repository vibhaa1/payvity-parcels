import http from 'node:http';
import {createReadStream} from 'node:fs';
import {stat,realpath} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=await realpath(path.dirname(fileURLToPath(import.meta.url)));
const port=Number(process.env.PAYVITY_PREVIEW_PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8','.mp4':'video/mp4','.webm':'video/webm','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png'};
http.createServer(async(req,res)=>{
  try{
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
    let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname==='/')pathname='/preview/index.html';
    if(pathname.endsWith('/'))pathname+='index.html';
    const target=await realpath(path.resolve(root,'.'+pathname));
    const relative=path.relative(root,target);
    if(relative.startsWith('..')||path.isAbsolute(relative)){res.writeHead(403);res.end();return;}
    const info=await stat(target);
    if(!info.isFile()){res.writeHead(404);res.end();return;}
    const headers={'Content-Type':types[path.extname(target)]||'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
    const range=req.headers.range;
    let start=0,end=info.size-1,status=200;
    if(range){
      const m=/^bytes=(\d*)-(\d*)$/.exec(range);
      if(!m||(!m[1]&&!m[2])){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});res.end();return;}
      if(m[1]){start=Number(m[1]);if(m[2])end=Math.min(end,Number(m[2]));}
      else start=Math.max(0,info.size-Number(m[2]));
      if(start>end||start>=info.size){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});res.end();return;}
      status=206;headers['Content-Range']=`bytes ${start}-${end}/${info.size}`;
    }
    headers['Content-Length']=end-start+1;
    res.writeHead(status,headers);
    if(req.method==='HEAD')res.end();else createReadStream(target,{start,end}).on('error',()=>res.destroy()).pipe(res);
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`PAYVITY standalone preview: http://127.0.0.1:${port}/preview/`));
