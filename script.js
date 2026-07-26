const spriteGroups=[
  {start:1,end:6,url:'assets/sprites/sprite-1.avif'},
  {start:7,end:11,url:'assets/sprites/sprite-2.avif'},
  {start:12,end:16,url:'assets/sprites/sprite-3.avif'},
  {start:17,end:21,url:'assets/sprites/sprite-4.avif'}
];
const PHOTO_W=540,PHOTO_H=960;
const photoElements=[];
function groupFor(n){return spriteGroups.find(g=>n>=g.start&&n<=g.end)}
function paintPhoto(el,n,focus=.5){
  const g=groupFor(n); if(!g||!el.clientWidth||!el.clientHeight)return;
  const count=g.end-g.start+1,index=n-g.start;
  const w=el.clientWidth,h=el.clientHeight;
  const scale=Math.max(w/PHOTO_W,h/PHOTO_H);
  const bw=PHOTO_W*scale,bh=PHOTO_H*count*scale;
  const x=(w-bw)/2;
  const sliceH=PHOTO_H*scale;
  const crop=(h-sliceH)*focus;
  const y=-(index*sliceH)+crop;
  el.style.backgroundImage=`url("${g.url}")`;
  el.style.backgroundSize=`${bw}px ${bh}px`;
  el.style.backgroundPosition=`${x}px ${y}px`;
  el.style.backgroundRepeat='no-repeat';
}
function registerPhoto(el,n){
  const focus=el.classList.contains('hero__image')?.43:.5;
  photoElements.push({el,n,focus});
  paintPhoto(el,n,focus);
  new ResizeObserver(()=>paintPhoto(el,n,focus)).observe(el);
}
document.querySelectorAll('.photo-trigger').forEach(el=>registerPhoto(el,Number(el.dataset.photo)));

const loader=document.querySelector('.loader');
const cover=new Image(); cover.onload=()=>setTimeout(()=>loader.classList.add('is-hidden'),350); cover.onerror=()=>loader.classList.add('is-hidden'); cover.src=spriteGroups[0].url;
setTimeout(()=>loader.classList.add('is-hidden'),2800);

const progress=document.querySelector('.progress span');
const header=document.querySelector('.site-header');
const updateProgress=()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${h>0?(scrollY/h)*100:0}%`;header.style.opacity=scrollY>20?'1':'.92'};
addEventListener('scroll',updateProgress,{passive:true});updateProgress();

document.querySelectorAll('[data-scroll]').forEach(el=>el.addEventListener('click',()=>document.querySelector(el.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));

const sections=document.querySelectorAll('[data-theme]');
const themeObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)document.body.dataset.currentTheme=e.target.dataset.theme})},{rootMargin:'-45% 0px -45% 0px',threshold:0});
sections.forEach(s=>themeObserver.observe(s));

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(36px)'},{opacity:1,transform:'translateY(0)'}],{duration:900,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});revealObserver.unobserve(e.target)}})},{threshold:.08});
document.querySelectorAll('.frame,.chapter-heading,.manifesto p,.archive__head').forEach(el=>{el.style.opacity='0';revealObserver.observe(el)});

const cursor=document.querySelector('.cursor');
if(matchMedia('(pointer:fine)').matches){addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('button,a').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('is-hovering'));el.addEventListener('mouseleave',()=>cursor.classList.remove('is-hovering'))})}

const lightbox=document.querySelector('.lightbox');
const lightCanvas=lightbox.querySelector('.lightbox__canvas');
const count=lightbox.querySelector('.lightbox__count');
let current=0;
function showPhoto(n){
  current=(n+21)%21;
  lightCanvas.dataset.photo=String(current+1);
  lightCanvas.setAttribute('aria-label',`Photograph ${current+1} of 21`);
  count.textContent=`${String(current+1).padStart(2,'0')} / 21`;
  if(!lightbox.open)lightbox.showModal();
  requestAnimationFrame(()=>paintPhoto(lightCanvas,current+1,.5));
}
document.querySelectorAll('.photo-trigger').forEach(btn=>btn.addEventListener('click',()=>showPhoto(Number(btn.dataset.photo)-1)));
lightbox.querySelector('.lightbox__close').addEventListener('click',()=>lightbox.close());
lightbox.querySelector('.lightbox__prev').addEventListener('click',()=>showPhoto(current-1));
lightbox.querySelector('.lightbox__next').addEventListener('click',()=>showPhoto(current+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
addEventListener('keydown',e=>{if(!lightbox.open)return;if(e.key==='ArrowLeft')showPhoto(current-1);if(e.key==='ArrowRight')showPhoto(current+1);if(e.key==='Escape')lightbox.close()});
addEventListener('resize',()=>{photoElements.forEach(p=>paintPhoto(p.el,p.n,p.focus));if(lightbox.open)paintPhoto(lightCanvas,current+1,.5)},{passive:true});
