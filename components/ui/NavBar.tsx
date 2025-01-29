import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import usePlanetStore from "@/stores/usePlanetStore";
import useMeteoStore from "@/stores/useMeteoStore";
import { useScrambleText } from "@/hooks/useScrambleText";

interface NavBarProps {
  onPress: () => void;
}

export default function NavBar({onPress}: NavBarProps) {
  const { isFocus, planetFocused } = usePlanetStore();
  const { selectedCategory, setCategory } = useMeteoStore();
  const [isScrambling, setIsScrambling] = useState(false);

  const planetName = planetFocused?.name ?? "TX 06";
  const scrambledName = useScrambleText(planetName, isScrambling, {});

  useEffect(() => {
    // Trigger scramble effect when planetFocused changes
    setIsScrambling(true);
    // Reset scrambling after a short delay
    const timer = setTimeout(() => {
      setIsScrambling(false);
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [planetFocused]);

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
      <View style={styles.container}>
        <Svg
          viewBox="0 0 298 40"
          style={styles.svgBackground}
        >
          <Path
            d="M1 31V1H297V31L282.5 36H15L1 31Z"
            fill="transparent"
            stroke="#fff"
            strokeWidth="1"
          />
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
            <Svg height="100%" viewBox="0 0 32 48" fill="none">
              <Path
                d="M30.873 1L1.00015 20.8333V50"
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
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    width: '100%',
    justifyContent: 'flex-end',
  },
  separator: {
    position: 'absolute',
    top: 0,
    left: '20%',
    height: '100%',
    zIndex: 1,
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20
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
    paddingLeft: 20,
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
    paddingRight: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'NeoPixel'
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
