// ========================
// JUNREY OLIS — PORTFOLIO JS
// ========================

document.addEventListener('DOMContentLoaded', () => {

    // ─── NAV SCROLL EFFECT ───────────────────────────────
    const nav = document.getElementById('nav');
    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ─── HAMBURGER / MOBILE MENU ─────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const spans = hamburger.querySelectorAll('span');
            const isOpen = mobileMenu.classList.contains('open');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // ─── HERO ENTRANCE ANIMATIONS ────────────────────────
    const revealEls = document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3');
    setTimeout(() => {
        revealEls.forEach(el => el.classList.add('animated'));
    }, 100);

    // ─── INTERSECTION OBSERVER ────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Animate skill bars
                const bars = entry.target.querySelectorAll('.skill-fill');
                bars.forEach(bar => bar.classList.add('animated'));

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    // Observe sections for fade-in
    document.querySelectorAll('.about-card, .highlight-item, .cert-card, .project-card, .skill-group').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(el);
    });

    // Observe skill sections for bar animation
    document.querySelectorAll('.skills-grid').forEach(el => {
        observer.observe(el);
    });

    // ─── ACTIVE NAV LINK ON SCROLL ───────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => navObserver.observe(section));

    // ─── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // ─── FORM INTERACTION ────────────────────────────────
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // ─── CURSOR GLOW EFFECT ──────────────────────────────
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(126,184,201,0.04) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
        top: 0; left: 0;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // ─── AUTO-DISMISS MESSAGES ────────────────────────────
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => {
        setTimeout(() => {
            msg.style.transition = 'opacity 0.5s, transform 0.5s';
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(-10px)';
            setTimeout(() => msg.remove(), 500);
        }, 5000);
    });

    // ─── STAGGER CARD ANIMATIONS ─────────────────────────
    const staggerGroups = document.querySelectorAll('.certs-grid, .projects-grid');
    staggerGroups.forEach(group => {
        const cards = group.querySelectorAll('.cert-card, .project-card');
        cards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.08}s`;
        });
    });

    console.log('✨ Portfolio by Junrey Olis — olisjun0@gmail.com');
});
