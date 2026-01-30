// DOM Elements
const nav = document.querySelector('#header nav');
const toggle = document.querySelector('.toggle');
const links = document.querySelectorAll('.nav-link');
const header = document.querySelector('#header');
const backToTopButton = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('main section[id]');

// Initialize Swiper
let testimonialsSwiper = null;

function initSwiper() {
  if (document.querySelector('.testimonials-swiper')) {
    testimonialsSwiper = new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        }
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }
}

// Toggle mobile menu
toggle.addEventListener('click', function () {
  nav.classList.toggle('show');
  toggle.classList.toggle('show');
  
  // Toggle body scroll
  document.body.style.overflow = nav.classList.contains('show') ? 'hidden' : '';
});

// Close menu when clicking on links
links.forEach(link => {
  link.addEventListener('click', function() {
    nav.classList.remove('show');
    toggle.classList.remove('show');
    document.body.style.overflow = '';
  });
});

// Add shadow to header on scroll
function changeHeaderWhenScroll() {
  if(window.scrollY >= 50) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
}

// Back to top button
function backToTop() {
  if(window.scrollY >= 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

// Active menu based on current section
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    const checkpointStart = checkpoint >= sectionTop - 100;
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight - 100;

    const menuLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
    
    if(menuLink && checkpointStart && checkpointEnd) {
      menuLink.classList.add('active');
    } else if(menuLink) {
      menuLink.classList.remove('active');
    }
  });
}

// ScrollReveal animations
function initScrollReveal() {
  if(typeof ScrollReveal !== 'undefined') {
    const scrollReveal = ScrollReveal({
      origin: 'top',
      distance: '30px',
      duration: 700,
      reset: false
    });

    // Home section
    scrollReveal.reveal('.home-image', { delay: 200 });
    scrollReveal.reveal('.home-title', { delay: 300 });
    scrollReveal.reveal('.home-subtitle', { delay: 400 });
    scrollReveal.reveal('.home-description', { delay: 500 });
    scrollReveal.reveal('.home-features', { delay: 600 });
    scrollReveal.reveal('.home-content .button', { delay: 700 });

    // Categories
    scrollReveal.reveal('.category-card', { interval: 100 });

    // Product sections
    scrollReveal.reveal('.product-image', { origin: 'left' });
    scrollReveal.reveal('.product-content', { origin: 'right' });

    // Services
    scrollReveal.reveal('.service-card', { interval: 100 });

    // Contact
    scrollReveal.reveal('.contact-content', { origin: 'left' });
    scrollReveal.reveal('.contact-form', { origin: 'right' });
  }
}

// Contact form handler
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name') || this.querySelector('input[type="text"]').value;
      const phone = formData.get('phone') || this.querySelector('input[type="tel"]').value;
      const message = formData.get('message') || this.querySelector('textarea').value;
      
      // Create WhatsApp message
      const whatsappMessage = `Olá! Meu nome é ${name}. Telefone: ${phone}\n\nMensagem: ${message}`;
      const whatsappURL = `https://api.whatsapp.com/send?phone=+5511980244279&text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
      
      // Reset form
      this.reset();
      
      // Show success message
      alert('Redirecionando para o WhatsApp para enviar sua mensagem!');
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initSwiper();
  initScrollReveal();
  initContactForm();
  initSmoothScroll();
  
  // Set current year in footer
  const yearSpan = document.querySelector('.footer-bottom p');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = `© ${currentYear} Vendas Baldez. Todos os direitos reservados.`;
  }
});

// Scroll event listeners
window.addEventListener('scroll', function() {
  changeHeaderWhenScroll();
  backToTop();
  activateMenuAtCurrentSection();
});

// Resize event listener
window.addEventListener('resize', function() {
  // Reinitialize Swiper on resize if needed
  if (testimonialsSwiper) {
    testimonialsSwiper.update();
  }
});

// Product category click handler
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});