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
            document.body.insertAdjacentHTML('afterbegin', html);

            // Initialize the hamburger menu functionality after the header is added
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.global-nav ul');

            if (hamburger && navMenu) {
                // Toggle the menu and add animations
                hamburger.addEventListener('click', () => {
                    navMenu.classList.toggle('show'); // Toggle visibility of menu
                    hamburger.classList.toggle('active'); // Toggle animation of hamburger icon
                    
                    // Update aria-expanded attribute for accessibility
                    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
                    hamburger.setAttribute('aria-expanded', !expanded);
                });
            } else {
                console.error('Hamburger or navMenu not found.');
            }
        })
        .catch((error) => {
            console.error('Error loading header:', error);
        });
});
