document.addEventListener('DOMContentLoaded', function () {
    console.log("Script loaded successfully");

    const tabs = document.querySelectorAll('.tab-links a');
    const dynamicContent = document.getElementById('dynamic-content');

    // Cache the original home content
    const homeContentHTML = document.getElementById('home-content')?.outerHTML;
    if (!homeContentHTML) {
        console.error("Home content is missing or not found in the DOM.");
    }

    // Set "Home" as the active tab by default
    const homeTab = document.querySelector('.tab-links a[data-tab="home"]');
    if (homeTab) {
        homeTab.classList.add('active');
    } else {
        console.error("Home tab is not found in the navigation.");
    }

    // Add event listeners to global tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
            const tabName = this.getAttribute('data-tab');
            console.log(`Tab clicked: ${tabName}`);

            if (!tabName) {
                console.error("Tab name is missing in the data-tab attribute.");
                return;
            }

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
        console.log(`Fetching content for: ${tabName}`);
        dynamicContent.innerHTML = `<p>Loading content...</p>`;
        const fileName = `${tabName}.html`;

        fetch(fileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${fileName} - ${response.status}`);
                }
                return response.text();
            })
            .then(content => {
                console.log(`Content for ${tabName} loaded successfully.`);
                dynamicContent.innerHTML = content;

                // Initialize mentoring-specific subtabs if "Mentorship" tab is loaded
                if (tabName === 'mentoring') {
                    setupMentoringSubtabs();
                }
            })
            .catch(error => {
                console.error(`Error fetching content for ${tabName}:`, error.message);
                dynamicContent.innerHTML = `<p>Content for "${tabName}" could not be loaded.</p>`;
            });
    }

    // Function to reset home content
    function resetHomeContent() {
        console.log("Resetting to home content.");
        dynamicContent.innerHTML = homeContentHTML || `<p>Home content not found.</p>`;
        document.body.className = 'home'; // Ensure home page background is applied
    }

    // Mentoring-specific subtabs logic
    function setupMentoringSubtabs() {
        console.log("Setting up mentoring subtabs.");
        const subtabButtons = document.querySelectorAll('.subtab-btn');
        const subtabSections = document.querySelectorAll('.subtab-section');

        if (subtabButtons.length === 0 || subtabSections.length === 0) {
            console.warn("No subtabs found in the mentoring content.");
            return;
        }

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
