const TOTAL = 29;
const photoUrl = (n) => `assets/images/${String(n).padStart(2, '0')}.webp`;
const img = (n, alt = 'Portrait') => `
  <button class="photo-trigger" data-photo="${n}" aria-label="Open frame ${n}">
    <img src="${photoUrl(n)}" width="720" height="1280" alt="${alt}" loading="lazy" decoding="async">
  </button>`;
const frame = (n, cls = '', cap = '') => `
  <figure class="frame ${cls}">${img(n)}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;

document.querySelector('#story').innerHTML = `
<section class="chapter chapter--morning theme-cream" data-theme="cream">
  <div class="chapter-heading"><span>01</span><h2>Morning,<br><em>unhurried</em></h2><p>A city ritual. Linen, iced coffee and the soft confidence of daylight.</p></div>
  <div class="triptych">${frame(1,'frame--tall','01.01 — City light')}${frame(2,'frame--lift','01.02 — A passing look')}${frame(3,'frame--low','01.03 — The ritual')}</div>
</section>
<section class="interlude interlude--quote theme-ink" data-theme="ink"><div class="interlude__number">A</div><blockquote>“A portrait becomes intimate the moment it stops trying to explain itself.”</blockquote><div class="interlude__aside">A STUDY IN NATURAL PRESENCE</div></section>
<section class="chapter theme-sky" data-theme="sky">
  <div class="chapter-heading chapter-heading--right"><span>02</span><h2>Open<br><em>air</em></h2><p>Wind, height, summer and movement. The frame opens; the body answers.</p></div>
  <div class="spread spread--sky">${frame(19,'frame--hero','02.01 — Summer still')}${frame(11,'frame--narrow','02.02 — Above the city')}</div>
  <div class="cinema-strip"><div class="cinema-strip__label">MOTION STUDIES · 02.03—02.04</div><figure>${img(17)}</figure><figure>${img(20)}</figure></div>
  <div class="triptych" style="margin-top:14vh">${frame(26,'frame--tall','02.05 — Court light')}${frame(27,'frame--lift','02.06 — Public style')}${frame(28,'frame--low','02.07 — Poolside')}</div>
</section>
<section class="chapter theme-concrete" data-theme="concrete">
  <div class="chapter-heading"><span>03</span><h2>Form &amp;<br><em>shadow</em></h2><p>Architecture becomes a second body: severe, quiet, precise.</p></div>
  <div class="architecture-grid">${frame(6,'frame--architect','03.01 — Structure')}${frame(5,'frame--dark','03.02 — Line')}${frame(16,'frame--flash','03.03 — Double presence')}</div>
  <div class="triptych" style="margin-top:14vh">${frame(22,'frame--tall','03.04 — Sculptural line')}${frame(24,'frame--lift','03.05 — Tailored calm')}${frame(23,'frame--low','03.06 — Floor study')}</div>
</section>
<section class="interlude interlude--portrait theme-charcoal" data-theme="charcoal"><div class="portrait-pair"><figure>${img(8)}</figure><div class="portrait-pair__copy"><span>04 / PRIVATE ROOMS</span><h2>Nothing staged.<br><em>Everything considered.</em></h2><p>Home becomes a studio when light is allowed to remain honest.</p></div></div></section>
<section class="chapter chapter--rooms theme-milk" data-theme="milk">
  <div class="chapter-heading"><span>04</span><h2>Private<br><em>notes</em></h2><p>Quiet, direct and unguarded — a domestic sequence in natural light.</p></div>
  <div class="rooms-grid">
    ${frame(9,'room room--one','04.01')}${frame(12,'room room--two','04.02')}${frame(13,'room room--three','04.03')}
    <div class="rooms-grid__statement"><span>QUIET / DIRECT / UNGUARDED</span><p>The visual language shifts from polished to personal, without losing authorship.</p></div>
    ${frame(14,'room room--four','04.04')}${frame(15,'room room--five','04.05')}${frame(18,'room room--six','04.06')}
    <figure class="frame room" style="grid-column:1/6;margin-top:14vh">${img(25)}<figcaption>04.07</figcaption></figure>
    <figure class="frame room" style="grid-column:8/13;margin-top:24vh">${img(29)}<figcaption>04.08</figcaption></figure>
  </div>
