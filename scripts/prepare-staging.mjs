// Run only after the ordinary build; production templates stay unchanged.
import {readdir,readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
for(const file of await readdir('dist',{recursive:true})){
 if(!file.endsWith('.html'))continue;
 const path=resolve('dist',file);let html=await readFile(path,'utf8');
 html=html.replace(/<script[^>]*src=["'][^"']*(?:googletagmanager|google-analytics)[^"']*["'][^>]*>[\s\S]*?<\/script>/gi,'').replace(/<script[^>]*>[\s\S]*?gtag\('config'[\s\S]*?<\/script>/gi,'');
 html=html.replace(/<meta\s+name="robots"[^>]*>/gi,'');
 html=html.replace('</head>','<meta name="robots" content="noindex, nofollow"></head>');
 html=html.replace(/<body([^>]*)>/i,'<body$1><aside id="staging-notice" role="note" style="background:#fff3cf;color:#302812;padding:10px 20px;text-align:center;font:600 13px/1.5 system-ui;position:relative;z-index:100">STAGING · Review only. Bookings are disabled; no appointments are created.</aside>');
 html=html.replace(/class="([^"]*)booking-entry([^"]*)"/g,'class="$1$2"');
 html=html.replace(/<form\b[\s\S]*?<\/form>/gi,form=>form.replace(/action="[^"]*"/,'action="#staging-notice"').replace(/<button([^>]*type="submit"[^>]*)>/g,'<button$1 disabled title="Booking is disabled on staging">'));
 html=html.replace(/href="https:\/\/get\.businessvideosolutions\.net[^"\s]*"/g,'href="#staging-notice"');
 await writeFile(path,html);
}
await writeFile('dist/robots.txt','User-agent: *\nDisallow: /\n');
console.log('Prepared isolated, noindex staging output.');
