const nav = document.querySelector(".nav");
const page = (location.pathname.split("/").pop() || "index.html").toLowerCase() || "index.html";
const home = page === "index.html" || page === "" || page === "aip";
const modelPages = ["911.html", "gt3.html", "boxster.html", "taycan.html", "cayenne.html", "panamera.html"];

const links = [
  { href: "index.html", match: ["index.html", ""], label: "Главная" },
  { href: "history.html", match: ["history.html"], label: "История" },
  { href: "models.html", match: ["models.html", ...modelPages], label: "Модели" },
  { href: "design.html", match: ["design.html"], label: "Дизайн" },
  { href: "motorsport.html", match: ["motorsport.html"], label: "Трасса" },
  { href: "contact.html", match: ["contact.html"], label: "Контакты" }
];

if (nav) {
  nav.innerHTML = `
    <a class="logo" href="index.html">Porsche</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-label="Меню">☰</button>
    <ul class="nav-links">
      ${links.map((item) => {
        const active = item.match.includes(page) || (home && item.href === "index.html");
        return `<li><a href="${item.href}"${active ? ' class="active" aria-current="page"' : ""}>${item.label}</a></li>`;
      }).join("")}
    </ul>
  `;
}

const footer = document.querySelector("[data-footer]");
if (footer) {
  footer.innerHTML = `
    <div class="wrap footer-grid">
      <div>
        <a class="logo" href="index.html">Porsche</a>
        <p class="footer-tag">There is no substitute.</p>
      </div>
      <div>
        <h3>Разделы</h3>
        <a href="history.html">История</a>
        <a href="models.html">Модели</a>
        <a href="design.html">Дизайн</a>
        <a href="motorsport.html">Трасса</a>
        <a href="contact.html">Контакты</a>
      </div>
      <div>
        <h3>Гараж</h3>
        <a href="911.html">911</a>
        <a href="gt3.html">GT3 RS</a>
        <a href="boxster.html">718 Boxster</a>
        <a href="taycan.html">Taycan</a>
        <a href="cayenne.html">Cayenne</a>
        <a href="panamera.html">Panamera</a>
      </div>
    </div>
    <p class="copy">© 2026 Kemal Zeitulaev. Сайт создан в учебных целях. Фото: Wikimedia Commons.</p>
  `;
}

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".nav-links");

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
