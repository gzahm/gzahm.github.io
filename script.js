document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab-links a');
  const contentArea = document.getElementById('content-area');

  // Set "Home" as the active tab by default
  document.querySelector('.tab-links a[data-tab="home"]').classList.add('active');

  // Add event listener to each tab link
  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      const tabName = tab.getAttribute('data-tab');

      // Remove active class from all tabs and add it to the clicked tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Fetch content based on the tab selected
      fetchContent(tabName);
    });
  });

  // Function to fetch and display content
  function fetchContent(tabName) {
    // Show loading message while content is fetched
    contentArea.innerHTML = `<p>Loading content...</p>`;
    
    // If the tab is "home", show default HTML without fetching
    if (tabName === 'home') {
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

  // Load the home content by default on page load
  fetchContent('home');
});
// Get the button
const scrollTopButton = document.getElementById("scrollTopButton");

// Show button when scrolling down 20px
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
};

// Scroll to top when button is clicked
scrollTopButton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scrolling
    });
};
