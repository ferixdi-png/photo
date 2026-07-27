const TOTAL=29;
const pad=n=>String(n).padStart(2,'0');
const photoUrl=n=>`assets/images/${pad(n)}.webp`;
const FALLBACK={url:'assets/sprites/all.avif',w:200,h:356,count:29};
const img=(n,alt='Портрет')=>`<button class="photo-trigger" data-photo="${n}" aria-label="Открыть кадр ${n}"><img src="${photoUrl(n)}" width="720" height="1280" alt="${alt}" loading="lazy" decoding="async"></button>`;
const frame=(n,cls='',cap='')=>`<figure class="frame ${cls}">${img(n)}${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`;

document.querySelector('#story').innerHTML=`
<section class="chapter chapter--morning theme-cream" data-theme="cream"><div class="chapter-heading"><span>01</span><h2>Утро,<br><em>без спешки</em></h2><p>Городской ритуал. Лён, холодный кофе и спокойная уверенность дневного света.</p></div><div class="triptych">${frame(1,'frame--tall','01.01 — Городской свет')}${frame(2,'frame--lift','01.02 — Мимолётный взгляд')}${frame(3,'frame--low','01.03 — Ритуал')}</div></section>
<section class="interlude interlude--quote theme-ink" data-theme="ink"><div class="interlude__number">A</div><blockquote>«Портрет становится близким в тот момент, когда перестаёт что-либо доказывать».</blockquote><div class="interlude__aside">ИССЛЕДОВАНИЕ ЕСТЕСТВЕННОГО ПРИСУТСТВИЯ</div></section>
<section class="chapter theme-sky" data-theme="sky"><div class="chapter-heading chapter-heading--right"><span>02</span><h2>Открытый<br><em>воздух</em></h2><p>Ветер, высота, лето и движение. Пространство раскрывается, тело отвечает.</p></div><div class="spread spread--sky">${frame(19,'frame--hero','02.01 — Летняя тишина')}${frame(11,'frame--narrow','02.02 — Над городом')}</div><div class="cinema-strip"><div class="cinema-strip__label">ДВИЖЕНИЕ · 02.03—02.04</div><figure>${img(17)}</figure><figure>${img(20)}</figure></div><div class="triptych" style="margin-top:14vh">${frame(26,'frame--tall','02.05 — Свет корта')}${frame(27,'frame--lift','02.06 — Городской стиль')}${frame(28,'frame--low','02.07 — У воды')}</div></section>
<section class="chapter theme-concrete" data-theme="concrete"><div class="chapter-heading"><span>03</span><h2>Форма<br><em>и тень</em></h2><p>Архитектура становится вторым телом: строгим, тихим и точным.</p></div><div class="architecture-grid">${frame(6,'frame--architect','03.01 — Структура')}${frame(5,'frame--dark','03.02 — Линия')}${frame(16,'frame--flash','03.03 — Двойное присутствие')}</div><div class="triptych" style="margin-top:14vh">${frame(22,'frame--tall','03.04 — Скульптурная линия')}${frame(24,'frame--lift','03.05 — Спокойная точность')}${frame(23,'frame--low','03.06 — Нижняя точка')}</div></section>
<section class="interlude interlude--portrait theme-charcoal" data-theme="charcoal"><div class="portrait-pair"><figure>${img(8)}</figure><div class="portrait-pair__copy"><span>04 / ЛИЧНОЕ ПРОСТРАНСТВО</span><h2>Ничего случайного.<br><em>Всё настоящее.</em></h2><p>Дом становится студией, когда свету позволяют оставаться честным.</p></div></div></section>
<section class="chapter chapter--rooms theme-milk" data-theme="milk"><div class="chapter-heading"><span>04</span><h2>Личные<br><em>заметки</em></h2><p>Тихо, прямо и без защиты — домашняя последовательность в естественном свете.</p></div><div class="rooms-grid">${frame(9,'room room--one','04.01')}${frame(12,'room room--two','04.02')}${frame(13,'room room--three','04.03')}<div class="rooms-grid__statement"><span>ТИХО / ПРЯМО / БЕЗ ЗАЩИТЫ</span><p>Визуальный язык становится личнее, но не теряет авторской точности.</p></div>${frame(14,'room room--four','04.04')}${frame(15,'room room--five','04.05')}${frame(18,'room room--six','04.06')}<figure class="frame room" style="grid-column:1/6;margin-top:14vh">${img(25)}<figcaption>04.07</figcaption></figure><figure class="frame room" style="grid-column:8/13;margin-top:24vh">${img(29)}<figcaption>04.08</figcaption></figure></div></section>
<section class="chapter chapter--night theme-night" data-theme="night"><div class="chapter-heading chapter-heading--light"><span>05</span><h2>После<br><em>полуночи</em></h2><p>Вспышка, кожа, цветы и личный свет. Последняя глава поворачивается внутрь.</p></div><div class="night-sequence">${frame(7,'night-sequence__flowers','05.01 — Цветы после полуночи')}${frame(10,'night-sequence__leather','05.02 — Чёрная кожа')}${frame(21,'night-sequence__bed','05.03 — Личный свет')}</div></section>`;

