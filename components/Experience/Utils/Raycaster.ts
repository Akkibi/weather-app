import * as THREE from "three";
import { EventEmitter } from "../EventEmitter";
import Sizes from "./Sizes";
import Camera from "../Camera";
import Scene from "../Scene";
import CameraOrigin from "../CameraOrigin";
import { TouchEvent } from "react";
import Planet from "../Planet";
import {
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";

export default class Raycaster {
  raycaster: THREE.Raycaster;
  currentIntersect: THREE.Intersection | null;
  mouse: THREE.Vector2;

  constructor(
    private eventEmitter: EventEmitter,
    public sizes: Sizes,
    public camera: Camera,
    private scene: Scene,
    private cameraOrigin: CameraOrigin,
    private planets: Planet[],
  ) {
    this.raycaster = new THREE.Raycaster();
    this.currentIntersect = null;
    this.mouse = new THREE.Vector2();
    this.sizes = sizes;
    this.camera = camera;
    this.scene = scene;
    this.cameraOrigin = cameraOrigin;

    // window.addEventListener('touchmove', (event) =>
    //   {
    //       this.mouse.x = event.targetTouches[0].clientX / this.sizes.width * 2 - 1
    //       this.mouse.y = - (event.targetTouches[0].clientY / this.sizes.height) * 2 + 1
    //   })

    this.subscribeToEvent();
  }
  subscribeToEvent() {
    // window.addEventListener("touchstart", () => console.log("touchstart"));
    this.eventEmitter.on(
      "click",
      (event: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => {
        this.onPlanetSelect(event);
      },
    );
  }

  onPlanetSelect(
    event: GestureStateChangeEvent<TapGestureHandlerEventPayload>,
  ) {
    this.mouse.x = (event.absoluteX / this.sizes.width) * 2 - 1;
    this.mouse.y = -(event.absoluteY / this.sizes.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    let intersects = this.raycaster.intersectObject(this.scene.instance);
    this.currentIntersect = intersects[0] ? intersects[0] : null;

    if (
      this.currentIntersect &&
      this.currentIntersect.object.parent?.name === "planet"
    ) {
      const parent = this.currentIntersect.object.parent;
      this.eventEmitter.trigger("planetFocus", [parent.userData]);
    } else {
      console.warn("no intersects");
    }
  }
}
