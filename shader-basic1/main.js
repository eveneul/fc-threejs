import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'



const canvas = document.querySelector("canvas")
const scene = new THREE.Scene();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const geometry = new THREE.SphereGeometry(1, 30, 30);
const material = new THREE.MeshStandardMaterial({color: "red"})

const mesh = new THREE.Mesh(
geometry, material
)

scene.add(mesh);

const light = new THREE.DirectionalLight(0xffffff)
const light2 = new THREE.AmbientLight(0xffffff)
light.position.set(2.75, 1.93, 2.03);

scene.add(light,light2)


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
scene.add(camera);
camera.position.z = 5;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(innerWidth, window.innerHeight);
renderer.render(scene, camera)


const clock = new THREE.Clock();


const tick = () => {
  requestAnimationFrame(tick);
  renderer.render(scene, camera)
  camera.updateProjectionMatrix();
   controls.update();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

}

tick();