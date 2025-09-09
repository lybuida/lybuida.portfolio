/* ===== Year in footer ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Header shadow on scroll ===== */
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 8) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
onScroll(); window.addEventListener('scroll', onScroll);

/* ===== Smooth scroll + active nav ===== */
const navLinks = [...document.querySelectorAll('.nav-link')];
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
    history.replaceState(null, '', a.getAttribute('href'));
  });
});
const sections = ['#about','#skills','#projects','#contact'].map(s=>document.querySelector(s));

const navMap = new Map(navLinks.map(a => [a.getAttribute('href'), a]));
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = '#'+entry.target.id;
    const link = navMap.get(id);
    if (!link) return;
    if (entry.isIntersecting){
      navLinks.forEach(l=>l.classList.remove('active'));
      link.classList.add('active');
    }
  });
},{rootMargin:'-45% 0px -45% 0px', threshold:0});
sections.forEach(s=>s&&io.observe(s));

/* ===== Reveal on scroll ===== */
const revealEls = document.querySelectorAll('.reveal');
const ioReveal = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); ioReveal.unobserve(e.target);} });
},{threshold:0.15});
revealEls.forEach(el=>ioReveal.observe(el));

/* ===== Project filter ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c=>{
      const show = f === 'all' || c.dataset.category === f;
      c.style.display = show ? '' : 'none';
    });
  });
});

/* ===== Pointer parallax for background ===== */
const bg = document.querySelector('.animated-bg');
window.addEventListener('pointermove', (e)=>{
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  bg.style.setProperty('--mx', `${x}%`);
  bg.style.setProperty('--my', `${y}%`);
});

/* ===== Subtle tilt for cards ===== */
const tiltEls = document.querySelectorAll('.tilt');
tiltEls.forEach(el=>{
  const strength = 10; // deg
  el.addEventListener('pointermove', (e)=>{
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${-py*strength}deg) rotateY(${px*strength}deg)`;
  });
  el.addEventListener('pointerleave', ()=>{ el.style.transform = ''; });
});

/* ===== Accessibility: reduce motion ===== */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.tilt, .hero-card').forEach(el=>el.style.animation='none');
}


