import * as THREE from "three";
import { EventEmitter } from "./EventEmitter";

export default class Camera extends EventEmitter {
  instance: THREE.PerspectiveCamera;
  aspect: number;

  constructor(
    public position: THREE.Vector3 = new THREE.Vector3(0, 0, 5),
    public fov: number = 75,
    private near: number = 0.1,
    private far: number = 100,
  ) {
    super();

    // Initialize camera properties
    this.aspect = window.innerWidth / window.innerHeight;
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
    this.instance.lookAt(5, 0, 0);

    // Subscribe to window resize event
    this.subscribeToResizeEvent();
  }

  subscribeToResizeEvent() {
    // Use the EventEmitter to subscribe to the window resize event
    this.on("windowResize", this.resize.bind(this));

    // Add native window resize listener to trigger the event
    window.addEventListener("resize", () => {
      this.trigger("windowResize");
    });
  }

  resize() {
    // Update the aspect ratio
    this.aspect = window.innerWidth / window.innerHeight;

    // Update the camera's aspect ratio and projection matrix
    this.instance.aspect = this.aspect;
    this.instance.updateProjectionMatrix();
  }

  updatePosition(position: THREE.Vector3) {
    this.position = position;
    this.instance.position.copy(this.position);
    this.instance.lookAt(0, 0, 0);
  }
}
