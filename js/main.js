'use strict'

{
  // header

  const navOpen = document.querySelector('#nav-open');
  const navClose = document.querySelector('#nav-close');
  const navUl = document.querySelector('.nav-lists');
  const spNavs = document.querySelectorAll('.sp-menu a');

  navOpen.addEventListener('click', () => {
    navUl.classList.add('nav-open');
  });

  navClose.addEventListener('click', () => {
    navUl.classList.remove('nav-open');
  });
  
  spNavs.forEach(spNav => {
    spNav.addEventListener('click', () => {
      navUl.classList.remove('nav-open');
    });
  });
  
  //heroエリア、textのobserver処理

  const textTargets = document.querySelectorAll('.target');
  
  function textCallback(entries, obs) {
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
        return;  
      } else {
        entry.target.classList.add('fade-in');
        obs.unobserve(entry.target);
      }
    });
  }

  const textOptions = {
    threshold: 1,
    rootMargin: '0px 0px -50px',
  };

  const textObserver = new IntersectionObserver(textCallback, textOptions);

  textTargets.forEach(textTarget => {
    textObserver.observe(textTarget);
  });

  //heroエリアcarousel

  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const carouselUl = document.querySelector('.slider>ul');
  const slides = carouselUl.children;
  let currentIndex = 0;
  const dots = [];

  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    carouselUl.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
  }

  function createButtons() {
    for(let i = 0; i < slides.length; i++) {
      const button = document.createElement('button');
      button.addEventListener('click', () => {
        currentIndex = i;
        moveSlides();
        updateDots();
      });
      dots.push(button);
      document.querySelector('.carousel-nav').appendChild(button);
    }
    dots[0].classList.add('active');
  }

  function updateDots() {
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    dots[currentIndex].classList.add('active');
  }
  

  createButtons();

  next.addEventListener('click', ()=> {
    currentIndex++;
    if(currentIndex >= slides.length) {
      currentIndex = 0;
    }
    moveSlides();
    updateDots();
  });

  prev.addEventListener('click', ()=> {
    currentIndex--;
    if(currentIndex < 0) {
      currentIndex = slides.length -1;
    }
    moveSlides();
    updateDots();
  });

  window.addEventListener('resize', () => {
    moveSlides();
  });
  
  // menu-itemのobserver

  const menuTargets = document.querySelectorAll('.menu-item');

  function menuCallback(entries, obs) {
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
        return;  
      } else {
        entry.target.classList.add('set');
        obs.unobserve(entry.target);
      }
    });
  }

  const menuOptions = {
    threshold: .3,
  };

  const menuObserver = new IntersectionObserver(menuCallback, menuOptions);

  menuTargets.forEach(menuTarget => {
    menuObserver.observe(menuTarget);
  });

  // announce section

  const dts = document.querySelectorAll('dt');

  dts.forEach(dt => {
    dt.addEventListener('click', () => {
      dt.parentNode.classList.toggle('text-open');
      dts.forEach(el => {
        if (dt !== el) {
          el.parentNode.classList.remove('text-open');
        }
      });
    });
  });

  // form-overlay

  const formOpen = document.querySelector('#form-open');
  const formOverlay = document.querySelector('.form-overlay');
  const formClose = document.querySelector('#close-farm-overlay');
  const returnTop = document.querySelector('.return-top');

  formOpen.addEventListener('click', () => {
    formOverlay.classList.add('open');
    returnTop.classList.add('hidden');
  });

  formClose.addEventListener('click', () => {
    formOverlay.classList.remove('open');
    returnTop.classList.remove('hidden');
  });

  // form

}