document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const logo = document.querySelector(".logo");
  const navLinks = document.querySelectorAll("nav a");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  // Color-sensitive navigation based on scroll
  function updateHeaderColors() {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Home page logic
    if (document.querySelector("main")) {
      // Hero section with dark background
      if (scrollPosition < viewportHeight * 0.8) {
        header.style.background = "transparent";
        logo.style.color = "#fff";
        navLinks.forEach((link) => (link.style.color = "#fff"));
      } else {
        // Scrolled past hero
        header.style.background = "transparent";
        logo.style.color = "#000";
        navLinks.forEach((link) => (link.style.color = "#000"));
      }
    }

    // Physician page logic
    if (document.querySelector(".physician-page")) {
      const heroSection = document.querySelector(".physician-hero");
      const philosophySection = document.querySelector(".physician-philosophy");

      // Check if we're in the hero section first
      if (heroSection) {
        const heroBottom = heroSection.offsetHeight;

        // In hero section with black background - white text
        if (scrollPosition < heroBottom - 100) {
          header.style.background = "transparent";
          logo.style.color = "#fff";
          navLinks.forEach((link) => (link.style.color = "#fff"));
          return; // Exit early if in hero
        }
      }

      if (philosophySection) {
        const philosophyTop = philosophySection.offsetTop;
        const philosophyBottom = philosophyTop + philosophySection.offsetHeight;

        // Check if we're in the dark philosophy section
        if (
          scrollPosition + 100 >= philosophyTop &&
          scrollPosition + 100 <= philosophyBottom
        ) {
          // In dark section
          header.style.background = "transparent";
          logo.style.color = "#f5f5f0";
          navLinks.forEach((link) => (link.style.color = "#f5f5f0"));
        } else {
          // In light section
          header.style.background = "transparent";
          logo.style.color = "#000";
          navLinks.forEach((link) => (link.style.color = "#000"));
        }
      } else {
        // No philosophy section, just handle scroll
        header.style.background = "transparent";
        logo.style.color = "#000";
        navLinks.forEach((link) => (link.style.color = "#000"));
      }
    }

    // Contact page - always light background
    if (document.querySelector(".contact-page")) {
      header.style.background = "transparent";
    }
  }

  // Smooth transitions
  header.style.transition = "background 0.3s ease, backdrop-filter 0.3s ease";
  logo.style.transition = "color 0.3s ease";
  navLinks.forEach((link) => {
    link.style.transition = "color 0.3s ease";
  });

  // Initial check
  updateHeaderColors();

  // Update on scroll with throttle for performance
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeaderColors();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll indicator functionality
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Map circle functionality
  const mapCircle = document.querySelector(".map-circle");
  if (mapCircle) {
    mapCircle.addEventListener("click", () => {
      const mapsUrl = "https://maps.app.goo.gl/BcTkEYrh1VNJJg9H6";
      window.open(mapsUrl, "_blank");
    });
  }
});
