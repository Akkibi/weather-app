import { THREE } from "expo-three";

export const planetsArray = [
  {
    id: 1,
    name: "Azternae",
    size: 2,
    speed: 2,
    distance: 5,
    minTemperature: -300,
    maxTemperature: 25,
    color: "#ff0000",
    characteristics: {
      surfaceArea: "4,60 × 10^8 km²",
      volume: "9,284 × 10^11 km³",
      mass: "4,867 × 10^24 kg",
      surfaceGravity: "8,87 m/s²",
      shape: "Sphérique",
    },
    atmosphericConditions: {
      density: "0,19 kg/m³",
      scaleHeight: "59,5 km",
      averageMolarMass: "2,07 g/mol",
      composition: {
        H2: "93%",
        He: "5%",
      },
    },
    meteorological: {
      temperatureRange: "-23°C à 123°C",
      winds: "jusqu’à 1800 km/h",
      sunlightHours: "10h",
      brightness: "166%",
      forecast: "Prévision par heures et sur 10 jours (schémas)",
    },
    context: {
      political: "Dictature",
      health: "VIRUS",
      technology: "740 kHz (740 000 opérations/s)",
    },
    military: {
      population: "3M",
      hairDensity: {
        face: "120 poils/cm²",
        body: "33 poils/cm²",
      },
      animalSpecies: 2,
      chemicalComposition: {
        CO2: "96%",
        Ar: "1,93%",
        N2: "1,89%",
      },
    },
  },
  {
    id: 2,
    name: "Alcyoneus",
    size: 3,
    speed: 2.91,
    distance: 6,
    minTemperature: -300,
    maxTemperature: 25,
    color: "#0000ff",
    characteristics: {
      surfaceArea: "37 871 220,85 km²",
      volume: "2,195 × 10^10 km³",
      mass: "7,347 × 10^22 kg",
      surfaceGravity: "1,622 m/s²",
      shape: "Exosquelet",
    },
    atmosphericConditions: {
      density: "0,42 kg/m³",
      scaleHeight: "27,7 km",
      averageMolarMass: "2,64 g/mol",
      composition: {
        H2: "83%",
        He: "15%",
      },
    },
    meteorological: {
      temperatureRange: "-173°C à 427°C",
      winds: "jusqu’à 300 km/h",
      sunlightHours: "17h",
      brightness: "3%",
      forecast: "Prévision par heures et sur 10 jours (schémas)",
    },
    context: {
      political: "Dictature",
      health: "VIRUS",
      technology: "20 MHz (millions d’opérations/s)",
    },
    military: {
      population: "3M",
      hairDensity: {
        face: "600 poils/cm²",
        body: "554 poils/cm²",
      },
      animalSpecies: 120,
      chemicalComposition: {
        H2: "83%",
        He: "15%",
        CH4: "2,3%",
      },
    },
  },
  {
    id: 3,
    name: "Almops",
    size: 2,
    speed: 1.62,
    distance: 4,
    minTemperature: -300,
    maxTemperature: 25,
    color: "#00ff00",
    characteristics: {
      surfaceArea: "144,798,500 km²",
      volume: "1.6318 × 10¹¹ km³",
      mass: "6.4185 × 10²³ kg",
      gravity: "3.711 m/s²",
      shape: "Bulles",
    },
    atmosphericConditions: {
      density: "0.020 kg/m³",
      scaleHeight: "11.1 km",
      molarMass: "43.341 g/mol",
      components: {
        CO2: "96%",
        Argon: "1.93%",
      },
    },
    meteorological: {
      temperature: "462 °C",
      sunlightHours: "29.5 days",
      brightness: "97%",
      forecast: {
        hourly: "schéma",
        tenDay: "schéma",
      },
    },
    context: {
      politics: "Dictature",
      health: "VIRUS",
      technology: "3 GHz (~3 milliards d’opérations par seconde)",
    },
    military: {
      population: "3M",
      hairDensity: {
        face: "50 poils/cm²",
        body: "27 poils/cm²",
      },
      animalSpecies: 185,
      chemicalComposition: {
        keratin: "87%",
        sulfurAminoAcids: "10%",
        CO2: "3%",
      },
    },
  },
  {
    id: 4,
    name: "Aloadae",
    size: 1,
    speed: 1.111,
    distance: 3,
    minTemperature: -300,
    maxTemperature: 25,
    color: "#ffff00",
    characteristics: {
      surfaceArea: "8.0831 × 10⁹ km²",
      volume: "6.83344 × 10¹³ km³",
      mass: "8.6810 × 10²⁵ kg",
      gravity: "8.87 m/s²",
      shape: "Fragmenté",
    },
    atmosphericConditions: {
      pressure: "10⁻¹⁰ Pa",
    },
    meteorological: {
      temperature: "-145°C to 128°C",
      winds: "up to 500 km/h",
      sunlightHours: "18h",
      brightness: "94%",
      forecast: {
        hourly: "schéma",
        tenDay: "schéma",
      },
    },
    context: {
      politics: "Dictature",
      health: "VIRUS",
      technology: "473,517 teraflops",
    },
    military: {
      population: "3M",
      hairDensity: {
        face: "2 poils/cm²",
        body: "1 poils/cm²",
      },
      animalSpecies: 3,
      chemicalComposition: {
        aluminum: "25%",
        hydrogen: "12%",
        carbon: "0.29%",
        iron: "0.16%",
      },
    },
  },
];

export const pointsArray = [
  {
    name: "temperature",
    position3D: new THREE.Vector3(1, 9, 2),
    top: 62,
    left: 15
  },
  {
    name: "humidity",
    position3D: new THREE.Vector3(0, 0, 0),
    top: 45,
    left: 5
  },
  {
    name: "wind",
    position3D: new THREE.Vector3(0, 0, 0),
    top: 35,
    left: 55
  },
  {
    name: "clouds",
    position3D: new THREE.Vector3(0, 0, 0),
    top: 50,
    left: 70
  },
  {
    name: "pressure",
    position3D: new THREE.Vector3(0, 0, 0),
    top: 60,
    left: 60
  },
];
