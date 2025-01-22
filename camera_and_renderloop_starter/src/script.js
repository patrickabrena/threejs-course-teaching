



import * as THREE from 'three';

//orbit controls below which is a later lesson
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
scene.add(cubeMesh)
////////////////////
// Create the outline
//const outlineGeometry = new THREE.BoxGeometry(1.05, 1.05, 1.05); // Slightly larger dimensions
//const outlineMaterial = new THREE.MeshBasicMaterial({
//  color: "black",
//  wireframe: true,
//});
//const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);
//scene.add(outlineMesh);
///////////////////////////////////////

//commenting out the persepective camera and instantiating a new OrthographicCamera
// initialize the camera
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.5,
  200)

//ned aspectRatio for orthographic Camera otherwise you get weird stretching effects
//need to multiply the each of the parameters provided for camera left,right
//const aspectRatio = window.innerWidth / window.innerHeight


//const camera = new THREE.OrthographicCamera(
//  -1 * aspectRatio,
//  1 * aspectRatio,
//  1 ,
//  -1 ,
//  0.1, //camera near
//  200 // camera far
//)


//exploring basics of camera near and camera far which are the lower and upper bounds of where you can view the scene
//currently with camera.position.z = 5, the camera and the actual object itself are 5 distance units away
//actual object is positioned at z = 0
//if FAR property is set to... z = const camera = new THREE.PerspectiveCamera(
// 75, 
// window.innerWidth / window.innerHeight,
// .5,
// 3)
// ...since camera.position.z = 5 < camera far value, object won't be in visible range because relative to the camera position, it will be clipped because it's out of range
//
//if NEAR property is set to < 4.5 it will not be visible
//this is because the set dimension of our cubeMesh object is 1,1,1 and the camera is position 5 units away from the CENTER of the object
//camera.position.z > object.position.z + half of object depth + camera near for object to be visible in viewing range

camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})



renderer.setSize(window.innerWidth, window.innerHeight)


//instantiate the controls
const controls = new OrbitControls(camera, canvas) //canvas variable is pointing towards the renderer.domElement
//set enableDamping on the controls property to give a sense of weight to the controls
controls.enableDamping = true
controls.autoRotate = true


//need to snyc the render function call to defices refresh rate for a smooth experience
//we will acheive this by using requestAnimationFrame method
//need to include the renderer.render(scene, camera)
//also need to include the set redersize before the decalred orbit controls




//instead of having the renderloop function handle the resizing we can window 'resize' event listener to handle this
//this is better becuse the camera.aspect is updating everyframe even when I don't need it do that.
//only need to update the aspect ratio when it happens, hence the use of the event listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  console.log(camera.aspect)
  //must call the updateProjectionMatrix method whenever the camera parameters change
  camera.updateProjectionMatrix()
}
)
const renderloop = () => {
  //including the aspect property in the renderloop and also the updateProjection Matrix to avoid unwanted stretching and buggy responsiveness
 //camera.aspect = window.innerWidth / window.innerHeight;
 //console.log(camera.aspect)
 ////must call the updateProjectionMatrix method whenever the camera parameters change
 //camera.updateProjectionMatrix()

  //setting the size of the renderer with the setSize method within the renderloop so that it updates
  renderer.setSize(window.innerWidth, window.innerHeight)

  controls.update()
  renderer.render(scene, camera)
  console.log('renderloop') // 
  window.requestAnimationFrame(renderloop)
}
renderloop()
//renderer.setSize(window.innerWidth, window.innerHeight)
//renderer.render(scene, camera)