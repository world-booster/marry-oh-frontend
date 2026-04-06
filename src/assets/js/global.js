document.addEventListener("DOMContentLoaded", () => {
  // ---------- GLOBAL ----------
  const MOBILE_WIDTH = 1023;
  const TOUCH_SENSITIVITY = 50;

  // ---------- RESPONSIVE / HAMBURGER ----------
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", (e) => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
      e.stopPropagation();
    });

    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("active");
        hamburger.classList.remove("active");
      }
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        nav.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }

  // ---------- RESPONSIVE / EDUCATION-DEGREE ----------
  document.querySelectorAll(".timeline-item").forEach((item) => {
    const degree = item.querySelector(".small-text");
    if (!degree) return;
    degree._originParent = degree.parentNode;
    degree._originNext = degree.nextSibling;
  });

  function moveDegreeTag() {
    document.querySelectorAll(".timeline-item").forEach((item) => {
      const year = item.querySelector(".timeline-year");
      const degree = item.querySelector(".small-text");
      if (!year || !degree) return;

      if (window.innerWidth <= MOBILE_WIDTH) {
        if (!year.contains(degree)) {
          year.appendChild(degree);
        }
      } else {
        if (degree._originParent && !degree._originParent.contains(degree)) {
          degree._originParent.insertBefore(degree, degree._originNext);
        }
      }
    });
  }

  moveDegreeTag();
  window.addEventListener("resize", moveDegreeTag);

  // ---------- SCROLL TOP BUTTON ----------
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ---------- SCROLL REVEAL : SECTION CARD ----------
  const sectionCards = document.querySelectorAll(".section-card");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01 },
  );

  sectionCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(card);
  });

  // ---------- POP UP ----------
  let currentSlide = 0;
  let slides = [];

  window.showPopup = function (images) {
    const slider = document.getElementById("popup-slider");
    if (!slider) return;

    slider.innerHTML = "";
    slides = [];
    if (!images || images.length === 0) return;

    images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      slider.appendChild(img);
      slides.push(img);
    });

    currentSlide = 0;
    slides.forEach(
      (img, i) => (img.style.display = i === 0 ? "block" : "none"),
    );

    const popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  };

  window.closePopup = function () {
    const popup = document.getElementById("popup");
    if (popup) popup.style.display = "none";
    document.body.style.overflow = "";
  };

  window.nextSlide = function () {
    if (!slides.length) return;
    slides[currentSlide].style.display = "none";
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = "block";
  };

  window.prevSlide = function () {
    if (!slides.length) return;
    slides[currentSlide].style.display = "none";
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].style.display = "block";
  };

  const popupOverlay = document.getElementById("popup");
  if (popupOverlay) {
    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) closePopup();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });

  // ---------- POP UP / MOBILE ----------
  function isMobile() {
    return window.innerWidth <= MOBILE_WIDTH;
  }

  if (isMobile()) {
    let startX = 0;
    let endX = 0;
    const popup = document.getElementById("popup");

    if (popup) {
      popup.addEventListener(
        "touchstart",
        (e) => {
          if (e.target.closest(".prev-btn, .next-btn")) return;
          if (e.touches.length > 1) {
            startX = 0;
            return;
          }
          startX = e.touches[0].clientX;
        },
        { passive: true },
      );

      popup.addEventListener(
        "touchmove",
        (e) => {
          if (startX === 0) return;
          if (e.touches.length > 1) {
            startX = 0;
            return;
          }
          endX = e.touches[0].clientX;
        },
        { passive: true },
      );

      popup.addEventListener(
        "touchend",
        (e) => {
          if (startX === 0) return;
          const diff = endX - startX;
          if (Math.abs(diff) > TOUCH_SENSITIVITY) {
            if (diff < 0) nextSlide();
            else prevSlide();
          }
          startX = 0;
          endX = 0;
        },
        { passive: true },
      );
    }
  }
});
