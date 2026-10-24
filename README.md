# Dashana – Jabones artesanales

Página web de Dashana: jabones artesanales hechos a mano con plantas naturales. Los pedidos se hacen por WhatsApp (965 231 034).

## Cómo cambiar cosas sin saber programar

| Quiero… | Qué hago |
|---|---|
| Cambiar una foto | Entra a la carpeta `img/`, sube la foto nueva **con el mismo nombre** que la anterior. |
| Agregar un jabón con figura | 1) Sube la foto a `img/figuras/`. 2) En `js/datos.js`, copia un bloque de la lista `figuras` y cambia nombre, foto y descripción. |
| Agregar un jabón de cuidado natural | En `js/datos.js`, lista `cuidado`. Si aún no hay foto, deja `foto: null`. |
| Cambiar el número de WhatsApp | En `js/datos.js`, línea `whatsapp` (con 51 delante, sin espacios). |
| Cambiar colores, aromas o tipos del configurador | En `js/datos.js`, listas `colores`, `aromas` y `tipos`. |

Después de guardar un cambio en GitHub, la página se actualiza sola en 1–2 minutos.

**Fotos:** cuadradas (1:1), en `.webp` o `.jpg`, de menos de 300 KB, con nombres simples sin espacios ni tildes (ej. `osito-rosa.webp`).

## Estructura

```
index.html        la página
css/estilos.css   el diseño
js/datos.js       productos, textos y opciones (lo que más se edita)
js/app.js         lógica de la página y enlaces de WhatsApp
js/visor3d.js     vista 3D del configurador (usa three.js)
img/figuras/      fotos de los jabones con figuras
```
