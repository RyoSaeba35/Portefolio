// app/javascript/application.js
import "@hotwired/turbo-rails"
console.log("Turbo chargé :", Turbo); // Vérifie que Turbo est disponible
import "controllers"
import { showProject, openModal, closeModal } from './portefolio';

// Fonction pour vérifier la taille de l'écran et rediriger si nécessaire
function checkScreenSize() {
  const isVeryLargeScreen = window.innerWidth > 1600;
  const isDesktopPath = window.location.pathname.startsWith('/desktop');

  if (!isVeryLargeScreen && isDesktopPath) {
    window.location.href = '/'; // Retour à la page d'accueil standard
  }
}

// Charger la section par défaut pour les grands écrans
function loadDefaultSection() {
  const isVeryLargeScreen = window.innerWidth > 1600;
  if (isVeryLargeScreen) {
    const contentFrame = document.querySelector("turbo-frame#content");
    if (contentFrame) {
      contentFrame.src = "/desktop/about";
    }
  }
}

// Adapter les liens de la navbar en fonction de la taille de l'écran
function setupDynamicLinks() {
  const isVeryLargeScreen = window.innerWidth > 1600;

  // Désactiver Turbo Frames pour les écrans ≤ 1600px
  if (!isVeryLargeScreen) {
    document.querySelectorAll("[data-turbo-frame]").forEach(link => {
      link.removeAttribute("data-turbo-frame");
      link.removeAttribute("data-action");
    });
  }

  // Gestion du défilement fluide pour les écrans ≤ 1600px
  document.querySelectorAll(".scroll-link").forEach(link => {
    link.addEventListener("click", function(event) {
      if (!isVeryLargeScreen) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Adapter les liens dynamiques pour les grands écrans
  document.querySelectorAll(".js-dynamic-link").forEach(link => {
    const section = link.dataset.section;

    if (isVeryLargeScreen) {
      link.setAttribute("data-turbo-frame", "content");
      link.setAttribute("data-action", "desktop#load");
      link.setAttribute("data-section", section);
      link.href = "#"; // Empêcher le défilement
    }
  });
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function() {
  checkScreenSize();
  loadDefaultSection();
  setupDynamicLinks();
});

// Mise à jour lors du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
  checkScreenSize();
  setupDynamicLinks();
});
