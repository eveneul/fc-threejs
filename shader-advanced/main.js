import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import Cube from "./components/mesh/Cube";
import Light from "./components/light/Light";
import vertexShader from "./public/shaders/vertex.glsl?raw";
import fragmentShader from "./public/shaders/fragment.glsl?raw";

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
     * Texture
     */

    const texureLoader = new THREE.TextureLoader();

    /**
     * Clock
     */

    const clock = new THREE.Clock();

    /**
     * Object
     */

    // const cube = new Cube();
    // scene.add(cube.mesh);

    const geometry = new THREE.PlaneGeometry(1, 965 / 720, 16, 16);
    const material = new THREE.RawShaderMaterial({
      color: 0x00ff00,
      wireframe: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texureLoader.load("/images/new-beginnings.jpg") },
      },
      vertexShader,
      fragmentShader,
    });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const verticesCount = geometry.attributes.position.count;
    const randomPositions = new Float32Array(verticesCount);

    for (let i = 0; i < verticesCount; i++) {
      randomPositions[i] = (Math.random() - 0.5) * 2;
    }

    geometry.setAttribute(
      "aRandomPosition",
      new THREE.BufferAttribute(randomPositions, 1)
    );

    console.log(mesh.position);

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
    camera.position.z = 10;

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
    this.material = material;
    this.mesh = mesh;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
    this.clock = clock;
  }

  update() {}

  render() {
    this.update();
    this.renderer.render(this.scene, this.camera);

    this.material.uniforms.uTime.value = this.clock.getElapsedTime();

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
