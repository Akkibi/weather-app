import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import * as THREE from "three";

function toScreenPosition(
  obj,
  camera: THREE.Camera,
  width: number,
  height: number,
) {
  const vector = new THREE.Vector3();

  // Get the object's position in world space
  obj.updateMatrixWorld();
  vector.setFromMatrixPosition(obj.matrixWorld);

  // Project the position into normalized device coordinates (NDC)
  vector.project(camera);

  // Convert NDC to screen space
  const x = (vector.x * 0.5 + 0.5) * width;
  const y = (-vector.y * 0.5 + 0.5) * height;

  return { x, y };
}

export default function FloatingElements({ sizes, scene, camera }) {
  const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    const object3D = scene.getObjectByName("targetObject");

    const updatePosition = () => {
      if (!object3D) return;

      const { x, y } = toScreenPosition(
        object3D,
        camera,
        sizes.width,
        sizes.height,
      );

      Animated.timing(animatedPosition, {
        toValue: { x, y },
        duration: 16,
        useNativeDriver: false,
      }).start();
    };

    const animationLoop = () => {
      updatePosition();
      requestAnimationFrame(animationLoop);
    };

    animationLoop();

    return () => cancelAnimationFrame(animationLoop);
  }, [glView, scene, camera]);

  return (
    <Animated.View
      style={[
        styles.floatingElement,
        {
          transform: [
            { translateX: animatedPosition.x },
            { translateY: animatedPosition.y },
          ],
        },
      ]}
    >
      <View style={styles.innerElement} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  floatingElement: {
    position: "absolute",
  },
  innerElement: {
    width: 50,
    height: 50,
    backgroundColor: "red",
  },
});
