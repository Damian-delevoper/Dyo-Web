(function() {
    var navToggle = document.getElementById('nav-toggle');
    var navOverlay = document.querySelector('.nav-overlay');
    var navLinks = document.querySelectorAll('nav.main-nav a');
    if (!navToggle) return;

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
        if (e.key === 'Escape') {
            closeNav();
        }
    });
})();

