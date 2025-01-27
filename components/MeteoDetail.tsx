import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Animated } from "react-native";
import usePlanetStore from "@/stores/usePlanetStore";
import Planet from "./Experience/World/Planet";

let ScreenHeight = Dimensions.get("window").height;

interface MeteoDetailProps {
  category: string;
  planetData?: Planet;
  isVisible?: boolean;
}

interface MeteoData {
  id: string;
  label: string;
  value: string | number | null;
  unit?: string;
}

export default function MeteoDetail({ category, planetData, isVisible = false }: MeteoDetailProps) {
  const { isFocus } = usePlanetStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300, // Slightly faster fade out
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  if (!isFocus || !planetData) return null;

  const categoryData = [
    {
      id: "characteristics",
      label: "Surface Area",
      value: planetData.characteristics.surfaceArea,
    },
    {
      id: "atmosphericConditions",
      label: "Atmospheric Conditions",
      value: planetData.atmosphericConditions.averageMolarMass,
    },
    {
      id: "meteorological",
      label: "Meteorological",
      value: planetData.meteorological.temperatureRange
    },
    {
      id: "context",
      label: "Context",
      value: planetData.context.political
    },
    {
      id: "military",
      label: "Military",
      value: planetData.military.population
    },
  ];

  const renderItem = ({ item }: { item: MeteoData }) => {
    if (item.value === null) {
      return (
        <Animated.View key={item.id} style={[styles.detail, { opacity: fadeAnim }]}>
          <Text style={styles.dataLabel}>
            {item.label} data unavailable
          </Text>
          <Text style={styles.dataValue}>
            data unavailable
          </Text>
        </Animated.View>
      );
    }

    return (
      <Animated.View key={item.id} style={[styles.detail, { opacity: fadeAnim }]}>
        <Text style={styles.dataLabel}>
          {item.label}
        </Text>
        <Text style={styles.dataValue}>
          {item.value}
        </Text>
      </Animated.View>
    );
  };

  const selectedCategory = categoryData.find(item => item.id === category);

  return (
    <View>
      {selectedCategory && renderItem({ item: selectedCategory })}
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    minHeight: (ScreenHeight - 64),
    width: "100%",
    gap: 4,
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  dataLabel: {
    color: "white",
    fontSize: 20,
    letterSpacing: 10,
    lineHeight: 29,
    fontFamily: 'ClashDisplay',
  },
  dataValue: {
    color: "white",
    fontSize: 52,
    fontWeight: "600",
    fontFamily: 'ClashDisplayMedium',
  },
});
