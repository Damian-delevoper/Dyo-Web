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
});