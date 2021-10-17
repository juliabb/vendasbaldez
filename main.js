/* char - string /caracteres usar '' "" ou ``
numeros - number - 12 5 8
verdadeiro ou falso - boolean: true or false
DOM Document Object Model*/

//Abre e fecha o menu quando clica no Hamburguer e no X
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

//quando clica em um item no menu, fecha o menu
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function() {
    nav.classList.remove('show')
  })
}

/*Adds header shadow when scrolling /Adiciona sombra no header quando da scroll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {

  if(window.scrollY >= navHeight) {
    //if scroll is greater than header height/ if scroll é maior que a altura do header
    header.classList.add('scroll')
      } else {
    //else scroll is smaller than header height/ else scroll é menor que a altura do header
    header.classList.remove('scroll')
      }
}


/* TESTIMONIAL CAROUSEL/ CARROSSEL DE DEPOIMENTOS - SLIDER SWIPER*/
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: { //Breakpoint 767 (tablet's)\ Ponto de quebra 767 (tablet's)
    767: {
      slidesPerView: 2, //How many slides will be shown\ Quantos slides serão mostrados
      setWrapperSize: true
    }
  }
});

/* ScrollReveal: Show elements when scrolling page/ ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* BACK TO TOP/ VOLTAR AO TOPO - SETA*/
const backToTopButton = document.querySelector('.back-to-top') //procurar no css o botão

function backToTop() {

  if(window.scrollY >= 560) { //se o eixo Y 'vertical' for igual ou maior a 560
    backToTopButton.classList.add('show') //adiciona na class do botão o show
  } else {
    backToTopButton.classList.remove('show')
  }

}

/*Active menu according to the visible section on the page\ Menu ativo conforme a seção visível na página*/
const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {

  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4
  for(const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if(checkpointStart && checkpointEnd) {
      document
      .querySelector('nav ul li a[href*=' + sectionId + ']')
      .classList.add('active')
      
    } else {
      document
      .querySelector('nav ul li a[href*=' + sectionId + ']')
      .classList.remove('active')
    }
  }

}

/*SCROLL FUNCTIONS/ FUNÇÕES SCROLL*/ 
window.addEventListener('scroll', function() {  
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})

