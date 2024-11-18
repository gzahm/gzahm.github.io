document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-links a');
    const contentArea = document.getElementById('content-area');

    // Cache the original home content
    const homeContentHTML = document.getElementById('home-content').outerHTML;

    // Set "Home" as the active tab by default
    document.querySelector('.tab-links a[data-tab="home"]').classList.add('active');

    // Add event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
            const tabName = this.getAttribute('data-tab');

            // Update active tab styling
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Load content dynamically
            if (tabName === 'home') {
                resetHomeContent();
            } else {
                fetchContent(tabName);
            }
        });
    });

    // Function to fetch and display tab content
    function fetchContent(tabName) {
        contentArea.innerHTML = `<p>Loading content...</p>`;
        const fileName = `${tabName}.html`; // Map tab to file name

        fetch(fileName)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${fileName}`);
                return response.text();
            })
            .then(content => {
                contentArea.innerHTML = content;
            })
            .catch(error => {
                console.error(error);
                contentArea.innerHTML = `<p>Content for "${tabName}" could not be loaded.</p>`;
            });
    }

    // Function to reset home content
    function resetHomeContent() {
        contentArea.innerHTML = homeContentHTML;
    }

    // Load the home content on page load
    resetHomeContent();
});

// Scroll to top button logic
const scrollTopButton = document.getElementById('scrollTopButton');

window.onscroll = function () {
    scrollTopButton.style.display =
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
            ? 'block'
            : 'none';
};

scrollTopButton.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
