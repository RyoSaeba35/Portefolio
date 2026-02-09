// app/javascript/application.js
import "@hotwired/turbo-rails"
import "controllers"
import { showProject, openModal, closeModal } from './portefolio';

// Fonction pour vérifier la taille de l'écran et adapter le comportement
function setupForScreenSize() {
  const isVeryLargeScreen = window.innerWidth > 1600;
  const isMobile = window.innerWidth <= 842;
  const isDesktop = window.innerWidth > 842;
  const isLargeScreen = window.innerWidth > 842;
  const isMobilePath = window.location.pathname.startsWith('/mobile');
  const isDesktopPath = window.location.pathname.startsWith('/desktop');
  const currentPath = window.location.pathname;
  const contentFrame = document.querySelector("turbo-frame#content");

  // Redirection mobile/desktop
  if (isMobile && !currentPath.startsWith('/mobile')) {
    window.location.href = '<%= mobile_home_path %>';
  } else if (isLargeScreen && isMobilePath) {
    window.location.href = '<%= root_path %>';
  } else if (!isVeryLargeScreen && isDesktopPath) {
    window.location.href = '/';
  }

  // Charger la section par défaut pour les grands écrans
  if (isVeryLargeScreen && contentFrame && currentPath === "/") {
    contentFrame.src = "/desktop/about";
  }

  // Adapter les liens de la navbar
  document.querySelectorAll(".js-dynamic-link").forEach(link => {
    const section = link.dataset.section;

    if (isVeryLargeScreen) {
      link.setAttribute("data-turbo-frame", "content");
      link.setAttribute("data-action", "desktop#load");
      link.setAttribute("data-section", section);
      link.href = "#";
    } else {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  // Gestion des projets (desktop)
  if (isDesktop) {
    function showProject(projectNumber) {
      document.querySelectorAll('.c-item').forEach(item => {
        item.style.display = 'none';
      });
      const selectedProject = document.getElementById(`project_${projectNumber}`);
      if (selectedProject) {
        selectedProject.style.display = 'block';
      }
    }
    showProject(1);

    document.querySelectorAll(".project-link").forEach(link => {
      link.addEventListener("click", function() {
        const projectNumber = parseInt(this.textContent);
        showProject(projectNumber);
      });
    });
  }

  // Toggle functionality
  document.querySelectorAll('.toggle-trigger').forEach(trigger => {
    trigger.addEventListener('click', function() {
      const target = this.nextElementSibling;
      const icon = this.querySelector('i');
      if (target.classList.contains('toggle-target')) {
        if (target.style.display === 'none' || target.style.display === '') {
          target.style.display = 'block';
          icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
        } else {
          target.style.display = 'none';
          icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
        }
      }
    });
  });

  // Modal functionality
  window.openModal = function(imgSrc) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = imgSrc;
    document.documentElement.style.overflow = "hidden";
  };

  window.closeModal = function() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.documentElement.style.overflow = "auto";
  };

  // Main mobile carousel logic
  if (isMobile) {
    const carouselWrapper = document.querySelector(".c-inner");
    if (carouselWrapper) {
      const carouselSlides = document.querySelectorAll(".c-item");
      const projectLinks = document.querySelectorAll(".project-link");
      let currentIndex = 0;
      let startX = 0;
      let isDragging = false;

      function updateCarousel() {
        carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        document.querySelectorAll('.toggle-target').forEach(target => {
          target.style.display = 'none';
        });
        document.querySelectorAll('.toggle-trigger i').forEach(icon => {
          icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
        });
      }

      projectLinks.forEach(link => {
        link.addEventListener("click", function() {
          const projectNumber = parseInt(this.textContent) - 1;
          currentIndex = projectNumber;
          updateCarousel();
        });
      });

      carouselWrapper.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      });

      carouselWrapper.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].clientX;
        const diff = startX - x;
        if (diff > 50 && currentIndex < carouselSlides.length - 1) {
          currentIndex++;
          updateCarousel();
          isDragging = false;
        } else if (diff < -50 && currentIndex > 0) {
          currentIndex--;
          updateCarousel();
          isDragging = false;
        }
      });

      carouselWrapper.addEventListener("touchend", () => {
        isDragging = false;
      });

      updateCarousel();
    }
  }

  // Change image functionality
  window.changeImage = function(src, mainImageId) {
    const mainImage = document.getElementById(mainImageId);
    mainImage.src = src;
    const thumbnails = event.currentTarget.parentNode.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
      thumb.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
  };
}

// Initialisation
document.addEventListener("DOMContentLoaded", setupForScreenSize);
window.addEventListener('resize', setupForScreenSize);
