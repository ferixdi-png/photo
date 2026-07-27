const TOTAL=29;
const blank='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
const HIGH={w:360,h:640,count:21,paths:['assets/data-v5/all.avif.000.b64']};
const LOW={w:200,h:356,count:29,paths:['assets/data-v7/000.b64','assets/data-v7/001.b64','assets/data-v7/002.b64','assets/data-v7/003.b64','assets/data-v7/004.b64','assets/data-v7/005.b64']};
const img=(n,alt='Портрет')=>`<button class="photo-trigger" data-photo="${n}" aria-label="Открыть кадр ${n}"><img src="${blank}" width="720" height="1280" alt="${alt}" loading="lazy"></button>`;
const frame=(n,cls='',cap='')=>`<figure class="frame ${cls}">${img(n)}${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`;

document.querySelector('#story').innerHTML=`<section class="chapter chapter--morning theme-cream" data-theme="cream"><div class="chapter-heading"><span>01</span><h2>Утро,<br><em>без спешки</em></h2><p>Городской ритуал. Лён, холодный кофе и спокойная уверенность дневного света.</p></div><div class="triptych">${frame(1,'frame--tall','01.01 — Городской свет')}${frame(2,'frame--lift','01.02 — Мимолётный взгляд')}${frame(3,'frame--low','01.03 — Ритуал')}</div></section><section class="interlude interlude--quote theme-ink" data-theme="ink"><div class="interlude__number">A</div><blockquote>«Портрет становится близким в тот момент, когда перестаёт что-либо доказывать».</blockquote><div class="interlude__aside">ИССЛЕДОВАНИЕ ЕСТЕСТВЕННОГО ПРИСУТСТВИЯ</div></section><section class="chapter theme-sky" data-theme="sky"><div class="chapter-heading chapter-heading--right"><span>02</span><h2>Открытый<br><em>воздух</em></h2><p>Ветер, высота, лето и движение. Пространство раскрывается, тело отвечает.</p></div><div class="spread spread--sky">${frame(19,'frame--hero','02.01 — Летняя тишина')}${frame(11,'frame--narrow','02.02 — Над городом')}</div><div class="cinema-strip"><div class="cinema-strip__label">ДВИЖЕНИЕ · 02.03—02.04</div><figure>${img(17)}</figure><figure>${img(20)}</figure></div><div class="triptych" style="margin-top:14vh">${frame(26,'frame--tall','02.05 — Свет корта')}${frame(27,'frame--lift','02.06 — Городской стиль')}${frame(28,'frame--low','02.07 — У воды')}</div></section><section class="chapter theme-concrete" data-theme="concrete"><div class="chapter-heading"><span>03</span><h2>Форма<br><em>и тень</em></h2><p>Архитектура становится вторым телом: строгим, тихим и точным.</p></div><div class="architecture-grid">${frame(6,'frame--architect','03.01 — Структура')}${frame(5,'frame--dark','03.02 — Линия')}${frame(16,'frame--flash','03.03 — Двойное присутствие')}</div><div class="triptych" style="margin-top:14vh">${frame(22,'frame--tall','03.04 — Скульптурная линия')}${frame(24,'frame--lift','03.05 — Спокойная точность')}${frame(23,'frame--low','03.06 — Нижняя точка')}</div></section><section class="interlude interlude--portrait theme-charcoal" data-theme="charcoal"><div class="portrait-pair"><figure>${img(8)}</figure><div class="portrait-pair__copy"><span>04 / ЛИЧНОЕ ПРОСТРАНСТВО</span><h2>Ничего случайного.<br><em>Всё настоящее.</em></h2><p>Дом становится студией, когда свету позволяют оставаться честным.</p></div></div></section><section class="chapter chapter--rooms theme-milk" data-theme="milk"><div class="chapter-heading"><span>04</span><h2>Личные<br><em>заметки</em></h2><p>Тихо, прямо и без защиты — домашняя последовательность в естественном свете.</p></div><div class="rooms-grid">${frame(9,'room room--one','04.01')}${frame(12,'room room--two','04.02')}${frame(13,'room room--three','04.03')}<div class="rooms-grid__statement"><span>ТИХО / ПРЯМО / БЕЗ ЗАЩИТЫ</span><p>Визуальный язык становится личнее, но не теряет авторской точности.</p></div>${frame(14,'room room--four','04.04')}${frame(15,'room room--five','04.05')}${frame(18,'room room--six','04.06')}<figure class="frame room" style="grid-column:1/6;margin-top:14vh">${img(25)}<figcaption>04.07</figcaption></figure><figure class="frame room" style="grid-column:8/13;margin-top:24vh">${img(29)}<figcaption>04.08</figcaption></figure></div></section><section class="chapter chapter--night theme-night" data-theme="night"><div class="chapter-heading chapter-heading--light"><span>05</span><h2>После<br><em>полуночи</em></h2><p>Вспышка, кожа, цветы и личный свет. Последняя глава поворачивается внутрь.</p></div><div class="night-sequence">${frame(7,'night-sequence__flowers','05.01 — Цветы после полуночи')}${frame(10,'night-sequence__leather','05.02 — Чёрная кожа')}${frame(21,'night-sequence__bed','05.03 — Личный свет')}</div></section>`;

