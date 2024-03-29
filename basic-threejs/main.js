import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
const floorMaterial = new THREE.MeshBasicMaterial({ color: "gray" });

const mesh = new THREE.Mesh(geometry, material);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);

mesh.position.y = 0.5;
mesh.castShadow = true;
mesh.receiveShadow = true;
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true; // 바닥이 도형의 그림자를 받을 수 있게
floor.castShadow = true;

// scene.add(mesh);
scene.add(floor);
scene.add(light);

// dancer import
const loader = new GLTFLoader();

const gltf = await loader.loadAsync("/dancer.glb");
const dancer = gltf.scene;
const dancerAnimationClips = gltf.animations;
dancer.position.y = 0.8;
dancer.scale.set(0.01, 0.01, 0.01);

// 그림자 생성
dancer.castShadow = true;
dancer.receiveShadow = true;
dancer.traverse((obj) => {
  if (obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});

console.log(gltf, "dancer");

// 애니메이션
const mixer = new THREE.AnimationMixer(dancer);
const action = mixer.clipAction(dancerAnimationClips[3]);

// animation loop options

// action.setLoop(THREE.LoopOnce); // 애니메이션 한 번만 실행
// action.setLoop(THREE.LoopRepeat); // 애니메이션 무한 반복
action.setLoop(THREE.LoopPingPong); // 재생 -> 역재생 -> 재생 -> 역재생

// animation duration
// action.setDuration(10) // 10s동안 애니메이션 실행
// action.setEffectiveTimeScale(2) // 재생 속력 비율 설정
// action.setEffectiveWeight(100); // 애니메이션의 선명도
action.play();

scene.add(dancer);

// scene.add(came)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // 그림자
document.body.appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);
control.update();

const clock = new THREE.Clock();

const render = () => {
  renderer.render(scene, camera);
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  requestAnimationFrame(render);
};

render();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});
