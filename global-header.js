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
