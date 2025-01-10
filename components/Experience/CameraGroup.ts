import Camera from "./Camera";
import * as THREE from "three";
import { EventEmitter } from "./EventEmitter";
import { easeExpoInOut } from "./utils";

export default class CameraGroup extends EventEmitter {
  public instance: THREE.Group;
  private position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public planetFocus: THREE.Group | null = null;
  public lastFocus: THREE.Group | null = null;
  public transitioning: boolean = false;

  constructor(private camera: Camera) {
    super();
    // put camera in a group
    this.instance = new THREE.Group();
    this.instance.add(this.camera.instance);
  }

  // update instance position
  updatePosition() {
    if (this.transitioning === false) {
      this.interpolatePosition();
    } else {
      this.setPositionToFocus();
    }
  }

  subscribeToAnimateEvent() {
    this.on("animate", () => this.updatePosition());
  }

  setFocus(object: THREE.Group | null) {
    this.lastFocus = this.planetFocus;
    this.planetFocus = object;
  }

  setPositionToFocus() {
    if (this.planetFocus === null) return;
    const targetPosition = new THREE.Vector3();
    this.planetFocus.getWorldPosition(targetPosition);
    this.instance.position.x = targetPosition.x;
    this.instance.position.y = targetPosition.y;
    this.position = targetPosition;
  }

  interpolatePosition() {}
}
