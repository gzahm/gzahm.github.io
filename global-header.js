document.addEventListener('DOMContentLoaded', function () {
    fetch('header.html') // Adjust the path if header.html is in another folder
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to load header.html');
            }
            return response.text();
        })
        .then((html) => {
            document.body.insertAdjacentHTML('afterbegin', html);
        })
        .catch((error) => {
            console.error('Error loading header:', error);
        });
});
    // Load the home content on page load
    resetHomeContent();
});
// Select the hamburger and navigation elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.global-nav ul');

// Toggle the 'show' class on click
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});
