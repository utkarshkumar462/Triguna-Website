document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
      .then((response) => response.text())
      .then((data) => {
          document.querySelector("header").innerHTML = data;
          setupMenuToggle(); // Ensure function runs after header loads
      })
      .catch((error) => console.error("Error loading header:", error));
});

function setupMenuToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown > a");
  const navItems = document.querySelectorAll(".nav-links a");

  if (!menuToggle || !navLinks) {
      console.error("Navbar elements not found!");
      return;
  }

  // Mobile Menu Toggle
  menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("nav-active");

      // Change icon
      menuToggle.innerHTML = navLinks.classList.contains("nav-active")
          ? "✖"
          : "&#9776;";
  });

  // Close menu when clicking any nav link (for mobile)
  navItems.forEach((item) => {
      item.addEventListener("click", () => {
          navLinks.classList.remove("nav-active");
          menuToggle.innerHTML = "&#9776;";
      });
  });

  // Handle Dropdown Click for Mobile
  dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent default link behavior

          const parent = this.parentElement;
          const submenu = parent.querySelector(".dropdown-menu");

          if (!submenu) return; // If no submenu, exit function

          // Toggle current dropdown
          parent.classList.toggle("active");

          // Close other dropdowns
          document.querySelectorAll(".dropdown").forEach((drop) => {
              if (drop !== parent) {
                  drop.classList.remove("active");
              }
          });

          // Show submenu only if active
          submenu.style.display = parent.classList.contains("active")
              ? "block"
              : "none";
      });
  });
}
