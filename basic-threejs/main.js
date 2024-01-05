import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 10;
camera.position.y = 1;

const light = new THREE.DirectionalLight("white", 5); // 태양빛
light.castShadow = true; // 동적 그림자가 드리워짐,
light.position.set(3, 4, 5);
light.lookAt(0, 0, 0);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: "red" });
const floorGeometry = new THREE.PlaneGeometry(20, 20); // 바닥 역할
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const capsuleG = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleM = new THREE.MeshStandardMaterial({ color: "gold" });
const cylinderG = new THREE.CylinderGeometry(1, 1, 2);
const cylinderM = new THREE.MeshStandardMaterial({ color: "blue" });

const mesh = new THREE.Mesh(geometry, material);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
const capsule = new THREE.Mesh(capsuleG, capsuleM);
const cylinder = new THREE.Mesh(cylinderG, cylinderM);

mesh.position.y = 0.5;
mesh.castShadow = true;
mesh.receiveShadow = true;
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true; // 바닥이 도형의 그림자를 받을 수 있게
floor.castShadow = true;
capsule.position.y = 2;
capsule.position.x = -2;
capsule.castShadow = true;
capsule.receiveShadow = true;

cylinder.position.set(3, 1, 0);
cylinder.castShadow = true;
cylinder.receiveShadow = true;

scene.add(mesh);
scene.add(floor);
scene.add(capsule);
scene.add(cylinder);

scene.add(light);
// scene.add(came)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // 그림자
document.body.appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);
control.update();

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});
