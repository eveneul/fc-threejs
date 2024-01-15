import * as THREE from 'three'
import GUI from 'lil-gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Card from './card';

const canvas = document.querySelector("canvas");


// scene

const scene = new THREE.Scene();

// object

const card = new Card({
  w: 10,
  h: 15.8,
  color: "#000",
  radius: 0.5
})

scene.add(card.mesh)



// light

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
const directionalLight2 = directionalLight.clone()
directionalLight.position.set(1.5, 2.9, 10)
directionalLight2.position.set(-.7, -0.14, -5)

scene.add(ambientLight, directionalLight, directionalLight2)

// // light Helper 
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight2)
// scene.add(directionalLightHelper)


// camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

// gui
const gui = new GUI();

gui.add(directionalLight2.position, "x").min(-5).max(10).step(0.01)
gui.add(directionalLight2.position, "y").min(-5).max(10).step(0.01)
gui.add(directionalLight2.position, "z").min(-5).max(10).step(0.01)

const materialFoloer = gui.addFolder("material")
materialFoloer.add(card.mesh.material, "metalness").min(0).max(2).step(0.001)
materialFoloer.add(card.mesh.material, "roughness").min(0).max(2).step(0.001)


// render
const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true})
renderer.setSize(window.innerWidth, window.innerHeight);

// control
const control = new OrbitControls(camera, canvas);
control.autoRotate = true;
control.enableDamping = true
camera.position.z = 20



// animate
let now, delta;
let then = Date.now();
const interval = 1000 / 60;
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate)
  const time = clock.getElapsedTime();
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;
  renderer.render(scene, camera);
  control.update();

  then = now - (delta % interval)
}

const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  const color = btn.dataset.color
  btn.style.backgroundColor = color
  btn.addEventListener("click", () => {
    card.mesh.material.color = new THREE.Color(color)
  })
})



animate();