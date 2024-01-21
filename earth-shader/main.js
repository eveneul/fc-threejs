import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Earth from "./components/Earth.js";
import Star from "./components/Star.js";
import Point from "./components/Point.js";
import Curve from "./components/Curve.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import GUI from "lil-gui";

// sizes
const sizes = { width: window.innerWidth, height: window.innerHeight };

const gui = new GUI();

/**
 * Texture
 */

const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load([
  "assets/environments/px.png",
  "assets/environments/nx.png",
  "assets/environments/py.png",
  "assets/environments/ny.png",
  "assets/environments/pz.png",
  "assets/environments/nz.png",
]);
environmentMap.encoding = THREE.sRGBEncoding;

const canvas = document.querySelector("canvas");

/**
 * Scene
 */

const scene = new THREE.Scene();
scene.background = environmentMap;
scene.environment = environmentMap;

/**
 * Object
 */

const objectGroup = new THREE.Group();

const earth1 = new Earth(1.3, 0.6, true);
const earth2 = new Earth(1.5, 0.9, false);
const star = new Star(500);
const koearPoint = new Point(37.56668, 126.97841);
const ganaPoint = new Point(5.55363, -0.196481);
const curve = new Curve(koearPoint.position, ganaPoint.position);

earth1.mesh.rotation.y = -Math.PI / 2;
koearPoint.mesh.rotation.set(0.9, 2.46, 1);

objectGroup.add(
  earth1.mesh,
  earth2.mesh,
  koearPoint.mesh,
  ganaPoint.mesh,
  curve.mesh
);
scene.add(objectGroup, star.mesh);

/**
 * Light
 */

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2.65, 2.13, 1.02);
scene.add(light);

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  300
);
camera.position.z = 3;

/**
 * Control
 */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Post Processing
 */

const postProcessing = () => {
  const renderPass = new RenderPass(scene, camera);
  effectComposer.addPass(renderPass);

  const filmPass = new FilmPass();
  // effectComposer.addPass(filmPass);

  const unrealBloomPass = new UnrealBloomPass(
    new THREE.Vector2(sizes.width, sizes.height)
  );
  // effectComposer.addPass(unrealBloomPass);

  const shaderPass = new ShaderPass(GammaCorrectionShader);

  const customShaderPass = new ShaderPass({
    uniforms: {
      uPosition: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Vector3(0, 0, 0.3) },
      uAlpha: { value: 0.5 },
      tDiffuse: { value: null },
    },
    vertexShader: /* 정점 셰이더 */ `
      varying vec2 vPosition;
      varying vec2 vUv;

      void main() {
        gl_Position = vec4(position.x, position.y, 0.0, 1.0);
        vPosition = position.xy;
        vUv = uv;
      }
    `,
    fragmentShader: /* 색상 셰이더 */ `
      uniform vec3 uColor;
      uniform float uAlpha;
      uniform sampler2D tDiffuse;
      uniform vec2 uPosition;
      varying vec2 vPosition;
      varying vec2 vUv;

      void main() {
        vec2 newUV = vec2(vUv.x, vUv.y + sin(vUv.x * 20.0) * 0.1 + uPosition.y);
        vec4 tex = texture2D(tDiffuse, newUV);
        tex.rgb += uColor;
        gl_FragColor = tex;
      }
    `,
  });

  gui
    .add(customShaderPass.uniforms.uPosition.value, "x")
    .min(-1)
    .max(1)
    .step(0.01);
  gui
    .add(customShaderPass.uniforms.uPosition.value, "y")
    .min(-1)
    .max(1)
    .step(0.01);

  // vUv: 2d 텍스쳐를 3d 텍스쳐로 맵핑할 때 사용되는 좌표 개념

  effectComposer.addPass(customShaderPass);

  effectComposer.addPass(shaderPass);
  const smaaPass = new SMAAPass();
  effectComposer.addPass(smaaPass);
};

/**
 * Render
 */

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const renderTarget = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {
  samples: 2,
});
const effectComposer = new EffectComposer(renderer, renderTarget);

/**
 * Animate
 */

const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  objectGroup.rotation.y += 0.0005;
  objectGroup.rotation.x += 0.0006;

  star.mesh.rotation.x += 0.001;
  star.mesh.rotation.y += 0.001;

  controls.update();
  effectComposer.render();
};

const render = () => {
  postProcessing();
  animate();
};

render();
