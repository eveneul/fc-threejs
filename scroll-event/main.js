import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// canvas
const canvas = document.querySelector("canvas");

// gui
const gui = new GUI();

// sizes

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// scene
const scene = new THREE.Scene();

// object
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: "red" })
);

scene.add(cube);

// light

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1);
ambientLight.position.set(0, 1, 1);
scene.add(directionalLight, ambientLight);

// camera

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  2000
);
camera.position.z = 5;
scene.add(camera);

// controls

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

// renderer

const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// animate

let now, delta;
let then = Date.now();
const interval = 1000 / 60;
const clock = new THREE.Clock();
const animate = () => {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  now = Date.now();
  delta = now - then;
  if (delta < interval) return;

  control.update();
  renderer.render(scene, camera);

  then = now - (delta % interval);
};

animate();
