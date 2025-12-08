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
        
        // Swiper initialized successfully
    } catch (error) {
        // Swiper initialization error (silent fail for production)
    }

    // ======================
    // MOBILE/TABLET NAVIGATION
    // ======================
    const mobileBottomNav = document.getElementById('mobile-bottom-nav');

    // Ensure mobile bottom nav is visible on mobile/tablet devices
    // This is a fallback in case CSS doesn't load properly
    function ensureMobileNavVisible() {
        if (!mobileBottomNav) return;
        
        const width = window.innerWidth || document.documentElement.clientWidth;
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTabletDevice = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
        
        // Show on mobile/tablet devices OR if screen width is <= 1366px
        if ((isMobileDevice || isTabletDevice || width <= 1366) && width < 1367) {
            // Use setProperty with !important to override any conflicting styles
            mobileBottomNav.style.setProperty('display', 'flex', 'important');
            mobileBottomNav.style.setProperty('visibility', 'visible', 'important');
            mobileBottomNav.style.setProperty('opacity', '1', 'important');
            mobileBottomNav.style.setProperty('position', 'fixed', 'important');
            mobileBottomNav.style.setProperty('bottom', '0', 'important');
            mobileBottomNav.style.setProperty('left', '0', 'important');
            mobileBottomNav.style.setProperty('right', '0', 'important');
            mobileBottomNav.style.setProperty('z-index', '10000', 'important');
            mobileBottomNav.style.setProperty('height', '60px', 'important');
            mobileBottomNav.style.setProperty('width', '100%', 'important');
            mobileBottomNav.style.setProperty('background', '#ffffff', 'important');
            document.body.style.setProperty('padding-bottom', '60px', 'important');
        } else if (width >= 1367) {
            mobileBottomNav.style.setProperty('display', 'none', 'important');
            document.body.style.setProperty('padding-bottom', '0', 'important');
        }
    }

    // Run immediately when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureMobileNavVisible);
    } else {
        ensureMobileNavVisible();
    }
    
    // Also run after a short delay to ensure CSS has loaded
    setTimeout(ensureMobileNavVisible, 100);

    // Handle window resize and orientation changes (important for real devices)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(ensureMobileNavVisible, 250);
    });

    // Handle orientation change (specific to mobile devices)
    window.addEventListener('orientationchange', function() {
        setTimeout(ensureMobileNavVisible, 100);
    });

    // Setup mobile menu functionality
    function setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const mobileMenuParents = document.querySelectorAll('.mobile-menu-parent');
        
        if (!mobileMenuOverlay) return; // Exit if overlay doesn't exist
        
        function closeMobileMenu() {
            const overlay = document.getElementById('mobile-menu-overlay');
            if (overlay) {
                overlay.classList.remove('active');
                document.body.style.setProperty('overflow', '', 'important');
            }
        }

        function openMobileMenu() {
            const overlay = document.getElementById('mobile-menu-overlay');
            if (overlay) {
                overlay.classList.add('active');
                document.body.style.setProperty('overflow', 'hidden', 'important');
            }
        }

        // Toggle mobile menu drawer - use event delegation to avoid issues
        if (mobileMenuToggle) {
            // Remove old listener by cloning
            const newToggle = mobileMenuToggle.cloneNode(true);
            mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
            
            // Add fresh event listener
            newToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                openMobileMenu();
            }, true); // Use capture phase
        }

        // Close mobile menu button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        // Close menu when clicking overlay background
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function(e) {
                if (e.target === mobileMenuOverlay) {
                    closeMobileMenu();
                }
            });
        }

        // Close menu on Escape key (only add once)
        if (!document.mobileMenuEscapeListener) {
            document.addEventListener('keydown', function(e) {
                const overlay = document.getElementById('mobile-menu-overlay');
                if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
            document.mobileMenuEscapeListener = true;
        }

        // Toggle submenus in mobile menu
        if (mobileMenuParents && mobileMenuParents.length > 0) {
            mobileMenuParents.forEach(parent => {
                const link = parent.querySelector('.mobile-menu-link');
                if (link) {
                    // Remove old listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        parent.classList.toggle('active');
                    });
                }
            });
        }
    }

    // Setup menu - try multiple times to ensure elements are loaded
    setupMobileMenu();
    setTimeout(setupMobileMenu, 100);
    setTimeout(setupMobileMenu, 500);
    
    // Also try when DOM is fully loaded
    if (document.readyState === 'complete') {
        setupMobileMenu();
    } else {
        window.addEventListener('load', setupMobileMenu);
    }
});