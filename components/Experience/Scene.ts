import * as THREE from "three";
import { planetsArray } from "./Utils/data";
import Planet from "./World/Planet";
import Sun from "./World/Sun";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { EventEmitter } from "./Utils/EventEmitter";
import Camera from "./Camera";
// import nebulae from "../../assets/images/nebulae.hdr";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export default class Scene {
  instance: THREE.Scene;
  planets: Planet[];
  ambientLight: THREE.AmbientLight;
  sun: Sun;
  polarGridHelper: THREE.PolarGridHelper;
  // grid: THREE.GridHelper;
  constructor(
    private eventEmitter: EventEmitter,
    private camera: Camera,
    public objectArray: THREE.Object3D[] = []
  ) {
    this.instance = new THREE.Scene();
    this.instance.background = new THREE.Color(0x000000);
    // this.grid = new THREE.GridHelper(10, 10);
    // this.instance.add(this.grid);
    this.polarGridHelper = new THREE.PolarGridHelper(
      20,
      10,
      10,
      128,
      "#111111",
      "#223022"
    );

    this.ambientLight = new THREE.AmbientLight(0x555555);
    this.add([this.polarGridHelper, this.ambientLight]);

    this.sun = new Sun(
      this.eventEmitter,
      new THREE.SphereGeometry(1, 32, 32),
      camera
    );
    this.sun.instance.scale.set(2, 2, 2);
    this.sun.instance.position.set(0, 0, 0);
    this.add(this.sun.instance);

    this.planets = planetsArray.map((data) => {
      const planet = new Planet(data);
      this.add(planet.instance);
      return planet;
    });

    // load hdri and put it in the scene background
    // this.loadHDRI();
  }

  // loadHDRI() {
  //   const loader = new RGBELoader(); // Use RGBELoader for HDR files
  //   loader.load(
  //     nebulae,
  //     (texture) => {
  //       texture.mapping = THREE.EquirectangularReflectionMapping;
  //       this.instance.background = texture; // Set the HDRI as the scene background
  //       this.instance.environment = texture; // Optionally set it as the environment map for reflections
  //     },
  //     undefined,
  //     (error) => {
  //       console.error("An error occurred while loading the HDRI.", error);
  //     },
  //   );
  // }

  add(object: THREE.Object3D | THREE.Object3D[]) {
    if (Array.isArray(object)) {
      object.forEach((obj) => this.instance.add(obj));
    } else {
      this.instance.add(object);
    }
  }
}
