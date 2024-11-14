// mentoring.js

function showTab(tabId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach(tabContent => {
    tabContent.style.display = "none";
  });

  // Remove active styling from all tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(button => {
    button.classList.remove("active");
  });

  // Show the selected tab content and add active class to the selected button
  document.getElementById(tabId).style.display = "block";
  document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add("active");
}
