document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuSwitch = document.getElementById('menu-switch');
    const mainMenu = document.getElementById('main-menu');
    
    if (menuSwitch && mainMenu) {
        // Use both touch and click for better mobile responsiveness
        let touchHandled = false;
        
        menuSwitch.addEventListener('touchstart', function(e) {
            touchHandled = true;
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('open');
            mainMenu.classList.toggle('active');
            document.body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
            // Prevent click event from firing
            setTimeout(() => { touchHandled = false; }, 300);
        }, { passive: false });
        
        menuSwitch.addEventListener('click', function(e) {
            if (!touchHandled) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('open');
                mainMenu.classList.toggle('active');
                document.body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#header') && mainMenu.classList.contains('active')) {
                menuSwitch.classList.remove('open');
                mainMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle submenu toggle on mobile
        const subMenuItems = mainMenu.querySelectorAll('.has-sub-menu > a');
        subMenuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    
                    // Close other submenus
                    mainMenu.querySelectorAll('.has-sub-menu').forEach(menu => {
                        if (menu !== parent) {
                            menu.classList.remove('active');
                        }
                    });
                    
                    // Toggle current submenu
                    parent.classList.toggle('active');
                }
            });
        });
        
        // Close menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainMenu.classList.contains('active')) {
                menuSwitch.classList.remove('open');
                mainMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
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
        
        console.log('Swiper initialized successfully');
    } catch (error) {
        console.error('Swiper initialization error:', error);
    }
});