// Menu Mobile Toggle
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isActive = navLinks.classList.toggle("active");
  menuBtn.setAttribute("aria-expanded", isActive);
  menuBtn.setAttribute("aria-label", isActive ? "Fechar menu" : "Abrir menu");
  menuBtn.textContent = isActive ? "✕" : "☰";
});

// Fechar menu ao clicar em um link
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

// Fechar menu ao clicar fora
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Fade-in on scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll("section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
});

// Inicializa seções visíveis ao carregar
window.addEventListener("load", () => {
  document.querySelectorAll("section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
});
