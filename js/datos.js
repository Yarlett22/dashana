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

  // ---------- Jabones con figuras (Colección figuras) ----------
  // fotosPorColor (opcional): foto real de la figura en cada color del configurador.
  // El nombre del color debe ser igual al de la lista "colores" (más abajo). Ejemplo:
  //   fotosPorColor: { "Amarillo pastel": "img/figuras/angelito-alas-amarillo.webp",
  //                    "Celeste": "img/figuras/angelito-alas-celeste.webp" }
  // Si un color no tiene foto, se muestra la foto principal.
  // repintar: true -> la página pinta automáticamente la foto en el color elegido.
  figuras: [
    { nombre: "Angelito con alas", foto: "img/figuras/angelito-alas.webp", repintar: true,
      descripcion: "Un angelito que descansa entre sus alas. Ideal para bautizos y comuniones." },
    { nombre: "Angelito en oración", foto: "img/figuras/angelito-rezando.webp", repintar: true,
      descripcion: "Tierno y delicado, un recuerdo lleno de paz." },
    { nombre: "Angelita con flores", foto: "img/figuras/angelita-flores.webp", repintar: true,
      descripcion: "Con su coronita de flores, perfecta para primeras comuniones." },
    { nombre: "Conejita", foto: "img/figuras/conejita.webp", repintar: true,
      descripcion: "Con su lacito y vestido, se roba todas las miradas." },
    { nombre: "Elefantita", foto: "img/figuras/elefantita.webp",
      descripcion: "Dulce y brillante, la favorita de los baby showers." },
    { nombre: "Flor con corazón", foto: "img/figuras/flor-corazon.webp",
      descripcion: "Un detalle lleno de amor para mamá, bodas o aniversarios." },
    { nombre: "Osito en tarro de miel", foto: "img/figuras/osito-miel.webp", repintar: true,
      descripcion: "Un osito asomándose de su tarro de miel. Imposible no sonreír." }
  ],

  // ---------- Cuidado natural para tu piel ----------
  // categoria: "Aromáticos", "Cuidado de la piel" o "Relajantes"
  cuidado: [
    { nombre: "Sandía masajeador", categoria: "Relajantes", foto: "img/cuidado/sandia-masajeador.webp",
      descripcion: "Con relieves que masajean tu piel mientras te bañas. Fresco, divertido y relajante." },
    { nombre: "Miel y abejita", categoria: "Cuidado de la piel", foto: "img/cuidado/miel-abejita.webp",
      descripcion: "Con el dulzor de la miel, deja tu piel suave e hidratada." },
    { nombre: "Flores de cerezo", categoria: "Aromáticos", foto: "img/cuidado/flores-cerezo.webp",
      descripcion: "Delicadas flores con destellos dorados y un aroma floral que enamora." },
    { nombre: "Lavanda relajante", categoria: "Relajantes", foto: null, color: "#C9B3E0",
      descripcion: "Con aceite esencial de lavanda. Ideal para relajarte antes de dormir." },
    { nombre: "Carbón activado", categoria: "Cuidado de la piel", foto: null, color: "#3A3A3A",
      descripcion: "Para piel con tendencia grasa. Limpieza profunda." },
    { nombre: "Kalanchoe", categoria: "Cuidado de la piel", foto: null, color: "#A8D5A2",
      descripcion: "Con extracto de kalanchoe, planta tradicional muy apreciada." },
    { nombre: "Avena y miel", categoria: "Cuidado de la piel", foto: null, color: "#EFE3C8",
      descripcion: "Suave para piel sensible, con exfoliación delicada." },
    { nombre: "Rosas", categoria: "Aromáticos", foto: null, color: "#F4C6D2",
      descripcion: "Aroma floral y color pastel. Ideal para regalar." },
    { nombre: "Antiestrés", categoria: "Relajantes", foto: null, color: "#BFE3DA",
      descripcion: "Mezcla de lavanda, manzanilla y menta para un momento de calma." }
  ],

  // ---------- Colección Navidad ----------
  navidad: [
    { nombre: "Arbolito Feliz Navidad", foto: "img/navidad/arbolito.webp",
      descripcion: "Verde brillante con mensaje dorado. El detalle perfecto para la mesa navideña." },
    { nombre: "Galletita de jengibre", foto: "img/navidad/galleta-jengibre.webp",
      descripcion: "Tierno y colorido, ideal para regalar a los más pequeños." },
    { nombre: "Sagrada Familia", foto: "img/navidad/sagrada-familia.webp",
      descripcion: "Dorada y llena de significado, para celebrar el verdadero sentido de la Navidad." }
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
    { nombre: "Kalanchoe", foto: null, color: "#DDEFE0", descripcion: "Planta tradicional muy usada en el cuidado natural de la piel." },
    { nombre: "Carbón activado", foto: null, color: "#EDEDED", descripcion: "Ayuda a limpiar a profundidad la piel con tendencia grasa." },
    { nombre: "Lavanda", foto: null, color: "#EFE4F3", descripcion: "Aroma relajante, ideal para la noche." },
    { nombre: "Manzanilla", foto: null, color: "#FBF1CF", descripcion: "Suave y calmante, perfecta para piel sensible." },
    { nombre: "Avena", foto: null, color: "#F7F0E1", descripcion: "Exfoliación delicada y sensación de suavidad." }
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
    { nombre: "Crema", hex: "#EFE3C8" },
    { nombre: "Blanco", hex: "#F7F4EE" }
  ],
  tipos: [
    { id: "glicerina", nombre: "Glicerina" },
    { id: "carbon", nombre: "Carbón activado" },
    { id: "avena", nombre: "Avena" },
    { id: "lavanda", nombre: "Con flores de lavanda" }
  ],
  aromas: ["Lavanda", "Rosas", "Coco", "Vainilla", "Manzanilla", "Eucalipto", "Sin aroma"]
};
