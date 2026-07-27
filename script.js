const total=29;
const pad=n=>String(n).padStart(2,'0');
const source=index=>`assets/images/${pad(index+1)}.webp`;

const dialog=document.querySelector('#lightbox');
const image=document.querySelector('#lightboxImage');
const counter=document.querySelector('#lightboxCounter');
let current=0;

function show(index){
  current=(index+total)%total;
  image.src=source(current);
  image.alt=`Фотография ${current+1} крупным планом`;
  counter.textContent=`${pad(current+1)} / ${total}`;
  if(!dialog.open)dialog.showModal();
}

document.querySelectorAll('.shot').forEach(button=>{
  button.addEventListener('click',()=>show(Number(button.dataset.index)));
});

document.querySelector('.lightbox__close').addEventListener('click',()=>dialog.close());
document.querySelector('.lightbox__prev').addEventListener('click',()=>show(current-1));
document.querySelector('.lightbox__next').addEventListener('click',()=>show(current+1));
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});

addEventListener('keydown',event=>{
  if(!dialog.open)return;
  if(event.key==='Escape')dialog.close();
  if(event.key==='ArrowLeft')show(current-1);
  if(event.key==='ArrowRight')show(current+1);
});
