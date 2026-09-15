import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { marked } from 'marked';

const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const validSlug = value => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const readJSON = async file => JSON.parse(await readFile(file, 'utf8'));
const formatDate = date => new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric', timeZone:'UTC' });

export async function renderPages(output) {
  const site = await readJSON('content/site.json');
  const origin = new URL(site.url).origin;
  const stories = await readJSON('content/testimonials.json');
  const postIndex = await readJSON('content/blog.json');
  const slugs = new Set();
  for (const story of stories) {
    if (!validSlug(story.slug) || slugs.has(story.slug)) throw new Error('Invalid or duplicate testimonial slug');
    if (!/^[\w-]{11}$/.test(story.video) && !/^\/assets\/videos\/[a-z0-9-]+\.mp4$/.test(story.video)) throw new Error('Invalid testimonial video');
    slugs.add(story.slug);
  }
  slugs.clear();
  const posts = [];
  for (const post of postIndex) {
    if (!validSlug(post.slug) || slugs.has(post.slug)) throw new Error('Invalid or duplicate blog slug');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date) || !Number.isFinite(Date.parse(post.date))) throw new Error('Invalid article date');
    slugs.add(post.slug);
    if (!post.published) continue;
    const markdown = await readFile(`content/posts/${post.slug}.md`, 'utf8');
    posts.push({ ...post, minutes: Math.max(1, Math.ceil(markdown.split(/\s+/).length / 200)), html: marked.parse(markdown) });
  }
  posts.sort((a,b) => b.date.localeCompare(a.date));
  const template = await readFile('templates/home.html', 'utf8');
  const head = template.match(/<head>([\s\S]*?)<\/head>/)[1];
  const header = template.match(/<header[\s\S]*?<\/header>/)[0].replaceAll('href="#', 'href="/#');
  let footer = template.match(/<footer[\s\S]*?<\/footer>/)[0].replaceAll('href="#', 'href="/#');
  footer = footer.replace('<div class="footer-bottom">', '<nav class="footer-pages" aria-label="Explore BVS"><a href="/">Home</a><a href="/testimonials/">Client stories</a><a href="/blog/">Blog</a><a href="/#strategy">Book a strategy call</a></nav><div class="footer-bottom">');
  const dialogs = [...template.matchAll(/<dialog[\s\S]*?<\/dialog>/g)].map(m=>m[0]).join('\n');
  const pages = [];
  const organization = { '@type':'Organization', '@id':origin+'/#organization', name:site.name, url:origin+'/', telephone:'+14077910391', email:'info@businessvideosolutions.net' };
  const breadcrumbs = items => `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a>${items.map(([label,url])=>`<span aria-hidden="true">/</span>${url?`<a href="${url}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
  const crumbSchema = (items) => ({ '@type':'BreadcrumbList', itemListElement:[['Home','/'],...items].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:origin+path})) });
  const cta = `<section class="page-cta container"><div><p class="section-kicker">Your next chapter.</p><h2>Let’s put your business<br>in front of more people.</h2></div><a class="button" href="/#strategy">Build my growth plan <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></span></a></section>`;
  const mediaAttrs = story => story.video.startsWith('/') ? `href="${story.video}" data-local-video="${story.video}" data-poster="${story.image}"` : `href="https://www.youtube.com/watch?v=${story.video}" data-video="${story.video}"`;
  const photo = story => `<a class="story-image" ${mediaAttrs(story)} data-title="${esc(story.name)}: the client story" aria-label="Watch the ${esc(story.name)} client story"><img src="${story.image}" alt="${esc(story.name)} client story" width="1672" height="941" loading="lazy"><span class="circle-play" aria-hidden="true">▶</span></a>`;
  const card = (story, home=false) => `<article class="result-card" data-category="${esc(story.category)}">${photo(story)}<div class="result-body"><div class="metric${story.metric.length>7?' metric-story':''}"><strong>${esc(story.metric)}</strong><span>${esc(story.label)}</span></div><h3>${esc(story.name)}</h3><p>${esc(story.summary)}</p>${home?`<a class="story-link" ${mediaAttrs(story)} data-title="${esc(story.name)}: the client story">Watch their story <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></span></a>`:`<a class="story-link" href="/testimonials/${story.slug}/">Explore their story <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></span></a>`}</div></article>`;
  const meta = ({title,description,path,image='/assets/testimonials/courtesy-adjusted.webp',type='website',schema=[]}) => head
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)} | BVS</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}">`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}">`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(description)}">`)
    .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type}">`)
    + `<link rel="canonical" href="${origin}${path}"><meta property="og:url" content="${origin}${path}"><meta property="og:image" content="${origin}${image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${origin}${image}"><meta name="robots" content="${site.indexable && path !== '/404/'?'index,follow':'noindex,follow'}"><link rel="alternate" type="application/rss+xml" title="BVS Blog" href="/blog/feed.xml"><script type="application/ld+json">${json({'@context':'https://schema.org','@graph':[organization,...schema]})}</script>`;
  async function emit(path, html, include=true) {
    const file = join(output, path, 'index.html');
    await mkdir(dirname(file), {recursive:true});
    await writeFile(file, html);
    if (include) pages.push(path);
  }
  const shell = (body, config) => `<!doctype html><html lang="en"><head>${meta(config)}</head><body class="inner-page"><a href="#main" class="skip-link">Skip to content</a>${header.replace(`href="${config.path.startsWith('/blog/')?'/blog/':'/testimonials/'}"`, `href="${config.path.startsWith('/blog/')?'/blog/':'/testimonials/'}" aria-current="page"`)}<main id="main">${body}</main>${footer}${dialogs}</body></html>`;
  const featured = stories.filter(s=>s.featured);
  if (featured.length !== 6) throw new Error('Homepage must feature six client stories');
  const homeStories = `<div class="results-grid">${featured.slice(0,3).map(s=>card(s,true)).join('')}</div><div class="results-grid additional-stories">${featured.slice(3).map(s=>card(s,true)).join('')}</div>`;
  const home = template.replace('{{HOME_STORIES}}',homeStories).replace(/<head>[\s\S]*?<\/head>/, `<head>${meta({title:'Florida Video Marketing & Local Ads',description:'Video marketing, Meta ads and Google ads for Florida service businesses. Meet your local BVS team and book a strategy call.',path:'/',schema:[{'@type':'WebSite',url:origin+'/',name:site.name}]})}</head>`).replace(/<footer[\s\S]*?<\/footer>/,footer);
  await emit('/',home);
  const categories = [...new Set(stories.map(s=>s.category))];
  await emit('/testimonials/',shell(`<section class="page-hero container">${breadcrumbs([['Client stories']])}<p class="section-kicker">The people behind the progress.</p><h1>Good businesses.<br>Real stories.</h1><p class="page-intro">Meet the Florida business owners working with BVS. Hear about their results, their first shoots and the experience of growing together.</p><a class="text-link" href="#client-library">Explore ${stories.length} client stories <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 4v16m-6-6 6 6 6-6"/></svg></span></a></section><section id="client-library" class="story-library section-pad"><div class="container"><div class="library-toolbar"><div class="story-filters" aria-label="Filter client stories"><button type="button" data-filter="all" aria-pressed="true">All stories</button>${categories.map(c=>`<button type="button" data-filter="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}</div><p id="story-count" role="status">${stories.length} stories</p></div><div class="results-grid library-grid" id="story-cards">${stories.map(s=>card(s)).join('')}</div><div class="library-more" hidden><button id="more-stories" class="button" type="button" aria-controls="story-cards">View more client stories <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 4v16m-6-6 6 6 6-6"/></svg></span></button></div><p class="results-note">Results are client-reported and vary by business, market and budget. Each video tells its own story.</p></div></section>${cta}`,{title:'Client Testimonials & Results',description:'Hear from Florida business owners about their results and experience working with Business Video Solutions.',path:'/testimonials/',schema:[crumbSchema([['Client stories','/testimonials/']]),{'@type':'CollectionPage',name:'BVS client stories',url:origin+'/testimonials/'}]}));
  for (const story of stories) {
    const path = `/testimonials/${story.slug}/`;
    const player = photo(story);
    const related = stories.filter(s=>s.slug!==story.slug).sort((a,b)=>Number(b.category===story.category)-Number(a.category===story.category)).slice(0,3);
    await emit(path,shell(`<section class="story-detail container">${breadcrumbs([['Client stories','/testimonials/'],[story.name]])}<div class="story-detail-grid"><div><p class="section-kicker">${esc(story.category)}</p><h1>${esc(story.name)}</h1><p class="page-intro">${esc(story.headline)}</p><div class="detail-metric"><strong>${esc(story.metric)}</strong><span>${esc(story.label)}</span></div></div><div>${player}<p class="media-note">${story.video.startsWith('/')?'Watch the original client video.':'Play the original BVS client story on YouTube.'}</p></div></div></section><section class="story-copy container"><div><p class="section-kicker">In their own words.</p><h2>The story behind<br>the headline.</h2></div><div class="prose">${story.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<p class="source-note">This is a client-reported experience, not a guarantee of future results. <a href="${esc(story.source || (story.video.startsWith('/')?story.video:'https://www.youtube.com/watch?v='+story.video))}">Watch the source video</a>.</p></div></section><section class="story-library section-pad"><div class="container"><div class="section-heading"><h2>More voices.<br>More perspectives.</h2><a class="text-link" href="/testimonials/">All client stories <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></a></div><div class="results-grid">${related.map(s=>card(s)).join('')}</div></div></section>${cta}`,{title:`${story.name}: A BVS Client Story`,description:story.summary,path,image:story.image,schema:[crumbSchema([['Client stories','/testimonials/'],[story.name,path]])]}));
  }
  const postCard = post => `<article class="blog-card"><a href="/blog/${post.slug}/" class="blog-image" tabindex="-1" aria-hidden="true"><img src="${post.image}" alt="" width="1672" height="941" loading="lazy"></a><div class="blog-card-body"><p class="article-meta">${esc(post.category)} <span>· ${post.minutes} min read</span></p><h2><a href="/blog/${post.slug}/">${esc(post.title)}</a></h2><p>${esc(post.description)}</p><a class="text-link" href="/blog/${post.slug}/">Read the guide <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></span></a></div></article>`;
  await emit('/blog/',shell(`<section class="page-hero container">${breadcrumbs([['Blog']])}<p class="section-kicker">The local growth journal.</p><h1>A little clarity.<br>A better next move.</h1><p class="page-intro">Practical guides to video, advertising and the questions that matter when you’re growing a local business.</p></section><section class="blog-list container"><div class="blog-grid">${posts.map(postCard).join('')}</div></section>${cta}`,{title:'Local Business Marketing Blog',description:'Practical video marketing and advertising guides for Florida service businesses from Business Video Solutions.',path:'/blog/',schema:[crumbSchema([['Blog','/blog/']]),{'@type':'Blog',name:'The local growth journal',url:origin+'/blog/'}]}));
  for (const post of posts) {
    const path = `/blog/${post.slug}/`;
    await emit(path,shell(`<article class="article-page container">${breadcrumbs([['Blog','/blog/'],[post.title]])}<header class="article-heading"><p class="section-kicker">${esc(post.category)}</p><h1>${esc(post.title)}</h1><p class="page-intro">${esc(post.description)}</p><p class="article-meta">By the BVS team <span>· <time datetime="${post.date}">${formatDate(post.date)}</time> · ${post.minutes} min read</span></p></header><img class="article-cover" src="${post.image}" alt="${esc(post.imageAlt)}" width="1672" height="941"><div class="prose article-body">${post.html}</div><aside class="article-end"><strong>Make this practical for your business.</strong><p>Talk with Christian about your market, your customers and a plan that fits.</p><a class="button" href="/#strategy">Book a strategy call <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></a></aside></article><section class="container more-guides"><h2>Keep the ideas coming.</h2><div class="blog-grid">${posts.filter(p=>p.slug!==post.slug).slice(0,3).map(postCard).join('')}</div></section>`,{title:post.title,description:post.description,path,image:post.image,type:'article',schema:[crumbSchema([['Blog','/blog/'],[post.title,path]]),{'@type':'BlogPosting',headline:post.title,description:post.description,datePublished:post.date,dateModified:post.updated||post.date,image:origin+post.image,author:{'@id':origin+'/#organization'},publisher:{'@id':origin+'/#organization'},mainEntityOfPage:origin+path}]}));
  }
  for (const [slug,title,description] of [
    ['privacy-policy','Privacy Policy','How Business Video Solutions handles personal information, mobile numbers and SMS consent.'],
    ['terms-and-conditions','Terms & Conditions','Business Video Solutions website terms and SMS program details, including opt-out and support.']
  ]) {
    const body = marked.parse(await readFile(`content/${slug}.md`, 'utf8'));
    await emit(`/${slug}/`,shell(`<article class="container legal-page"><header><p class="section-kicker">Business Video Solutions</p><h1>${esc(title)}</h1><p>Last updated: September 15, 2026</p></header><div class="prose">${body}</div></article>`,{title,description,path:`/${slug}/`}));
  }
  const notFound = shell(`<section class="page-hero container"><p class="section-kicker">404 · Page not found</p><h1>Let’s get you<br>back on track.</h1><p class="page-intro">That page may have moved. Explore our client stories, read the blog or head back home.</p><div class="page-actions"><a class="button" href="/">Back to home <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></a><a class="text-link" href="/testimonials/">Client stories <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></a></div></section>`,{title:'Page Not Found',description:'Find your way back to Business Video Solutions.',path:'/404/'});
  await writeFile(join(output,'404.html'),notFound);
  await writeFile(join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(path=>`<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`);
  await writeFile(join(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  await writeFile(join(output,'blog','feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>BVS Local Growth Journal</title><link>${origin}/blog/</link><description>Practical local marketing guides from BVS.</description>${posts.map(post=>`<item><title>${esc(post.title)}</title><link>${origin}/blog/${post.slug}/</link><guid>${origin}/blog/${post.slug}/</guid><description>${esc(post.description)}</description><pubDate>${new Date(post.date+'T12:00:00Z').toUTCString()}</pubDate></item>`).join('')}</channel></rss>`);
  return pages;
}

