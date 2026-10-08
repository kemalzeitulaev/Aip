if (/\/Aip$/i.test(location.pathname)) {
  location.replace("/Aip/" + location.search + location.hash);
}

const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".nav-links");
const moreBtn = document.querySelector(".nav-more-btn");
const moreItem = document.querySelector(".nav-more");
const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
const page = !file || file === "aip" ? "index.html" : file;
const modelPages = ["911.html", "gt3.html", "boxster.html", "taycan.html", "cayenne.html", "panamera.html"];
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PAGES = [
  { href: "index.html", title: "Главная" },
  { href: "history.html", title: "История" },
  { href: "models.html", title: "Модели" },
  { href: "911.html", title: "911" },
  { href: "gt3.html", title: "GT3 RS" },
  { href: "boxster.html", title: "718 Boxster" },
  { href: "taycan.html", title: "Taycan" },
  { href: "cayenne.html", title: "Cayenne" },
  { href: "panamera.html", title: "Panamera" },
  { href: "design.html", title: "Дизайн" },
  { href: "motorsport.html", title: "Трасса" },
  { href: "gallery.html", title: "Галерея" },
  { href: "garage.html", title: "3D-гараж" },
  { href: "museum.html", title: "Музей" },
  { href: "colors.html", title: "Цвета" },
  { href: "factory.html", title: "Завод" },
  { href: "legends.html", title: "Легенды" },
  { href: "about.html", title: "О сайте" },
  { href: "contact.html", title: "Контакты" }
];

const activeFor = {
  "index.html": ["index.html"],
  "history.html": ["history.html"],
  "models.html": ["models.html", ...modelPages],
  "design.html": ["design.html"],
  "motorsport.html": ["motorsport.html"],
  "gallery.html": ["gallery.html"],
  "garage.html": ["garage.html"],
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

menuBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  moreItem?.classList.remove("open");
});

moreBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const open = moreItem.classList.toggle("open");
  moreBtn.setAttribute("aria-expanded", String(open));
});

menu?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    moreItem?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
    moreBtn?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (e) => {
  if (!moreItem?.contains(e.target)) {
    moreItem?.classList.remove("open");
    moreBtn?.setAttribute("aria-expanded", "false");
  }
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

const orbs = document.createElement("div");
orbs.className = "fx-orbs";
orbs.innerHTML = "<b></b><b></b><b></b>";
document.body.prepend(orbs);

const wipe = document.createElement("div");
wipe.className = "wipe";
wipe.innerHTML = "<span>Porsche</span>";
document.body.append(wipe);

function resetWipe() {
  wipe.classList.remove("go");
}

window.addEventListener("pageshow", resetWipe);
window.addEventListener("pagehide", resetWipe);

document.addEventListener("click", (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest("a[href]");
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
  let url;
  try {
    url = new URL(a.href, location.href);
  } catch {
    return;
  }
  if (url.origin !== location.origin) return;
  if (url.protocol === "mailto:" || url.protocol === "tel:") return;
  const isPage = /\.html$/i.test(url.pathname) || /\/Aip\/?$/i.test(url.pathname);
  if (!isPage) return;
  if (url.pathname === location.pathname && url.hash) return;
  if (reduced) return;
  e.preventDefault();
  wipe.classList.add("go");
  window.setTimeout(() => {
    location.assign(url.href);
  }, 380);
});

const fine = window.matchMedia("(pointer: fine)").matches && !reduced;
if (fine) {
  const orb = document.createElement("div");
  const dot = document.createElement("div");
  orb.className = "cursor-orb";
  dot.className = "cursor-dot";
  document.body.append(orb, dot);
  window.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    orb.animate({ left: e.clientX + "px", top: e.clientY + "px" }, { duration: 280, fill: "forwards" });
  });
  document.querySelectorAll(".photo-frame, .swatch, .gallery-wall figure, .stat").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

const idx = PAGES.findIndex((item) => item.href === page);
if (idx >= 0) {
  const prev = PAGES[(idx - 1 + PAGES.length) % PAGES.length];
  const next = PAGES[(idx + 1) % PAGES.length];
  const pager = document.createElement("nav");
  pager.className = "pager";
  pager.innerHTML = `
    <a href="${prev.href}"><small>Назад</small><b>${prev.title}</b></a>
    <a class="next" href="${next.href}"><small>Дальше</small><b>${next.title}</b></a>
  `;
  const footer = document.querySelector(".site-footer");
  footer?.parentNode.insertBefore(pager, footer);
}

const ring = document.querySelector(".ring");
if (ring) {
  const faces = [...ring.children];
  const step = 360 / faces.length;
  const depth = window.innerWidth < 700 ? 220 : 380;
  faces.forEach((face, i) => {
    face.style.transform = `rotateY(${i * step}deg) translateZ(${depth}px)`;
  });
}
