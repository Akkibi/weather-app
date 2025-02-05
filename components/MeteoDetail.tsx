import React, { useRef, useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Animated, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import usePlanetStore from "@/stores/usePlanetStore";
import Planet from "./Experience/World/Planet";
import { useScrambleText } from "@/hooks/useScrambleText";

let ScreenHeight = Dimensions.get("window").height;

interface MeteoDetailProps {
  category: string;
  planetData?: Planet;
  isVisible?: boolean;
}

export default function MeteoDetail({ category, planetData, isVisible = false }: MeteoDetailProps) {
  const { isFocus } = usePlanetStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

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
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && !hasUserScrolled) {
      scrollTimeout.current = setTimeout(() => {
        Animated.sequence([
          Animated.timing(scrollAnim, {
            toValue: -50,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scrollAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          })
        ]).start();
      }, 5000);
    }

    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isVisible, hasUserScrolled]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y > 0 && !hasUserScrolled) {
      setHasUserScrolled(true);
    }
  };

  if (!isFocus || !planetData) return null;

  const categoryTitles: { [key: string]: string } = {
    characteristics: planetData.characteristics?.title ?? 'Characteristics',
    atmosphericConditions: planetData.atmosphericConditions?.title ?? 'Atmospheric Conditions',
    meteorological: planetData.meteorological?.title ?? 'Meteorological',
    context: planetData.context?.title ?? 'Context',
    military: planetData.military?.title ?? 'Military',
  };

  const extractSubcategories = (data: any, parentKey?: string): { label: string; value: string }[] => {
    const result: { label: string; value: string }[] = [];

    const processItem = (item: any, key: string) => {
      if (typeof item !== 'object' || item === null) return;

      if (item.title && item.value) {
        result.push({
          label: item.title,
          value: item.value.toString()
        });
      }

      Object.keys(item).forEach(subKey => {
        if (typeof item[subKey] === 'object' && item[subKey] !== null) {
          processItem(item[subKey], subKey);
        }
      });
    };

    processItem(data, parentKey ?? '');

    return result;
  };

  const subcategories = categoryTitles[category]
    ? extractSubcategories((planetData as any)[category])
    : [];

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      style={[styles.container, { transform: [{ translateY: scrollAnim }] }]}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={styles.content}>
        {subcategories.map((subcategory, index) => (
          <Animated.View
            key={index}
            style={[styles.detail, { opacity: fadeAnim }]}
          >
            <Text style={styles.dataLabel}>
              {useScrambleText(subcategory.label, isScrambling, {})}
            </Text>
            <Text style={styles.dataValue}>
              {useScrambleText(subcategory.value, isScrambling, {})}
            </Text>
          </Animated.View>
        ))}
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: "100%",
    paddingVertical: 64,
  },
  content: {
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  categoryHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    marginBottom: 32,
    alignItems: 'center',
  },
  categoryTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "400",
    letterSpacing: 5,
    fontFamily: 'ClashDisplayBold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    minHeight: (ScreenHeight - 128),
    gap: 8,
  },
  dataLabel: {
    color: "white",
    fontSize: 20,
    letterSpacing: 10,
    lineHeight: 29,
    fontFamily: 'ClashDisplay',
    textTransform: 'uppercase',
  },
  dataValue: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
    fontFamily: 'ClashDisplayMedium',
  },
});
