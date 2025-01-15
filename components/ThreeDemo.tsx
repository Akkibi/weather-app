import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { TextureLoader, THREE } from "expo-three";
import { TouchEvent, useEffect, useRef, useState } from "react";
import { BoxGeometry, Mesh, MeshNormalMaterial, SphereGeometry } from "three";
import Renderer from "./Experience/Renderer";
import Scene from "./Experience/Scene";
import Camera from "./Experience/Camera";
import CameraGroup from "./Experience/CameraGroup";
import { EventEmitter } from "./Experience/EventEmitter";
import Raycaster from "./Experience/Utils/Raycaster";
import Sizes from "./Experience/Utils/Sizes";
import CameraOrigin from "./Experience/CameraOrigin";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function ThreeDemo() {
  let timeout: ReturnType<typeof requestAnimationFrame>;

  // const singleTap = Gesture.Tap();

  const handleBackPressRef = useRef(() =>
    console.error("handleBackRef not loaded"),
  );
  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const eventEmitter = new EventEmitter();
    const scene = new Scene();
    const camera = new Camera(eventEmitter);
    const cameraGroup = new CameraGroup(eventEmitter, camera);
    const cameraOrigin = new CameraOrigin(eventEmitter, cameraGroup);
    scene.add(cameraOrigin.instance);
    const renderer = new Renderer(eventEmitter, gl);
    const sizes = new Sizes();
    const raycaster = new Raycaster(
      eventEmitter,
      sizes,
      camera,
      scene,
      cameraOrigin,
      scene.planets,
    );
    console.log(raycaster);

    function update(time: number) {
      scene.planets.forEach((sphere) => {
        sphere.update(time / 75 + 1000);
        // Normalize time to seconds
      });
      eventEmitter.trigger("animate");
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

    // Update the handleBackPressRef to trigger the eventEmitter
    handleBackPressRef.current = () => {
      eventEmitter.trigger("back");
    };

    // define touchevent triggers
    dragGesture
      .runOnJS(true)
      .onStart((_e) => {
        console.log("onDragStart", _e);
        eventEmitter.trigger("touchStart", [_e]);
      })
      .onUpdate((_e) => {
        console.log("onDragMove", _e);
        eventEmitter.trigger("touchMove", [_e]);
      })
      .onEnd((_e) => {
        console.log("onDragEnd", _e);
        eventEmitter.trigger("touchEnd", [_e]);
      });

    singleTap.runOnJS(true).onEnd((_event, success) => {
      if (success) {
        eventEmitter.trigger("click", [_event]);
      }
    });
  };

  const singleTap = Gesture.Tap().runOnJS(true);
  const dragGesture = Gesture.Pan().runOnJS(true);

  const taps = Gesture.Race(dragGesture, singleTap);

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <View style={styles.container}>
        <GestureDetector gesture={taps}>
          <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
        </GestureDetector>
        <TouchableOpacity
          onPress={() => handleBackPressRef.current()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  header: {
    height: 50,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    marginVertical: 40,
    marginHorizontal: 20,
    borderColor: "#00aa55",
    borderWidth: 2,
    height: "5%",
    width: "20%",
    bottom: 0,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    margin: "auto",
    width: "100%",
    textAlign: "center",
  },
  glView: {
    flex: 1,
  },
});
