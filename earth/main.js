import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { convertLatLngToPos, getGradientCanvas } from "./utils";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"; // 빛의 노출값을 조정
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { HalftonePass } from "three/examples/jsm/postprocessing/HalftonePass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass"; // outline pass 테두리 부드럽게

import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader"; // 필름패스 쓰면 너무 어두워져서
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"; // 쉐이더 쓰려면

const canvasSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(canvasSize.width, canvasSize.height);
// 현재 디바이스 픽셀의 비율에 맞는 값
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const renderTarget = new THREE.WebGLRenderTarget(canvasSize.width, canvasSize.height, {
  samples: 2, // 점과 점 사이를 더 부드럽게
});

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
    opacity: 1,
    // transparent: true,
  });
  const geometry = new THREE.SphereGeometry(1.3, 30, 30);
  const mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.y = -Math.PI / 2;

  // scene.add(mesh);

  return mesh;
};

const createEarth2 = () => {
  const material = new THREE.MeshStandardMaterial({
    map: earthMap,
    opacity: 1,
    // transparent: true, // 투명도가 제대로 반영이 된다
    side: THREE.BackSide, // 뒤쪽만 렌더링
  });
  const geometry = new THREE.SphereGeometry(1.5, 30, 30);
  const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  return mesh;
};

const createStar = (count = 500) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i] = (Math.random() - 0.5) * 5; // -3 ~ 3
    positions[i + 1] = (Math.random() - 0.5) * 5; // -3 ~ 3
    positions[i + 2] = (Math.random() - 0.5) * 5; // -3 ~ 3
  }

  const geometry = new THREE.BufferGeometry();
  const material = new THREE.PointsMaterial({
    size: 0.01,
    transparent: true,
    map: textureLoader.load("/assets/particles/particle.png"),
    alphaMap: textureLoader.load("/assets/particles/particle.png"),
    depthWrite: false, // alphaMap 지정하면 앞에 있는 메터리얼이 뒤에 있는 거 가리게 됨, 그거 해결 방법
    color: 0xbcc6c6,
  });

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const star = new THREE.Points(geometry, material);

  return star;
};

const createPoint = () => {
  const point = {
    lat: 37.56668 * (Math.PI / 180), // 위도
    lng: 126.97841 * (Math.PI / 180), // 경도
  };

  const position = convertLatLngToPos(point, 1.3); // 1.3은 안쪽 지구 반지금

  const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.02, 0.002, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0x263d64 })
  );

  mesh.position.set(position.x, position.y, position.z);
  mesh.rotation.set(0.9, 2.46, 1);

  return mesh;
};

const createPoint2 = () => {
  const point = {
    lat: 5.55363 * (Math.PI / 180),
    lng: -0.196481 * (Math.PI / 180),
  };

  const position = convertLatLngToPos(point, 1.3); // 1.3은 안쪽 지구 반지금

  const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.02, 0.002, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0x263d64 })
  );

  mesh.position.set(position.x, position.y, position.z);

  return mesh;
};

const createCurve = (pos1, pos2) => {
  const points = [];
  for (let i = 0; i < 100; i++) {
    //pos1와 pos2 사이에 어떤 숫자가 있을지 잘 추정해서 반환함
    const pos = new THREE.Vector3().lerpVectors(pos1, pos2, i / 100);
    pos.normalize();
    const wave = Math.sin((Math.PI * i) / 100);

    pos.multiplyScalar(1.3 + 0.3 * wave); // 지구 반지름 크기를 넣어 주면 반지름 크기에 맞게 이동 / 변형

    points.push(pos);
  }

  const gradientCanvas = getGradientCanvas("#757f94", "#263d74");
  const texture = new THREE.CanvasTexture(gradientCanvas);

  // CatmullRomCurve3 ::  3d 스플라인 커브를 만들 때 사용
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 20, 0.003);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};

