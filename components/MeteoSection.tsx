import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import usePlanetStore from "@/stores/usePlanetStore";
import useMeteoStore from "@/stores/useMeteoStore";
import MeteoBtn from "@/components/MeteoBtn";
import MeteoDetail from "@/components/MeteoDetail";
import { planetsArray, pointsArray } from "@/components/Experience/Utils/data";

let ScreenHeight = Dimensions.get("window").height;

export default function MeteoSection() {
  const { isFocus, planetFocused } = usePlanetStore();
  const { selectedCategory, setCategory } = useMeteoStore();

  if (!isFocus) return null;

  const categories = [
    {
      id: "characteristics",
      label : "Caractéristiques",
    },
    {
      id: "atmosphericConditions",
      label : "Cycle planétaire",
    },
    {
      id: "meteorological",
      label : "Météorologique",
    },
    {
      id: "context",
      label : "Actualités",
    },
    {
      id: "military",
      label : "Militaires",
    },
  ]

  const otherCategories = categories.filter(
    (cat) => cat.id !== selectedCategory,
  );

  const currentPlanet = planetFocused;

  return (
    <>
      {selectedCategory && (
        <View style={styles.container}>
          <ScrollView style={styles.scrollContent}>
            <>
              <MeteoDetail
                category={selectedCategory}
                planetData={currentPlanet ?? undefined}
              />

              {otherCategories.map((cat) => (
                <MeteoDetail
                  category={cat.id}
                  planetData={currentPlanet ?? undefined}
                />
              ))}
            </>
          </ScrollView>
        </View>
      )}
      {!selectedCategory &&
        categories.map((cat) => (
          <MeteoBtn
            key={cat.id}
            title={cat.label}
            category={cat.id}
            isVisible={true}
          />
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    height: ScreenHeight,
    backgroundColor: "red"
  },
  scrollContent: {
    flex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: ScreenHeight,
  },
  text: {
    color: "red",
  },
  button: {
    position: "absolute",
  },
  backButton: {
    zIndex: 100,
    position: "fixed",
    top: (ScreenHeight - 60),
    left: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "white"
  },
  otherCategories: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
