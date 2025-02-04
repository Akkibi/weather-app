import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  DimensionValue,
  Animated,
} from "react-native";
import useMeteoStore from "@/stores/useMeteoStore";
import ButtonBackground from "@/components/ButtonBackground";
import { useScrambleText } from "@/hooks/useScrambleText";

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
  left,
}: Props) {
  const { selectedCategory, setCategory } = useMeteoStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isScrambling, setIsScrambling] = useState(false);

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
          top: `${top ?? 0}%`,
          left: `${left ?? 0}%`,
          opacity: fadeAnim,
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
