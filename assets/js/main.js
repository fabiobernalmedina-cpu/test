/* ── PubGolfClub — main.js ── */

// Infinite slider: duplicate content for seamless loop
const sliderInner = document.getElementById('sliderInner');
if (sliderInner) {
  sliderInner.innerHTML += sliderInner.innerHTML;
}


// Nav: add background on scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
  // init on load
  if (window.scrollY > 20) nav.classList.add('scrolled');
}

// Nav: hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  // Close when a link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Nav: mark active link based on current page
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link:not(.nav__link--cta)').forEach(link => {
  const href = link.getAttribute('href') || '';
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Scroll animations: fade-up elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Contact form: Netlify Forms submission with fetch
const contactForm    = document.getElementById('contactForm');
const formSuccess    = document.getElementById('formSuccess');
const submitBtn      = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(contactForm);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wordt verzonden…';
    }

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });

      contactForm.reset();
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } catch (err) {
      alert('Er is iets misgegaan. Probeer het opnieuw of mail ons direct.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Verstuur bericht →';
      }
    }
  });
}
