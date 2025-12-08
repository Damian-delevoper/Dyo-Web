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
        
        console.log('Enhanced Swiper initialized successfully');
    } catch (error) {
        console.error('Swiper initialization error:', error);
    }
});