if (/\/Aip$/i.test(location.pathname)) {
  location.replace("/Aip/" + location.search + location.hash);
}

const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".nav-links");
const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
const page = !file || file === "aip" ? "index.html" : file;
const modelPages = ["911.html", "gt3.html", "boxster.html", "taycan.html", "cayenne.html", "panamera.html"];

const activeFor = {
  "index.html": ["index.html"],
  "history.html": ["history.html"],
  "models.html": ["models.html", ...modelPages],
  "design.html": ["design.html"],
  "motorsport.html": ["motorsport.html"],
  "contact.html": ["contact.html"]
};

menu?.querySelectorAll("a").forEach((a) => {
  const href = (a.getAttribute("href") || "").split("/").pop();
  if ((activeFor[href] || [href]).includes(page)) {
    a.classList.add("active");
    a.setAttribute("aria-current", "page");
  }
});

window.addEventListener("scroll", () => {
  nav?.classList.toggle("scrolled", window.scrollY > 20);
});

menuBtn?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

menu?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

function revealVisible() {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 40) el.classList.add("reveal");
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
window.addEventListener("load", revealVisible);
revealVisible();

const form = document.querySelector(".contact-form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const note = document.querySelector(".form-note");
  if (note) {
    note.hidden = false;
    note.textContent = "Сообщение записано локально. Это учебный сайт, письма никуда не уходят.";
  }
  form.reset();
});
