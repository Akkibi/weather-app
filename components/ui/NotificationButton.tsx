import React, { useCallback } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import * as Notifications from "expo-notifications";
import { useFocusEffect } from "expo-router";
import { planetsArray } from "@/components/Experience/Utils/data";
import usePlanetStore from "@/stores/usePlanetStore";
import Planet from "../Experience/World/Planet";
import { EventEmitter } from "../Experience/Utils/EventEmitter";

type Props = {
  eventEmitter: EventEmitter
  onPress: () => void;
};

export default function NotificationBtn({ eventEmitter, onPress }: Props) {
  useFocusEffect(
    useCallback(() => {
      const checkPermissions = async () => {
        const settings = await Notifications.getPermissionsAsync();
        if (
          !settings.granted ||
          settings.ios?.status !==
            Notifications.IosAuthorizationStatus.PROVISIONAL
        ) {
          await Notifications.requestPermissionsAsync({
            ios: {
              allowAlert: true,
              allowBadge: true,
              allowSound: true,
            },
          });
        }
      };
      checkPermissions();
    }, [])
  );

  const handlePlanetFocus = () => {
  };

  const handleNotification = useCallback(async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Wacky Weather",
        body: "🚨 Planète envahissable : Regardez les informations militaires",
        data: {
          action: 'focus_planet'
        }
      },
      trigger: null,
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;

      if (data.action === 'focus_planet') {
        onPress();
      }
    });
    return () => subscription.remove();
  }, [eventEmitter]);

  return (
    <Pressable
      onPress={handleNotification}
      style={styles.pressable}
    >
      <Text style={styles.text}>Notif.</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: "absolute",
    width: "auto",
  },
  pressable: {
    position: 'absolute',
    bottom: 45,
    left: 10,
  },
  text: {
    color: "rgba(0, 0, 0, 0.25)",
    // color: "white",
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
