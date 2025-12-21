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
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
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

  // === PDF DOWNLOAD FUNCTIONALITY ===
  const downloadBtn = document.getElementById('downloadPdf');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
      // Mostrar estado de carga
      const originalContent = downloadBtn.innerHTML;
      downloadBtn.innerHTML = '<span>Generando...</span>';
      downloadBtn.disabled = true;

      // Preparar contenido
      // Preparar contenido
      const element = document.body;
      element.classList.add('generating-pdf'); // Activar estilos de impresión seguros

      // Expandir todos los desplegables para el PDF
      const details = document.querySelectorAll('details');
      const originalDetailsState = [];
      details.forEach(d => {
        originalDetailsState.push(d.open);
        d.open = true;
      });

      // Forzar visibilidad de elementos reveal para que salgan en el PDF
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => el.classList.add('visible'));

      // Configuración de html2pdf
      const opt = {
        margin: [5, 5, 5, 5],
        filename: 'Guia_Legal_Derecho_Huelga.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: '#0a0a0f', // Color de fondo oscuro explícito
          logging: false,
          ignoreElements: (element) => {
            return element.classList.contains('download-btn') ||
              element.classList.contains('nav-toggle');
          }
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.section',
          avoid: ['.pillar-card', '.card', '.sentence-card', '.info-box', '.phase-item', '.quote-card']
        }
      };

      try {
        await html2pdf().set(opt).from(element).save();
      } catch (error) {
        console.error('Error generando PDF:', error);
        alert('Error al generar el PDF. Por favor, intenta de nuevo.');
      } finally {
        // Restaurar estado original
        downloadBtn.innerHTML = originalContent;
        downloadBtn.disabled = false;
        element.classList.remove('generating-pdf'); // Quitar estilos de impresión

        // Restaurar desplegables
        details.forEach((d, i) => {
          if (!originalDetailsState[i]) d.open = false;
        });
      }
    });
  }

  console.log('✅ Guía Legal - Interactividad cargada correctamente');
});
