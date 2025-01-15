import React from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, Pressable } from "react-native";
import usePlanetStore from '@/stores/usePlanetStore'

let ScreenHeight = Dimensions.get("window").height;

interface MeteoDetailProps {
  category: string;
  planetData?: {
    name: string;
    size: number;
    speed: number;
    distance: number;
    minTemperature: number;
    maxTemperature: number;
    color: string;
  };
}

export default function MeteoSection({ category }: MeteoDetailProps) {
    const { isFocus, planetFocused } = usePlanetStore();

    if (!isFocus) return null;

    return (
      <View style={styles.detail}>
        <Text style={styles.categoryText}>
          Selected category: {category}
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 50,
    position: 'absolute',
    left: 0,
    right: 0,
    height: ScreenHeight,
  },
  scrollContent: {
    flexGrow: 1,
  },
  detail: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: ScreenHeight,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  categoryText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }
});
