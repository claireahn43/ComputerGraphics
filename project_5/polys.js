// polygon mesh routines that you should write
//Yaewon Ahn

//lists
let vertices = [];
let polygons = [];

//global variables
let index = 0;
let count = 0;

class Vertex {
  constructor(x, y, z, nx, ny, nz) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.nx = nx;
    this.ny = ny;
    this.nz = nz;
  }
}

class Polygon {
  constructor(v1, v2, v3, v4) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.v4 = v4;
  }
}

function init_polys()
{
  vertices.length = 0;
  polygons.length = 0;
  index = 0;
  count = 0;
}

//store new vertex
function new_vertex (x, y, z, nx, ny, nz)
{
  vertices[vertices.length] = new Vertex(x, y, z, nx, ny, nz);
}

//store new polygon
function new_quad (i1, i2, i3, i4)
{
  polygons[polygons.length] = new Polygon(vertices[i1], vertices[i2], vertices[i3], vertices[i4]);
}

function draw_polys() {
  //draw vertices as spheres
  if (show_vertices_flag == 1) {
    for (let i = 0; i < vertices.length; i++) {
      push();
      vertexNormal(vertices[i].nx, vertices[i].ny, vertices[i].nz);
      translate(vertices[i].x, vertices[i].y, vertices[i].z);
      sphere(0.75);
      pop();
    }
  }
  //change color
  if (normal_flag == 1) {
    for (let i = 0; i < polygons.length; i++){
      push();
      beginShape();
      normalMaterial(polygons[i].v1.nx, polygons[i].v1.ny, polygons[i].v1.nz);
      vertexNormal(polygons[i].v1.nx, polygons[i].v1.ny, polygons[i].v1.nz);
      vertex(polygons[i].v1.x, polygons[i].v1.y, polygons[i].v1.z);
      
      normalMaterial(polygons[i].v2.nx, polygons[i].v2.ny, polygons[i].v2.nz);
      vertexNormal(polygons[i].v2.nx, polygons[i].v2.ny, polygons[i].v2.nz);
      vertex (polygons[i].v2.x, polygons[i].v2.y, polygons[i].v2.z);
      
      normalMaterial(polygons[i].v3.nx, polygons[i].v3.ny, polygons[i].v3.nz);
      vertexNormal(polygons[i].v3.nx, polygons[i].v3.ny, polygons[i].v3.nz);
      vertex (polygons[i].v3.x, polygons[i].v3.y, polygons[i].v3.z);
      
      normalMaterial(polygons[i].v4.nx, polygons[i].v4.ny, polygons[i].v4.nz);
      vertexNormal(polygons[i].v4.nx, polygons[i].v4.ny, polygons[i].v4.nz);
      vertex (polygons[i].v4.x, polygons[i].v4.y, polygons[i].v4.z);
      
      endShape (CLOSE);
      pop();
    }
  }
  //default color
  if (normal_flag == 0 && show_vertices_flag == 0) { 
    for (let i = 0; i < polygons.length; i++) {
      push();
      beginShape();
      vertexNormal(polygons[i].v1.nx, polygons[i].v1.ny, polygons[i].v1.nz);
      vertex(polygons[i].v1.x, polygons[i].v1.y, polygons[i].v1.z);
      
      vertexNormal(polygons[i].v2.nx, polygons[i].v2.ny, polygons[i].v2.nz);
      vertex (polygons[i].v2.x, polygons[i].v2.y, polygons[i].v2.z);
      
      vertexNormal(polygons[i].v3.nx, polygons[i].v3.ny, polygons[i].v3.nz);
      vertex (polygons[i].v3.x, polygons[i].v3.y, polygons[i].v3.z);
      
      vertexNormal(polygons[i].v4.nx, polygons[i].v4.ny, polygons[i].v4.nz);
      vertex (polygons[i].v4.x, polygons[i].v4.y, polygons[i].v4.z);
      
      endShape (CLOSE);
      pop();
    }
  }
}

