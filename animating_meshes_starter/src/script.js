import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

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
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


//initialize the clock
const clock = new THREE.Clock()
let previousTime = 0 // initialize previousTime variable so that we can calculate the time difference between frames
// render the scene
const renderloop = () => {
  //cubeMesh.rotation.y += THREE.MathUtils.degToRad(1)//increments rotation about the y axis 1 degree every time the renderloop is called

  const currentTime = clock.getElapsedTime()
  const delta = currentTime - previousTime
  

  //setting previous time AFTER calculating the delta
  previousTime = currentTime //resetting the previous time to current time so that we can perform that delta calculation again

  console.log(delta) // logging the delta will show approx how long each frame is instead of when we just called the console.log(clock.getElapsedTime) which would just show an incrementing number


  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 10;
  //the code above allows for a controlled rotation experience independent of the user's device refresh rate

  //OTHER ANIMATIONS//

  //SIN ANIMATION 
  console.log(Math.sin(currentTime)) // will log 1 all the way to -1 then back
  //Math is function that is provided by javascript that has a sin method that takes in currentTime as an argument in our example


  //cubeMesh.scale.x = (Math.sin(currentTime))// we are assigning the x-axis the result of the sin function with currentTime being the arugment which displays a shrinking and growing of the cube along the x axis 

  //you can create an equation using Math.sin(currentTime) to modify the amplitude and the bottom part of the sin wave so that the cube doesn't collapse in on itself

  //what we're doing is based on the GENERAL EQUATION OF A SINE WAVE TRANSFORMATION

  // y = Asin(Bx + C) + D
  ///   A = Amplitude (controls the stretch/compression of the wave)
  ///   B = Frequency (controls how quickly it oscillates)
  ///   C = Phase shift (shifts the wave left/right)
  ///   D = Vertical Shift (moves the wave up/down, changing the minimum and maximum values)

  /// My goal is to ... 
  //  control the amplitude (how much it expands and shrinks)
  //  ensure the cube never collapses (scale values stay positive)
  
  ///   equation to use is ....
  /// scale = Asin(t) + D
  /// where A = amplitude
  /// where D = vertical shift (amplitude PLUS min scale to ensure that scale value stays positive)
  /// where B and C remain 1 and 0 respectively because those values remain unchanged
  const amplitude = 1.5;
  const minScale = 1;
  cubeMesh.scale.x = amplitude * (Math.sin(currentTime))  + (amplitude + minScale);






  controls.update();//updates the OrbitControls
  renderer.render(scene, camera);//Tells Three.js to render the scene from the perspective of the camera
  window.requestAnimationFrame(renderloop);//requests the next frame, also ensures smooth animation by synciing with the browser's refresh cycle
  //schedules renderloop() to run again before the next frame is drawn
};

renderloop();
//callign renderloop function doesn't cause stack overflow because each call is scheduled asynchronously via requestAnimationFrame()

