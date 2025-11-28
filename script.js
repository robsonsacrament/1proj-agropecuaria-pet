// ==================== AGROPET - SCRIPT PRINCIPAL ====================
(function() {
  'use strict';

  // ==================== ESPERA DOM CARREGAR ====================
  document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== ELEMENTOS ====================
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("navLinks");
    const dropdown = document.querySelector('.dropdown');
    const dropdownBtn = document.querySelector('.dropbtn');
    const submenu = document.querySelector('.submenu');

    // ==================== MENU MOBILE TOGGLE ====================
    if (menuBtn && navLinks) {
      
      menuBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        
        const isOpen = navLinks.classList.toggle("active");
        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", isOpen);
        
        // Fecha submenu quando fechar menu
        if (!isOpen && submenu) {
          submenu.classList.remove('active');
          if (dropdown) dropdown.classList.remove('active');
        }
      });

      // Fechar ao clicar fora
      document.addEventListener("click", function(e) {
        if (navLinks.classList.contains('active')) {
          if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove("active");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
            
            if (submenu) submenu.classList.remove('active');
            if (dropdown) dropdown.classList.remove('active');
            
          }
        }
      });
      
    }

    // ==================== SUBMENU MOBILE ====================
    if (dropdownBtn && submenu && dropdown) {
      
      dropdownBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Só funciona no mobile
        if (window.innerWidth <= 768) {
          
          // Toggle classes
          const isOpen = submenu.classList.toggle('active');
          dropdown.classList.toggle('active', isOpen);
          dropdownBtn.setAttribute('aria-expanded', isOpen);
          
        }
      });

      // Fechar submenu ao clicar em link
      const submenuLinks = submenu.querySelectorAll('a');
      
      submenuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          
          // Fecha tudo
          submenu.classList.remove('active');
          dropdown.classList.remove('active');
          navLinks.classList.remove('active');
          
          if (menuBtn) {
            menuBtn.textContent = '☰';
            menuBtn.setAttribute('aria-expanded', 'false');
          }
          
        });
      });
      
    }

    // ==================== FAQ ACORDEÃO ====================
    const faqItems = document.querySelectorAll(".faq-item");
    
    faqItems.forEach(function(item, index) {
      const btn = item.querySelector(".faq-question");
      
      if (btn) {
        btn.addEventListener("click", function() {
          
          // Fecha outros itens
          faqItems.forEach(function(other) {
            if (other !== item && other.classList.contains('active')) {
              other.classList.remove("active");
              const otherBtn = other.querySelector('.faq-question');
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            }
          });
          
          // Toggle item atual
          const isActive = item.classList.toggle("active");
          btn.setAttribute('aria-expanded', isActive);
          
        });
      }
    });

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        
        if (href && href !== "#" && href !== "javascript:void(0)" && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            
            target.scrollIntoView({ 
              behavior: "smooth", 
              block: "start" 
            });
            
            // Fecha menu mobile se estiver aberto
            if (navLinks && navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              if (menuBtn) {
                menuBtn.textContent = '☰';
                menuBtn.setAttribute('aria-expanded', 'false');
              }
            }
          }
        }
      });
    });

    // ==================== RESIZE HANDLER ====================
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        
        // Se mudou para desktop, fecha tudo
        if (window.innerWidth > 768) {
          if (navLinks) navLinks.classList.remove('active');
          if (submenu) {
            submenu.classList.remove('active');
            submenu.style.display = '';
            submenu.style.maxHeight = '';
            submenu.style.opacity = '';
          }
          if (dropdown) dropdown.classList.remove('active');
          if (menuBtn) {
            menuBtn.textContent = '☰';
            menuBtn.setAttribute('aria-expanded', 'false');
          }
        }
        
      }, 250);
    });

    // ==================== FADE-IN ON SCROLL ====================
    function checkVisibility() {
      const sections = document.querySelectorAll("section");
      const windowHeight = window.innerHeight;
      
      sections.forEach(function(sec) {
        const rect = sec.getBoundingClientRect();
        
        if (rect.top < windowHeight - 100 && !sec.classList.contains('visible')) {
          sec.classList.add("visible");
        }
      });
    }

    // Executa ao carregar
    window.addEventListener("load", checkVisibility);
    window.addEventListener("scroll", checkVisibility);
    
    // Executa imediatamente
    checkVisibility();
    
  }); // Fim DOMContentLoaded

})(); // Fim IIFE