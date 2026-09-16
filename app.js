const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

menuBtn?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

links?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    links.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

function revealVisible() {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 40) el.classList.add("reveal");
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add("reveal");
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
window.addEventListener("hashchange", () => setTimeout(revealVisible, 60));
window.addEventListener("load", revealVisible);
revealVisible();
