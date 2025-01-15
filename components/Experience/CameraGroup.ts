import Camera from "./Camera";
import * as THREE from "three";
import { EventEmitter } from "./EventEmitter";
import { easeExpoInOut } from "./utils";
import Planet from "./Planet";

export default class CameraGroup {
  public instance: THREE.Group;
  private distance: number = 5;
  public planetFocus: THREE.Group | null = null;
  public lastFocus: THREE.Group | null = null;
  public transitioning: boolean = false;
  public rotation: THREE.Euler = new THREE.Euler(-Math.PI / 3, 0, 0);
  constructor(
    private eventEmitter: EventEmitter,
    private camera: Camera,
  ) {
    // put camera in a group
    this.instance = new THREE.Group();
    this.instance.position.x = this.distance;
    // this.instance.rotation.copy(this.rotation);
    this.instance.rotation.x = -Math.PI / 3;
    this.instance.add(this.camera.instance);
    this.subscribeToEvents();
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
    this.distance = 5 + (planet.distance - 5) * progress;
    this.instance.position.x = this.distance;

    // transition from new THREE.Euler(-Math.PI / 3,0,0) to this.rotation
    const newRotation = new THREE.Euler(
      -Math.PI / 3 + (this.rotation.x + Math.PI / 3) * progress,
      this.rotation.y * progress,
      this.rotation.z * progress,
    );
    this.instance.rotation.copy(newRotation);
  }
}
