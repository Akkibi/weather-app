import { THREE } from "expo-three";

type SphereConfig = {
  name: string;
  id: number;
  size: number;
  speed: number;
  distance: number;
  color: string;
};

export default class Planet {
  public name: string;
  public id: number;
  public size: number;
  public speed: number;
  public distance: number;
  public color: string;
  private mesh: THREE.Mesh;
  public instance: THREE.Group;
  public angle: number;

  constructor(config: SphereConfig) {
    this.name = config.name;
    this.size = config.size / 10;
    this.speed = config.speed;
    this.distance = config.distance;
    this.color = config.color;
    this.id = config.id;
    this.angle = 0;

    // Create the geometry and material for the sphere
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

    this.mesh = new THREE.Mesh(geometry, material);
    const ajustedSize = this.size * 1.5 + 1.5;
    this.mesh.scale.set(ajustedSize, ajustedSize, ajustedSize);
    // Set the initial position of the sphere group
    this.instance = new THREE.Group();
    this.instance.add(this.mesh);
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
