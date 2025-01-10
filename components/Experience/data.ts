import { THREE } from "expo-three";

export const planetsArray = [
  {
    name: "Azternae",
    size: 2,
    speed: 2,
    distance: 5,
    color: "#ff0000",
  },
  {
    name: "Alcyoneus",
    size: 3,
    speed: 2.91,
    distance: 6,
    color: "#0000ff",
  },
  {
    name: "Almops",
    size: 2,
    speed: 1.62,
    distance: 4,
    color: "#00ff00",
  },
  {
    name: "Aloadae",
    size: 1,
    speed: 1.111,
    distance: 3,
    color: "#ffff00",
  },
  {
    name: "Ares",
    size: 2.5,
    speed: 2.48,
    distance: 7,
    color: "#ff00ff",
  },
  {
    name: "Catoblepas",
    size: 2.5,
    speed: 2.62,
    distance: 8,
    color: "#00ffff",
  },
];

export const pointsArray = [
  {
    name: "temperature",
    position: new THREE.Vector3(1, 2, 0),
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