document.querySelector('#contact-sheet').innerHTML=Array.from({length:TOTAL},(_,i)=>{const n=i+1;return `<button class="photo-trigger" data-photo="${n}" aria-label="Открыть кадр ${n}"><img src="${photoUrl(n)}" width="360" height="640" alt="Кадр ${n}" loading="lazy" decoding="async"><span>${pad(n)}</span></button>`}).join('');

function paintFallback(el,n,focus=.5){
  if(!el||!el.clientWidth||!el.clientHeight)return;
  const w=el.clientWidth,h=el.clientHeight,scale=Math.max(w/FALLBACK.w,h/FALLBACK.h);
  const bw=FALLBACK.w*scale,slice=FALLBACK.h*scale,bh=slice*FALLBACK.count;
  const x=(w-bw)/2,y=-((n-1)*slice)+(h-slice)*focus;
  el.style.backgroundImage=`url('${FALLBACK.url}')`;
  el.style.backgroundSize=`${bw}px ${bh}px`;
  el.style.backgroundPosition=`${x}px ${y}px`;
  el.style.backgroundRepeat='no-repeat';
  el.style.backgroundColor='#aaa';
}
function addFallback(image,n){
  image.addEventListener('error',()=>{
    const target=image.closest('.photo-trigger')||image.parentElement;
    image.style.opacity='0';
    paintFallback(target,n,target.classList.contains('hero__image')?.43:.5);
    new ResizeObserver(()=>paintFallback(target,n,target.classList.contains('hero__image')?.43:.5)).observe(target);
  },{once:true});
}

document.querySelectorAll('.photo-trigger img').forEach(image=>addFallback(image,+image.closest('.photo-trigger').dataset.photo));
const hero=document.querySelector('.hero__image img');
hero.src=photoUrl(6);hero.loading='eager';hero.fetchPriority='high';hero.decoding='sync';
const loader=document.querySelector('.loader');
hero.addEventListener('load',()=>setTimeout(()=>loader.classList.add('is-hidden'),180),{once:true});
hero.addEventListener('error',()=>loader.classList.add('is-hidden'),{once:true});
setTimeout(()=>loader.classList.add('is-hidden'),4000);

const progress=document.querySelector('.progress span'),header=document.querySelector('.site-header');
const update=()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${h>0?scrollY/h*100:0}%`;header.style.opacity=scrollY>20?'1':'.92'};
addEventListener('scroll',update,{passive:true});update();
document.querySelectorAll('[data-scroll]').forEach(el=>el.onclick=()=>document.querySelector(el.dataset.scroll)?.scrollIntoView({behavior:'smooth'}));
const themeObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.body.dataset.currentTheme=e.target.dataset.theme}),{rootMargin:'-45% 0px -45% 0px'});
document.querySelectorAll('[data-theme]').forEach(s=>themeObs.observe(s));
const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(34px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});reveal.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.frame,.chapter-heading,.manifesto p,.archive__head').forEach(el=>{el.style.opacity='0';reveal.observe(el)});
const cursor=document.querySelector('.cursor');
if(matchMedia('(pointer:fine)').matches){addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('button,a').forEach(el=>{el.onmouseenter=()=>cursor.classList.add('is-hovering');el.onmouseleave=()=>cursor.classList.remove('is-hovering')})}
const box=document.querySelector('.lightbox'),canvas=box.querySelector('.lightbox__canvas'),counter=box.querySelector('.lightbox__count');let current=0;
function show(n){
  current=(n+TOTAL)%TOTAL;counter.textContent=`${pad(current+1)} / ${TOTAL}`;
  canvas.style.backgroundImage='none';
  canvas.innerHTML=`<img src="${photoUrl(current+1)}" width="720" height="1280" alt="Кадр ${current+1}">`;
  const view=canvas.querySelector('img');
  view.addEventListener('error',()=>{view.style.display='none';canvas.style.width='min(80vw,720px)';canvas.style.height='87vh';paintFallback(canvas,current+1,.5)},{once:true});
  if(!box.open)box.showModal();
}
document.querySelectorAll('.photo-trigger').forEach(el=>el.addEventListener('click',()=>show(+el.dataset.photo-1)));
box.querySelector('.lightbox__close').onclick=()=>box.close();box.querySelector('.lightbox__prev').onclick=()=>show(current-1);box.querySelector('.lightbox__next').onclick=()=>show(current+1);box.onclick=e=>{if(e.target===box)box.close()};addEventListener('keydown',e=>{if(!box.open)return;if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1);if(e.key==='Escape')box.close()});
