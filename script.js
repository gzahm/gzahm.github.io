document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-links a');
    const dynamicContent = document.getElementById('dynamic-content'); // Container for dynamic content

    // Cache the original home content
    const homeContentHTML = document.getElementById('home-content').outerHTML;

    // Set "Home" as the active tab by default
    document.querySelector('.tab-links a[data-tab="home"]').classList.add('active');

    // Add event listeners to global tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
            const tabName = this.getAttribute('data-tab');

            // Update active tab styling
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update body class for page-specific styles
            document.body.className = tabName; // Set body class to match tab name

            // Load content dynamically
            if (tabName === 'home') {
                resetHomeContent();
            } else {
                fetchContent(tabName);
            }
        });
    });

    // Function to fetch and display content for a specific tab
    function fetchContent(tabName) {
        dynamicContent.innerHTML = `<p>Loading content...</p>`;
        const fileName = `${tabName}.html`;

        fetch(fileName)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${fileName}`);
                return response.text();
            })
            .then(content => {
                dynamicContent.innerHTML = content;

                // Initialize mentoring-specific subtabs if "Mentorship" tab is loaded
                if (tabName === 'mentoring') {
                    setupMentoringSubtabs();
                }
            })
            .catch(error => {
                console.error(error);
                dynamicContent.innerHTML = `<p>Content for "${tabName}" could not be loaded.</p>`;
            });
    }

    // Function to reset home content
    function resetHomeContent() {
        dynamicContent.innerHTML = homeContentHTML;
        document.body.className = 'home'; // Ensure home page background is applied
    }

    // Mentoring-specific subtabs logic
    function setupMentoringSubtabs() {
        const subtabButtons = document.querySelectorAll('.subtab-btn');
        const subtabSections = document.querySelectorAll('.subtab-section');

        // Add event listeners to subtabs
        subtabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                subtabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Show the corresponding subtab content
                const targetId = button.getAttribute('data-subtab');
                subtabSections.forEach(section => {
                    section.style.display = section.id === targetId ? 'block' : 'none';
                });
            });
        });
    }

    // Load the home content on page load
    resetHomeContent();
});

// Scroll-to-top button logic
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
