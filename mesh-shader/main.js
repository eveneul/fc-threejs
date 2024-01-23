import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.createElement("canvas");
document.getElementById("app").appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scene = new THREE.Scene();
const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
};

render();
