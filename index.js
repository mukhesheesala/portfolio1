
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const typedText = document.getElementById("typedText");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("year");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Footer year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );

      menuToggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Typing effect
  if (typedText) {
    const roles = [
      "SOC Analyst L1",
      "Cybersecurity Enthusiast",
      "Security Monitoring Learner",
      "Aspiring Security Analyst"
    ];

    if (reduceMotion) {
      typedText.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function typeEffect() {
        const word = roles[roleIndex];

        charIndex += deleting ? -1 : 1;
        typedText.textContent = word.substring(0, charIndex);

        let delay = deleting ? 40 : 80;

        if (!deleting && charIndex >= word.length) {
          deleting = true;
          delay = 1500;
        } else if (deleting && charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 350;
        }

        window.setTimeout(typeEffect, delay);
      }

      typeEffect();
    }
  }

  // Reveal content as it enters the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  // Highlight the navigation item for the visible section
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navItems.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Back-to-top button
  if (backToTop) {
    const updateButton = () => {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    };

    window.addEventListener("scroll", updateButton, { passive: true });
    updateButton();

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  }

  // Floating background particles
  const particleContainer = document.getElementById("particles");

  if (particleContainer && !reduceMotion) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("span");
      const size = Math.random() * 4 + 2;
      const pink = i % 4 === 0;
      const color = pink ? "#f05bd5" : "#38d9ff";

      particle.className = "particle";

      Object.assign(particle.style, {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        boxShadow: `0 0 12px ${color}`,
        opacity: String(Math.random() * 0.5 + 0.2),
        animationDuration: `${7 + Math.random() * 8}s`,
        animationDelay: `${Math.random() * -12}s`
      });

      particleContainer.appendChild(particle);
    }
  }

  console.info("Cybersecurity portfolio initialized successfully.");
});