const create = () => {
  const group = new THREE.Group();

  const earth1 = createEarth1();
  const earth2 = createEarth2();
  const star = createStar();
  const point1 = createPoint();
  const point2 = createPoint2();
  const curve = createCurve(point1.position, point2.position);

  group.add(earth1, earth2, point1, point2, curve, star);

  scene.add(group);

  return { group };
};

const addLight = () => {
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(2.65, 2.13, 1.02);
  scene.add(light);
};

// 포스트 프로세성 EffectComposer
const effectComposer = new EffectComposer(renderer, renderTarget);

// render pass
const addPostEffects = (obj) => {
  const { group, star } = obj;
  const renderPass = new RenderPass(scene, camera);
  effectComposer.addPass(renderPass);

  // const filmPass = new FilmPass(
  //   1, // 노이즈 강도 0: 낮게
  //   false // 흑백 (boolean) // 노이즈효과
  // );

  // effectComposer.addPass(filmPass);

  // const glitchPass = new GlitchPass();
  // glitchPass.goWild = true; // 글리치 효과 세게
  // effectComposer.addPass(glitchPass);

  // const afterimagePass = new AfterimagePass(0.94); // 모든 매쉬들이 이동하는 궤적을 다 보여 줌 (파티클이 유성처럼)
  // effectComposer.addPass(afterimagePass);

  // const halftonePass = new HalftonePass(canvasSize.width, canvasSize.height, {
  //   // 팝아트 느낌
  //   radius: 10, // 점의 사이즈가 커짐
  //   shape: 1, // 점의 모양 결정 (타원으로)
  //   scatter: 0, // 점들이 흩어지는 모양
  //   blending: 1, // 0 ~ 1
  // });
  // effectComposer.addPass(halftonePass);

  // const unrealBloomPass = new UnrealBloomPass( // 뽀샤시
  //   new THREE.Vector2(canvasSize.width, canvasSize.height)
  // );
  // unrealBloomPass.strength = 20; // 밝기 정도
  // unrealBloomPass.threshold = 0.03; // 사물의 빛나는 영역 조절
  // unrealBloomPass.radius = 0.9;
  // // effectComposer.addPass(unrealBloomPass); // 감마 패스 끄고 사용 (너무 뽀샤시해짐)

  const outlinePass = new OutlinePass(new THREE.Vector2(canvasSize.width, canvasSize.height), scene, camera);
  outlinePass.selectedObjects = [...group.children];
  // outlinePass.edgeGlow = 3; // 테두리  글로우
  // outlinePass.edgeStrength = 1; // 테두리 굵기
  // outlinePass.pulsePeriod = 5; // 테두리가 굵어졌다가 안 굵어졌다가

  // effectComposer.addPass(outlinePass);

  const shaderPass = new ShaderPass(GammaCorrectionShader);
  effectComposer.addPass(shaderPass);

  const smaaPass = new SMAAPass(); // outline에게도 스트로크가 부드럽게
  effectComposer.addPass(smaaPass);
};

const container = document.querySelector(".container");
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, canvasSize.width / canvasSize.height, 0.1, 100);
camera.position.z = 3;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const draw = (obj) => {
  requestAnimationFrame(() => draw(obj));
  // renderer.render(scene, camera);
  controls.update();
  effectComposer.render();
  const { group, star } = obj;

  group.rotation.x += 0.0005;
  group.rotation.y += 0.0005;

  // star.rotation.x += 0.001;
  // star.rotation.y += 0.001;
};

const init = () => {
  const obj = create();
  draw(obj);
  addPostEffects(obj);
  addLight();
};

const resize = () => {
  canvasSize.width = window.innerWidth;
  canvasSize.height = window.innerHeight;
  renderer.setSize(canvasSize.width, canvasSize.height);
  camera.aspect = canvasSize.width / canvasSize.height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  effectComposer.setSize(canvasSize.width, canvasSize.height);
};

window.addEventListener("resize", resize);

init();
