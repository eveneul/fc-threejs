import * as THREE from "three";
import BaseObject from "./Object.js";

export default class Earth extends BaseObject {
  constructor(radius, opacity, frontSize = true) {
    super();

    const geometry = new THREE.SphereGeometry(radius, 30, 30);
    const material = new THREE.MeshStandardMaterial({
      map: this.textureLoader.load("/assets/earth-night-map.jpeg"),
      side: frontSize ? THREE.FrontSide : THREE.BackSide,
      opacity: opacity,
      transparent: true,
    });
    this.mesh = new THREE.Mesh(geometry, material);
  }
}
