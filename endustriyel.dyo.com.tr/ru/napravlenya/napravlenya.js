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
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
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
            observeParents: true,
            on: {
                init: function() {
                    updateSlideCounter(this);
                    updateProgressBar(this);
                },
                slideChange: function() {
                    updateSlideCounter(this);
                    updateProgressBar(this);
                },
                autoplayTimeLeft: function(swiper, timeLeft, percentage) {
                    updateProgressBar(swiper, percentage);
                }
            }
        });

        // Enhanced slider functionality
        function updateSlideCounter(swiper) {
            const currentSlideEl = document.querySelector('.current-slide');
            const totalSlidesEl = document.querySelector('.total-slides');
            
            if (currentSlideEl && totalSlidesEl) {
                const realIndex = swiper.realIndex + 1;
                const totalSlides = swiper.slides.length;
                
                currentSlideEl.textContent = realIndex;
                totalSlidesEl.textContent = totalSlides;
            }
        }

        function updateProgressBar(swiper, percentage = null) {
            const progressBar = document.querySelector('.slider-progress-bar');
            if (progressBar) {
                if (percentage !== null) {
                    // Update based on autoplay progress
                    progressBar.style.width = (100 - percentage) + '%';
                } else {
                    // Update based on slide position
                    const progress = ((swiper.realIndex + 1) / swiper.slides.length) * 100;
                    progressBar.style.width = progress + '%';
                }
            }
        }

        // Enhanced hover effects
        const sliderContainer = document.querySelector('#main-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                mainSlider.autoplay.stop();
                // Add hover class for additional effects
                sliderContainer.classList.add('slider-hover');
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                mainSlider.autoplay.start();
                sliderContainer.classList.remove('slider-hover');
            });
        }

        // Add touch/swipe support for mobile
        if ('ontouchstart' in window) {
            sliderContainer.addEventListener('touchstart', function(e) {
                mainSlider.autoplay.stop();
            });
            
            sliderContainer.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    mainSlider.autoplay.start();
                }, 2000);
            });
        }
        
        console.log('Enhanced Swiper initialized successfully');
    } catch (error) {
        console.error('Swiper initialization error:', error);
    }
});