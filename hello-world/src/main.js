import * as THREE from "three";
import { seededRandom } from "three/src/math/MathUtils.js";
//console.log(THREE); //shows all classes provided by three in the console
const scene = new THREE.Scene() //delcaring a variable "scene" which is a new instance of the scene class provided by THREE object

//declare cubeMesh variable storing a new instance of the Mesh class.
//THEN need to declare cubeGeometry and cubeMaterial which stores a new instance of the BoxGeometry class


//BREAKING DOWN THE CODE BELOW//

//THREE is an imported library (object) from "three" which comes from my node_modules directory
//declare the cubeGeometry and cubeMaterial variables that store the new instances (new created objects) created of the BoxGeometry and the MeshBasicMaterial class
//Those BoxGeometry and MeshBasicMaterial class contain a constructor function that has it's own parameters that are likely height, width and depth for BoxGeometry and and OBJECT of parameters like {color: "red"} for MeshBasicMaterial
//The delcared immutable variabls cubeGeometry and cubeMaterial then have those newly created instances of their respective classes that take in arguments like 1,1,1 and {color: "red"}
//the declared cubeMesh variable stores a new instance of the mesh class (also a global object from THREE) which takes in the cubeGeometry an cubeMaterial variables stored above\
//console.log(cubeMesh) displays in the console
//console.log(scene) logs the scene object in the console




const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})

const cubeMesh = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
)
console.log(cubeMesh);
console.log(scene)
//use the add() method to add cubeMesh to the scene
scene.add(cubeMesh)


//initialize the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30 ) //calling a few numbers, which are field of view, aspect ratio of the scene which is the innerwidth/innerheight, camera near, camera far, 

//camera position
//camera itself is a 3D object, 
camera.position.z = 5
console.log(window.innerWidth, window.innerHeight) //check on console, should see that there is a window object that contains the alot of properties and the ones we're looking at are inner width and inner height.


//initialize the renderer
const canvas = document.querySelector('canvas.threejs')
console.log(canvas) //double check that we retrieve the canvas properly
//passing the canvas as a property of an object but javascript removes that redundancy
//this is what the long version would look like
//
//
//const renderer = new THREE.WebGLRenderer({canvas
//  canvas: canvas
//})
//
//basically passing canvas as an argument WITHIN an object
const renderer = new THREE.WebGLRenderer({canvas})

//use the setSize method on the render to specify the width and the height using the innerWidth and innerHeight of the window object
renderer.setSize(window.innerWidth, window.innerHeight) //note: not yet responsive, need to reload page to see changes
//render the scene
renderer.render(scene, camera)