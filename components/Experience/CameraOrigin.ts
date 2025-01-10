import * as THREE from "three";
import { EventEmitter } from "./EventEmitter";
import CameraGroup from "./CameraGroup";

export default class CameraOrigin extends EventEmitter {
  public planetFocus: THREE.Group | null = null;
  public lastFocus: THREE.Group | null = null;
  private transitioning: boolean = false;
  public instance: THREE.Group;
  public position = new THREE.Vector3(0, 0, 0);
  // update instance position
  constructor(private cameraGroup: CameraGroup) {
    super();
    // put camera in a group
    this.instance = new THREE.Group();
    this.instance.add(this.cameraGroup.instance);
  }

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

  subscribeToPlanetFocusEvent() {
    this.on("planetFocus", (object: THREE.Group | null) =>
      this.setFocus(object),
    );
  }

  setFocus(object: THREE.Group | null) {
    this.lastFocus = this.planetFocus;
    this.planetFocus = object;
    this.transitioning = true;
  }

  setPositionToFocus() {
    if (this.planetFocus === null) return;
    const targetPosition = new THREE.Vector3();
    this.planetFocus.getWorldPosition(targetPosition);
    this.instance.position.copy(targetPosition);
    this.position = targetPosition;
  }

  interpolatePosition() {
    this.transitioning = false;
    if (this.planetFocus === null) {
      this.position = new THREE.Vector3(0, 0, 0);
    }
  }
}
