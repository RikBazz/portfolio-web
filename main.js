/* ════════════════════════════════════════
   RICCARDO BAZZONI — main.js
   ════════════════════════════════════════ */

/* ── PROJECTS DATA ──────────────────────
   Per ogni progetto:
   - title:   titolo mostrato nella pagina singola
   - desc:    testo descrizione
   - details: testo dettagli tecnici
   - slides:  array di oggetti { src, objectFit, transform, transformOrigin }
              objectFit: 'contain' | 'cover'
              transform/transformOrigin: per zoom (opzionali)
   ──────────────────────────────────────── */
const PROJECTS = {
  'calligramma': {
    title: 'Calligramma',
    desc: 'Questo progetto nasce dall\'esigenza di comunicare in modo chiaro e diretto. L\'approccio creativo ha guidato ogni scelta visiva, dal colore alla tipografia.',
    details: 'Stack: Figma, HTML/CSS. Durata: 3 settimane.',
    slides: [
      { src: 'img/calligramma.jpg', objectFit: 'contain' },
      { src: 'img/calligramma.jpg', objectFit: 'cover', transform: 'scale(1.35)', transformOrigin: '70% 30%' },
      { src: 'img/calligramma.jpg', objectFit: 'cover', transform: 'scale(1.5)',  transformOrigin: '30% 70%' },
    ]
  },
  'web-app': {
    title: 'Web App Dashboard',
    desc: 'Interfaccia admin per piattaforma SaaS: UX research, wireframe e sviluppo completo.',
    details: 'Stack: React, Tailwind, Node.js. Durata: 5 settimane.',
    slides: [
      { src: '', objectFit: 'cover' }, // placeholder — sostituisci con il path reale
      { src: '', objectFit: 'cover' },
      { src: '', objectFit: 'cover' },
    ]
  },
  'motion': {
    title: 'Motion & Visual',
    desc: 'Serie di animazioni e loop grafici per campagna social di brand lifestyle.',
    details: 'Tool: After Effects, Illustrator. Durata: 2 settimane.',
    slides: [
      { src: '', objectFit: 'cover' },
      { src: '', objectFit: 'cover' },
      { src: '', objectFit: 'cover' },
    ]
  },
  'type': {
    title: 'Type Specimen',
    desc: 'Studio tipografico sperimentale: creazione di un carattere personalizzato display.',
    details: 'Tool: Glyphs, Figma. Durata: 4 settimane.',
    slides: [
      { src: '', objectFit: 'cover' },
      { src: '', objectFit: 'cover' },
      { src: '', objectFit: 'cover' },
    ]
  },
};


/* ── NAVIGATION ─────────────────────────── */
let prevPage = 'home';

function goTo(pageId, projectId) {
  const current = document.querySelector('.page.active');
  if (current) prevPage = current.id;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);

  if (pageId === 'progetto-singolo' && projectId) {
    loadProject(projectId);
  }

  if (pageId === 'contatti') {
    const showBack = (prevPage === 'progetti' || prevPage === 'progetto-singolo');
    document.getElementById('btn-torna-progetti').style.display = showBack ? '' : 'none';
  }
}


/* ── PROJECT LOADER ─────────────────────── */
function loadProject(projectId) {
  const data = PROJECTS[projectId];
  if (!data) return;

  document.getElementById('singolo-title').textContent = data.title;
  document.getElementById('singolo-h2').textContent = data.title;
  document.getElementById('singolo-desc').textContent = data.desc;
  document.getElementById('singolo-details').textContent = data.details;

  // Build slides
  const track = document.getElementById('gallery-track');
  const dotsEl = document.getElementById('gallery-dots');
  track.innerHTML = '';
  dotsEl.innerHTML = '';

  data.slides.forEach((slide, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-slide';

    if (slide.src) {
      const img = document.createElement('img');
      img.src = slide.src;
      img.alt = data.title;
      img.style.objectFit = slide.objectFit || 'cover';
      img.style.background = 'var(--black)';
      if (slide.transform)       img.style.transform = slide.transform;
      if (slide.transformOrigin) img.style.transformOrigin = slide.transformOrigin;
      div.appendChild(img);
    } else {
      // placeholder X
      const ph = document.createElement('div');
      ph.className = 'img-ph';
      div.appendChild(ph);
    }

    track.appendChild(div);

    const dot = document.createElement('div');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => galleryGo(i);
    dotsEl.appendChild(dot);
  });

  galleryReset();
}


/* ── GALLERY ─────────────────────────────── */
let gIdx = 0;

function galleryReset() {
  gIdx = 0;
  updateGallery();
}
function galleryMove(d) {
  const total = document.querySelectorAll('.gallery-slide').length;
  gIdx = (gIdx + d + total) % total;
  updateGallery();
}
function galleryGo(i) {
  gIdx = i;
  updateGallery();
}
function updateGallery() {
  document.getElementById('gallery-track').style.transform = `translateX(-${gIdx * 100}%)`;
  document.querySelectorAll('.gallery-dot').forEach((d, i) => {
    d.classList.toggle('active', i === gIdx);
  });
}

// Touch swipe
let tx0 = 0;
const gWrap = document.querySelector('.singolo-gallery');
gWrap.addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; }, { passive: true });
gWrap.addEventListener('touchend', e => {
  const d = tx0 - e.changedTouches[0].clientX;
  if (Math.abs(d) > 40) galleryMove(d > 0 ? 1 : -1);
});
