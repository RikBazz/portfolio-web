// Navigazione tra pagine (single-page app light)
const pages = document.querySelectorAll('.page');

function goTo(id) {
  if (!pages.length) return;
  pages.forEach(page => page.classList.remove('active'));
  const target = document.getElementById(id);
  if (!target) {
    console.warn('goTo: page non trovata', id);
    return;
  }
  target.classList.add('active');
}

// Galleria carrello laterale nel progetto singolo
let galleryIndex = 0;

function galleryMove(step) {
  const track = document.getElementById('gallery-track');
  if (!track) return;
  const slides = track.children;
  if (!slides.length) return;
  galleryIndex = (galleryIndex + step + slides.length) % slides.length;
  track.style.transform = `translateX(-${galleryIndex * 100}%)`;
}

// Inizializza la pagina attiva allʼavvio
window.addEventListener('load', () => {
  if (!document.getElementById('home').classList.contains('active')) {
    goTo('home');
  }
});
