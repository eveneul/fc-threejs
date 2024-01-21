import * as THREE from "three";

export default class BaseObject {
  constructor() {
    this.scene = new THREE.Scene();
    this.textureLoader = new THREE.TextureLoader();
  }
}
