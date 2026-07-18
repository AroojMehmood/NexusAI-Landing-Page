/*  NexusAI — Premium AI SaaS Landing Page  */

(function () {
  'use strict';

  /*  DOM Elements  */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.navbar__link');
  const backToTop = document.getElementById('backToTop');
  const faqItems = document.querySelectorAll('.faq__item');
  const revealElements = document.querySelectorAll('.reveal');
  const sections = document.querySelectorAll('section[id]');

  /* Sticky Navbar + Shadow on Scroll  */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /*  Mobile Menu Toggle  */
  function toggleMobileMenu() {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /*  Smooth Scrolling  */
  function smoothScroll(e) {
    const href = this.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth' });
    closeMobileMenu();
  }

  /*  Active Nav Links on Scroll  */
  function setActiveNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /*  Scroll Reveal Animations  */
  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(function (el) {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  /*  FAQ Accordion  */
  function toggleAccordion() {
    const item = this.parentElement;
    const isActive = item.classList.contains('active');

    faqItems.forEach(function (faq) {
      faq.classList.remove('active');
      faq.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      item.classList.add('active');
      this.setAttribute('aria-expanded', 'true');
    }
  }

  /*  Back to Top Button  */
  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /*  Event Listeners  */
  window.addEventListener('scroll', function () {
    handleNavbarScroll();
    setActiveNavLink();
    revealOnScroll();
    handleBackToTop();
  });

  navToggle.addEventListener('click', toggleMobileMenu);

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', smoothScroll);
  });

  faqItems.forEach(function (item) {
    item.querySelector('.faq__question').addEventListener('click', toggleAccordion);
  });

  backToTop.addEventListener('click', scrollToTop);

  /*  Initialize  */
  handleNavbarScroll();
  revealOnScroll();
  handleBackToTop();
})();