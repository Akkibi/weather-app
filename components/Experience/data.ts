import { THREE } from "expo-three";

export const planetsArray = [
  {
    name: "Azternae",
    size: 2,
    speed: 2,
    distance: 5,
    minTemperature: -300,
    maxTemperature: 25,
    color: "#ff0000",
  },
  {
    name: "Alcyoneus",
    size: 3,
    speed: 2.91,
    distance: 6,
    minTemperature: -300,
    maxTemperature: 25,
    color: "#0000ff",
  },
  {
    name: "Almops",
    size: 2,
    speed: 1.62,
    distance: 4,
    minTemperature: -300,
    maxTemperature: 25,
    color: "#00ff00",
  },
  {
    name: "Aloadae",
    size: 1,
    speed: 1.111,
    distance: 3,
    minTemperature: -300,
    maxTemperature: 25,
    color: "#ffff00",
  },
  {
    name: "Ares",
    size: 2.5,
    speed: 2.48,
    distance: 7,
    minTemperature: -300,
    maxTemperature: 25,
    color: "#ff00ff",
  },
  {
    name: "Catoblepas",
    size: 2.5,
    speed: 2.62,
    distance: 8,
    minTemperature: -300,
    maxTemperature: 25,
    color: "#00ffff",
  },
];

export const pointsArray = [
  {
    name: "temperature",
    position: new THREE.Vector3(1, 9, 2),
  },
  {
    name: "humidity",
    position: new THREE.Vector3(0, 0, 0),
  },
  {
    name: "wind",
    position: new THREE.Vector3(0, 0, 0),
  },
  {
    name: "clouds",
    position: new THREE.Vector3(0, 0, 0),
  },
  {
    name: "pressure",
    position: new THREE.Vector3(0, 0, 0),
  },
];
