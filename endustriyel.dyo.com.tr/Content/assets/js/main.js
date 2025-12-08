document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // SEARCH MODAL FUNCTIONALITY
    // ======================
    const searchIcon = document.getElementById('search-icon');
    const closeIcon = document.getElementById('close-icon');
    const modal = document.getElementById('search-modal');
    const searchInput = document.querySelector('.modal-content input[type="text"]');
    const searchForm = document.getElementById('search-form');
    
    // Exit early if search elements don't exist
    if (!searchIcon || !modal || !searchForm) {
        console.log('Search functionality not available - elements not found');
        // Continue with other functionality
    } else {

        // Toggle modal visibility
        function toggleModal() {
            if (modal.classList.contains('show')) {
                // Closing animation
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Restore scrolling
                }, 300);
                
                // Icon states
                if (searchIcon) searchIcon.style.opacity = '1';
                if (closeIcon) closeIcon.style.opacity = '0';
            } else {
                // Opening animation
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                
                setTimeout(() => {
                    modal.classList.add('show');
                    if (searchInput) searchInput.focus();
                    
                    // Mobile keyboard handling
                    if ('virtualKeyboard' in navigator) {
                        navigator.virtualKeyboard.show();
                    } else if (window.visualViewport) {
                        window.scrollTo(0, 0);
                    }
                }, 10);
                
                // Icon states
                if (searchIcon) searchIcon.style.opacity = '0';
                if (closeIcon) closeIcon.style.opacity = '1';
            }
        }

        // Event listeners
        if (searchIcon) {
            searchIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleModal();
            });
        }
        
        if (closeIcon) {
            closeIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleModal();
            });
        }

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    toggleModal();
                }
            });
        }

        // Handle Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
                toggleModal();
            }
        });

        // ======================
        // SEARCH FUNCTIONALITY
        // ======================
        async function performSearch(e) {
            e.preventDefault();
            
            if (!searchInput) return;
            
            const searchQuery = searchInput.value.trim();
            const submitBtn = searchForm.querySelector('[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';

            // Validation
            if (!searchQuery) {
                alert('Please enter a search term');
                return;
            }

            // Loading state
            if (submitBtn) {
                submitBtn.innerHTML = '<span class="spinner"></span> Searching...';
                submitBtn.disabled = true;
            }

            try {
                // Note: This is a static site - search endpoint would need to be implemented
                // For now, show a message that search is not yet available
                alert('Search functionality is not yet available on this static website.');
                // Search query logged (removed console.log for production)
                
                // TODO: Implement client-side search or connect to a search service
                
            } catch (error) {
                console.error('Search error:', error);
                alert('Search failed. Please try again.');
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }
        }

        // Form submission
        if (searchForm) {
            searchForm.addEventListener('submit', performSearch);
        }
    }

    // ======================
    // DEPARTMENT TOGGLE FUNCTIONALITY
    // ======================
    const departments = document.getElementById('departments');
    const departmentElements = departments.querySelectorAll('.department');

    // Detect touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Handle department clicks (desktop only - mobile/tablet shows all items)
    function handleDepartmentClick(e) {
        // On mobile and tablet, always show all items, no toggle needed
        if (window.innerWidth <= 1366) {
            return;
        }
        
        const clickedDept = e.currentTarget;
        
        // Don't trigger if clicking a link inside
        if (e.target.closest('a')) return;

        if (!clickedDept.classList.contains('open')) {
            // Close all others first
            departmentElements.forEach(dept => {
                if (dept !== clickedDept) {
                    dept.classList.remove('open');
                }
            });
            
            // Then open clicked one
            setTimeout(() => {
                clickedDept.classList.add('open');
            }, isTouchDevice ? 0 : 300);
        }
    }

    // Add event listeners only on desktop (> 1366px)
    if (window.innerWidth > 1366) {
        departmentElements.forEach(dept => {
            dept.addEventListener('click', handleDepartmentClick);
        });
    }

    // Update on resize
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 1366) {
            // Re-enable click handlers for desktop
            departmentElements.forEach(dept => {
                dept.removeEventListener('click', handleDepartmentClick);
                dept.addEventListener('click', handleDepartmentClick);
            });
        } else {
            // Remove click handlers on mobile/tablet
            departmentElements.forEach(dept => {
                dept.removeEventListener('click', handleDepartmentClick);
            });
            // Ensure all departments are "open" on mobile/tablet (always visible)
            departmentElements.forEach(dept => {
                dept.classList.add('open');
            });
        }
    }, 250));
    
    // On mobile and tablet, ensure all items are visible on load
    if (window.innerWidth <= 1366) {
        departmentElements.forEach(dept => {
            dept.classList.add('open');
        });
    }

    // ======================
    // HELPER FUNCTIONS
    // ======================
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }

    // Example: Window resize handler
    window.addEventListener('resize', debounce(function() {
        // Handle responsive adjustments
        if (window.innerWidth >= 768) {
            departmentElements.forEach(dept => {
                dept.classList.remove('open');
            });
        }
    }, 250));

});