function create_cylinder(rad,x1,y1,z1,x2,y2,z2)
{  
  let p1 = createVector(x1,y1,z1);
  let p2 = createVector(x2,y2,z2);
  let t = p5.Vector.sub(p2, p1);
  let np;
  //vector not parallel to tangent vector
  if (t.x.toPrecision(6) == 0) {
    np = createVector(1,0,0);
  } else {
    np = createVector(0,1,0);
  }
  let u = (p5.Vector.cross(t, np)).normalize();
  let v = (p5.Vector.cross(u, t)).normalize();
  
  //first ring
  for (let i = 0; i < 360; i += 360/16.0) {
    let cosU = p5.Vector.mult(p5.Vector.mult(u, rad), cos(radians(i)));
    let sinV = p5.Vector.mult(p5.Vector.mult(v, rad), sin(radians(i)));
    let q = p5.Vector.add(p1, p5.Vector.add(cosU, sinV));
    let n = (p5.Vector.add(cosU, sinV)).normalize();
    new_vertex(q.x, q.y, q.z, n.x, n.y, n.z);
  }
  
  //second ring
  for (let i = 0; i < 360; i += 360/16.0) {
    let cosU = p5.Vector.mult(p5.Vector.mult(u, rad), cos(radians(i)));
    let sinV = p5.Vector.mult(p5.Vector.mult(v, rad), sin(radians(i)));
    let q = p5.Vector.add(p2, p5.Vector.add(cosU, sinV));
    let n = (p5.Vector.add(cosU, sinV)).normalize();
    new_vertex(q.x, q.y, q.z, n.x, n.y, n.z);
  }
  
  //connecting a quad
  for (let i = 0; i < 16; i++) {
    let vert1 = i;
    let vert2 = i + 16;
    let vert3;
    if (i + 16 == 31) {
      vert3 = 16;
    } else {
      vert3 = i + 17;
    }
    let vert4 = (i + 1) % 16;
    new_quad(vert1, vert2, vert3, vert4);
  }
}

function bezier_tube(x1,y1,z1, x2,y2,z2, x3,y3,z3, x4,y4,z4, rad, num_around, num_length, nx, ny, nz)
{
  let p1 = createVector(x1,y1,z1);
  let p2 = createVector(x2,y2,z2);
  let p3 = createVector(x3,y3,z3);
  let p4 = createVector(x4,y4,z4);
  let prev = p1;
  let t;
  let u = createVector(nx, ny, nz); //initial u
  let v;
  let newVert;
  for (let i = 0; i <= num_length; i++) {
    let j = i/num_length;
    
    //get the new point along the central curve using the bezier formula
    //P = (1−t)^3 * P1 + 3(1−t)^2*t*P2 +3(1−t)t^2*P3 + t^3*P4
    let pp1 = p5.Vector.mult(p1, pow(1-j,3));
    let pp2 = p5.Vector.mult(p2, j * 3 * sq(1 - j));
    let pp3 = p5.Vector.mult(p3, 3 * sq(j) * (1-j));
    let pp4 = p5.Vector.mult(p4, pow(j,3));

    //get the tangent from the derivative of the bezier formula
    //dP(t) / dt =  -3(1-t)^2*p1 + 3(1-t)^2*p2-6t(1-t)*p2 -3t^2*p3+6t(1-t)*p3 + 3t^2*p4 
    let dp1 = p5.Vector.mult(p1, sq(1-j) * -3);
    let dp2 = p5.Vector.sub(p5.Vector.mult(p2, sq(1-j) * 3), p5.Vector.mult(p2, (1-j) * 6 * j));
    let dp3 = p5.Vector.add(p5.Vector.mult(p3, -3 * sq(j)), p5.Vector.mult(p3, 6 * j * (1-j)));
    let dp4 = p5.Vector.mult(p4, 3 * sq(j));
    
    //new vertex position along the central curve
    newVert = p5.Vector.add(p5.Vector.add(p5.Vector.add(pp1, pp2), pp3), pp4);
    
    //tangent
    t = p5.Vector.add(p5.Vector.add(p5.Vector.add(dp1, dp2), dp3), dp4);
    //t = p5.Vector.sub(newVert, prev); //approximation method
    
    //find v and update u vector
    v = (p5.Vector.cross(t, u)).normalize();
    u = (p5.Vector.cross(v, t)).normalize();
    
    //create rings around the central curve
    for (let k = 0; k < num_around; k++) {
      let l = k * 360.0 / num_around;
      let cosU = p5.Vector.mult(p5.Vector.mult(u, rad), cos(radians(l)));
      let sinV = p5.Vector.mult(p5.Vector.mult(v, rad), sin(radians(l)));
      let q = p5.Vector.add(newVert, p5.Vector.add(cosU, sinV));
      let n = (p5.Vector.add(cosU, sinV)).normalize();    
      new_vertex(q.x, q.y, q.z, n.x, n.y, n.z);
    }
    //prev = newVert.copy();
  }
  
  //index tells you which index to start from the vertices list
  //count gets updated every time you start a new ring 
  let start = index;
  for (let i = start; i < vertices.length - num_around; i++) {
    if (i % num_around == 0 && i != 0) {
      count++;
    }
    let vert1 = i;
    let vert2 = i + num_around;
    let vert3 = (i + num_around + 1) % num_around + (count + 1) * num_around;
    let vert4 = (i + 1) % num_around + count * num_around;
    new_quad(vert1, vert2, vert3, vert4);
    index++;
  }
  return u;
}
