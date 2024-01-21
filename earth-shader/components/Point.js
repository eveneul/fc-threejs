import * as THREE from "three";
import { convertLatLngToPos } from "../js/utils.js";
import BaseObject from "./Object.js";

export default class Point extends BaseObject {
  constructor(lat, lng) {
    super();

    const point = {
      lat: lat * (Math.PI / 180),
      lng: lng * (Math.PI / 180),
    };

    this.position = convertLatLngToPos(point, 1.3);
    // 1.3은 안에 있는 지구 반지름 크기
    this.mesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.02, 0.002, 20, 20),
      new THREE.MeshBasicMaterial({
        color: 0x263d64,
      })
    );

    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }
}
