import Camera from "./Camera";
import * as THREE from "three";
import { EventEmitter } from "./EventEmitter";
import { easeExpoInOut } from "./utils";
import Planet from "./Planet";
import { GestureUpdateEvent } from "react-native-gesture-handler";
import { PanGestureHandlerEventPayload } from "react-native-reanimated/lib/typescript/screenTransition/commonTypes";
import { Dimensions } from "react-native";

export default class CameraGroup {
  public isFocused: boolean = false;
  public instance: THREE.Group = new THREE.Group();
  public instanceXRotationDriver: THREE.Group = new THREE.Group();
  private distance: number = 5;
  public planetFocus: THREE.Group | null = null;
  public lastFocus: THREE.Group | null = null;
  public transitioning: boolean = false;

  // orbit
  private bufferRotation: THREE.Vector2 = new THREE.Vector2(0, 0);
  private moveAmount: THREE.Vector2 = new THREE.Vector2(0, 0);
  private isMoveMomentum: boolean = false;
  constructor(
    private eventEmitter: EventEmitter,
    private camera: Camera,
  ) {
    // put camera in a group
    this.instance.position.x = this.distance;
    this.instanceXRotationDriver.rotation.x = -Math.PI / 3;
    this.instanceXRotationDriver.add(this.camera.instance);
    this.instance.add(this.instanceXRotationDriver);
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.eventEmitter.on(
      "interpolateToFocus",
      (progress: number, planet: Planet) => {
        this.gotoPosition(progress, planet);
      },
    );
    this.eventEmitter.on("animate", () => {
      this.updateMomentum();
    });
    this.eventEmitter.on(
      "touchStart",
      (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        if (this.isFocused) this.getMousePosition(event);
      },
    );
    this.eventEmitter.on(
      "touchMove",
      (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        if (this.isFocused) this.setRotationToMouse(event);
      },
    );
    this.eventEmitter.on(
      "touchEnd",
      (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        if (this.isFocused) this.endRotationToMouse(event);
      },
    );
    this.eventEmitter.on("resetCameraRotation", () => {
      this.resetCameraRotation();
    });
  }

  getMousePosition(event: GestureUpdateEvent<PanGestureHandlerEventPayload>) {
    console.log(event.absoluteX, event.absoluteY);
  }

  setRotationToMouse(event: GestureUpdateEvent<PanGestureHandlerEventPayload>) {
    // update rotation
    this.moveAmount.x = event.velocityY * -0.000025;
    this.moveAmount.y = event.velocityX * -0.000025;

    this.updateRotation();
  }

  endRotationToMouse(event: GestureUpdateEvent<PanGestureHandlerEventPayload>) {
    console.log(event.absoluteX, event.absoluteY);
    this.isMoveMomentum = true;
  }

  gotoPosition(progress: number, planet: Planet) {
    this.distance = 5 + (planet.distance - 5) * progress;
    this.instance.position.x = this.distance;

    this.instance.rotation.y = this.bufferRotation.y * progress;
    this.instanceXRotationDriver.rotation.x =
      this.bufferRotation.x * progress + (-Math.PI / 3) * (1 - progress);
  }

  updateMomentum() {
    if (!this.isMoveMomentum) return;
    if (
      Math.abs(this.moveAmount.x) >= 0.001 ||
      Math.abs(this.moveAmount.y) >= 0.001
    ) {
      this.moveAmount.x *= 0.98;
      this.moveAmount.y *= 0.98;

      this.updateRotation();
    } else {
      this.isMoveMomentum = false;
    }
  }

  updateRotation() {
    this.instance.rotation.y += this.moveAmount.y;
    this.instanceXRotationDriver.rotation.x += this.moveAmount.x;

    this.instanceXRotationDriver.rotation.x = Math.min(
      Math.max(this.instanceXRotationDriver.rotation.x, -Math.PI / 2),
      Math.PI / 2,
    );

    this.bufferRotation.y = this.instance.rotation.y;
    this.bufferRotation.x = this.instanceXRotationDriver.rotation.x;
  }

  resetCameraRotation() {
    this.bufferRotation.y = 0;
    this.bufferRotation.x = 0;
  }
}
