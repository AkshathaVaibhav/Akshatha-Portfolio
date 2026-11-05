
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Automatically update the footer year
document.querySelector("#year").textContent =
  new Date().getFullYear();

// Show a placeholder if the photo has not been added yet
const profilePhoto = document.querySelector(".profile-photo");
const photoPlaceholder = document.querySelector(".photo-placeholder");

function showPhotoFallback() {
  profilePhoto.style.display = "none";
  photoPlaceholder.style.display = "flex";
}

profilePhoto.addEventListener("error", showPhotoFallback);

profilePhoto.addEventListener("load", () => {
  profilePhoto.style.display = "block";
  photoPlaceholder.style.display = "none";
});

if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
  showPhotoFallback();
} else if (profilePhoto.complete && profilePhoto.naturalWidth > 0) {
  photoPlaceholder.style.display = "none";
}

// Reveal sections smoothly while scrolling
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// Cursor-following lavender-blue glow
const cursorGlow = document.querySelector(".cursor-glow");

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

// Close the mobile menu with Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
