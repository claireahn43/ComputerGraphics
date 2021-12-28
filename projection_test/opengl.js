//Yaewon Ahn

// Matrix and Drawing Library

// Begin by using the matrix transformation routines from part A of this project.
// You should modify the new routines listed below to complete the assignment.
// Feel free to define any classes, global variables and helper routines that you need.

//defining variables
let ctm = new Array(4); //create matrix variable ctm 
let k;
let l;
let r;
let b; 
let t;
let ortho;
let x1;
let y1;
let z1;
let vertex_matrix = new Array(4); //matrix that stores vertices
let vertex1 = false; //does not have the first set of vertices

function BeginShape(dummy_value) {
  vertex1 = false; //reset a set of vertices
}

function EndShape(dummy_value) { 
  vertex1 = false; //reset a set of vertices
}

function Vertex(x, y, z) {
  //create a matrix containing x,y,z values
  for (var i = 0; i < 4; i++) {
    vertex_matrix[i] = new Array(4); 
    for (var j = 0; j < 4; j++) {
      vertex_matrix[i][j] =0;
    }
  }
  vertex_matrix[0][0] = x; 
  vertex_matrix[1][0] = y;
  vertex_matrix[2][0] = z;
  vertex_matrix[3][0] = 1;
  vertex_matrix = MultiplyMatrix(ctm, vertex_matrix); //transform vertices
  
  x = vertex_matrix[0][0]; //get transformed x
  y = vertex_matrix[1][0]; //get transformed y
  z = vertex_matrix[2][0]; //get transformed z

  if (ortho == false) { //if perspective view
    x /= abs(z);
    y /= abs(z);
    x = (x + k) * (width / (2*k));
    y = (y + k) * (height / (2*k));
  }
 
  if (ortho == true) { //if ortho view
    x = (x - l) * (width / (r - l));
    y = (y - b) * (height / (t - b));
    z = 0;
  }
  if (vertex1 == false) { //if didn't get a set of vertices of the first point 
    x1 = x; //store x,y,z
    y1 = y;
    z1 = z;
    vertex1 = true; //first set of vertices are stored
  } else { //if first set pf vertices is already stored, draw right away
    line(x1, height - y1, x, height - y);
    vertex1 = false; //empty the set
  }
}

function Perspective(field_of_view, near, far) {
  ortho = false; //perspective view
  k = tan(radians(field_of_view) / 2);
}

function Ortho (left, right, bottom, top, near, far) {
  ortho = true; //ortho view
  l = left;
  r = right;
  b = bottom;
  t = top;
}

//creating a 4x4 identity matrix
function Init_Matrix()
{
  for (var i = 0; i < 4; i++) {
    ctm[i] = new Array(4); 
    for (var j = 0; j < 4; j++) {
      if (i == j) {
        ctm[i][j] = 1; //putting 1's across the matrix
      }
      else {
        ctm[i][j] = 0; //putting 0's everywhere else
      }
    }
  }
}

function MultiplyMatrix (ctm, mul_mat) {
  let temp_mat = new Array(4); //create new matrix to store new values
  for (var i = 0; i < 4; i++) {
    temp_mat[i] = new Array(4); 
    for (var j = 0; j < 4; j++) {
      temp_mat[i][j] = 0; //filling matrix with 0's
    }
  }
  for (let i = 0; i < ctm.length; i++) {
    for (let j = 0; j < mul_mat[0].length; j++) {
      for (let k = 0; k < ctm[0].length; k++) {
        temp_mat[i][j] += ctm[i][k] * mul_mat[k][j]; //filling temp matrix with calculated values from multiplying two matrices
      }
    }
  }
  return temp_mat; //return newly created matrix
}

