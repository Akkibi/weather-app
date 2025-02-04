import { THREE } from "expo-three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Asset } from "expo-asset";
// import bubble from "../../../assets/models/bubble_model.glb";

type SphereConfig = {
  military: any;
  context: any;
  meteorological: any;
  atmosphericConditions: any;
  characteristics: any;
  maxTemperature: any;
  minTemperature: any;
  name: string;
  id: number;
  size: number;
  speed: number;
  distance: number;
  color: string;
  modelPath?: string;
};

type Characteristics = {
  title: string;
  surfaceArea: string;
  volume: string;
  mass: string;
  surfaceGravity: string;
  shape: string;
};

type AtmosphericConditions = {
  title: string;
  density: string;
  scaleHeight: string;
  averageMolarMass: string;
  composition: {
    [key: string]: string;
  };
};

type Meteorological = {
  title: string;
  temperatureRange: string;
  winds: string;
  sunlightHours: string;
  brightness: string;
  forecast: string;
};

type Context = {
  title: string;
  political: string;
  health: string;
  technology: string;
};

type Military = {
  title: string;
  population: string;
  hairDensity: {
    face: string;
    body: string;
  };
  animalSpecies: number;
  chemicalComposition: {
    [key: string]: string;
  };
};

export default class Planet {
  public name: string;
  public id: number;
  public size: number;
  public speed: number;
  public distance: number;
  public color: string;
  public instance: THREE.Group = new THREE.Group();
  public angle: number;
  public minTemperature: number;
  public maxTemperature: number;
  public characteristics: Characteristics;
  public atmosphericConditions: AtmosphericConditions;
  public meteorological: Meteorological;
  public context: Context;
  public military: Military;
  private modelPath: string | null = null;
  private model: THREE.Object3D | null = null;
  public rayCacher: THREE.Mesh;

  constructor(config: SphereConfig) {
    this.name = config.name;
    this.size = config.size / 10;
    this.speed = config.speed;
    this.distance = config.distance;
    this.color = config.color;
    this.id = config.id;
    this.angle = 0;
    this.minTemperature = config.minTemperature;
    this.maxTemperature = config.maxTemperature;
    this.characteristics = config.characteristics;
    this.atmosphericConditions = config.atmosphericConditions;
    this.meteorological = config.meteorological;
    this.context = config.context;
    this.military = config.military;
    this.modelPath = config.modelPath || null;

    if (this.modelPath) {
      console.log("there is a path");
      const loader = new GLTFLoader();
      loader.load(
        this.modelPath,
        (gltf: GLTF) => {
          console.log("glb file", gltf);
          gltf.scene.scale.set(this.size, this.size, this.size);
          this.instance.add(gltf.scene);
        },
        undefined,
        (error) => console.error("Error loading GLB:", error)
      );
    }

    // Create the default geometry and material for the sphere
    const geometry = new THREE.SphereGeometry(this.size, 32, 32);
    const shader = {
      vertex: `
        uniform float u_time;
        uniform float u_scale;
        uniform vec3 u_cameraDirection;
        varying vec3 v_normal;
        void main() {
          v_normal = normal;
          vec3 direction = position - u_cameraDirection;
          float distance = length(direction);
          vec3 directionNormal = normalize(direction);
          vec3 newPosition = position + directionNormal * sin(u_time + distance * u_scale) * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragment: `
        varying vec3 v_normal;
        void main() {
          gl_FragColor = vec4(v_normal, 1.0);
        }
      `,
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      uniforms: {
        u_time: { value: 0 },
        u_color: { value: new THREE.Color(this.color) },
        u_cameraDirection: { value: new THREE.Vector3(0, 0, 0) },
      },
    });
    const basicMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      color: this.color,
    });
    basicMaterial.opacity = 0.01;
    this.rayCacher = new THREE.Mesh(geometry, basicMaterial);
    const ajustedSize = 2.5;
    this.rayCacher.scale.set(ajustedSize, ajustedSize, ajustedSize);
    this.instance.add(this.rayCacher);

    // Set the initial position of the sphere group
    this.instance.name = "planet";
    this.instance.userData = this;
    this.instance.position.x = this.distance;
  }

  update(time: number) {
    // Update the position to simulate rotation around the origin
    this.angle = time * this.speed;
    this.instance.position.x = Math.cos(this.angle) * this.distance;
    this.instance.position.z = Math.sin(this.angle) * this.distance;
  }
}
