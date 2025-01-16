import React from "react";
import { Text, StyleSheet, Pressable, DimensionValue } from "react-native";
import useMeteoStore from "@/stores/useMeteoStore";
import { THREE } from "expo-three";

type Position = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

type Props = {
  title: string;
  category: string;
  isVisible: boolean;
  position?: THREE.Vector3;
};

export default function MeteoBtn({
  title,
  category,
  isVisible,
  position,
}: Props) {
  const { selectedCategory, setCategory } = useMeteoStore();

  if (!isVisible) return null;

  const handlePress = () => {
    console.log("click");
    setCategory(category);
  };

  const style = position
    ? {
        position: "absolute" as const,
        left: `${(position.x + 1) * 50}%` as DimensionValue,
        top: `${(-position.y + 1) * 50}%` as DimensionValue,
      }
    : {};

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.button,
        style,
        selectedCategory === category && styles.selected,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    zIndex: 1000,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: "50%"
  },
  selected: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  text: {
    color: "white",
  },
});
