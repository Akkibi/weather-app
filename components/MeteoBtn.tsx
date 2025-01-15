import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import useMeteoStore from '@/stores/useMeteoStore';

type Props = {
  title: string,
  category: string,
  isVisible: boolean,
  // pos: {x: number, y: number}
};

export default function MeteoBtn({ title, category, isVisible }: Props) {
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
        styles.button,
        selectedCategory === category && styles.selected
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    zIndex: 1000,
    position: 'absolute',
    top: '40%',
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  text: {
    color: 'white',
  }
});
