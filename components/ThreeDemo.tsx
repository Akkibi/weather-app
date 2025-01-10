import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { TextureLoader, THREE } from "expo-three";
import { useEffect } from "react";
import { BoxGeometry, Mesh, MeshNormalMaterial, SphereGeometry } from "three";
import Renderer from "./Experience/Renderer";
import Scene from "./Experience/Scene";
import Camera from "./Experience/Camera";
import CameraGroup from "./Experience/CameraGroup";
import { EventEmitter } from "expo";
import { planetsArray } from "./Experience/data";
import Planet from "./Experience/Planet";

export default function ThreeDemo() {
  let timeout: ReturnType<typeof requestAnimationFrame>;

  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const camera = new Camera(new THREE.Vector3(5, 5, 10));
    const cameraGroup = new CameraGroup(camera);
    const scene = new Scene();
    scene.add(cameraGroup.instance);
    const renderer = new Renderer(gl);
    renderer.render(scene.instance, camera.instance);

    // Create Sun
    const geometry = new SphereGeometry(1, 32, 32);
    const material = new MeshNormalMaterial();
    const sun = new Mesh(geometry, material);
    sun.scale.set(2, 2, 2);
    sun.position.set(0, 0, 0);
    scene.add(sun);

    // Create Planets
    const spheres: Planet[] = planetsArray.map((data) => {
      const sphere = new Planet(data);
      scene.add(sphere.instance);
      return sphere;
    });
    console.log(planetsArray);

    function update(time: number) {
      spheres.forEach((sphere) => sphere.update(time / 75 + 1000)); // Normalize time to seconds
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
