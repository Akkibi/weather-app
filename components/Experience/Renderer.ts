import * as THREE from "three";
import { ExpoWebGLRenderingContext } from "expo-gl";
import { EventEmitter } from "./EventEmitter";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default class Renderer extends EventEmitter {
  renderer: THREE.WebGLRenderer;
  constructor(
    private eventEmitter: EventEmitter,
    private gl: ExpoWebGLRenderingContext,
  ) {
    super();

    this.gl = gl;

    this.renderer = new THREE.WebGLRenderer({ context: gl });
    this.renderer.setSize(
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight,
    );
    this.renderer.setClearColor(0x101020);
    this.subscribeToResizeEvent();
  }

  get() {
    return this.renderer;
  }

  subscribeToResizeEvent() {
    // Use the EventEmitter to subscribe to the window resize event
    this.eventEmitter.on("windowResize", this.resize.bind(this));
  }

  resize() {
    // Update the renderer's aspect ratio and projection matrix
    this.renderer.setSize(
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight,
    );
  }

  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.renderer.render(scene, camera);
  }
}
