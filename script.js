/* ============================================
   GUÍA LEGAL - INTERACTIVIDAD
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // === HEADER SCROLL EFFECT ===
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // === MOBILE NAV TOGGLE ===
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
  
  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // === ACTIVE NAV LINK ===
  const sections = document.querySelectorAll('section[id]');
  const navLinksItems = document.querySelectorAll('.nav-links a');
  
  const highlightNav = () => {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinksItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', highlightNav);
  
  // === SCROLL REVEAL ANIMATION ===
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        el.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
  
  // === JURISPRUDENCE TABS ===
  const tabs = document.querySelectorAll('.jurisprudence-tab');
  const tabContents = {
    'info': document.getElementById('tab-info'),
    'seguridad': document.getElementById('tab-seguridad'),
    'esquirolaje': document.getElementById('tab-esquirolaje'),
    'indemnizacion': document.getElementById('tab-indemnizacion')
  };
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active to clicked tab
      tab.classList.add('active');
      
      // Hide all content
      Object.values(tabContents).forEach(content => {
        if (content) content.style.display = 'none';
      });
      
      // Show target content
      if (tabContents[targetTab]) {
        tabContents[targetTab].style.display = 'block';
        
        // Trigger reveal animation for newly visible cards
        tabContents[targetTab].querySelectorAll('.reveal').forEach(el => {
          el.classList.add('visible');
        });
      }
    });
  });
  
  // === CARD HOVER EFFECTS ===
  const cards = document.querySelectorAll('.card, .pillar-card, .sentence-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // === PHASE TIMELINE ANIMATION ===
  const phaseItems = document.querySelectorAll('.phase-item');
  
  const animatePhases = () => {
    phaseItems.forEach((item, index) => {
      const elementTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 50) {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, index * 100);
      }
    });
  };
  
  // Set initial state for phases
  phaseItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease-out';
  });
  
  window.addEventListener('scroll', animatePhases);
  animatePhases(); // Initial check
  
  // === PRINT/DOWNLOAD FUNCTIONALITY ===
  // Add keyboard shortcut for printing
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
      // Allow default print behavior
    }
  });
  
  console.log('✅ Guía Legal - Interactividad cargada correctamente');
});
