import React from "react";
import { Text, StyleSheet, Pressable, DimensionValue } from "react-native";
import { Svg, Path, Defs, Filter, FeFlood, FeGaussianBlur, FeComposite, FeBlend } from "react-native-svg";

export default function ButtonBackground(){

  return (
      <Svg width="100%" height="32" viewBox="0 0 161 32" style={styles.svg}>
        <Path
          d="M0.5 26.3957V0.5H147.134L160.5 15.3034V31.5H8.33495L0.5 26.3957Z"
          fillOpacity={0.6}
          stroke="white"
        />
      </Svg>
  )
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    width : "100%"
  },
});
