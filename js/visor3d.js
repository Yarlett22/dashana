/* Dashana – visor 3D del configurador (formas clásicas) */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const cont = document.getElementById("visor-3d");

function crearForma(id) {
  const s = new THREE.Shape();
  switch (id) {
    case "redondo":
      s.absarc(0, 0, 1, 0, Math.PI * 2, false);
      break;
    case "ovalado":
      s.absellipse(0, 0, 1.3, 0.85, 0, Math.PI * 2, false, 0);
      break;
    case "corazon":
      s.moveTo(0, -1.05);
      s.bezierCurveTo(-0.55, -0.6, -1.25, -0.2, -1.2, 0.35);
      s.bezierCurveTo(-1.15, 0.95, -0.4, 1.15, 0, 0.6);
      s.bezierCurveTo(0.4, 1.15, 1.15, 0.95, 1.2, 0.35);
      s.bezierCurveTo(1.25, -0.2, 0.55, -0.6, 0, -1.05);
      break;
    case "flor": {
      const n = 240;
      for (let i = 0; i <= n; i++) {
        const t = (i / n) * Math.PI * 2;
        const r = 0.82 + 0.26 * Math.cos(6 * t);
        const x = r * Math.cos(t), y = r * Math.sin(t);
        i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
      }
      break;
    }
    default: { // rectangular redondeado
      const w = 1.4, h = 0.9, r = 0.3;
      s.moveTo(-w + r, -h);
      s.lineTo(w - r, -h); s.quadraticCurveTo(w, -h, w, -h + r);
      s.lineTo(w, h - r); s.quadraticCurveTo(w, h, w - r, h);
      s.lineTo(-w + r, h); s.quadraticCurveTo(-w, h, -w, h - r);
      s.lineTo(-w, -h + r); s.quadraticCurveTo(-w, -h, -w + r, -h);
    }
  }
  return s;
}

function iniciar() {
  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camara.position.set(0, 2.6, 5.2);

  const render = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  render.outputColorSpace = THREE.SRGBColorSpace;
  render.shadowMap.enabled = true;
  cont.appendChild(render.domElement);

  escena.add(new THREE.HemisphereLight(0xffffff, 0xd9cce0, 1.6));
  const luz = new THREE.DirectionalLight(0xffffff, 1.6);
  luz.position.set(2.5, 5, 3);
  luz.castShadow = true;
  luz.shadow.mapSize.set(1024, 1024);
  escena.add(luz);

  const piso = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.ShadowMaterial({ opacity: 0.12 }));
  piso.rotation.x = -Math.PI / 2;
  piso.position.y = -0.31;
  piso.receiveShadow = true;
  escena.add(piso);

  const controles = new OrbitControls(camara, render.domElement);
  controles.enableDamping = true;
  controles.enablePan = false;
  controles.minDistance = 3.5;
  controles.maxDistance = 8;
  controles.autoRotate = true;
  controles.autoRotateSpeed = 1.6;
  controles.addEventListener("start", () => { controles.autoRotate = false; });

  const grupo = new THREE.Group();
  escena.add(grupo);
  const material = new THREE.MeshPhysicalMaterial({ roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.4, sheen: 0.3 });
  let malla = null;
  const detalles = new THREE.Group();
  grupo.add(detalles);

  function construir(forma) {
    if (malla) { grupo.remove(malla); malla.geometry.dispose(); }
    const geo = new THREE.ExtrudeGeometry(crearForma(forma), {
      depth: 0.32, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.12, bevelSegments: 8, curveSegments: 64
    });
    geo.center();
    geo.rotateX(-Math.PI / 2); // acostado, cara grande hacia arriba
    malla = new THREE.Mesh(geo, material);
    malla.castShadow = true;
    grupo.add(malla);
  }

  function puntosEncima(cantidad, radio, seed) {
    const pts = [];
    let x = seed;
    const azar = () => { x = (x * 9301 + 49297) % 233280; return x / 233280; };
    for (let i = 0; i < cantidad; i++) {
      const a = azar() * Math.PI * 2, r = Math.sqrt(azar()) * radio;
      pts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    return pts;
  }

  function ponerDetalles(tipo) {
    while (detalles.children.length) {
      const c = detalles.children.pop();
      c.geometry.dispose(); c.material.dispose();
    }
    const yTop = 0.30;
    if (tipo === "avena") {
      const mat = new THREE.MeshStandardMaterial({ color: 0xc7a877, roughness: 0.9 });
      puntosEncima(26, 0.6, 7).forEach(([x, z]) => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), mat.clone());
        m.scale.set(1.6, 0.5, 1); m.position.set(x, yTop, z); m.rotation.y = x * 10;
        detalles.add(m);
      });
    } else if (tipo === "lavanda") {
      const mat = new THREE.MeshStandardMaterial({ color: 0x7a4e9e, roughness: 0.7 });
      puntosEncima(18, 0.55, 3).forEach(([x, z]) => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), mat.clone());
        m.position.set(x, yTop + 0.01, z);
        detalles.add(m);
      });
    }
  }

  function aplicar(cfg) {
    if (!cfg) return;
    if (cfg.forma !== aplicar.forma) { construir(cfg.forma); aplicar.forma = cfg.forma; }
    material.color.set(cfg.color);
    const glicerina = cfg.tipo === "glicerina";
    material.transparent = glicerina;
    material.opacity = glicerina ? 0.9 : 1;
    material.roughness = glicerina ? 0.25 : cfg.tipo === "carbon" ? 0.6 : 0.45;
    material.needsUpdate = true;
    ponerDetalles(cfg.tipo);
  }

  function ajustar() {
    const w = cont.clientWidth, h = cont.clientHeight;
    if (!w || !h) return;
    render.setSize(w, h, false);
    camara.aspect = w / h;
    camara.updateProjectionMatrix();
  }
  new ResizeObserver(ajustar).observe(cont);
  ajustar();

  aplicar(window.__dashanaJabon || { forma: "corazon", color: "#F4C6D2", tipo: "glicerina" });
  window.addEventListener("dashana:jabon", (e) => { aplicar(e.detail); ajustar(); });

  render.setAnimationLoop(() => {
    if (cont.hidden) return;
    controles.update();
    render.render(escena, camara);
  });
}

try {
  iniciar();
} catch (e) {
  cont.innerHTML = '<p style="padding:24px;text-align:center;color:#4A3F50">Tu navegador no puede mostrar la vista 3D, pero puedes hacer tu pedido igual.</p>';
  console.error(e);
}
