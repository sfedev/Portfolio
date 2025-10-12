const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.querySelector('.menu-icon');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('active');
    menuIcon?.classList.toggle('active');
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu?.classList.remove('active');
        menuIcon?.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!mobileMenu?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
        mobileMenu?.classList.remove('active');
        menuIcon?.classList.remove('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar').forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) observer.observe(skillsSection);
