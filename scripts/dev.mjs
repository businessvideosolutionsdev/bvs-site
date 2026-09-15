import { spawn } from 'node:child_process';
import { watch } from 'node:fs';

let building = false;
let queued = false;
function build() {
  if (building) { queued = true; return Promise.resolve(); }
  building = true;
  return new Promise((resolve,reject) => {
    const process = spawn('node',['scripts/build.mjs'],{stdio:'inherit'});
    process.once('exit', code => {
      building = false;
      if (code) reject(new Error('Build failed'));
      else resolve();
      if (queued) { queued=false; build().catch(console.error); }
    });
  });
}
await build();
const server = spawn('node',['scripts/serve.mjs','--production'],{stdio:'inherit'});
let timer;
const watchers = ['public','templates','content','scripts'].map(dir => watch(dir,{recursive:true},()=> {
  clearTimeout(timer);
  timer = setTimeout(()=>build().catch(console.error),250);
}));
function close() { watchers.forEach(w=>w.close()); clearTimeout(timer); server.kill(); }
process.on('SIGINT',()=>{close();process.exit();});
process.on('SIGTERM',()=>{close();process.exit();});
server.on('exit',code=>{close();process.exit(code||0);});
