function setup() {
  createCanvas(600,600);
}

function draw() {
  background(200, 200, 255);
  noStroke();
  let x = width / 2.0;
  let y = height / 2.0;
  radius = width / 5.0;
  beginShape();
  fill(255, 180, 180);
  ax = x + radius * cos(120 * PI / 180);
  ay = y - radius * sin(120 * PI / 180);
  bx = x + radius * cos(240 * PI / 180);
  by = y - radius * sin(240 * PI / 180);
  cx = x + radius * cos(0 * PI / 180);
  cy = y - radius * sin(0 * PI / 180);
  
  triangle(ax, ay, bx, by, cx, cy); 
  let k = height - mouseY;
  radius = radius * (k / height);
  
  drawTri(ax, ay, radius, 7, 1);
  drawTri(bx, by, radius, 7, 1);
  drawTri(cx, cy, radius, 7, 1);
}

function drawTri(cenx, ceny, r, level, i) {
  beginShape();
  //fill(255, 255 - level * 10,0);
  fill(255, 245 - level * 10.0, 245 - level * 10.0);
  let angle = i * map(mouseX, 0, width, 0, TWO_PI); 
  let cax = cenx + r * cos(120 * PI / 180 + angle);
  let cay = ceny - r * sin(120 * PI / 180 + angle);
  let cbx = cenx + r * cos(240 * PI / 180 + angle);
  let cby = ceny - r * sin(240 * PI / 180 + angle);
  let ccx = cenx + r * cos(0 * PI / 180 + angle);
  let ccy = ceny - r * sin(0 * PI / 180 + angle);
  
  triangle(cax, cay, cbx, cby, ccx, ccy);
 
  if (level > 1) {
    level = level - 1;
    k = height - mouseY;
    r = r * (k / height);
    drawTri(cax, cay, r, level, i++);
    drawTri(cbx, cby, r, level, i++);
    drawTri(ccx, ccy, r, level, i++);
  }
 
  endShape(CLOSE);
}
