import React from "react";
import { Text, StyleSheet, Pressable, DimensionValue } from "react-native";
import useMeteoStore from "@/stores/useMeteoStore";
import ButtonBackground from "@/components/ButtonBackground";

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
  top?: number;
  left?: number;
};

export default function MeteoBtn({
  title,
  category,
  isVisible,
  top,
  left
}: Props) {
  const { selectedCategory, setCategory } = useMeteoStore();

  if (!isVisible) return null;

  const handlePress = () => {
    console.log("click");
    setCategory(category);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        { top: `${top ?? 0}%`, left: `${left ?? 0}%` },
        selectedCategory === category && styles.selected,
      ]}
    >
      <ButtonBackground />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: "absolute",
    width: 161,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    opacity: 0.8,
  },
  text: {
    color: "white",
    zIndex: 1,
  },
});
