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
    // Default to home if tabName is empty
    const fileName = tabName ? `${tabName}.html` : 'home.html';

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

  // Load home content by default on page load
  fetchContent('home');
});
