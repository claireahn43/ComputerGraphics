//Yaewon Ahn
//I am replicating the penguins and fish using instancing.

let angle = 0.0;
let time = 0;

// this is called once at the start of the program
function setup() {
  createCanvas(600, 600, WEBGL);
  let fov = 60.0;  // 60 degrees field of view
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
  angleMode(DEGREES);
}

// this is called repeatedly to create new per-frame images
function draw() {
  background(191,239,255);  // light blue background
  // set the virtual camera position
  
  camera(-10, -65, 150, 0, 0, 0, 0, 1, 0);
  if (time > 5.5 && time <= 12) {
    camera(160, 0, 150, 0, 0, 0, 0, 1, 0);
  }
  if (time > 12 && time <= 26) {
    camera(200, 100 - time * 4, 150, 0, 0, 0, 0, 1, 0);
  } 
  if (time > 26 && time < 32) {
    camera(250, -50, -150, 0, 0, 0, 0, 1, 0);
  }
  if (time > 32) {
    camera (250, -50, -220, 0,0,0,0,1,0);
  }
  
  // include a little bit of light even in shadows
  ambientLight(60, 60, 60);
  
  // set the light position
  if (time <= 12) {
    pointLight(255, 255, 255, 100, -100, 300);
  }
  if (time > 12 && time <= 26) {
    pointLight(255, 255, 255, 250, 100, -50);
    pointLight(255, 255, 255, 250, -100, -100);
  }
  if (time > 26) {
    pointLight(255, 255, 255, 250, -100, -150);
  }
  
  //orbitControl();

  noStroke();  // don't draw polygon outlines

  push();
  Water();
  pop();
  
  push();
  translate(0, 25, 0);
  Ice();
  pop();
  
  push();
  translate(150, 25, -180);
  Ice();
  pop();
  
  //penguin (red)
  push();
  //moving forward
  if (time > 0 && time <= 6.6) {
    translate(0, 0, time * 3);
  }
  //falling
  if (time > 6.6 && time <= 12) {
    rotateY(-45);
    rotateX(30);
    translate(time * 9, -5, 0);
    let penguin_axis = createVector(0.0, 1.0, 1.0);
    rotate(-time * 12, penguin_axis);
  }
  //drowning
  if (time > 12 && time <= 20) {
    translate(115, 50, 95);
    rotateY(-45);
    rotateX(70);
    translate(0, 0, -time);
  }
  //swimming
  if (time > 20 && time <= 31) {
    translate(115, 105, 125);
    translate(0, -50, 0);
    translate(0, -5, -time * 6);
    rotateX(90);
    rotateY(180);
  }
  //getting up
  if (time > 31 && time <= 32.5) {
    translate(150, 25, -145);
    rotateY(180);
  }
  if (time > 32.5) {
    translate(150, 0, -160);
    rotateY(180);
  }
  translate(0, -21.5, -20);
  scale(0.5);
  Penguin(255, 0, 0);
  pop();
  
  //bigger penguin (sky blue)
  push();
  //moving sideways
  if (time > 0 && time <= 6.6) {
    translate(-35, -30, 0);
    translate(time * 2, 0, 0);
  }
  if (time > 6.6) {
    translate(0, -30, 0);
  }
  scale(0.7);
  rotateY(45);
  Penguin(135,206,235);
  pop();
  
  //baby penguin (green)
  push();
  translate(150, -13, -200);
  scale(0.3);
  Penguin(0,255,0);
  pop();
  
  //fish
  push();
  let fish_axis = createVector(0.0, 1.0, 0.0);
  rotate(-time * 10, fish_axis);
  translate(10 * cos(time), 10 * -sin(time), 0);
  rotateY(180);
  translate(100, 50, 50);
  scale(0.6);
  Fish(0, 255, 0);
  pop();

  push();
  rotate(-time * 10, fish_axis);
  translate(8 * cos(time), 8 * -sin(time), 0);
  rotateY(180);
  translate(0, 60, 50);
  scale(0.6);
  Fish(255,0,0);
  pop();
  
  push();
  rotate(-time * 5, fish_axis);
  translate(10 * cos(time), 10 * -sin(time), 0);
  rotateY(180);
  translate(0, 50, 50);
  scale(0.5);
  Fish(255,255,0);
  pop();
  
  push(); 
  rotate(-time * 7, fish_axis);
  translate(7 * cos(time), 7 * -sin(time), 0);
  translate(0, 50, 50);
  scale(0.4);
  Fish(255,105,180);
  pop();
  
  //a bunch of fish underwater
  push();
  rotate(-time * 7, fish_axis);
  translate(7 * cos(time), 7 * -sin(time), 0);
  let x = random(255);
  let y = random(255);
  let z = random(255);
  translate(x, y, z);
  Fish(x,y,z);
  pop();
    
  //shark
  push();
  if (time > 12) {
    rotate(time * 6, fish_axis);
    translate(6 * cos(time), 6 * -sin(time), 0);
  }
  translate(-170, 52, 0);
  Shark(105,105,105);
  pop();
  
  time += 0.03;
  
}

