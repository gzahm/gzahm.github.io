document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab-links a');
  const contentArea = document.getElementById('content-area');

  // Cache the original home content
  const homeContentHTML = document.getElementById('home-content').outerHTML;

  // Set "Home" as the active tab by default
  document.querySelector('.tab-links a[data-tab="home"]').classList.add('active');

  // Add event listeners to all tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', function (event) {
      event.preventDefault();
      const tabName = this.getAttribute('data-tab');

      // Update active tab styling
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Load content for the selected tab
      if (tabName === 'home') {
        resetHomeContent();
      } else {
        fetchTabContent(tabName);
      }
    });
  });

  // Function to fetch and load tab content
  function fetchTabContent(tabName) {
    contentArea.innerHTML = `<p>Loading content...</p>`; // Show loading state
    const fileName = `${tabName}.html`; // Map tab to its file name

    fetch(fileName)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${tabName}.html`);
        return response.text();
      })
      .then(content => {
        contentArea.innerHTML = content;
      })
      .catch(error => {
        console.error(error);
        contentArea.innerHTML = `<p>Content for "${tabName}" is not available.</p>`;
      });
  }

  // Function to reset to the home content
  function resetHomeContent() {
    contentArea.innerHTML = homeContentHTML;
  }

  // Load the home content on page load
  resetHomeContent();
});
