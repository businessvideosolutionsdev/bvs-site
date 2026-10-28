import production from './worker.js';
export default {
 async fetch(request,env,ctx){
  const url=new URL(request.url);
  if(url.pathname==='/robots.txt')return new Response('User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain','X-Robots-Tag':'noindex, nofollow'}});
  const response=await production.fetch(request,env,ctx);const result=new Response(response.body,response);
  result.headers.set('X-Robots-Tag','noindex, nofollow');result.headers.set('X-Environment','staging');
  result.headers.set('Content-Security-Policy',"form-action 'none'; frame-src https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com; connect-src 'self'");
  return result;
 }
};
