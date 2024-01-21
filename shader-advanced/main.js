import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import Cube from "./components/mesh/Cube";
import Light from "./components/light/Light";

class App {
  constructor() {
    this.init();
    this.render();
    this.resize();
  }

  init() {
    const container = document.querySelector("#container");
    const canvas = document.createElement("canvas");
    const sizes = { width: window.innerWidth, height: window.innerHeight };
    canvas.width = sizes.width;
    canvas.height = sizes.height;
    container.appendChild(canvas);

    /**
     * Scene
     */
    const scene = new THREE.Scene();

    /**
     * Object
     */

    // const cube = new Cube();
    // scene.add(cube.mesh);

    const geometry = new THREE.PlaneGeometry(1, 1, 16, 16);
    const material = new THREE.RawShaderMaterial({
      color: 0x00ff00,
      wireframe: false,
      side: THREE.DoubleSide,

      // uniform mat4 projectionMatrix :: 3d를 2d로
      // uniform mat4 viewMatrix :: 카메라의 정보를 담음
      // uniform mat4 modelMatrix; :: 모델의 정보를 담음
      //attribute vec3 position; :: 정점 데이터를 담음
      // uniform mat4 modelViewMatrix :: viewMatrix * modelMatrix

      vertexShader: `
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        uniform mat4 modelViewMatrix;

        attribute vec3 position;
      
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.1);
        }
      `,
      //precision mediump float; 정밀도를 미디엄으로 설정
      fragmentShader: `
      precision mediump float;

      void main() {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
      }
      `,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /**
     * Light
     */

    const light = new Light();
    scene.add(light.light);

    /**
     * Camera
     */

    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 8;

    /**
     * Controls
     */

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio * 2);

    this.sizes = sizes;
    this.scene = scene;
    this.light = light;
    this.mesh = mesh;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
  }

  update() {}

  render() {
    this.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
    this.controls.update();
  }

  resize() {
    window.addEventListener("resize", () => {
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.render(this.scene, this.camera);
    });
  }
}

window.addEventListener("load", () => {
  new App();
});