document.querySelector('#contact-sheet').innerHTML=Array.from({length:TOTAL},(_,i)=>`<button class="photo-trigger" data-photo="${i+1}" aria-label="Открыть кадр ${i+1}"><img src="${blank}" width="720" height="1280" alt="Кадр ${i+1}" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span></button>`).join('');

async function loadB64(paths){
  const parts=[];
  for(const path of paths){
    const response=await fetch(path,{cache:'no-cache'});
    if(!response.ok)throw new Error(`Не удалось загрузить ${path}: ${response.status}`);
    parts.push((await response.text()).replace(/\s+/g,''));
  }
  const binary=atob(parts.join(''));
  const bytes=new Uint8Array(binary.length);
  for(let offset=0;offset<binary.length;offset+=32768){
    const end=Math.min(offset+32768,binary.length);
    for(let i=offset;i<end;i++)bytes[i]=binary.charCodeAt(i);
  }
  const url=URL.createObjectURL(new Blob([bytes],{type:'image/avif'}));
  const test=new Image();
  test.src=url;
  if(test.decode)await test.decode();else await new Promise((resolve,reject)=>{test.onload=resolve;test.onerror=reject});
  return url;
}

let sources;
const photoElements=[];
function sourceFor(n){return n<=21?{...HIGH,url:sources.high,index:n-1}:{...LOW,url:sources.low,index:n-1}}
function paint(el,n,focus=.5){
  if(!sources||!el.clientWidth||!el.clientHeight)return;
  const src=sourceFor(n),w=el.clientWidth,h=el.clientHeight;
  const scale=Math.max(w/src.w,h/src.h),bw=src.w*scale,slice=src.h*scale,bh=slice*src.count;
  const x=(w-bw)/2,y=-(src.index*slice)+(h-slice)*focus;
  el.style.backgroundImage=`url('${src.url}')`;
  el.style.backgroundSize=`${bw}px ${bh}px`;
  el.style.backgroundPosition=`${x}px ${y}px`;
  el.style.backgroundRepeat='no-repeat';
  el.style.backgroundColor='#aaa';
}
function register(el,n){
  const focus=el.classList.contains('hero__image')?.43:.5;
  photoElements.push({el,n,focus});
  paint(el,n,focus);
  new ResizeObserver(()=>paint(el,n,focus)).observe(el);
}

const loader=document.querySelector('.loader');
async function boot(){
  try{
    const [high,low]=await Promise.all([loadB64(HIGH.paths),loadB64(LOW.paths)]);
    sources={high,low};
    document.querySelectorAll('.photo-trigger').forEach(el=>register(el,+el.dataset.photo));
    loader.classList.add('is-hidden');
  }catch(error){
    console.error(error);
    loader.querySelector('.loader__copy').innerHTML='<span>Ошибка загрузки</span><span>Обновите страницу</span>';
  }
}
boot();
setTimeout(()=>loader.classList.add('is-hidden'),12000);

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
const box=document.querySelector('.lightbox'),canvas=box.querySelector('.lightbox__canvas'),counter=box.querySelector('.lightbox__count');
canvas.style.width='min(80vw,720px)';canvas.style.height='87vh';canvas.style.maxHeight='1280px';let current=0;
function show(n){current=(n+TOTAL)%TOTAL;counter.textContent=`${String(current+1).padStart(2,'0')} / ${TOTAL}`;if(!box.open)box.showModal();requestAnimationFrame(()=>paint(canvas,current+1,.5))}
document.querySelectorAll('.photo-trigger').forEach(el=>el.addEventListener('click',()=>show(+el.dataset.photo-1)));
box.querySelector('.lightbox__close').onclick=()=>box.close();
box.querySelector('.lightbox__prev').onclick=()=>show(current-1);
box.querySelector('.lightbox__next').onclick=()=>show(current+1);
box.onclick=e=>{if(e.target===box)box.close()};
addEventListener('keydown',e=>{if(!box.open)return;if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1);if(e.key==='Escape')box.close()});
addEventListener('resize',()=>{photoElements.forEach(p=>paint(p.el,p.n,p.focus));if(box.open)paint(canvas,current+1,.5)},{passive:true});