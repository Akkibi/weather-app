import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import usePlanetStore from "@/stores/usePlanetStore";
import useMeteoStore from "@/stores/useMeteoStore";
import { useScrambleText } from "@/hooks/useScrambleText";

export default function Distance() {
  const { isFocus } = usePlanetStore();
  const { selectedCategory } = useMeteoStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentTime, setCurrentTime] = useState("");
  const [dangerLevel, setDangerLevel] = useState(4);
  const [isTimeScrambling, setIsTimeScrambling] = useState(false);
  const [isDangerScrambling, setIsDangerScrambling] = useState(false);

  const scrambledTimeText = useScrambleText(`${currentTime}`, isTimeScrambling, {});
  const scrambledDangerText = useScrambleText(`${dangerLevel}/10`, isDangerScrambling, {});

  const updateTime = useCallback(() => {
    const now = new Date();
    now.setHours(now.getHours() + 7);
    now.setMinutes(now.getMinutes() + 45);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval);
  }, [updateTime]);

  const scrambleValues = useCallback(() => {
    const random = Math.random();
    if (random < 0.3) {
      setIsTimeScrambling(true);
      setTimeout(() => setIsTimeScrambling(false), 2000);
    } else if (random < 0.6) {
      setIsDangerScrambling(true);
      setDangerLevel(Math.floor(Math.random() * 10) + 1);
      setTimeout(() => setIsDangerScrambling(false), 2000);
    }
  }, []);

  useEffect(() => {
    const scrambleInterval = setInterval(scrambleValues, 5000);
    return () => clearInterval(scrambleInterval);
  }, [scrambleValues]);

  useEffect(() => {
    const targetOpacity = isFocus && selectedCategory === null ? 1 : 0;
    Animated.timing(fadeAnim, {
      toValue: targetOpacity,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isFocus, selectedCategory, fadeAnim]);

  if (!isFocus) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>À partir de votre {"\n"}position</Text>
        <Text style={styles.label}>Danger - {scrambledDangerText}</Text>
        <Text style={styles.label}>Arrivée - {scrambledTimeText}</Text>
      </View>
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
    gap: 0.5,
    padding: 0,
  },
  label: {
    color: "#34C759",
    fontSize: 12,
    letterSpacing: 2,
    fontFamily: 'ClashDisplay',
    opacity: 0.7,
  },
  value: {
    color: "#34C759",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: 'ClashDisplayMedium',
  },
});
