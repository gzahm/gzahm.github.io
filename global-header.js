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
                hamburger.addEventListener('click', () => {
                    navMenu.classList.toggle('show');
                });
            } else {
                console.error('Hamburger or navMenu not found.');
            }
        })
        .catch((error) => {
            console.error('Error loading header:', error);
        });
});
