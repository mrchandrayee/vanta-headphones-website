const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// Mobile navigation
$('.menu-toggle').addEventListener('click', () => $('.nav-links').classList.toggle('open'));
$$('.nav-links a').forEach(a => a.addEventListener('click', () => $('.nav-links').classList.remove('open')));

// Reveal sections as they enter the viewport
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
}, {threshold: .12});
$$('.reveal').forEach(el => revealObserver.observe(el));

// Gesture demo tabs
const gestureContent = {
  tap: ['DOUBLE TAP / PLAY-PAUSE', 'Tap the touch surface to play or pause', '42%'],
  swipe: ['SWIPE / VOLUME CONTROL', 'Swipe up or down to adjust your volume', '68%'],
  hold: ['PRESS & HOLD / VOICE ASSISTANT', 'Hold the cup to talk to your assistant', '82%'],
  cover: ['COVER / TRANSPARENCY MODE', 'Cover the cup to hear the world around you', '100%']
};
$$('.gesture').forEach(btn => btn.addEventListener('click', () => {
  $$('.gesture').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected','false'); });
  btn.classList.add('active'); btn.setAttribute('aria-selected','true');
  const [title,status,progress] = gestureContent[btn.dataset.gesture];
  $('#demo-title').textContent = title; $('#demo-status').textContent = status; $('.demo-progress span').style.width = progress;
  $('.earcup').classList.remove('active'); void $('.earcup').offsetWidth; $('.earcup').classList.add('active');
}));
$('.earcup').addEventListener('click', () => {
  $('.earcup').classList.toggle('active');
  $('#demo-status').textContent = $('.earcup').classList.contains('active') ? 'Touch gesture detected ✓' : 'Touch surface ready';
});

// Colour selection
let selectedColor = 'Graphite';
$$('.swatch').forEach(btn => btn.addEventListener('click', () => {
  $$('.swatch').forEach(s => s.classList.remove('selected'));
  btn.classList.add('selected'); selectedColor = btn.dataset.color;
  $('#selected-color').textContent = `${selectedColor.toUpperCase()} EDITION`;
  $('#modal-color').textContent = selectedColor;
  const tones = {Graphite:'#17191f', Bone:'#e5d9c8', Midnight:'#253d82'};
  $('.hero-product').style.filter = `contrast(1.1) brightness(.75) drop-shadow(0 0 35px ${tones[selectedColor]}55)`;
}));

// Purchase modal (demo only)
const modal = $('#purchase-modal');
function openModal(){ $('#modal-color').textContent=selectedColor; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
$('#buy-button').addEventListener('click',openModal);
$$('.nav-actions .pill-button').forEach(btn=>btn.addEventListener('click', e=>{e.preventDefault();openModal()}));
$('.modal-close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
$('.modal-confirm').addEventListener('click',()=>{closeModal();showToast('Demo checkout — payment is not connected.')});
$('#compare-button').addEventListener('click',()=>showToast('VANTA Pro · 40h battery · 45 dB ANC · 249 g'));
let toastTimer;
function showToast(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2800)}
