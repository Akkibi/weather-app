import React from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import usePlanetStore from '@/stores/usePlanetStore'

let ScreenHeight = Dimensions.get("window").height;


interface MeteoDetailProps {
  isFocus: boolean;
  planetData: string | null;
}

export default function MeteoDetail() {
    const { isFocus, planetFocused } = usePlanetStore();

    if (!isFocus) return null;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.detail}>
            <Text style={styles.text}>{planetFocused}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.text}>Pression atmospherique</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.text}>Taux de pilosité</Text>
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 50,
    position: 'absolute',
    left: 0,
    right: 0,
    height: ScreenHeight,
  },
  scrollContent: {
    flexGrow: 1,
  },
  text: {
    color: 'red'
  },
  detail: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: ScreenHeight,
    width: '100%',
  }
});
