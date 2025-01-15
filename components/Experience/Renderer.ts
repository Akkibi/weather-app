import * as THREE from "three";
import { ExpoWebGLRenderingContext } from "expo-gl";
import { EventEmitter } from "./Utils/EventEmitter";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default class Renderer {
  renderer: THREE.WebGLRenderer;
  constructor(
    private eventEmitter: EventEmitter,
    private gl: ExpoWebGLRenderingContext,
  ) {
    this.renderer = new THREE.WebGLRenderer({ context: gl });
    this.renderer.setSize(
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight,
    );
    this.renderer.setClearColor(0x101020);
  }

  get() {
    return this.renderer;
  }

  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.renderer.render(scene, camera);
  }
}
