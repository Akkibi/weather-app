import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { TextureLoader, THREE } from "expo-three";
import { useEffect } from "react";
import { BoxGeometry, Mesh, MeshNormalMaterial, SphereGeometry } from "three";
import Renderer from "./Experience/Renderer";
import Scene from "./Experience/Scene";
import Camera from "./Experience/Camera";
import CameraGroup from "./Experience/CameraGroup";
import { EventEmitter } from "expo";
import Raycaster from "./Experience/Utils/Raycaster";
import Sizes from "./Experience/Utils/Sizes";
import CameraOrigin from "./Experience/CameraOrigin";

export default function ThreeDemo() {
  let timeout: ReturnType<typeof requestAnimationFrame>;

  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const eventBus = new EventEmitter();
    const camera = new Camera(new THREE.Vector3(5, 5, 10));
    const cameraGroup = new CameraGroup(camera);
    const cameraOrigin = new CameraOrigin(cameraGroup)
    const scene = new Scene();
    scene.add(cameraOrigin.instance);
    const renderer = new Renderer(gl);
    renderer.render(scene.instance, camera.instance);
    const sizes = new Sizes()
    const raycaster = new Raycaster(sizes, camera, scene, cameraOrigin)

    function update(time: number) {
      scene.spheres.forEach((sphere) => sphere.update(time / 75 + 1000)); // Normalize time to seconds
    }

    var clock = new THREE.Clock(true);

    // Setup an animation loop
    const render = () => {
      clock.getDelta();
      timeout = requestAnimationFrame(render);
      update(clock.elapsedTime);
      renderer.render(scene.instance, camera.instance);
      gl.endFrameEXP();
    };
    render();
  };

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
}
