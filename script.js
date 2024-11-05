// JavaScript to handle tab navigation
const tabs = document.querySelectorAll('.tab-links a');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Remove active class from all tabs and contents
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Add active class to the selected tab and content
    tab.classList.add('active');
    const targetContent = document.querySelector(tab.getAttribute('href'));
    targetContent.classList.add('active');
  });
});
