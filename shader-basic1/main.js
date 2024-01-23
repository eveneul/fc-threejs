import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';



const canvas = document.querySelector("canvas")
const scene = new THREE.Scene();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const geometry = new THREE.SphereGeometry(1, 30, 30);
const material = new THREE.MeshStandardMaterial({color: "blue"})

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

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(innerWidth, window.innerHeight);
renderer.render(scene, camera);



const renderTarget = new THREE.WebGLRenderTarget(
  window.innerWidth, window.innerHeight, { samples: 2 }
);

const effectComposer = new EffectComposer(renderer, renderTarget);

/*

uv는 3D 그래픽스와 셰이더 프로그래밍에서 흔히 사용되는 용어로, 3D 모델의 표면에 텍스처를 매핑하기 위한 2차원 좌표 시스템을 나타냅니다. 간단히 말해, uv 좌표는 3D 모델의 각 정점(vertex)이 텍스처 이미지의 어떤 부분에 해당하는지를 정의합니다.

U 좌표: 텍스처의 가로축을 따라가는 좌표입니다. 일반적으로 0에서 1 사이의 값을 가지며, 텍스처의 왼쪽 끝이 0, 오른쪽 끝이 1입니다.
V 좌표: 텍스처의 세로축을 따라가는 좌표입니다. 마찬가지로 0에서 1 사이의 값을 가지며, 텍스처의 아래쪽 끝이 0, 위쪽 끝이 1입니다.
이 uv 좌표를 사용하여 텍스처 이미지를 3D 모델의 표면에 올바르게 "매핑"할 수 있습니다. 예를 들어, uv 좌표가 (0, 0)인 정점은 텍스처 이미지의 왼쪽 하단에, (1, 1)인 정점은 텍스처 이미지의 오른쪽 상단에 해당하는 부분을 표시합니다.

셰이더 프로그래밍에서는 이 uv 좌표를 사용하여 각 정점에 대해 텍스처의 특정 부분을 어떻게 렌더링할지 결정합니다. 예를 들어, 텍스처의 색상을 변경하거나, 특정 효과를 적용하는 등의 작업을 수행할 수 있습니다.

*/

const renderPass = new RenderPass(scene, camera);
  effectComposer.addPass(renderPass);

const customShader = new ShaderPass({
  uniforms: {
    uColor: { value: new THREE.Vector3(0, 0, 1) },
    uAlpha: { value: 0.5 },
    tDiffuse: {value: null},
    },
  vertexShader: `

  varying vec2 vPosition;
  varying vec2 uUv;
  
    void main() {

      
      gl_Position = vec4(position.x, position.y, 0.0, 1.0);
      // position은 attribute로 내장되어 있기 때문에 바로 사용 가능
      vPosition = position.xy;

      uUv = uv;
    }

  `,
  fragmentShader: `
  
    uniform vec3 uColor;
    uniform float uAlpha;
    uniform sampler2D tDiffuse;

    varying vec2 vPosition;
    varying vec2 uUv;


    void main() {
      vec4 tex = texture2D(tDiffuse, uUv);
      gl_FragColor = tex;
    }
  `,
})
effectComposer.addPass(customShader);

//uv는 투디 텍스쳐를 쓰리디 텍스쳐로 맵핑할 때 사용하는 좌표 개념

const clock = new THREE.Clock();

  // addShader();
const tick = () => {
  requestAnimationFrame(tick);
  // renderer.render(scene, camera);
  effectComposer.render()
  camera.updateProjectionMatrix();
  controls.update();

  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

}

tick();