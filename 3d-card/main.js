import * as THREE from "three";
const canvas = document.querySelector("canvas");

// 신 생성
const scene = new THREE.Scene({});

// object

// 카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
scene.add(camera);

// 렌더러
const renderer = new THREE.WebGLRenderer({ canvas });
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

  then = now - (delta % interval);
};

animate();
