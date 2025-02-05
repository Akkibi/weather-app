import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Pressable, Text, Animated } from 'react-native';
import { Image } from 'expo-image';
import { planetsArray, pointsArray } from '@/components/Experience/Utils/data';
import MeteoBtn from '@/components/MeteoBtn';
import ButtonBackground from '@/components/ButtonBackground';
import { useScrambleText } from "@/hooks/useScrambleText";

const { width, height } = Dimensions.get('window');

interface RadarDashboardProps {
  imageSource: any;
  visible: boolean;
  onVisibilityChange: (visible: boolean) => void;
}

const RadarDashboard: React.FC<RadarDashboardProps> = ({ imageSource, visible, onVisibilityChange }) => {
  const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [isScrambling, setIsScrambling] = useState(false);
  const [isRendered, setIsRendered] = useState(visible);

  const scrambledTitle = useScrambleText("Info. Militaires", isScrambling, {});

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
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
      }).start(({ finished }) => {
        if (finished) {
          setIsRendered(false);
        }
      });
    }
  }, [visible]);

  const handlePress = () => {
    setIsScrambling(true);
    onVisibilityChange(false);
  };

  const planet = planetsArray.find(planet => planet.id === 2);

  if (!planet || !isRendered) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{
            scale: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1]
            })
          }]
        }
      ]}
    >
      <Image
        source={imageSource}
        style={styles.backgroundImage}
        contentFit="cover"
      />

      <View
        style={[
          styles.btnContainer,
          {
            top: '67%',
            left: '65%',
          },
        ]}
      >
        <Pressable
          onPress={handlePress}
          style={styles.pressable}
        >
          <ButtonBackground />
          <Text style={styles.text}>{scrambledTitle}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    zIndex: 1050,
    position: "absolute",
    width: "auto",
  },
  pressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default RadarDashboard;
