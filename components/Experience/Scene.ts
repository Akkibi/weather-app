import * as THREE from "three";
export default class Scene {
  instance: THREE.Scene;
  grid: THREE.GridHelper;
  constructor(public objectArray: THREE.Object3D[] = []) {
    this.instance = new THREE.Scene();
    this.instance.background = new THREE.Color(0x101020);
    this.grid = new THREE.GridHelper(10, 10);
    this.instance.add(this.grid);

    const ambientLight = new THREE.AmbientLight(0x101020);
    this.instance.add(ambientLight);
  }

  add(object: THREE.Object3D | THREE.Object3D[]) {
    if (Array.isArray(object)) {
      object.forEach((obj) => this.instance.add(obj));
    } else {
      this.instance.add(object);
    }
  }
}
