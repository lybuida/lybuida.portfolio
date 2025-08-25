/* Smooth scroll for header nav */
document.querySelectorAll('.nav a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null, '', id);
    }
  });
});

/* Active state on scroll */
const sections = ['#ba', '#da', '#about', '#contact']
  .map(sel => document.querySelector(sel))
  .filter(Boolean);

const navMap = new Map();
document.querySelectorAll('.nav a').forEach(a=>{
  navMap.set(a.getAttribute('href'), a);
});

const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = '#'+entry.target.id;
    const link = navMap.get(id);
    if(!link) return;
    if(entry.isIntersecting){
      document.querySelectorAll('.nav a').forEach(n=>n.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, {rootMargin: '-40% 0px -55% 0px', threshold: 0});

sections.forEach(sec => io.observe(sec));

/* -------- Lightbox -------- */
(function(){
  const lb = document.getElementById('lightbox');
  if(!lb) return;

  const imgEls = Array.from(document.querySelectorAll('.project-media img'));
  if(imgEls.length === 0) return;

  const stageImg = lb.querySelector('.lb-img');
  const counter = lb.querySelector('#lbCounter');
  const btnClose = lb.querySelector('.lb-close');
  const btnPrev = lb.querySelector('.lb-prev');
  const btnNext = lb.querySelector('.lb-next');

  let current = 0;

  function open(index){
    current = index;
    const src = imgEls[current].getAttribute('src');
    const alt = imgEls[current].getAttribute('alt') || '';
    stageImg.src = src;
    stageImg.alt = alt;
    counter.textContent = `${current+1} / ${imgEls.length}`;
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function close(){
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }
  function prev(){
    current = (current - 1 + imgEls.length) % imgEls.length;
    open(current);
  }
  function next(){
    current = (current

