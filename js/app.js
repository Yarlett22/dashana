/* Dashana – lógica de la página (no hace falta editar este archivo para cambiar productos: usa js/datos.js) */
(function () {
  var D = window.DATOS;

  function wa(msg) { return "https://wa.me/" + D.whatsapp + "?text=" + encodeURIComponent(msg); }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function jabonSVG(color) {
    return '<svg viewBox="0 0 200 140" aria-hidden="true"><rect x="20" y="40" width="160" height="90" rx="20" fill="#00000022"/><rect x="20" y="30" width="160" height="90" rx="20" fill="' + color + '"/></svg>';
  }
  var iconoRegalo = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4E1D5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>';
  var iconoHoja = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2F6B3A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';

  // ---- Enlaces generales de WhatsApp ----
  document.querySelectorAll(".js-wa-general").forEach(function (a) {
    a.href = wa("Hola Dashana, quisiera información sobre sus jabones artesanales.");
  });
  document.querySelectorAll(".js-wa").forEach(function (a) { a.href = wa(a.dataset.msg); });
  document.getElementById("anio").textContent = new Date().getFullYear();

  // ---- Cuidado natural (con filtros) ----
  var categorias = ["Todos"];
  D.cuidado.forEach(function (p) { if (categorias.indexOf(p.categoria) < 0) categorias.push(p.categoria); });
  var catActual = "Todos";
  var filtros = document.getElementById("filtros");
  function pintarCuidado() {
    var lista = document.getElementById("lista-cuidado");
    lista.innerHTML = "";
    D.cuidado.filter(function (p) { return catActual === "Todos" || p.categoria === catActual; }).forEach(function (p) {
      var foto = p.foto
        ? '<div class="tarjeta__foto"><img src="' + esc(p.foto) + '" alt="Jabón ' + esc(p.nombre) + '" loading="lazy"></div>'
        : '<div class="tarjeta__foto tarjeta__foto--ilustracion">' + jabonSVG(p.color || "#C9B3E0") + "</div>";
      lista.appendChild(el("article", { class: "tarjeta" },
        foto + '<div class="tarjeta__cuerpo"><span class="tarjeta__cat">' + esc(p.categoria) + "</span><h3>" + esc(p.nombre) +
        '</h3><p class="tarjeta__desc">' + esc(p.descripcion) + '</p><a class="boton boton--verde" target="_blank" rel="noopener" href="' +
        wa("Hola Dashana, me interesa el jabón " + p.nombre + ".") + '">Consultar por WhatsApp</a></div>'));
    });
  }
  categorias.forEach(function (c) {
    var b = el("button", { type: "button", class: "chip", "aria-pressed": c === catActual ? "true" : "false" }, esc(c));
    b.addEventListener("click", function () {
      catActual = c;
      filtros.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      pintarCuidado();
    });
    filtros.appendChild(b);
  });
  pintarCuidado();

  // ---- Figuras ----
  var listaFig = document.getElementById("lista-figuras");
  D.figuras.forEach(function (f) {
    listaFig.appendChild(el("article", { class: "tarjeta" },
      '<div class="tarjeta__foto"><img src="' + esc(f.foto) + '" alt="Jabón artesanal con forma de ' + esc(f.nombre.toLowerCase()) + '" loading="lazy" width="900" height="900"></div>' +
      '<div class="tarjeta__cuerpo"><h3>' + esc(f.nombre) + '</h3><p class="tarjeta__desc">' + esc(f.descripcion) +
      '</p><a class="boton boton--morado" target="_blank" rel="noopener" href="' + wa("Hola Dashana, me encanta el jabón " + f.nombre + ". Quisiera cotizar.") + '">Lo quiero</a></div>'));
  });

  // ---- Ocasiones ----
  var listaOc = document.getElementById("lista-ocasiones");
  D.ocasiones.forEach(function (o) {
    listaOc.appendChild(el("div", { class: "ocasion" },
      '<div class="ocasion__icono" style="background:' + esc(o.color) + '">' + iconoRegalo + "</div><h3>" + esc(o.nombre) + "</h3><p>" + esc(o.frase) +
      '</p><a class="boton boton--morado" target="_blank" rel="noopener" href="' +
      wa("Hola Dashana, quiero cotizar jabones para " + o.nombre + ". Cantidad aprox: __ · Fecha del evento: __ · Colores: __") + '">Cotizar</a>'));
  });

  // ---- Plantas ----
  var listaPl = document.getElementById("lista-plantas");
  D.plantas.forEach(function (p) {
    var foto = p.foto ? '<img src="' + esc(p.foto) + '" alt="' + esc(p.nombre) + '" loading="lazy">' : iconoHoja;
    listaPl.appendChild(el("div", { class: "planta" },
      '<div class="planta__foto" style="background:' + esc(p.color || "#DDEFE0") + '">' + foto + "</div><h3>" + esc(p.nombre) + "</h3><p>" + esc(p.descripcion) + "</p>"));
  });

  // ---- Configurador ----
  var estado = { forma: "simple:corazon", color: 0, tipo: "glicerina", aroma: D.aromas[0], cantidad: 10 };
  var visor3d = document.getElementById("visor-3d");
  var visorFoto = document.getElementById("visor-foto");
  var ayuda = document.getElementById("visor-ayuda");

  function chipGrupo(contenedor, items, clave, getId, getLabel) {
    items.forEach(function (it) {
      var b = el("button", { type: "button", class: "chip", "aria-pressed": "false" }, esc(getLabel(it)));
      b.dataset.valor = getId(it);
      b.addEventListener("click", function () { estado[clave] = getId(it); actualizar(); });
      contenedor.appendChild(b);
    });
  }
  chipGrupo(document.getElementById("op-figuras"), D.figuras, "forma", function (f, i) { return "figura:" + f.nombre; }, function (f) { return f.nombre; });
  chipGrupo(document.getElementById("op-simples"), D.formasSimples, "forma", function (f) { return "simple:" + f.id; }, function (f) { return f.nombre; });
  chipGrupo(document.getElementById("op-tipos"), D.tipos, "tipo", function (t) { return t.id; }, function (t) { return t.nombre; });
  chipGrupo(document.getElementById("op-aromas"), D.aromas, "aroma", function (a) { return a; }, function (a) { return a; });

  var opColores = document.getElementById("op-colores");
  D.colores.forEach(function (c, i) {
    var b = el("button", { type: "button", class: "color", "aria-label": c.nombre, "aria-pressed": "false", style: "background:" + c.hex });
    b.dataset.valor = String(i);
    b.addEventListener("click", function () { estado.color = i; actualizar(); });
    opColores.appendChild(b);
  });

  document.getElementById("cantidad").addEventListener("input", function (e) {
    var n = parseInt(e.target.value, 10);
    estado.cantidad = isNaN(n) || n < 1 ? 1 : n;
    actualizar();
  });

  function actualizar() {
    var esFigura = estado.forma.indexOf("figura:") === 0;
    var nombreForma, figura;
    if (esFigura) {
      nombreForma = estado.forma.slice(7);
      figura = D.figuras.filter(function (f) { return f.nombre === nombreForma; })[0];
    } else {
      var s = D.formasSimples.filter(function (f) { return "simple:" + f.id === estado.forma; })[0];
      nombreForma = s.nombre;
    }
    var esCarbon = estado.tipo === "carbon";
    var color = D.colores[estado.color];
    var nombreColor = esCarbon ? "Negro (carbón activado)" : color.nombre;
    var tipo = D.tipos.filter(function (t) { return t.id === estado.tipo; })[0];

    // marcar seleccionados
    document.querySelectorAll(".config [data-valor]").forEach(function (b) {
      var grupo = b.parentNode.id;
      var sel = (grupo === "op-figuras" || grupo === "op-simples") ? b.dataset.valor === estado.forma
        : grupo === "op-tipos" ? b.dataset.valor === estado.tipo
        : grupo === "op-aromas" ? b.dataset.valor === estado.aroma
        : grupo === "op-colores" ? b.dataset.valor === String(estado.color) : false;
      b.setAttribute("aria-pressed", sel ? "true" : "false");
    });
    document.getElementById("color-nombre").textContent = nombreColor;

    // vista previa
    visor3d.hidden = esFigura;
    visorFoto.hidden = !esFigura;
    if (esFigura) {
      document.getElementById("visor-img").src = figura.foto;
      document.getElementById("visor-img").alt = "Jabón " + figura.nombre;
      document.getElementById("visor-pie").textContent = "Foto referencial. La hacemos en el color " + nombreColor.toLowerCase() + ".";
      ayuda.textContent = figura.nombre;
    } else {
      ayuda.textContent = "Arrastra para girar el jabón y verlo por todos lados.";
      window.dispatchEvent(new CustomEvent("dashana:jabon", {
        detail: { forma: estado.forma.slice(7), color: esCarbon ? "#2E2E2E" : color.hex, tipo: estado.tipo }
      }));
    }

    var resumen = nombreForma + " · " + nombreColor + " · " + tipo.nombre + " · Aroma " + estado.aroma + " · " + estado.cantidad + " unidad(es)";
    document.getElementById("resumen").textContent = resumen;
    document.getElementById("pedir").href = wa(
      "Hola Dashana, quiero un jabón personalizado:\n• Forma: " + nombreForma + "\n• Color: " + nombreColor +
      "\n• Tipo: " + tipo.nombre + "\n• Aroma: " + estado.aroma + "\n• Cantidad: " + estado.cantidad);
    window.__dashanaJabon = { forma: estado.forma.slice(7), color: esCarbon ? "#2E2E2E" : color.hex, tipo: estado.tipo };
  }
  actualizar();
})();