function Penguin(r, g, b) {
  //head
  fill(0);
  push();
  translate(0, -20);
  sphere(15);
  pop();
  
  //hat
  fill(r,g,b);
  push();
  translate(0,-38, -3.8);
  rotateX(190);
  cone(10,17);
  pop();
  
  //eyes
  fill(255);
  push();
  translate(-5, -22, 9);
  scale(1/3);
  sphere(15);
  pop();
  
  fill(255);
  push();
  translate(5, -22, 9);
  scale(1/3);
  sphere(15);
  pop();
  
  fill(0);
  push();
  translate(6.5, -22, 13);
  scale(1/9);
  sphere(15);
  pop();
  
  fill(0);
  push();
  translate(-6.5, -22, 13);
  scale(1/9);
  sphere(15);
  pop();
  
  //beak
  fill(255,69,0);
  push();
  translate(0, -18, 16);
  rotateX(90);
  scale(0.5);
  cone(8.3,15);
  pop();
  
  //body
  fill(0);
  push();
  translate(0, 14);
  ellipsoid(20,30);
  pop();
  
  fill(255);
  push();
  translate(0,14,10);
  ellipsoid(12,25);
  pop();
  
  //arms
  fill(0);
  push();
  translate(-12, -3, -6);
  rotateY(30);
  ellipsoid(17,5,3);
  pop();
  
  fill(0);
  push();
  translate(12, -3, -6);
  rotateY(-30);
  ellipsoid(17,5,3);
  pop();
  
  //feet
  fill(255,69,0);
  push();
  translate(10, 42, 2);
  rotateY(-30);
  ellipsoid(9, 1.5, 3);
  pop();
  
  fill(255,69,0);
  push();
  translate(-10, 42, 2);
  rotateY(30);
  ellipsoid(9, 1.5, 3);
  pop();
  
  //scarf
  fill(r, g, b);
  push();
  translate(0,-10);
  rotateX(90);
  torus(15.5,3.5);
  pop();
}

function Fish(r, g, b) {
  //body
  //fill(57,159,236);
  fill(r, g, b);
  push();
  translate(-12, 50, -4);
  ellipsoid(10,5,1);
  pop();
  
  //fill(35,82,148);
  fill(r,g,b);
  push();
  translate(-1, 48, -4);
  rotate(-30);
  ellipsoid(3,1.5,1);
  pop();
  
  fill(r,g,b);
  push();
  translate(-1, 52, -4);
  rotate(30);
  ellipsoid(3,1.5,1);
  pop();
  
  //eye
  fill(0);
  push();
  translate(-17.5, 49, -4);
  sphere(1.5);
  pop();
}

function Ice() {
  fill(255);
  push();
  box(100, 50, 100);
  pop();
}

function Water() {
  fill(0, 0, 255);
  push();
  translate(0, 321.5, 0);
  box(600);
  pop();
}

function Shark(r,g,b) {
  //body
  fill(r,g,b);
  push();
  ellipsoid(70,20,20);
  pop();
  
  fill(0);
  push();
  translate(30, -4, 16.5);
  rotate(45);
  box(20, 2, 4);
  pop();
  
  fill(0);
  push();
  translate(23, -4, 16.5);
  rotate(45);
  box(17,2,4);
  pop();
  
  fill(0);
  push();
  translate(16, -4, 17.2);
  rotate(45);
  box(14, 2, 4);
  pop();
  
  fill(0);
  push();
  translate(30, -4, -16.5);
  rotate(45);
  box(20, 2, 4);
  pop();
  
  fill(0);
  push();
  translate(23, -4, -16.5);
  rotate(45);
  box(17,2,4);
  pop();
  
  fill(0);
  push();
  translate(16, -4, -17.2);
  rotate(45);
  box(14, 2, 4);
  pop();
  
  //top fin
  fill(r,g,b);
  push();
  translate(20, -15, 0);
  rotate(90);
  ellipsoid(30,10,10);
  pop();
  
  //bottom fin
  fill(r,g,b);
  push();
  translate(0, 10, 0);
  rotate(90);
  ellipsoid(30, 10, 10);
  pop();
  
  //eye
  fill(0);
  push();
  translate(55, -5, 10);
  sphere(2.5);
  pop();
  
  fill(0);
  push();
  translate(55, -5, -10);
  sphere(2.5);
  pop();
  
  //tail;
  fill(r,g,b);
  push();
  translate(-70, -5, 0);
  rotate(45);
  ellipsoid(20, 7, 10);
  pop();
  
  fill(r,g,b);
  push();
  translate(-70, 5, 0);
  rotate(-45);
  ellipsoid(20, 7, 10);
  pop();
}
