import React, { useRef, useEffect, useState } from "react";
import { Text, StyleSheet, Pressable, Animated, View } from "react-native";
import * as THREE from "three";
import useMeteoStore from "@/stores/useMeteoStore";
import ButtonBackground from "@/components/ButtonBackground";
import { useScrambleText } from "@/hooks/useScrambleText";
import { EventEmitter } from "./Experience/Utils/EventEmitter";

type Props = {
  title: string;
  category: string;
  isVisible: boolean;
  scene: THREE.Scene;
  camera: THREE.Camera;
  sizes: { width: number; height: number };
  eventEmitter: EventEmitter;
};

function toScreenPosition(
  obj: THREE.Object3D,
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

export default function MeteoBtn({
  title,
  category,
  isVisible,
  scene,
  camera,
  sizes,
  eventEmitter,
}: Props) {
  const { selectedCategory, setCategory } = useMeteoStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isScrambling, setIsScrambling] = useState(false);
  const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const scrambledTitle = useScrambleText(title, isScrambling, {});

  useEffect(() => {
    if (isVisible) {
      setIsScrambling(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      setIsScrambling(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  useEffect(() => {
    // get target object in store
    // const object3D = scene.getObjectByName("targetObject");

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

    eventEmitter.on("animate", () => updatePosition());
  }, [sizes, scene, camera, eventEmitter]);

  if (!isVisible) return null;

  const handlePress = () => {
    setIsScrambling(true);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCategory(category);
      setIsScrambling(false);
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { translateX: animatedPosition.x },
            { translateY: animatedPosition.y },
          ],
        },
        selectedCategory === category && styles.selected,
      ]}
    >
      <Pressable onPress={handlePress} style={styles.pressable}>
        <ButtonBackground />
        <Text style={styles.text}>{scrambledTitle}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: "absolute",
    width: "auto",
  },
  pressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    opacity: 0.8,
  },
  text: {
    color: "white",
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