</section>
<section class="chapter chapter--night theme-night" data-theme="night">
  <div class="chapter-heading chapter-heading--light"><span>05</span><h2>After<br><em>hours</em></h2><p>Flash, leather, flowers and private light. The final chapter turns inward.</p></div>
  <div class="night-sequence">${frame(7,'night-sequence__flowers','05.01 — Flowers after midnight')}${frame(10,'night-sequence__leather','05.02 — Black leather study')}${frame(21,'night-sequence__bed','05.03 — Private light')}</div>
</section>`;

document.querySelector('#contact-sheet').innerHTML = Array.from({length: TOTAL}, (_, i) => {
  const n = i + 1;
  return `<button class="photo-trigger" data-photo="${n}" aria-label="Open frame ${n}"><img src="${photoUrl(n)}" width="360" height="640" alt="Frame ${n}" loading="lazy" decoding="async"><span>${String(n).padStart(2,'0')}</span></button>`;
}).join('');

const heroImage = document.querySelector('.hero__image img');
if (heroImage) {
  heroImage.src = photoUrl(4);
  heroImage.loading = 'eager';
  heroImage.fetchPriority = 'high';
  heroImage.decoding = 'sync';
}

const loader = document.querySelector('.loader');
const cover = new Image();
cover.onload = () => setTimeout(() => loader.classList.add('is-hidden'), 180);
cover.onerror = () => loader.classList.add('is-hidden');
cover.src = photoUrl(4);
setTimeout(() => loader.classList.add('is-hidden'), 3500);

const progress = document.querySelector('.progress span');
const header = document.querySelector('.site-header');
const update = () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${h > 0 ? scrollY / h * 100 : 0}%`;
  header.style.opacity = scrollY > 20 ? '1' : '.92';
};
addEventListener('scroll', update, {passive: true});
update();

document.querySelectorAll('[data-scroll]').forEach(el => el.onclick = () => document.querySelector(el.dataset.scroll)?.scrollIntoView({behavior:'smooth'}));

const themeObs = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) document.body.dataset.currentTheme = entry.target.dataset.theme;
}), {rootMargin:'-45% 0px -45% 0px'});
document.querySelectorAll('[data-theme]').forEach(section => themeObs.observe(section));

const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.animate([{opacity:0,transform:'translateY(34px)'},{opacity:1,transform:'translateY(0)'}], {duration:850,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});
  reveal.unobserve(entry.target);
}), {threshold:.08});
document.querySelectorAll('.frame,.chapter-heading,.manifesto p,.archive__head').forEach(el => {el.style.opacity='0'; reveal.observe(el);});

const cursor = document.querySelector('.cursor');
if (matchMedia('(pointer:fine)').matches) {
  addEventListener('mousemove', e => {cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`;});
  document.querySelectorAll('button,a').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
}

const box = document.querySelector('.lightbox');
const canvas = box.querySelector('.lightbox__canvas');
const counter = box.querySelector('.lightbox__count');
let current = 0;
function show(n) {
  current = (n + TOTAL) % TOTAL;
  counter.textContent = `${String(current + 1).padStart(2,'0')} / ${TOTAL}`;
  canvas.innerHTML = `<img src="${photoUrl(current + 1)}" width="720" height="1280" alt="Frame ${current + 1}">`;
  if (!box.open) box.showModal();
}
document.querySelectorAll('.photo-trigger').forEach(el => el.addEventListener('click', () => show(+el.dataset.photo - 1)));
box.querySelector('.lightbox__close').onclick = () => box.close();
box.querySelector('.lightbox__prev').onclick = () => show(current - 1);
box.querySelector('.lightbox__next').onclick = () => show(current + 1);
box.onclick = e => { if (e.target === box) box.close(); };
addEventListener('keydown', e => {
  if (!box.open) return;
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
  if (e.key === 'Escape') box.close();
});
