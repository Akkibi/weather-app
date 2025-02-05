import React, { useRef, useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import usePlanetStore from "@/stores/usePlanetStore";
import useMeteoStore from "@/stores/useMeteoStore";
import { useScrambleText } from "@/hooks/useScrambleText";

export default function Distance() {
  const { isFocus } = usePlanetStore();
  const { selectedCategory } = useMeteoStore();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const contentFadeAnim = useRef(new Animated.Value(1)).current;
  const [currentTime, setCurrentTime] = useState("");
  const [distanceTime, setDistanceTime] = useState("");
  const [dangerLevel, setDangerLevel] = useState(4);
  const [isTimeScrambling, setIsTimeScrambling] = useState(false);
  const [isDangerScrambling, setIsDangerScrambling] = useState(false);

  const scrambledTimeText = useScrambleText(`${currentTime}`, isTimeScrambling, {});
  const scrambledDangerText = useScrambleText(`Niveau de risque - ${dangerLevel}/10`, isDangerScrambling, {});
  const scrambledHomeTimeText = useScrambleText(`${currentTime}`, isTimeScrambling, {});
  const scrambledHomeDangerText = useScrambleText(`Niveau de risque - ${dangerLevel}/10`, isDangerScrambling, {});
  const scrambledHomeTitle = useScrambleText('Position actuelle', isDangerScrambling, {});
  const scrambledTitle = useScrambleText("À propos de cette planète", isDangerScrambling, {});

  const updateTime = useCallback(() => {
    const now = new Date();
    const distance = new Date();
    distance.setHours(now.getHours() + 7);
    distance.setMinutes(now.getMinutes() + 45);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const distanceHours = distance.getHours().toString().padStart(2, '0');
    const distanceMinutes = distance.getMinutes().toString().padStart(2, '0');
    setDistanceTime(`${distanceHours}:${minutes}`);
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval);
  }, [updateTime]);

  const scrambleValues = useCallback(() => {
    const random = Math.random();
    if (random < 0.5) {
      setIsTimeScrambling(true);
      setTimeout(() => setIsTimeScrambling(false), 1000);
    } else if (random < 0.5) {
      setIsDangerScrambling(true);
      setDangerLevel(Math.floor(Math.random() * 10) + 1);
      setTimeout(() => setIsDangerScrambling(false), 1000);
    }
  }, [contentFadeAnim]);

  useEffect(() => {
    const scrambleInterval = setInterval(scrambleValues, 5000);
    return () => clearInterval(scrambleInterval);
  }, [scrambleValues]);

  useEffect(() => {
    const targetOpacity = selectedCategory === null ? 1 : 0;
    Animated.timing(fadeAnim, {
      toValue: targetOpacity,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [selectedCategory, fadeAnim]);

  const renderContent = () => {
    if (isFocus) {
      return (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>{scrambledTitle}</Text>
          <Text style={styles.label}>{scrambledDangerText}</Text>
          <Text style={styles.label}>Arrivée - {scrambledTimeText}</Text>
        </View>
      );
    }
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{scrambledHomeTitle}</Text>
        <Text style={styles.label}>{scrambledHomeDangerText}</Text>
        <Text style={styles.label}>Heure locale - {scrambledHomeTimeText}</Text>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View style={{ opacity: contentFadeAnim }}>
        {renderContent()}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 64,
    left: 24,
  },
  infoContainer: {
    gap: 8,
    padding: 0,
  },
  label: {
    color: "#34C759",
    fontSize: 12,
    letterSpacing: 2,
    fontFamily: 'ClashDisplay',
    opacity: 0.9,
  },
  value: {
    color: "#34C759",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: 'ClashDisplayMedium',
  },
});
