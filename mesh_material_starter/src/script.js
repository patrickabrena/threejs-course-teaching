import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
//learning about planes with frontside and doubleside
const torusKnotGeometry =new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16)
const planeGeometry = new THREE.PlaneGeometry(1, 1);


// initialize the material
//const material = new THREE.MeshBasicMaterial();

//LOOKING AT MESHLAMBERTMATERIAL//
//const material = new THREE.MeshLambertMaterial()
const material = new THREE.MeshPhongMaterial(); //will have access to shininess
material.shininess = 690;



pane.addBinding(material, 'shininess', {
  min: 0,
  max: 2000,
  step: 10 
});

//accessing and modifying the properties of the MeshBasicMaterial after the fact instead of passing in the object consisting of the properties as an argument

//material.color = new THREE.Color(0x0FF00); // the color property of material is an instance of THREE.Color
//material.transparent = true; // primitive values
//material.opacity = 0.5 // primitive values
//material.side = THREE.DoubleSide //change this to Doubleside to see he plane from the other side

//now looking at the fog property of the MeshBasicMaterial
//const fog = new THREE.Fog(0xffffff, 1, 10)
//scene.fog = fog
//scene.background = new THREE.Color(0xffffff) 


// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 1.5

const planeMesh = new THREE.Mesh(planeGeometry, material)
planeMesh.position.x = -1.5

scene.add(mesh);
scene.add(mesh2);
scene.add(planeMesh)


//initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.2) //jsut raising lumen values equally with ambient light
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 20);
pointLight.position.set(2, 2, 2);
scene.add(pointLight)



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
