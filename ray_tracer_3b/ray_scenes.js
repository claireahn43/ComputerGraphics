//Yaewon Ahn
// routines for creating a ray tracing scene

//3A stuff
//background
let red;
let green;
let blue;

//for eye_ray
let d;
let u;
let v;
let t;
let tt;
let ttt; //dummy
let smallestT; //stores smallest t value
let closest; //stores closest sphere index

//for quadratic equation
let x0;
let y0;
let z0;
let aa;
let bb;
let cc;

//ambient light
let ar;
let ag;
let ab;

//ray
let rayOrigin;
let vectorU;
let vectorV;
let vectorW;
let ray_dir;

//lists
let lights = [];
let spheres = [];

//3B stuff
let disks = [];
let areaLights = [];
let level = 1;
let shape = true;
let diskClosest;
let jitter;

// NEW COMMANDS FOR PART B
//disks class to store disk info
class Disks {
  constructor(x, y, z, radius, nx, ny, nz, dr, dg, db, k_ambient, k_specular, specular_pow) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.nx = nx;
    this.ny = ny;
    this.nz = nz;
    this.dr = dr;
    this.dg = dg;
    this.db = db;
    this.k_ambient = k_ambient;
    this.k_specular = k_specular;
    this.specular_pow = specular_pow;
  }
}
//area light class to store area light info
class AreaLight {
  constructor(r, g, b, x, y, z, ux, uy, uz, vx, vy, vz) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.x = x;
    this.y = y;
    this.z = z;
    this.ux = ux;
    this.uy = uy;
    this.uz = uz;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
  }
}

// create a new disk
function new_disk (x, y, z, radius, nx, ny, nz, dr, dg, db, k_ambient, k_specular, specular_pow) {
  disks[disks.length] = new Disks(x, y, z, radius, nx, ny, nz, dr, dg, db, k_ambient, k_specular, specular_pow);
}

// create a new area light source
function area_light (r, g, b, x, y, z, ux, uy, uz, vx, vy, vz) {
  if (areaLights.length <= 10) {
    areaLights[areaLights.length] = new AreaLight(r, g, b, x, y, z, ux, uy, uz, vx, vy, vz);
  }
}

//set level
function set_sample_level (num) {
  level = num;
}

//set jitter flag to true
function jitter_on() {
  jitter = true;
}

//set jitter flag to off
function jitter_off() {
  jitter = false;
}

