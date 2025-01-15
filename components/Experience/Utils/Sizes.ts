import { ExpoWebGLRenderingContext } from "expo-gl";

export default class Sizes {
  width: number;
  height: number;
  // pixelRatio: number;
  constructor(gl: ExpoWebGLRenderingContext) {
    // Setup
    this.width = gl.drawingBufferWidth;
    this.height = gl.drawingBufferHeight;
    // this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }
}
