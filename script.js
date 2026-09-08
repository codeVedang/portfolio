const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector(".site-nav");
const closeMenu = () => {
  nav?.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
  toggle?.setAttribute("aria-label", "Open navigation");
};
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav?.classList.contains("is-open")) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);

document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document
      .querySelectorAll("[data-filter]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    document.querySelectorAll("[data-category]").forEach((item) => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
    const count = filter === "all" ? 4 : filter === "professional" ? 1 : 3;
    document.querySelector("[data-result-count]").textContent =
      `${count} ${count === 1 ? "project" : "projects"}`;
  }),
);

document
  .querySelector("[data-copy-email]")
  ?.addEventListener("click", async () => {
    const status = document.querySelector("[data-copy-status]");
    try {
      await navigator.clipboard.writeText("vedangt17@gmail.com");
      status.textContent = "Email address copied.";
    } catch {
      status.textContent = "Copy this address: vedangt17@gmail.com";
    }
  });
document
  .querySelector("[data-contact-form]")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Portfolio enquiry from ${String(data.get("name")).trim()}`;
    const body = `${String(data.get("message")).trim()}\n\nFrom: ${String(data.get("name")).trim()}\nEmail: ${String(data.get("email")).trim()}`;
    window.location.href = `mailto:vedangt17@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.querySelector("[data-form-status]").textContent =
      "Draft prepared. Complete sending in your email app, or email me directly at vedangt17@gmail.com.";
  });
// Preserve incoming section links from the previous single-page portfolio.
if (
  location.pathname.endsWith("index.html") ||
  location.pathname.endsWith("/")
) {
  const routes = {
    "#experience": "experience.html",
    "#skills": "about.html#skills",
    "#contact": "contact.html",
    "#resume": "assets/VEDANG_KUMAR_TRIPATHI_FULL_STACK_DEV_RESUME.pdf",
  };
  if (routes[location.hash]) location.replace(routes[location.hash]);
}
