import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./src/shader/vertexShader.glsl?raw";
import fragmentShader from "./src/shader/fragmentShader.glsl?raw";

const canvas = document.createElement("canvas");
document.getElementById("app").appendChild(canvas);

const sizes = {
  width: 500,
  height: 500,
};

canvas.width = sizes.width;
canvas.height = sizes.height;

const scene = new THREE.Scene();

const clock = new THREE.Clock();
const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
const material = new THREE.RawShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: {},
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 1;

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
};

render();
