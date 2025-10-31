document.addEventListener("DOMContentLoaded", () => {
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }

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
      // Open Google Maps with the direct link
      const mapsUrl = "https://maps.app.goo.gl/BcTkEYrh1VNJJg9H6";
      window.open(mapsUrl, "_blank");
    });
  }
});
