//  JS: hamburger/X toggle + close on outside click
(function () {
  const navbar = document.getElementById("mainNavbar");
  const collapse = document.getElementById("navbarContent");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");

  function showHamburger() {
    hamburgerIcon.style.display = "";
    closeIcon.style.display = "none";
  }

  function showClose() {
    hamburgerIcon.style.display = "none";
    closeIcon.style.display = "flex";
  }

  function closeMenu() {
    const bsCollapse =
      window.bootstrap &&
      (bootstrap.Collapse.getInstance(collapse) ||
        new bootstrap.Collapse(collapse, { toggle: false }));
    if (bsCollapse) bsCollapse.hide();
    showHamburger();
  }

  // Sync icon when Bootstrap opens the menu
  collapse.addEventListener("show.bs.collapse", showClose);

  // Sync icon when Bootstrap closes the menu
  collapse.addEventListener("hide.bs.collapse", showHamburger);

  // Close on outside click
  document.addEventListener("click", function (e) {
    if (collapse.classList.contains("show") && !navbar.contains(e.target)) {
      closeMenu();
    }
  });

  // Close when a nav link is clicked
  collapse.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (collapse.classList.contains("show")) closeMenu();
    });
  });
})();

// SCHEDULE ANIMATION

const items = document.querySelectorAll(".schedule-item");

let currentIndex = 0;

/* RESET ITEMS */
function resetItems() {
  items.forEach((item, index) => {
    item.classList.remove("active-item");

    const fill = item.querySelector(".progress-fill");

    fill.style.transition = "none";
    fill.style.width = "0%";

    // force repaint
    fill.offsetHeight;

    fill.style.transition = "width 1.4s linear";
  });
}

/* START LOOP */
function startAnimation() {
  resetItems();

  currentIndex = 0;

  animateNext();
}

/* ANIMATE NEXT */
function animateNext() {
  if (currentIndex >= items.length) {
    setTimeout(() => {
      startAnimation();
    }, 800);

    return;
  }

  const currentItem = items[currentIndex];

  currentItem.classList.add("active-item");

  const fill = currentItem.querySelector(".progress-fill");

  setTimeout(() => {
    fill.style.width = "100%";
  }, 100);

  currentIndex++;

  setTimeout(() => {
    animateNext();
  }, 1800);
}

/* INITIAL START */
startAnimation();
