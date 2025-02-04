import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer, TextureLoader } from "expo-three";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import {
  Gesture,
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";
import {
  AmbientLight,
  BoxGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshNormalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
} from "three";
import MeteoSection from "./MeteoSection";

export default function ThreeDemo() {
  let timeout: ReturnType<typeof requestAnimationFrame>;
  // const singleTap = Gesture.Tap();

  const handleBackPressRef = useRef(() =>
    console.error("handleBackRef not loaded")
  );
  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x6ad6f0;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(2, 5, 5);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshNormalMaterial();
    const cube = new Mesh(geometry, material);

    scene.add(cube);

    camera.lookAt(cube.position);

    function update() {
      cube.rotation.y += 0.05;
      cube.rotation.x += 0.025;
    }

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  const singleTap = Gesture.Tap().runOnJS(true);
  const dragGesture = Gesture.Pan().runOnJS(true);

  const taps = Gesture.Race(singleTap, dragGesture);

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      {/* <View style={styles.container}>
        <InfoButton eventEmitter={eventEmitter}>Hello there</InfoButton>
        <InfoButton eventEmitter={eventEmitter}>Hello there</InfoButton>
      </View> */}
      <View style={styles.container}>
        <GestureDetector gesture={taps}>
          <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
        </GestureDetector>
        <MeteoSection eventEmitter={eventEmitter} />
        <NavBar
          onPress={() => {
            handleBackPressRef.current();
          }}
        />
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
    position: "absolute",
    height: "100%",
    width: "100%",
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
