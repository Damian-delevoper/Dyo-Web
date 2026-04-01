(function() {
    // Desktop navigation toggle
    var navToggle = document.getElementById('nav-toggle');
    var navOverlay = document.querySelector('.nav-overlay');
    var navLinks = document.querySelectorAll('nav.main-nav a');
    var subMenuParents = document.querySelectorAll('nav.main-nav .has-sub-menu');
    
    if (navToggle) {
        function closeNav() {
            navToggle.checked = false;
        }

        if (navOverlay) {
            navOverlay.addEventListener('click', closeNav);
        }

        navLinks.forEach(function(link) {
            link.addEventListener('click', closeNav);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navToggle.checked) {
                closeNav();
            }
        });
    }

    // Click fallback for submenu opening (works on touch/non-hover devices too)
    if (subMenuParents.length) {
        function closeAllSubMenus() {
            subMenuParents.forEach(function(parent) {
                parent.classList.remove('open');
            });
        }

        subMenuParents.forEach(function(parent) {
            var trigger = parent.querySelector('a');
            if (!trigger) return;

            trigger.addEventListener('click', function(e) {
                var isOpen = parent.classList.contains('open');
                var hasHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;

                // On touch/no-hover devices, first tap opens submenu, second tap follows link
                // On hover devices, preserve normal navigation behavior.
                if (!hasHover || !isOpen) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeAllSubMenus();
                    parent.classList.add('open');
                }
            });
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav.main-nav')) {
                closeAllSubMenus();
            }
        });
    }

    // Homepage directions slider
    if (typeof window.Swiper !== 'undefined') {
        var solutionsSliderEl = document.getElementById('solutions-slider');
        if (solutionsSliderEl) {
            new Swiper('#solutions-slider', {
                slidesPerView: 1,
                spaceBetween: 16,
                loop: true,
                speed: 550,
                autoplay: {
                    delay: 4500,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: '.solutions-next',
                    prevEl: '.solutions-prev'
                },
                pagination: {
                    el: '.solutions-pagination',
                    clickable: true
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        centeredSlides: false
                    },
                    1024: {
                        slidesPerView: 1
                    },
                    1367: {
                        slidesPerView: 1
                    }
                }
            });
        }
    }

    // Mobile/Tablet menu functionality is handled by mobile-nav.js
    // This script only handles desktop navigation toggle
})();








