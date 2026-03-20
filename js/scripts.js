
// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
reveals.forEach(el => obs.observe(el));

// ── Hero entrance ──
document.addEventListener('DOMContentLoaded', () => {
  const heroItems = document.querySelectorAll('.hero-content > *');
  heroItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 100);
  });
});

// ── Formulario de contacto ──
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formMsg = document.getElementById('form-msg');

form.addEventListener('submit', async e => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  const data = {
    name:    form.name.value,
    email:   form.email.value,
    subject: form.subject.value,
    //budget:  form.budget.value,
    message: form.message.value,
  };

  // Envio de correo usando el servicio de Formspree
  //await new Promise(r => setTimeout(r, 1200));

  try {
    const res = await fetch('https://formspree.io/f/mojkkooz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error();
  } catch {
    showMsg('error', '¡Oops! Algo salió mal. Intenta de nuevo.');
    submitBtn.disabled = false; submitBtn.textContent = 'Enviar mensaje'; return;
  }

  showMsg('success', '¡Gracias por escribirme! Te responderé pronto. 🎉');
  form.reset();
  submitBtn.disabled = false;
  submitBtn.textContent = 'Enviar mensaje';
});

function showMsg(type, text) {
  formMsg.className = `form-message ${type}`;
  formMsg.textContent = text;
  formMsg.style.display = 'block';
  setTimeout(() => { formMsg.style.display = 'none'; }, 6000);
}

// Enlaces de navegación
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => { a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : ''; });
});

// ── Menú hamburguesa ──
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});