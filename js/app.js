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

  // ---- Navidad ----
  var listaNav = document.getElementById("lista-navidad");
  (D.navidad || []).forEach(function (f) {
    listaNav.appendChild(el("article", { class: "tarjeta" },
      '<div class="tarjeta__foto"><img src="' + esc(f.foto) + '" alt="Jabón navideño ' + esc(f.nombre.toLowerCase()) + '" loading="lazy" width="900" height="900"></div>' +
      '<div class="tarjeta__cuerpo"><h3>' + esc(f.nombre) + '</h3><p class="tarjeta__desc">' + esc(f.descripcion) +
      '</p><a class="boton boton--morado" target="_blank" rel="noopener" href="' + wa("Hola Dashana, me interesa el jabón navideño " + f.nombre + ". Quisiera cotizar.") + '">Lo quiero</a></div>'));
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
  var moldes = D.figuras.concat(D.navidad || [], D.moldesExtra || []);
  chipGrupo(document.getElementById("op-figuras"), moldes, "forma", function (f, i) { return "figura:" + f.nombre; }, function (f) { return f.nombre; });
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

  // ---- Repintar la foto de una figura con el color elegido (conserva sombras y relieve) ----
  var cacheFotos = {};
  function hexRgb(h) { var n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function rgbHsl(r, g, b) {
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, h = 0, s = 0, d = mx - mn;
    if (d) {
      s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return [h, s, l];
  }
  function hue2(p, q, t) { if (t < 0) t += 1; if (t > 1) t -= 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; }
  function hslRgb(h, s, l) {
    if (!s) return [l, l, l];
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [hue2(p, q, h + 1 / 3), hue2(p, q, h), hue2(p, q, h - 1 / 3)];
  }
  // zona (opcional): { proteger: máscara cuyo blanco NO se repinta (p. ej. un dibujo impreso),
  //                   pintar: silueta del jabón; solo se repinta lo blanco, completo y parejo }
  function prepararFoto(src, listo, zona) {
    zona = zona || {};
    var rutaZona = zona.pintar || zona.proteger, esPintar = !!zona.pintar;
    if (cacheFotos[src]) { if (cacheFotos[src].datos) listo(cacheFotos[src]); else cacheFotos[src].espera.push(listo); return; }
    var c = cacheFotos[src] = { espera: [listo] };
    var img = new Image(), imgZona = rutaZona ? new Image() : null, pendientes = rutaZona ? 2 : 1;
    function procesar() {
      var w = img.naturalWidth, h = img.naturalHeight, cv = document.createElement("canvas");
      cv.width = w; cv.height = h;
      var ctx = cv.getContext("2d");
      var prot = null;
      if (imgZona && imgZona.naturalWidth) {
        ctx.drawImage(imgZona, 0, 0, w, h);
        prot = ctx.getImageData(0, 0, w, h).data;
        ctx.clearRect(0, 0, w, h);
      }
      ctx.drawImage(img, 0, 0);
      var px = ctx.getImageData(0, 0, w, h).data, n = w * h;
      var mascara = new Float32Array(n), luz = new Float32Array(n), suma = 0, peso = 0;
      for (var i = 0; i < n; i++) {
        var r = px[i * 4] / 255, g = px[i * 4 + 1] / 255, b = px[i * 4 + 2] / 255;
        var croma = Math.max(r, g, b) - Math.min(r, g, b);
        var m = Math.min(1, Math.max(0, (croma - 0.035) / 0.06));
        var l = rgbHsl(r, g, b)[2];
        if (prot) m = esPintar ? prot[i * 4] / 255 : m * (1 - prot[i * 4] / 255);
        mascara[i] = m; luz[i] = l; suma += l * m; peso += m;
      }
      c.w = w; c.h = h; c.datos = px; c.mascara = mascara; c.luz = luz; c.luzMedia = peso ? suma / peso : 0.7; c.contraste = esPintar ? 0.6 : 1.1;
      c.espera.forEach(function (f) { f(c); }); c.espera = [];
    }
    function cargado() { if (--pendientes === 0) procesar(); }
    img.onload = cargado;
    if (imgZona) { imgZona.onload = cargado; imgZona.onerror = cargado; imgZona.src = rutaZona; }
    img.src = src;
  }
  var pedidoColor = 0;
  function recolorear(src, hex, zona) {
    var turno = ++pedidoColor;
    prepararFoto(src, function (c) {
      if (turno !== pedidoColor) return;
      var cv = document.createElement("canvas");
      cv.width = c.w; cv.height = c.h;
      var ctx = cv.getContext("2d"), salida = ctx.createImageData(c.w, c.h), o = salida.data, px = c.datos;
      var t = hexRgb(hex), th = rgbHsl(t[0] / 255, t[1] / 255, t[2] / 255);
      for (var i = 0, n = c.w * c.h; i < n; i++) {
        var m = c.mascara[i], k = i * 4;
        if (m <= 0) { o[k] = px[k]; o[k + 1] = px[k + 1]; o[k + 2] = px[k + 2]; o[k + 3] = 255; continue; }
        var l = Math.min(0.98, Math.max(0.02, th[2] + (c.luz[i] - c.luzMedia) * c.contraste));
        var nuevo = hslRgb(th[0], th[1], l);
        o[k] = px[k] * (1 - m) + nuevo[0] * 255 * m;
        o[k + 1] = px[k + 1] * (1 - m) + nuevo[1] * 255 * m;
        o[k + 2] = px[k + 2] * (1 - m) + nuevo[2] * 255 * m;
        o[k + 3] = 255;
      }
      ctx.putImageData(salida, 0, 0);
      document.getElementById("visor-img").src = cv.toDataURL("image/jpeg", 0.92);
    }, zona);
  }

  function actualizar() {
    var esFigura = estado.forma.indexOf("figura:") === 0;
    var nombreForma, figura;
    if (esFigura) {
      nombreForma = estado.forma.slice(7);
      figura = moldes.filter(function (f) { return f.nombre === nombreForma; })[0];
    } else {
      var s = D.formasSimples.filter(function (f) { return "simple:" + f.id === estado.forma; })[0];
      nombreForma = s.nombre;
    }
    var tipo = D.tipos.filter(function (t) { return t.id === estado.tipo; })[0];
    var fijo = tipo.colorFijo;
    var esCarbon = !!fijo;
    var color = D.colores[estado.color];
    var nombreColor = fijo ? fijo.nombre : color.nombre;
    var hexFinal = fijo ? fijo.hex : color.hex;
    opColores.classList.toggle("colores--bloqueados", !!fijo);
    opColores.querySelectorAll("button").forEach(function (b) { b.disabled = !!fijo; });

    // marcar seleccionados
    document.querySelectorAll(".config [data-valor]").forEach(function (b) {
      var grupo = b.parentNode.id;
      var sel = (grupo === "op-figuras" || grupo === "op-simples") ? b.dataset.valor === estado.forma
        : grupo === "op-tipos" ? b.dataset.valor === estado.tipo
        : grupo === "op-aromas" ? b.dataset.valor === estado.aroma
        : grupo === "op-colores" ? b.dataset.valor === String(estado.color) : false;
      b.setAttribute("aria-pressed", sel && !(grupo === "op-colores" && fijo) ? "true" : "false");
    });
    document.getElementById("color-nombre").textContent = nombreColor;

    // vista previa
    visor3d.hidden = esFigura;
    visorFoto.hidden = !esFigura;
    if (esFigura) {
      var hexElegido = hexFinal;
      var fotoColor = !esCarbon && figura.fotosPorColor && figura.fotosPorColor[color.nombre];
      var imgV = document.getElementById("visor-img");
      var pie;
      if (fotoColor) {
        pedidoColor++; imgV.src = fotoColor;
        pie = "Así se ve en color " + nombreColor.toLowerCase() + ".";
      } else if (figura.repintar) {
        recolorear(figura.foto, hexElegido, { proteger: figura.proteger, pintar: figura.pintar });
        pie = "Vista aproximada en color " + nombreColor.toLowerCase() + ".";
      } else {
        pedidoColor++; imgV.src = figura.foto;
        pie = "Foto referencial. También lo hacemos en color " + nombreColor.toLowerCase() + ".";
      }
      imgV.alt = "Jabón " + figura.nombre + " en color " + nombreColor.toLowerCase();
      document.getElementById("visor-pie").textContent = pie;
      ayuda.textContent = figura.nombre + " · Mueve el dedo o el mouse sobre la foto";
    } else {
      ayuda.textContent = "Arrastra para girar el jabón y verlo por todos lados.";
      window.dispatchEvent(new CustomEvent("dashana:jabon", {
        detail: { forma: estado.forma.slice(7), color: hexFinal, tipo: estado.tipo }
      }));
    }

    var resumen = nombreForma + " · " + nombreColor + " · " + tipo.nombre + " · Aroma " + estado.aroma + " · " + estado.cantidad + " unidad(es)";
    document.getElementById("resumen").textContent = resumen;
    document.getElementById("pedir").href = wa(
      "Hola Dashana, quiero un jabón personalizado:\n• Forma: " + nombreForma + "\n• Color: " + nombreColor +
      "\n• Tipo: " + tipo.nombre + "\n• Aroma: " + estado.aroma + "\n• Cantidad: " + estado.cantidad);
    window.__dashanaJabon = { forma: estado.forma.slice(7), color: hexFinal, tipo: estado.tipo };
  }
  actualizar();
  // ---- Efecto de inclinación 3D en las fotos de figuras ----
  (function () {
    var caja = document.getElementById("visor-foto"), foto = document.getElementById("visor-img");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function inclinar(e) {
      var r = caja.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      foto.classList.remove("balanceo");
      foto.style.transform = "perspective(800px) rotateY(" + (x * 26).toFixed(1) + "deg) rotateX(" + (-y * 22).toFixed(1) + "deg) scale(1.04)";
      foto.style.filter = "drop-shadow(" + (-x * 18).toFixed(0) + "px " + (12 - y * 10).toFixed(0) + "px 14px rgba(78,29,92,.18))";
    }
    function soltar() { foto.style.transform = ""; foto.style.filter = ""; foto.classList.add("balanceo"); }
    caja.addEventListener("pointermove", inclinar);
    caja.addEventListener("pointerdown", inclinar);
    caja.addEventListener("pointerleave", soltar);
    caja.addEventListener("pointerup", function (e) { if (e.pointerType !== "mouse") soltar(); });
    foto.classList.add("balanceo");
  })();
})();
