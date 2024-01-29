import * as THREE from "three";
import vertexShader from "./shaders/vertexshader.glsl?raw";
import fragmentShader from "./shaders/fragmentshader.glsl?raw";
import ASScroll from "@ashthornton/asscroll";

const scroll = new ASScroll({
  disableRaf: true,
});
scroll.enable();

const renderer = new THREE.WebGLRenderer({
  alpha: true,
});

const container = document.querySelector("#container");

container.appendChild(renderer.domElement);

const canvasSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvasSize.width / canvasSize.height, 0.1, 100);
camera.position.set(0, 0, 50);
camera.fov = Math.atan(canvasSize.height / 2 / 50) * (180 / Math.PI) * 2;

const loadImages = async () => {
  const images = [...document.querySelectorAll("img")];

  const fetchImages = images.map(
    (image) =>
      new Promise((resolve, reject) => {
        image.onload = resolve(image);
        image.onerror = reject;
      })
  );

  const loadedImages = await Promise.all(fetchImages);
  return loadedImages;
};

const imageRepository = [];

const textureLoader = new THREE.TextureLoader();

const createImages = (images) => {
  const imageMeshes = images.map((image) => {
    const { width, height, top, left } = image.getBoundingClientRect();

    const geometry = new THREE.PlaneGeometry(width, height, 16, 16);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: textureLoader.load(image.src) },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);

    imageRepository.push({ img: image, mesh });
    return mesh;
  });

  return imageMeshes;
};

const create = async () => {
  const loadedImages = await loadImages();
  const images = createImages([...loadedImages]);

  console.log(images);

  scene.add(...images);
};

const resize = () => {
  canvasSize.width = window.innerWidth;
  canvasSize.height = window.innerHeight;

  camera.aspect = canvasSize.width / canvasSize.height;
  camera.fov = Math.atan(canvasSize.height / 2 / 50) * (180 / Math.PI) * 2;

  camera.updateProjectionMatrix();

  renderer.setSize(canvasSize.width, canvasSize.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

function retransform() {
  imageRepository.forEach(({ img, mesh }) => {
    const { width, height, top, left } = img.getBoundingClientRect();
    const { width: originWidth } = mesh.geometry.parameters;
    const scale = width / originWidth;
    mesh.scale.x = scale;
    mesh.scale.y = scale;
    mesh.position.y = canvasSize.height / 2 - height / 2 - top;
    mesh.position.x = -canvasSize.width / 2 + width / 2 + left;
  });
}

const addEvent = () => {
  window.addEventListener("resize", resize);
};

const draw = () => {
  renderer.render(scene, camera);
  retransform();
  scroll.update();
  requestAnimationFrame(() => {
    draw();
  });
};

const initialize = async () => {
  await create();
  addEvent();
  resize();
  draw();
};

initialize();
