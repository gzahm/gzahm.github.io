document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab-links a');
  const contentArea = document.getElementById('content-area');

  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      const tabName = tab.getAttribute('data-tab');

      // Fetch content based on the tab selected
      fetchContent(tabName);
    });
  });

  function fetchContent(tabName) {
    // If the tab is "home", show default HTML without fetching
    if (tabName === 'home') {
      // Optional: Reset the content area to its initial HTML if desired
      contentArea.innerHTML = `
        <div id="home-content">
          <h1>Welcome to PlaZahm</h1>
          <div class="about-me">
            <h2>About Me</h2>
            <p>Hello! I'm Gabriel, and this is where I share my favorite ideas on food, travel, and more.</p>
          </div>
        </div>
      `;
      return; // Skip fetch for "home" to use default content
    }

    // Fetch content for other tabs (e.g., food.html, travel.html)
    const fileName = `${tabName}.html`;

    fetch(fileName)
      .then(response => {
        if (!response.ok) throw new Error('Content not found');
        return response.text();
      })
      .then(content => {
        contentArea.innerHTML = content;
      })
      .catch(error => {
        contentArea.innerHTML = `<p>Content for "${tabName}" not found.</p>`;
      });
  }

  // Load the home content from the default HTML by not calling fetch
  fetchContent('home');
});
