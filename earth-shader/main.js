import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Earth from "./components/Earth.js";
import Star from "./components/Star.js";
import Point from "./components/Point.js";
import Curve from "./components/Curve.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

// sizes
const sizes = { width: window.innerWidth, height: window.innerHeight };

/**
 * Texture
 */

const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load([
  "assets/environments/px.png",
  "assets/environments/nx.png",
  "assets/environments/py.png",
  "assets/environments/ny.png",
  "assets/environments/pz.png",
  "assets/environments/nz.png",
]);
environmentMap.encoding = THREE.sRGBEncoding;

const canvas = document.querySelector("canvas");

/**
 * Scene
 */

const scene = new THREE.Scene();
scene.background = environmentMap;
scene.environment = environmentMap;

/**
 * Object
 */

const objectGroup = new THREE.Group();

const earth1 = new Earth(1.3, 0.6, true);
const earth2 = new Earth(1.5, 0.9, false);
const star = new Star(500);
const koearPoint = new Point(37.56668, 126.97841);
const ganaPoint = new Point(5.55363, -0.196481);
const curve = new Curve(koearPoint.position, ganaPoint.position);

earth1.mesh.rotation.y = -Math.PI / 2;
koearPoint.mesh.rotation.set(0.9, 2.46, 1);

objectGroup.add(
  earth1.mesh,
  earth2.mesh,
  koearPoint.mesh,
  ganaPoint.mesh,
  curve.mesh
);
scene.add(objectGroup, star.mesh);

/**
 * Post Processing
 */

/**
 * Light
 */

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2.65, 2.13, 1.02);
scene.add(light);

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  300
);
camera.position.z = 3;

/**
 * Control
 */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Render
 */

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const renderTarget = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {
  samples: 2,
});
const effectComposer = new EffectComposer(renderer, renderTarget);

/**
 * Animate
 */

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
};

animate();
