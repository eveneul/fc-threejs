import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvasSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(canvasSize.width, canvasSize.height);
// 현재 디바이스 픽셀의 비율에 맞는 값
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const earthMap = textureLoader.load("/assets/earth-night-map.jpeg");
const evironmentMap = cubeTextureLoader.load([
  "/assets/environments/px.png",
  "/assets/environments/nx.png",
  "/assets/environments/py.png",
  "/assets/environments/ny.png",
  "/assets/environments/pz.png",
  "/assets/environments/nz.png",
]);

evironmentMap.encoding = THREE.sRGBEncoding;
scene.background = evironmentMap;
scene.environment = evironmentMap;

const createEarth1 = () => {
  const material = new THREE.MeshStandardMaterial({
    map: earthMap,
    side: THREE.FrontSide,
    opacity: 0.6,
    transparent: true,
  });
  const geometry = new THREE.SphereGeometry(1.3, 30, 30);
  const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  return mesh;
};

const createEarth2 = () => {
  const material = new THREE.MeshStandardMaterial({
    map: earthMap,
    opacity: 0.9,
    transparent: true, // 투명도가 제대로 반영이 된다
    side: THREE.BackSide, // 뒤쪽만 렌더링
  });
  const geometry = new THREE.SphereGeometry(1.5, 30, 30);
  const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  return mesh;
};

const create = () => {
  const earth1 = createEarth1();
  const earth2 = createEarth2();

  scene.add(earth1, earth2);
};

const addLight = () => {
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(2.65, 2.13, 1.02);
  scene.add(light);
};

const container = document.querySelector(".container");
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  canvasSize.width / canvasSize.height,
  0.1,
  100
);
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const draw = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
  controls.update();
};

const init = () => {
  draw();
  create();
  addLight();
};

const resize = () => {
  canvasSize.width = window.innerWidth;
  canvasSize.height = window.innerHeight;
  renderer.setSize(canvasSize.width, canvasSize.height);
  camera.aspect = canvasSize.width / canvasSize.height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", resize);

init();
