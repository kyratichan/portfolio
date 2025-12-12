document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';
  console.log('Current page:', currentPage);  // Log currentPage

  /* Loading nav bar */
  fetch('/nav.html')
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
    { id: 'icon-email', path: '/assets/icons/email-icon.svg' },
    { id: 'icon-linkedin', path: '/assets/icons/linkedin-icon.svg' },
    { id: 'icon-instagram', path: '/assets/icons/ig-icon.svg' }
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

  // Fetch Dynamic Playground Preview Image
  const mainPreviewImage = document.getElementById('play-preview');
  const playRows = document.querySelectorAll('.play-projects-container .play-row');

  // Store the initial image source to revert on mouseleave
  const initialImageSrc = mainPreviewImage ? mainPreviewImage.src : '';

  if (mainPreviewImage && playRows.length > 0) {
      playRows.forEach(row => {
          row.addEventListener('mouseenter', () => {
              const previewSrc = row.getAttribute('data-preview-src');
              if (previewSrc) {
                  mainPreviewImage.src = previewSrc;
              }
          });

          // Revert to the initial image when the mouse leaves the row
          row.addEventListener('mouseleave', () => {
              mainPreviewImage.src = initialImageSrc; 
          });
      });
  }

  /* Fetching footer */
  fetch('footer.html')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.text();
    })
    .then(html => {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            console.error('No #footer-container element found to load footer content.');
            return;
        }
        // Insert the fetched HTML into the placeholder
        footerContainer.innerHTML = html;
    })
    .catch(err => {
        console.error('Failed to fetch footer.html:', err);
    });
});