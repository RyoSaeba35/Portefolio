// Vanilla JS behaviors for the portfolio site: project tabs, image modal,
// gallery thumbnails, smooth scroll. Wired through data-action attributes
// instead of inline onclick, so these exports don't need to live on
// `window` for the markup to reach them.

export function showProject(projectNumber) {
  document.querySelectorAll(".c-item").forEach((item) => {
    item.style.display = "none";
  });
  const selectedProject = document.getElementById(`project_${projectNumber}`);
  if (selectedProject) selectedProject.style.display = "block";
}

export function openModal(imgSrc) {
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("img01");
  if (!modal || !modalImage) return;
  modalImage.src = imgSrc;
  modal.style.display = "block";
  document.documentElement.style.overflow = "hidden";
}

export function closeModal() {
  const modal = document.getElementById("myModal");
  if (!modal) return;
  modal.style.display = "none";
  document.documentElement.style.overflow = "auto";
}

function initProjectTabs() {
  document.querySelectorAll(".project-link").forEach((tab) => {
    tab.addEventListener("click", () => {
      showProject(parseInt(tab.dataset.index, 10) + 1);
    });
  });
  showProject(1);
}

function initModalTriggers() {
  document.querySelectorAll('[data-action="open-modal"]').forEach((img) => {
    img.addEventListener("click", () => openModal(img.src));
  });

  const modal = document.getElementById("myModal");
  if (!modal) return;

  const closeButton = modal.querySelector(".close");
  if (closeButton) closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

function initGallery() {
  document.querySelectorAll('[data-action="change-image"]').forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const mainImage = document.getElementById(thumb.dataset.target);
      if (!mainImage) return;
      mainImage.src = thumb.src;
      thumb.parentElement
        .querySelectorAll(".thumbnail")
        .forEach((sibling) => sibling.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}

// On mobile (<= 842px, matching the SCSS breakpoint), the site behaves like
// three separate screens instead of one scrolling page: Home, Projets,
// Contact. Each maps to one of these section ids.
const MOBILE_BREAKPOINT = 842;
const MOBILE_SCREENS = {
  about_section: "home",
  projects_section: "projects",
  contact_section: "contact",
};

function isMobileLayout() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
}

export function showScreen(screenName) {
  Object.entries(MOBILE_SCREENS).forEach(([sectionId, name]) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.classList.remove("js-pre-hide");
    if (name === screenName) {
      section.classList.remove("screen-hidden");
      section.scrollTop = 0;
    } else {
      section.classList.add("screen-hidden");
    }
  });
  document.body.dataset.screen = screenName;
}

function initMobileScreens() {
  if (!isMobileLayout()) return;
  showScreen(document.body.dataset.initialScreen || "home");
}

// The CSS-only trick for forcing closed <details> content to stay visible
// isn't reliable across browsers, so on desktop we just set the real `open`
// property directly — that's guaranteed to work regardless of how a given
// browser implements the hidden state internally. Clicking is already
// disabled on desktop via pointer-events in the CSS, so once forced open
// it stays open.
function forceDetailsOpenOnDesktop() {
  if (isMobileLayout()) return;
  document.querySelectorAll(".middle-project details").forEach((details) => {
    details.open = true;
  });
}

function initSmoothScroll() {
  document.querySelectorAll(".scroll-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();

      if (isMobileLayout() && MOBILE_SCREENS[target.id]) {
        showScreen(MOBILE_SCREENS[target.id]);
        return;
      }
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function initAll() {
  initSmoothScroll();
  initProjectTabs();
  initModalTriggers();
  initGallery();
  initMobileScreens();
  forceDetailsOpenOnDesktop();
}

// Covers resizing the browser window across the breakpoint without a
// reload (e.g. while testing) — re-checks and force-opens as needed.
window.addEventListener("resize", forceDetailsOpenOnDesktop);

// turbo:load fires after every Turbo-managed page render, including the
// very first one — unlike DOMContentLoaded, which only fires once. We need
// that: when the contact form fails validation, Rails re-renders this same
// page and Turbo swaps it in without a full reload, so DOMContentLoaded
// would never fire again and none of the click handlers above would get
// re-attached to the fresh DOM.
document.addEventListener("turbo:load", initAll);
