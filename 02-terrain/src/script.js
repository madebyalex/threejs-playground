import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// Debug
const gui = new dat.GUI();
gui.close();

const parameters = {
  pointLightColor: '#2085e6',
};

// Loaders
const textureLoader = new THREE.TextureLoader();
const textureHeight = textureLoader.load('textures/height2.jpeg');
const textureMap = textureLoader.load('textures/map1.jpeg');
const textureAlpha = textureLoader.load('textures/alpha1.jpg');

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.PlaneBufferGeometry(3.6, 3.6, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial({
  // color: 'blue',
  map: textureMap,
  displacementMap: textureHeight,
  displacementScale: 0.6,
  alphaMap: textureAlpha,
  transparent: true,
  depthTest: false,
});

// Mesh
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

plane.rotation.x = -1.12;
gui.add(plane.rotation, 'x').min(-5).max(5).step(0.01).name('Plane rotation X');

// Lights
const pointLight = new THREE.PointLight(parameters.pointLightColor, 2.28);

console.log(parameters.pointLightColor);

pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 3;
scene.add(pointLight);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
// ambientLight.position.x = 2;
// ambientLight.position.y = 3;
// ambientLight.position.z = 4;
// scene.add(ambientLight);

const groupPointLight = gui.addFolder('Point Light');
groupPointLight.open();

groupPointLight
  .add(pointLight, 'intensity')
  .min(0)
  .max(5)
  .step(0.01)
  .name('Intensity');

groupPointLight
  .add(pointLight.position, 'x')
  .min(-10)
  .max(10)
  .step(0.01)
  .name('Position X');
groupPointLight
  .add(pointLight.position, 'y')
  .min(-10)
  .max(10)
  .step(0.01)
  .name('Position Y');
groupPointLight
  .add(pointLight.position, 'z')
  .min(-10)
  .max(10)
  .step(0.01)
  .name('Position Z');

// console.log(parameters.pointLightColor);

groupPointLight.addColor(parameters, 'pointLightColor').onChange(() => {
  pointLight.color.set(parameters.pointLightColor);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Interactivity
 */

document.addEventListener('mousemove', animateTerrain);

let mouseX = 0;
let mouseY = 0;

const windowMiddleX = window.innerWidth / 2;
const windowMiddleY = window.innerHeight / 2;

function animateTerrain(e) {
  mouseX = e.clientX - windowMiddleX;
  mouseY = e.clientY;
}

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  plane.rotation.z = 0.25 * elapsedTime;
  plane.material.displacementScale = 0.3 + mouseY * 0.0008 - mouseX * 0.00025;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
