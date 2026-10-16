const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.querySelector('.menu-icon');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

function setMenuOpen(open) {
    mobileMenu?.classList.toggle('active', open);
    menuIcon?.classList.toggle('active', open);
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    mobileMenuBtn?.setAttribute('aria-expanded', String(open));
    mobileMenuBtn?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.contains('active');
    setMenuOpen(!isOpen);
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('click', (e) => {
    if (!mobileMenu?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
        setMenuOpen(false);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.skill-bar').forEach(bar => {
            const width = bar.dataset.width;
            bar.style.width = width ? `${width}%` : '0%';
        });
        observer.unobserve(entry.target);
    });
}, { threshold: 0.35 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    if (prefersReducedMotion) {
        skillsSection.querySelectorAll('.skill-bar').forEach(bar => {
            const width = bar.dataset.width;
            bar.style.width = width ? `${width}%` : '0%';
        });
    } else {
        observer.observe(skillsSection);
    }
}
