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
}
