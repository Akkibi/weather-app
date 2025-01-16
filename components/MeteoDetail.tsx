import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import usePlanetStore from "@/stores/usePlanetStore";
import Planet from "./Experience/World/Planet";

let ScreenHeight = Dimensions.get("window").height;

interface MeteoDetailProps {
  category: string;
  planetData?: Planet
}

export default function MeteoSection({ category, planetData }: MeteoDetailProps) {
  const { isFocus } = usePlanetStore();

  if (!isFocus || !planetData) return null;

  return (
    <View style={styles.detail}>
      <Text style={styles.categoryText}>{category}</Text>
      {category === "temperature" && (
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>
            Min Temperature: {planetData.minTemperature}°C
          </Text>
          <Text style={styles.temperatureText}>
            Max Temperature: {planetData.maxTemperature}°C
          </Text>
        </View>
      )}
      {category === "humidity" && (
        <Text style={styles.categoryText}>humidity data unavailable.</Text>
      )}
      {category === "wind" && (
        <Text style={styles.categoryText}>wind data unavailable.</Text>
      )}
      {category === "clouds" && (
        <Text style={styles.categoryText}>clouds data unavailable.</Text>
      )}
      {category === "pressure" && (
        <Text style={styles.categoryText}>Pressure data unavailable.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 50,
    position: "absolute",
    left: 0,
    right: 0,
    height: ScreenHeight,
  },
  detail: {
    display: "flex",
    justifyContent: "center",
    minHeight: ScreenHeight,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  categoryText: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  temperatureContainer: {
    marginTop: 10,
  },
  temperatureText: {
    color: "white",
    fontSize: 16,
  },
});
