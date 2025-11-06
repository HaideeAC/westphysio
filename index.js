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
      const servicesPhilosophy = document.querySelector(".services-philosophy");

      // Check if we're in the dark philosophy section
      if (servicesPhilosophy) {
        const philoTop = servicesPhilosophy.offsetTop;
        const philoBottom = philoTop + servicesPhilosophy.offsetHeight;

        // In dark philosophy section - beige text
        if (
          scrollPosition + 100 >= philoTop &&
          scrollPosition + 100 <= philoBottom
        ) {
          logo.style.color = "#f5f5f0";
          navLinks.forEach((link) => (link.style.color = "#f5f5f0"));
          return;
        }
      }

      // Hero section with dark background - beige text
      if (scrollPosition < viewportHeight * 0.8) {
        logo.style.color = "#f5f5f0";
        navLinks.forEach((link) => (link.style.color = "#f5f5f0"));
      } else {
        // Scrolled past hero to beige section - black text
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

        // In hero section with black background - beige text
        if (scrollPosition < heroBottom - 100) {
          logo.style.color = "#f5f5f0";
          navLinks.forEach((link) => (link.style.color = "#f5f5f0"));
          return;
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
          // In dark section - beige text
          logo.style.color = "#f5f5f0";
          navLinks.forEach((link) => (link.style.color = "#f5f5f0"));
        } else {
          // In light section - black text
          logo.style.color = "#000";
          navLinks.forEach((link) => (link.style.color = "#000"));
        }
      } else {
        // No philosophy section - black text
        logo.style.color = "#000";
        navLinks.forEach((link) => (link.style.color = "#000"));
      }
    }

    // Contact page - beige background, black text
    if (document.querySelector(".contact-page")) {
      logo.style.color = "#000";
      navLinks.forEach((link) => (link.style.color = "#000"));
    }
  }

  // Smooth transitions
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
