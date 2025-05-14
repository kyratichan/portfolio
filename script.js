document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';
  console.log('Current page:', currentPage);  // Log currentPage

  fetch('nav.html')
    .then(res => res.text())
    .then(html => {
      const navbarContainer = document.getElementById('navbar');
      if (!navbarContainer) {
        console.error('No #navbar element found');
        return;
      }

      navbarContainer.innerHTML = html;

      // Highlight active link
      const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }

      // Mobile menu toggle
      const menuIcon = document.getElementById('menu-icon');
      const navbar = document.querySelector('.navbar');

      if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
          navbar.classList.toggle('active');
        });
      }
    })
    .catch(err => {
      console.error('Failed to fetch nav.html:', err);
    });
});