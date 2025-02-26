import * as THREE from "three";
import { EventEmitter } from "./Utils/EventEmitter";
import Planet from "./World/Planet";
import Sizes from "./Utils/Sizes";

export default class Camera {
  instance: THREE.PerspectiveCamera;
  aspect: number;

  constructor(
    private eventEmitter: EventEmitter,
    private sizes: Sizes,
    public position: THREE.Vector3 = new THREE.Vector3(0, 0, 14),
    public fov: number = 75,
    private near: number = 0.1,
    private far: number = 100,
    private distance: number = 10,
  ) {
    // Initialize camera properties
    this.aspect = this.sizes.width / this.sizes.height;
    this.fov = fov;
    this.near = near;
    this.far = far;
    this.position = position;

    // Create the PerspectiveCamera
    this.instance = new THREE.PerspectiveCamera(
      this.fov,
      this.aspect,
      this.near,
      this.far,
    );

    // Set initial position
    this.instance.position.copy(this.position);
    this.instance.lookAt(0, 0, 0);

    this.subscribeToEvents();
  }

  updatePosition(position: THREE.Vector3) {
    this.position = position;
    this.instance.position.copy(this.position);
    this.instance.lookAt(0, 0, 0);
  }

  subscribeToEvents() {
    this.eventEmitter.on(
      "interpolateToFocus",
      (progress: number, planet: Planet) => {
        this.gotoPosition(progress, planet);
      },
    );
  }

  gotoPosition(progress: number, planet: Planet) {
    this.distance = 2 + 12 * (1 - progress);
    this.instance.position.z = this.distance;
  }
}
