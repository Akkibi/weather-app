import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Gyroscope } from 'expo-sensors';
import usePlanetStore from "@/stores/usePlanetStore";
import useMeteoStore from "@/stores/useMeteoStore";
import MeteoBtn from "@/components/MeteoBtn";
import MeteoDetail from "@/components/MeteoDetail";
import { planetsArray, pointsArray } from "@/components/Experience/Utils/data";
import { EventEmitter } from "./Experience/Utils/EventEmitter";
import { useScrambleText } from "@/hooks/useScrambleText";
import ModalInvade from "@/components/ModalInvade";

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
  const [gyroscopeData, setGyroscopeData] = useState<GyroscopeData>({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);
  const [currentVisibleCategory, setCurrentVisibleCategory] = useState<string | null>(null);
  const [isInvasionModalVisible, setIsInvasionModalVisible] = useState(false);

  const categories: Category[] = useMemo(() => [
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
  ], []);

  const scrambledCategoryLabel = useScrambleText(
    categories.find(cat => cat.id === currentVisibleCategory)?.label || "",
    !!currentVisibleCategory,
    {}
  );

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
          else if (Math.abs(data.z) > rotationThreshold) {
            setIsInvasionModalVisible(true);
          }
        });

        await Gyroscope.setUpdateInterval(100);
        setSubscription(gyroSubscription);
      } catch (error) {
        console.error('Failed to start gyroscope:', error);
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
    if (!isMilitaryVisible && selectedCategory === 'military') {
      setCategory(null);
    }
  }, [isMilitaryVisible, selectedCategory, setCategory]);

  const onViewableItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    setVisibleItems(viewableItems.map(item => (item.item as Category).id));

    if (viewableItems.length > 0) {
      const visibleCategory = (viewableItems[0].item as Category).id;
      setCurrentVisibleCategory(visibleCategory);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 10
  };

  if (!isFocus) return null;

  const otherCategories = categories.filter(
    (cat) => cat.id !== selectedCategory && (cat.id !== 'military' || isMilitaryVisible)
  );

  eventEmitter.on("back", () => {
    reset();
    setIsMilitaryVisible(false);
    setIsInvasionModalVisible(false);
  });

  const currentPlanet = planetFocused;

  const renderMeteoDetail = ({ item }: { item: Category }) => {
    if (item.id === 'military' && !isMilitaryVisible) {
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
      <ModalInvade isVisible={isInvasionModalVisible} setVisible={setIsInvasionModalVisible} type="invade" onPress={()=>{console.log('INVAAADE!!!')}} />
      {selectedCategory && (
        <View style={styles.container}>
          {currentVisibleCategory && (
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryHeaderText}>
                {scrambledCategoryLabel}
              </Text>
            </View>
          )}

          <FlatList<Category>
            data={[
              ...(selectedCategory === 'military' && !isMilitaryVisible
                ? []
                : [{ id: selectedCategory, label: categories.find(cat => cat.id === selectedCategory)?.label || "" }]),
              ...otherCategories
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
    backgroundColor: "rgba(0, 0, 0, 0.25)"
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
    minHeight: ScreenHeight,
  },
  categoryHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    paddingTop: 64,
    paddingBottom: 24,
    zIndex: 10,
    alignItems: 'center',
  },
  categoryHeaderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
    letterSpacing: 5,
    fontFamily: 'ClashDisplayBold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
