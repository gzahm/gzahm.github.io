document.addEventListener('DOMContentLoaded', function () {
    // Fetch and insert the header dynamically
    fetch('header.html')
        .then((response) => {
            if (!response.ok) throw new Error('Failed to load header.html');
            return response.text();
        })
        .then((html) => {
            document.body.insertAdjacentHTML('afterbegin', html);

            // Initialize hamburger menu functionality
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.global-nav ul');

            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    navMenu.classList.toggle('show');
                    hamburger.classList.toggle('active');
                });
            } else {
                console.error('Hamburger or navigation menu not found.');
            }
        })
        .catch((error) => console.error('Error loading header:', error));
});
