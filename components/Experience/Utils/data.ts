import { THREE } from "expo-three";

export const planetsArray = [
  {
    id: 1,
    name: "ParaIV",
    modelPath: require("../../../assets/models/golden_model.glb"),
    size: 3,
    speed: 2,
    distance: 3,
    minTemperature: {
      title: "Temperature Min.",
      value: -300,
    },
    maxTemperature: {
      title: "Temperature Max.",
      value: 25,
    },
    color: "#000000",
    characteristics: {
      title: "Caractéristiques",
      surfaceArea: {
        title: "Surface",
        value: "4,60 × 10^8 km²",
      },
      volume: {
        title: "Volume",
        value: "9,284 × 10^11 km³",
      },
      mass: {
        title: "Masse",
        value: "4,867 × 10^24 kg",
      },
      surfaceGravity: {
        title: "Surface Gravitationelle",
        value: "8,87 m/s²",
      },
      shape: {
        title: "Forme",
        value: "Sphérique",
      },
    },
    atmosphericConditions: {
      title: "Conditions atmosphériques",
      density: {
        title: "Densité",
        value: "0,19 kg/m³",
      },
      scaleHeight: {
        title: "Hauteur de l'échelle",
        value: "59,5 km",
      },
      MolarMass: {
        title: "Masse molaire",
        value: "2,07 g/mol",
      },
      composition: {
        title: "Composition",
        H2: {
          title: "H2",
          value: "93%",
        },
        He: {
          title: "He",
          value: "5%",
        },
      },
    },
    meteorological: {
      title: "Métérologique",
      temperatureRange: {
        title: "Plage de températures",
        value: "-23°C à 123°C",
      },
      winds: {
        title: "Vents",
        value: "jusqu’à 1800 km/h",
      },
      sunlightHours: {
        title: "Heures d'ensoleillement",
        value: "10h",
      },
      brightness: {
        title: "Luminosité",
        value: "166%",
      },
    },
    context: {
      title: "Contexte",
      political: {
        title: "Situation politique",
        value: "Dictature",
      },
      health: {
        title: "Santé",
        value: "VIRUS",
      },
      technology: {
        title: "Technologie",
        value: "740 kHz (740 000 opérations/s)",
      },
    },
    military: {
      title: "Militaire",
      population: {
        title: "Population",
        value: "3M",
      },
      hairDensity: {
        title: "taux de pilosité",
        face: {
          title: "Visage",
          value: "120 poils/cm²",
        },
        body: {
          title: "Corps",
          value: "33 poils/cm²",
        },
      },
      weakness: {
        title: "Faiblesse",
        value: "Les chats",
      },
      animalSpecies: {
        title: "Espèces animales",
        value: 2,
      },
      chemicalComposition: {
        title: "Composition chimique",
        CO2: {
          title: "C02",
          value: "96%",
        },
        Ar: {
          title: "Ar",
          value: "1,93%",
        },
        N2: {
          title: "N2",
          value: "1,89%",
        },
      },
    },
  },
  {
    id: 2,
    name: "Hex",
    modelPath: require("../../../assets/models/hex3_model.glb"),
    size: 5,
    speed: 2.91,
    distance: 4.5,
    minTemperature: {
      title: "Temperature Min.",
      value: -300,
    },
    maxTemperature: {
      title: "Temperature Max.",
      value: 25,
    },
    color: "#000000",
    characteristics: {
      title: "Caractéristiques",
      surfaceArea: {
        title: "Surface",
        value: "37 871 220,85 km²",
      },
      volume: {
        title: "Volume",
        value: "2,195 × 10^10 km³",
      },
      mass: {
        title: "Masse",
        value: "7,347 × 10^22 kg",
      },
      surfaceGravity: {
        title: "Surface Gravitationelle",
        value: "1,622 m/s²",
      },
      shape: {
        title: "Forme",
        value: "Exosquelet",
      },
    },
    atmosphericConditions: {
      title: "Conditions atmosphériques",
      density: {
        title: "Densité",
        value: "0,42 kg/m³",
      },
      scaleHeight: {
        title: "Hauteur de l'échelle",
        value: "27,7 km",
      },
      molarMass: {
        title: "Masse molaire",
        value: "2,64 g/mol",
      },
      composition: {
        title: "Composition",
        H2: {
          title: "H2",
          value: "83%",
        },
        He: {
          title: "He",
          value: "15%",
        },
      },
    },
    meteorological: {
      title: "Métérologique",
      temperatureRange: {
        title: "Plage de températures",
        value: "-173°C à 427°C",
      },
      winds: {
        title: "Vents",
        value: "jusqu’à 300 km/h",
      },
      sunlightHours: {
        title: "Heures d'ensoleillement",
        value: "17h",
      },
      brightness: {
        title: "Luminosité",
        value: "3%",
      },
    },
    context: {
      title: "Contexte",
      political: {
        title: "Situation politique",
        value: "Dictature",
      },
      health: {
        title: "Santé",
        value: "VIRUS",
      },
      technology: {
        title: "Technologie",
        value: "20 MHz (millions d’opérations/s)",
      },
    },
    military: {
      title: "Militaire",
      population: {
        title: "Population",
        value: "3M",
      },
      hairDensity: {
        title: "taux de pilosité",
        face: {
          title: "Visage",
          value: "600 poils/cm²",
        },
        body: {
          title: "Corps",
          value: "554 poils/cm²",
        },
      },
      weakness: {
        title: "Faiblesse",
        value: "Le yodeling",
      },
      animalSpecies: {
        title: "Espèces animales",
        value: 120,
      },
      chemicalComposition: {
        title: "Composition chimique",
        H2: {
          title: "H2",
          value: "83%",
        },
        He: {
          title: "He",
          value: "15%",
        },
        CH4: "2,3%",
      },
    },
  },
  {
    id: 3,
    name: "Ell",
    modelPath: require("../../../assets/models/bubble_model.glb"),
    size: 2,
    speed: 1.62,
    distance: 6,
    minTemperature: {
      title: "Temperature Min.",
      value: -300,
    },
    maxTemperature: {
      title: "Temperature Max.",
      value: 25,
    },
    color: "#000000",
    characteristics: {
      title: "Caractéristiques",
      surfaceArea: {
        title: "Surface",
        value: "144,798,500 km²",
      },
      volume: {
        title: "Volume",
        value: "1.6318 × 10¹¹ km³",
      },
      mass: {
        title: "Masse",
        value: "6.4185 × 10²³ kg",
      },
      gravity: "3.711 m/s²",
      shape: {
        title: "Forme",
        value: "Bulles",
      },
    },
    atmosphericConditions: {
      title: "Conditions atmosphériques",
      density: {
        title: "Densité",
        value: "0.020 kg/m³",
      },
      scaleHeight: {
        title: "Hauteur de l'échelle",
        value: "11.1 km",
      },
      molarMass: {
        title: "Masse molaire",
        value: "43.341 g/mol",
      },
      components: {
        CO2: {
          title: "C02",
          value: "96%",
        },
        Argon: "1.93%",
      },
    },
    meteorological: {
      title: "Métérologique",
      temperature: {
        title: "Température",
        value: "462 °C",
      },
      sunlightHours: {
        title: "Heures d'ensoleillement",
        value: "29.5 days",
      },
      brightness: {
        title: "Luminosité",
        value: "97%",
      },
    },
    context: {
      title: "Contexte",
      politics: {
        title: "Situation Politique",
        value: "Dictature",
      },
      health: {
        title: "Santé",
        value: "VIRUS",
      },
      technology: {
        title: "Technologie",
        value: "3 GHz (~3 milliards d’opérations par seconde)",
      },
    },
    military: {
      title: "Militaire",
      population: {
        title: "Population",
        value: "3M",
      },
      hairDensity: {
        title: "taux de pilosité",
        face: {
          title: "Visage",
          value: "50 poils/cm²",
        },
        body: {
          title: "Corps",
          value: "27 poils/cm²",
        },
      },
      weakness: {
        title: "Faiblesse",
        value: "Les tomates",
      },
      animalSpecies: {
        title: "Espèces animales",
        value: 185,
      },
      chemicalComposition: {
        title: "Composition chimique",
        keratin: {
          title: "Keratin",
          value: "87%",
        },
        sulfurAminoAcids: {
          title: "Acide soufré",
          value: "10%",
        },
        CO2: {
          title: "C02",
          value: "3%",
        },
      },
    },
  },
  {
    id: 4,
    name: "FragVI",
    modelPath: require("../../../assets/models/explose2_model.glb"),
    size: 2.5,
    speed: 1.111,
    distance: 7.5,
    minTemperature: {
      title: "Temperature Min.",
      value: -300,
    },
    maxTemperature: {
      title: "Temperature Max.",
      value: 25,
    },
    color: "#000000",
    characteristics: {
      title: "Caractéristiques",
      surfaceArea: {
        title: "Surface",
        value: "8.0831 × 10⁹ km²",
      },
      volume: {
        title: "Volume",
        value: "6.83344 × 10¹³ km³",
      },
      mass: {
        title: "Masse",
        value: "8.6810 × 10²⁵ kg",
      },
      gravity: "8.87 m/s²",
      shape: {
        title: "Forme",
        value: "Fragmenté",
      },
    },
    atmosphericConditions: {
      title: "Conditions atmosphériques",
      pressure: "10⁻¹⁰ Pa",
    },
    meteorological: {
      title: "Métérologique",
      temperature: {
        title: "Temperature",
        value: "-145°C to 128°C",
      },
      winds: {
        title: "Vents",
        value: "500 km/h",
      },
      sunlightHours: {
        title: "Heures d'ensoleillement",
        value: "18h",
      },
      brightness: {
        title: "Luminosité",
        value: "94%",
      },
    },
    context: {
      title: "Contexte",
      politics: {
        title: "Situation Politique",
        value: "Dictature",
      },
      health: {
        title: "Santé",
        value: "VIRUS",
      },
      technology: {
        title: "Technologie",
        value: "473,517 teraflops",
      },
    },
    military: {
      title: "Militaire",
      population: {
        title: "Population",
        value: "3M",
      },
      hairDensity: {
        title: "taux de pilosité",
        face: {
          title: "Visage",
          value: "2 poils/cm²",
        },
        body: {
          title: "Corps",
          value: "1 poils/cm²",
        },
      },
      weakness: {
        title: "Faiblesse",
        value: "Les baguettes chinoises",
      },
      animalSpecies: {
        title: "Espèces animales",
        value: 3,
      },
      chemicalComposition: {
        title: "Composition chimique",
        aluminum: {
          title: "Al",
          value: "25%",
        },
        hydrogen: {
          title: "H",
          value: "12%",
        },
        carbon: {
          title: "C",
          value: "0.29%",
        },
        iron: {
          title: "Fe",
          value: "0.16%",
        },
      },
    },
  },
  {
    id: 5,
    name: "Tatooin",
    modelPath: require("../../../assets/models/grid_model.glb"),
    size: 3,
    speed: 2,
    distance: 9,
    temperature: {
      title: "Temperature Min.",
      value: "15,1 MK",
    },
    color: "#000000",
    characteristics: {
      title: "Caractéristiques",
      surfaceArea: {
        title: "Surface",
        value: "4,346 × 10^10 km²",
      },
      volume: {
        title: "Volume",
        value: "8,271 × 10^14 km³",
      },
      mass: {
        title: "Masse",
        value: "5,684 × 1026 kg²",
      },
      gravity: "10,44 m/s²",
      shape: {
        title: "Forme",
        value: "Sphérique",
      },
    },
    atmosphericConditions: {
      title: "Conditions atmosphériques",
      pressure: "9,3 × 106 Pa",
    },
    meteorological: {
      title: "Métérologique",
      temperature: {
        title: "Temperature",
        value: "15,1 MK",
      },
      winds: {
        title: "Vents",
        value: "30km/h ",
      },
      sunlightHours: {
        title: "Heures d'ensoleillement",
        value: "24h",
      },
      brightness: {
        title: "Luminosité",
        value: "100%",
      },
    },
    context: {
      title: "Contexte",
      politics: {
        title: "Situation Politique",
        value: "Pas de données",
      },
      health: {
        title: "Santé",
        value: "Pas de données",
      },
      technology: {
        title: "Technologie",
        value: "Pas de données",
      },
    },
    military: {
      title: "Militaire",
      population: {
        title: "Population",
        value: "1 (inconnu)",
      },
      hairDensity: {
        title: "taux de pilosité",
        face: {
          title: "Visage",
          value: "11 poils/cm²",
        },
        body: {
          title: "Corps",
          value: "9 poils/cm²",
        },
      },
      weakness: {
        title: "Faiblesse",
        value: "L’Odeur du Fromage",
      },
      animalSpecies: {
        title: "Espèces animales",
        value: 1,
      },
      chemicalComposition: {
        title: "Composition chimique",
        aluminum: {
          title: "Al",
          value: "25%",
        },
        hydrogen: {
          title: "H",
          value: "73,46%",
        },
        carbon: {
          title: "C",
          value: "0.29%",
        },
        iron: {
          title: "Fe",
          value: "0.16%",
        },
        helium: {
          title: "He",
          value: "24,85%",
        },
        oxygen: {
          title: "O",
          value: "0.77%",
        },
        neon: {
          title: "Ne",
          value: "0.12%",
        },
        nitrogen: {
          title: "N",
          value: "0.09%",
        },
        silicon: {
          title: "Si",
          value: "0.07%",
        },
        magnesium: {
          title: "Mg",
          value: "0.05%",
        },
      },
    },
  },
];

export const pointsArray = [
  {
    name: "temperature",
    position3D: new THREE.Vector3(1, 9, 2),
    top: 65,
    left: 15,
  },
  {
    name: "humidity",
    position3D: new THREE.Vector3(0, 0, 0),
    top: 50,
    left: 5,
  },
  {
    name: "wind",
    position3D: new THREE.Vector3(0, 0, 0),
    top: 35,
    left: 35,
  },
  {
    name: "clouds",
    position3D: new THREE.Vector3(0, 0, 0),
    top: 45,
    left: 50,
  },
  {
    name: "pressure",
    position3D: new THREE.Vector3(0, 0, 0),
    top: 57,
    left: 53,
  },
];
