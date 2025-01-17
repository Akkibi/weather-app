import React from "react";
import { Text, View, StyleSheet, Dimensions, FlatList, ScrollView } from "react-native";
import usePlanetStore from "@/stores/usePlanetStore";
import Planet from "./Experience/World/Planet";

let ScreenHeight = Dimensions.get("window").height;

interface MeteoDetailProps {
  category: string;
  planetData?: Planet;
}

interface MeteoData {
  id: string;
  label: string;
  value: string | number | null;
  unit?: string;
}

export default function MeteoSection({ category, planetData }: MeteoDetailProps) {
  const { isFocus } = usePlanetStore();

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
  ]

  const renderItem = ({ item }: { item: MeteoData }) => {
    if (item.value === null) {
      return (
        <View key={item.id} style={styles.detail}>
          <Text style={styles.categoryText}>
            {item.label} data unavailable
          </Text>
        </View>
      );
    }

    return (
      <View key={item.id} style={styles.detail}>
        <Text style={styles.dataText}>
          {item.label}: {item.value}{item.unit || ''}
        </Text>
      </View>
    );
  };

  const selectedCategory = categoryData.find(item => item.id === category);

  return (
    <View >
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
  },
  categoryText: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
    textTransform: "capitalize",
  },
  dataText: {
    color: "white",
    fontSize: 16,
  },
});
