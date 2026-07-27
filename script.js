const TOTAL=29;
const pad=n=>String(n).padStart(2,'0');
const photoUrl=n=>`assets/images/${pad(n)}.webp`;
let current=1;

function setPhoto(element,number,contain=false){
  element.dataset.photo=number;
  element.style.backgroundImage=`url('${photoUrl(number)}')`;
  element.style.backgroundSize=contain?'contain':'cover';
  element.style.backgroundPosition='center';
  element.style.backgroundRepeat='no-repeat';
  element.addEventListener('click',()=>openBox(number));
}

function buildGallery(){
  document.querySelectorAll('.grid').forEach(grid=>{
    grid.dataset.photos.split(',').map(Number).forEach(number=>{
      const button=document.createElement('button');
      button.className='photo';
      button.setAttribute('aria-label',`Открыть кадр ${number}`);
      grid.appendChild(button);
      setPhoto(button,number);
    });
  });

  const archive=document.querySelector('#archiveGrid');
  for(let number=1;number<=TOTAL;number++){
    const item=document.createElement('div');
    item.className='archive__item';
    const button=document.createElement('button');
    button.className='photo';
    button.setAttribute('aria-label',`Открыть кадр ${number}`);
    const label=document.createElement('span');
    label.textContent=pad(number);
    item.append(button,label);
    archive.appendChild(item);
    setPhoto(button,number);
  }

  setPhoto(document.querySelector('.hero__photo'),4);
}

const box=document.querySelector('#lightbox');
const boxPhoto=document.querySelector('.lightbox__photo');
const counter=document.querySelector('#counter');
const caption=document.querySelector('#caption');

function openBox(number){
  current=number;
  boxPhoto.style.backgroundImage=`url('${photoUrl(number)}')`;
  boxPhoto.style.backgroundSize='contain';
  boxPhoto.style.backgroundPosition='center';
  boxPhoto.style.backgroundRepeat='no-repeat';
  counter.textContent=`${pad(number)} / ${TOTAL}`;
  caption.textContent=`Кадр ${pad(number)}`;
  if(!box.open) box.showModal();
}

document.querySelector('.close').onclick=()=>box.close();
document.querySelector('.prev').onclick=()=>openBox(current===1?TOTAL:current-1);
document.querySelector('.next').onclick=()=>openBox(current===TOTAL?1:current+1);
box.addEventListener('click',event=>{if(event.target===box)box.close()});
addEventListener('keydown',event=>{
  if(!box.open)return;
  if(event.key==='Escape')box.close();
  if(event.key==='ArrowLeft')openBox(current===1?TOTAL:current-1);
  if(event.key==='ArrowRight')openBox(current===TOTAL?1:current+1);
});

buildGallery();
const cover=new Image();
cover.onload=()=>document.querySelector('#loader').classList.add('is-hidden');
cover.onerror=()=>document.querySelector('#loader').classList.add('is-hidden');
cover.src=photoUrl(4);
setTimeout(()=>document.querySelector('#loader').classList.add('is-hidden'),4000);
