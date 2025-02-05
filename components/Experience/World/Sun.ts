import * as THREE from "three";
import { EventEmitter } from "../Utils/EventEmitter";
import Camera from "../Camera";

export default class Sun {
  public instance: THREE.Group;
  private sun: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;

  constructor(
    private eventEmitter: EventEmitter,
    private geometry: THREE.SphereGeometry,
    private camera: Camera,
  ) {
    this.geometry = geometry;

    const shader = {
      vertex: `
      varying vec3 v_worldNormal;
        uniform float u_time;
        uniform vec3 u_cameraDirection;
        void main() {

          v_worldNormal = normalize(mat3(modelMatrix) * normal);

          vec3 direction = position - u_cameraDirection;
          float distance = length(direction);

          vec3 directionNormal = normalize(direction);

          vec3 newPosition = position + directionNormal * sin(u_time * 0.25 + distance) * 0.1;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragment: `
        uniform vec3 u_cameraDirection;
        uniform float u_time;
        varying vec3 v_worldNormal;
        varying vec2 v_uv; // Ensure this is passed from the vertex shader

        vec3 random3(vec3 c) {
            float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
            vec3 r;
            r.z = fract(512.0 * j);
            j *= .125;
            r.x = fract(512.0 * j);
            j *= .125;
            r.y = fract(512.0 * j);
            return r - 0.5;
        }

        /* skew constants for 3d simplex functions */
        const float F3 = 0.3333333;
        const float G3 = 0.1666667;

        /* 3d simplex noise */
        float simplex3d(vec3 p) {
            /* 1. find current tetrahedron T and it's four vertices */
            /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */
            /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/

            /* calculate s and x */
            vec3 s = floor(p + dot(p, vec3(F3)));
            vec3 x = p - s + dot(s, vec3(G3));

            /* calculate i1 and i2 */
            vec3 e = step(vec3(0.0), x - x.yzx);
            vec3 i1 = e * (1.0 - e.zxy);
            vec3 i2 = 1.0 - e.zxy * (1.0 - e);

            /* x1, x2, x3 */
            vec3 x1 = x - i1 + G3;
            vec3 x2 = x - i2 + 2.0 * G3;
            vec3 x3 = x - 1.0 + 3.0 * G3;

            /* 2. find four surflets and store them in d */
            vec4 w, d;

            /* calculate surflet weights */
            w.x = dot(x, x);
            w.y = dot(x1, x1);
            w.z = dot(x2, x2);
            w.w = dot(x3, x3);

            /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */
            w = max(0.6 - w, 0.0);

            /* calculate surflet components */
            d.x = dot(random3(s), x);
            d.y = dot(random3(s + i1), x1);
            d.z = dot(random3(s + i2), x2);
            d.w = dot(random3(s + 1.0), x3);

            /* multiply d by w^4 */
            w *= w;
            w *= w;
            d *= w;

            /* 3. return the sum of the four surflets */
            return dot(d, vec4(52.0));
        }

        /* const matrices for 3d rotation */
        const mat3 rot1 = mat3(-0.37, 0.36, 0.85, -0.14, -0.93, 0.34, 0.92, 0.01, 0.4);
        const mat3 rot2 = mat3(-0.55, -0.39, 0.74, 0.33, -0.91, -0.24, 0.77, 0.12, 0.63);
        const mat3 rot3 = mat3(-0.71, 0.52, -0.47, -0.08, -0.72, -0.68, -0.7, -0.45, 0.56);

        /* directional artifacts can be reduced by rotating each octave */
        float simplex3d_fractal(vec3 m) {
            return 0.5333333 * simplex3d(m * rot1)
                + 0.2666667 * simplex3d(2.0 * m * rot2)
                + 0.1333333 * simplex3d(4.0 * m * rot3)
                + 0.0666667 * simplex3d(8.0 * m);
        }

        void main() {
            // Normalize world-space normal and camera direction
            vec3 worldNormal = normalize(-v_worldNormal);
            vec3 cameraDir = normalize(u_cameraDirection);

            // Calculate Fresnel effect
            float fresnel = pow(1.0 - dot(worldNormal, cameraDir), 3.0);

            vec3 timeNoise = vec3(u_time * 5.0, 0.0, u_time * 5.0);

            // Generate 3D noise based on worldNormal and time
            vec3 starWorldNormal = worldNormal;
            float starSpeed = u_time * -0.25;
            starWorldNormal.xz = mat2(cos(starSpeed), -sin(starSpeed), sin(starSpeed), cos(starSpeed)) * starWorldNormal.xz;
            float noise = simplex3d_fractal(starWorldNormal.xyz * 10.0 + u_time * 1.0);

            // Apply noise to base color

            vec3 baseColor = vec3(0.0, 0.0, 0.0);
            if (false) {
                baseColor = vec3(0.0,  0.3, 1.0);
                baseColor += vec3(noise * 0.2, -noise, -noise * 0.75);
            } else {
                baseColor = vec3(1.0, 0.25, 0.0);
                baseColor += vec3(-noise * 0.5, -noise, noise * 0.2);
            }

            // Mix color based on Fresnel
            vec3 mixColor = mix(baseColor, vec3(1.0, 0.6, 0.6), fresnel);
            // vec3 mixColor = baseColor;


            // Output color
            gl_FragColor = vec4(mixColor, 1.0);
        }
      `,
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      uniforms: {
        u_scale: { value: 1 },
        u_time: { value: 0 },
        u_cameraDirection: { value: new THREE.Vector3(0, 0, 0) },
      },
    });

    this.instance = new THREE.Group();
    this.instance.name = "sun";
    this.sun = new THREE.Mesh(this.geometry, material);

    this.instance.add(this.sun);

    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.eventEmitter.on("animate", (time: number) =>
      this.updateUniforms(time),
    );
  }

  updateUniforms(time: number) {
    // Get the world position of the camera
    const cameraWorldPosition = new THREE.Vector3();
    this.camera.instance.getWorldPosition(cameraWorldPosition);

    // Compute the direction from the camera to the sphere
    const cameraToSphereDirection = new THREE.Vector3().subVectors(
      new THREE.Vector3(0, 0, 0),
      cameraWorldPosition,
    );

    // Update uniforms
    this.sun.material.uniforms.u_cameraDirection.value =
      cameraToSphereDirection;
    this.sun.material.uniforms.u_time.value = time / 5;
  }
}
