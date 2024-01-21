import * as THREE from "three";
import BaseObject from "./Object.js";
import { getGradientCanvas } from "../js/utils.js";

export default class Curve extends BaseObject {
  constructor(position1, position2) {
    super();

    const points = [];
    for (let i = 0; i <= 100; i++) {
      const pos = new THREE.Vector3().lerpVectors(
        position1,
        position2,
        i / 100
      );
      pos.normalize();

      const wave = Math.sin((Math.PI * i) / 100);

      pos.multiplyScalar(1.3 + 0.3 * wave);
      points.push(pos);
    }

    const curve = new THREE.CatmullRomCurve3(points);
    console.log(curve);
    this.geometry = new THREE.TubeGeometry(curve, 20, 0.01);

    const graidentCanvas = getGradientCanvas("#757F94", "#263D74");
    const texture = new THREE.CanvasTexture(graidentCanvas);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.mesh = new THREE.Mesh(this.geometry, material);
  }
}
