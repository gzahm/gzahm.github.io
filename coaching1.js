// coaching1.js

document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".container section");

  // Function to add fade-in class when sections come into view
  const fadeInOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  };

  // Setting up the Intersection Observer for the fade-in effect
  const options = { threshold: 0.1 };
  const observer = new IntersectionObserver(fadeInOnScroll, options);

  sections.forEach(section => observer.observe(section));
});
