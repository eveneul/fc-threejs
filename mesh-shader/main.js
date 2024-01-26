import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./src/shader/vertexShader.glsl?raw";
import fragmentShader from "./src/shader/fragmentShader.glsl?raw";

const canvas = document.createElement("canvas");
document.getElementById("app").appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scene = new THREE.Scene();

const clock = new THREE.Clock();
const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
const material = new THREE.RawShaderMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: textureLoader.load("/gom.jpeg") },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const count = geometry.attributes.position.count;
const randomPosition = new Float32Array(count);

for (let i = 0; i < count; i++) {
  randomPosition[i] = (Math.random() - 0.5) * 2;
}

geometry.setAttribute("aRandomPosition", new THREE.BufferAttribute(randomPosition, 1));

console.log(geometry);
// material onBeforeCompile => 머터리얼이 컴파일 되기 전에 호출하는 콜백함수

const mesh = new THREE.Mesh(geometry, material);
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
  material.uniforms.uTime.value = clock.getElapsedTime();
};

render();
