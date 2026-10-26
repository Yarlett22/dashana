/* Dashana – carrito de pedido: el cliente junta varios jabones y envía un solo mensaje por WhatsApp */
(function () {
  var D = window.DATOS;
  var CLAVE = "dashana-carrito";
  var items = [];
  try { items = JSON.parse(localStorage.getItem(CLAVE) || "[]") || []; } catch (e) { items = []; }

  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(items)); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function total() { return items.reduce(function (t, i) { return t + i.cantidad; }, 0); }

  // ---- Elementos ----
  var boton = document.createElement("button");
  boton.type = "button";
  boton.className = "carrito-flotante";
  boton.setAttribute("aria-label", "Ver mi pedido");
  boton.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><span class="carrito-flotante__num">0</span>';
  document.body.appendChild(boton);

  var fondo = document.createElement("div");
  fondo.className = "carrito-fondo";
  fondo.hidden = true;
  fondo.innerHTML =
    '<aside class="carrito" role="dialog" aria-modal="true" aria-labelledby="carrito-titulo">' +
    '  <div class="carrito__cabecera"><h2 id="carrito-titulo">Mi pedido</h2>' +
    '    <button type="button" class="carrito__cerrar" aria-label="Cerrar"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
    '  <div class="carrito__lista"></div>' +
    '  <div class="carrito__pie">' +
    '    <label class="carrito__nota-label" for="carrito-nota">Comentarios (opcional)</label>' +
    '    <textarea id="carrito-nota" class="carrito__nota" rows="2" placeholder="Fecha del evento, entrega, colores…"></textarea>' +
    '    <a class="boton boton--verde boton--grande carrito__enviar" href="#" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Enviar pedido por WhatsApp</a>' +
    '    <button type="button" class="carrito__vaciar">Vaciar pedido</button>' +
    '  </div>' +
    '</aside>';
  document.body.appendChild(fondo);

  var aviso = document.createElement("div");
  aviso.className = "carrito-aviso";
  aviso.setAttribute("role", "status");
  aviso.setAttribute("aria-live", "polite");
  document.body.appendChild(aviso);

  var lista = fondo.querySelector(".carrito__lista");
  var nota = fondo.querySelector(".carrito__nota");
  var enviar = fondo.querySelector(".carrito__enviar");

  function mensaje() {
    var m = "Hola Dashana, quiero hacer este pedido:\n";
    items.forEach(function (i, n) {
      m += "\n" + (n + 1) + ". " + i.nombre + (i.detalle ? " (" + i.detalle + ")" : "") + " × " + i.cantidad;
    });
    if (nota.value.trim()) m += "\n\nComentarios: " + nota.value.trim();
    m += "\n\n¿Me confirman disponibilidad y precio? Gracias.";
    return "https://wa.me/" + D.whatsapp + "?text=" + encodeURIComponent(m);
  }

  function pintar() {
    var n = total();
    boton.querySelector(".carrito-flotante__num").textContent = n;
    boton.classList.toggle("carrito-flotante--visible", n > 0);
    boton.setAttribute("aria-label", "Ver mi pedido (" + n + " jabones)");
    if (!items.length) {
      lista.innerHTML = '<p class="carrito__vacio">Aún no agregas jabones. Toca <strong>Agregar</strong> en los que te gusten y aquí armamos tu pedido.</p>';
      enviar.setAttribute("aria-disabled", "true");
      enviar.classList.add("boton--inactivo");
    } else {
      lista.innerHTML = items.map(function (i, n) {
        return '<div class="carrito__item">' +
          (i.foto ? '<img src="' + esc(i.foto) + '" alt="" width="64" height="64">' : '<span class="carrito__sin-foto" aria-hidden="true"' + (i.color ? ' style="background:' + esc(i.color) + '"' : '') + '></span>') +
          '<div class="carrito__info"><strong>' + esc(i.nombre) + '</strong>' + (i.detalle ? '<span>' + esc(i.detalle) + '</span>' : '') +
          '<div class="carrito__cant">' +
          '<button type="button" data-accion="menos" data-n="' + n + '" aria-label="Quitar uno de ' + esc(i.nombre) + '">−</button>' +
          '<span>' + i.cantidad + '</span>' +
          '<button type="button" data-accion="mas" data-n="' + n + '" aria-label="Agregar uno de ' + esc(i.nombre) + '">+</button>' +
          '</div></div>' +
          '<button type="button" class="carrito__quitar" data-accion="quitar" data-n="' + n + '" aria-label="Quitar ' + esc(i.nombre) + ' del pedido">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></button>' +
          '</div>';
      }).join("");
      enviar.removeAttribute("aria-disabled");
      enviar.classList.remove("boton--inactivo");
    }
    enviar.href = items.length ? mensaje() : "#";
  }

  function abrir() { fondo.hidden = false; document.body.classList.add("sin-scroll"); fondo.querySelector(".carrito__cerrar").focus(); }
  function cerrar() { fondo.hidden = true; document.body.classList.remove("sin-scroll"); boton.focus({ preventScroll: true }); }

  var temporizador;
  function avisar(texto) {
    aviso.textContent = texto;
    aviso.classList.add("carrito-aviso--visible");
    clearTimeout(temporizador);
    temporizador = setTimeout(function () { aviso.classList.remove("carrito-aviso--visible"); }, 2200);
  }

  function agregar(item) {
    var cant = Math.max(1, parseInt(item.cantidad, 10) || 1);
    var existente = items.filter(function (i) { return i.nombre === item.nombre && (i.detalle || "") === (item.detalle || ""); })[0];
    if (existente) existente.cantidad += cant;
    else items.push({ nombre: item.nombre, detalle: item.detalle || "", foto: item.foto || "", color: item.color || "", cantidad: cant });
    guardar(); pintar();
    avisar("✓ " + item.nombre + " agregado a tu pedido");
    boton.classList.remove("carrito-flotante--salto"); void boton.offsetWidth; boton.classList.add("carrito-flotante--salto");
  }

  // ---- Eventos ----
  boton.addEventListener("click", abrir);
  fondo.addEventListener("click", function (e) { if (e.target === fondo) cerrar(); });
  fondo.querySelector(".carrito__cerrar").addEventListener("click", cerrar);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !fondo.hidden) cerrar(); });
  nota.addEventListener("input", function () { enviar.href = items.length ? mensaje() : "#"; });
  enviar.addEventListener("click", function (e) { if (!items.length) e.preventDefault(); });
  fondo.querySelector(".carrito__vaciar").addEventListener("click", function () { items = []; guardar(); pintar(); });
  lista.addEventListener("click", function (e) {
    var b = e.target.closest("[data-accion]");
    if (!b) return;
    var n = +b.dataset.n, acc = b.dataset.accion;
    if (acc === "mas") items[n].cantidad++;
    if (acc === "menos") { items[n].cantidad--; if (items[n].cantidad < 1) items.splice(n, 1); }
    if (acc === "quitar") items.splice(n, 1);
    guardar(); pintar();
  });
  // Botones "Agregar" de las tarjetas (se crean después, por eso se escucha en todo el documento)
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-agregar]");
    if (!b) return;
    e.preventDefault();
    agregar({ nombre: b.dataset.nombre, foto: b.dataset.foto, detalle: b.dataset.detalle, cantidad: 1 });
    var original = b.innerHTML;
    b.innerHTML = "✓ Agregado";
    b.disabled = true;
    setTimeout(function () { b.innerHTML = original; b.disabled = false; }, 1200);
  });

  window.DashanaCarrito = { agregar: agregar, abrir: abrir };
  pintar();
})();
