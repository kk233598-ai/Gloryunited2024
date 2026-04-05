// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

function openModal() {
  window.open('https://forms.gle/4a94vFuy6qqQ9Zfo8', '_blank');
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('mobile-menu');
  const mobileMenuContainer = document.getElementById('mobile-menu-container');
  
  if(menuToggle && mobileMenuContainer) {
    menuToggle.addEventListener('click', () => {
      if(mobileMenuContainer.style.display === 'none' || mobileMenuContainer.style.display === '') {
        mobileMenuContainer.style.display = 'block';
      } else {
        mobileMenuContainer.style.display = 'none';
      }
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenuContainer.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuContainer.style.display = 'none';
      });
    });
  }
});

// Image Management & Admin Mode Logic
document.addEventListener('DOMContentLoaded', () => {
  const isAdmin = window.location.hash === '#admin';
  const shouldReset = window.location.search.includes('reset=true');

  if (shouldReset) {
    localStorage.clear();
    console.log('Local Storage Cleared for Reset');
    // Remove the query param to avoid infinite resets
    const newUrl = window.location.origin + window.location.pathname + window.location.hash;
    window.history.replaceState({}, document.title, newUrl);
  }
  
  // Elements
  const editables = [
    { 
      img: document.getElementById('nav-logo'), 
      input: document.getElementById('logoUpload'), 
      key: 'gloryLogo',
      secondaryImgs: [document.getElementById('footer-logo')]
    },
    { 
      img: document.getElementById('coach-pic'), 
      input: document.getElementById('coachUpload'), 
      key: 'gloryCoach' 
    },

    { 
      img: document.getElementById('kit-pic'), 
      input: document.getElementById('kitUpload'), 
      key: 'gloryKit' 
    }
  ];

  // 1. Always load saved images from localStorage
  editables.forEach(item => {
    const saved = localStorage.getItem(item.key);
    if (saved) {
      if (item.img) item.img.src = saved;
      if (item.secondaryImgs) {
        item.secondaryImgs.forEach(sImg => { if(sImg) sImg.src = saved; });
      }
    }

    // 2. Setup Uploader Logic (Core)
    if (item.input && item.img) {
      item.input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            const base64Src = event.target.result;
            item.img.src = base64Src;
            if (item.secondaryImgs) {
              item.secondaryImgs.forEach(sImg => { if(sImg) sImg.src = base64Src; });
            }
            localStorage.setItem(item.key, base64Src);
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // 3. Enable Admin Mode Features
    if (isAdmin && item.img && item.input) {
      item.img.style.cursor = 'pointer';
      item.img.title = 'Click to change image (Admin Mode)';
      item.img.addEventListener('click', () => item.input.click());
      

    }
  });

  if (isAdmin) {
    console.log('Admin Mode Active: You can now click images to change them.');
  }
});




