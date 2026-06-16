document.addEventListener('DOMContentLoaded', () => {

    /* 1. EINBLEND-ANIMATION (Intersection Observer) */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });


    /* 2. MOBILE MENÜ STEUERUNG (Smartphone Burger-Menü) */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('mobile-active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Schließen beim Klick auf Link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }


    /* 3. AKTIVEN MENÜPUNKT BEIM SCROLLEN AUTOMATISCH HERVORHEBEN */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 140)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});