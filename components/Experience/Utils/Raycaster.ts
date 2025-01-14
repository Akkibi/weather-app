import * as THREE from 'three';
import { EventEmitter } from '../EventEmitter';
import Sizes from './Sizes';
import Camera from '../Camera';
import Scene from '../Scene';
import CameraOrigin from '../CameraOrigin';
import usePlanetStore from '@/stores/usePlanetStore'

export default class Raycaster extends EventEmitter {
  raycaster: THREE.Raycaster;
  currentIntersect: THREE.Intersection | null;
  mouse: THREE.Vector2;
  sizes: Sizes;
  camera: Camera;
  scene: Scene;
  cameraOrigin: CameraOrigin;


  constructor(sizes: Sizes, camera: Camera, scene: Scene, cameraOrigin: CameraOrigin) {
    super();

    this.raycaster = new THREE.Raycaster();
    this.currentIntersect = null;
    this.mouse = new THREE.Vector2();
    this.sizes = sizes;
    this.camera = camera
    this.scene = scene
    this.cameraOrigin = cameraOrigin

    window.addEventListener('touchmove', (event) =>
      {
          this.mouse.x = event.targetTouches[0].clientX / this.sizes.width * 2 - 1
          this.mouse.y = - (event.targetTouches[0].clientY / this.sizes.height) * 2 + 1
      })

    window.addEventListener('touchstart', ()=> {
      this.raycaster.setFromCamera(this.mouse, this.camera.instance)
      let intersects = this.raycaster.intersectObject(this.scene.instance)

      if(intersects.length)
      {
        this.currentIntersect = intersects[0]
        console.log('intersect : ', this.currentIntersect);

        if (this.currentIntersect.object.parent?.name === "planet") {
          console.log('planet');
          // this.trigger('planetFocus')
          usePlanetStore.getState().setFocus(true);
          this.cameraOrigin.setFocus(this.currentIntersect.object.parent)
        }
      }
      else
      {
        this.currentIntersect = null
      }
    })
  }
}
