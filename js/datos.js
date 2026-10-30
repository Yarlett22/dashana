/* ============================================================
   DATOS DE LA TIENDA DASHANA
   Aquí se cambian textos, productos y fotos sin tocar el diseño.
   - Para agregar un producto: copia un bloque { ... }, pégalo
     debajo y cambia sus datos.
   - Las fotos van en la carpeta img/ (formato .webp o .jpg).
   - foto: null  -> se muestra una ilustración hasta tener la foto.
   ============================================================ */

window.DATOS = {
  // Número de WhatsApp (con código de país 51, sin espacios ni +)
  whatsapp: "51965231034",

  // Precios en soles (precio), peso en gramos (peso) y, si se conocen, medidas ("ancho × alto cm").
  // Jabón personalizado: precio según su forma.
  precioPersonalizado: { clasica: 15, figura: 18 },
  // Descuento por cantidad total del pedido (porcentaje en decimales: 0.02 = 2 %)
  descuentos: [{ desde: 50, porcentaje: 0.02 }],

  // ---------- Jabones con figuras (Colección figuras) ----------
  // fotosPorColor (opcional): foto real de la figura en cada color del configurador.
  // El nombre del color debe ser igual al de la lista "colores" (más abajo). Ejemplo:
  //   fotosPorColor: { "Amarillo pastel": "img/figuras/angelito-alas-amarillo.webp",
  //                    "Celeste": "img/figuras/angelito-alas-celeste.webp" }
  // Si un color no tiene foto, se muestra la foto principal.
  // repintar: true -> la página pinta automáticamente la foto en el color elegido.
  figuras: [
    { nombre: "Angelito con alas", precio: 18, peso: 80, medidas: "9 × 6 cm", foto: "img/figuras/angelito-alas.webp", repintar: true,
      descripcion: "Un angelito que descansa entre sus alas. Ideal para bautizos y comuniones." },
    { nombre: "Angelito en oración", precio: 18, peso: 80, medidas: "5 × 7,8 cm", foto: "img/figuras/angelito-rezando.webp", repintar: true,
      descripcion: "Tierno y delicado, un recuerdo lleno de paz." },
    { nombre: "Angelita con flores", precio: 18, peso: 80, medidas: "4 × 10 cm", foto: "img/figuras/angelita-flores.webp", repintar: true,
      descripcion: "Con su coronita de flores, perfecta para primeras comuniones." },
    { nombre: "Conejita", precio: 12, peso: 30, medidas: "4,5 × 5,5 cm", foto: "img/figuras/conejita.webp", repintar: true,
      descripcion: "Con su lacito y vestido, se roba todas las miradas." },
    { nombre: "Elefantita", precio: 10, peso: 30, medidas: "3 × 4,5 cm", foto: "img/figuras/elefantita.webp", repintar: true,
      descripcion: "Dulce y tierna, la favorita de los baby showers." },
    { nombre: "Flor con corazón", precio: 18, peso: 60, medidas: "6 × 2,5 cm", foto: "img/figuras/flor-corazon.webp", repintar: true,
      proteger: "img/figuras/flor-corazon-fijo.png", // corazón y base se quedan blancos; solo cambian los pétalos
      descripcion: "Un detalle lleno de amor para mamá, bodas o aniversarios." },
    { nombre: "Osito en tarro de miel", precio: 8, peso: 30, medidas: "3 × 4,5 cm", foto: "img/figuras/osito-miel.webp", repintar: true,
      descripcion: "Un osito asomándose de su tarro de miel. Imposible no sonreír." },
    { nombre: "Osito aviador", precio: 8, peso: 30, medidas: "3,2 × 5,6 cm", foto: "img/figuras/osito-aviador.webp", repintar: true,
      descripcion: "Con su gorrito de piloto y bufanda, listo para despegar. Ideal para baby showers y cumpleaños." },
    { nombre: "Pequeña graduada", precio: 5, peso: 15, medidas: "2,5 × 5,5 cm", foto: "img/figuras/graduada.webp", repintar: true,
      descripcion: "Con birrete y ramito de rosas. El recuerdo perfecto para celebrar una graduación." },
    { nombre: "Pequeño graduado", precio: 5, peso: 15, medidas: "2,5 × 5,5 cm", foto: "img/figuras/graduado.webp", repintar: true,
      descripcion: "Con birrete y su diploma en mano. Un detalle para celebrar cada logro." }
  ],

  // ---------- Cuidado natural para tu piel ----------
  // categoria: "Aromáticos", "Cuidado de la piel" o "Relajantes"
  cuidado: [
    { nombre: "Sandía masajeador", precio: 15, peso: 130, medidas: "8,5 × 3,5 cm", categoria: "Cuidado de la piel", foto: "img/cuidado/sandia-masajeador.webp",
      descripcion: "Masajea tu piel mientras te bañas. Con semillas de chía que exfolian suavemente." },
    { nombre: "Avena y miel", precio: 15, peso: 120, medidas: "7 × 3,5 cm", categoria: "Cuidado de la piel", foto: "img/cuidado/miel-abejita.webp",
      descripcion: "Con avena y el dulzor de la miel. Suave para piel sensible, con exfoliación delicada que la deja hidratada." },
    { nombre: "Flores de cerezo", precio: 15, peso: 120, medidas: "6,5 × 3 cm", categoria: "Aromáticos", foto: "img/cuidado/flores-cerezo.webp",
      descripcion: "Delicadas flores con destellos dorados y un aroma floral que enamora." },
    { nombre: "Romero", precio: 15, peso: 100, medidas: "8 × 2,5 cm", categoria: "Cuidado de la piel", foto: "img/cuidado/romero.webp",
      descripcion: "Con romero, de aroma herbal fresco. Deja tu piel limpia y con una agradable sensación de frescura." },
    { nombre: "Kalanchoe", precio: 15, peso: 100, medidas: "8 × 2,5 cm", categoria: "Cuidado de la piel", foto: "img/cuidado/kalanchoe.webp",
      descripcion: "Con extracto de kalanchoe, planta tradicional muy apreciada." },
    { nombre: "Exfoliante de café y canela", precio: 15, peso: 100, medidas: "8 × 2,5 cm", categoria: "Cuidado de la piel", foto: "img/cuidado/exfoliante-cafe.webp",
      descripcion: "Con café molido y canela en polvo que exfolian suavemente, más aceite de oliva, aceite de coco y vitamina E. Limpia a profundidad y ayuda a reducir la apariencia de puntos negros." },
    { nombre: "Jabón íntimo", precio: 15, peso: 100, medidas: "7 × 2,5 cm", categoria: "Cuidado de la piel", foto: "img/cuidado/intimo.webp",
      descripcion: "Para la higiene íntima externa, con macerado de clavel y aceite esencial de melisa. Limpia con suavidad y deja una agradable sensación de frescura." },
    { nombre: "Aclarante de arroz y avena", precio: 15, peso: 100, medidas: "7 × 2,5 cm", categoria: "Cuidado de la piel", foto: "img/cuidado/aclarante-arroz.webp",
      descripcion: "Con arroz, yuca y avena en polvo, miel, manteca de karité y aceite esencial de naranja. Ayuda a unificar el tono y suavizar la apariencia de manchas." },
    { nombre: "Lavanda relajante", precio: 15, peso: 100, categoria: "Relajantes", foto: "img/cuidado/lavanda.webp",
      descripcion: "Flor de glicerina con botones de lavanda y aceite esencial de lavanda. Ideal para relajarte antes de dormir." },
    { nombre: "Carbón activado", precio: 15, peso: 100, medidas: "8 × 2,5 cm", categoria: "Cuidado de la piel", foto: "img/cuidado/carbon.webp",
      descripcion: "Hoja de carbón activado con destellos dorados. Limpieza profunda para piel con tendencia grasa." },
    { nombre: "Rosas", precio: 15, peso: 100, categoria: "Aromáticos", foto: "img/cuidado/rosas.webp",
      descripcion: "Una rosa en relieve con brillo perlado y aroma floral. Ideal para regalar." },
    { nombre: "Antiestrés", precio: 15, peso: 100, categoria: "Relajantes", foto: "img/cuidado/antiestres.webp",
      descripcion: "Glicerina con flores de manzanilla, lavanda y hojitas de menta. Un pequeño jardín para un momento de calma." }
  ],

  // ---------- Colección Navidad ----------
  navidad: [
    { nombre: "Arbolito Feliz Navidad", precio: 15, peso: 80, medidas: "7 × 8 cm", foto: "img/navidad/arbolito.webp", repintar: true,
      proteger: "img/navidad/arbolito-dibujo.png", // la frase y la escarcha doradas no se repintan
      descripcion: "Jabón de glicerina con brillo dorado. Llena tu baño de espíritu navideño y es ideal como regalo." },
    { nombre: "Galletita de jengibre", precio: 15, peso: 70, medidas: "5,5 × 7,2 cm", foto: "img/navidad/galleta-jengibre.webp", repintar: true,
      proteger: "img/navidad/galleta-jengibre-dibujo.png", // el dibujo impreso no se repinta
      descripcion: "Jabón suave y colorido que hace del baño de los niños un momento divertido estas fiestas." },
    { nombre: "Sagrada Familia", precio: 15, peso: 80, medidas: "6 × 7,5 cm", foto: "img/navidad/sagrada-familia.webp", repintar: true,
      descripcion: "Jabón artesanal con destellos dorados. Un regalo con significado para compartir en familia." }
  ],

  // ---------- Ocasiones especiales ----------
  ocasiones: [
    { nombre: "Baby shower", color: "#DCEAF6", frase: "Celebra la llegada de tu bebé con un detalle tan tierno como este momento." },
    { nombre: "Bodas", color: "#FBE8EE", frase: "Que tus invitados se lleven un pedacito de tu historia de amor." },
    { nombre: "Quinceañeras", color: "#EFE4F3", frase: "Una noche soñada merece un recuerdo igual de especial." },
    { nombre: "Bautizos y comuniones", color: "#F7F0E1", frase: "Un detalle lleno de ternura para un día que no se olvida." },
    { nombre: "Cumpleaños", color: "#E3F3EF", frase: "Sorprende a tus invitados con un regalo que huele a felicidad." },
    { nombre: "Corporativos", color: "#ECECEC", frase: "Agradece a tu equipo y a tus clientes con un detalle que sí se recuerda." },
    { nombre: "Día de la Madre", color: "#FBE8EE", frase: "Para la mujer que lo da todo, un regalo hecho con el mismo amor." },
    { nombre: "Navidad", color: "#DDEFE0", frase: "Regala calidez y aromas que llenan de magia estas fiestas." }
  ],

  // ---------- Plantas e ingredientes ----------
  plantas: [
    { nombre: "Kalanchoe", foto: "img/plantas/kalanchoe.webp", color: "#DDEFE0", descripcion: "Planta tradicional muy usada en el cuidado natural de la piel." },
    { nombre: "Carbón activado", foto: "img/plantas/carbon-activado.webp", color: "#EDEDED", descripcion: "Ayuda a limpiar a profundidad la piel con tendencia grasa." },
    { nombre: "Lavanda", foto: "img/plantas/lavanda.webp", color: "#EFE4F3", descripcion: "Aroma relajante, ideal para la noche." },
    { nombre: "Manzanilla", foto: "img/plantas/manzanilla.webp", color: "#FBF1CF", descripcion: "Suave y calmante, perfecta para piel sensible." },
    { nombre: "Avena", foto: "img/plantas/avena.webp", color: "#F7F0E1", descripcion: "Exfoliación delicada y sensación de suavidad." },
    { nombre: "Semillas de chía", foto: "img/plantas/chia.webp", color: "#E8E2D6", descripcion: "Exfolian suavemente y aportan omega 3 y antioxidantes a tu piel." }
  ],

  // ---------- Opciones del configurador "Personaliza el tuyo" ----------
  // Formas simples: se muestran en 3D. Las figuras salen de la lista "figuras".
  formasSimples: [
    { id: "corazon", nombre: "Corazón" },
    { id: "flor", nombre: "Flor" },
    { id: "redondo", nombre: "Redondo" },
    { id: "ovalado", nombre: "Ovalado" },
    { id: "rectangular", nombre: "Rectangular" }
  ],
  colores: [
    { nombre: "Rosa pastel", hex: "#F4C6D2" },
    { nombre: "Lila", hex: "#C9B3E0" },
    { nombre: "Menta", hex: "#BFE3DA" },
    { nombre: "Celeste", hex: "#BCD8EE" },
    { nombre: "Amarillo pastel", hex: "#F3E3A6" },
    { nombre: "Crema", hex: "#EFE3C8" }
  ],
  // Moldes extra que también se ofrecen en el configurador (además de figuras y Navidad)
  // producto: nombre del jabón de "cuidado" del que sale este molde; toma su mismo precio.
  moldesExtra: [
    { nombre: "Masajeador spa", producto: "Sandía masajeador", foto: "img/cuidado/sandia-config.webp", repintar: true, pintar: "img/cuidado/sandia-zona.png", contraste: 1.0 },
    { nombre: "Rosa", producto: "Rosas", foto: "img/cuidado/rosas-config.webp", repintar: true, pintar: "img/cuidado/rosas-zona.png", contraste: 0.6 },
    { nombre: "Flor de lavanda", producto: "Lavanda relajante", foto: "img/cuidado/lavanda.webp", repintar: true },
    { nombre: "Hoja", producto: "Carbón activado", foto: "img/cuidado/hoja-config.webp", repintar: true, pintar: "img/cuidado/hoja-zona.png", contraste: 1.6 } // la escarcha dorada no se repinta
  ],
  // colorFijo: el ingrediente define el color; el cliente no puede elegir otro
  tipos: [
    { id: "glicerina", nombre: "Glicerina" },
    { id: "lavanda", nombre: "Con flores de lavanda" },
    { id: "avena", nombre: "Avena y miel" },
    { id: "romero", nombre: "Romero" },
    { id: "kalanchoe", nombre: "Kalanchoe" },
    { id: "arroz", nombre: "Arroz y avena (aclarante)" },
    { id: "antiestres", nombre: "Antiestrés (manzanilla, lavanda y menta)" },
    { id: "carbon", nombre: "Carbón activado", colorFijo: { nombre: "Negro (carbón activado)", hex: "#2E2E2E" } },
    { id: "cafe", nombre: "Café y canela (exfoliante)", colorFijo: { nombre: "Marrón (café y canela)", hex: "#4A3022" } }
  ],
  aromas: ["Lavanda", "Rosas", "Coco", "Vainilla", "Manzanilla", "Eucalipto", "Sin aroma"]
};
