document.addEventListener('DOMContentLoaded', function () {
    // Fetch and insert the header
    fetch('header.html') // Adjust the path if header.html is in another folder
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to load header.html');
            }
            return response.text();
        })
        .then((html) => {
            // Insert the header at the top of the body
            document.body.insertAdjacentHTML('afterbegin', html);

            // Initialize the hamburger menu functionality
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.global-nav ul');

            if (hamburger && navMenu) {
                // Add event listener for hamburger click
                hamburger.addEventListener('click', () => {
                    // Toggle visibility of menu
                    navMenu.classList.toggle('show');
                    
                    // Toggle hamburger active state
                    hamburger.classList.toggle('active');
                    
                    // Update aria-expanded attribute for accessibility
                    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                    hamburger.setAttribute('aria-expanded', !isExpanded);
                });

                // Ensure the menu is hidden on page load for accessibility
                navMenu.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            } else {
                console.error('Hamburger or navMenu not found in the DOM.');
            }
        })
        .catch((error) => {
            console.error('Error loading header:', error);
        });
});
