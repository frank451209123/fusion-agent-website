document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(15, 23, 42, 0.98)';
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .use-case-card, .deployment-card');
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                if (window.innerWidth <= 968) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = function() {
        statNumbers.forEach(function(stat) {
            const text = stat.textContent;
            const number = parseFloat(text);
            const suffix = text.replace(/[0-9.]/g, '');
            
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = text;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            }
        });
    };

    let statsAnimated = false;
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-copyright');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} FusionAgent. All rights reserved.`;
    }
});
