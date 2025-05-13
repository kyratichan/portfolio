// Get the menu icon and navbar
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

// Toggle the "active" class on click
menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});