const projectBase = "/" + (location.pathname.split("/").filter(Boolean)[0] || "");

if (projectBase !== "/" && location.pathname === projectBase) {
  location.replace(projectBase + "/" + location.search + location.hash);
}

const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".nav-links");
const moreBtn = document.querySelector(".nav-more-btn");
const moreItem = document.querySelector(".nav-more");
function pageKey(pathname) {
  let path = pathname.replace(/\/index\.html$/i, "").replace(/\.html$/i, "").replace(/\/+$/, "");
  const prefix = projectBase.toLowerCase();
  const low = path.toLowerCase();
  let rest = path.replace(/^\//, "");
  if (prefix && prefix !== "/" && low === prefix) rest = "";
  else if (prefix && prefix !== "/" && low.startsWith(prefix + "/")) rest = path.slice(prefix.length + 1);
  return (rest || "index").toLowerCase();
}

const page = pageKey(location.pathname);
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PAGES = [
  { href: projectBase + "/", title: "Главная" },
  { href: projectBase + "/history/", title: "История" },
  { href: projectBase + "/models/", title: "Модели" },
  { href: projectBase + "/models/911.html", title: "911" },
  { href: projectBase + "/models/gt3.html", title: "GT3 RS" },
  { href: projectBase + "/models/boxster.html", title: "718 Boxster" },
  { href: projectBase + "/models/taycan.html", title: "Taycan" },
  { href: projectBase + "/models/cayenne.html", title: "Cayenne" },
  { href: projectBase + "/models/panamera.html", title: "Panamera" },
  { href: projectBase + "/design/", title: "Дизайн" },
  { href: projectBase + "/track/", title: "Трасса" },
  { href: projectBase + "/gallery/", title: "Галерея" },
  { href: projectBase + "/garage/", title: "3D-гараж" },
  { href: projectBase + "/history/museum.html", title: "Музей" },
  { href: projectBase + "/design/colors.html", title: "Цвета" },
  { href: projectBase + "/track/factory.html", title: "Завод" },
  { href: projectBase + "/history/legends.html", title: "Легенды" },
  { href: projectBase + "/about/", title: "О сайте" },
  { href: projectBase + "/contact/", title: "Контакты" }
];

menu?.querySelectorAll("a").forEach((a) => {
  let key = "";
  try {
    key = pageKey(new URL(a.getAttribute("href"), location.href).pathname);
  } catch {
    return;
  }
  const section = page.includes("/") ? page.split("/")[0] : page;
  if (key === page || (key === section && page.startsWith(section + "/"))) {
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
  const path = url.pathname.toLowerCase();
  const base = projectBase.toLowerCase();
  const isPage = base !== "/" && (path === base || path.startsWith(base + "/")) && !/\.(css|js|jpg|jpeg|png|svg|gif|webp)$/i.test(url.pathname);
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

const idx = PAGES.findIndex((item) => pageKey(item.href) === page);
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
