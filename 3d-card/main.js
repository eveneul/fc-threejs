import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import Card from "./Card";
const canvas = document.querySelector("canvas");

//color

// 신 생성
const scene = new THREE.Scene({});

// object

const card = new Card({
  w: 10,
  h: 15.8,
  color: "#0077ff",
  radius: 0.5,
});

// gui

const gui = new GUI();

gui
  .add(card.mesh.material, "roughness")
  .min(0)
  .max(1)
  .step(0.001)
  .name("roughness");

gui
  .add(card.mesh.material, "metalness")
  .min(0)
  .max(1)
  .step(0.001)
  .name("metalness");

scene.add(card.mesh);

// light

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.position.set(-5, -5, -5);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
const directionalLight2 = directionalLight1.clone();

directionalLight1.position.set(1, 1, 3);
directionalLight2.position.set(-1, 1, -3);

scene.add(directionalLight1, directionalLight2);

// 카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 30;
scene.add(camera);

// control
const control = new OrbitControls(camera, canvas);
control.autoRotate = true;
control.autoRotateSpeed = 2.5;
control.enableZoom = false;
control.rotateSpeed = 0.25;
control.enableDamping = true;

// 렌더러
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// animate
let now, delta;
let then = Date.now();
const interval = 1000 / 60;
const clock = new THREE.Clock();
const animate = () => {
  const time = clock.getElapsedTime();
  requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;
  if (delta < interval) return;

  control.update();
  renderer.render(scene, camera);

  then = now - (delta % interval);
};

const colors = document.querySelectorAll("button");

colors.forEach((item) => {
  const color = item.dataset.color;
  item.style.background = color;
  item.addEventListener("click", () => {
    card.mesh.material.color = new THREE.Color(color);
  });
});

animate();