// OLD COMMANDS FROM PART A (some of which you will still need to modify)
//pointLight class to store light info
class PointLight {
  constructor(r,g,b,x,y,z) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

//sphere class to store sphere info
class Spheres {
  constructor(x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.dr = dr;
    this.dg = dg;
    this.db = db;
    this.k_ambient = k_ambient;
    this.k_specular = k_specular;
    this.specular_pow = specular_pow;
    this.hit = false;
  }
}

// clear out all scene contents
function reset_scene() {
  //3A
  lights.length = 0;
  spheres.length = 0;
  
  red = 0;
  green = 0;
  blue = 0;

  d = 0;
  u = 0;
  v = 0;
  t = 0;
  tt = 0;
  ttt = 0;
  smallestT = 10000;
  closest = -1;
  
  x0 = 0;
  y0 = 0;
  z0 = 0;
  aa = 0;
  bb = 0;
  cc = 0;
  
  ar = 0;
  ag = 0;
  ab = 0;
  
  rayOrigin = createVector(0,0,0);
  vectorU = createVector(0,0,0);
  vectorV = createVector(0,0,0);
  vectorW = createVector(0,0,0);
  ray_dir = createVector(0,0,0);
  
  //3B
  disks.length = 0;
  areaLights.length = 0;
  diskClosest = -1;
  shape = true;
}

// create a new point light source
function new_light (r, g, b, x, y, z) {
  if (lights.length <= 10) {
    lights[lights.length] = new PointLight(r, g, b, x, y, z);
  }
}

// set value of ambient light source
function ambient_light (r, g, b) {
  ar = r;
  ag = g;
  ab = b;
  
}

// set the background color for the scene
function set_background (r, g, b) {
  red = r;
  green = g;
  blue = b;
}

// set the field of view
function set_fov (theta) {
  angle = radians(theta);
  d = 1/tan(angle/2);
}

// set the position of the virtual camera/eye
function set_eye_position (x, y, z) {
  rayOrigin = createVector(x,y,z);
}

// set the virtual camera's viewing direction
function set_uvw(x1,y1, z1, x2, y2, z2, x3, y3, z3) {
  vectorU = createVector(x1,y1,z1);
  vectorV = createVector(x2,y2,z2);
  vectorW = createVector(x3,y3,z3);
}

// create a new sphere
function new_sphere (x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow) {
  spheres[spheres.length] = new Spheres(x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow);
}

// create an eye ray based on the current pixel's position
function eye_ray_uvw (i, j) {
  u = -1 + (2 * i)/width;
  v = -1 + (2 * j)/height;
  //ray direction = -dW + uU + vV
  ray_dir = p5.Vector.add(p5.Vector.add(p5.Vector.mult(vectorW, -d), p5.Vector.mult(vectorU, u)), p5.Vector.mult(vectorV, v));
  return ray_dir;
}

// this is the main routine for drawing your ray traced scene
function draw_scene() {

  noStroke();  // so we don't get a border when we draw a tiny rectangle

  // go through all the pixels in the image
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0.0;
      let g = 0.0;
      let b = 0.0; // placeholders to store the pixel's color
      for (let sy = 0; sy < level; sy++) {
        for (let sx = 0; sx < level; sx++) {
          let suby = (sy + 1) / (level + 1) - 0.5;
          suby += y;
          let subx = (sx + 1) / (level + 1) - 0.5;
          subx += x;
          
          // create eye ray
          let ray = eye_ray_uvw (subx, suby);
          let subr = 0;
          let subg = 0;
          let subb = 0;
          // maybe print debug information
          debug_flag = 0;
          //if (x == width / 2 && y == height / 2) { debug_flag = 1;  }  // un-comment to debug center pixel
          
          if (debug_flag) {
            console.log ("debug at: " + x + " " + y);
          }
          
          // Figure out the pixel's color here (FOR YOU TO WRITE!!!)
          //detection of ray intersection with spheres
          for (let i = 0; i < spheres.length; i++) {
            x0 = rayOrigin.x - spheres[i].x; //x0 - Cx
            y0 = rayOrigin.y - spheres[i].y; //y0 - Cy
            z0 = rayOrigin.z - spheres[i].z; //z0 - Cz
            aa = sq(ray.x) + sq(ray.y) + sq(ray.z); //dx^2 + dy^2 + dz^2
            bb = (x0 * ray.x + y0 * ray.y + z0 * ray.z) * 2; //2(x0 * dx + y0 * dy + z0 * dz)
            cc = sq(x0) + sq(y0) + sq(z0) - sq(spheres[i].radius); //x0^2 + y0^2 + z0^2 - r^2
            t = (-bb + sqrt(sq(bb) - 4 * aa * cc)) / (2 * aa); //quadratic formula
            tt = (-bb - sqrt(sq(bb) - 4 * aa * cc)) / (2 * aa); //quadratic formula
            ttt = 10000; //dummy
            //find smallest positive t value
            if (t > 0 && tt < 0) {
              ttt = t;
            } else if (t < 0 && tt > 0) {
              ttt = tt;
            } else if (t > 0 && tt > 0) {
              if (t < tt) {
                ttt = t;
              } else {
                ttt = tt;
              }
            }
            if (i == 0) {
              smallestT = ttt;
              closest = i;
            } else {
              if (ttt < smallestT) {
                smallestT = ttt;
                closest = i;
              }
            }
          }
          
          //detection of ray intersection with disks
          let diskSmallT = 10000;
          for (let k = 0; k < disks.length; k++) {
            let dNormal = createVector(disks[k].nx, disks[k].ny, disks[k].nz); //nx,ny,nz = a,b,c
            let dCenter = createVector(disks[k].x, disks[k].y, disks[k].z); //center x,y,z 
            //let dd = -(p5.Vector.dot(dNormal, dCenter)); //d = -ax - by - cz, abc = nx,ny,nz
    
            let dx0 = disks[k].x - rayOrigin.x;
            let dy0 = disks[k].y - rayOrigin.y;
            let dz0 = disks[k].z - rayOrigin.z;
            
            let dOrigin = createVector(dx0, dy0, dz0);
            let directionD = createVector(ray.x, ray.y, ray.z);
            let top = p5.Vector.dot(dNormal, dOrigin);
            let bottom = p5.Vector.dot(dNormal, directionD);
            if (bottom != 0) {
              let minT = top / bottom; //dot(diskNormal, diskCenter-rayOrigin) / dot(diskNormal, rayDir)
              if (minT > 0 && minT < diskSmallT) {
                let inter = p5.Vector.add(rayOrigin, p5.Vector.mult(ray, minT)); //intersection
                let cent = createVector(disks[k].x, disks[k].y, disks[k].z); //center of disk
                let dist = p5.Vector.dist(inter, cent); //distance
                if (dist <= disks[k].radius) { //valid T
                  diskSmallT = minT;
                  diskClosest = k;
                }
              }
            }
          }
          
          //no valid T, set color to background
          if (smallestT == 10000 && diskSmallT == 10000) {
            subr += red;
            subg += green;
            subb += blue;
          } else { //compare minT of sphere against minT of disk
            if (diskSmallT != 10000 && smallestT == 10000) {
              shape = false; //closest shape is disk
            } else if (diskSmallT == 10000 && smallestT != 10000) {
              shape = true; //closest shape is sphere
            } else if (diskSmallT != 10000 && smallestT != 10000) {
              if (diskSmallT < smallestT) {
                shape = false; //disk
              } else {
                shape = true; //sphere
              }
            }
            let sn; //normal
            let sintersection; //intersection
            let scenter; //center
            let distance;
            if (shape) { //sphere was the closest
              sintersection = p5.Vector.add(rayOrigin, p5.Vector.mult(ray, smallestT)); //P
              scenter = createVector(spheres[closest].x, spheres[closest].y, spheres[closest].z); //C
              sn = p5.Vector.sub(sintersection, scenter); //P-C
              sn = sn.normalize();
            } else { //disk was the closest
              sintersection = p5.Vector.add(rayOrigin, p5.Vector.mult(ray, diskSmallT)); //P
              sn = createVector(disks[diskClosest].nx, disks[diskClosest].ny, disks[diskClosest].nz); //normal
            }
            
            //point light loop
            for (let j = 0; j < lights.length; j++) { //for each light
              let point = createVector(lights[j].x, lights[j].y, lights[j].z); //light position vector
              let offset = p5.Vector.mult(sn, 0.0001);
              let shadowOrigin = p5.Vector.add(sintersection, offset);
              let shadowDir = p5.Vector.sub(point, sintersection);

              distance = p5.Vector.dist(sintersection, point);
              let l = p5.Vector.sub(point, sintersection);
              l = l.normalize();
              let valid = false;
              //loop thru spheres
              for (let i = 0; i < spheres.length; i++) {
                let sx0 = shadowOrigin.x - spheres[i].x; //x0 - Cx
                let sy0 = shadowOrigin.y - spheres[i].y; //y0 - Cy
                let sz0 = shadowOrigin.z - spheres[i].z; //z0 - Cz
                let saa = sq(shadowDir.x) + sq(shadowDir.y) + sq(shadowDir.z); //dx^2 + dy^2 + dz^2
                let sbb = (sx0 * shadowDir.x + sy0 * shadowDir.y + sz0 * shadowDir.z) * 2; //2(x0 * dx + y0 * dy + z0 * dz)
                let scc = sq(sx0) + sq(sy0) + sq(sz0) - sq(spheres[i].radius); //x0^2 + y0^2 + z0^2 - r^2
                let shadowt = (-sbb + sqrt(sq(sbb) - 4 * saa * scc)) / (2 * saa); //quadratic formula
                let shadowtt = (-sbb - sqrt(sq(sbb) - 4 * saa * scc)) / (2 * saa); //quadratic formula
                //find valid T
                if ((shadowt > 0 && shadowt < 1 && shadowt  < distance) || (shadowtt > 0 && shadowtt < 1 && shadowtt < distance)) {
                  valid = true; //found a valid t
                  break;
                }
              }
              //if no valid t is found from spheres, loop thru disks
              if (!valid) { 
                for (let k = 0; k < disks.length; k++) {
                  let sdNormal = createVector(disks[k].nx, disks[k].ny, disks[k].nz); //nx,ny,nz = a,b,c
                  let sdCenter = createVector(disks[k].x, disks[k].y, disks[k].z); //center x,y,z 
                  //let dd = -(p5.Vector.dot(dNormal, dCenter)); //d = -ax - by - cz, abc = nx,ny,nz
                  let sdx0 = disks[k].x - shadowOrigin.x;
                  let sdy0 = disks[k].y - shadowOrigin.y;
                  let sdz0 = disks[k].z - shadowOrigin.z;
                  let sdOrigin = createVector(sdx0, sdy0, sdz0);
                  let sdirectionD = createVector(shadowDir.x, shadowDir.y, shadowDir.z);
                  let stop = p5.Vector.dot(sdNormal, sdOrigin);
                  let sbottom = p5.Vector.dot(sdNormal, sdirectionD);
                  if (sbottom != 0) {
                    let shadowminT = stop / sbottom; //dot(diskNormal, diskCenter-rayOrigin) / dot(diskNormal, rayDir)
                    if (shadowminT > 0 && shadowminT < 1 && shadowminT < distance) {
                      let inter = p5.Vector.add(shadowOrigin, p5.Vector.mult(shadowDir, shadowminT)); //intersection
                      let cent = createVector(disks[k].x, disks[k].y, disks[k].z); //center of disk
                      let dist = p5.Vector.dist(inter, cent); //distance
                      if (dist <= disks[k].radius) {
                        valid = true;
                        break;
                      }
                    }
                  }
                }
              }
              //still no valid t (not in the shadow region), so add diffuse color of the light to the running sum
              if (!valid) {
                if (shape) {
                  subr += lights[j].r * spheres[closest].dr * max(0, p5.Vector.dot(sn, l)); //sum over r values
                  subg += lights[j].g * spheres[closest].dg * max(0, p5.Vector.dot(sn, l)); //sum over g values
                  subb += lights[j].b * spheres[closest].db * max(0, p5.Vector.dot(sn, l)); //sum over b values
                } else {
                  subr += lights[j].r * disks[diskClosest].dr * max(0, p5.Vector.dot(sn, l)); //sum over r values
                  subg += lights[j].g * disks[diskClosest].dg * max(0, p5.Vector.dot(sn, l)); //sum over g values
                  subb += lights[j].b * disks[diskClosest].db * max(0, p5.Vector.dot(sn, l)); //sum over b values
                }
              }
            }
            //ambient light r,g,b += ambient * k_ambient * diffuse color
            if (shape) {
              subr += ar * spheres[closest].k_ambient * spheres[closest].dr;
              subg += ag * spheres[closest].k_ambient * spheres[closest].dg;
              subb += ab * spheres[closest].k_ambient * spheres[closest].db;
            } else {
              subr += ar * disks[diskClosest].k_ambient * disks[diskClosest].dr;
              subg += ag * disks[diskClosest].k_ambient * disks[diskClosest].dg;
              subb += ab * disks[diskClosest].k_ambient * disks[diskClosest].db;
            } 
            
            //area light loop
            for (let j = 0; j < areaLights.length; j++) { //for each light           
              let factor;
              //check whether jitter is on or not
              if (jitter) {
                factor = 1 + random(-0.5, 0.5);
              } else {
                factor = 1;
              }
              let s = ((sx + factor) / (level + 1)) * 2 - 1; //s
              let rayT = ((sy + factor) / (level + 1)) * 2 - 1; //t
              let lightPos = createVector(areaLights[j].x, areaLights[j].y, areaLights[j].z); //light position vector
              let uVector = createVector(areaLights[j].ux, areaLights[j].uy, areaLights[j].uz); //u
              let vVector = createVector(areaLights[j].vx, areaLights[j].vy, areaLights[j].vz); //v
              //currPos = L.pos + sU + tV, (point = currPos)
              let point = p5.Vector.add(lightPos, p5.Vector.add(p5.Vector.mult(uVector, s), p5.Vector.mult(vVector, rayT)));
              let offset = p5.Vector.mult(sn, 0.0001);
              let shadowOrigin = p5.Vector.add(sintersection, offset);
              //L = currPos - intersection
              let shadowDir = p5.Vector.sub(point, sintersection);
              distance = p5.Vector.dist(sintersection, point);
              let l = p5.Vector.sub(point, sintersection);
              l = l.normalize();
              
              let valid = false;
              
              //shoot shadow ray
              //loop thru spheres
              for (let i = 0; i < spheres.length; i++) {
                let sx0 = shadowOrigin.x - spheres[i].x; //x0 - Cx
                let sy0 = shadowOrigin.y - spheres[i].y; //y0 - Cy
                let sz0 = shadowOrigin.z - spheres[i].z; //z0 - Cz
                let saa = sq(shadowDir.x) + sq(shadowDir.y) + sq(shadowDir.z); //dx^2 + dy^2 + dz^2
                let sbb = (sx0 * shadowDir.x + sy0 * shadowDir.y + sz0 * shadowDir.z) * 2; //2(x0 * dx + y0 * dy + z0 * dz)
                let scc = sq(sx0) + sq(sy0) + sq(sz0) - sq(spheres[i].radius); //x0^2 + y0^2 + z0^2 - r^2
                let shadowt = (-sbb + sqrt(sq(sbb) - 4 * saa * scc)) / (2 * saa); //quadratic formula
                let shadowtt = (-sbb - sqrt(sq(sbb) - 4 * saa * scc)) / (2 * saa); //quadratic formula
                //find valid T
                if ((shadowt > 0 && shadowt < 1 && shadowt  < distance) || (shadowtt > 0 && shadowtt < 1 && shadowtt < distance)) {
                  valid = true;
                  break;
                }
              }
              if (!valid) { //loop thru disks
                for (let k = 0; k < disks.length; k++) {
                  let sdNormal = createVector(disks[k].nx, disks[k].ny, disks[k].nz); //nx,ny,nz = a,b,c
                  let sdCenter = createVector(disks[k].x, disks[k].y, disks[k].z); //center x,y,z 
                  //let dd = -(p5.Vector.dot(dNormal, dCenter)); //d = -ax - by - cz, abc = nx,ny,nz
                  let sdx0 = disks[k].x - shadowOrigin.x;
                  let sdy0 = disks[k].y - shadowOrigin.y;
                  let sdz0 = disks[k].z - shadowOrigin.z;
                  let sdOrigin = createVector(sdx0, sdy0, sdz0);
                  let sdirectionD = createVector(shadowDir.x, shadowDir.y, shadowDir.z);
                  let stop = p5.Vector.dot(sdNormal, sdOrigin);
                  let sbottom = p5.Vector.dot(sdNormal, sdirectionD);
                  if (sbottom != 0) {
                    let shadowminT = stop / sbottom; //dot(diskNormal, diskCenter-rayOrigin) / dot(diskNormal, rayDir)
                    if (shadowminT > 0 && shadowminT < 1 && shadowminT < distance) {
                      let inter = p5.Vector.add(shadowOrigin, p5.Vector.mult(shadowDir, shadowminT)); //intersection
                      let cent = createVector(disks[k].x, disks[k].y, disks[k].z); //center of disk
                      let dist = p5.Vector.dist(inter, cent); //distance
                      if (dist <= disks[k].radius) {
                        valid = true;
                        break;
                      }
                    }
                  }
                }
              } 
              //add diffuse color to current subr,g,b
              if (!valid) {
                if (shape) {
                  subr += areaLights[j].r * spheres[closest].dr * max(0, p5.Vector.dot(sn, l)); //sum over r values
                  subg += areaLights[j].g * spheres[closest].dg * max(0, p5.Vector.dot(sn, l)); //sum over g values
                  subb += areaLights[j].b * spheres[closest].db * max(0, p5.Vector.dot(sn, l)); //sum over b values
                } else {
                  subr += areaLights[j].r * disks[diskClosest].dr * max(0, p5.Vector.dot(sn, l)); //sum over r values
                  subg += areaLights[j].g * disks[diskClosest].dg * max(0, p5.Vector.dot(sn, l)); //sum over g values
                  subb += areaLights[j].b * disks[diskClosest].db * max(0, p5.Vector.dot(sn, l)); //sum over b values
                }
              }
            }
          } 
          //add area light's contribution to the pixel's r,g,b
          r += subr;
          g += subg;
          b += subb;
        }
      }
    r = r / sq(level);
    g = g / sq(level);
    b = b / sq(level);
    // set the pixel color, converting values from [0,1] into [0,255]
    fill (255 * r, 255 * g, 255 * b);
    rect (x, height - y, 1, 1);   // make a little rectangle to fill in the pixel
    }
  }
}
