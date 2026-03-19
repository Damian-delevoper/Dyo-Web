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

    // Mobile/Tablet menu functionality is handled by mobile-nav.js
    // This script only handles desktop navigation toggle
})();








