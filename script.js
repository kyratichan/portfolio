document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';
  console.log('Current page:', currentPage);  // Log currentPage

  /* Loading nav bar */
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

  /* Fetching icon svgs */
  const icons = [
    { id: 'icon-email', path: 'assets/icons/email-icon.svg' },
    { id: 'icon-linkedin', path: 'assets/icons/linkedin-icon.svg' },
    { id: 'icon-instagram', path: 'assets/icons/ig-icon.svg' }
  ];

  icons.forEach(({ id, path }) => {
    const container = document.getElementById(id);
    if (container) {
      fetch(path)
        .then(res => res.text())
        .then(svg => {
          container.innerHTML = svg;
        })
        .catch(err => {
          console.error(`Error loading ${path}:`, err);
        });
    }
  });
});