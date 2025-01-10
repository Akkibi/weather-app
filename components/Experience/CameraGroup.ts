import Camera from "./Camera";
import * as THREE from "three";
import { EventEmitter } from "./EventEmitter";
import { easeExpoInOut } from "./utils";

export default class CameraGroup extends EventEmitter {
  private cameraGroup: THREE.Group;
  private position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public planetFocus: THREE.Group | null = null;
  public lastFocus: THREE.Group | null = null;
  public transitioning: boolean = false;

  constructor(private camera: Camera) {
    super();
    // put camera in a group
    this.cameraGroup = new THREE.Group();
    this.cameraGroup.add(this.camera.get());
  }

  get() {
    return this.cameraGroup;
  }

  // update cameraGroup position
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
    this.cameraGroup.position.x = targetPosition.x;
    this.cameraGroup.position.y = targetPosition.y;
    this.position = targetPosition;
  }

  interpolatePosition() {}
}
