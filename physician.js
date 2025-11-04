// GSAP ScrollTrigger Background Color Changer for Physician Page
document.addEventListener("DOMContentLoaded", () => {
  // Only run on physician page
  if (!document.querySelector(".physician-page")) {
    return;
  }

  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Get all sections with background color data attributes
  const scrollColorElems = document.querySelectorAll("[data-bgcolor]");

  scrollColorElems.forEach((colorSection, i) => {
    const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
    const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

    ScrollTrigger.create({
      trigger: colorSection,
      start: "top 50%",
      end: "bottom 50%",
      // markers: true, // Uncomment for debugging
      onEnter: () => {
        gsap.to(".physician-page", {
          backgroundColor: colorSection.dataset.bgcolor,
          color: colorSection.dataset.textcolor,
          duration: 0.6,
          ease: "power2.inOut",
          overwrite: "auto",
        });

        // Update header and logo colors based on background
        updateHeaderColors(
          colorSection.dataset.bgcolor,
          colorSection.dataset.textcolor
        );
      },
      onLeaveBack: () => {
        if (prevBg && prevText) {
          gsap.to(".physician-page", {
            backgroundColor: prevBg,
            color: prevText,
            duration: 0.6,
            ease: "power2.inOut",
            overwrite: "auto",
          });

          // Update header and logo colors
          updateHeaderColors(prevBg, prevText);
        }
      },
    });
  });

  // Function to update header colors based on background
  function updateHeaderColors(bgColor, textColor) {
    const header = document.querySelector("header");
    const logo = document.querySelector(".logo");
    const navLinks = document.querySelectorAll("nav a");

    // Determine if background is dark or light
    const isDarkBg = bgColor === "#000000";

    if (isDarkBg) {
      // Dark background - use light text
      gsap.to(header, {
        background: "rgba(0, 0, 0, 0.8)",
        duration: 0.6,
        ease: "power2.inOut",
      });
      gsap.to(logo, {
        color: "#f5f5f0",
        duration: 0.6,
        ease: "power2.inOut",
      });
      navLinks.forEach((link) => {
        gsap.to(link, {
          color: "#f5f5f0",
          duration: 0.6,
          ease: "power2.inOut",
        });
      });
    } else {
      // Light background - use dark text
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        gsap.to(header, {
          background: "rgba(245, 245, 240, 0.95)",
          duration: 0.6,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(header, {
          background: "transparent",
          duration: 0.6,
          ease: "power2.inOut",
        });
      }
      gsap.to(logo, {
        color: "#000",
        duration: 0.6,
        ease: "power2.inOut",
      });
      navLinks.forEach((link) => {
        gsap.to(link, {
          color: "#000",
          duration: 0.6,
          ease: "power2.inOut",
        });
      });
    }
  }

  // Update on scroll for header background
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const header = document.querySelector("header");

    // Check which section we're in
    const currentSection = Array.from(scrollColorElems).find((section) => {
      const rect = section.getBoundingClientRect();
      return (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      );
    });

    if (currentSection) {
      const isDarkBg = currentSection.dataset.bgcolor === "#000000";

      if (!isDarkBg && scrollPosition > 100) {
        gsap.to(header, {
          background: "rgba(245, 245, 240, 0.95)",
          backdropFilter: "blur(10px)",
          duration: 0.3,
        });
      } else if (!isDarkBg && scrollPosition <= 100) {
        gsap.to(header, {
          background: "transparent",
          backdropFilter: "none",
          duration: 0.3,
        });
      }
    }

    lastScrollTop = scrollPosition;
  });
});
