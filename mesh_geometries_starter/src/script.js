import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
//const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // commenting this out so that we can create a new "geometry" variable that we can pass to the cubeMesh class later on
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });

const sphereMaterial = new THREE.MeshBasicMaterial({color: "blue", wireframe: true})

const cubeGeometry = new THREE.BoxGeometry(1,1,1, 2,2,2) //the second set of 3 arguments are the widthSegment, heightSegements, and depthSegments


const sphereGeometry= new THREE.SphereGeometry(.7, 8, 8)




// CREATE CUSTOM GEOMETRY (2D TRIANGLE)
//using buffer geometry to create custom geometry in three.js
// buffer geometry stores the vertices as an array of binary numbers to map out coordinates
// can use BufferAttribute to store information about position of the vertices so we can tell Three.js to set the position attribute using the information that we provide it

//delcare "vertices" variable and instantiate new float32Array class which is a special array type in javascript that stores floating-point number with 32 bit precision
// more efficient that a normal javascript array because it stores numbers a raw binary data
// important for WebGl performance since the GPU requires data in this format for efficient rendering
//const vertices = new Float32Array([
//  0, 0, 0,
//  0, 2, 0,
//  2, 0, 0
//])

//const BufferAttribute = new THREE.BufferAttribute(vertices, 3)

//const geometry = new THREE.BufferGeometry();
//geometry.setAttribute('position', BufferAttribute)


//const cubeMesh = new THREE.Mesh(geometry, cubeMaterial)
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.x = -1;

const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphereMesh.position.x = 1;

scene.add(cubeMesh);
scene.add(sphereMesh);

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
controls.autoRotate = false;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});




const clock = new THREE.Clock()
let previousTime = 0 // initialize previousTime variable so that we can calculate the time difference between frames
// render the scene



// render the scene
const renderloop = () => {


  const currentTime = clock.getElapsedTime()
  const delta = currentTime - previousTime

    //setting previous time AFTER calculating the delta
  previousTime = currentTime //resetting the previous time to current time so that we can perform that delta calculation again


  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 10;
  sphereMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 10;



  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
