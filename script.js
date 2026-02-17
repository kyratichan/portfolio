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

      // Only run this if we are on a case study page
    if (document.body.classList.contains('case-study')) {
      const sections = document.querySelectorAll('section[data-nav-color]');
      
      const options = {
        root: null,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "0% 0px -100% 0px" // Triggers when section is near top
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const color = entry.target.getAttribute('data-nav-color');
            // Apply the color to a CSS variable
            document.documentElement.style.setProperty('--current-nav-bg', color);
          }
        });
      }, options);

      sections.forEach(section => observer.observe(section));
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

  /* Fetch Dynamic Playground Preview Image */
  const mainPreviewImage = document.getElementById('play-preview');
  const playRows = document.querySelectorAll('.play-projects-container .play-row');

  /* Store the initial image source to revert on mouseleave */
  const initialImageSrc = mainPreviewImage ? mainPreviewImage.src : '';

  if (mainPreviewImage && playRows.length > 0) {
      playRows.forEach(row => {
          row.addEventListener('mouseenter', () => {
              const previewSrc = row.getAttribute('data-preview-src');
              if (previewSrc) {
                  mainPreviewImage.src = previewSrc;
              }
          });

          /* Revert to the initial image when the mouse leaves the row */
          row.addEventListener('mouseleave', () => {
              mainPreviewImage.src = initialImageSrc; 
          });
      });
  }

  /* Displaying the receipt over each ceramic item */
  let mouseX = 0;
  let mouseY = 0;

  document.querySelectorAll('.ceramic-item').forEach(item => {
    const receipt = item.querySelector('.receipt-overlay');

    item.addEventListener('mousemove', (e) => {
        // 2. Update global coordinates
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const x = mouseX + 15; 
        const y = mouseY + 15;

        receipt.style.transform = `translate(${x}px, ${y}px)`;
    });

    item.addEventListener('mouseenter', () => {
        receipt.style.opacity = "1";
    });
    
    item.addEventListener('mouseleave', () => {
        receipt.style.opacity = "0";
    });

    // 3. Update position during scroll so it doesn't jump to 0,0
    window.addEventListener('scroll', () => {
        // Only move it if it's currently visible
        if (receipt.style.opacity === "1") {
            const x = mouseX + 15;
            const y = mouseY + 15;
            receipt.style.transform = `translate(${x}px, ${y}px)`;
        }
    }, { passive: true });
  });

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