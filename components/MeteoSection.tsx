import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Pressable,
  ListRenderItem,
} from "react-native";
import usePlanetStore from "@/stores/usePlanetStore";
import useMeteoStore from "@/stores/useMeteoStore";
import MeteoBtn from "@/components/MeteoBtn";
import MeteoDetail from "@/components/MeteoDetail";
import { planetsArray, pointsArray } from "@/components/Experience/Utils/data";
import { EventEmitter } from "./Experience/Utils/EventEmitter";

let ScreenHeight = Dimensions.get("window").height;

interface MeteoSectionProps {
  eventEmitter: EventEmitter;
}

interface Category {
  id: string;
  label: string;
}

export default function MeteoSection({ eventEmitter }: MeteoSectionProps) {
  const { isFocus, planetFocused, reset } = usePlanetStore();
  const { selectedCategory, setCategory } = useMeteoStore();

  if (!isFocus) return null;

  const categories: Category[] = [
    {
      id: "characteristics",
      label: "Caractéristiques",
    },
    {
      id: "atmosphericConditions",
      label: "Cycle planétaire",
    },
    {
      id: "meteorological",
      label: "Météorologique",
    },
    {
      id: "context",
      label: "Actualités",
    },
    {
      id: "military",
      label: "Militaires",
    },
  ];

  const otherCategories = categories.filter(
    (cat) => cat.id !== selectedCategory
  );

  eventEmitter.on("back", () => {
    reset();
  });

  const currentPlanet = planetFocused;

  const renderMeteoDetail: ListRenderItem<Category> = ({ item }) => (
    <MeteoDetail
      category={item.id}
      planetData={currentPlanet ?? undefined}
    />
  );

  return (
    <>
      {selectedCategory && (
        <View style={styles.container}>
          <FlatList<Category>
            data={[
              { id: selectedCategory, label: categories.find(cat => cat.id === selectedCategory)?.label || "" },
              ...otherCategories
            ]}
            renderItem={renderMeteoDetail}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {!selectedCategory &&
        categories.map((cat, index) => (
          <MeteoBtn
            key={cat.id}
            title={cat.label}
            category={cat.id}
            isVisible={true}
            top={pointsArray[index].top}
            left={pointsArray[index].left}
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
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
    minHeight: ScreenHeight,
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
    top: ScreenHeight - 60,
    left: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "white",
  },
  otherCategories: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
