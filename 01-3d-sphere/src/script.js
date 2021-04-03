import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { PointLight, PointLightHelper } from 'three';

// Debug
const gui = new dat.GUI();
gui.close();

const colorCombos = {
  combo1: {
    color1: '0xfa087d',
    color2: '0xd44f7',
  },
  combo2: {
    color1: '0x6cc527',
    color2: '0xf7cd0d',
  },
  combo3: {
    color1: '0xd42a2a',
    color2: '0xdf7bf',
  },
  combo4: {
    color1: '0xbee815',
    color2: '0x7e1ded',
  },
  combo5: {
    color1: '0x15e8e8',
    color2: '0xed8a1c',
  },
  combo6: {
    color1: '0x153ae8',
    color2: '0x1ced59',
  },
  combo7: {
    color1: '0xe81515',
    color2: '0xeda31c',
  },
};

const pickRandomColors = (obj) => {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

const randomCombo = pickRandomColors(colorCombos);
console.log(randomCombo);

const randomColor1 = parseInt(randomCombo.color1);
const randomColor2 = parseInt(randomCombo.color2);

const parameters = {
  light2Color: randomColor1,
  light3Color: randomColor2,
};

// Loaders
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load(
  'textures/GolfBall/GolfBall-NormalMap.jpeg'
);

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereGeometry(0.5, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.2,
  color: new THREE.Color(0x262626),
  normalMap: normalTexture,
});

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

// Light 1
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Light 2
const pointLight2 = new THREE.PointLight(parameters.light2Color, 2);
pointLight2.position.set(3.54, -5.72, -6.38);

pointLight2.intensity = 2.7;
pointLight2.position.set(2.69, -2.85, -2.41);
scene.add(pointLight2);

const groupLight2 = gui.addFolder('Light 2');
groupLight2.open();

groupLight2
  .add(pointLight2, 'intensity')
  .min(0)
  .max(10)
  .step(0.01)
  .name('Intensity');

groupLight2
  .add(pointLight2.position, 'x')
  .min(-10)
  .max(10)
  .step(0.01)
  .name('Position X');

groupLight2
  .add(pointLight2.position, 'y')
  .min(-10)
  .max(10)
  .step(0.01)
  .name('Position Y');

groupLight2
  .add(pointLight2.position, 'z')
  .min(-10)
  .max(10)
  .step(0.01)
  .name('Position Z');

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 2);
// scene.add(pointLightHelper2);

groupLight2.addColor(parameters, 'light2Color').onChange(() => {
  pointLight2.color.set(parameters.light2Color);
});

// Light 3
const pointLight3 = new THREE.PointLight(parameters.light3Color, 10);
pointLight3.position.set(-5.94, 4.43, -2.85);
scene.add(pointLight3);

const groupLight3 = gui.addFolder('Light 3');
groupLight3.open();

groupLight3
  .add(pointLight3, 'intensity')
  .min(0)
  .max(10)
  .step(0.01)
  .name('Intensity');

groupLight3
  .add(pointLight3.position, 'x')
  .min(-10)
  .max(10)
  .step(0.01)
  .name('Position X');

groupLight3
  .add(pointLight3.position, 'y')
  .min(-10)
  .max(10)
  .step(0.01)
  .name('Position Y');

groupLight3
  .add(pointLight3.position, 'z')
  .min(-10)
  .max(10)
  .step(0.01)
  .name('Position Z');

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 2);
// scene.add(pointLightHelper3);

groupLight3.addColor(parameters, 'light3Color').onChange(() => {
  pointLight3.color.set(parameters.light3Color);
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
 * Scroll effects
 */

const updateSphere = (e) => {
  sphere.position.y = -window.scrollY * 0.0007;
  // sphere.scale = window.scrollY * 0.01;
};

window.addEventListener('scroll', updateSphere);

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
camera.position.z = 2;
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

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowMiddleX = window.innerWidth / 2;
const windowMiddleY = window.innerHeight / 2;

function onDocumentMouseMove(e) {
  mouseX = e.clientX - windowMiddleX;
  mouseY = e.clientY - windowMiddleY;
}

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  sphere.rotation.x += (targetY - sphere.rotation.x) * 0.5;
  sphere.rotation.y += (targetX - sphere.rotation.y) * 0.3;
  sphere.position.z += (targetY - sphere.rotation.x) * 0.4;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
