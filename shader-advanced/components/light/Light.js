import * as THREE from "three";
import BaseObject from "../mesh/BaseObject";

export default class Light extends BaseObject {
  constructor() {
    super();
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2.05, 1.03, 2.03);
    this.light = light;
  }
}
