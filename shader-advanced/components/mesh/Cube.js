// import * as THREE from "three";
// import BaseObject from "./BaseObject";

// export default class Cube extends BaseObject {
//   constructor() {
//     super();

//     const geometry = new THREE.PlaneGeometry(1, 1);

//     //RawShaderMaterial: uniforms 같은 게 정의되지 않음

//     const material = new THREE.RawShaderMaterial({
//       wireframe: true,
//       color: 0x00ff00,
//       // onBeforeCompile: (data) => console.log(data), // 컴파일 되기 전에 호출
//       vertexShader: `
//         uniform mat4 projectionMatrix;
//         uniform mat4 viewMatrix;
//         uniform mat4 modelMatrix;

//         attribute vec3 position;

//         void main() {
//           gl_Position = projectionMatrix * viewMatrix; * modelMatrix * vec4(position, 1.0);
//         }
//       `,
//     });
//     const mesh = new THREE.Mesh(geometry, material);

//     console.log(geometry);

//     this.geometry = geometry;
//     this.material = material;
//     this.mesh = mesh;
//   }
// }
