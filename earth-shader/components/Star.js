import * as THREE from "three";

import BaseObject from "./Object.js";

export default class Star extends BaseObject {
  constructor(count) {
    super();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.02,
      transparent: true,
      depthWrite: false,
      map: this.textureLoader.load("/assets/particles/particle.png"),
      alphaMap: this.textureLoader.load("/assets/particles/particle.png"),
      color: 0xbcc6c6,
    });

    this.mesh = new THREE.Points(geometry, material);
  }
}
