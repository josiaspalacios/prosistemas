document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");

  // ---- ACORDEÓN DE CATEGORÍAS ----
  items.forEach((item) => {
    const cat = item.querySelector(".categoria");
    const sub = item.querySelector(".sub");

    cat.setAttribute("tabindex", "0");
    cat.setAttribute("role", "button");
    cat.setAttribute("aria-expanded", item.classList.contains("open"));

    const toggle = () => {
      const willOpen = !item.classList.contains("open");

      // cerrar las demás categorías
      items.forEach((i) => {
        if (i !== item) {
          i.classList.remove("open");
          i.querySelector(".categoria").setAttribute("aria-expanded", "false");
          i.querySelector(".sub").style.maxHeight = null;
        }
      });

      item.classList.toggle("open", willOpen);
      cat.setAttribute("aria-expanded", String(willOpen));

      // altura real del submenú, así nunca se corta el contenido
      sub.style.maxHeight = willOpen ? sub.scrollHeight + "px" : null;
    };

    cat.addEventListener("click", toggle);

    // accesibilidad: abrir/cerrar con teclado (Enter / Espacio)
    cat.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    // si la categoría empieza abierta (clase .open en el HTML), calcular su altura
    if (item.classList.contains("open")) {
      sub.style.maxHeight = sub.scrollHeight + "px";
    }
  });

  // ---- MARCAR SUBITEM SELECCIONADO ----
  document.querySelectorAll(".sub li").forEach((li) => {
    li.setAttribute("tabindex", "0");
    li.addEventListener("click", () => {
      document
        .querySelectorAll(".sub li")
        .forEach((el) => el.classList.remove("active-link"));
      li.classList.add("active-link");
      // Aquí conectas el filtro real de productos, ej:
      // filtrarProductos(li.textContent.trim());
    });
  });

  // ---- TOGGLE SIDEBAR EN MÓVIL ----
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".sidebar-toggle");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
    });
  }
});