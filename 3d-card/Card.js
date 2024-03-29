import * as THREE from "three";

export default class Card {
  constructor({ w, h, color, radius }) {
    const x = w / 2 - radius;
    const y = h / 2 - radius;
    console.log(radius);

    const shape = new THREE.Shape();

    shape
      .absarc(x, y, radius, Math.PI / 2, 0, true)
      .lineTo(x + radius, -y)
      .absarc(x, -y, radius, 0, -Math.PI / 2, true)
      .lineTo(-x, -(y + radius))
      .absarc(-x, -y, radius, -Math.PI / 2, Math.PI, true)
      .lineTo(-(x + radius), y, radius, Math.PI, Math.PI / 2, true)
      .absarc(-x, y, radius, Math.PI, Math.PI / 2, true);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelThickness: 0.1,
    });
    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);

    this.mesh = mesh;
  }
}
