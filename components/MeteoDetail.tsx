import React from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";

let ScreenHeight = Dimensions.get("window").height;

export default function MeteoDetail() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.detail}>
            <Text style={styles.text}>Temperature</Text>
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
