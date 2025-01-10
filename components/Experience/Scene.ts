import * as THREE from "three";
export default class Scene {
  scene: THREE.Scene;
  grid: THREE.GridHelper;
  constructor(public objectArray: THREE.Object3D[] = []) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x101020);
    this.grid = new THREE.GridHelper(10, 10);
    this.scene.add(this.grid);

    const ambientLight = new THREE.AmbientLight(0x101020);
    this.scene.add(ambientLight);
  }

  add(object: THREE.Object3D | THREE.Object3D[]) {
    if (Array.isArray(object)) {
      object.forEach((obj) => this.scene.add(obj));
    } else {
      this.scene.add(object);
    }
  }

  get() {
    return this.scene;
  }
}
