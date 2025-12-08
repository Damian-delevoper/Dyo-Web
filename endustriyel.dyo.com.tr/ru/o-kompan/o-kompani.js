document.addEventListener('DOMContentLoaded', function() {
    try {
        const mainSlider = new Swiper('#main-slider', {
            loop: true,
            speed: 600,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            mousewheel: {
                enabled: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            // Add observer to watch for dynamic changes
            observer: true,
            observeParents: true
        });

        const sliderContainer = document.querySelector('#main-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => mainSlider.autoplay.stop());
            sliderContainer.addEventListener('mouseleave', () => mainSlider.autoplay.start());
        }
        
        // Swiper initialized successfully
    } catch (error) {
        // Swiper initialization error (silent fail for production)
    }

    // ======================
    // MOBILE/TABLET NAVIGATION
    // ======================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuParents = document.querySelectorAll('.mobile-menu-parent');

    // Toggle mobile menu drawer
    if (mobileMenuToggle && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Toggle submenus in mobile menu
    mobileMenuParents.forEach(parent => {
        const link = parent.querySelector('.mobile-menu-link');
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                parent.classList.toggle('active');
            });
        }
    });
});