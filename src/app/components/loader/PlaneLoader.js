// jest.ignore

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class PlaneLoader {
  constructor(canvas) {

    // Canvas
    this.canvas = canvas;
    const a = canvas.clientWidth / canvas.clientHeight;
    const f = 4;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    // Camera
    this.camera = new THREE.OrthographicCamera(-f * a, f * a, f, -f, 0.1, 500);
    this.camera.position.set(3, 3, 3);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 2.75;
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // On resize
    window.addEventListener("resize", () => {
      this.camera.left = -f * a;
      this.camera.right = f * a;
      this.camera.top = f;
      this.camera.bottom = -f;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    });

    // Lights
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x0000ff, 1));
    this.scene.add(new THREE.AmbientLight(0xffffff, .25));
    const rimLight = new THREE.DirectionalLight(0xffffff, .5);
    rimLight.position.set(-4, 5, -5);
    this.scene.add(rimLight);

    // Load Model
    (new GLTFLoader()).load("plane.gltf", gltf => {
      this.model = gltf.scene;

      this.model.traverse((child) => {
        if (child.isMesh && child.material) {
          if (child.material.name !== 'Tail' && child.material.name !== 'Logo') {
            child.material = new THREE.MeshPhysicalMaterial({
              color: child.material.color,
              roughness: .5,
              ior: 10
            });
          } else {
            child.material.map.generateMipmaps = false;
          }

          child.material.needsUpdate = true;
        }
      });

      this.scene.add(this.model);
      this.animate();
    });
  }

  animate() {
    if (this.model) {
      this.model.rotation.y += 0.01;
      this.model.rotation.z = .4;
      const ang = this.model.rotation.y - Math.PI / 4;
      this.model.position.x = Math.cos(ang) * 2;
      this.model.position.z = -Math.sin(ang) * 2;
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }
}

