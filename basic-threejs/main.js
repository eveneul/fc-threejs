import "./style.css"
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 5;
camera.position.y = 1

const light = new THREE.DirectionalLight("white", 5); // 태양빛
light.castShadow = true; // 동적 그림자가 드리워짐, 
light.position.set(3, 4, 5);
light.lookAt(0, 0, 0)





const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({color: "red"})

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
scene.add(light)
// scene.add(came)
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);


const control = new OrbitControls(camera, renderer.domElement)
control.update();

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()


window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera)
})

