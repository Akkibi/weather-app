import * as THREE from "three";
import { EventEmitter } from "./EventEmitter";
import Planet from "./Planet";

export default class Camera {
  instance: THREE.PerspectiveCamera;
  aspect: number;

  constructor(
    private eventEmitter: EventEmitter,
    public position: THREE.Vector3 = new THREE.Vector3(0, 0, 13),
    public fov: number = 75,
    private near: number = 0.1,
    private far: number = 100,
    private distance: number = 10,
  ) {
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
    this.instance.lookAt(0, 0, 0);

    // Subscribe to window resize event
    this.subscribeToResizeEvent();
    this.subscribeToEvents();
  }

  subscribeToResizeEvent() {
    console.log("eventEmitter", this.eventEmitter.on);
    // Use the EventEmitter to subscribe to the window resize event
    this.eventEmitter.on("windowResize", this.resize.bind(this));

    // Add native window resize listener to trigger the event
    window.addEventListener("resize", () => {
      this.eventEmitter.trigger("windowResize");
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

  subscribeToEvents() {
    this.eventEmitter.on(
      "interpolateToFocus",
      (progress: number, planet: Planet) => {
        this.gotoPosition(progress, planet);
      },
    );
  }

  gotoPosition(progress: number, planet: Planet) {
    this.distance = 3 + 10 * (1 - progress);
    this.instance.position.z = this.distance;
  }
}
