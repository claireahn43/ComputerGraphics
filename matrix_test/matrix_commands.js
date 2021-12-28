//Yaewon Ahn
// Matrix Library (for you to write!)

// You should modify the routines listed below to complete the assignment.
// Feel free to define any classes, global variables and helper routines that you need.
let ctm = new Array(4); //create matrix variable ctm 
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

//creating a routine that does 4x4 matrix multiplication
// new_ctm = old_ctm * transformation matrix
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
  //initializing identity matrix
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
  rotatex_mat[1][1] = cos(radians(theta));
  rotatex_mat[1][2] = -sin(radians(theta));
  rotatex_mat[2][1] = sin(radians(theta));
  rotatex_mat[2][2] = cos(radians(theta));
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
  rotatey_mat[0][0] = cos(radians(theta));
  rotatey_mat[0][2] = sin(radians(theta));
  rotatey_mat[2][0] = -sin(radians(theta));
  rotatey_mat[2][2] = cos(radians(theta));
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
  rotatez_mat[0][0] = cos(radians(theta));
  rotatez_mat[0][1] = -sin(radians(theta));
  rotatez_mat[1][0] = sin(radians(theta));
  rotatez_mat[1][1] = cos(radians(theta));
  ctm = MultiplyMatrix(ctm, rotatez_mat); //calling multiply function to perform new_ctm = old_ctm * rotatez_mat
}

//printing current matrix on four separate rows with empty line after the last row
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
