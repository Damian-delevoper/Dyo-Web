/**
 * Unified Mobile Navigation Script
 * Works across all pages to provide consistent mobile bottom navigation
 */
(function() {
    'use strict';

    // Wait for DOM to be ready
    function initMobileNav() {
        // Mobile menu toggle functionality
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const mobileMenuParents = document.querySelectorAll('.mobile-menu-parent');
        
        // Exit if essential elements don't exist
        if (!mobileMenuOverlay) {
            return; // Mobile menu elements not present on this page
        }

        function openMobileMenu() {
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeMobileMenu() {
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                // Close all submenus
                Array.prototype.forEach.call(mobileMenuParents, function(parent) {
                    parent.classList.remove('active');
                });
            }
        }

        // Toggle mobile menu
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMobileMenu();
            });
        }

        // Close menu button
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

        // Toggle submenus in mobile menu (delegated + touch-safe)
        document.addEventListener('click', function(e) {
            const link = e.target.closest('.mobile-menu-link');
            if (!link || !mobileMenuOverlay || !mobileMenuOverlay.contains(link)) return;

            e.preventDefault();
            e.stopPropagation();

            const parent = link.closest('.mobile-menu-parent');
            if (!parent) return;
            parent.classList.toggle('active');
        });

        // Set active state for bottom navigation items
        function setActiveNavItem() {
            const navItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
            const currentPath = window.location.pathname;
            const currentHref = window.location.href;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            
            // Helper function to normalize paths
            function normalizePath(path) {
                if (!path) return '';
                // Remove hash and query strings
                path = path.split('#')[0].split('?')[0];
                // Remove leading/trailing slashes
                path = path.replace(/^\/+|\/+$/g, '');
                return path.toLowerCase();
            }
            
            // Get normalized current path parts
            const currentParts = normalizePath(currentPath).split('/').filter(function(p) { return p; });
            const isHomePage = currentPage === 'index.html' || currentPage === '' || currentPath.endsWith('/') || currentParts.length === 0;
            
            Array.prototype.forEach.call(navItems, function(item) {
                item.classList.remove('active');
                const href = item.getAttribute('href');
                
                if (!href) return; // Skip buttons without href
                
                // Skip anchor-only links for active state (they're for navigation, not page indicators)
                if (href.startsWith('#')) {
                    return;
                }
                
                // Normalize the href path
                const normalizedHref = normalizePath(href);
                const hrefParts = normalizedHref.split('/').filter(function(p) { return p; });
                
                // Check for homepage match
                if (normalizedHref === 'index.html' || normalizedHref === '' || hrefParts.length === 0) {
                    if (isHomePage) {
                        item.classList.add('active');
                    }
                    return;
                }
                
                // Check if current path matches href path
                // Match if the last part of current path matches last part of href
                const currentLastPart = currentParts[currentParts.length - 1] || '';
                const hrefLastPart = hrefParts[hrefParts.length - 1] || '';
                
                if (currentLastPart === hrefLastPart && hrefLastPart !== '') {
                    item.classList.add('active');
                    return;
                }
                
                // Check for directory matches (e.g., o-kompan)
                if (hrefParts.length > 0) {
                    const hrefDir = hrefParts[hrefParts.length - 1].replace('.html', '');
                    const currentDir = currentParts[currentParts.length - 1] ? currentParts[currentParts.length - 1].replace('.html', '') : '';
                    
                    if (hrefDir === currentDir && hrefDir !== '' && hrefDir !== 'index') {
                        item.classList.add('active');
                        return;
                    }
                    
                    // Also check parent directories
                    if (currentParts.includes(hrefDir) && hrefDir !== 'index' && hrefDir !== '') {
                        item.classList.add('active');
                        return;
                    }
                }
            });
        }

        // Run active state detection
        setActiveNavItem();

        // Smooth scroll for anchor links
        const anchorLinks = document.querySelectorAll('.mobile-bottom-nav a[href^="#"]');
        Array.prototype.forEach.call(anchorLinks, function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Close menu if open
                        closeMobileMenu();
                    }
                }
            });
        });
    }

    // Initialize when DOM is ready
    // Mark as initialized to prevent double initialization
    let initialized = false;
    
    function runInit() {
        if (initialized) return;
        
        try {
            initMobileNav();
            initialized = true;
        } catch (e) {
            // Silently fail in production
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runInit);
    } else {
        // DOM already loaded, run immediately
        runInit();
    }
})();

