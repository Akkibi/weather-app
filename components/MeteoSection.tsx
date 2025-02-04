import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
} from "react-native";
import { Gyroscope } from "expo-sensors";
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

interface GyroscopeData {
  x: number;
  y: number;
  z: number;
}

export default function MeteoSection({ eventEmitter }: MeteoSectionProps) {
  const { isFocus, planetFocused, reset } = usePlanetStore();
  const { selectedCategory, setCategory } = useMeteoStore();
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [isMilitaryVisible, setIsMilitaryVisible] = useState(false);
  const [gyroscopeData, setGyroscopeData] = useState<GyroscopeData>({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    let gyroSubscription: any;

    const startGyroscope = async () => {
      try {
        await Gyroscope.requestPermissionsAsync();
        gyroSubscription = Gyroscope.addListener((data) => {
          setGyroscopeData(data);

          const rotationThreshold = 2.5;
          if (Math.abs(data.x) > rotationThreshold) {
            setIsMilitaryVisible(true);
          }
        });

        await Gyroscope.setUpdateInterval(100);
        setSubscription(gyroSubscription);
      } catch (error) {
        console.error("Failed to start gyroscope:", error);
      }
    };

    if (isFocus) {
      startGyroscope();
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isFocus]);

  useEffect(() => {
    if (!isMilitaryVisible && selectedCategory === "military") {
      setCategory(null);
    }
  }, [isMilitaryVisible, selectedCategory]);

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setVisibleItems(viewableItems.map((item) => (item.item as Category).id));
    },
    []
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 10,
  };

  if (!isFocus) return null;

  const categories: Category[] = [
    {
      id: "characteristics",
      label: "Caractéristiques",
    },
    {
      id: "atmosphericConditions",
      label: "Cycle Planétaire",
    },
    {
      id: "meteorological",
      label: "Météorologique",
    },
    {
      id: "context",
      label: "Les Actualités",
    },
    {
      id: "military",
      label: "Info. Militaires",
    },
  ];

  const otherCategories = categories.filter(
    (cat) =>
      cat.id !== selectedCategory &&
      (cat.id !== "military" || isMilitaryVisible)
  );

  eventEmitter.on("back", () => {
    reset();
    setIsMilitaryVisible(false);
  });

  const currentPlanet = planetFocused;

  const renderMeteoDetail = ({ item }: { item: Category }) => {
    if (item.id === "military" && !isMilitaryVisible) {
      return null;
    }

    return (
      <MeteoDetail
        category={item.id}
        planetData={currentPlanet ?? undefined}
        isVisible={visibleItems.includes(item.id)}
      />
    );
  };

  return (
    <>
      {selectedCategory && (
        <View style={styles.container}>
          <FlatList<Category>
            data={[
              ...(selectedCategory === "military" && !isMilitaryVisible
                ? []
                : [
                    {
                      id: selectedCategory,
                      label:
                        categories.find((cat) => cat.id === selectedCategory)
                          ?.label || "",
                    },
                  ]),
              ...otherCategories,
            ]}
            renderItem={renderMeteoDetail}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
        </View>
      )}
      {!selectedCategory &&
        categories.map((cat, index) => (
          <MeteoBtn
            key={cat.id}
            title={cat.label}
            category={cat.id}
            isVisible={cat.id === "military" ? isMilitaryVisible : true}
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
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
    minHeight: ScreenHeight,
  },
});
