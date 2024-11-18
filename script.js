document.addEventListener('DOMContentLoaded', function () {
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

      // Fetch content only for non-home tabs
      if (tabName !== 'home') {
        fetchContent(tabName);
      } else {
        resetHomeContent();
      }
    });
  });

  // Function to fetch and display content for non-home tabs
  function fetchContent(tabName) {
    // Show loading message while content is fetched
    contentArea.innerHTML = `<p>Loading content...</p>`;
    const fileName = `${tabName}.html`;

    fetch(fileName)
      .then(response => {
        if (!response.ok) throw new Error('Content not found');
        return response.text();
      })
      .then(content => {
        contentArea.innerHTML = content;
      })
      .catch(() => {
        contentArea.innerHTML = `<p>Content for "${tabName}" not found.</p>`;
      });
  }

  // Function to reset home content (if needed)
  function resetHomeContent() {
    const homeContent = document.querySelector('#home-content');
    if (homeContent) {
      // Reset the original static home page content
      contentArea.innerHTML = homeContent.outerHTML;
    }
  }

  // Ensure home content is displayed on page load (no fetch required)
  resetHomeContent();
});

// Scroll-to-top button logic
const scrollTopButton = document.getElementById('scrollTopButton');

// Show button when scrolling down 20px
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopButton.style.display = 'block';
  } else {
    scrollTopButton.style.display = 'none';
  }
};

// Scroll to top when button is clicked
scrollTopButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Smooth scrolling
  });
};
