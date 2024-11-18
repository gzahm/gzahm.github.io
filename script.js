document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab-links a');
  const contentArea = document.getElementById('content-area');

  // Cache the original home content from the DOM
  const homeContentHTML = document.getElementById('home-content').outerHTML;

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
    contentArea.innerHTML = `<p>Loading content...</p>`;
    const fileName = `${tabName}.html`;

    fetch(fileName)
      .then(response => {
        if (!response.ok) throw new Error('Content not found');
        return response.text();
      })
      .then(content => {
        contentArea.innerHTML = content;

        // Reapply tab-switching logic for mentoring tab
        if (tabName === 'mentoring') {
          setupMentoringTabs();
        }
      })
      .catch(() => {
        contentArea.innerHTML = `<p>Content for "${tabName}" not found.</p>`;
      });
  }

  // Function to reset home content and update the active tab
  function resetHomeContent() {
    contentArea.innerHTML = homeContentHTML;
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.tab-links a[data-tab="home"]').classList.add('active');
  }

  // Mentoring-specific tab-switching logic
  function setupMentoringTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Hide all tab contents
        tabContents.forEach(content => content.style.display = 'none');
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Show selected content
        const targetId = button.getAttribute('onclick').match(/'(.+)'/)[1];
        document.getElementById(targetId).style.display = 'block';
        button.classList.add('active');
      });
    });
  }

  // Ensure home content is displayed on page load (no fetch required)
  resetHomeContent();
});

// Scroll-to-top button logic
const scrollTopButton = document.getElementById('scrollTopButton');

window.onscroll = function () {
  scrollTopButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? 'block' : 'none';
};

scrollTopButton.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