function Translate(x, y, z)
{
  let tran_mat = new Array(4); //initializing identity matrix
  for (var i = 0; i < 4; i++) {
    tran_mat[i] = new Array(4); 
    for (var j = 0; j < 4; j++) {
      if (i == j) {
        tran_mat[i][j] = 1;
      }
      else {
        tran_mat[i][j] = 0;
      }
    }
  }
  //modifying matrix with passed in x,y,z values
  tran_mat[0][3] = x;
  tran_mat[1][3] = y;
  tran_mat[2][3] = z;
  ctm = MultiplyMatrix(ctm, tran_mat); //calling multiply function to perform new_ctm = old_ctm * tran_mat
}

function Scale(x, y, z)
{
  let scale_mat = new Array(4);
  for (var i = 0; i < 4; i++) {
    scale_mat[i] = new Array(4); 
    for (var j = 0; j < 4; j++) {
      if (i == j) {
        scale_mat[i][j] = 1;
      }
      else {
        scale_mat[i][j] = 0;
      }
    }
  }
  //modifying matrix with passed in x,y,z values
  scale_mat[0][0] = x;
  scale_mat[1][1] = y;
  scale_mat[2][2] = z;
  ctm = MultiplyMatrix(ctm, scale_mat); //calling multiply function to perform new_ctm = old_ctm * scale_mat
}

function RotateX(theta)
{
  //initialzing identity matrix
  let rotatex_mat = new Array(4);
  for (var i = 0; i < 4; i++) {
    rotatex_mat[i] = new Array(4); 
    for (var j = 0; j < 4; j++) {
      if (i == j) {
        rotatex_mat[i][j] = 1;
      }
      else {
        rotatex_mat[i][j] = 0;
      }
    }
  }
  //putting cos, -sin, sin, cos of passed in angle in the middle of the matrix
  let angle = radians(theta);
  rotatex_mat[1][1] = cos(angle);
  rotatex_mat[1][2] = -sin(angle);
  rotatex_mat[2][1] = sin(angle);
  rotatex_mat[2][2] = cos(angle);
  ctm = MultiplyMatrix(ctm, rotatex_mat); //calling multiply function to perform new_ctm = old_ctm * rotatex_mat
}

function RotateY(theta)
{
  //initializing identity matrix
  let rotatey_mat = new Array(4);
  for (var i = 0; i < 4; i++) {
    rotatey_mat[i] = new Array(4); 
    for (var j = 0; j < 4; j++) {
      if (i == j) {
        rotatey_mat[i][j] = 1;
      }
      else {
        rotatey_mat[i][j] = 0;
      }
    }
  }
  //modifying the matrix with rotate y,theta
  let angle = radians(theta);
  rotatey_mat[0][0] = cos(angle);
  rotatey_mat[0][2] = sin(angle);
  rotatey_mat[2][0] = -sin(angle);
  rotatey_mat[2][2] = cos(angle);
  ctm = MultiplyMatrix(ctm, rotatey_mat); //calling multiply function to perform new_ctm = old_ctm * rotatey_mat
}

function RotateZ(theta)
{
  //initializing identity matrix
  let rotatez_mat = new Array(4);
  for (var i = 0; i < 4; i++) {
    rotatez_mat[i] = new Array(4); 
    for (var j = 0; j < 4; j++) {
      if (i == j) {
        rotatez_mat[i][j] = 1;
      }
      else {
        rotatez_mat[i][j] = 0;
      }
    }
  }
  //modifying matrix with rotate z, theta
  angle = radians(theta);
  rotatez_mat[0][0] = cos(angle);
  rotatez_mat[0][1] = -sin(angle);
  rotatez_mat[1][0] = sin(angle);
  rotatez_mat[1][1] = cos(angle);
  ctm = MultiplyMatrix(ctm, rotatez_mat); //calling multiply function to perform new_ctm = old_ctm * rotatez_mat
}

function Print_Matrix()
{
  for (i = 0; i < 4; i++) {
    let str = ""; //create an empty string
    for (j = 0; j < 4; j++) {
      str += ctm[i][j] + " "; //adding every element of the row to the string
    }
    str += "\n";
    console.log(str); //printing each row of the current matrix as a string
  } 
  console.log("\n");
}
