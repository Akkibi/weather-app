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

  const categories = pointsArray.map((point) => ({
    category: point.name,
  }));

  const otherCategories = categories.filter(
    (cat) => cat.category !== selectedCategory,
  );

  const currentPlanet = planetsArray.find(
    (planet) => planet.name === planetFocused,
  );

  const handleReturn = () => {
    setCategory(null);
  };

  return (
    <>
      {selectedCategory && (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <>
              <Pressable onPress={handleReturn} style={[styles.backButton]}>
                <Text style={styles.text}>Back</Text>
              </Pressable>

              <MeteoDetail
                category={selectedCategory}
                planetData={currentPlanet}
              />

              {otherCategories.map((cat) => (
                <MeteoDetail
                  category={cat.category}
                  planetData={currentPlanet}
                />
              ))}
            </>
          </ScrollView>
        </View>
      )}
      {!selectedCategory &&
        categories.map((cat) => (
          <MeteoBtn
            key={cat.category}
            title={cat.category}
            category={cat.category}
            isVisible={true}
          />
        ))}
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    height: ScreenHeight,
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
    top: 60,
    left: 30,
  },
  otherCategories: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
