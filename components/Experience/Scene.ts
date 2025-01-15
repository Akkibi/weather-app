import * as THREE from "three";
import { planetsArray } from "./Utils/data";
import Planet from "./World/Planet";
import Sun from "./World/Sun";
export default class Scene {
  instance: THREE.Scene;
  planets: Planet[];
  ambientLight: THREE.AmbientLight;
  sun: Sun;
  gridHelper: THREE.GridHelper;
  // grid: THREE.GridHelper;
  constructor(public objectArray: THREE.Object3D[] = []) {
    this.instance = new THREE.Scene();
    this.instance.background = new THREE.Color(0x101020);
    // this.grid = new THREE.GridHelper(10, 10);
    // this.instance.add(this.grid);
    this.gridHelper = new THREE.GridHelper(100, 10);
    this.ambientLight = new THREE.AmbientLight(0x101020);
    this.instance.add(this.ambientLight);

    this.sun = new Sun(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshNormalMaterial(),
    );
    this.sun.instance.scale.set(2.5, 2.5, 2.5);
    this.sun.instance.position.set(0, 0, 0);
    this.add(this.sun.instance);

    this.planets = planetsArray.map((data) => {
      const planet = new Planet(data);
      this.add(planet.instance);
      return planet;
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
