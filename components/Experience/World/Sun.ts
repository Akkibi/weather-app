import * as THREE from "three";
import { EventEmitter } from "../EventEmitter";

export default class Camera extends EventEmitter {
  geometry: THREE.SphereGeometry;
  material: THREE.MeshNormalMaterial;
  instance: THREE.Mesh;

  constructor(geometry: THREE.SphereGeometry, material: THREE.MeshNormalMaterial){
    super()
    this.geometry = geometry;
    this.material = material;
    this.instance = new THREE.Mesh(this.geometry, this.material);
  }
}
