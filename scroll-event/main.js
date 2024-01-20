import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// canvas
const canvas = document.querySelector("canvas");

// gui
const gui = new GUI();

// sizes

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// scene
const scene = new THREE.Scene();

// object

const wave = new THREE.Mesh(
  new THREE.PlaneGeometry(1500, 1500, 150, 150),
  new THREE.MeshStandardMaterial({
    // wireframe: true,
    color: "#00ffff",
  })
);

wave.rotation.x = -Math.PI / 2;

const waveHeight = 2.5; // 파도가 커지게

for (let i = 0; i < wave.geometry.attributes.position.count; i++) {
  wave.geometry.attributes.position.array[i + 2] +=
    (Math.random() - 0.5) * waveHeight;
  const z =
    wave.geometry.attributes.position.getZ(i) +
    (Math.random() - 0.5) * waveHeight;
  wave.geometry.attributes.position.setZ(i, z);
}

scene.add(wave);

// fog
// fogExp2: 현실적인 안개 느낌, 안개의 범위를 직접 지정할 수 있는 Fog를 더 사용하긴 함
// scene.fog = new THREE.FogExp2(0xf0f0f0, 0.005);
scene.fog = new THREE.Fog(0xf0f0f0, 0.1, 500);

// light

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-15, 15, 15);

const pointLight = new THREE.PointLight(0xffffff, 1200);
pointLight.position.set(15, 30, 15);
pointLight.sizes;
scene.add(pointLight, directionalLight);

gui.add(pointLight.position, "x").min(0).max(100).step(1);
gui.add(pointLight.position, "y").min(0).max(100).step(1);
gui.add(pointLight.position, "z").min(0).max(100).step(1);
gui.add(pointLight, "intensity").min(1).max(2000).step(1);

// camera

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  500
);
camera.position.set(0, 25, 150);
scene.add(camera);

// controls

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

// renderer

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

// animate
let now, delta;
let then = Date.now();
const interval = 1000 / 60;
const clock = new THREE.Clock();

console.log(wave.geometry.attributes);

// wave.update = function () {
//   const elapsedTime = clock.getElapsedTime();
//   // console.log(Math.sin(time * 0.03));
//   for (let i = 0; i < wave.geometry.attributes.position.count; i++) {
//     const z =
//       wave.geometry.attributes.position.z[i] +
//       Math.sin(elapsedTime * 3 + i ** 2) * waveHeight;

//     wave.geometry.attributes.position.setZ(i, z);
//   }

//   wave.geometry.attributes.position.needsUpdate = true;
// };

const animate = () => {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  now = Date.now();
  delta = now - then;
  if (delta < interval) return;

  // 파도가 일렁이기
  // wave.update();

  control.update();
  renderer.render(scene, camera);

  then = now - (delta % interval);
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

animate();
