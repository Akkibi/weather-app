import { THREE } from "expo-three";

type SphereConfig = {
  name: string;
  size: number;
  speed: number;
  distance: number;
  color: string;
};

export default class Planet {
  name: string;
  size: number;
  speed: number;
  distance: number;
  color: string;
  mesh: THREE.Mesh;

  constructor(config: SphereConfig) {
    this.name = config.name;
    this.size = config.size / 10;
    this.speed = config.speed;
    this.distance = config.distance;
    this.color = config.color;

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
          gl_FragColor = vec4(v_normal * 0.5 + 0.5, 1.0);
        }
      `,
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      uniforms: {
        u_time: { value: 0 },
        u_color: { value: new THREE.Color(this.color) },
        u_cameraDirection: { value: new THREE.Vector3() },
      },
    });
    this.mesh = new THREE.Mesh(geometry, material);
    const ajustedSize = this.size * 1.5 + 1.5;
    this.mesh.scale.set(ajustedSize, ajustedSize, ajustedSize);
    // Set the initial position of the sphere
    this.mesh.position.x = this.distance;
  }

  update(time: number) {
    // Update the position to simulate rotation around the origin
    const angle = time * this.speed;
    this.mesh.position.x = Math.cos(angle) * this.distance;
    this.mesh.position.z = Math.sin(angle) * this.distance;
  }
}
