import * as THREE from "three";
import { planetsArray } from "./data";
import Planet from "./Planet";
import Sun from "./World/Sun";
export default class Scene {
  instance: THREE.Scene;
  spheres: Planet[]
  ambientLight: THREE.AmbientLight;
  sun: Sun;
  // grid: THREE.GridHelper;
  constructor(public objectArray: THREE.Object3D[] = []) {
    this.instance = new THREE.Scene();
    this.instance.background = new THREE.Color(0x101020);
    // this.grid = new THREE.GridHelper(10, 10);
    // this.instance.add(this.grid);

    this.ambientLight = new THREE.AmbientLight(0x101020);
    this.instance.add(this.ambientLight);

    this.sun = new Sun(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshNormalMaterial())
    this.sun.instance.scale.set(2, 2, 2);
    this.sun.instance.position.set(0, 0, 0);
    this.add(this.sun.instance);

    this.spheres = planetsArray.map((data) => {
      const sphere = new Planet(data);
      sphere.name = 'planet';
      this.add(sphere.instance);
      return sphere;
    });
  }

  add(object: THREE.Object3D | THREE.Object3D[]) {
    if (Array.isArray(object)) {
      object.forEach((obj) => this.instance.add(obj));
    } else {
      this.instance.add(object);
    }
  }
}
