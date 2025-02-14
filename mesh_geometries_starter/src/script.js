import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
//const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // commenting this out so that we can create a new "geometry" variable that we can pass to the cubeMesh class later on
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });

// CREATE CUSTOM GEOMETRY (2D TRIANGLE)
//using buffer geometry to create custom geometry in three.js
// buffer geometry stores the vertices as an array of binary numbers to map out coordinates
// can use BufferAttribute to store information about position of the vertices so we can tell Three.js to set the position attribute using the information that we provide it

//delcare "vertices" variable and instantiate new float32Array class which is a special array type in javascript that stores floating-point number with 32 bit precision
// more efficient that a normal javascript array because it stores numbers a raw binary data
// important for WebGl performance since the GPU requires data in this format for efficient rendering
const vertices = new Float32Array([
  0, 0, 0,
  0, 2, 0,
  2, 0, 0
])

const BufferAttribute = new THREE.BufferAttribute(vertices, 3)

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', BufferAttribute)


const cubeMesh = new THREE.Mesh(geometry, cubeMaterial)
//const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
