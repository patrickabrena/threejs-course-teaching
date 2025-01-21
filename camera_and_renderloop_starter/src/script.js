



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

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.5,
  200)

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



//need to snyc the render function call to defices refresh rate for a smooth experience
//we will acheive this by using requestAnimationFrame method
//need to include the renderer.render(scene, camera)
//also need to include the set redersize before the decalred orbit controls

const renderloop = () => {
  renderer.render(scene, camera)
  console.log('renderloop') //
  window.requestAnimationFrame(renderloop)
}
renderloop()
//renderer.setSize(window.innerWidth, window.innerHeight)
//renderer.render(scene, camera)