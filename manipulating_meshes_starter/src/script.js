import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
//the other cubeMeshes below are for a later lesson on scene hierarchy
//cubeMesh.position.y = - 1
//const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
//cubeMesh2.position.x = 2;
//const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
//cubeMesh3.position.x = -2;


//const group = new THREE.Group();
//group.add(cubeMesh);
//group.add(cubeMesh2);
//group.add(cubeMesh3);

//example of inheritance here with the scale being applied to the parent (group) so the local position of the group is at y = 2
// if I were to go up a few lines of code and set the position of one of the cubeMeshes to position.y = -1 it would still be y = 1 on absolute position
//group.position.y = 2;

//scene.add(group);
scene.add(cubeMesh);

//LESSONS ON ROTATION (EULERS)
//cubeMesh.rotation.y = 13; //will rotate about the y axis wiht a value of 13 radians
//to rotate it 90 degrees I can use the THREE.MathUtils.degToRad()
//MathUtils is a static utiloty class that is accessed directly from THREE namespace and i can use it for its degToRad(45) method to rotate my cubeMesh about the y axis 45 degrees

//Since Euler is a constructor functions with the parameters set to ( x : Float, y : Float, z : Float, order : String ) , we need to specify the order in that last parameter as a string to let THREE js know how to interpret the values
//comment the line below out to how to the difference in order affects the end result of the rotations
//cubeMesh.rotation.reorder('YXZ')

cubeMesh.rotation.y = THREE.MathUtils.degToRad(45)
cubeMesh.rotation.x = THREE.MathUtils.degToRad(69)

//Vector3 Lesson
console.log(cubeMesh) //Check console to see the Object and all it's properties
//cubeMesh.position.y = - 1; //within the cubeMesh object there is a position property that also has a Vector3 class and we're manipulating the y property of that Vector3 class
//const tempVector = new THREE.Vector3(0, 3, 0)
//const tempVector = new THREE.Vector3(0, 0, 0)
//cubeMesh.position.copy(tempVector) // using the copy method, you can check the results of this and see that our cupe moved up 3 units (+3 in y direction)
// this is because tempVector stores a new instance of a Vector3 class with the arguments (0,3,0)

//TRANSFORMING SCALE LESSON
//cubeMesh.scale.set(2, 2, 1) // this adjusts the cube to be twice as tall and wide
 


//TRANSFORMING POSiTION LESSON//
//cubeMesh.position.y = 1;
//cubeMesh.position.x = 1;

//to visualize this, we're going to add an axesHelper
const axesHelper = new THREE.AxesHelper(2); // argument that is passed is the length of the visualization it self
//scene.add(axesHelper)//add the axesHelper to the scene like we would with any other mesh

//add the axesHelper to the the Mesh itself so that we can explore the different rotations that we can do later on
cubeMesh.add(axesHelper)

//y axis is GREEN
//x axis is RED
//z axies is BLUE


// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

//using the distanceTo method to check the distance between our Mesh and the camera
console.log(cubeMesh.position.distanceTo(camera.position))

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// render the scene
const renderloop = () => {
  controls.update();  
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
