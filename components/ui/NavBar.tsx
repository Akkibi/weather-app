import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import usePlanetStore from "@/stores/usePlanetStore";
import useMeteoStore from "@/stores/useMeteoStore";

interface NavBarProps {
  onPress: () => void;
}

export default function NavBar({onPress}: NavBarProps) {

  const { isFocus, reset } = usePlanetStore();
  const { selectedCategory, setCategory } = useMeteoStore();

  const handleBack = () => {
    if (isFocus) {
      if (selectedCategory === null) {
        // reset();
        onPress();
      } else {
        setCategory(null);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 298 50"
          style={styles.svgBackground}
        >
          <Path
            d="M1 41V1H297V41L282.5 49H15L1 41Z"
            fill="transparent"
            stroke="#fff"
            strokeWidth="2"
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

          <View style={styles.center}>
            <Text style={styles.text}>TX 06</Text>
          </View>

          <View style={styles.right}>
            <View></View>
          </View>
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
    justifyContent: 'flex-end',
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
