import * as THREE from "three";
import { AmbientLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import earthVertexshader from "./shaders/earth/vertexShader.glsl?raw";
import earthFragmentShader from "./shaders/earth/fragmentShader.glsl?raw";

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

const earthGeomatry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,

  uniforms: {
    uTexture: { value: textureLoader.load("/earth.png") },
  },
  vertexShader: earthVertexshader,
  fragmentShader: earthFragmentShader,
  transparent: true,
});

const earth = new THREE.Mesh(earthGeomatry, earthMaterial);
scene.add(earth);

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
