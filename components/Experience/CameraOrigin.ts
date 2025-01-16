import * as THREE from "three";
import { EventEmitter } from "./EventEmitter";
import CameraGroup from "./CameraGroup";
import Planet from "./Planet";
import {
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { easeExpoInOut } from "./utils";

export default class CameraOrigin {
  public planetFocus: Planet | null = null;
  public lastFocus: Planet | null = null;
  private transitioningTo: boolean | null = null;
  public instance: THREE.Group;

  // scroll
  private scrollAmount: number = 0;
  private isScrollMomentum: boolean = false;

  // Interpolation state
  private startTime: number = 0;
  private duration: number = 1000;
  private angle: number = 0;

  constructor(
    private eventEmitter: EventEmitter,
    public cameraGroup: CameraGroup,
  ) {
    // put camera in a group
    this.instance = new THREE.Group();
    this.instance.add(this.cameraGroup.instance);
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.eventEmitter.on("back", () => this.setFocus(null));
    this.eventEmitter.on("animate", () => {
      this.updatePosition();
    });
    this.eventEmitter.on("planetFocus", (planet: Planet | null) =>
      this.setFocus(planet),
    );
    this.eventEmitter.on(
      "touchStart",
      (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        this.getMousePosition(event);
      },
    );
    this.eventEmitter.on(
      "touchMove",
      (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) =>
        this.setRotationToScroll(event),
    );
    this.eventEmitter.on(
      "touchEnd",
      (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        this.endScrollRotation(event);
      },
    );
  }

  updatePosition() {
    if (this.transitioningTo === true) {
      this.interpolateToFocus();
    } else if (this.transitioningTo === false) {
      this.interpolateToDefault();
    } else if (this.planetFocus !== null) {
      this.setRotationToFocus();
    } else if (this.isScrollMomentum) {
      this.updateScrollMomentum();
    }
  }

  getMousePosition(event: GestureUpdateEvent<PanGestureHandlerEventPayload>) {
    this.isScrollMomentum = false;
  }

  setRotationToScroll(
    event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
  ) {
    if (this.planetFocus !== null) return;
    this.isScrollMomentum = false;
    // this.scrollAmount = (event.absoluteY - this.startScrollPosition) * 0.0002;
    this.scrollAmount = event.velocityY * 0.000025;
    this.instance.rotation.y += this.scrollAmount;
    this.angle = this.instance.rotation.y;
  }

  endScrollRotation(event: GestureUpdateEvent<PanGestureHandlerEventPayload>) {
    this.isScrollMomentum = true;
    // console.error("end scroll", this.isScrollMomentum, this.scrollAmount);
  }

  updateScrollMomentum() {
    if (Math.abs(this.scrollAmount) >= 0.001) {
      this.scrollAmount *= 0.98;
      this.instance.rotation.y += this.scrollAmount;
      this.angle = this.instance.rotation.y;
    } else {
      this.isScrollMomentum = false;
    }
  }

  setFocus(planet: Planet | null) {
    if (planet === this.planetFocus) return;
    if (this.transitioningTo !== null) return;
    this.lastFocus = this.planetFocus;
    this.planetFocus = planet;
    this.transitioningTo = this.planetFocus ? true : false;
    this.cameraGroup.isFocused = this.planetFocus ? true : false;
    this.isScrollMomentum = false;
    this.startTime = performance.now();
  }

  setRotationToFocus() {
    if (this.planetFocus !== null) {
      this.instance.rotation.y = -this.planetFocus.angle;
    }
  }

  interpolateToDefault() {
    const elapsedTime = performance.now() - this.startTime;
    const progress = Math.max((this.duration - elapsedTime) / this.duration, 0);
    const easedProgress = easeExpoInOut(progress);
    if (this.lastFocus && progress !== 0) {
      this.eventEmitter.trigger("interpolateToFocus", [
        easedProgress,
        this.lastFocus,
      ]);
    } else {
      this.eventEmitter.trigger("resetCameraRotation");
      // console.error("end transitioning back");
      this.transitioningTo = null;
    }
  }

  interpolateToFocus() {
    const elapsedTime = performance.now() - this.startTime;
    const progress = Math.min(elapsedTime / this.duration, 1);
    const easedProgress = easeExpoInOut(progress);

    if (this.planetFocus && progress !== 1) {
      this.instance.rotation.y =
        this.angle +
        ((-this.planetFocus.angle % (Math.PI * 2)) -
          (this.angle % (Math.PI * 2))) *
          easedProgress;

      this.eventEmitter.trigger("interpolateToFocus", [
        easedProgress,
        this.planetFocus,
      ]);
    } else {
      // this.eventEmitter.trigger("resetCameraRotation");
      // console.error("remove transition", progress, elapsedTime);
      this.transitioningTo = null;
      this.angle = this.instance.rotation.y;
    }
  }
}
