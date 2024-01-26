import * as THREE from "three";
import { AmbientLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shaders/earth/vertexShader.glsl?raw";
import fragmentShader from "./shaders/earth/fragmentShader.glsl?raw";
import pointVertexShader from "./shaders/earth-points/vertexShader.glsl?raw";
import pointFragmentShader from "./shaders/earth-points/fragmentShader.glsl?raw";

/**
 * Sizes
 */

const sizes = { width: window.innerWidth, height: window.innerHeight };

/**
 * Canvas Setting
 */

const canvas = document.createElement("canvas");
const container = document.querySelector("#app");
canvas.width = sizes.width;
canvas.height = sizes.height;
container.appendChild(canvas);

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Texture Loader
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Object
 */
const earthGeometry = new THREE.SphereGeometry(1, 30, 30);
const earthMaterial = new THREE.ShaderMaterial({
  transparent: true,
  side: THREE.DoubleSide,
  // depthWrite: false,
  uniforms: {
    uTexture: { value: textureLoader.load("/earth.png") },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

const pointGeomatry = new THREE.IcosahedronGeometry(1.1, 40, 40);
const pointMaterial = new THREE.ShaderMaterial({
  wireframe: true,
  uniforms: {
    transparent: true,
    side: THREE.DoubleSide,

    uTexture: { value: textureLoader.load("/earth.png") },
  },
  vertexShader: pointVertexShader,
  fragmentShader: pointFragmentShader,
});

pointGeomatry.rotateY(-Math.PI);

const pointMesh = new THREE.Mesh(pointGeomatry, pointMaterial);
scene.add(pointMesh);

/**
 * Light
 */

const light = new AmbientLight(0xffffff);
scene.add(light);

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000);
camera.position.z = 2;
scene.add(camera);

/**
 * Controls
 */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setClearColor(0x000000, 1);
renderer.setSize(sizes.width, sizes.height);

/**
 * Animate
 */

const clock = new THREE.Clock();

const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  camera.updateProjectionMatrix();
  controls.update();
};

animate();
