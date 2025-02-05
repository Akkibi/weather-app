import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import usePlanetStore from "@/stores/usePlanetStore";
import useMeteoStore from "@/stores/useMeteoStore";
import { useScrambleText } from "@/hooks/useScrambleText";
import { Gyroscope } from 'expo-sensors';

interface NavBarProps {
  onPress: () => void;
}

export default function NavBar({onPress}: NavBarProps) {
  const { isFocus, planetFocused } = usePlanetStore();
  const { selectedCategory, setCategory } = useMeteoStore();

  const bottomAnimation = React.useRef(new Animated.Value(-70)).current;

  const [isScrambling, setIsScrambling] = useState(false);
  const [shouldScramble, setShouldScramble] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [lastTimestamp, setLastTimestamp] = useState(0);

  const planetName = planetFocused?.name ?? "TX 06";
  const scrambledName = useScrambleText(planetName, shouldScramble, {});

  const startGyroscope = async () => {
    try {
      await Gyroscope.requestPermissionsAsync();
      const gyroSubscription = Gyroscope.addListener((data) => {
        const currentTime = Date.now();

        if (currentTime - lastTimestamp > 500) {
          const movementThreshold = 1.5;
          if (data.y > movementThreshold) {
            handleBack();
            setLastTimestamp(currentTime);
          }
        }
      });

      await Gyroscope.setUpdateInterval(100);
      setSubscription(gyroSubscription);
    } catch (error) {
      console.error('Failed to start gyroscope:', error);
    }
  };

  const stopGyroscope = () => {
    subscription?.remove();
    setSubscription(null);
  };

  useEffect(() => {
    startGyroscope();
    return () => stopGyroscope();
  }, [isFocus, selectedCategory]);

  useEffect(() => {
    setIsScrambling(false);
    setShouldScramble(false);

    Animated.timing(bottomAnimation, {
      toValue: isFocus ? 30 : -75,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [isFocus]);

  useEffect(() => {
    const listener = bottomAnimation.addListener(({ value }) => {
      if (value >= -42 && !isScrambling) {
        setIsScrambling(true);

        setTimeout(() => {
          setShouldScramble(true);
        }, 120);
      }

      if (value <= -60) {
        setIsScrambling(false);
        setShouldScramble(false);
      }
    });

    return () => {
      bottomAnimation.removeListener(listener);
    };
  }, [isScrambling]);

  useEffect(() => {
    if (shouldScramble) {
      const timer = setTimeout(() => {
        setShouldScramble(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [shouldScramble]);

  const handleBack = () => {
    if (isFocus) {
      if (selectedCategory === null) {
        onPress();
      } else {
        setCategory(null);
      }
    }
  }

  return (
    <Animated.View style={[
      styles.container,
      {
        bottom: bottomAnimation
      }
    ]}>
      <View style={styles.content}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 298 50"
          style={styles.svgBackground}
        >
          <Path
            d="M1 41V1H297V41L282.5 49H15L1 41Z"
            fill="#000"
            stroke="#fff"
            strokeWidth="1"
          />
          <Rect width={4} height={4} fill={'#ffffff'} x={0} y={-6} rx={1} />
          <Rect width={4} height={4} fill={'#ffffff'} x={6} y={-6} rx={1} />
        </Svg>
        <View style={styles.textContainer}>
          <View style={styles.left}>
            <View style={styles.backButton}>
              <Pressable onPress={handleBack} style={styles.pressable}>
                <Svg
                  width="13"
                  height="21"
                  viewBox="0 0 13 21"
                  fill="none"
                >
                  <Path
                    d="M9.73229 1H11.4349C12.0242 1 12.5 1.47735 12.5 2.0651V3.76771C12.5 4.35702 12.0242 4.83282 11.4349 4.83282H9.73229C9.14454 4.83282 8.66719 5.31017 8.66719 5.89792V7.60053C8.66719 8.18983 8.18983 8.66719 7.60208 8.66719H5.89947C5.31017 8.66719 4.83437 9.14298 4.83437 9.73229V11.4349C4.83437 12.0226 5.31017 12.5 5.89947 12.5H7.60208C8.18983 12.5 8.66719 12.9774 8.66719 13.5651V15.2677C8.66719 15.857 9.14454 16.3328 9.73229 16.3328H11.4349C12.0242 16.3328 12.5 16.8102 12.5 17.3979V19.1005C12.5 19.6898 12.0242 20.1672 11.4349 20.1672H9.73229C9.14454 20.1672 8.66719 19.6898 8.66719 19.1005V17.3979C8.66719 16.8102 8.18983 16.3328 7.60208 16.3328H5.89947C5.31017 16.3328 4.83437 15.857 4.83437 15.2677V13.5651C4.83437 12.9774 4.35702 12.5 3.76927 12.5H2.0651C1.47735 12.5 1 12.0226 1 11.4349V9.73229C1 9.14298 1.47735 8.66719 2.0651 8.66719H3.76927C4.35702 8.66719 4.83437 8.18983 4.83437 7.60053V5.89792C4.83437 5.31017 5.31017 4.83282 5.89947 4.83282H7.60208C8.18983 4.83282 8.66719 4.35702 8.66719 3.76771V2.0651C8.66719 1.47735 9.14454 1 9.73229 1Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="0.621622"
                    strokeMiterlimit="10"
                  />
                </Svg>
              </Pressable>
            </View>
          </View>

          <View style={styles.separator}>
            <Svg width="100%" height="100%" viewBox="0 0 32 43" fill="none">
              <Path
                d="M30.873 1L1.00015 20.8333V43"
                stroke="#ffffff"
                strokeWidth="1"
              />
            </Svg>
          </View>

          <View style={styles.center}>
            <Text style={styles.text}>{scrambledName}</Text>
          </View>

          <View style={styles.right}>
            <View></View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    width: '100%',
    justifyContent: 'flex-end',
  },
  separator: {
    position: 'absolute',
    top: -0.5,
    left: '20%',
    height: '100%',
    width: '12.25%',
    justifyContent: 'center',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    height: 80,
    marginHorizontal: 20,
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  left: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'NeoPixel',
    textTransform: 'uppercase'
  },
  backButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    padding: 10,
  },
});
