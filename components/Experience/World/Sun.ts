import * as THREE from "three";
import { EventEmitter } from "../Utils/EventEmitter";

export default class Camera {
  geometry: THREE.SphereGeometry;
  material: THREE.MeshNormalMaterial;
  instance: THREE.Group;
  sun: THREE.Object3D;

  constructor(
    geometry: THREE.SphereGeometry,
    material: THREE.MeshNormalMaterial,
  ) {
    this.geometry = geometry;
    this.material = material;

    this.instance = new THREE.Group();
    this.instance.name = "sun";
    this.sun = new THREE.Mesh(this.geometry, this.material);

    this.instance.add(this.sun);
  }
}
